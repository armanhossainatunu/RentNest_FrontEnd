"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import RentalRequest from "./RentalRequest";

interface Props {
  requests: any[];
}

export default function RentalRequestTable({ requests }: Props) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tenant</TableHead>

            <TableHead>Email</TableHead>

            <TableHead>Property</TableHead>

            <TableHead>Price</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.tenant?.name || "N/A"}</TableCell>

                <TableCell>{request.tenant?.email || "N/A"}</TableCell>

                <TableCell>{request.property?.title || "N/A"}</TableCell>

                <TableCell>${request.property?.price || 0}</TableCell>

                <TableCell>
                  <Badge>{request.rentalstatus}</Badge>
                </TableCell>

                <TableCell className="text-right">
                  {request.rentalstatus === "PENDING" ? (
                    <RentalRequest rentalRequestId={request.id} />
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
              <TableCell colSpan={6} className="py-10 text-center">
                No rental request found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
