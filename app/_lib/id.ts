
import { cookies } from "next/headers"

// Set 
export const setID = async (id: string) => {
    const cookieStore = await cookies()
    const idCookie = cookieStore.set('id', id, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 7, path: '/' })
}

// Get
export const getID = async () => {
    const session = (await cookies()).get('id')?.value;
    console.log("session:", session)
    if (!session) return null;
    return session; //JSON.parse(session?.toString() || '')

}

// Delete
export const deleteID = async () => {
    (await cookies()).delete('id')
}