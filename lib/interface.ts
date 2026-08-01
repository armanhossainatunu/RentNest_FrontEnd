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