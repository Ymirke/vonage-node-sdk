/**
 * Enum representing various types of events and their descriptions.
 */
export enum EventType {
  /**
   * DTMF tone is received into the Leg.
   */
  AUDIO_DTMF = 'audio:dtmf',

  /**
   * Leg is unearmuffed.
   */
  AUDIO_EAR_MUFF_OFF = 'audio:earmuff:off',

  /**
   * Leg is earmuffed.
   */
  AUDIO_EAR_MUFF_ON = 'audio:earmuff:on',

  /**
   * Leg is unmuted.
   */
  AUDIO_MUTE_OFF = 'audio:mute:off',

  /**
   * Leg is muted.
   */
  AUDIO_MUTE_ON = 'audio:mute:on',

  /**
   * Audio streamed into a Leg is stopped.
   */
  AUDIO_PLAY_STOP = 'audio:play:stop',

  /**
   * Audio streamed into a Leg stops playing.
   */
  AUDIO_PLAY_DONE = 'audio:play:done',

  /**
   * Audio is streamed into a Leg.
   */
  AUDIO_PLAY = 'audio:play',

  /**
   * Call is being recorded.
   */
  AUDIO_RECORD = 'audio:record',

  /**
   * Audio is streamed into a Leg.
   */
  AUDIO_RECORD_STOP = 'audio:record:stop',

  /**
   * Audio is streamed into a Leg.
   */
  AUDIO_RECORD_DONE = 'audio:record:done',

  /**
   * Audio streamed into a Leg is stopped.
   */
  AUDIO_RINGING_START = 'audio:ringing:start',

  /**
   * Audio streamed into a Leg is stopped.
   */
  AUDIO_RINGING_STOP = 'audio:ringing:stop',

  /**
   * Audio streamed into a Leg is stopped.
   */
  AUDIO_ASR_DONE = 'audio:asr:done',

  /**
   * Audio streamed into a Leg is stopped.
   */
  AUDIO_ASR_RECORD_DONE = 'audio:asr:record:done',

  /**
   * Audio streamed into a Leg is stopped.
   */
  AUDIO_SAY_STOP = 'audio:say:stop',

  /**
   * Audio streamed into a Leg is stopped.
   */
  AUDIO_SAY_DONE = 'audio:say:done',

  /**
   * Audio streamed into a Leg is stopped.
   */
  AUDIO_SAY = 'audio:say',

  /**
   * Audio streamed into a Leg is stopped.
   */
  AUDIO_SPEAKING_ON = 'audio:speaking:on',

  /**
   * Audio streamed into a Leg is stopped.
   */
  AUDIO_SPEAKING_OFF = 'audio:speaking:off',

  /**
   * Text message is seen by the recipient.
   */
  TEXT_SEEN = 'text:seen',

  /**
   * Text message is delivered to the recipient.
   */
  TEXT_DELIVERED = 'text:delivered',

  /**
   * In App Text message was created.
   */
  TEXT_NEW = 'text:new',

  /**
   * Text message was updated.
   */
  TEXT_UPDATE = 'text:update',

  /**
   * Member is typing.
   */
  TEXT_TYPING_ON = 'text:typing:on',

  /**
   * Member stops typing.
   */
  TEXT_TYPING_OFF = 'text:typing:off',

  /**
   * Image is delivered.
   */
  IMAGE_DELIVERED = 'image:delivered',

  /**
   * Image is viewed by the recipient.
   */
  IMAGE_SEEN = 'image:seen',

  /**
   * Image is uploaded.
   */
  IMAGE = 'image',

  /**
   * Message has been rejected.
   */
  MESSAGE_REJECTED = 'message:rejected',

  /**
   * Message has been submitted.
   */
  MESSAGE_SUBMITTED = 'message:submitted',

  /**
   * Message can't be delivered.
   */
  MESSAGE_UNDELIVERABLE = 'message:undeliverable',

  /**
   * Message has been delivered.
   */
  MESSAGE_DELIVERED = 'message:delivered',

  /**
   * Message has been seen.
   */
  MESSAGE_SEEN = 'message:seen',

  /**
   * New Conversation is created.
   */
  CONVERSATION_CREATED = 'conversation:created',

  /**
   * Conversation object is deleted.
   */
  CONVERSATION_DELETED = 'conversation:deleted',

  /**
   * Conversation object is updated.
   */
  CONVERSATION_UPDATED = 'conversation:updated',

  /**
   * Member is invited into a Conversation.
   */
  MEMBER_INVITED = 'member:invited',

  /**
   * Member joins a Conversation.
   */
  MEMBER_JOINED = 'member:joined',

  /**
   * Member leaves a Conversation.
   */
  MEMBER_LEFT = 'member:left',

  /**
   * Member media event.
   */
  MEMBER_MEDIA = 'member:media',

  /**
   * RTC status event.
   */
  RTC_STATUS = 'rtc:status',

  /**
   * RTC transfer event.
   */
  RTC_TRANSFER = 'rtc:transfer',

  /**
   * RTC hangup event.
   */
  RTC_HANGUP = 'rtc:hangup',

  /**
   * RTC terminate event.
   */
  RTC_TERMINATE = 'rtc:terminate',

  /**
   * RTC answered event.
   */
  RTC_ANSWERED = 'rtc:answered',

  /**
   * SIP status event.
   */
  SIP_STATUS = 'sip:status',

  /**
   * SIP call is answered.
   */
  SIP_ANSWERED = 'sip:answered',

  /**
   * When the entity answering the SIP call is a machine.
   */
  SIP_MACHINE = 'sip:machine',

  /**
   * User on a SIP Call hangs up.
   */
  SIP_HANGUP = 'sip:hangup',

  /**
   * SIP call starts ringing.
   */
  SIP_RINGING = 'sip:ringing',
}

