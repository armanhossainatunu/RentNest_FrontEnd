import RentalRequestTable from "./_components/RentalRequestTable";
import { getMe } from "@/service/getMe";
import { getProperties } from "@/app/(publicGroup)/properties/_actions/propertiesActions";
import MyPropertyTable from "./_components/MyPropertyTable";
import { getMyRentalRequests } from "./_actions/rentalsRequestActions";

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
    <section className="mx-auto max-w-7xl px-5 py-10 space-y-10">
      <h1 className="mb-8 text-3xl font-bold text-center">Landlord Dashboard</h1>
      <RentalRequestTable requests={requests} />
      {/* My Properties */}
    
      <MyPropertyTable properties={myProperties} user={user}  />
    
      ; {/* Example usage with the first property */}
    </section>
  );
}
