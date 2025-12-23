"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, GraduationCap, Mail, CheckCircle } from "lucide-react"

export function StudentDataForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (isSubmitted) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[80vh]">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6 pb-8">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Record Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Your student record has been successfully submitted. It will be reviewed and verified by our team.
            </p>
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Edit Submission
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Submit Your Record</h1>
        <p className="text-muted-foreground">Fill in your details to add your record to the alumni database</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          setIsSubmitted(true)
        }}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Your basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input id="fullName" placeholder="Enter your full name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">
                    Date of Birth <span className="text-destructive">*</span>
                  </Label>
                  <Input id="dob" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">
                    Gender <span className="text-destructive">*</span>
                  </Label>
                  <Select required>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">
                  Student ID / Enrollment ID <span className="text-destructive">*</span>
                </Label>
                <Input id="studentId" placeholder="e.g., STU2020CSE1234" required />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail className="w-5 h-5" />
                Contact Information
              </CardTitle>
              <CardDescription>How we can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">
                  Mobile Number <span className="text-destructive">*</span>
                </Label>
                <Input id="mobile" type="tel" placeholder="+91 98765 43210" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter your current address" rows={3} />
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <GraduationCap className="w-5 h-5" />
                Academic Information
              </CardTitle>
              <CardDescription>Your educational details at Indus Education</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="course">
                    Course / Program <span className="text-destructive">*</span>
                  </Label>
                  <Select required>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="btech">B.Tech</SelectItem>
                      <SelectItem value="mtech">M.Tech</SelectItem>
                      <SelectItem value="mba">MBA</SelectItem>
                      <SelectItem value="mca">MCA</SelectItem>
                      <SelectItem value="bba">BBA</SelectItem>
                      <SelectItem value="bca">BCA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">
                    Branch / Department <span className="text-destructive">*</span>
                  </Label>
                  <Select required>
                    <SelectTrigger id="branch">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse">Computer Science & Engineering</SelectItem>
                      <SelectItem value="ece">Electronics & Communication</SelectItem>
                      <SelectItem value="ee">Electrical Engineering</SelectItem>
                      <SelectItem value="me">Mechanical Engineering</SelectItem>
                      <SelectItem value="ce">Civil Engineering</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joiningYear">
                    Year of Joining <span className="text-destructive">*</span>
                  </Label>
                  <Select required>
                    <SelectTrigger id="joiningYear">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 20 }, (_, i) => 2005 + i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passingYear">
                    Year of Passing <span className="text-destructive">*</span>
                  </Label>
                  <Select required>
                    <SelectTrigger id="passingYear">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 22 }, (_, i) => 2005 + i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit">Submit Record</Button>
        </div>
      </form>
    </div>
  )
}
