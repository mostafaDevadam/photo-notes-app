import { USER_TYPE } from "../_types/types"
import { callApi } from "./callApi"

const prefix = "users"
export const getAllUsers = async () => {
    const response = await callApi<any[]>(`${prefix}/all`, "GET")
    console.log("getAllUsers response:", response)
    return response.data
} 