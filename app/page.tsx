import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import Image from "next/image";

export default async function Home() {
  const user = await getMe()
  console.log(user);
  return (
   <div className="text-center font-bold ">
    <Navbar user={user} />
    <h1 className="text-3xl font-bold flex items-center justify-center h-screen">Hello, Next.js world</h1>
   
   </div>
  );
}
