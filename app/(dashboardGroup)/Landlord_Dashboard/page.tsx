import RentalRequestTable from "./_components/RentalRequestTable";
import { getMyRentalRequests } from "./_actions/rentalsRequestActions";
import { getMe } from "@/service/getMe";
import { getProperties } from "@/app/(publicGroup)/properties/_actions/propertiesActions";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

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

  console.log("Landlord Email:", userEmail);

  console.log("My Properties:", myProperties);

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="mb-8 text-3xl font-bold">Landlord Dashboard</h1>

      <RentalRequestTable requests={requests} />

      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">My Properties</h2>

        {myProperties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {myProperties.map((property: any) => (
              <div key={property.id} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-bold">{property.title}</h3>
                  <Link href={`/dashboard/properties/${property.id}/edit`}>
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <p>{property.location}</p>

                <p>Price: {property.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
