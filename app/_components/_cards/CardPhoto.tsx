"use client";

import { PHOTO_TYPE } from '@/app/_types/types';
import React from 'react'

type Props = {
    photo: PHOTO_TYPE
}
const CardPhoto = ({photo}: Props) => {
  return (
    <div className='px-2'>
        <img src={photo.url} alt={photo._id} className='w-40 h-30 object-cover rounded-lg' />
    </div>
  )
}

export default CardPhoto