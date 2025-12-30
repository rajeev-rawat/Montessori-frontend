"use client"

import { useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSchoolStore } from "@/store/school.store"
import { useAuthStore } from "@/store/auth.store"

interface SchoolSelectProps {
  value?: string // stores SchoolName
  onChange: (value: string) => void
  placeholder?: string
}

export function SchoolSelect({
  value,
  onChange,
  placeholder = "Select school",
}: SchoolSelectProps) {
  const { schools, fetchSchools, loading } = useSchoolStore()
  const user = useAuthStore((state) => state.user)
  const SchoolName = user?.SchoolName || ""

  // Fetch schools on load
  useEffect(() => {
     fetchSchools(SchoolName)
  }, [ fetchSchools, SchoolName])

  // Auto-select first school if none selected
  useEffect(() => {
    if (!value && schools.length > 0) {
      onChange(schools[0].SchoolName!)
    }
  }, [schools, value, onChange])

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full max-w-full overflow-hidden">
        <SelectValue
          placeholder={loading ? "Loading..." : placeholder}
          className="truncate"
        />
      </SelectTrigger>

      <SelectContent className="max-w-[320px]">
        {schools.map((school) => (
          <SelectItem key={school.SchoolName} value={school.SchoolName!}>
            <span className="truncate">{school.School_Name}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SchoolSelect
