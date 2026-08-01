import { getMyRentalRequests } from "./_actions/rentalsRequest Actions";
import RentalRequestTable from "./_components/RentalRequestTable";

export default async function MyRentalRequestsPage() {
  const response = await getMyRentalRequests();

  const requests = response?.data || [];

  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="mb-6 text-3xl font-bold">
        My Rental Requests
      </h1>

      {requests.length === 0 ? (
        <div className="text-center text-lg">
          No rental requests found.
        </div>
      ) : (
        <RentalRequestTable requests={requests} />
      )}
    </section>
  );
}