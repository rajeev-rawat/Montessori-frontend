"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  LayoutDashboard,
  Upload,
  Search,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react"
import { useState } from "react"

interface AdminSidebarProps {
  currentView: string
  setCurrentView: (view: string) => void
  onLogout: () => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "bulk-upload", label: "Bulk Upload", icon: Upload },
  { id: "search", label: "Search Records", icon: Search },
  { id: "students", label: "All Students", icon: Users },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
]

export function AdminSidebar({ currentView, setCurrentView, onLogout }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

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
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              currentView === item.id && "bg-sidebar-accent text-sidebar-accent-foreground",
              collapsed && "justify-center px-2",
            )}
            onClick={() => setCurrentView(item.id)}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </Button>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="p-3 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3 mb-3 px-3", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center shrink-0">
            <span className="text-xs font-medium">AD</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">admin@indus.edu</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed && "justify-center px-2",
          )}
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  )
}
