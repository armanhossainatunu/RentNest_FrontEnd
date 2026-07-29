"use client";

import { useActionState, useEffect } from "react";
import { createPropertyAction } from "../_actions/createPropertyAction";

const initialState = {
  success: false,
  message: "",
};

export default function PropertyForm() {
  const [state, action, pending] = useActionState(
    createPropertyAction,
    initialState,
  );

  useEffect(() => {
    if (state.message) {
      alert(state.message);
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4 max-w-xl">
      <input
        name="title"
        placeholder="Title"
        className="border p-2 w-full"
        required
      />

      <input
        name="thumbnail"
        placeholder="Thumbnail URL"
        className="border p-2 w-full"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 w-full"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        className="border p-2 w-full"
        required
      />

      <input
        name="location"
        placeholder="Location"
        className="border p-2 w-full"
        required
      />

      <select name="category" className="border p-2 w-full" required>
        <option value="">Select Category</option>
        <option value="APARTMENT">Apartment</option>
        <option value="HOUSE">House</option>
        <option value="VILLA">Villa</option>
        <option value="DUPLEX">Duplex</option>
        <option value="STUDIO">Studio</option>
        <option value="OFFICE">Office</option>
        <option value="COMMERCIAL">Commercial</option>
        <option value="SHOP">Shop</option>
      </select>

      <button
        type="submit"
        disabled={pending}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {pending ? "Creating..." : "Create Property"}
      </button>
    </form>
  );
}
