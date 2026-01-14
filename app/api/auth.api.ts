import { USER_TYPE } from "../_types/types"
import { callApi } from "./callApi"

const prefix = "auth"
export const siginUp = async (email: string, password: string) => {
    const response = await callApi<USER_TYPE>(`${prefix}/signup`, "POST", { email, password })
    console.log("siginUp response:", response)
    return response.data
}

export const siginIn = async (email: string, password: string) => {
    const response = await callApi<USER_TYPE>(`${prefix}/signin`, "POST", { email, password })
    console.log("siginIn response:", response)
    return response.data
}