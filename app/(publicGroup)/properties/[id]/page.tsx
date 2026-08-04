import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, User, Eye, Star } from "lucide-react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

import RentalRequestButton from "../_components/RentalRequestButton";
import { getMe } from "@/service/getMe";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const PropertyDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const [user, res] = await Promise.all([
    getMe(),

    fetch(`${process.env.BACKEND_URL}/properties/${id}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    }),
  ]);

  if (!res.ok) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Property not found.</h1>
      </div>
    );
  }

  const result = await res.json();

  const property = result?.data?.property;

  if (!property) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">No Property Found.</h1>
      </div>
    );
  }

  const averageRating =
    property.reviews?.length > 0
      ? (
          property.reviews.reduce(
            (sum: number, review: any) => sum + review.rating,
            0,
          ) / property.reviews.length
        ).toFixed(1)
      : "0";

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="relative h-[450px] overflow-hidden rounded-xl">
          <Image
            src={property.thumbnail}
            alt={property.title}
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Details */}

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Badge>{property.category}</Badge>

            <Badge
              variant={
                property.status === "AVAILABLE" ? "default" : "destructive"
              }
            >
              {property.status}
            </Badge>
          </div>

          <h1 className="text-4xl font-bold">{property.title}</h1>

          <p className="text-muted-foreground">{property.description}</p>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              {property.location}
            </div>

            <div className="flex items-center gap-2">
              <User size={18} />
              {property.author?.name}
            </div>

            <div className="flex items-center gap-2">
              <Eye size={18} />
              {property.views} Views
            </div>

            <div className="flex items-center gap-2">
              <Star size={18} className="fill-yellow-400 text-yellow-400" />
              {averageRating} ({property.reviews?.length || 0} Reviews)
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-primary">
              ৳{property.price?.toLocaleString()}
            </h2>

            <p className="text-sm text-muted-foreground">Per Month</p>
          </div>

          <DropdownMenu>
            <RentalRequestButton
              propertyId={property.id}
              status={property.status}
              user={user?.data?.profile || null}
            />
          </DropdownMenu>
        </div>
      </div>

      {/* Reviews */}

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Customer Reviews</h2>

        <div className="space-y-4">
          {property.reviews?.map((review: any) => (
            <Card key={review.id}>
              <CardContent className="p-5">
                <div className="flex items-center gap-2">
                  {Array.from({
                    length: review.rating,
                  }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="mt-3 text-muted-foreground">{review.comment}</p>

                <p className="mt-2 text-xs text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
