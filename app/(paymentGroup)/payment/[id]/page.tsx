import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PaymentButton from "../_components/PaymentButton";



interface Props {
  params:
    | Promise<{
        id: string;
      }>
    | {
        id: string;
      };
}

export default async function PaymentPage({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams?.id?.trim() || "";
  console.log("PaymentPage id:", id);

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-5 py-16">
      <Card className="w-full shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your Payment</CardTitle>
          <CardDescription>
            You will be securely redirected to SSLCommerz to finish the
            transaction.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-sm text-muted-foreground">
            Review the details and continue when you are ready. Once the payment
            is completed, you will be taken back to a confirmation page.
          </p>

          <PaymentButton rentalRequestId={id} />

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowRight className="h-4 w-4" />
            <Link
              href="/Tenant_Dashboard"
              className="font-medium text-primary hover:underline"
            >
              Return to dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
