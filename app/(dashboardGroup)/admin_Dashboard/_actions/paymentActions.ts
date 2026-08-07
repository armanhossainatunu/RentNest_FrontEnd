// _actions/paymentActions.ts

"use server";

import { cookies } from "next/headers";

export async function getPaymentHistory() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_URL}/payments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to fetch payment history",
        data: [],
      };
    }

    return result;
  } catch (error) {
    console.error("PAYMENT HISTORY ERROR:", error);

    return {
      success: false,
      message: "Failed to fetch payment history",
      data: [],
    };
  }
}
