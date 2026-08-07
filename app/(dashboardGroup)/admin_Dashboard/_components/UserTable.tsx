"use client";

import Pagination from "@/components/shared/Pagination";
import { deleteUser, updateUserStatus } from "../_actions/userActions";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function UserTable({ users, pagination }: any) {
  const router = useRouter();
  const userData =users.users

  // delete
  const handleDelete = async (id: string) => {
    toast.warning("Delete User?", {
      description: "This action cannot be undone.",

      action: {
        label: "Delete",

        onClick: async () => {
          const result = await deleteUser(id);

          if (result.success) {
            toast.success("User deleted successfully");

            router.refresh();
          } else {
            toast.error(result.message || "Delete failed");
          }
        },
      },

      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.info("Delete cancelled");
        },
      },
    });
  };
  // status 
  const handleStatus = async (id: string, status: string) => {
    await updateUserStatus(id, status === "ACTIVE" ? "BAN" : "UNBAN");

    router.refresh();
  };

  const currentPage = pagination?.currentPage ?? 1;

  const totalPages = pagination?.totalPages ?? 1;

  return (
    <div className="space-y-5">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Status</th>

              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {userData?.map((user: any) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  <span
                    className={
                      user.status === "ACTIVE"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {user.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => handleStatus(user.id, user.status)}
                    className="
                rounded bg-black
                px-3 py-1 text-white
                "
                  >
                    {user.status === "ACTIVE" ? "Ban" : "Unban"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="
      rounded-md
      bg-red-600
      px-3 py-1
      text-white
    "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
