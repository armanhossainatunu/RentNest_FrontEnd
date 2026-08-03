import RentalRequestTable from "./_components/RentalRequestTable";
import { getMyRentalRequests } from "./_actions/rentalsRequestActions";
import { getMe } from "@/service/getMe";
import { getProperties } from "@/app/(publicGroup)/properties/_actions/propertiesActions";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import UpdatePropertyDialog from "@/app/(LandlordGroup)/propertiesCreate/_components/updateProperties";

export default async function LandlordDashboardPage() {
  const response = await getMyRentalRequests();

  const user = await getMe();

  const userEmail = user?.data?.profile?.email;

  const PropertiesResponse = await getProperties();

  const allProperties = PropertiesResponse?.data || [];

  const myProperties = allProperties.filter(
    (property: any) => property.author?.email === userEmail,
  );

  const requests = response?.data || [];

  // console.log("Landlord Email:", userEmail);

  // console.log("My Properties:", myProperties);

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="mb-8 text-3xl font-bold">Landlord Dashboard</h1>
      <RentalRequestTable requests={requests} />
      {/* My Properties */}
      {/* <div className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">My Properties</h2>

        {myProperties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {myProperties.map((property: any) => (
              <div key={property.id} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-bold">{property.title}</h3>
                </div>

                <p>{property.location}</p>

                <p>Price: {property.price}</p>
              </div>
            ))}
          </div>
        )}
      </div> */}
      <div className="grid grid-cols-3 gap-5">
        {myProperties.map((property: any) => (
          <div key={property.id} className="rounded-lg border p-4">
            <img
              src={property.thumbnail}
              alt={property.title}
              className="h-40 w-full rounded object-cover"
            />

            <div className="flex justify-between mt-3">
              <h3 className="font-bold">{property.title}</h3>
              <UpdatePropertyDialog property={property} user={user} />
            </div>

            <p>{property.location}</p>

            <p>Price: {property.price}</p>
          </div>
        ))}
      </div>
      ; {/* Example usage with the first property */}
    </section>
  );
}
