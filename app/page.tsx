import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import Properties from "./(publicGroup)/properties/page";
import { Suspense } from "react";
import PropertiesSkeleton from "./(publicGroup)/properties/_components/PropertiesSkeleton";

type SearchParams = {
  location?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  amenities?: string;
};

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const user = await getMe();
  // console.log(user, "user  page in home");
  const searchParamsPromise = Promise.resolve(searchParams);

  return (
    <div className="text-center font-bold ">
      <div className="sticky top-0 z-10 " >
      <Navbar user={user}  />
      </div>

      <Suspense fallback={<PropertiesSkeleton />}>
        <Properties searchParams={searchParamsPromise}  />
      </Suspense>
    </div>
  );
}
