export interface PhotoBulkUploadResponse {
  status: boolean
  message: string
  total_rows: number
  updated_total: number
  errors_count: number
  errors: string[]
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!

export async function photoBulkUploadApi(
  file: File,
  selectedSchool:string, 
  selectedYear:string, 
  selectedBoard:string,
  token: string
): Promise<PhotoBulkUploadResponse> {
  const formData = new FormData()
  formData.append("file", file)
    formData.append("SchoolName", selectedSchool)
      formData.append("AcademicYear", selectedYear)
        formData.append("Board", selectedBoard)
  
  const res = await fetch(
    `${BASE_URL}/student_bulk_upload-StudentPhoto`,
    {
      method: "POST",
      headers: {
        "X-Api-Key": API_KEY,
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  )

  const data = await res.json()

  if (!data.status) {
    throw new Error(data.message || "Photo bulk upload failed")
  }

  return data
}
