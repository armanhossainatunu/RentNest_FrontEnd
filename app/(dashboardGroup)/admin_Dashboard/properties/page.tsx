import { getAdminProperties } from "../_actions/propertyActions";
import { getAllUsers } from "../_actions/userActions";
import AdminPropertiesTable from "../_components/PropertyTable";


export default async function AdminPropertiesPage() {
  const result = await getAdminProperties();
  console.log(result?.data?.properties.length);

  return (
    <section className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Property Management
      </h1>

      <AdminPropertiesTable
        properties={result?.data?.properties}
        
      />
    </section>
  );
}