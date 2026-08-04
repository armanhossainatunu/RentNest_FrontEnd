export async function getProperties(
  searchParams: {
    location?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    amenities?: string;
  } = {},
) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  const res = await fetch(
    `https://rent-nest-ten.vercel.app/api/properties?${params.toString()}`,
    {
      cache: "no-cache",
      // next: {
      //   revalidate: 60 * 60 * 24,
      // },
    },
  );

  if (!res.ok) {
    return {
      data: [],
    };
  }

  return res.json();
}
