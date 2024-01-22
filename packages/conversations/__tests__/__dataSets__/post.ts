import {
  CreateConversationRequest,
  CreateMemberRequest,
  MemberState,
} from '../../lib';
import {
  conversation,
  conversationToCreate,
  conversationResponse,
  member,
  memberResponse,
} from '../common';

export default [
  {
    label: 'create conversations',
    requests: [
      [
        `/v1/conversations`,
        'POST',
        {
          name: conversationToCreate.name,
          display_name: conversationToCreate.displayName,
          image_url: conversationToCreate.imageUrl,
          properties: {
            ttl: conversationToCreate?.properties?.ttl,
            type: conversationToCreate?.properties?.type,
            custom_sort_key: conversationToCreate?.properties?.customSortKey,
            custom_data: conversationToCreate?.properties?.customData,
          },
          numbers: conversationToCreate?.numbers,
          callback: {
            url: conversationToCreate?.callback?.url,
            event_mask: conversationToCreate?.callback?.eventMask,
            params: conversationToCreate?.callback?.params,
            method: conversationToCreate?.callback?.method,
          },
        } as CreateConversationRequest,
      ],
    ],
    responses: [[200, conversationResponse]],
    clientMethod: 'createConversation',
    parameters: [conversationToCreate],
    generator: false,
    error: false,
    expected: conversation,
  },
  {
    label: 'create a member',
    requests: [
      [
        `/v1/conversations/${conversation.id}/members`,
        'POST',
        {
          state: MemberState.JOINED,
          user: {
            id: member.user.id,
            name: member.user.name,
          },
          channel: member.channel,
          media: {
            audio_settings: {
              earmuffed: member.media.audioSettings.earmuffed,
              muted: member.media.audioSettings.muted,
              enabled: member.media.audioSettings.enabled,
            },
            audio: member.media.audio,
          },
          knocking_id: member.knockingId,
          member_id_inviting: member.invitedBy,
        } as CreateMemberRequest,
      ],
    ],
    responses: [[200, memberResponse]],
    clientMethod: 'createMember',
    parameters: [conversation.id, member],
    generator: false,
    error: false,
    expected: member,
  },
];
