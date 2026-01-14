import { getID } from "../_lib/id"
import { COLLABORATION_TYPE } from "../_types/types"
import { callApi } from "./callApi"

const prefix = "collaborations"
export const getAllCollborationsByMember = async () => {
    // /all/member/:memberId
    const userId = await getID()
    if (!userId) return null
    const response = await callApi<COLLABORATION_TYPE[]>(`${prefix}/all/member/${userId}`, "GET")
    console.log("getAllByMember response:", response)
    return response.data
}
export const getCollborationById = async (id: any) => {
    // /:id
    const response = await callApi<COLLABORATION_TYPE>(`${prefix}/${id}`, "GET")
    console.log("getCollborationById response:", response)
    return response.data
}
export const removeCollaborationMember = async (id: any, memberId: any) => {
    // /:id/remove/member/:memberId
      const response = await callApi<COLLABORATION_TYPE>(`${prefix}/${id}/remove/member/${memberId}`, "PATCH")
    console.log("removeCollaborationMember response:", response)
    return response.data
}
export const removeCollaboration = async (id: any) => {
    // /:id
     const response = await callApi<COLLABORATION_TYPE>(`${prefix}/${id}`, "DELETE")
    console.log("removeCollaboration response:", response)
    return response.data
}