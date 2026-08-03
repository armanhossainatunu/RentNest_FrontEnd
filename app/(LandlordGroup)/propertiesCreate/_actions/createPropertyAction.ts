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

export const createPropertyAction = async (_: unknown, formData: FormData) => {
  const token = (await cookies()).get("accessToken")?.value;
  console.log(token);

  const propertyData = {
    title: formData.get("title"),
    thumbnail: formData.get("thumbnail"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    location: formData.get("location"),
    category: formData.get("category"),
  };

  const res = await fetch(`${process.env.BACKEND_URL}/landlord/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(propertyData),
  });

  const data = await parseResponseData(res);

  if (!res.ok) {
    return {
      success: false,
      message:
        typeof data?.message === "string"
          ? data.message
          : "Failed to create property",
    };
  }

  return {
    success: true,
    message: "Property created successfully",
  };
};
