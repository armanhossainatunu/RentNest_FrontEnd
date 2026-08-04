"use server";

import { cookies } from "next/headers";

export const createReview = async (data: {
  propertyId: string;
  rating: number;
  comment: string;
}) => {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) {
    throw new Error("Please login first.");
  }

  const res = await fetch(`${process.env.BACKEND_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to create review");
  }

  return result;
};
