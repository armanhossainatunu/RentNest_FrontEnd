"use server";

import { cookies } from "next/headers";

export  type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  error: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export const loginAction = async (
  prevState: LoginState,
  formData: FormData,
) => {
  console.log(prevState, "this  is prevstate");
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email, password);
  const paylode = {
    email,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paylode),
  });
  const result = await res.json();

  if (result.success) {
    const cookieStore = cookies();
    (await cookieStore).set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    (await cookieStore).set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
  }

  return result;
};
