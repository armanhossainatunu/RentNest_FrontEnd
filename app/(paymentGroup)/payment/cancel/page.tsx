import Link from "next/link";
import { XCircle } from "lucide-react";
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

export default async function PaymentCancelPage({ searchParams }: PageProps) {
  const resolvedParams =
    searchParams instanceof Promise ? await searchParams : (searchParams ?? {});
  const transactionId =
    typeof resolvedParams.transaction_id === "string"
      ? resolvedParams.transaction_id
      : undefined;

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-5 py-16">
      <Card className="w-full border-amber-200 shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <XCircle className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
          <CardDescription>
            Your payment was cancelled before completion. No charges were made.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 text-center">
          {transactionId ? (
            <p className="text-sm text-muted-foreground">
              Reference:{" "}
              <span className="font-medium text-foreground">
                {transactionId}
              </span>
            </p>
          ) : null}

          <p className="text-sm text-muted-foreground">
            You can try again anytime from your rental request or return to
            browse properties.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/tenant-dashboard">View Requests</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
