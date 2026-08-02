import RentalRequestTable from "./_components/RentalRequestTable";
import { getMyRentalRequests } from "./_actions/rentalsRequestActions";

export default async function LandlordDashboardPage() {
  const response = await getMyRentalRequests();

  const requests = response?.data || [];

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="mb-8 text-3xl font-bold">Landlord Dashboard</h1>

      <RentalRequestTable requests={requests} />
    </section>
  );
}
