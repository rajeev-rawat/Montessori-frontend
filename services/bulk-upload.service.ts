export type UploadRowStatus = "valid" | "duplicate" | "error"

export interface BulkUploadReportRow {
  row: number
  status: UploadRowStatus
  AdmissionNo: string
  error?: string
}

export interface BulkUploadApiResponse {
  status: boolean
  message: string

  total_rows: number
  inserted_total: number
  duplicates_inserted: number
  missing_required_rows: number
  errors_count: number

  errors: string[]
  report: BulkUploadReportRow[]
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!

export async function bulkUploadApi(
  file: File,
  token: string
): Promise<BulkUploadApiResponse> {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(`${BASE_URL}/student_bulk_upload`, {
    method: "POST",
    headers: {
      "X-Api-Key": API_KEY,
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  const data = await res.json()

  if (!data.status) {
    throw new Error(data.message || "Bulk upload failed")
  }

  return data
}
