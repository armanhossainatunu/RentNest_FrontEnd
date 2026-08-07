import {
  getAdminDashboard,
  getRevenueStats,
 
} from "./_actions/dashboardActions";

import AdminDashboardCards from "./_components/AdminDashboardCards";
import MonthlyRevenueChart from "./_components/MonthlyRevenueChart";
import YearlyRevenueChart from "./_components/YearlyRevenueChart";

export default async function AdminDashboardPage() {
  const [dashboardResult, revenueResult] = await Promise.all([
    getAdminDashboard(),
   getRevenueStats(),
  ]);

  const dashboardData = dashboardResult?.data;

  const revenueData = revenueResult?.data;

  return (
    <section className="space-y-6 p-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="mt-1 text-muted-foreground">
          Monitor your RentNest platform from one place.
        </p>
      </div>

      {/* Statistics */}

      <AdminDashboardCards data={dashboardData} />

      {/* Charts */}

      <div className="grid gap-6 lg:grid-cols-2">
        <MonthlyRevenueChart data={revenueData?.monthly || []} />

        <YearlyRevenueChart data={revenueData?.yearly || []} />
      </div>
    </section>
  );
}
