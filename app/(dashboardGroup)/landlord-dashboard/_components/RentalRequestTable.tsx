"use client";

import { useState } from "react";

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

import RentalRequest from "./RentalRequest";

interface Props {
  requests: any[];
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

    default:
      return "bg-gray-500 text-white hover:bg-gray-600";
  }
};

export default function RentalRequestTable({ requests }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  // Latest created request first
  const sortedRequests = [...requests].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const totalPages = Math.ceil(sortedRequests.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentRequests = sortedRequests.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-medium">Rental Requests</h1>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tenant</TableHead>

              <TableHead>Email</TableHead>

              <TableHead>Property</TableHead>

              <TableHead>Price</TableHead>

              <TableHead>Created Date</TableHead>

              <TableHead>Status</TableHead>

              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentRequests.length > 0 ? (
              currentRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    {request.tenant?.name || "N/A"}
                  </TableCell>

                  <TableCell>{request.tenant?.email || "N/A"}</TableCell>

                  <TableCell>{request.property?.title || "N/A"}</TableCell>

                  <TableCell>৳ {request.property?.price || 0}</TableCell>

                  <TableCell>
                    {request.createdAt
                      ? new Date(request.createdAt).toLocaleDateString()
                      : "-"}
                  </TableCell>

                  <TableCell>
                    <Badge className={getStatusColor(request.rentalstatus)}>
                      {request.rentalstatus}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    {request.rentalstatus === "PENDING" ? (
                      <RentalRequest rentalRequestId={request.id} />
                    ) : request.rentalstatus === "APPROVED" ? (
                      <span className="font-medium text-green-600">
                        Approved
                      </span>
                    ) : request.rentalstatus === "REJECTED" ? (
                      <span className="font-medium text-red-600">Rejected</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Completed
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center">
                  No rental requests found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
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
            variant="outline"
            size="sm"
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
