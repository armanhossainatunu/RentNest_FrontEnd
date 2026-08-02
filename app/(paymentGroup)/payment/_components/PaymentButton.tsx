"use client";

import { Button } from "@/components/ui/button";


import { useTransition } from "react";
import { toast } from "sonner";
import { createPaymentAction } from "../_actions/paymentAction";

export default function PaymentButton({
  rentalRequestId,
}: {
  rentalRequestId: string;
}) {
  const [pending, startTransition] = useTransition();

  const handlePayment = () => {
    startTransition(async () => {
      try {
        await createPaymentAction(rentalRequestId);
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };

  return (
    <Button disabled={pending} onClick={handlePayment}>
      {pending ? "Redirecting..." : "Pay Now"}
    </Button>
  );
}
