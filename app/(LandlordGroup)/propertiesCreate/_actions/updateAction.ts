"use server";

import { cookies } from "next/headers";

const parseResponseData = async (res: Response) => {
  const text = await res.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      message: text,
    };
  }
};

export const UpdatePropertyAction = async (
  id: string,
  payload: Record<string, unknown>,
  authorId: string,
) => {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) {
    throw new Error("Please login first");
  }

  if (!authorId) {
    throw new Error("Authentication required");
  }
  // @ts-ignore 
  const normalizedPayload = {
    ...payload,

    price: payload.price !== undefined ? Number(payload.price) : undefined,

    ...(typeof payload.category === "string"
      ? {
          category: payload.category.toUpperCase(),
        }
      : {}),

    ...(typeof payload.status === "string"
      ? {
          status: payload.status.toUpperCase(),
        }
      : {}),
  };

  const res = await fetch(`${process.env.BACKEND_URL}/properties/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(normalizedPayload),

    cache: "no-store",
  });

  const data = await parseResponseData(res);

  if (!res.ok) {

    throw new Error(data?.message || "Property update failed");
  }

  return data;
};
