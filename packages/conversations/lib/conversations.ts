import { AuthenticationType, Client } from '@vonage/server-client';
import {
  ConversationPageResponse,
  CreateConversationRequest,
  ConversationResponse,
  Conversation,
  ConversationPage,
  ListConversationsParameters,
  Member,
  MemberResponse,
  MemberPageResponse,
  MemberPage,
  CreateMemberRequest,
  ListMemberParameters,
  UpdateMemberParameters,
  ListMemberResponse,
} from './types';

const apiToConversation = (response: ConversationResponse): Conversation => {
  const customData = response.properties?.custom_data;
  delete (response as ConversationResponse)._links;
  const conversation = Client.transformers.camelCaseObjectKeys(
    response,
    true,
  ) as Conversation;

  if (conversation?.properties?.customData && customData) {
    conversation.properties.customData = customData;
  }

  return conversation;
};

const conversationToApi = (
  conversation: Conversation,
): CreateConversationRequest => {
  const customData = conversation.properties?.customData;
  const apiConversation = Client.transformers.snakeCaseObjectKeys(
    Client.transformers.omit(
      ['id', 'sequenceNumber', 'timestamp', 'state'],
      conversation,
    ),
    true,
  ) as CreateConversationRequest;

  if (apiConversation?.properties?.custom_data && customData) {
    apiConversation.properties.custom_data = customData;
  }

  return apiConversation;
};

const apiToMember = (response: MemberResponse | ListMemberResponse): Member => {
  return {
    ...Client.transformers.camelCaseObjectKeys(
      Client.transformers.omit(['_embedded', '_links'], response),
      true,
    ),
    user: {
      ...Client.transformers.camelCaseObjectKeys(
        Client.transformers.omit(['_links'], response._embedded?.user),
        true,
      ),
    },
  } as Member;
};

const memberToApi = (member: Member): CreateMemberRequest => {
  const apiMember = {
    ...Client.transformers.snakeCaseObjectKeys(
      Client.transformers.omit(
        ['id', 'timestamp', 'conversationId', 'initiator', 'invitedBy'],
        member,
      ),
      true,
    ),
    user: {
      id: member.user.id,
      name: member.user.name,
    },
    member_id_inviting: member.invitedBy,
  } as CreateMemberRequest;

  return apiMember;
};

/**
 * A client for talking to the Vonage Conversation API.
 *
 * @example
 * Create a standalone Conversation client
 *
 * ```ts
 * import { Conversations } from '@vonage/conversation';
 *
 * const conversationClient = new Conversations({
 *   applicationId: VONAGE_APPLICATION_ID,
 *   privateKey: VONAGE_APPLICATION_PRIVATE_KEY_PATH,
 * });
 * ```
 *
 * @example
 * Create an Conversation client from the Vonage client
 *
 * ```ts
 * import { Vonage } from '@vonage/server-client';
 *
 * const vonage = new Vonage({
 *   applicationId: VONAGE_APPLICATION_ID,
 *   privateKey: VONAGE_APPLICATION_PRIVATE_KEY_PATH,
 * });
 *
 * const conversationClient = vonage.conversations
 * ```
 */
export class Conversations extends Client {
  authType = AuthenticationType.JWT;

  /**
   * Retrieves all conversations, iterating over paginated results.
   *
   * @param {ListConversationParams} [params={}] - Optional filter parameters.
   * @yields {Conversation} - Yields conversation items.
   * @return {AsyncGenerator<Conversation, void, undefined>} - An asynchronous generator.
   *
   * @example
   * List conversations with pagination using an iterator
   *
   * ```ts
   * for await (const conversation of conversationClient.listAllConversations()) {
   *   console.log(conversation.name);
   * }
   * ```
   */
  async *listAllConversations(
    params: ListConversationsParameters = {},
  ): AsyncGenerator<Conversation, void & Conversation, undefined> {
    let next = null;
    do {
      const resp = await this.getConversationPage(params);

      yield* resp.conversations || [];
      next = resp.links?.next
        ? new URL(resp.links?.next?.href).searchParams.get('cursor')
        : null;

      params.cursor = next || '';
    } while (next);
  }

  /**
   * Retrieves a page of conversations based on filter parameters.
   *
   * @param {ListConversationParams} filter - The filter parameters for pagination.
   * @return {Promise<ConversationPageList>} - A promise resolving to a page of conversations.
   *
   * @see API Specification {@link https://developer.vonage.com/en/api/conversation#listConversation}
   *
   * @example
   * Get a single page of conversations
   *
   * ```ts
   * const conversations = await conversationClient.getConversationPage({
   *   page: 1,
   *   size: 10
   * });
   *
   * conversations.conversations.forEach(conversation => {
   *   console.log(conversation.name);
   * });
   * ```
   */
  public async getConversationPage(
    filter: ListConversationsParameters,
  ): Promise<ConversationPage> {
    const resp = await this.sendGetRequest<ConversationPageResponse>(
      `${this.config.apiHost}/v1/conversations`,
      Client.transformers.snakeCaseObjectKeys(filter),
    );

    return {
      conversations: (resp.data._embedded?.conversations || []).map(
        apiToConversation,
      ),
      pageSize: resp.data.page_size,
      links: resp.data._links,
    };
  }

