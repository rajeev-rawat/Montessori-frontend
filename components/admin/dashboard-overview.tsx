"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Upload, FileCheck, AlertCircle, TrendingUp, ArrowRight } from "lucide-react"
import { useAuthStore } from "@/store/auth.store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
interface DashboardOverviewProps {
  setCurrentView: (view: string) => void
}

const stats = [
  { label: "Total Students", value: "2,34,567", icon: Users, trend: "+2.5%", color: "bg-primary" },
  { label: "Uploads This Month", value: "45", icon: Upload, trend: "+12%", color: "bg-accent" },
  { label: "Records Verified", value: "2,31,890", icon: FileCheck, trend: "+1.2%", color: "bg-success" },
  { label: "Pending Reviews", value: "2,677", icon: AlertCircle, trend: "-5%", color: "bg-warning" },
]

const recentUploads = [
  { id: 1, filename: "batch_2024_records.csv", records: 1250, status: "success", date: "2024-01-15" },
  { id: 2, filename: "alumni_data_dec.xlsx", records: 890, status: "partial", date: "2024-01-14" },
  { id: 3, filename: "engineering_students.csv", records: 2100, status: "success", date: "2024-01-13" },
  { id: 4, filename: "management_batch.xlsx", records: 450, status: "failed", date: "2024-01-12" },
]

// export function DashboardOverview({ setCurrentView }: DashboardOverviewProps) {
  export function DashboardOverview() {
 const router = useRouter()
  const { user } = useAuthStore()
  const [authChecked, setAuthChecked] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (!token) {
      router.replace("/login") // redirect if not logged in
      return
    }
    setAuthChecked(true)
  }, [router])
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! {"Here's"} an overview of your student records.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.trend}</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-between bg-transparent"
              variant="outline"
              onClick={() => router.push('/bulkUpload')}
              // onClick={() => setCurrentView("bulk-upload")}
            >
              <span className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Student Records
              </span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              className="w-full justify-between bg-transparent"
              variant="outline"
              onClick={() => router.push('/students')}
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
               All Students
              </span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            {/* <Button
              className="w-full justify-between bg-transparent"
              variant="outline"
              // onClick={() => setCurrentView("reports")}
            >
              <span className="flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                Export Records
              </span>
              <ArrowRight className="w-4 h-4" />
            </Button> */}
          </CardContent>
        </Card>

        {/* Recent Uploads */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
            <CardDescription>Latest file upload activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUploads.map((upload) => (
                <div key={upload.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{upload.filename}</p>
                    <p className="text-xs text-muted-foreground">
                      {upload.records} records • {upload.date}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      upload.status === "success"
                        ? "bg-success/20 text-success"
                        : upload.status === "partial"
                          ? "bg-warning/20 text-warning"
                          : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {upload.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
