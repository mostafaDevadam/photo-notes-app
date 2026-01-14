"use client";

import React, { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify';
type Props = {
    action: (prevState: any, formData: FormData) => Promise<any>
    invitationId: any
    isConfirmed?: string
    isCanceled?: string
    buttonTitle?: string
}
const ConfirmInvitationButton = ({ action, invitationId, isCanceled, isConfirmed, buttonTitle = "Confirm" }: Props) => {
    const [state, formAction] = useActionState(action, null)

    useEffect(() => {
        if (isConfirmed == "true") {
            if (state && state.success) {
                toast("confirmed invitation")
            }

            if (state && state.error) {
                toast("cannot confirm invitation")
            }
        }

        if (isCanceled == "true") {
            if (state && state.success) {
                toast("Canceled invitation")
            }

            if (state && state.error) {
                toast("cannot cancel invitation")
            }
        }




    }, [state])

    return (
        <div>
            <form action={formAction}>
                <input hidden type="text" name="invitationId" value={invitationId} />
                <input hidden type="text" name="isConfirmed" value={isConfirmed} />
                <input hidden type="text" name="isCanceled" value={isCanceled} />
                <button type="submit" className='bg-blue-500 rounded-md px-2 py-2 text-white'>{buttonTitle}</button>
            </form>
        </div>
    )
}

export default ConfirmInvitationButton