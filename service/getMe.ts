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
        cache: "force-cache",
        next:{
            // validate: 60 * 60 * 24,
            revalidate: 60 * 60 * 24,
            tags: ["my-profile"]
        }
    })
    const result = await res.json()
  
    return result

}