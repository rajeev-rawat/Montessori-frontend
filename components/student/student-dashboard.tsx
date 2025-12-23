"use client"

import { StudentSidebar } from "./student-sidebar"
import { StudentOverview } from "./student-overview"
import { StudentDataForm } from "./student-data-form"
import { StudentProfile } from "./student-profile"

interface StudentDashboardProps {
  currentView: string
  setCurrentView: (view: string) => void
  onLogout: () => void
}

export function StudentDashboard({ currentView, setCurrentView, onLogout }: StudentDashboardProps) {
  const renderContent = () => {
    switch (currentView) {
      case "data-entry":
        return <StudentDataForm />
      case "profile":
        return <StudentProfile />
      default:
        return <StudentOverview setCurrentView={setCurrentView} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <StudentSidebar currentView={currentView} setCurrentView={setCurrentView} onLogout={onLogout} />
      <main className="flex-1 overflow-auto bg-background">{renderContent()}</main>
    </div>
  )
}
