import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SearchParams = Record<string, string | string[] | undefined>;

interface PageProps {
  searchParams?: Promise<SearchParams> | SearchParams;
}

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const resolvedParams =
    searchParams instanceof Promise ? await searchParams : (searchParams ?? {});
  const transactionId =
    typeof resolvedParams.transaction_id === "string"
      ? resolvedParams.transaction_id
      : undefined;

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-5 py-16">
      <Card className="w-full border-green-200 shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Payment Successful</CardTitle>
          <CardDescription>
            Your payment was completed successfully. A confirmation has been
            sent to your email.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 text-center">
          {transactionId ? (
            <p className="text-sm text-muted-foreground">
              Transaction ID:{" "}
              <span className="font-medium text-foreground">
                {transactionId}
              </span>
            </p>
          ) : null}

          <p className="text-sm text-muted-foreground">
            You can now continue managing your rental request from your
            dashboard.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/Tenant_Dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Browse Properties</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
