"use client";

import { COLLABORATION_TYPE, NOTE_TYPE, USER_TYPE } from '@/app/_types/types'
import React, { useState } from 'react'
import TextAreaEditor from '../_editor/TextAreaEditor'

type Props = {
  collabrations: COLLABORATION_TYPE[]
  userId: any
}
const GridCollaborations = ({ collabrations, userId }: Props) => {
  const [selectedCollaboration, setSelectedCollaboration] = useState<COLLABORATION_TYPE | null>(null)
  const [selectedNote, setSelectedNote] = useState<NOTE_TYPE | null>(null)
  const [isSelectedNote, setIsSelectedNote] = useState<boolean>(false)



  const handleSelectCollaboration = (e: any, collaboration: COLLABORATION_TYPE) => {
    e.preventDefault()
    setSelectedCollaboration(collaboration)
    setSelectedNote(collaboration.note)
    setIsSelectedNote(true)

  }


  return (
    <div className=' flex flex-row gap-5'>
      <div className=' w-full'>
        <div className='flex justify-end h-10  px-2'>

          {
            /* button */
          }
        </div>
       
        <div className='flex flex-row justify-between mx-auto '>
           <div className='w-1/2 flex flex-col gap-5 px-2 py-2 mt-5 border-r'>
            {
              /* list */
              collabrations && collabrations.map((collaboration) => (
                <div key={collaboration._id} className='border rounded-lg px-2 py-2 cursor-pointer ' onClick={(e) => handleSelectCollaboration(e, collaboration)}>
                  <p>{collaboration.note?.content}</p>
                </div>))
            }
          </div>
          <div className='w-1/2 flex flex-col gap-5 px-2 py-2 '>
            {isSelectedNote && selectedNote &&
              /* editor */
              <div>
                <div style={{ fontSize: '12px', color: '#888' }} className='flex gap-1 px-4'>
                  <span>Members:</span>
                  {
                    /* members */
                    selectedCollaboration &&selectedCollaboration.members && 
                    selectedCollaboration.members.map((member: USER_TYPE) => (<span key={member?._id}>{member?.fullName} </span>))
                  }
                </div>
                <div className='flex justify-between mt-3 px-4'>
                  <button className='bg-blue-500 rounded-md px-4 py-2 text-white'>Remove</button>
                  <button className='bg-blue-500 rounded-md px-4 py-2 text-white'>Save</button>
                </div>
                <TextAreaEditor userId={userId} noteContent={selectedNote.content!!} members={selectedCollaboration?.members!!} />
              </div>
              
            }
          </div>

        </div>


      </div>
    </div>
  )
}

export default GridCollaborations