import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import Properties from "./(publicGroup)/properties/page";
import { Suspense } from "react";
import PropertiesSkeleton from "./(publicGroup)/properties/_components/PropertiesSkeleton";

export default async function Home() {
  const user = await getMe();
  console.log(user);
  return (
    <div className="text-center font-bold ">
      <div className="sticky top-0 " >
      <Navbar user={user} />
      </div>

      <Suspense fallback={<PropertiesSkeleton />}>
        <Properties />
      </Suspense>
    </div>
  );
}
