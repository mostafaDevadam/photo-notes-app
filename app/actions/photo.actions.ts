"use server";

import { PHOTO_TYPE, SERVER_ACTION_PAYLOAD_TYPE } from "../_types/types";
import { getPhotosByFolderId, getPhotosByNoteId, removePhoto, updatePhoto, uploadPhotoByUserId } from "../api/photo.api";

export const uploadPhotoByUserIdAction = async (prevState: any, formData: FormData): Promise<SERVER_ACTION_PAYLOAD_TYPE<PHOTO_TYPE>> => {

    const file = formData.get("file") as File

    console.log("createShareByUserIdAction formData:", formData)

    try {
        const res = await uploadPhotoByUserId(formData)
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to upload photo :", error);
        return { error: "Failed to upload photo" }
    }

}
export const updatePhotoWithFolderAction = async (prevState: any, formData: FormData): Promise<SERVER_ACTION_PAYLOAD_TYPE<PHOTO_TYPE>> => {
    const photoId = formData.get("photoId") as string
    const folder = formData.get("folderId") as string
    const description = formData.get("description") as string

    console.log("updatePhotoWithFolderAction formData:", formData)

    try {
        const res = await updatePhoto(photoId, { folder, description })
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to update photo with folderId:", error);
        return { error: "Failed to update photo with folderId" }
    }
}

export const updatePhotoAction = async (prevState: any, formData: FormData): Promise<SERVER_ACTION_PAYLOAD_TYPE<PHOTO_TYPE>> => {
    const photoId = formData.get("photoId") as string
    //const folder = formData.get("folderId") as string
    const description = formData.get("description") as string

    console.log("updatePhotoAction formData:", formData, description)

    try {
        const res = await updatePhoto(photoId, { description })
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to update photo with folderId:", error);
        return { error: "Failed to update photo with folderId" }
    }
}

export const updatePhotoWithNoteAction = async (prevState: any, formData: FormData): Promise<SERVER_ACTION_PAYLOAD_TYPE<PHOTO_TYPE>> => {
    const photoId = formData.get("photoId") as string
    const note = formData.get("noteId") as string
    const description = formData.get("description") as string
    try {
        const res = await updatePhoto(photoId, { note, description })
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to update photo with noteId:", error);
        return { error: "Failed to update photo with noteId" }
    }
}
export const removePhotoAction = async (prevState: any, formData: FormData): Promise<SERVER_ACTION_PAYLOAD_TYPE<PHOTO_TYPE>> => {
    const photoId = formData.get("photoId") as string

    try {
        const res = await removePhoto(photoId)
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to remove photo:", error);
        return { error: "Failed to remove photo" }
    }
}
export const getPhotosByFolderIdAction = async (prevState: any, formData: FormData): Promise<SERVER_ACTION_PAYLOAD_TYPE<PHOTO_TYPE[]>> => {
    const folderId = formData.get("folderId") as string
    try {
        const res = await getPhotosByFolderId(folderId)
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to get photos by folderId:", error);
        return { error: "Failed to get photos by folderId" }
    }
}

export const getPhotosByNoteIdAction = async (prevState: any, formData: FormData): Promise<SERVER_ACTION_PAYLOAD_TYPE<PHOTO_TYPE[]>> => {
    const noteId = formData.get("noteId") as string
    try {
        const res = await getPhotosByNoteId(noteId)
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to get photos by noteId:", error);
        return { error: "Failed to get photos by noteId" }
    }
}