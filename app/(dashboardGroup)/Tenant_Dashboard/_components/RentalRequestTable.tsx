import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IRentalRequest } from "@/lib/types";

interface Props {
  requests: IRentalRequest[];
}

export default function RentalRequestTable({ requests }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Request Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Transaction ID</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6">
                No Rental Requests Found
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {request.property.title}
                </TableCell>

                <TableCell>
                  {request.property.location}
                </TableCell>

                <TableCell>
                  {request.property.author.name}
                </TableCell>

                <TableCell>
                  ৳ {request.property.price.toLocaleString()}
                </TableCell>

                <TableCell>
                  <Badge>{request.rentalstatus}</Badge>
                </TableCell>

                <TableCell>
                  {request.payment ? (
                    <Badge
                      variant={
                        request.payment.status === "PAID"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {request.payment.status}
                    </Badge>
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell>
                  {request.payment?.amount
                    ? `৳ ${request.payment.amount}`
                    : "-"}
                </TableCell>

                <TableCell>
                  {request.payment?.transactionId ?? "-"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}