"use client"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!

export interface Student {
  id?: number

  IDNo: string
  AdmissionNo: string
  NameOfThePupil: string

  StudentAadhaarNo: string
  PENNo: string
  AAPARID: string

  FatherName: string
  FatherAadhaarNo: string
  FatherMobileNumber: string
  FatherQualification: string
  FatherOccupation: string

  MotherName: string
  MotherAadharNo: string
  MotherMobileNo: string
  MotherBankAccountNo: string
  MotherQualification: string
  MotherOccupation: string
  MotherMailID: string


  MailID: string
  ResidenceAddress: string
  BankIFSCCode: string

  PreviousSchoolClass: string
  ClassAdmitted: string
  ClassLeaving: string

  TCNumber: string
  LeavingTCNo: string
  TCTakenDate: string

  DateOfAdmission: string
  DateOfBirth: string
  DateOfLeaving: string

  Nationality: string
  Religion: string
  Caste: string
  SubCaste: string
  MotherTongue: string

  PhotoOfStudent: string
  EntryDate: string

  SchoolName: string
  AcademicYear: string

  status?: "valid" | "duplicate"
}

interface GetStudentsParams {
  page?: number
  limit?: number
  search?: string
  school?: string
  year?: string
}

export async function getStudentsApi(
  params: GetStudentsParams,
  token: string
) {
  const query = new URLSearchParams({
    page: String(params.page || 1),
    limit: String(params.limit || 10),
    search: params.search || "",
    SchoolName: params.school || "",
    AcademicYear: params.year || "",
  })

  const res = await fetch(`${BASE_URL}/student_list?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Api-Key": API_KEY,
    },
  })

  const data = await res.json()
  if (!data.status) throw new Error(data.message)
  return data
}

// ✅ ADD STUDENT — USING FORMDATA
export async function addStudentApi(
  student: FormData,
  token: string
) {
  const res = await fetch(`${BASE_URL}/student_insert`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Api-Key": API_KEY,
      // ❌ Do NOT set Content-Type; browser sets multipart/form-data automatically
    },
    body: student,
  })

  const data = await res.json()
  if (!data.status) throw new Error(data.message)
  return data
}

// ✅ UPDATE STUDENT — USING FORMDATA
export async function updateStudentApi(
  student: FormData,
  token: string
) {
  const res = await fetch(`${BASE_URL}/student_update`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Api-Key": API_KEY,
      // ❌ Do NOT set Content-Type; browser sets multipart/form-data automatically
    },
    body: student,
  })

  const data = await res.json()
  if (!data.status) throw new Error(data.message)
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
  if (!data.status) throw new Error(data.message)
  return data
}

// ✅ DELETE DUPLICATE
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
  if (!data.status) throw new Error(data.message)
  return data
}
