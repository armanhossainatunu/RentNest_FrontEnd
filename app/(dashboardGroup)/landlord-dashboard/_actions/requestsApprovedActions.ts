"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateRentalRequestStatus = async (
  rentalId: string,
  rentalstatus: "APPROVED" | "REJECTED",
) => {
  const token = (await cookies()).get("accessToken")?.value;
  console.log(token);
  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${process.env.BACKEND_URL}/requests/${rentalId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      rentalstatus,
    }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to update request");
  }

  revalidatePath("/landlord-dashboard");

  return result;
};
