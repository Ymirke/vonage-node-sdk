import { AudioSettings } from '../audioSettings';
import { AnyChannel } from '../anyChannel';
import { MemberState } from '../../enums';

/**
 * Type representing a request to create a member.
 */
export type CreateMemberRequest = {
  /**
   * Invite or join a member to a conversation,
   */
  state: MemberState.INVITED | MemberState.JOINED; 

  /**
   * Either the user id or the name is required
   */
  user: {
    /**
     * The user id 
     */
    id?: string;

    /**
     * The user name
     */
    name?: string;
  }

  /**
   * The audio settings for the member.
   */
  media: AudioSettings;

  /**
   * The channel information for the member.
   */
  channel: AnyChannel;

  /**
   * Knocker ID. 
   *
   * A knocker is a pre-member of a conversation who does not exist yet
   */
  knocking_id?: string;

  /**
   * Member ID of the member that sends the invitation
   */
  member_id_inviting?: string;

  /**
   * The member ID of the member that is sending the invitation.
   */
  from?: string;
};
