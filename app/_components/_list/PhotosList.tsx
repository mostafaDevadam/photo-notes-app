import { PHOTO_TYPE } from '@/app/_types/types'
import React from 'react'

type Props = {
    photos: PHOTO_TYPE[]
}
const PhotosList = ({photos}: Props) => {
  return (
    <div className='flex flex-row flex-wrap gap-5 mx-auto'>
        {photos.map((photo) => (<div key={photo._id}><img src={photo.url} alt={photo._id} className='w-40 h-30 object-cover rounded-lg' /></div>))}
    </div>
  )
}

export default PhotosList