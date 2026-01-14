import axios from "axios"
import { getToken } from "../_lib/token"
import { RESPONSE_TYPE } from "../_types/types"


const base_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL
export const callApi = async <T>(url: string, method: string,body?: any, isFile: boolean = false) => {
    const token = await getToken()
    const response = await axios({
        baseURL: `${base_URL}/${url}`,
        headers: {
            "Content-Type": !isFile ? "application/json": "multipart/form-data",
            "auth-token": token || ""
        },
        method: method,
        data: body
    })
    const res: RESPONSE_TYPE<T> = response.data
    return res
    
}