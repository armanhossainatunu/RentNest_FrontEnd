import { getMyRentalRequests } from "@/app/(dashboardGroup)/Tenant_Dashboard/_actions/rentalsRequestActions";
import RentalRequestTable from "@/app/(dashboardGroup)/Tenant_Dashboard/_components/RentalRequestTable";


export default async function TenantDashboard() {
  const response = await getMyRentalRequests();

  const requests = response?.data || [];

  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="mb-6 text-3xl font-bold">My Rental Requests</h1>

      <RentalRequestTable requests={requests} />
    </section>
  );
}
