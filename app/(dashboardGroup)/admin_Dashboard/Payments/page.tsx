import { getPaymentHistory } from "../_actions/paymentActions";
import { getAllUsers } from "../_actions/userActions";
import AdminPaymentTable from "../_components/AdminPaymentTable";

export default async function AdminPaymentsPage() {
  const result = await getPaymentHistory();
  const users = await getAllUsers({ search: "", page: 1, limit: 6 });
  const userData =users.data.users.users
  // console.log(typeof userData,"payment dashbrod user");

  const payments = Array.isArray(result?.data) ? result.data : [];

  return (
    <section className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Payment History</h1>

        <p className="mt-1 text-gray-500">
          Monitor all platform payment transactions.
        </p>
      </div>

      <AdminPaymentTable payments={payments} userData={userData}/>
    </section>
  );
}
