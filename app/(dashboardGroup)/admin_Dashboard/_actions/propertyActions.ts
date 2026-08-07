
"use server";

import { cookies } from "next/headers";

export async function getAdminProperties() {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_URL}/admin/properties`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  const result = await res.json();

  return result;
}
