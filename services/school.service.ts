export interface School {
  id?: number
  FullName: string
  ShortName?: string
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!

export async function getSchoolsApi(shortName: string): Promise<School[]> {
  const res = await fetch(`${BASE_URL}/get_schools?${shortName ? `ShortName=${shortName}` : ""}`, {
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
