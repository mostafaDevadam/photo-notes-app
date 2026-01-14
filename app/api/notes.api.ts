import { getID } from "../_lib/id"
import { NOTE_TYPE } from "../_types/types"
import { callApi } from "./callApi"

const prefix = "notes"
export const createNoteByUserId = async (note: NOTE_TYPE) => {
    const userId = await getID()
    if (!userId) return null
    const response = await callApi<NOTE_TYPE>(`${prefix}/user/${userId}`, "POST", note)
    console.log("createNoteByUserId response:", response)
    return response.data
}
export const getAllNotesByUserId = async () => { 
    const userId = await getID()
    if (!userId) return null
    const response = await callApi<NOTE_TYPE[]>(`${prefix}/all/user/${userId}`, "GET")
    console.log("getAllNotesByUserId response:", response)
    return response.data
}

export const getNoteById = async (noteId: any) => {
    const response = await callApi<NOTE_TYPE>(`${prefix}/${noteId}`, "GET")
    console.log("getNoteById response:", response)
    return response.data
 }

export const updateNoteById = async (noteId: any, note: NOTE_TYPE) => {
    const response = await callApi<NOTE_TYPE>(`${prefix}/${noteId}`, "PATCH", note)
    console.log("updateNoteById response:", response)
    return response.data
 }

export const deleteNoteById = async (noteId: any) => {
    const response = await callApi<NOTE_TYPE>(`${prefix}/${noteId}`, "DELETE")
    console.log("deleteNoteById response:", response)
    return response.data
 }
