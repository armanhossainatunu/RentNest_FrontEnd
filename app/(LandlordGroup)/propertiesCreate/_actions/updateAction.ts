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
    return { message: text };
  }
};

export const UpdatePropertyAction = async (
  id: string,
  payload: Record<string, unknown>,
  authorId: string,
) => {
  const token = (await cookies()).get("accessToken")?.value;

  if (!authorId) {
    throw new Error("Authentication required");
  }

  const normalizedPayload = {
    ...payload,
    ...(typeof payload.category === "string" && payload.category
      ? { category: payload.category.toUpperCase() }
      : {}),
    ...(typeof payload.status === "string" && payload.status
      ? { status: payload.status.toUpperCase() }
      : {}),
  };

  const res = await fetch(
    `${process.env.BACKEND_URL}/properties/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ ...normalizedPayload, authorId }),
      cache: "no-store",
    },
  );

  const data = await parseResponseData(res);

  if (!res.ok) {
    const message =
      typeof data?.message === "string"
        ? data.message
        : data?.error || "Property update failed";

    throw new Error(message);
  }

  return data;
};
