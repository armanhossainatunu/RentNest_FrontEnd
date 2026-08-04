"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deleteProperty } from "../_actions/deletepropertyAction";

interface Props {
  propertyId: string;
}

export default function DeletePropertyButton({ propertyId }: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    toast.warning("Are you sure you want to delete this property?", {
      action: {
        label: "Delete",
        onClick: () => {
          startTransition(async () => {
            try {
              const response = await deleteProperty(propertyId);

              if (!response?.success) {
                throw new Error(
                  response?.message || "Failed to delete property",
                );
              }

              toast.success("Property deleted successfully");

              router.refresh();
            } catch (error: any) {
              console.error("Delete property error:", error);

              toast.error(error?.message || "Something went wrong");
            }
          });
        },
      },

      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.info("Delete cancelled");
        },
      },
    });
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={handleDelete}
    >
      <Trash2 className="mr-2 h-4 w-4" />

      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
