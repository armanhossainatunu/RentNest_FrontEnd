import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function RentalRequestCard({ request }: { request: any }) {
  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <h2 className="text-xl font-bold">{request.property.title}</h2>

        <p className="text-sm text-muted-foreground">
          {request.property.location}
        </p>

        <div>
          Owner:
          <span className="ml-2 font-medium">
            {request.property.author.name}
          </span>
        </div>

        <div>
          Price:
          <span className="ml-2 font-bold text-green-600">
            ৳ {request.property.price}
          </span>
        </div>

        <div>
          Request Status:
          <Badge className="ml-2">{request.status}</Badge>
        </div>

        {request.payment && (
          <div className="rounded-md border p-3">
            <p>
              Payment Status:
              <span className="ml-2 font-semibold">
                {request.payment.status}
              </span>
            </p>

            <p>Amount: ৳ {request.payment.amount}</p>

            {request.payment.transactionId && (
              <p className="text-sm">
                Transaction:
                {request.payment.transactionId}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
