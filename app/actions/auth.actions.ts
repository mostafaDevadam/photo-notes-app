"use server";

import axios from "axios"
import { redirect } from "next/navigation"
import { deleteToken, setToken } from "../_lib/token"
import { cookies } from "next/headers"
import { deleteID, setID } from "../_lib/id";
import { siginIn } from "../api/auth.api";


export const loginAction = async (prevState: any, formData: FormData) => {
    console.log("formData:", formData, formData.get("email"), formData.get("password"))
    try {
       const response = await siginIn(formData.get("email") as string, formData.get("password") as string)
       if(!response || !response.accessToken) console.log("Invalid credentials")
        await setToken(response?.accessToken!!.toString())  
        await setID(response?.id!!.toString()) 
        } catch (error) {
       console.log("Failed to login:", error);
    }

    redirect("/");
}

export const logoutAction = async () => {
    // remove it from cookie
    await deleteToken()
    await deleteID()
    redirect("/login")
}