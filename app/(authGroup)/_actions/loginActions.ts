"use server"
export const loginAction = async (formData: FormData) => {

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
  const result = await res.json()

  console.log(result);

  
};
