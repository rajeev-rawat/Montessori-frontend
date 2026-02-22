const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!

export interface TotalCounts {
  total_students: number
  class_leaving_from_10th: number
  current_year_10th_students: number
  students_admitted_current_year: number
}

export async function getTotalCountsApi(schoolSchoolName: string): Promise<TotalCounts> {
  const res = await fetch(`${BASE_URL}/student_total_count?SchoolName=${schoolSchoolName}`, {
    headers: {
      "X-Api-Key": API_KEY,
    },
  })

  const data = await res.json()

  if (!data.status) {
    throw new Error(data.message || "Failed to fetch total counts")
  }

  return data.cards
}
