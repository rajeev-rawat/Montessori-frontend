"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Lock, Mail, Phone } from "lucide-react"

export function StudentProfile() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-semibold text-primary">RS</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Rahul Sharma</p>
                <p className="text-sm text-muted-foreground">Student ID: STU2020CSE1234</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-name">Full Name</Label>
              <Input id="profile-name" defaultValue="Rahul Sharma" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="profile-email" type="email" defaultValue="rahul.sharma@email.com" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="profile-phone" type="tel" defaultValue="+91 98765 43210" className="pl-10" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Change Password
            </CardTitle>
            <CardDescription>Update your password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-pwd">Current Password</Label>
              <Input id="current-pwd" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-pwd">New Password</Label>
              <Input id="new-pwd" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-pwd">Confirm New Password</Label>
              <Input id="confirm-pwd" type="password" />
            </div>
            <Button>Update Password</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
