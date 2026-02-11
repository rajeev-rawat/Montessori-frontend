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
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SchoolSelect({
  value,
  onChange,
  placeholder = "Select school",
}: SchoolSelectProps) {
  const { schools, fetchSchools } = useSchoolStore()
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    if (!user) return
    fetchSchools(user.SchoolName || undefined)
  }, [user, fetchSchools])

  useEffect(() => {
    if (schools.length > 0 && !value) {
      onChange(schools[0].SchoolName)
    }
  }, [schools, value, onChange])

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {schools.map((school) => (
          <SelectItem
            key={school.SchoolName}
            value={school.SchoolName}
          >
            {school.School_Name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SchoolSelect
