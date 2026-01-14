"use client";
import { SERVER_ACTION_PAYLOAD_TYPE, SHARE_TYPE } from '@/app/_types/types';
import React, { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify';

type Props = {
  action: (prevState: any, formData: FormData) =>  Promise<SERVER_ACTION_PAYLOAD_TYPE<SHARE_TYPE>>
  share: any
  stateShare: 'Photo' | 'Folder' | 'Note'
}

const ShareButton = ({action, share, stateShare}: Props) => {
    const [state, formAction] = useActionState(action, null)

    useEffect(() => {
            if (state && state.success) {
                console.log("state:", state)
                toast("shared successfully!")
                
            }

            if(state && state.error){
                console.log("state:", state)
                toast("Cannot share")
            }
        }, [state])
  return (
    <div>
        <form action={formAction}>
            <input hidden type="text" name="share" value={share} />
            <input hidden type="text" name="state" value={stateShare} />
            <button type="submit" className='bg-blue-500 rounded-md px-2 py-2 text-white'>Share</button>
        </form>
    </div>
  )
}

export default ShareButton