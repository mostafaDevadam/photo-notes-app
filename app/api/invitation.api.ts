import { getID } from "../_lib/id"
import { INVITATION_TYPE } from "../_types/types"
import { callApi } from "./callApi"

const prefix = "invitations"

export const createInvitationByUserId = async (invitation: INVITATION_TYPE) => {
    //'/user/:userId'
    const userId = await getID()
    if (!userId) return null
    invitation.user = userId
    invitation.sender = userId
    const response = await callApi<INVITATION_TYPE>(`${prefix}/user/${userId}`, "POST", invitation)
    console.log("createInvitationByUserId response:", response)
    return response.data
}

export const confirmInvitation = async (invitationId: any, body: {isConfirmed?: boolean, isCanceled?: boolean}) => {
    //'/confirm/:invitationId'
    console.log("confirmInvitation body:", invitationId, body)
    const response = await callApi<INVITATION_TYPE>(`${prefix}/confirm/${invitationId}`, "PATCH", body)
    console.log("confirmInvitation response:", response)
    return response.data
}
export const getAllInvitationsByUserId = async () => {
    //'/all/user/:userId
    const userId = await getID()
    if (!userId) return null
    const response = await callApi<INVITATION_TYPE[]>(`${prefix}/all/user/${userId}`, "GET")
    console.log("findAllInvitationsByUserId response:", response)
    return response.data
}
export const getAllInvitationsBySenderId = async () => {
    //"/all/sender/:senderId"
    const userId = await getID()
    if (!userId) return null
    const response = await callApi<INVITATION_TYPE[]>(`${prefix}/all/sender/${userId}`, "GET")
    console.log("findAllInvitationsBySenderId response:", response)
    return response.data
}
export const getAllInvitationsByReceiverId = async () => {
    //"/all/receiver/:receiverId"
    const userId = await getID()
    if (!userId) return null
    const response = await callApi<INVITATION_TYPE[]>(`${prefix}/all/receiver/${userId}`, "GET")
    console.log("findAllInvitationsByReceiverId response:", response)
    return response.data
}
export const updateInvitation = async (id: any, invitation: INVITATION_TYPE) => {
    //'/:id'
     const response = await callApi<INVITATION_TYPE>(`${prefix}/${id}`, "PATCH", {message: invitation.message})
    console.log("updateInvitation response:", response)
    return response.data
}
export const removeInvitation = async (id: any) => {
    //'/:id'
     const response = await callApi<INVITATION_TYPE>(`${prefix}/${id}`, "DELETE")
    console.log("removeInvitation response:", response)
    return response.data
}