"use client";

import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoMdCamera } from 'react-icons/io';
import { getPhotosByFolderIdAction, updatePhotoWithNoteAction, uploadPhotoByUserIdAction } from '@/app/actions/photo.actions';
import { getFoldersByUserIdAction } from '@/app/actions/folder.actions';
import { FOLDER_TYPE, PHOTO_TYPE } from '@/app/_types/types';

type Props = {
    noteId: any
}
const NotePhotoDialogButton = ({ noteId }: Props) => {


    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null); // Ref to trigger click
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSelectFolder, setIsSelectFolder] = useState<boolean>(false)
    const [isSelectPhoto, setIsSelectPhoto] = useState<boolean>(false)
    const [folders, setFolders] = useState<FOLDER_TYPE[] | null>(null)
    const [photos, setPhotos] = useState<PHOTO_TYPE[] | null>(null)

    const handleDivClick = () => {
        fileInputRef.current?.click(); // Programmatically open file dialog
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // Generate preview
            // Optional: Reset input after selection if needed
            // e.target.value = '';
            setImageFile(file);
        }
    };

    const handleUploadPhoto = (e: any) => {
        e.preventDefault();
        if (imageFile) {
            const formData = new FormData();
            formData.append("file", imageFile);

            uploadPhotoByUserIdAction(null, formData).then((th) => {
                console.log("handleUploadPhoto:", th.data?._id)
                const formData$ = new FormData();
                formData$.append("photoId", th.data?._id!!)
                formData$.append("noteId", noteId)
                updatePhotoWithNoteAction(null, formData$).then((th) => {
                    console.log("handleUploadPhoto with note:", th.data)
                })
                setPreview(null);
            });
        }

    }


    const handleCancel = () => {
        setPreview(null);
    };
    // getFoldersbyUserId, getPhotosByFolderId

    useEffect(() => {
        const formData = new FormData();
        getFoldersByUserIdAction(null, formData).then((th) => {
            console.log("useEffect getFoldersByUserIdAction:", th.data)
            setFolders(th.data!!)
        })
    }, [])

    const handleSelectFolder = (e: any) => {
        setIsSelectFolder(true)
        const formData = new FormData();
        formData.append("folderId", e.target.value!!);
        getPhotosByFolderIdAction(null, formData).then((th) => {
            console.log("handleSelectFolder getPhotosByFolderIdAction:", th.data)
            setPhotos(th.data!!)
        })
    }

    const handleSelectPhoto = (e: any) => {
        if (isSelectFolder) {
            setIsSelectPhoto(true)
            const formData = new FormData();
            formData.append("photoId", e.target.value!!);
            formData.append("noteId", noteId)
           updatePhotoWithNoteAction(null, formData).then((th) => {
                console.log("handleSelectPhoto updatePhotoWithNoteAction:", th.data)
            })
        }

    }


    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <button className='bg-blue-500 rounded-md px-2 py-2 text-white'>Add Photo</button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-center'>New Folder</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>

                    <div className='w-full'>
                        <Tabs defaultValue="drive" className="w-[450px]">
                            <TabsList>
                                <TabsTrigger value="drive">Drive</TabsTrigger>
                                <TabsTrigger value="upload">Upload</TabsTrigger>

                            </TabsList>
                            <TabsContent value="drive">
                                <div className='flex flex-col gap-5'>
                                    <div>
                                        <select name="folderId" onChange={handleSelectFolder} 
                                        className='w-full px-2 py-2 border rounded-lg'>
                                            <option value="0">choose</option>
                                            { folders && folders?.map((folder, index) => (
                                                <option value={folder._id}>{folder.name}</option>
                                            ))
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <select name="photoId" onChange={handleSelectPhoto} disabled={!isSelectFolder}
                                        className='w-full px-2 py-2 border rounded-lg'>
                                            <option value="0">choose</option>
                                            {
                                                photos && photos?.map((photo, index) => (
                                                <option value={photo._id}>{photo.user}</option>
                                            ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="upload" className=' w-full'>
                                <div
                                    onClick={handleDivClick}
                                    className={`h-60 w-full mx-auto rounded-lg px-2 flex justify-center items-center cursor-pointer hover:border-blue-400 transition-colors bg-gray-50
                                                    ${preview ? '' : 'border-2 border-gray-300 border-dashed'}
                                                    `}>

                                    {!preview && <>
                                        <span className="text-gray-500 mt-5">Drop or click to upload image</span>
                                        <IoMdCamera size={200} className='text-gray-400' />
                                    </>}

                                    {preview &&
                                        <>
                                            <IoMdCamera size={200} className='text-gray-100 z-10 absolute opacity-50' onClick={handleDivClick} />
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                        </>

                                    }
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden" // Hidden input
                                    />

                                </div>

                                <div className=' w-full'>
                                    <button className="bg-blue-500 mt-5 text-white w-full py-2 rounded-lg disabled:opacity-50" disabled={!preview}
                                        onClick={handleUploadPhoto}
                                    >
                                        Upload
                                    </button>
                                </div>



                            </TabsContent>

                        </Tabs>
                    </div>

                    <DialogClose asChild>
                        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                    </DialogClose>
                </DialogContent>

            </Dialog>
        </div>
    )
}


export default NotePhotoDialogButton