"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginAction } from "../_actions/loginActions";

const LoginForm = () => {
  return (
    <form action={loginAction} className="space-y-4">
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
        <Button type="submit">Login</Button>
      </Card>
    </form>
  );
};

export default LoginForm;
