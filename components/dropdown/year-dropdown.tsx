"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type YearDropdownProps = {
  value: string
  onChange: (year: string) => void
}

export function YearDropdown({ value, onChange }: YearDropdownProps) {
  const currentYear = new Date().getFullYear()
  const startYear = 1975

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => (currentYear - i).toString()
  )

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select Academic Year" />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
