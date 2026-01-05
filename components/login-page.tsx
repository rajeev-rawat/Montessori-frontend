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
  GraduationCap,
  ShieldCheck,
  Users,
  Mail,
  Lock,
  Phone,
  User,
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
  const { login, loading } = useAuthStore();
  const [isRegistering, setIsRegistering] = useState(false);

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
    const token = localStorage.getItem("auth_token");
    if (token) {
      router.replace("/dashboard"); // redirect if already logged in
    }
  }, [router]);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* ================= WATERMARK (ADDED ONLY) ================= */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]">
        <Image
          src="/logo.png"
          alt="Watermark Logo"
          width={600}
          height={600}
          className="object-contain"
          priority
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-card">
        <div className="container mx-auto px-2 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-25 h-25 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Montessori Golden Jubilee Logo"
                width={100}
                height={100}
                className="object-contain"
                priority
              />
            </div>

            {/* <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div> */}
            <div>
              <h1 className="font-semibold text-foreground">Montessori</h1>
              <p className="text-xs text-muted-foreground">
                Student Records Management Portal
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-foreground text-balance">
                Centralized Student Records Management
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Securely manage and access student data for 2+ lakh alumni
                students with powerful search, bulk uploads, and role-based
                access.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    Secure & Scalable
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Role-based access with audit trails and data privacy
                    compliance
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    Bulk Data Management
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upload CSV/Excel files with automated validation and error
                    reporting
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <Card className="shadow-lg backdrop-blur-sm bg-card/95">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>Sign in to access the portal</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="admin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="admin">Admin Login</TabsTrigger>
                  {/* <TabsTrigger value="student">Student Login</TabsTrigger> */}
                </TabsList>

                <TabsContent value="admin">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-2 mb-5">
                      <Label htmlFor="admin-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          id="admin-email"
                          // type="email"
                          placeholder="admin@indus.edu"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mb-5">
                      <Label htmlFor="admin-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          id="admin-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full mb-5">
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
                      <a href="#" className="text-primary hover:underline">
                        Forgot password?
                      </a>
                    </p> */}
                  </form>
                </TabsContent>

                {/* STUDENT LOGIN CODE KEPT FULLY COMMENTED BELOW */}
                {/* <TabsContent value="student"> ... </TabsContent> */}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © 2025 Indus Education. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
