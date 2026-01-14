import { getID } from "../_lib/id"
import { PHOTO_TYPE, UPLOAD_TYPE } from "../_types/types"
import { callApi } from "./callApi"

const prefix = "photos"


export const uploadPhotoByUserId = async (formData: FormData): Promise<PHOTO_TYPE | null> => {
    console.log("uploadPhotoByUserId upload:", formData)
    const userId = await getID()
    if (!userId) return null
    const response = await callApi<PHOTO_TYPE>(`${prefix}/upload/user/${userId}`, "POST",formData, true)
    console.log("uploadPhotoByUserId response:", response)
    return response.data
}
export const getPhotosByUserId = async () => {
    const userId = await getID()
    if (!userId) return null
    const response = await callApi<PHOTO_TYPE[]>(`${prefix}/all/user/${userId}`, "GET")
    console.log("getPhotosByUserId response:", response)
    return response.data
}
export const getPhotosByFolderId = async (folderId: any) => {
const response = await callApi<PHOTO_TYPE[]>(`${prefix}/all/folder/${folderId}`, "GET")
    console.log("getPhotosByFolderId response:", response)
    return response.data
}
export const getPhotosByNoteId = async (noteId: any) => {
const response = await callApi<PHOTO_TYPE[]>(`${prefix}/all/note/${noteId}`, "GET")
    console.log("getPhotosByNoteId response:", response)
    return response.data
}
export const getPhotoById = async (photoId: any) => {
const response = await callApi<PHOTO_TYPE>(`${prefix}/${photoId}`, "GET")
    console.log("getPhotoById response:", response)
    return response.data
}
export const updatePhoto = async (photoId: any, photo: PHOTO_TYPE) => {
const response = await callApi<PHOTO_TYPE>(`${prefix}/${photoId}`, "PATCH", photo)
    console.log("updatePhoto response:", response)
    return response.data
}
export const removePhoto = async (photoId: any) => {
const response = await callApi<PHOTO_TYPE>(`${prefix}/${photoId}`, "DELETE")
    console.log("removePhoto response:", response)
    return response.data
}