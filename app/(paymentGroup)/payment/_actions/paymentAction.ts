"use server";

import { cookies } from "next/headers";
import { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export async function createPaymentAction(rentalRequestId: string) {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const decodeToken = accessToken
    ? (jwt.decode(accessToken) as JwtPayload)
    : null;
  // console.log("createPaymentAction token:", decodeToken);

  if (!decodeToken) {
    throw new Error("Authentication token not found. Please log in again.");
  }

  const response = await fetch(`${process.env.BACKEND_URL}/payments/create`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },

    body: JSON.stringify({
      rentalRequestId,
    }),
  });

  const result = await response.json();

  //   console.log("Payment API Response:", result.message, result.data.gatewayUrl);

  if (!response.ok) {
    throw new Error(result.message || "Payment creation failed");
  }

  const paymentUrl = result?.data?.gatewayUrl;

  if (!paymentUrl) {
    throw new Error("Payment URL not found");
  }

  // SSLCommerz Gateway redirect
  redirect(paymentUrl);
}
