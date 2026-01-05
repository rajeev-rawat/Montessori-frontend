"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  LayoutDashboard,
  Upload,
  Search,
  Users,
  LogOut,
  ChevronLeft,
  Menu,
  Calendar1,
  UserPen,
  FileClock,
  UsersRound,
  UserRoundCheck,
  Printer,
  ShieldCheck,
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth.store"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, route: "/dashboard" },
  { id: "bulk-upload", label: "Bulk Upload", icon: Upload, route: "/bulkUpload" },
  { id: "students", label: "All Students", icon: Users, route: "/students" },
  { id: "events", label: "Events", icon: Calendar1, route: "/events" },
  { id: "account", label: "Account", icon: UserPen, route: "/account" },
  { id: "attendance", label: "Attendance", icon: FileClock, route: "/attendance" },
  { id: "staff", label: "Staff", icon: UsersRound, route: "/staff" },
  { id: "staff-attendance", label: "Staff Attendance", icon: UserRoundCheck, route: "/staff-attendance" },
  { id: "tc-print", label: "TC Print", icon: Printer, route: "/tc-print" },
  { id: "student-certificates", label: "Student Certificates", icon: ShieldCheck, route: "/student-certificates" },
]

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const STUDENT_MENU_INDEX = menuItems.findIndex(item => item.id === "students")

  const handleLogout = () => {
    logout()
    document.cookie = "auth_token=; path=/; max-age=0"
    router.replace("/login")
  }

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && <span className="font-semibold text-sm">Indus Education</span>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:bg-sidebar-accent h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item, index) => {
          const isDisabled = index > STUDENT_MENU_INDEX

          return (
            <Button
              key={item.id}
              variant="ghost"
              disabled={isDisabled}
              className={cn(
                "w-full justify-start gap-3",
                collapsed && "justify-center px-2",
                isDisabled
                  ? "opacity-40 cursor-not-allowed hover:bg-transparent"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              onClick={() => {
                if (!isDisabled) router.push(item.route)
              }}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          )
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-3 border-t border-sidebar-border mt-auto">
        <div className={cn("flex items-center gap-3 mb-3 px-3", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center shrink-0">
            <span className="text-xs font-medium">
              {user?.name?.split(" ").map((n: string) => n[0]).join("") || "AD"}
            </span>
          </div>
          {!collapsed && user && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{user.user_type}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{user.SchoolName}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{user.username}</p>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed && "justify-center px-2",
          )}
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  )
}
