"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IRentalRequest } from "@/lib/types";

interface Props {
  requests: IRentalRequest[];
}

const ITEMS_PER_PAGE = 7;

const getStatusColor = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "bg-green-600 text-white hover:bg-green-700";

    case "REJECTED":
      return "bg-red-600 text-white hover:bg-red-700";

    case "PENDING":
      return "bg-yellow-500 text-black hover:bg-yellow-600";

    case "ACTIVE":
      return "bg-blue-600 text-white hover:bg-blue-700";

    case "COMPLETED":
      return "bg-purple-600 text-white hover:bg-purple-700";

    default:
      return "bg-gray-500 text-white";
  }
};

const getPropertyStatusColor = (status: string) => {
  switch (status) {
    case "AVAILABLE":
      return "bg-green-600 text-white";

    case "UNAVAILABLE":
      return "bg-red-600 text-white";

    default:
      return "bg-gray-500 text-white";
  }
};

const getPaymentColor = (status: string) => {
  switch (status) {
    case "PAID":
      return "bg-green-600 text-white";

    case "UNPAID":
      return "bg-yellow-500 text-black";

    case "FAILED":
      return "bg-red-600 text-white";

    case "CANCELLED":
      return "bg-gray-500 text-white";

    default:
      return "bg-gray-400 text-white";
  }
};

export default function RentalRequestTable({ requests }: Props) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(requests.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentRequests = requests.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>

              <TableHead>Location</TableHead>

              <TableHead>Owner</TableHead>

              <TableHead>Property Status</TableHead>

              <TableHead>Price</TableHead>

              <TableHead>Rental Status</TableHead>

              <TableHead>Payment Status</TableHead>

              <TableHead>Payment</TableHead>

              <TableHead>Amount</TableHead>

              <TableHead>Transaction ID</TableHead>

              <TableHead>Payment Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="py-10 text-center">
                  No Rental Requests Found
                </TableCell>
              </TableRow>
            ) : (
              currentRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    {request.property.title}
                  </TableCell>

                  <TableCell>{request.property.location}</TableCell>

                  <TableCell>{request.property.author.name}</TableCell>

                  {/* Property Status */}

                  <TableCell>
                    <Badge
                      className={getPropertyStatusColor(
                        request.property.status,
                      )}
                    >
                      {request.property.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    ৳ {request.property.price.toLocaleString()}
                  </TableCell>

                  {/* Rental Request Status */}

                  <TableCell>
                    <Badge className={getStatusColor(request.rentalstatus)}>
                      {request.rentalstatus}
                    </Badge>
                  </TableCell>

                  {/* Payment Status */}

                  <TableCell>
                    {request.payment ? (
                      <Badge
                        className={getPaymentColor(request.payment.status)}
                      >
                        {request.payment.status}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  {/* Payment Button */}

                  <TableCell>
                    {request.rentalstatus === "APPROVED" &&
                    request.payment?.status === "UNPAID" ? (
                      <Button
                        onClick={() => router.push(`/payment/${request.id}`)}
                      >
                        Pay Now
                      </Button>
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  {/* Amount */}

                  <TableCell>
                    {request.payment?.amount
                      ? `৳ ${request.payment.amount}`
                      : "-"}
                  </TableCell>

                  {/* Transaction ID */}

                  <TableCell>{request.payment?.transactionId ?? "-"}</TableCell>

                  {/* Payment Date */}

                  <TableCell>
                    {request.payment?.createdAt
                      ? new Date(request.payment.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )
                      : "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>

          {Array.from(
            {
              length: totalPages,
            },
            (_, i) => i + 1,
          ).map((page) => (
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
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
