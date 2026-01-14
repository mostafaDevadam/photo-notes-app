"use client";

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import AlbumForm from '../_forms/AlbumForm'
import { createFolderByUserIdAction } from '@/app/actions/folder.actions'

type Props = {
    children?: React.ReactNode
}
const FolderDialogButton = ({children}: Props) => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                     <button className='bg-blue-500 rounded-md px-2 py-2 text-white'>New Folder</button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-center'>New Folder</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>

                    <AlbumForm action={createFolderByUserIdAction} isCreate={true} />

                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                </DialogContent>

            </Dialog>
        </div>
    )
}

export default FolderDialogButton