import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import Properties from "./(publicGroup)/properties/page";

export default async function Home() {
  const user = await getMe();
  console.log(user);
  return (
    <div className="text-center font-bold ">
      <Navbar user={user} />
      <Properties />
    </div>
  );
}
