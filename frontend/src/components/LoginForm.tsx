import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../service/authService";
import type { Login } from "../types/index";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const LoginForm = () => {
  const navigate = useNavigate();
   const { login: setUser } = useAuth();
  const [form, setForm] = useState<Login>({
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.user);
      //console.log(data);
      //localStorage.setItem("token", data.token);
      navigate("/")
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      
      <Card className="w-full max-w-md">

        <CardHeader className="flex flex-col items-center gap-2">
          <LogIn className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-semibold">Login</h1>
        </CardHeader>

        <CardContent className="space-y-4">

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              placeholder="abc@example.com"
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
            className="w-full flex items-center gap-2"
            onClick={handleSubmit}
            disabled={mutation.isPending}
          >
            <LogIn className="w-4 h-4" />
            {mutation.isPending ? "Logging in..." : "Login"}
          </Button>
          <Button
            className="w-full flex items-center gap-2"
            onClick={() => navigate("/register")}
          >
            do not have account Register here
          </Button>
          {mutation.isError && (
            <p className="text-sm text-red-500 text-center">
              Login failed
            </p>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
