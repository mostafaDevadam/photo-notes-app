"use server";

import { cookies } from "next/headers"

// Set 
export const setToken = async (token: string) => {
    const cookieStore = await cookies()
    const tokenCookie = cookieStore.set('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 7, path: '/' })
}

// Get
export const getToken = async () => {
    const session = (await cookies()).get('token')?.value;
    console.log("session:", session)
    if (!session) return null;
    return session; //JSON.parse(session?.toString() || '')

}

// Delete
export const deleteToken = async () => {
    (await cookies()).delete('token')
}