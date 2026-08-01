"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { createRentalRequest } from "../_actions/rentalRequestActions";
import { useRouter } from "next/navigation";

interface RentalRequestButtonProps {
  propertyId: string;
  status: string;
  user?: {
    id: string;
    role: string;
  } | null;
}

export default function RentalRequestButton({
  propertyId,
  status,
  user,
}: RentalRequestButtonProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useRouter();

  const handleOpen = () => {
    if (!user || user.role !== "TENANT") {
      toast.error("Please login with a Tenant account.");

      return navigate.push("/login");
    }

    setOpen(true);
  };

  const handleRequest = async () => {
    try {
      setLoading(true);

      await createRentalRequest(propertyId, message);

      toast.success("Rental request submitted successfully");

      setMessage("");
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (status === "UNAVAILABLE") {
    return (
      <Button disabled className="w-full cursor-not-allowed">
        Not Available
      </Button>
    );
  }

  return (
    <>
      <Button className="w-full pointer" onClick={handleOpen}>
        {!user
          ? "Request Rental"
          : user.role !== "TENANT"
            ? "Tenant Only Request Property"
            : "Request Rental"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Rental Request</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Textarea
              placeholder="Write a message to property owner..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button
              onClick={handleRequest}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Sending..." : "Submit Request"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
