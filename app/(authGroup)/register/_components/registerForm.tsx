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
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4 rounded-sm">
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

        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </Button>

        <span>
          Already have an account?
          <Link
            href="/auth/login"
            className="ml-1 text-primary hover:underline"
          >
            Login
          </Link>
        </span>
      </Card>
    </form>
  );
};

export default RegisterForm;
