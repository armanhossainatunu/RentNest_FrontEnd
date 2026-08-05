"use server";

import { cookies } from "next/headers";

export const getMyRentalRequests = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  console.log(token);


  if (!token) {
    return {
      success: true,
      data: [],
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL}/rentals`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      data: [],
      message: data.message,
    };
  }

  return data;
};
