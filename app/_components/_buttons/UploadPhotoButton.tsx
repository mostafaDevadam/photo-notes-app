"use client";


import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { IoMdCamera } from 'react-icons/io';
import { updatePhotoWithFolderAction, uploadPhotoByUserIdAction } from '@/app/actions/photo.actions';

type Props = {
    //action: (prevState: any, formData: FormData) => void
    userId: any
    folderId?: any
    noteId?: any
}
const UploadPhotoButton = ({ userId, folderId, noteId }: Props) => {

    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null); // Ref to trigger click
    const [imageFile, setImageFile] = useState<File | null>(null);

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

    useEffect(() => {


        return () => {
            // Code here runs when the component unmounts (componentWillUnmount equivalent)
            //console.log('Component is unmounting, cleaning up...');
            //setPreview(null);
        };
    }, [preview]);

    const handleCancel = () => {
        setPreview(null);
    };

    const handleUploadPhoto = (e: any) => {
        e.preventDefault();
        if (imageFile) {
            const formData = new FormData();
            formData.append("file", imageFile);
            if (folderId) {
                uploadPhotoByUserIdAction(null, formData).then((th) => {
                    console.log("handleUploadPhoto:", th.data?._id)
                    const formData$ = new FormData();
                    formData$.append("photoId", th.data?._id!!)
                    formData$.append("folderId", folderId)
                    updatePhotoWithFolderAction(null, formData$).then((th) => {
                        console.log("handleUploadPhoto with folder:", th.data)
                    })
                    setPreview(null);
                });
            }
            else if(noteId){
                
            }
        }

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className='bg-blue-500 rounded-md px-2 py-2 text-white'>Upload</button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center'>Upload Photo</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <div
                    onClick={handleDivClick}
                    className={`h-60 rounded-lg px-2 flex justify-center items-center cursor-pointer hover:border-blue-400 transition-colors bg-gray-50
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


                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50" disabled={!preview}
                    onClick={handleUploadPhoto}
                >
                    Upload
                </button>


                <DialogClose asChild>
                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                </DialogClose>
            </DialogContent>

        </Dialog>
    )
}

export default UploadPhotoButton