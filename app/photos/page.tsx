import React from 'react'
import { getPhotosByUserId } from '../api/photo.api'
import PhotosList from '../_components/_list/PhotosList'

const PhotosPage = async () => {
    const photos = await getPhotosByUserId()
    console.log("photos:", photos)

  return (
    <div>
        <PhotosList photos={photos!!} />
    </div>
  )
}

export default PhotosPage