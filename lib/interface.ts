export  interface PageProps {
  searchParams: Promise<{
    location?: string;

    category?: string;

    minPrice?: string;

    maxPrice?: string;

    amenities?: string;
  }>;

  user?: {
    id: string;
    role: string;
    email: string;
  } | null;
}


export interface ProfileProps {
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