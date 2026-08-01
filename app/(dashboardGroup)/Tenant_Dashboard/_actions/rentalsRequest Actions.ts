"use server";

import { cookies } from "next/headers";

export const getMyRentalRequests = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("Please login first.");
  }

  const res = await fetch(
    `${process.env.BACKEND_URL}/rentals`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
        next: {
          revalidate: 60 * 60 * 24,
        },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to fetch rental requests"
    );
  }

  return data;
};