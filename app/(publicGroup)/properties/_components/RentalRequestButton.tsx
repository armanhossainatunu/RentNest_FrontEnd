"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { createRentalRequest } from "../_actions/rentalRequestActions";

interface RentalRequestButtonProps {
  propertyId: string;
  status: string;
}

export default function RentalRequestButton({
  propertyId,
  status,
}: RentalRequestButtonProps) {

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleRequest = async () => {
    try {
      setLoading(true);

      await createRentalRequest(
        propertyId,
        message
      );

      toast.success(
        "Rental request submitted successfully"
      );

      setMessage("");

    } catch (error: any) {
      toast.error(
        error.message
      );
    } finally {
      setLoading(false);
    }
  };


  if (status === "UNAVAILABLE") {
    return (
      <Button
        disabled
        className="w-full cursor-not-allowed"
      >
        Not Available
      </Button>
    );
  }


  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button className="w-full">
          Request Rental
        </Button>
      </DialogTrigger>


      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Send Rental Request
          </DialogTitle>
        </DialogHeader>


        <div className="space-y-4">

          <Textarea
            placeholder="Write a message to property owner..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
          />


          <Button
            onClick={handleRequest}
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Sending..."
              : "Submit Request"}
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}