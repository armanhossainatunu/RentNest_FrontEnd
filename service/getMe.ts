"use server"

import { cookies } from "next/headers"

export async function getMe() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value
    if(!accessToken) return null
    const res = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
        method: "GET",
        headers: {
           cookie: `accessToken=${accessToken}`
        },
    })
    const result = await res.json()
    console.log(result);

    return result

}