  /**
   * Creates a new conversation with the provided details.
   *
   * @see API Specification {@link https://developer.vonage.com/en/api/conversation#createConversation}
   *
   * @param {Conversation} conversation - The conversation details to be created.
   * @return {Promise<Conversation>} - A promise resolving to the created conversation.
   *
   * @example
   * Create a new conversation
   *
   * ```ts
   * const conversation = await conversationClient.createConversation({
   *   name: 'My Conversation',
   * });
   *
   * console.log(conversation.id);
   * ```
   */
  public async createConversation(
    conversation: Conversation,
  ): Promise<Conversation> {
    const resp = await this.sendPostRequest<ConversationResponse>(
      `${this.config.apiHost}/v1/conversations`,
      conversationToApi(conversation),
    );

    return apiToConversation(resp.data);
  }

  /**
   * Retrieves an conversation by its unique identifier.
   *
   * @see API Specification {@link https://developer.vonage.com/en/api/conversation#getConversation}
   *
   * @param {string} conversationId - The unique identifier of the conversation to retrieve.
   * @return {Promise<Conversation>} - A promise resolving to the retrieved conversation.
   *
   * @example
   * Retrieve an conversation
   *
   * ```ts
   * const conversation = await conversationClient.getConversation(conversation_ID);
   * console.log(conversation.name);
   * ```
   */
  public async getConversation(conversationId: string): Promise<Conversation> {
    const resp = await this.sendGetRequest<ConversationResponse>(
      `${this.config.apiHost}/v1/conversations/${conversationId}`,
    );

    return apiToConversation(resp.data);
  }

  /**
   * Updates an existing conversation with the provided details.
   *
   * @see API Specification {@link https://developer.vonage.com/en/api/conversation#updateConversation}
   *
   * @param {Conversation} conversation - The conversation details to be updated.
   * @return {Promise<Conversation>} - A promise resolving to the updated conversation.
   *
   * @example
   * Update an conversation
   *
   * ```ts
   * const conversation = await conversationClient.updateConversation({
   *   id: conversation_ID,
   *   name: 'My Conversation',
   * });
   * console.log(conversation.name);
   * ```
   */
  public async updateConversation(
    conversation: Conversation,
  ): Promise<Conversation> {
    const resp = await this.sendPutRequest<ConversationResponse>(
      `${this.config.apiHost}/v1/conversations/${conversation.id}`,
      conversationToApi(conversation),
    );
    return apiToConversation(resp.data);
  }

  /**
   * Deletes an conversation by its unique identifier.
   *
   * @see API Specification {@link https://developer.vonage.com/en/api/conversation#deleteConversation}
   *
   * @param {string} conversationId - The unique identifier of the conversation to delete.
   * @return {Promise<void>} - A promise indicating the successful deletion of the conversation.
   *
   * @example
   * Delete an conversation
   *
   * ```ts
   * await conversationClient.deleteConversation(conversation_ID);
   * ```
   */
  public async deleteConversation(conversationId: string): Promise<void> {
    await this.sendDeleteRequest<void>(
      `${this.config.apiHost}/v1/conversations/${conversationId}`,
    );
  }

  /**
   * Retrieves all members, iterating over paginated results.
   *
   * @param {string} conversationId - The conversation id to retrieve members from.
   * @param {ListMemberParams} [params={}] - Optional filter parameters.
   * @yields {Member} - Yields member items.
   * @return {AsyncGenerator<Member, void, undefined>} - An asynchronous generator.
   *
   * @example
   * List members with pagination using an iterator
   *
   * ```ts
   * for await (const member of memberClient.listAllMembers(CONVERSATION_ID)) {
   *   console.log(member.name);
   * }
   * ```
   */
  async *listAllMembers(
    conversationId: string,
    params: ListMemberParameters = {},
  ): AsyncGenerator<Member, void & Member, undefined> {
    let next = null;
    do {
      const resp = await this.getMemberPage(conversationId, params);

      yield* resp.members || [];
      next = resp.links?.next
        ? new URL(resp.links?.next?.href).searchParams.get('cursor')
        : null;

      params.cursor = next || '';
    } while (next);
  }

