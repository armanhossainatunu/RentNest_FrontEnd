"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfileProps {
  profile: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    profile: {
      profilePhoto: string | null;
      bio: string | null;
    } | null;
  };
}

export default function ProfileCard({ profile }: ProfileProps) {
  const router = useRouter();

  return (
    <Card className="mx-auto max-w-md overflow-hidden rounded-2xl shadow-lg">
      {/* Cover */}
      <div className="h-32 bg-gradient-to-r from-primary/80 to-primary" />

      <CardContent className="-mt-12 p-6">
        {/* Avatar */}
        <div className="flex justify-center">
          <Image
            src={profile.profile?.profilePhoto || "/default-avatar.png"}
            alt={profile.name}
            width={110}
            unoptimized
            height={110}
            className="h-28 w-28 rounded-full border-4 border-background object-cover"
          />
        </div>

        {/* Info */}
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold">{profile.name}</h2>

          <p className="text-sm text-muted-foreground">{profile.email}</p>

          <div className="mt-3 flex justify-center gap-2">
            <Badge>{profile.role}</Badge>

            <Badge
              variant={profile.status === "ACTIVE" ? "default" : "destructive"}
            >
              {profile.status}
            </Badge>
          </div>
        </div>

        {/* Details */}
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Bio</span>
            <span className="text-muted-foreground">
              {profile.profile?.bio || "No bio added"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Joined</span>
            <span className="text-muted-foreground">
              {new Date(profile.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Edit Button */}
        <Button
          className="mt-6 w-full"
          onClick={() => router.push("/profile/edit")}
        >
          <Pencil size={16} className="mr-2" />
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}
