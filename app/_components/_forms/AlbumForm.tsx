"use client";


import { FOLDER_TYPE, PHOTO_TYPE } from '@/app/_types/types';
import React, { useActionState, useState } from 'react'

type Props = {
    action: (prevState: any, formData: FormData) => void
    folder?: FOLDER_TYPE
    photo?: PHOTO_TYPE
    isEdit?: boolean
    setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>
    isCreate?: boolean
}

const AlbumForm = ({ action, folder, photo, isEdit, isCreate, setIsEdit }: Props) => {
    // const [isEdit, setIsEdit] = useState<boolean>(false)
    const [state, formAction] = useActionState(action, null)
    const [description, setDescription] = useState<string>('')

    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        description === e.target.value ? setDescription('') : setDescription(e.target.value)
        const { name, value } = e.target
        console.log(description)
    }
    return (
        <div>
            <form action={formAction} method='post'>

                <input type="hidden" name="folderId" value={folder?._id} />
                <input type="hidden" name="photoId" value={photo?._id} />
                {isCreate && <div className='flex flex-row gap-2 mb-5'>
                    <p className='text-start mt-1'>Name:</p>
                    <input type="text" name="name" className={` border rounded-md px-2 py-1 ms-10 w-full`} />
                </div>}

                {folder && <div className='flex flex-row gap-2 mb-5'>
                    <p className='text-start mt-1'>Name:</p>
                    <input type="text" name="name" readOnly={!isEdit} className={` rounded-md px-2 py-1 ms-10 ${isEdit ? 'border' : 'focus:outline-none'}`} defaultValue={folder.name} />
                </div>}
                <div className='flex flex-row gap-2'>
                    <p className='text-start mt-1'>Description:</p>


                    

                    <textarea id="description" name="description" readOnly={!isEdit} hidden={isCreate}
                        onChange={handleChangeDescription}
                        className={` px-2 py-2 resize-none w-80 ${ !isEdit ? '': 'border rounded-md focus:outline-none'}`}
                        defaultValue={folder ? folder.description : photo?.description || ''}
                    />


                    
                        <textarea id="description" name="description" hidden={!isCreate}
                            className={` px-2 py-2 border rounded-md resize-none w-full`}
                      />
                    
                    {
                        isEdit && <button onClick={() => setIsEdit && setIsEdit(!isEdit)} className='bg-blue-500 rounded-md px-2 py-1 text-white'>Cancel</button>                                                       
                    }


                </div>

                <div className='flex justify-end px-2 mt-5 w-full'>
                    <button type='submit' onClick={() => setIsEdit && setIsEdit(!isEdit)} className='w-full bg-blue-500 rounded-md px-4 py-2 text-white'>Save</button>
                </div>

            </form>
        </div>

    )
}

export default AlbumForm