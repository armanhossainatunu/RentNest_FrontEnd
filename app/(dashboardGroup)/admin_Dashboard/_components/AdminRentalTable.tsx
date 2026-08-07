"use client";

import { useState } from "react";

export default function AdminRentalTable({ rentals, users }: any) {
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredRentals =
    statusFilter === "ALL"
      ? rentals
      : rentals.filter((item: any) => item.rentalstatus === statusFilter);

  return (
    <div className="space-y-5">
      {/* Status Filter */}
      <div className="flex gap-3">
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

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Property</th>
              <th>Tenant</th>
              <th>Landlord</th>
              <th>Price</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>

          <tbody>
            {filteredRentals.length > 0 ? (
              filteredRentals.map((item: any) => {
                const tenant = users?.find(
                  (user: any) => user.id === item.tenantId,
                );

                return (
                  <tr key={item.id} className="border-t">
                    <td className="p-3">{item.property.title}</td>

                    <td>
                      {tenant ? (
                        <div>
                          <p className="font-medium">{tenant.name}</p>

                          <p className="text-sm text-gray-500">
                            {tenant.email}
                          </p>
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    <td>
                      <p>{item.property.author.name}</p>

                      <p className="text-sm text-gray-500">
                        {item.property.author.email}
                      </p>
                    </td>

                    <td>৳ {item.property.price}</td>

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

                    <td>
                      {item.payment ? (
                        <div>
                          <p>{item.payment.status}</p>

                          <p className="text-sm">
                            {item.payment.transactionId}
                          </p>
                        </div>
                      ) : (
                        "Unpaid"
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="p-5 text-center">
                  No rental request found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
