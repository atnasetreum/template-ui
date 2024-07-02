"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { AuthService } from "@services";
import { encrypt } from "@shared/utils";
import { ROUTE_DASHBOARD } from "@constants";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "eduardo-266@hotmail.com",
    password: "tem2042acm1ptAA$$",
  });

  const router = useRouter();

  const validateCredentials = () => {
    AuthService.login({
      email: encrypt(form.email),
      password: encrypt(form.password),
    }).then(() => router.push(ROUTE_DASHBOARD));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="m@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={validateCredentials}>
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
