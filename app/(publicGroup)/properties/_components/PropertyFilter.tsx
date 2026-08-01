"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IProperty } from "@/lib/types";

interface PropertyFilterProps {
  propertyList: IProperty[];
}

export default function PropertyFilter({
  propertyList,
}: PropertyFilterProps) {
  const router = useRouter();

  const [filter, setFilter] = useState({
    location: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  // Get unique categories
  const categories = [...new Set(propertyList.map((item) => item.category))];

  const changeFilter = (key: string, value: string) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
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
    <div className="rounded-xl border bg-white p-5 space-y-5">
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

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
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

      <button
        onClick={applyFilter}
        className="w-full rounded-lg bg-green-600 py-2 text-white hover:bg-green-700"
      >
        Apply Filter
      </button>
    </div>
  );
}