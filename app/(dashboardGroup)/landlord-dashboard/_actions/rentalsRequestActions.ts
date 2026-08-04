"use server";

import { cookies } from "next/headers";

export const getMyRentalRequests = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${process.env.BACKEND_URL}/landlord/requests`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch rental requests");
  }

  return result;
};
