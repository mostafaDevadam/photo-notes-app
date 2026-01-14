"use client";

import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button';
import NoteForm from '../_forms/NoteForm';

const NoteDialogButton = () => {
  return (
  <div>
            <Dialog>
                <DialogTrigger asChild>
                     <button className='bg-blue-500 rounded-md px-2 py-2 text-white'>Add Note</button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-center'>New Folder</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>

                    <NoteForm  />

                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                </DialogContent>

            </Dialog>
        </div>
  )
}

export default NoteDialogButton