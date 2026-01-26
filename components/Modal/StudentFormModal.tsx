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
import SchoolSelect from "@/components/dropdown/dropdown"
import { useStudentStore } from "@/store/student.store"

interface StudentFormModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: FormData) => Promise<void>
  initialData?: Student | null
  title: string
}

const defaultStudent: Student = {
  IDNo: "",
  AdmissionNo: "",
  NameOfThePupil: "",
  StudentAadhaarNo: "",
  PENNo: "",
  AAPARID: "",
  FatherName: "",
  FatherAadhaarNo: "",
  FatherMobileNumber: "",
  ParentOccupation: "",
  MotherName: "",
  MotherAadharNo: "",
  MotherMobileNo: "",
  MotherBankAccountNo: "",
  MailID: "",
  ResidenceAddress: "",
  BankIFSCCode: "",
  PreviousSchoolClass: "",
  ClassAdmitted: "",
  ClassLeaving: "",
  TCNumber: "",
  LeavingTCNo: "",
  TCTakenDate: "",
  DateOfAdmission: "",
  DateOfBirth: "",
  DateOfLeaving: "",
  Nationality: "Indian",
  Religion: "",
  Caste: "",
  SubCaste: "",
  MotherTongue: "",
  PhotoOfStudent: "",
  EntryDate: "",
  SchoolName: "",
  AcademicYear: "",
}

export function StudentFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
  title,
}: StudentFormModalProps) {
  const [formData, setFormData] = useState<Student>(defaultStudent)
  const { school: selectedSchool, setSchool } = useStudentStore()

  useEffect(() => {
    if (initialData) {
      setFormData({ ...defaultStudent, ...initialData })
      if (initialData.SchoolName) setSchool(initialData.SchoolName)
    } else {
      setFormData(defaultStudent)
    }
  }, [initialData, setSchool])

  const handleChange = (key: keyof Student, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "PhotoOfStudent") {
        if (value instanceof File) {
          payload.append("PhotoOfStudent", value)
        }
      } else if (value !== undefined && value !== null) {
        payload.append(key, String(value))
      }
    })

    // 🔥 Add selected school
    if (selectedSchool) {
      payload.append("SchoolName", selectedSchool)
    }

    await onSubmit(payload)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[900px] sm:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto sm:p-6">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <Label>School</Label>
              <SchoolSelect
                value={selectedSchool}
                onChange={setSchool}
                placeholder="Select school"
              />
            </div>

            {Object.entries(formData).map(([key, value]) => {
              if (key === "id" || key === "EntryDate" || key === "SchoolName")
                return null

              const isAdmissionNo = key === "AdmissionNo"
              const disabled = !!initialData && isAdmissionNo

              return (
                <div key={key} className="space-y-1">
                  <Label>{key.replace(/([A-Z])/g, " $1")}</Label>

                  {key === "PhotoOfStudent" ? (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleChange(
                          key as keyof Student,
                          e.target.files?.[0]
                        )
                      }
                    />
                  ) : (
                    <Input
                      value={value || ""}
                      onChange={(e) =>
                        handleChange(
                          key as keyof Student,
                          e.target.value
                        )
                      }
                      disabled={disabled}
                    />
                  )}
                </div>
              )
            })}
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
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
