"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IProperty, Iuser } from "@/lib/types";
import { UpdatePropertyAction } from "../_actions/updateAction";
import { useRouter } from "next/dist/client/components/navigation";

interface Props {
  property: IProperty;
  user: Iuser;
}

export default function UpdatePropertyDialog({ property, user }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: property.title || "",
    price: property.price || "",
    thumbnail: property.thumbnail || "",
    status: property.status || "AVAILABLE",
    description: property.description || "",
    category: property.category || "APARTMENT",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const currentUser = (user as any)?.data?.profile ?? user;

      if (!currentUser?.id) {
        toast.error("You need to be signed in to update a property");
        return;
      }

      setLoading(true);

      await UpdatePropertyAction(property.id, formData, currentUser.id);

      toast.success("Property updated successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Update Property</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Property title"
          />

          <Input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <Input
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="Thumbnail URL"
          />

          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-md border p-2"
          >
            <option value="APARTMENT">Apartment</option>

            <option value="HOUSE">House</option>

            <option value="VILLA">Villa</option>

            <option value="DUPLEX">Duplex</option>

            <option value="OFFICE">Office</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-md border p-2"
          >
            <option value="AVAILABLE">Available</option>

            <option value="UNAVAILABLE">Unavailable</option>
          </select>

          <Button onClick={handleUpdate} disabled={loading} className="w-full">
            {loading ? "Updating..." : "Update Property"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
