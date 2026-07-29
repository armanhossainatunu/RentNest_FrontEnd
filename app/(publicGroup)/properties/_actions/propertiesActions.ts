export async function getProperties() {
  const res = await fetch("https://rent-nest-ten.vercel.app/api/properties", {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
    }
  });

  const properties = await res.json();
  return properties;
}