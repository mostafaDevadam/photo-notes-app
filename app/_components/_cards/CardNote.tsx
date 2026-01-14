"use client";
import { NOTE_TYPE } from '@/app/_types/types';
import React from 'react'

type Props = {
  note: NOTE_TYPE
}
const CardNote = ({note}: Props) => {
  return (
    <div className='border rounded-lg h-10 px-2'>
      {note.content?.slice(0, 20)}
    </div>
  )
}

export default CardNote