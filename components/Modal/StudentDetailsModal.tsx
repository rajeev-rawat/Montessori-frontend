"use client"

import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface StudentDetailsModalProps {
  open: boolean
  onClose: () => void
  student: Record<string, any> | null
}

export function StudentDetailsModal({
  open,
  onClose,
  student,
}: StudentDetailsModalProps) {
  if (!student) return null

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[900px] sm:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto sm:p-6">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
        </DialogHeader>

        {/* ✅ STUDENT PHOTO */}
        {student.PhotoOfStudent && (
          <div className="flex justify-center mb-6">
            <Image
              src={`${BASE_URL}/${student.PhotoOfStudent}`}
              alt={student.NameOfThePupil || "Student Photo"}
              width={130}
              height={130}
              className="rounded-full border object-cover"
            />
          </div>
        )}

        {/* ✅ DETAILS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {Object.entries(student).map(([key, value]) => {
           
          if (
              key === "id" ||
              key === "SchoolName" ||
              key === "EntryDate" ||
              key === "PhotoOfStudent"
            ) {
              return null
            }
            return (
              <div
                key={key}
                className="rounded-md border p-3 bg-muted/20"
              >
                <p className="text-xs text-muted-foreground mb-1">
                  {key.replace(/([A-Z])/g, " $1")}
                </p>

                {key === "status" ? (
                  <Badge variant={value === "duplicate" ? "destructive" : "secondary"}>
                    {value}
                  </Badge>
                ) : (
                  <p className="font-medium break-all">
                    {value !== null && value !== "" ? value : "-"}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default StudentDetailsModal
