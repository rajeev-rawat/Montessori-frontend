import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import moment from "moment"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const formatDate = (
  date?: string | Date | null,
  format: string = "DD-MM-YYYY"
): string => {
  if (!date) return ""

  const formatted = moment(date)

  if (!formatted.isValid()) return ""

  return formatted.format(format)
}