"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(page));

    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        Previous
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          size="sm"
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => changePage(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
