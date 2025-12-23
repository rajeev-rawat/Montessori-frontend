"use client"

import { AdminSidebar } from "./admin-sidebar"
import { DashboardOverview } from "./dashboard-overview"
import { BulkUploadModule } from "./bulk-upload-module"
import { SearchRecords } from "./search-records"
import { AllStudents } from "./all-students"
import { ReportsModule } from "./reports-module"
import { SettingsModule } from "./settings-module"

interface AdminDashboardProps {
  currentView: string
  setCurrentView: (view: string) => void
  onLogout: () => void
}

export function AdminDashboard({ currentView, setCurrentView, onLogout }: AdminDashboardProps) {
  const renderContent = () => {
    switch (currentView) {
      case "bulk-upload":
        return <BulkUploadModule />
      case "search":
        return <SearchRecords />
      case "students":
        return <AllStudents />
      case "reports":
        return <ReportsModule />
      case "settings":
        return <SettingsModule />
      default:
        return <DashboardOverview setCurrentView={setCurrentView} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar currentView={currentView} setCurrentView={setCurrentView} onLogout={onLogout} />
      <main className="flex-1 overflow-auto bg-background">{renderContent()}</main>
    </div>
  )
}
