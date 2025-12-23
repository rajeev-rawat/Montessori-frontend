"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileEdit, CheckCircle, Clock, ArrowRight, AlertCircle } from "lucide-react"

interface StudentOverviewProps {
  setCurrentView: (view: string) => void
}

export function StudentOverview({ setCurrentView }: StudentOverviewProps) {
  const hasSubmitted = false // Toggle this to see different states

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome, Rahul!</h1>
        <p className="text-muted-foreground">Submit and manage your student record</p>
      </div>

      {/* Status Card */}
      <Card className={hasSubmitted ? "border-success/50 bg-success/5" : "border-warning/50 bg-warning/5"}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${hasSubmitted ? "bg-success/20" : "bg-warning/20"}`}
            >
              {hasSubmitted ? (
                <CheckCircle className="w-6 h-6 text-success" />
              ) : (
                <AlertCircle className="w-6 h-6 text-warning" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-semibold text-foreground">
                  {hasSubmitted ? "Record Submitted" : "Record Pending"}
                </h2>
                <Badge variant={hasSubmitted ? "default" : "secondary"}>
                  {hasSubmitted ? "Verified" : "Action Required"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {hasSubmitted
                  ? "Your student record has been submitted and verified. You can view or update your information anytime."
                  : "Please complete and submit your student record. This information will be stored in our alumni database."}
              </p>
              {!hasSubmitted && (
                <Button className="mt-4" onClick={() => setCurrentView("data-entry")}>
                  Submit Your Record
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card
          className="cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => setCurrentView("data-entry")}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileEdit className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">{hasSubmitted ? "Edit Record" : "Submit Record"}</CardTitle>
                <CardDescription>
                  {hasSubmitted ? "Update your submitted information" : "Fill in your student details"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card
          className="cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => setCurrentView("profile")}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <CardTitle className="text-base">View Profile</CardTitle>
                <CardDescription>Check your account settings</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>Follow these steps to submit your record</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">
                1
              </div>
              <div>
                <p className="font-medium text-foreground">Fill Your Details</p>
                <p className="text-sm text-muted-foreground">
                  Complete the student record form with your personal, contact, and academic information.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">
                2
              </div>
              <div>
                <p className="font-medium text-foreground">Review & Submit</p>
                <p className="text-sm text-muted-foreground">
                  Double-check your information for accuracy before submitting.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">
                3
              </div>
              <div>
                <p className="font-medium text-foreground">Verification</p>
                <p className="text-sm text-muted-foreground">
                  Your record will be verified by the admin team and added to the alumni database.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
