"use client";

import { useState } from "react";

interface Props {
  description: string;
}

export default function DescriptionExpand({ description }: Props) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="text-muted-foreground">
      <p className={showMore ? "" : "line-clamp-3"}>{description}</p>

      {description.length > 150 && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-2 font-medium text-primary hover:underline"
        >
          {showMore ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
