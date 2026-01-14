"use server";

import { FOLDER_TYPE, SERVER_ACTION_PAYLOAD_TYPE } from "../_types/types";
import { createFolderByUserId, deleteFolderById, getAllFoldersByUserId, updateFolderById } from "../api/folder.api";

export const createFolderByUserIdAction = async (prevState: any, formData: FormData)  => {
    const name = formData.get("name") as string
    const description = formData.get("description")?.toString() || ''
    const description$ = formData?.getAll('description')[1]

    console.log("createFolderByUserIdAction formData:", formData, description)
    console.log("createFolderByUserIdAction description:", description$)

    try {
        const res = await createFolderByUserId({ name, description: description$.toString() })
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to create folder:", error);
        return { error: "Failed to create folder" }
    }

}

export const updateFolderByIdAction = async (prevState: any, formData: FormData) : Promise<SERVER_ACTION_PAYLOAD_TYPE<FOLDER_TYPE>> => {
    const folderId = formData.get("folderId") as string
    const name = formData.get("name") as string
    const description = formData.get("description") as string

    console.log("updateFolderByIdAction formData:", formData)

    try {
        const res = await updateFolderById(folderId, { name, description })
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to update folder:", error);
        return { error: "Failed to update folder" }
    }

}

export const deleteFolderByIdAction = async (prevState: any, formData: FormData) : Promise<SERVER_ACTION_PAYLOAD_TYPE<FOLDER_TYPE>> => {
    const folderId = formData.get("folderId") as string
    console.log("deleteFolderByIdAction formData:", formData)

    try {
        const res = await deleteFolderById(folderId)
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to update folder:", error);
        return { error: "Failed to update folder" }
    }
}


export const getFoldersByUserIdAction = async (prevState: any, formData: FormData) => {
    try {
        const res = await getAllFoldersByUserId()
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to get folders by userId:", error);
        return { error: "Failed to get folders by userId" }
    }
}