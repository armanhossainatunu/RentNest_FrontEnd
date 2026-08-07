"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { registerAction } from "../_actions/registerActions";

const initialState = {
  success: false,
  statusCode: 0,
  message: "",
  error: "",
  data: null,
};

const RegisterForm = () => {
  const router = useRouter();

  const [state, action, loading] = useActionState(registerAction, initialState);

  useEffect(() => {
    if (!state.message && !state.error) return;

    if (state.success) {
      toast.success(state.message);
      router.push("/auth/login");
    } else {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <form
      action={action}
      className="w-sm space-y-4"
      encType="multipart/form-data"
    >
      <Card className="space-y-4 rounded-sm p-5">
        <h1 className="text-center text-3xl font-bold">Register</h1>

        <Input name="name" placeholder="Enter your name" required />

        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <Input
          name="role"
          placeholder="Enter your role (TENANT/LANDLORD)"
          required
        />

        {/* Profile Image */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Profile Image</label>

          <Input name="profilePhoto" type="file" accept="image/*" />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </Button>

        <span>
          Already have an account?
          <Link
            href="/auth/login"
            className="ml-1 hover:text-primary hover:underline"
          >
            Login
          </Link>
        </span>
      </Card>
    </form>
  );
};

export default RegisterForm;
