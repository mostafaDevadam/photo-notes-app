"use server";

import { confirmInvitation, createInvitationByUserId, removeInvitation, updateInvitation } from "../api/invitation.api";


export const createInvitationByUserIdAction = async (prevState: any, formData: FormData) => {
    const note = formData.get("noteId") as string
    //const sender = formData.get("sender") as string
    const receiver = formData.get("receiver") as string
    const message = formData.get("message") as string


    console.log("createInvitationByUserIdAction formData:", formData)

    try {
        const res = await createInvitationByUserId({ note, receiver, message })
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to createInvitation:", error);
        return { error: "Failed to createInvitation" }
    }
}



export const confirmInvitationAction = async (prevState: any, formData: FormData) => {
    const invitationId = formData.get("invitationId") as string
    const isConfirmed = formData.get("isConfirmed") as string
    const isCanceled = formData.get("isCanceled") as string

    console.log("confirmInvitationAction formData:", formData)

    const isCanceled_ = Boolean(isCanceled)
    const isConfirmed_ = Boolean(isConfirmed)


    if (isCanceled_ && isConfirmed_) return { error: "isCanceled and isConfirmed cannot be true at the same time" }

    if (!isCanceled_ && !isConfirmed_) return { error: "isCanceled and isConfirmed cannot be false at the same time" }


    if (isCanceled_) {
        try {
            const res = await confirmInvitation(invitationId, { isCanceled: isCanceled_ })
            return { success: true, data: res }
        } catch (error) {
            console.log("Failed to cancel Invitation:", error);
            return { error: "Failed to cacnel Invitation" }
        }
    }

    if (isConfirmed_) {
        try {
            const res = await confirmInvitation(invitationId, { isConfirmed: isConfirmed_ })
            return { success: true, data: res }
        } catch (error) {
            console.log("Failed to confirm Invitation:", error);
            return { error: "Failed to confirm Invitation" }
        }
    }


}

export const updateInvitationAction = async (prevState: any, formData: FormData) => {
    const invitationId = formData.get("invitationId") as string
    const message = formData.get("message") as string

    console.log("removeCollaborationAction formData:", formData)

    try {
        const res = await updateInvitation(invitationId, { message })
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to updateInvitation:", error);
        return { error: "Failed to updateInvitation" }
    }

}

export const removeInvitationAction = async (prevState: any, formData: FormData) => {
    const invitationId = formData.get("invitationId") as string

    console.log("removeCollaborationAction formData:", formData)

    try {
        const res = await removeInvitation(invitationId)
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to removeInvitation:", error);
        return { error: "Failed to removeInvitation" }
    }
}
