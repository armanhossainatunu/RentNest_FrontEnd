"use server";

import { cookies } from "next/headers";

export async function getMyProperties() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  const response = await fetch(
    `${process.env.BACKEND_URL}/landlord/requests`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
console.log("getMyProperties response:", response);
  return response.json();
}