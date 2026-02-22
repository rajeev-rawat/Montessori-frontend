"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface BoardSelectProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}

export function BoardSelect({
  value,
  onChange,
  placeholder = "Please Select Board",
}: BoardSelectProps) {
  return (
    <Select
      value={value || ""}
      onValueChange={(val) => onChange(val === "ALL" ? "" : val)}
    >
      <SelectTrigger className="w-full cursor-pointer">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="ALL">Please Select</SelectItem>
        <SelectItem value="CBSE">CBSE</SelectItem>
        <SelectItem value="STATE">STATE</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default BoardSelect