import React from 'react'
import { INVITATION_TYPE } from '../../_types/types'
import InvitationsList from '../_list/InvitationsList'

type Props = {
    invitations: INVITATION_TYPE[]
    userId: any
}
const GridInvitations = ({invitations,userId} : Props) => {
  // tabs: sender, receiver
  return (
    <div>
      <InvitationsList invitations={invitations} />
    </div>
  )
}

export default GridInvitations