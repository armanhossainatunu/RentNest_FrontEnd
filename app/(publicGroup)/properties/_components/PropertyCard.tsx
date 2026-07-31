import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PropertyCard({ property }: { property: any }) {
  return (
    <div
      className="overflow-hidden rounded-xl border bg-white shadow"
    >
      <div className="relative h-56">
        <Image
          src={property.thumbnail}
          alt={property.title}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold">{property.title}</h2>

        <div
          className="
flex
items-center
gap-2
text-sm
text-gray-500
"
        >
          <MapPin size={16} />

          {property.location}
        </div>

        <p className="mt-3 text-green-600 font-bold">৳ {property.price}</p>

        <Button className="mt-4 w-full">
          <Link href={`/properties/${property.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
