import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const PropertyDetailsLoading = () => {
  return (
    <div className="container mx-auto max-w-6xl py-10 px-4">
      <div className="grid gap-10 lg:grid-cols-2">

        {/* Image Skeleton */}
        <Skeleton className="h-[450px] w-full rounded-xl" />

        {/* Details Skeleton */}
        <div className="space-y-6">

          <div className="flex gap-3">
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-28 rounded-full" />
          </div>

          <Skeleton className="h-12 w-3/4" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          {/* Info */}
          <div className="space-y-4">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-36" />
          </div>

          {/* Price */}
          <div>
            <Skeleton className="h-10 w-44" />
            <Skeleton className="mt-2 h-4 w-20" />
          </div>

        </div>
      </div>


      {/* Reviews Skeleton */}
      <div className="mt-12">
        <Skeleton className="mb-6 h-8 w-60" />

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-5 space-y-4">

                {/* Stars */}
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-4 w-4 rounded-full"
                    />
                  ))}
                </div>

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />

                <Skeleton className="h-3 w-28" />

              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PropertyDetailsLoading;