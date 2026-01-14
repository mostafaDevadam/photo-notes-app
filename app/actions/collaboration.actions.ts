"use server";

import { removeCollaboration, removeCollaborationMember } from "../api/collaboration.api";


export const removeCollaborationMemberAction = async (prevState: any, formData: FormData) => {
    const memberId = formData.get("memberId") as string
    const collaborationId = formData.get("collaborationId") as string

    console.log("removeCollaborationMemberAction formData:", formData)

    try {
        const res = await removeCollaborationMember(collaborationId, memberId)
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to removeCollaboration Member:", error);
        return { error: "Failed to removeCollaboration Member" }
    }

}
export const removeCollaborationAction = async (prevState: any, formData: FormData) => {
    const collaborationId = formData.get("collaborationId") as string

    console.log("removeCollaborationAction formData:", formData)

    try {
        const res = await removeCollaboration(collaborationId)
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to removeCollaboration:", error);
        return { error: "Failed to removeCollaboration" }
    }
}