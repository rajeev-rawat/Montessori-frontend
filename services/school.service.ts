export interface School {
  id?: number
  SchoolName: string
  School_Name?: string
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!

export async function getSchoolsApi(
  SchoolName?: string
): Promise<School[]> {
  const query = SchoolName ? `?SchoolName=${SchoolName}` : ""

  const res = await fetch(`${BASE_URL}/get_schools${query}`, {
    headers: {
      "X-API-Key": API_KEY,
    },
  })

  const data = await res.json()

  if (!data.status) {
    throw new Error(data.message || "Failed to fetch schools")
  }

  return data.data
}
