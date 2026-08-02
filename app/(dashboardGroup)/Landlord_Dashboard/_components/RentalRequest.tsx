"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { updateRentalRequestStatus } from "../_actions/requestsApprovedActions";

interface Props {
  rentalRequestId: string;
}

export default function RentalRequest({ rentalRequestId }: Props) {
  const [pending, startTransition] = useTransition();

  const handleUpdate = (status: "APPROVED" | "REJECTED") => {
    startTransition(async () => {
      try {
        await updateRentalRequestStatus(rentalRequestId, status);

        toast.success(`Request ${status.toLowerCase()} successfully`);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong",
        );
      }
    });
  };

  return (
    <div className="flex justify-end gap-2">
      <Button
        size="sm"
        disabled={pending}
        onClick={() => handleUpdate("APPROVED")}
      >
        {pending ? "Updating..." : "Approve"}
      </Button>

      <Button
        size="sm"
        variant="destructive"
        disabled={pending}
        onClick={() => handleUpdate("REJECTED")}
      >
        Reject
      </Button>
    </div>
  );
}
