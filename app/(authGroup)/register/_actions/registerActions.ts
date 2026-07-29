"use server";

import { RegisterState } from "@/lib/types";


export const registerAction = async (
  prevState: RegisterState,
  formData: FormData,
) => {
  // console.log(prevState, "this  is prevstate");
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");
  // console.log(email, password);
  const paylode = {
    name,
    email,
    password,
    role
  };

  const res = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paylode),
  });
  const result = await res.json();


  return result;
};
