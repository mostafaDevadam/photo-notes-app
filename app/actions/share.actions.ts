"use server";

import { SERVER_ACTION_PAYLOAD_TYPE, SHARE_TYPE } from "../_types/types";
import { createShareByUserId, deleteShare } from "../api/share.api";

export const createShareByUserIdAction = async (prevState: any, formData: FormData): Promise<SERVER_ACTION_PAYLOAD_TYPE<SHARE_TYPE>> => {
    const share = formData.get("share") as string
    const state = formData.get("state") as string

    console.log("createShareByUserIdAction formData:", formData)

    try {
        const res = await createShareByUserId({ share, state })
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to create share:", error);
        return { error: "Failed to create share" }
    }
}
export const deleteShareAction = async (prevState: any, formData: FormData): Promise<SERVER_ACTION_PAYLOAD_TYPE<SHARE_TYPE>> => {
    const shareId = formData.get("shareId") as string
    console.log("deleteFolderByIdAction formData:", formData)
    try {
        const res = await deleteShare(shareId)
        return { success: true, data: res }
    } catch (error) {
        console.log("Failed to remove share:", error);
        return { error: "Failed to remove share" }
    }

}