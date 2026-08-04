"use server";

import { cookies } from "next/headers";

export const deleteProperty = async (propertyId: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    if (!token) {
      throw new Error("Please login first.");
    }

    const res = await fetch(
      `${process.env.BACKEND_URL}/properties/${propertyId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Failed to delete property");
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
