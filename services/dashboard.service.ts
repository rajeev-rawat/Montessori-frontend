const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!

export interface TotalCounts {
  total_students: number
  uploads_this_month: number
  records_verified: number
  pending_reviews: number
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
