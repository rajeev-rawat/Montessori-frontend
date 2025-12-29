"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface StudentDetailsModalProps {
  open: boolean
  onClose: () => void
  student: Record<string, any> | null
}

export function StudentDetailsModal({ open, onClose, student }: StudentDetailsModalProps) {
  if (!student) return null
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {Object.entries(student).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <p className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
              {key === "status" ? <Badge variant="secondary">{value}</Badge> : <p className="font-medium break-all">{value || "-"}</p>}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default StudentDetailsModal
