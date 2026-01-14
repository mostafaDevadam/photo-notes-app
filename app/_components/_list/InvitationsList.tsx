import { INVITATION_TYPE } from '@/app/_types/types'
import React from 'react'
import ConfirmInvitationButton from '../_buttons/ConfirmInvitationButton'
import { confirmInvitationAction } from '@/app/actions/invitation.actions'

type Props = {
    invitations: INVITATION_TYPE[]
}
const InvitationsList = ({ invitations }: Props) => {
    return (
        <div className='flex flex-col gap-5'>
            {invitations && invitations.map((invitation) => (
                !invitation.isConfirmed && !invitation.isCanceled &&
                <div key={invitation._id} className='flex flex-row justify-between border rounded-lg px-2 py-2'>
                    <p>{invitation.message}</p>
                    <div className='flex gap-5'>
                        <ConfirmInvitationButton action={confirmInvitationAction} invitationId={invitation._id} 
                            isConfirmed="true" buttonTitle="Confirm"
                        />
                        <button className='bg-red-500 rounded-md px-2 py-2 text-white'>Decline</button>
                    </div>
                    </div>
                ))}
        </div>
    )
}

export default InvitationsList