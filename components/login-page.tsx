"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, ShieldCheck, Users, Mail, Lock, Phone, User } from "lucide-react"
import type { UserRole } from "@/app/page"

interface LoginPageProps {
  onLogin: (role: UserRole) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isRegistering, setIsRegistering] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Indus Education</h1>
              <p className="text-xs text-muted-foreground">Student Records Management Portal</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-foreground text-balance">
                Centralized Student Records Management
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Securely manage and access student data for 2+ lakh alumni students with powerful search, bulk uploads,
                and role-based access.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Secure & Scalable</h3>
                  <p className="text-sm text-muted-foreground">
                    Role-based access with audit trails and data privacy compliance
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Bulk Data Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload CSV/Excel files with automated validation and error reporting
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>Sign in to access the portal</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="admin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="admin">Admin Login</TabsTrigger>
                  <TabsTrigger value="student">Student Login</TabsTrigger>
                </TabsList>

                <TabsContent value="admin">
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                      onLogin("admin")
                    }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="admin-email" type="email" placeholder="admin@indus.edu" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="admin-password" type="password" placeholder="••••••••" className="pl-10" />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Sign in as Admin
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                      <a href="#" className="text-primary hover:underline">
                        Forgot password?
                      </a>
                    </p>
                  </form>
                </TabsContent>

                <TabsContent value="student">
                  {!isRegistering ? (
                    <form
                      className="space-y-4"
                      onSubmit={(e) => {
                        e.preventDefault()
                        onLogin("student")
                      }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="student-email">Email or Mobile</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="student-email" type="text" placeholder="student@email.com" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="student-password" type="password" placeholder="••••••••" className="pl-10" />
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Sign in as Student
                      </Button>
                      <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">
                          <a href="#" className="text-primary hover:underline">
                            Forgot password?
                          </a>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {"Don't have an account? "}
                          <button
                            type="button"
                            onClick={() => setIsRegistering(true)}
                            className="text-primary hover:underline"
                          >
                            Register here
                          </button>
                        </p>
                      </div>
                    </form>
                  ) : (
                    <form
                      className="space-y-4"
                      onSubmit={(e) => {
                        e.preventDefault()
                        onLogin("student")
                      }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="reg-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="reg-name" type="text" placeholder="John Doe" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="reg-email" type="email" placeholder="student@email.com" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-mobile">Mobile Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="reg-mobile" type="tel" placeholder="+91 98765 43210" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="reg-password" type="password" placeholder="••••••••" className="pl-10" />
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Create Account
                      </Button>
                      <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setIsRegistering(false)}
                          className="text-primary hover:underline"
                        >
                          Sign in
                        </button>
                      </p>
                    </form>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © 2025 Indus Education. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
