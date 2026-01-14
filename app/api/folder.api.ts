import { getID } from "../_lib/id"
import { FOLDER_TYPE } from "../_types/types"
import { callApi } from "./callApi"


const prefix = "folders"

export const createFolderByUserId = async (folder: FOLDER_TYPE) => {
    console.log("createFolderByUserId folder:", folder)
    const userId = await getID()
    if (!userId) return null
    const response = await callApi<FOLDER_TYPE>(`${prefix}/user/${userId}`, "POST", folder)
    console.log("createFolderByUserId response:", response)
    return response.data
}
export const getAllFoldersByUserId = async () => {
    const userId = await getID()
    if (!userId) return null
    const response = await callApi<FOLDER_TYPE[]>(`${prefix}/all/user/${userId}`, "GET")
    console.log("findAllFoldersByUserId response:", response)
    return response.data

}
export const getFolderById = async (folderId: any) => {
    const response = await callApi<FOLDER_TYPE>(`${prefix}/${folderId}`, "GET")
    console.log("getFolderById response:", response)
    return response.data
}
export const updateFolderById = async (folderId: any, folder: FOLDER_TYPE) => {
    const response = await callApi<FOLDER_TYPE>(`${prefix}/${folderId}`, "PATCH", folder)
    console.log("updateFolderById response:", response)
    return response.data
}
export const deleteFolderById = async (folderId: any) => {
    const response = await callApi<FOLDER_TYPE>(`${prefix}/${folderId}`, "DELETE")
    console.log("deleteFolderById response:", response)
    return response.data
}