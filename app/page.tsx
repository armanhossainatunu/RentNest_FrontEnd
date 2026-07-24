import { getMe } from "@/service/getMe";
import Image from "next/image";

export default async function Home() {
  const user = await getMe()
  console.log(user);
  return (
   <div className="text-center font-bold ">
    <h1>Hello, Next.js world</h1>
    <h1>Hello, Next.js world</h1>
   </div>
  );
}
