import {
  conversationResponse,
} from '../common';

export default [
  {
    label: 'delete a conversation',
    requests: [
      [
        `/v1/conversations/${conversationResponse.id}`,
        'DELETE',
      ],
    ],
    responses: [[204]],
    clientMethod: 'deleteConversation',
    parameters: [conversationResponse.id],
    generator: false,
    error: false,
    expected: undefined,
  }
]
