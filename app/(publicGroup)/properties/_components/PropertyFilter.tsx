"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function PropertyFilter() {
  const router = useRouter();

  const params = useSearchParams();

  const [filter, setFilter] = useState({
    location: params.get("location") || "",

    category: params.get("category") || "",

    minPrice: params.get("minPrice") || "",

    maxPrice: params.get("maxPrice") || "",

    amenities: params.get("amenities") || "",
  });

  const changeFilter = (
    key: string,

    value: string,
  ) => {
    setFilter({
      ...filter,

      [key]: value,
    });
  };

  const applyFilter = () => {
    const query = new URLSearchParams();

    Object.entries(filter).forEach(([key, value]) => {
      if (value) {
        query.set(key, value);
      }
    });

    router.push(`/properties?${query.toString()}`);
  };

  return (
    <div
      className="
rounded-xl
border
bg-white
p-5
space-y-5
"
    >
      <h2 className="text-xl font-bold">Advanced Filter</h2>

      <Input
        placeholder="Search Location"
        value={filter.location}
        onChange={(e) => changeFilter("location", e.target.value)}
      />

      <select
        className="w-full rounded-md border p-2"
        value={filter.category}
        onChange={(e) => changeFilter("category", e.target.value)}
      >
        <option value="">Property Type</option>

        <option value="APARTMENT">Apartment</option>

        <option value="HOUSE">House</option>

        <option value="VILLA">Villa</option>

        <option value="OFFICE">Office</option>
      </select>

      <Input
        type="number"
        placeholder="Minimum Price"
        value={filter.minPrice}
        onChange={(e) => changeFilter("minPrice", e.target.value)}
      />

      <Input
        type="number"
        placeholder="Maximum Price"
        value={filter.maxPrice}
        onChange={(e) => changeFilter("maxPrice", e.target.value)}
      />

      <div className="space-y-2">
        <h3 className="font-semibold">Amenities</h3>

        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={filter.amenities === "Parking"}
            onChange={(e) =>
              changeFilter("amenities", e.target.checked ? "Parking" : "")
            }
          />
          Parking
        </label>

        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={filter.amenities === "Wifi"}
            onChange={(e) =>
              changeFilter("amenities", e.target.checked ? "Wifi" : "")
            }
          />
          Wifi
        </label>
      </div>

      <button
        onClick={applyFilter}
        className="
w-full
rounded-lg
bg-green-600
py-2
text-white
hover:bg-green-700
"
      >
        Apply Filter
      </button>
    </div>
  );
}
