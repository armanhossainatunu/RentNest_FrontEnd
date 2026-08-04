"use client";

import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "../_actions/reviewAction";
import { useRouter } from "next/navigation";

interface Props {
  propertyId: string;
}

export default function ReviewForm({ propertyId }: Props) {
  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    startTransition(async () => {
      try {
        const res = await createReview({
          propertyId,
          rating,
          comment,
        });

        toast.success(res.message);

        setComment("");
        setRating(5);

        router.refresh();
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };

  return (
    <div className="mt-8 rounded-lg border p-6">
      <h3 className="mb-4 text-xl font-semibold">Write a Review</h3>

      <div className="mb-4 flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={28}
            onClick={() => setRating(star)}
            className={`cursor-pointer ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <Textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Button className="mt-4" disabled={isPending} onClick={handleSubmit}>
        {isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
}
