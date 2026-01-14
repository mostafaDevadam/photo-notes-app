"use client";

import React, { useActionState, useState } from 'react'
import { FOLDER_TYPE, PHOTO_TYPE } from '../../_types/types';
import { FaFolder } from 'react-icons/fa';
import { getPhotosByFolderIdAction, updatePhotoAction, updatePhotoWithFolderAction } from '../../actions/photo.actions';
import Image from 'next/image';
import { updateFolderByIdAction } from '../../actions/folder.actions';
import AlbumForm from '.././_forms/AlbumForm';
import FolderDialogButton from '.././_buttons/FolderDialogButton';
import UploadPhotoButton from '.././_buttons/UploadPhotoButton';
import ShareButton from '.././_buttons/ShareButton';
import { createShareByUserIdAction } from '../../actions/share.actions';

type Props = {
  folders: FOLDER_TYPE[],
  userId: any,
}

const GridFolders = ({ folders, userId }: Props) => {

  const [folder, setFolder] = useState<FOLDER_TYPE | null>()
  const [folderId, setFolderId] = useState<string | null>()
  const [photos, setPhotos] = useState<PHOTO_TYPE[]>()
  const [photo, setPhoto] = useState<PHOTO_TYPE | null>()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [state, setState] = useState<'Folder' | 'Photo' | null>(null)
  const folderAction = useActionState(updateFolderByIdAction, null)

  const handleSelectFolder = (folder: FOLDER_TYPE) => {
    setIsEdit(false)
    setFolder(folder)
    setPhoto(null)
    setState('Folder')
    setFolderId(folder?._id)
    const formData = new FormData();
    formData.append("folderId", folder._id!!);
    getPhotosByFolderIdAction(null, formData)
      .then((data) => {
        console.log("data:", data)
        setPhotos(data.data)
      })
  }

  const handleSelectPhoto = (photo: PHOTO_TYPE) => {
    console.log("photo:", photo)
    setState('Photo')
    setIsEdit(false)
    setPhoto(photo)
    setFolder(null)
  }

  const handleSwitchEdit = (e: any) => {
    e.preventDefault()
    if (isEdit) {
      setIsEdit(!isEdit)
      return
    } else {
      setIsEdit(true)
    }

  }


  return (
    <div className='border flex flex-row gap-5'>
      <div className='border w-1/3 '>
        <div className='flex justify-end h-10 mt-5 px-2'>
          <FolderDialogButton />

        </div>
        <div className='flex flex-row flex-wrap mt-5'>
          {
            folders.map((folder) => {
              return (
                <div key={folder._id} className='border px-2 py-2 w-1/2 flex flex-col' onClick={(e) => handleSelectFolder(folder)}>
                  <div className='text-center mx-auto'>
                    <FaFolder size={80} className='text-blue-500' />
                  </div>
                  <p className='text-center'>{folder.name}</p>

                </div>
              )
            })
          }
        </div>

      </div>
      <div className='border w-1/3'>

        <div className='flex flex-col py-2 px-2'>
          {
            photos &&
            <div className='flex justify-end'>
              <UploadPhotoButton userId={userId} folderId={folderId} />
            </div>
          }

          <div className='flex flex-row flex-wrap gap-3 px-4'>
            {
              photos &&
              photos?.map((photo) => (
                <div key={photo._id} className='h-40 w-48 flex justify-center mt-5'>
                  {photo.url && <img src={photo.url} alt="image" className='rounded-md' onClick={(e) => handleSelectPhoto(photo)} />}
                </div>
              ))
            }
          </div>

        </div>


      </div>
      <div className='border w-1/3'>
        {
          !photo && folder &&
          <>
            <div className='flex flex-col gap-5 px-2'>
              <div className='flex justify-between mt-3'>
                <ShareButton action={createShareByUserIdAction} share={folder?._id} stateShare='Folder' />
                <button className='bg-blue-500 rounded-md px-4 py-2 text-white' onClick={handleSwitchEdit}>Edit</button>
              </div>
              <div className='text-center mx-auto'>
                <FaFolder size={80} className='text-blue-500' />
              </div>

              <AlbumForm action={updateFolderByIdAction} folder={folder} isEdit={isEdit} setIsEdit={setIsEdit} />
            </div>
          </>
        }
        {
          !folder && photo &&

          <>
            <div className='flex flex-col gap-5 px-2 py-2'>
              <div className='flex justify-between'>
                <ShareButton action={createShareByUserIdAction} share={photo?._id} stateShare='Photo' />
                <button className='bg-blue-500 rounded-md px-4 py-2 text-white' onClick={handleSwitchEdit}>Edit</button>
              </div>
              <div className='text-center mx-auto'>
                {photo.url && <img src={photo.url} alt="image" className='rounded-md' />}
              </div>

              <AlbumForm action={updatePhotoAction} photo={photo} isEdit={isEdit} setIsEdit={setIsEdit} />
            </div>
          </>

        }


      </div>
    </div>
  )
}

export default GridFolders