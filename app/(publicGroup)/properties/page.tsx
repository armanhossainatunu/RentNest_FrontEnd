import { Button } from "@/components/ui/button";
import { getProperties } from "./_actions/propertiesActions";
import Link from "next/link";

export default async function Properties() {
  const properties = await getProperties();
  if (!properties || !properties?.data.length) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <h1 className="text-3xl font-bold flex items-center justify-center h-screen">
            No Properties Found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-3xl font-bold flex items-center justify-between">
        {/* <h1 >Properties</h1> */}
        <div>Properties</div>
        <div>Properties</div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {properties.data?.map((property: any) => (
          <div key={property.id} className="border mt-2">
            <img src={property.thumbnail} alt={property.title} />
            {/* <p>{property?.review.rating}</p> */}
              ({property.reviews.length} Reviews)
            <h2>{property.title}</h2>
            <p>{property.price}</p>
            <p>{property.location}</p>
            <div className="flex justify-between px-2">
              <p>Category:{property.category}</p>
              <p>Views:{property.views}</p>
            </div>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
        
          {property.author.name}
        </div>
            <div className="flex justify-between px-2 pb-3">
              <Button className="bg-green-400 py-3 px-6 text-white rounded-xl">
                Book Now
              </Button>
               <Button asChild>
            <Link href={`/properties/${property.id}`}>
              View Details
            </Link>
          </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
