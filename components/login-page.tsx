"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShieldCheck,
  Users,
  Mail,
  Lock,
} from "lucide-react";
import type { UserRole } from "@/app/page";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth.store";

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

// export function LoginPage({ onLogin }: LoginPageProps) {
export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuthStore();
  const [isPrefilledEmail, setIsPrefilledEmail] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ username: email, password });

      localStorage.setItem("auth_token", res.token);
      localStorage.setItem("auth_user", JSON.stringify(res.user));
      localStorage.setItem("auth_expires_at", res.expires_at);

      document.cookie = `auth_token=${res.token}; path=/; max-age=86400;`;

      toast({
        title: "Login Successful",
        description: res.message || "Welcome to Dashboard",
      });

      router.push("/dashboard");
      window.location.reload();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid credentials",
      });
    }
  };

 useEffect(() => {
    const storedEmail = sessionStorage.getItem("login_email");
    if (storedEmail) {
      setEmail(storedEmail);
      setIsPrefilledEmail(true);
      // optional cleanup
      sessionStorage.removeItem("login_email");
    }
  }, []);

  // 🔹 Already logged in
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      router.replace("/dashboard"); // redirect if already logged in
    }
  }, [router]);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]">
        <Image
          src="/logo.png"
          alt="Watermark"
          width={600}
          height={600}
          className="object-contain"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={90}
            height={90}
            className="object-contain"
          />
          <div>
            <h1 className="font-semibold">Montessori</h1>
            <p className="text-xs text-muted-foreground">
              Student Records Management Portal
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">
              Centralized Student Records Management
            </h2>

            <div className="grid gap-4">
              <div className="flex gap-4 p-4 border rounded-lg bg-card">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-medium">Secure & Scalable</h3>
                  <p className="text-sm text-muted-foreground">
                    Role-based access and data privacy
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 border rounded-lg bg-card">
                <Users className="w-5 h-5 text-accent" />
                <div>
                  <h3 className="font-medium">Bulk Data Management</h3>
                  <p className="text-sm text-muted-foreground">
                    CSV & Excel upload support
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <Card className="shadow-lg bg-card/95 backdrop-blur">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>Sign in to access the portal</CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="admin">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="admin">Admin Login</TabsTrigger>
                  {/* <TabsTrigger value="student">Student Login</TabsTrigger> */}
                </TabsList>

                <TabsContent value="admin">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                      <Label>Email</Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                        <Input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`pl-10 ${isPrefilledEmail ? "bg-muted cursor-not-allowed" : ""}`}
                          placeholder="Email address"
                          readOnly={isPrefilledEmail}
                          disabled={isPrefilledEmail}
                        />
                        {/* <Input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          placeholder="admin@school.edu"
                        /> */}
                      </div>
                    </div>

                    <div className="mb-5">
                      <Label>Password</Label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                        <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <Button className="w-full mb-4" type="submit">
                      Sign in as Admin
                    </Button>

                    <button
                      type="button"
                      onClick={() => router.push("/register-student")}
                      className="text-primary hover:underline"
                    >
                      Register here
                    </button>

                    {/* <p className="text-center text-sm text-muted-foreground">
                      Forgot password?
                    </p> */}
                  </form>
                </TabsContent>

                {/* STUDENT LOGIN CODE KEPT COMMENTED */}
                {/* <TabsContent value="student"> ... </TabsContent> */}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="relative z-10 border-t">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © 2025 Montessori Education. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
