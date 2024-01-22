import {
  Conversation,
  ChannelType,
  PhoneNumberChannel,
  EventType,
  ConversationState,
  ConversationResponse,
  Member,
  MemberState,
  MemberResponse,
} from '../lib';

export const BASE_URL = 'https://api.nexmo.com/';

export const conversationToCreate = Object.freeze({
  name: 'New Conversation',
  displayName: 'New Conversation',
  imageUrl: 'https://example.com/image.png',
  properties: {
    ttl: 86400,
    type: 'public',
    customSortKey: 'foo',
    customData: {
      foo: 'bar',
      fizzBuzz: 123,
      baz_bat: true,
    },
  },
  numbers: [
    {
      type: ChannelType.PHONE,
      number: '447700900000',
    } as PhoneNumberChannel
  ],
  callback: {
    url: 'https://example.com/callback',
    eventMask: EventType.AUDIO_PLAY,
    params: {},
    method: 'POST',
  }
}) as Conversation;

export const conversationResponse = Object.freeze({
  id: 'CON-00000000-0000-0000-0000-000000000001',
  name: conversationToCreate.name,
  display_name: conversationToCreate.displayName,
  image_url: conversationToCreate.imageUrl,
  state: ConversationState.ACTIVE,
  sequence_number: 0,
  timestamp: {
    created: '2024-01-17T13:45:56.000Z',
    updated: '2024-01-17T13:45:56.000Z',
  },
  properties: {
    ttl: conversationToCreate?.properties?.ttl,
    type: conversationToCreate?.properties?.type,
    custom_sort_key: conversationToCreate?.properties?.customSortKey,
    custom_data: conversationToCreate?.properties?.customData,
  },
  _links: {
    self: {
      href: `${BASE_URL}v1/conversations/${conversationToCreate.id}`,
    }
  }
}) as ConversationResponse;

export const conversation = Object.freeze({
  id: conversationResponse.id,
  name: conversationResponse.name,
  displayName: conversationResponse.display_name,
  imageUrl: conversationResponse.image_url,
  state: conversationResponse.state,
  sequenceNumber: conversationResponse.sequence_number,
  properties: {
    ttl: conversationResponse?.properties?.ttl,
    type: conversationResponse?.properties?.type,
    customSortKey: conversationResponse?.properties?.custom_sort_key,
    customData: conversationResponse?.properties?.custom_data,
  },
  timestamp: {
    created: conversationResponse.timestamp?.created,
    updated: conversationResponse.timestamp?.updated,
  }
}) as Conversation;

export const memberResponse = {
  id: 'MEM-00000000-0000-0000-0000-000000000001',
  state: MemberState.JOINED,
  _embedded: {
    user: {
      id: 'USR-00000000-0000-0000-0000-000000000001',
      name: 'Alice Smith',
      display_name: 'Alice',
    },
    _links: {
      self: {
        href: `${BASE_URL}v1/users/USR-00000000-0000-0000-0000-000000000001`,
      },
    },
  },
  timestamp: {
    invited: '2024-01-17T13:45:56.000Z',
    joined: '2024-01-17T13:45:56.000Z',
  },
  initiator: {
    joined: {
      is_system: true,
      user_id: 'USR-00000000-0000-0000-0000-000000000002',
      member_id: 'MEM-00000000-0000-0000-0000-000000000002',
    }
  },
  channel: {
    type: ChannelType.PHONE,
    number: '447700900000',
  } as PhoneNumberChannel,
  media: {
    audio_settings: {
      enabled: true,
      earmuffed: false,
      muted: false,
    },
    audio: true,
  },
  knocking_id: 'MEM-00000000-0000-0000-0000-000000000003',
  invited_by: 'USR-00000000-0000-0000-0000-000000000003',
  _links: {
    self:{
      href: `${BASE_URL}v1/conversations/${conversation.id}/members/MEM-00000000-0000-0000-0000-000000000001`,
    },
  },
} as MemberResponse;

export const member = {
  id: 'MEM-00000000-0000-0000-0000-000000000001',
  state: MemberState.JOINED,
  user: {
    id: 'USR-00000000-0000-0000-0000-000000000001',
    name: 'Alice Smith',
    displayName: 'Alice',
  },
  timestamp: {
    invited: '2024-01-17T13:45:56.000Z',
    joined: '2024-01-17T13:45:56.000Z',
  },
  initiator: {
    joined: {
      isSystem: true,
      userId: 'USR-00000000-0000-0000-0000-000000000002',
      memberId: 'MEM-00000000-0000-0000-0000-000000000002',
    }
  },
  channel: {
    type: ChannelType.PHONE,
    number: '447700900000',
  } as PhoneNumberChannel,
  media: {
    audioSettings: {
      enabled: true,
      earmuffed: false,
      muted: false,
    },
    audio: true,
  },
  knockingId: 'MEM-00000000-0000-0000-0000-000000000003',
  invitedBy: 'USR-00000000-0000-0000-0000-000000000003',
} as Member;
