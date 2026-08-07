"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function AdminRentalTable({ rentals }: any) {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  // Filter
  const filteredRentals =
    statusFilter === "ALL"
      ? rentals
      : rentals.filter((item: any) => item.rentalstatus === statusFilter);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredRentals.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentRentals = filteredRentals.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-5">
      {/* Status Filter */}
      <div className="flex flex-wrap gap-3">
        {["ALL", "PENDING", "APPROVED", "ACTIVE", "REJECTED"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              statusFilter === status
                ? "bg-black text-white"
                : "border bg-white"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Property</th>

              <th className="p-3 text-left">Tenant</th>

              <th className="p-3 text-left">Landlord</th>

              <th className="p-3 text-left">Price</th>

              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {currentRentals.length > 0 ? (
              currentRentals.map((item: any) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  {/* Property */}
                  <td className="p-3">
                    <p className="font-medium">{item.property?.title}</p>

                    <p className="text-sm text-gray-500">
                      {item.property?.location}
                    </p>
                  </td>

                  {/* Tenant */}
                  <td className="p-3">
                    {item.tenant ? (
                      <>
                        <p className="font-medium">{item.tenant.name}</p>

                        <p className="text-sm text-gray-500">
                          {item.tenant.email}
                        </p>
                      </>
                    ) : (
                      "N/A"
                    )}
                  </td>

                  {/* Landlord */}
                  <td className="p-3">
                    <p>{item.property?.author?.name}</p>

                    <p className="text-sm text-gray-500">
                      {item.property?.author?.email}
                    </p>
                  </td>

                  {/* Price */}
                  <td>৳ {item.property?.price}</td>

                  {/* Status */}
                  <td>
                    <span
                      className={
                        item.rentalstatus === "ACTIVE"
                          ? "text-green-600"
                          : item.rentalstatus === "REJECTED"
                            ? "text-red-600"
                            : "text-orange-600"
                      }
                    >
                      {item.rentalstatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-5 text-center text-gray-500">
                  No rental request found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2">
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
