import { Button } from "@/components/ui/button";
import { getProperties } from "./_actions/propertiesActions";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";


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
          <div key={property.id} className="border mt-2 overflow-hidden">
            <Image
              width={300}
              height={200}
              unoptimized
              className="hover:scale-120  duration-500 ease-in-out"
              src={property.thumbnail}
              alt={property.title}
            />
            <h2 className="text-lg font-bold px-2">{property.title}</h2>
            <div className="flex justify-between px-2 py-1.5">
              <p className="text-sm font-normal">${property.price}</p>
              <div className="flex items-center gap-2 text-sm font-normal">
                <MapPin size={18} />
                {property.location}
              </div>
            </div>
            <div className="flex justify-between px-2 pb-3">
              <Button className="bg-green-400 py-3 px-6 text-white rounded-xl">
               <Link href={`/properties/${property.id}`}>Book Now</Link>
              </Button>
              <Button className="bg-green-400 py-3 px-6 text-white rounded-xl">
                <Link href={`/properties/${property.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
