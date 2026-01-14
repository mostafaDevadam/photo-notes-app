import { getID } from "../_lib/id"
import { SHARE_TYPE } from "../_types/types"
import { callApi } from "./callApi"


const prefix = "shares"

export const createShareByUserId = async (share: SHARE_TYPE) => {
    const userId = await getID()
    if (!userId) return null
    share.user = userId
    const response = await callApi<SHARE_TYPE>(`${prefix}/user/${userId}`, "POST", share)
    console.log("createShareByUserId response:", response)
    return response.data
}
export const getAllSharesByUserId = async () => {
    const userId = await getID()
    if (!userId) return null
    const response = await callApi<SHARE_TYPE[]>(`${prefix}/all/user/${userId}`, "GET")
    console.log("getAllSharesByUserId response:", response)
    return response.data
}
export const getAllSharesByShare = async (share: any) => {
    const response = await callApi<SHARE_TYPE[]>(`${prefix}/all/share/${share}`, "GET")
    console.log("getAllSharesByShare response:", response)
    return response.data
}
export const deleteShare = async (shareId: any) => {
    const response = await callApi<SHARE_TYPE>(`${prefix}/${shareId}`, "GET")
    console.log("deleteShare response:", response)
    return response.data
}