"use server";

import { NOTE_TYPE, SERVER_ACTION_PAYLOAD_TYPE } from "../_types/types";
import { createNoteByUserId, deleteNoteById, updateNoteById } from "../api/notes.api";


export const createNoteByUserIdAction = async (prevState: any, formData: FormData): Promise<SERVER_ACTION_PAYLOAD_TYPE<NOTE_TYPE>> => {
     const content = formData.get("content") as string

    console.log("createNoteByUserIdAction formData:", formData)
   
    try {
        const res = await createNoteByUserId({ content })
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to create note:", error);
        return { error: "Failed to create note" }
    }

}

export const updateNoteByIdAction = async (prevState: any, formData: FormData): Promise<SERVER_ACTION_PAYLOAD_TYPE<NOTE_TYPE>> => {
     const noteId = formData.get("noteId") as string
     const content = formData.get("content") as string

    console.log("updateNoteByIdAction formData:", formData)
   
    try {
        const res = await updateNoteById(noteId, { content })
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to update note:", error);
        return { error: "Failed to  update note" }
    }

}

export const deleteNoteByIdAction = async (prevState: any, formData: FormData): Promise<SERVER_ACTION_PAYLOAD_TYPE<NOTE_TYPE>> => {
    const noteId = formData.get("noteId") as string
    console.log("deleteNoteByIdAction formData:", noteId)
    try {
        const res = await deleteNoteById(noteId)
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to remove note:", error);
        return { error: "Failed to remove note" }
    }

}
