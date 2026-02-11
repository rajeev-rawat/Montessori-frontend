"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Eye,
  Edit,
  Trash,
  Plus,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react"
import { useStudentStore } from "@/store/student.store"
import SchoolSelect from "@/components/dropdown/dropdown"
import { YearDropdown } from "@/components/dropdown/year-dropdown"

type SortKey = "NameOfThePupil" | "AdmissionNo" | null
type SortOrder = "asc" | "desc"

export default function AllStudents() {
  const router = useRouter()

  const {
    students,
    loading,
    page,
    limit,
    total,
    search,
    school,
    year,
    fetchStudents,
    setPage,
    setSearch,
    setSchool,
    setYear,
    deleteStudent,
  } = useStudentStore()

  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")

  useEffect(() => {
    fetchStudents()
  }, [page, search, school, year])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("asc")
    }
  }

  const sortedStudents = useMemo(() => {
    if (!sortKey) return students
    return [...students].sort((a: any, b: any) => {
      const aVal = (a[sortKey] || "").toString().toLowerCase()
      const bVal = (b[sortKey] || "").toString().toLowerCase()
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1
      return 0
    })
  }, [students, sortKey, sortOrder])

  const arrow = (key: SortKey) =>
    sortKey === key ? (sortOrder === "asc" ? " ↑" : " ↓") : ""

  /* =========================
     EXPORT CSV LOGIC
  ========================= */

  const EXPORT_FIELDS = [
  "IDNo",
  "AdmissionNo",
  "NameOfThePupil",
  "StudentAadhaarNo",
  "PENNo",
  "AAPARID",
  "SchoolName",
  "AcademicYear",
  "DateOfAdmission",
  "DateOfBirth",
  "ClassAdmitted",
  "ClassLeaving",
  "PreviousSchoolClass",
  "Nationality",
  "Religion",
  "Caste",
  "SubCaste",
  "MotherTongue",
  "FatherName",
  "FatherAadhaarNo",
  "FatherMobileNumber",
  "FatherQualification",
  "FatherOccupation",
  "MotherName",
  "MotherAadharNo",
  "MotherMobileNo",
  "MotherBankAccountNo",
  "MotherQualification",
  "MotherOccupation",
  "MotherMailID",
  "MailID",
  "ResidenceAddress",
  "BankIFSCCode",
  "TCNumber",
  "LeavingTCNo",
  "TCTakenDate",
  "DateOfLeaving",
]
  const handleExport = () => {
  if (!sortedStudents.length) return

  const headers = EXPORT_FIELDS.map((key) =>
    key.replace(/([A-Z])/g, " $1").trim()
  )

  const rows = sortedStudents.map((student: any) =>
    EXPORT_FIELDS.map((field) => {
      const value = student[field]
      return value === null || value === undefined ? "" : value
    })
  )

  const csvContent =
    [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n")

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "students_export.csv"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Students</h1>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Button onClick={() => router.push("/students/add-student")}>
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-4 rounded-lg shadow-sm">
        <Input
          placeholder="Search by Aadhaar no"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SchoolSelect value={school} onChange={setSchool} />
        <YearDropdown value={year} onChange={setYear} />
      </div>

      {/* Table */}
      <div className="border rounded-xl bg-white overflow-hidden">
        <div className="max-h-[70vh] overflow-y-auto">
          <Table className="w-full">
            <TableHeader className="top-0 z-20 bg-white shadow-sm  table-fixed">
              <TableRow>
                <TableHead>ID No</TableHead>

                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("AdmissionNo")}
                >
                  Admission No{arrow("AdmissionNo")}
                </TableHead>

                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("NameOfThePupil")}
                >
                  Name of the Pupil{arrow("NameOfThePupil")}
                </TableHead>

                <TableHead>Student Aadhaar</TableHead>
                <TableHead>Date of Admission</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Class Admitted</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                sortedStudents.map((s: any) => (
                  <TableRow key={s.id} className="hover:bg-muted/40">
                    <TableCell>{s.IDNo || "-"}</TableCell>
                    <TableCell>{s.AdmissionNo || "-"}</TableCell>
                    <TableCell>{s.NameOfThePupil}</TableCell>
                    <TableCell>{s.StudentAadhaarNo || "-"}</TableCell>
                    <TableCell>{s.DateOfAdmission || "-"}</TableCell>
                    <TableCell>{s.DateOfBirth || "-"}</TableCell>
                    <TableCell>{s.ClassAdmitted || "-"}</TableCell>
                    <TableCell>
                      {s.PhotoOfStudent ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${s.PhotoOfStudent}`}
                          alt="student"
                          width={36}
                          height={36}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => router.push(`/students/view/${s.id}`)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          router.push(`/students/edit-student/${s.id}`)
                        }
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteStudent(s)}
                      >
                        <Trash className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Prev
        </Button>

        <span className="text-sm">
          Page {page} of {Math.ceil(total / limit)}
        </span>

        <Button
          disabled={page * limit >= total}
          onClick={() => setPage(page + 1)}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
