"use server";

import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;
// GET ADMIN DASHBOARD
export async function getAdminDashboard() {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${BACKEND_URL}/admin/dashboard`, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch admin dashboard");
  }

  return res.json();
}

// GET REVENUE STATISTICS
// export async function getAdminRevenue() {
//   const cookieStore = await cookies();

//   const token = cookieStore.get("accessToken")?.value;

//   const res = await fetch(`${BACKEND_URL}/admin/dashboard/revenue`, {
//     method: "GET",

//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },

//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch revenue statistics");
//   }

//   return res.json();
// }
export async function getRevenueStats() {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/admin/dashboard/revenue`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  const text = await response.text();

  console.log("Revenue status:", response.status);
  console.log("Revenue response:", text);

  if (!response.ok) {
    throw new Error(`Revenue API failed: ${response.status} ${text}`);
  }

  return JSON.parse(text);
}
