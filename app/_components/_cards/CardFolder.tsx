"use client";

import { FOLDER_TYPE } from '@/app/_types/types';
import React from 'react'
import { FaFolder } from 'react-icons/fa';

type Props = {
  folder: FOLDER_TYPE
}

const CardFolder = ({ folder }: Props) => {
  return (
    <div className=''>
      <FaFolder size={80} className='text-blue-500' />
      <p>{folder.name}</p>
    </div>
  )
}

export default CardFolder