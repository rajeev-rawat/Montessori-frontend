"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ALL_VALUE = "ALL"
function generateAcademicYears(startYear: number) {
  const currentYear: number = new Date().getFullYear()
  const years: { label: string; value: string }[] = []

  for (let y = startYear; y <= currentYear; y++) {
    years.push({
      label: `${y}-${y + 1}`,
      value: String(y + 1), // send end year only
    })
  }

  return years.reverse()
}

export function YearDropdown({ value, onChange }: { value?: string; onChange: (val: string) => void }) {
  const academicYears = generateAcademicYears(1975)

  return (
    <Select
      value={value || ALL_VALUE}
      onValueChange={(val) =>
        onChange(val === ALL_VALUE ? "" : val)
      }
    >
      < SelectTrigger className="w-full cursor-pointer">
        <SelectValue placeholder="All Academic Years" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={ALL_VALUE}>
          All Academic Years
        </SelectItem>

        {academicYears.map((year) => (
          <SelectItem key={year.value} value={year.value}>
            {year.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function YearDropdownWithoutAll({ value, onChange }: { value?: string; onChange: (val: string) => void }) {
  const academicYears = generateAcademicYears(1975)

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select Academic Year" />
      </SelectTrigger>

      <SelectContent>
        {academicYears.map((year) => (
          <SelectItem key={year.value} value={year.value}>
            {year.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
