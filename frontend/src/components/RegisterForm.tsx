import { register } from "@/service/authService";
import type { Register } from "../types/index";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Label } from "./ui/label";

import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState<Register>({
    name: "",
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => navigate("/login")
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4" >

          <Card className="w-full max-w-md">

            <CardHeader className="flex flex-col items-center gap-2">
              <UserPlus className="w-8 h-8 text-blue-500"/>
              <h1 className="text-xl">Register</h1>
            </CardHeader>

            <CardContent className="space-y-4">

             <div className="space-y-2">
           <Label>Username</Label>
            <Input
              placeholder="name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
            <Input
              placeholder="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            </div>

          <div className="space-y-2">
            <Label>Password</Label>

            <Input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <Button
            className="w-full flex items-center gap-2 transition hover:bg-blue-600"
            onClick={handleSubmit}
            disabled={mutation.isPending}
          >
            <UserPlus className="w-4 h-4" />

            {mutation.isPending
              ? "Registering..."
              : "Register"}
          </Button>

          {mutation.isError && (
            <p className="text-sm text-red-500 text-center">
              Register failed
            </p>
          )}
            </CardContent>
          </Card>
    </div>
  );
};