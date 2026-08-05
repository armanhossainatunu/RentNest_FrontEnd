"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import UpdatePropertyDialog from "@/app/(LandlordGroup)/propertiesCreate/_components/updateProperties";
import DeletePropertyButton from "@/app/(LandlordGroup)/propertiesCreate/_components/DeletePropertyButton";
import SearchInput from "./SearchInput";

interface Props {
  properties: any[];
  user: any;
}

const ITEMS_PER_PAGE = 6;

export default function MyPropertyTable({ properties, user }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // Search Property Title
  const filteredProperties = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return properties;
    }

    return properties.filter((property) =>
      property.title?.toLowerCase().includes(keyword),
    );
  }, [properties, search]);

  // Reset page after search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentProperties = filteredProperties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-medium">My Properties</h1>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="w-[230px]">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search Property Title..."
            />
            </div>

          <Link
            href="/propertiesCreate"
            className="flex items-center gap-1 text-lg font-medium"
          >
            <Plus size={20} />
            Add Property
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>

              <TableHead>Title</TableHead>

              <TableHead>Location</TableHead>

              <TableHead>Category</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Price</TableHead>

              <TableHead>Created Date</TableHead>

              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentProperties.length > 0 ? (
              currentProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <Image
                      src={property.thumbnail}
                      alt={property.title}
                      width={80}
                      height={60}
                      unoptimized
                      className="h-14 w-20 rounded object-cover"
                    />
                  </TableCell>

                  <TableCell className="font-medium">
                    {property.title}
                  </TableCell>

                  <TableCell>{property.location}</TableCell>

                  <TableCell>{property.category}</TableCell>

                  <TableCell>
                    <span
                      className={
                        property.status === "AVAILABLE"
                          ? "font-semibold text-green-600"
                          : "font-semibold text-red-600"
                      }
                    >
                      {property.status}
                    </span>
                  </TableCell>

                  <TableCell>৳ {property.price?.toLocaleString()}</TableCell>

                  <TableCell>
                    {new Date(property.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  <TableCell className="text-right">
                    <UpdatePropertyDialog property={property} user={user} />

                    <DeletePropertyButton propertyId={property.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center">
                  No properties found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              size="sm"
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
