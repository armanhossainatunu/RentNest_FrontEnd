"use server";

export type RegisterState = {
  success: boolean;
  statusCode: number;
  message: string;
  error: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      status: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string | null;
        bio: string | null;
        userId: string;
      };
    };
  };
};
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
