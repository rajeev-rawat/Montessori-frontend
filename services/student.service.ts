const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!

export interface Student {
  id?: number
  AdmissionNo: string
  student_name: string
  ParentNameFather: string
  Mother?: string
  SchoolClass: string
  mobile?: string
  address?: string
  AdharNo?: string
  AdmissionDate?: string
  DateOfBirth?: string
  email?: string
  status?: string
  Nationlty?: string
  Relegion?: string
  Caste?: string
  MotherToung?: string
  ClassStudentAdmitted?: string
  TCNo?: string
  OccupationFather?: string
  LeavingClass?: string
  DateOfLeaving?: string
  ReasonOfLeaving?: string
  NoAndDateTransferCertificate?: string
  EntryDate?: string,
  SchoolName?:string
}

interface GetStudentsParams {
  page?: number
  limit?: number
  search?: string
  status?: string
  school?: string 
}

export async function getStudentsApi(
  params: GetStudentsParams,
  token: string
) {
  const query = new URLSearchParams({
    page: params.page?.toString() || "1",
    limit: params.limit?.toString() || "10",
    search: params.search || "",
    status: params.status || "",
    SchoolName: params.school || "",
  })

  const res = await fetch(`${BASE_URL}/student_list?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Api-Key": API_KEY,
      "Content-Type": "application/json",
    },
  })

  const data = await res.json()
  if (!data.status) {
    throw new Error(data.message || "Failed to fetch students")
  }
  return data
}

export async function addStudentApi(
  student: Partial<Student>,
  token: string
) {
  const res = await fetch(`${BASE_URL}/student_insert`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Api-Key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  })

  const data = await res.json()
  if (!data.status) {
    throw new Error(data.message || "Failed to add student")
  }
  return data
}

export async function updateStudentApi(
  student: Partial<Student>,
  token: string
) {
  const res = await fetch(`${BASE_URL}/student_update`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Api-Key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  })

  const data = await res.json()
  if (!data.status) {
    throw new Error(data.message || "Failed to update student")
  }
  return data
}

export async function deleteStudentApi(
  admissionNo: string,
  token: string
) {
  const res = await fetch(`${BASE_URL}/delete_student.php`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Api-Key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      AdmissionNo: admissionNo,
      confirm: "DELETE",
    }),
  })

  const data = await res.json()
  if (!data.status) {
    throw new Error(data.message || "Failed to delete student")
  }
  return data
}

export async function deleteDuplicateApi(
  admissionNo: string,
  token: string
) {
  const res = await fetch(`${BASE_URL}/delete_duplicates_by_admission`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Api-Key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ AdmissionNo: admissionNo }),
  })

  const data = await res.json()
  if (!data.status) {
    throw new Error(data.message || "Failed to delete duplicate")
  }
  return data
}
