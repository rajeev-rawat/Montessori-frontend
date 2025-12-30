"use client"

import { GraduationCap } from "lucide-react"

export default function AuthHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">
              Indus Education
            </h1>
            <p className="text-xs text-muted-foreground">
              Student Records Management Portal
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
