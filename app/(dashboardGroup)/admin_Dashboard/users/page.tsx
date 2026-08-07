import { getAllUsers } from "../_actions/userActions";
import UserTable from "../_components/UserTable";

interface Props {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export default async function UsersPage({ searchParams }: Props) {
  const params = await searchParams;

  const result = await getAllUsers({
    search: params.search || "",
    page: Number(params.page) || 1,
    limit: 6,
  });

  return (
    <section className="p-6">
      <h1 className="mb-6 text-3xl font-bold">User Management</h1>

      <UserTable
        users={result.data.users}
        pagination={result.data.pagination}
      />
    </section>
  );
}
