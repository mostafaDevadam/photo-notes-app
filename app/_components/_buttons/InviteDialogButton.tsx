"use client";

import React, { use, useActionState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button';
import { getAllUsers } from '@/app/api/user.api';
import { USER_TYPE } from '@/app/_types/types';

type Props = {
    action: (prevState: any, formData: FormData) => Promise<any>
    noteId?: any
    userId?: any
    users: USER_TYPE[] | null


}
const InviteDialogButton = ({action, noteId, userId, users}: Props) => {
   const [state, formAction] = useActionState(action, null)

    //const users_ = use(getAllUsers())
    //console.log("users:", users)


  return (
    <div>
            <Dialog>
                <DialogTrigger asChild>
                     <button className='bg-blue-500 rounded-md px-2 py-2 text-white'>Invite</button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-center'>Note Invitation</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>

                    {/* form: user: select-option, message: textarea*/}

                   { <form action={formAction} className='flex flex-col gap-5'>
                        <input hidden type="text" name="noteId" value={noteId} />
                        <input hidden type="text" name="sender" value={userId} />
                        <div>
                            <select name="receiver" className='w-full px-2 py-2 border rounded-lg'>
                                <option value="0">choose</option>
                                {
                                  users && users.map((user) => userId != user._id && <option key={user._id} value={user._id}>{user.fullName}</option>)
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor='message'>Message:</label>
                            <textarea name="message" id="message" className='w-full border rounded-lg px-2'></textarea>
                        </div>
                        <div>
                            <button type='submit' className='w-full bg-blue-500 rounded-md px-2 py-2 text-white'>Invite</button>
                        </div>
                    </form>}

                   

                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                </DialogContent>

            </Dialog>
        </div>
  )
}

export default InviteDialogButton