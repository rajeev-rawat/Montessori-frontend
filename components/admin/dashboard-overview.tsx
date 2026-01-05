"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth.store"
import { useSchoolStore } from "@/store/school.store"
import { useDashboardStore } from "@/store/dashboard.store"
import { SchoolSelect } from "@/components/dropdown/dropdown"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Upload, ArrowRight, FileCheck, AlertCircle, TrendingUp } from "lucide-react"
import Image from "next/image";
export function DashboardOverview() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const { schools, fetchSchools } = useSchoolStore()
  const { counts, fetchCounts, loading } = useDashboardStore()
  const [selectedSchool, setSelectedSchool] = useState<string>("")
  const user = useAuthStore((state) => state.user)

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (!token) {
      router.replace("/login")
      return
    }
    setAuthChecked(true)
  }, [router])

  // Fetch schools on load
  useEffect(() => {
    if (user?.SchoolName && schools.length === 0) {
      fetchSchools(user.SchoolName)
    }
  }, [user?.SchoolName, schools.length, fetchSchools])

  // Fetch counts when school selected
  useEffect(() => {
    if (selectedSchool) {
      const schoolObj = schools.find((s) => s.SchoolName === selectedSchool)
      if (schoolObj?.SchoolName) {
        fetchCounts(schoolObj.SchoolName)
      }
    }
  }, [selectedSchool, schools, fetchCounts])

  if (!authChecked) return null

  const stats = [
    {
      label: "Total Students",
      value: counts ? counts.total_students.toLocaleString() : "0",
      icon: Users,
      trend: "+2.5%",
      color: "bg-primary",
    },
    {
      label: "Uploads This Month",
      value: counts ? counts.uploads_this_month.toLocaleString() : "0",
      icon: Upload,
      trend: "+12%",
      color: "bg-accent",
    },
    {
      label: "Records Verified",
      value: counts ? counts.records_verified.toLocaleString() : "0",
      icon: FileCheck,
      trend: "+1.2%",
      color: "bg-success",
    },
    {
      label: "Pending Reviews",
      value: counts ? counts.pending_reviews.toLocaleString() : "0",
      icon: AlertCircle,
      trend: "-5%",
      color: "bg-warning",
    },
  ]

  return (
    <div className="p-6 space-y-6">
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
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! {"Here's"} an overview of your student records.
        </p>
      </div>

      {/* School Dropdown */}
      <div className="max-w-sm">
        <SchoolSelect value={selectedSchool} onChange={setSelectedSchool} />
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

      {/* Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-between bg-transparent"
              variant="outline"
              onClick={() => router.push("/bulkUpload")}
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
              onClick={() => router.push("/students")}
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                All Students
              </span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
