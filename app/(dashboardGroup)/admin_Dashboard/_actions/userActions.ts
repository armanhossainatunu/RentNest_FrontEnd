"use server";

import { cookies } from "next/headers";

// GET
export async function getAllUsers(query: {
  search?: string;
  page?: number;
  limit?: number;
}) {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  const params = new URLSearchParams();

  if (query.search) {
    params.set("search", query.search);
  }

  params.set("page", String(query.page ?? 1));
  params.set("limit", String(query.limit ?? 6));

  const res = await fetch(
    `${process.env.BACKEND_URL}/admin/users?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
   
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}
// PUT
export async function updateUserStatus(id: string, status: "BAN" | "UNBAN") {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const userStatus = status === "BAN" ? "BANNED" : "ACTIVE";

  const res = await fetch(
    `${process.env.BACKEND_URL}/admin/users/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: userStatus,
      }),
    },
  );

  const result = await res.json();

  return result;
}
// DELETE
export async function deleteUser(userId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_URL}/admin/users/${userId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  const result = await res.json();

  return result;
}