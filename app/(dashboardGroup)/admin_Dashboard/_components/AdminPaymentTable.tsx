"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Iuser } from "@/lib/types";

interface AdminPaymentTableProps {
  payments: any[];
  userData: Iuser[] | any[];
}

const ITEMS_PER_PAGE = 10;

export default function AdminPaymentTable({
  payments,
  userData,
}: AdminPaymentTableProps) {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  console.log(userData, "payment table dashboard");

  // Search + Status Filter
  const filteredPayments = useMemo(() => {
    let result = payments || [];

    // Status filter
    if (statusFilter !== "ALL") {
      result = result.filter((payment: any) => payment.status === statusFilter);
    }

    // Transaction ID search
    if (search.trim()) {
      const searchValue = search.trim().toLowerCase();

      result = result.filter((payment: any) =>
        payment.transactionId?.toLowerCase().includes(searchValue),
      );
    }

    return result;
  }, [payments, statusFilter, search]);

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentPayments = filteredPayments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Status filter
  const handleFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  // Search
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Top Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Status Filter */}
        <div className="flex flex-wrap gap-2">
          {["ALL", "PAID", "UNPAID", "FAILED", "CANCELLED"].map((status) => (
            <Button
              key={status}
              size="sm"
              variant={statusFilter === status ? "default" : "outline"}
              onClick={() => handleFilter(status)}
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Transaction Search */}
        <div className="flex w-full sm:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search transaction ID..."
            className="w-full rounded-md border px-4 py-2 text-sm outline-none transition focus:ring-2 focus:ring-black sm:w-64"
          />
        </div>
      </div>

      {/* Result Count */}
      <div className="text-sm text-gray-500">
        Showing {currentPayments.length} of {filteredPayments.length} payments
      </div>
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Transaction</th>

              <th className="p-3 text-left">User</th>

              <th className="p-3 text-left">Property</th>

              <th className="p-3 text-left">Amount</th>

              <th className="p-3 text-left">Status</th>

              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {currentPayments.length > 0 ? (
              currentPayments.map((payment: any) => {
                const user = userData?.find(
                  (user) => user?.id === payment.userId,
                );

                return (
                  <tr key={payment.id} className="border-t hover:bg-gray-50">
                    {/* Transaction */}
                    <td className="p-3">
                      <p className="font-medium">
                        {payment.transactionId || "N/A"}
                      </p>

                      <p className="text-xs text-gray-400">
                        {payment.id?.slice(0, 8)}...
                      </p>
                    </td>

                    {/* User */}
                    <td className="p-3">
                      {user ? (
                        <div>
                          <p className="font-medium">{user.name}</p>

                          <p className="text-sm text-gray-500">{user.email}</p>

                          <p className="text-xs text-gray-400">{user.role}</p>
                        </div>
                      ) : (
                        <span className="text-gray-400">User not found</span>
                      )}
                    </td>

                    {/* Property */}
                    <td className="p-3">
                      <p className="font-medium">
                        {payment.rentalRequest?.property?.title || "N/A"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {payment.rentalRequest?.property?.location || ""}
                      </p>
                    </td>

                    {/* Amount */}
                    <td className="p-3 font-semibold">
                      ৳ {Number(payment.amount || 0).toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="p-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          payment.status === "PAID"
                            ? "bg-green-100 text-green-700"
                            : payment.status === "FAILED"
                              ? "bg-red-100 text-red-700"
                              : payment.status === "CANCELLED"
                                ? "bg-gray-100 text-gray-700"
                                : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="p-3 text-sm text-gray-500">
                      {new Date(payment.createdAt).toLocaleDateString("en-BD", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-500">
                  No payment history found.
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

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <Button
                key={page}
                size="sm"
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ),
          )}

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
