async function getProperties() {
  const res = await fetch(
    "https://rent-nest-ten.vercel.app/api/properties",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function Properties() {
  const properties = await getProperties();
  console.log(properties," properties this is");

  return (
    <div>
      {properties.data?.map((property: any) => (
        <div key={property.id}>
          <h2>{property.title}</h2>
        </div>
      ))}
    </div>
  );
}