import { getAllRentalRequests } from "../_actions/rentalActions";
import AdminRentalTable from "../_components/AdminRentalTable";

export default async function RentalRequestPage() {
  const result = await getAllRentalRequests();

  const rentals = result?.data || [];

  return (
    <section className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Rental Requests Management</h1>

      <AdminRentalTable rentals={rentals} />
    </section>
  );
}
