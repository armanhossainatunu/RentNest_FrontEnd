"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

import Pagination from "@/components/shared/Pagination";
import DeletePropertyButton from "@/app/(LandlordGroup)/propertiesCreate/_components/DeletePropertyButton";
import { Button } from "@/components/ui/button";

interface AdminPropertiesTableProps {
  properties: any[];
}
const ITEMS_PER_PAGE = 6;
export default function AdminPropertiesTable({
  properties,
}: AdminPropertiesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Search Property Title
  const [search, setSearch] = useState("");

  const filteredProperties = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return properties;
    }

    return properties.filter((property) =>
      property.title?.toLowerCase().includes(keyword),
    );
  }, [properties, search]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentProperties = filteredProperties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Property</th>
              <th className="p-3 text-left">Owner</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Reviews</th>
              <th className="p-3 text-center">Views</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentProperties.length > 0 ? (
              currentProperties.map((property) => (
                <tr key={property.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <div>
                      <p className="font-medium">{property.title}</p>
                      <p className="text-sm text-gray-500">
                        {property.location}
                      </p>
                    </div>
                  </td>

                  <td className="p-3">
                    <div>
                      <p>{property.author?.name}</p>
                      <p className="text-sm text-gray-500">
                        {property.author?.email}
                      </p>
                    </div>
                  </td>

                  <td className="p-3">{property.category}</td>

                  <td className="p-3">৳ {property.price.toLocaleString()}</td>

                  <td className="p-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        property.status === "AVAILABLE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    {property.reviews?.length || 0}
                  </td>

                  <td className="p-3 text-center">{property.views || 0}</td>

                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/properties/${property.id}`}
                        className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
                      >
                        <Eye size={16} />
                      </Link>

                      <DeletePropertyButton propertyId={property.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-10 text-center text-gray-500">
                  No properties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              size="sm"
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
