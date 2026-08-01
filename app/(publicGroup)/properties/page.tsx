import { getProperties } from "./_actions/propertiesActions";
import PropertyFilter from "./_components/PropertyFilter";
import PropertyCard from "./_components/PropertyCard";
import { IProperty } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{
    location?: string;

    category?: string;

    minPrice?: string;

    maxPrice?: string;

    amenities?: string;
  }>;
}

export default async function Properties({ searchParams }: PageProps) {
  const filters = await searchParams;

  const response = await getProperties(filters);

  const propertyList = response?.data ?? response ?? [];
  // console.log("propertyList", propertyList);

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="mb-8 text-3xl font-bold">All Properties</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* FILTER SIDEBAR */}

        <aside className="lg:col-span-1">
          <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            <PropertyFilter propertyList={propertyList} />
          </div>
        </aside>
        {/* PROPERTY LIST */}

        <div className="lg:col-span-3">
          {propertyList.length === 0 ? (
            <div className="text-center text-xl font-semibold">
              No Properties Found
            </div>
          ) : (
            <div className="grid grid-cols-1  gap-6 md:grid-cols-3">
              {propertyList.map((property: IProperty) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
