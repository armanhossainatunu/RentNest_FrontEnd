import { Skeleton } from "@/components/ui/skeleton";

const PropertiesSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto mb-10">
      <div className="mt-10 flex justify-center items-center">
        <Skeleton className="h-10 w-1/3" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-10">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            {/* Image Skeleton */}
            <Skeleton className="h-[200px] w-full" />

            <div className="p-3 space-y-3">
              {/* Title */}
              <Skeleton className="h-6 w-3/4" />

              {/* Price & Location */}
              <div className="flex justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-28" />
              </div>

              {/* Buttons */}
              <div className="flex justify-between pt-2">
                <Skeleton className="h-10 w-28 rounded-xl" />
                <Skeleton className="h-10 w-28 rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesSkeleton;