  /**
   * Retrieves a page of members in a conversation based on filter parameters.
   *
   * @param {string} conversationId - The conversation id to retrieve members from.
   * @param {ListMemberParams} filter - The filter parameters for pagination.
   * @return {Promise<MemberPageList>} - A promise resolving to a page of members.
   *
   * @see API Specification {@link https://developer.vonage.com/en/api/conversation#listMember}
   *
   * @example
   * Get a single page of members
   *
   * ```ts
   * const members = await memberClient.getMemberPage(
   *   CONVERSATION_ID,
   *   {
   *     page: 1,
   *     size: 10
   *   }
   * );
   *
   * members.members.forEach(member => {
   *   console.log(member.name);
   * });
   * ```
   */
  public async getMemberPage(
    conversationId: string,
    filter: ListMemberParameters = {},
  ): Promise<MemberPage> {
    const resp = await this.sendGetRequest<MemberPageResponse>(
      `${this.config.apiHost}/v1/conversations/${conversationId}/members`,
      Client.transformers.snakeCaseObjectKeys(filter),
    );

    return {
      members: (resp.data._embedded?.members || []).map(apiToMember),
      pageSize: resp.data.page_size,
      links: resp.data._links,
    };
  }

  /**
   * Creates a new member with the provided details.
   *
   * @see API Specification {@link https://developer.vonage.com/en/api/conversation#createMember}
   *
   * @param {string} conversationId - The conversation id to create the member in.
   * @param {Member} member - The member details to be created.
   * @return {Promise<Member>} - A promise resolving to the created member.
   *
   * @example
   * Create a new member
   *
   * ```ts
   * const member = await memberClient.createMember(
   *   CONVERSATION_ID,
   *   {
   *     name: 'My Member',
   *   },
   * );
   *
   * console.log(member.id);
   * ```
   */
  public async createMember(
    conversationId: string,
    member: Member,
  ): Promise<Member> {
    const resp = await this.sendPostRequest<MemberResponse>(
      `${this.config.apiHost}/v1/conversations/${conversationId}/members`,
      memberToApi(member),
    );

    return apiToMember(resp.data);
  }

  /**
   * Retrieves an member by its unique identifier.
   *
   * @see API Specification {@link https://developer.vonage.com/en/api/conversation#getMember}
   *
   * @param {string} conversationId - The conversation id to retrieve the member from.
   * @param {string} memberId - The unique identifier of the member to retrieve.
   * @return {Promise<Member>} - A promise resolving to the retrieved member.
   *
   * @example
   * Retrieve an member
   *
   * ```ts
   * const member = await memberClient.getMember(CONVERSATION_ID, MEMBER_ID);
   * console.log(member.name);
   * ```
   */
  public async getMember(
    conversationId: string,
    memberId: string,
  ): Promise<Member> {
    const resp = await this.sendGetRequest<MemberResponse>(
      `${this.config.apiHost}/v1/conversations/${conversationId}/members/${memberId}`,
    );

    return apiToMember(resp.data);
  }

  /**
   * This retrieves the member associated with the sub claim on the JWT
   *
   * @see API Specification {@link https://developer.vonage.com/en/api/conversation#getMe}
   *
   * @param {string} conversationId - The conversation id to retrieve the member from.
   * @return {Promise<Member>} - A promise resolving to the retrieved member.
   *
   * @example
   * Retrieve an member
   *
   * ```ts
   * const member = await memberClient.getMe(CONVERSATION_ID);
   * console.log(member.name);
   * ```
   */
  public async getMe(conversationId: string): Promise<Member> {
    return this.getMember(conversationId, 'me');
  }

  /**
   * Updates an existing member with the provided details.
   *
   * Setting the state to left will result in the member leaving the conversation.
   *
   * @see API Specification {@link https://developer.vonage.com/en/api/conversation#updateMember}
   *
   * @param {string} conversationId - The conversation id to update the member in.
   * @param {string} memberId - The member details to be updated.
   * @param {UpdateMemberParameters} params - The update parameters.
   * @return {Promise<Member>} - A promise resolving to the updated member.
   *
   * @example
   * ```ts
   * import { MemberState } from '@vonage/conversation';
   *
   * const member = await memberClient.updateMember(
   *   CONVERSATION_ID,
   *   MEMBER_ID,
   *   {
   *     state: MemberState.LEFT,
   *     from: USER_ID,
   *   },
   * );
   *
   * console.log(member.name);
   * ```
   */
  public async updateMember(
    conversationId: string,
    memberId: string,
    params: UpdateMemberParameters,
  ): Promise<Member> {
    const resp = await this.sendPatchRequest<MemberResponse>(
      `${this.config.apiHost}/v1/conversations/${conversationId}/members/${memberId}`,
      params,
    );

    return apiToMember(resp.data);
  }
}
