import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IProperty } from "@/lib/types";

export default function  PropertyCard({ property }: { property: IProperty }) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg">
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={property.thumbnail}
          alt={property.title}
          fill
          unoptimized
          className="object-cover transition duration-300 group-hover:scale-105"
        />

        <span className="absolute top-3 left-3 rounded-full bg-green-600 px-3 py-1 text-sm text-white">
          {property.category}
        </span>

        {/* Status */}
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-sm text-white ${
            property.status === "AVAILABLE" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {property.status === "AVAILABLE" ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        <h2 className="line-clamp-1 text-xl font-bold">{property.title}</h2>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={16} />
          {property.location}
        </div>

        {/* Property Info */}
        {/* <div className="flex justify-between border-y py-3 text-sm text-gray-600">

          <div className="flex items-center gap-1">
            <Bed size={16}/>
            {property.bedrooms || 0} Beds
          </div>

          <div className="flex items-center gap-1">
            <Bath size={16}/>
            {property.bathrooms || 0} Baths
          </div>

          <div className="flex items-center gap-1">
            <Square size={16}/>
            {property.area || 0} sqft
          </div>

        </div> */}

        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-green-600">৳ {property.price}</p>

          <span className="text-sm text-gray-500">/month</span>
        </div>

        <Button asChild className="w-full">
          <Link href={`/properties/${property.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
