"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Student } from "@/services/student.service"
import SchoolSelect from "@/components/dropdown/dropdown" // import your dropdown
import { useStudentStore } from "@/store/student.store"

interface StudentFormModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (student: Student) => Promise<void>
  initialData?: Student | null
  title: string
}

const defaultStudent: Student = {
//   id: 0,
  student_name: "",
  AdmissionNo: "",
  ParentNameFather: "",
  Mother: "",
  address: "",
  OccupationFather: "",
  SchoolClass: "",
  TCNo: "",
  AdmissionDate: "",
  DateOfBirth: "",
  Nationlty: "Indian",
  Relegion: "",
  Caste: "",
  MotherToung: "Hindi",
  ClassStudentAdmitted: "",
  LeavingClass: "",
  DateOfLeaving: "",
  ReasonOfLeaving: "",
  NoAndDateTransferCertificate: "",
  AdharNo: "",
  mobile: "",
  email: "",
//   status: "valid",
  EntryDate: "",
//   SchoolName: "",
}

export function StudentFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
  title,
}: StudentFormModalProps) {
  const [formData, setFormData] = useState<Student>(defaultStudent)
  const { school: selectedSchool, setSchool } = useStudentStore() // access store

  useEffect(() => {
    if (initialData) {
      setFormData({ ...defaultStudent, ...initialData })
      if (initialData.SchoolName) setSchool(initialData.SchoolName)
    } else {
      setFormData(defaultStudent)
    }
  }, [initialData, setSchool])

  const handleChange = (key: keyof Student, value: any) => {
    setFormData({ ...formData, [key]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Include selected school SchoolName before submitting
    await onSubmit({ ...formData, SchoolName: selectedSchool })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[800px] sm:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">

            {/* School Dropdown */}
            <div className="space-y-1">
              <Label className="text-xs capitalize">School</Label>
              <SchoolSelect
                value={selectedSchool}
                onChange={(val) => setSchool(val)}
                placeholder="Select school"
              />
            </div>

            {Object.entries(formData).map(([key, value]) => {
              if (key === "id" || key === "EntryDate" || key === "School") return null
              
              // Disable AdmissionNo for edit mode
              const isAdmissionNo = key === "AdmissionNo"
              const disabled = !!initialData && isAdmissionNo

              return (
                <div key={key} className="space-y-1">
                  <Label className="text-xs capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </Label>
                  <Input
                    value={value || ""}
                    onChange={(e) =>
                      handleChange(key as keyof Student, e.target.value)
                    }
                    className="text-sm"
                    disabled={disabled}
                  />
                </div>
              )
            })}
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{title}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default StudentFormModal
