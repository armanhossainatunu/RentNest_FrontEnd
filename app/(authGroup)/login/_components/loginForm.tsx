"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginAction } from "../_actions/loginActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

const LoginForm = () => {
  const [state, action, loading] = useActionState(loginAction, false);
  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
    
    } else {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4 rounded-sm">
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
        <Button type="submit">{loading ? "Loading..." : "Login"}</Button>
       <span className="text-center">Don&apos;t have an account? <Link href="/register" className="hover:underline hover:text-primary">Register</Link></span>
      </Card>
    </form>
  );
};

export default LoginForm;
