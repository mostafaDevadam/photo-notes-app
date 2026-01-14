import React from 'react'
import GridInvitations from '../_components/_grids/GridInvitations'
import { get } from 'http'
import { getAllInvitationsByReceiverId, getAllInvitationsByUserId } from '../api/invitation.api'
import { getID } from '../_lib/id'

// InviteDialogButton, 
// InvitationList, CardInvitation: ConfirmButton, RemoveButton,
// 
const InvitationsPage = async () => {
  const userId = await getID()
  const invitations = await getAllInvitationsByUserId()
  const receiver_invitations = await getAllInvitationsByReceiverId()
  console.log("invitations:", invitations)
  console.log("receiver_invitations:", receiver_invitations)
  return (
    <div><GridInvitations invitations={receiver_invitations!!} userId={userId}/></div>
  )
}

export default InvitationsPage