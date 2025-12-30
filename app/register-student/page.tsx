"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar" // 👈 YOUR calendar
import SchoolSelect from "@/components/dropdown/dropdown"

import { Student, addStudentApi } from "@/services/student.service"
import { useToast } from "@/hooks/use-toast"

import AuthHeader from "@/components/layout/AuthHeader"
import AuthFooter from "@/components/layout/AuthFooter"

const defaultStudent: Student = {
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
  status: "valid",
  EntryDate: "",
  ShortName: "",
}

/* ---------------------------------------------
   Date fields list
---------------------------------------------- */
const DATE_FIELDS = [
  "AdmissionDate",
  "DateOfBirth",
  "DateOfLeaving",
  "EntryDate",
] as const

type DateFieldKey = (typeof DATE_FIELDS)[number]
function DatePickerField({
  label,
  value,
  onChange,
}: {
  label: string
  value?: string
  onChange: (date: string) => void
}) {
  const selectedDate = value ? new Date(value) : undefined

  return (
    <div className="space-y-1">
      <Label>{label}</Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            {selectedDate ? format(selectedDate, "dd MMM yyyy") : "Select date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                onChange(format(date, "yyyy-MM-dd"))
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default function RegisterStudentPage() {
  const [formData, setFormData] = useState<Student>(defaultStudent)
  const [school, setSchool] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (key: keyof Student, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!school) {
      toast({
        title: "School required",
        description: "Please select a school",
        variant: "destructive",
      })
      return
    }

    try {
      const token = localStorage.getItem("auth_token") || ""

      await addStudentApi(
        { ...formData, ShortName: school },
        token
      )

      toast({
        title: "Registration Successful",
        description: "Student registered successfully",
      })

      router.push("/")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader />

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-5xl mx-auto bg-card border rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Student Registration
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

              {/* School */}
              <div className="space-y-1">
                <Label>School</Label>
                <SchoolSelect
                  value={school}
                  onChange={setSchool}
                  placeholder="Select school"
                />
              </div>

              {/* Dynamic Fields */}
              {Object.entries(formData).map(([key, value]) => {
                if (["ShortName"].includes(key)) return null

                if (DATE_FIELDS.includes(key as DateFieldKey)) {
                  return (
                    <DatePickerField
                      key={key}
                      label={key.replace(/([A-Z])/g, " $1")}
                      value={value as string}
                      onChange={(date) =>
                        handleChange(key as keyof Student, date)
                      }
                    />
                  )
                }

                return (
                  <div key={key} className="space-y-1">
                    <Label className="capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </Label>
                    <Input
                      value={value || ""}
                      onChange={(e) =>
                        handleChange(key as keyof Student, e.target.value)
                      }
                    />
                  </div>
                )
              })}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/")}
              >
                Cancel
              </Button>
              <Button type="submit">Register</Button>
            </div>
          </form>
        </div>
      </main>

      <AuthFooter />
    </div>
  )
}
