"use server";

import { cookies } from "next/headers";

export const createPropertyAction = async (
  _: unknown,
  formData: FormData
) => {
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

  const res = await fetch(
    `${process.env.BACKEND_URL}/landlord/properties`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(propertyData),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: data.message || "Failed to create property",
    };
  }

  return {
    success: true,
    message: "Property created successfully",
  };
};