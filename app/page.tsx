"use client"

import { useState } from "react"
import { LoginPage } from "@/components/login-page"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { StudentDashboard } from "@/components/student/student-dashboard"
import Schools from "./home/page"

export type UserRole = "admin" | "student" | null

export default function Home() {
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [currentView, setCurrentView] = useState<string>("dashboard")

  const handleLogin = (role: UserRole) => {
    setUserRole(role)
    setCurrentView("dashboard")
  }

  const handleLogout = () => {
    setUserRole(null)
    setCurrentView("dashboard")
  }

  if (!userRole) {
    return <Schools  />
  }

  if (userRole === "admin") {
    return <AdminDashboard currentView={currentView} setCurrentView={setCurrentView} onLogout={handleLogout} />
  }

  return <StudentDashboard currentView={currentView} setCurrentView={setCurrentView} onLogout={handleLogout} />
}
