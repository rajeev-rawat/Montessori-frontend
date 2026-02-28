"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import moment from 'moment'
import { toast } from "@/hooks/use-toast"

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
import ConfirmationModal from "../Modal/ConfirmationModal"
import BoardSelect from "../dropdown/bordDropdown"

type SortKey = "NameOfThePupil" | "AdmissionNo" | "ClassAdmitted" | null
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
    board,
    fetchStudents,
    setPage,
    setSearch,
    setSchool,
    setYear,
    setBoard,
    deleteStudent,
    bulkDeleteStudents
  } = useStudentStore()

  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const totalPages = Math.ceil(total / limit)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)
const [selectedRows, setSelectedRows] = useState<{
    AdmissionNo: string
    SchoolName: string
    Board: string
  }[]>([])
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

//   useEffect(() => {
//   if (!board) {
//     setBoard("CBSE")
//   }
// }, [])
  useEffect(() => {
    fetchStudents()
  }, [page, search, school, year, board])

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
    "MotherTongue",
    "MotherMailID",
    "FatherMailID",
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

  const toggleSelect = (student: any) => {
  setSelectedRows((prev) => {
    const exists = prev.find(
      (s) => s.AdmissionNo === student.AdmissionNo
    )

    if (exists) {
      return prev.filter(
        (s) => s.AdmissionNo !== student.AdmissionNo
      )
    }

    return [
      ...prev,
      {
        AdmissionNo: student.AdmissionNo,
        SchoolName: student.SchoolName,
        Board: student.Board,
      },
    ]
  })
}

const toggleSelectAll = () => {
  if (selectedRows.length === sortedStudents.length) {
    setSelectedRows([])
  } else {
    const all = sortedStudents.map((s: any) => ({
      AdmissionNo: s.AdmissionNo,
      SchoolName: s.SchoolName,
      Board: s.Board,
    }))

    setSelectedRows(all)
  }
}

const handleBulkDelete = async () => {
  try {
    setDeleteLoading(true)

    const admissionNos = selectedRows.map(
      (s) => s.AdmissionNo
    )

    const schoolNames = selectedRows.map(
      (s) => s.SchoolName
    )

    const boards = selectedRows.map(
      (s) => s.Board
    )

    await bulkDeleteStudents(
      admissionNos,
      schoolNames,
      boards
    )

    setConfirmOpen(false)
    setSelectedRows([])
  } catch (error: any) {
    toast({
      variant: "destructive",
      title:
        error?.message ||
        "Something went wrong while deleting.",
    })
  } finally {
    setDeleteLoading(false)
  }
}


  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Students</h1>

        <div className="flex gap-2">
          {selectedRows.length > 0 && (
            <Button
              className="cursor-pointer"
              variant="destructive"
              onClick={() => setConfirmOpen(true)}
            >
              Delete ({selectedRows.length})
            </Button>
          )}
          <Button
            className="cursor-pointer"
            variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Button
            className="cursor-pointer bg-[#fcce00] border-[#0cc0df] text-black hover:bg-[#fcce00]/90"
            onClick={() => router.push("/students/add-student")}>
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-[#fcce00] p-4 rounded-lg shadow-sm">
        <Input
         className="bg-white  placeholder:text-[#000000] focus:ring-[#0cc0df] focus:border-[#0cc0df]"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SchoolSelect value={school} onChange={setSchool} />
        <YearDropdown value={year} onChange={setYear} />
        <BoardSelect
          defaultValue="All"
          value={board}
          onChange={setBoard}
        />
      </div>

      {/* Table */}
      <div className="border rounded-xl bg-white overflow-hidden">
        <div className="max-h-[70vh] overflow-y-auto">
          <Table className="w-full">
            <TableHeader className="top-0 z-20 bg-white shadow-sm  table-fixed">
              <TableRow>
                <TableHead>
                  <input
                    type="checkbox"
                    checked={
                      sortedStudents.length > 0 &&
                      selectedRows.length === sortedStudents.length
                    }
                    onChange={toggleSelectAll}
                  />
                </TableHead>
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
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("ClassAdmitted")}
                >
                  Class Admitted{arrow("ClassAdmitted")}
                </TableHead>
               
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
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedRows.some(
                        (row) => row.AdmissionNo === s.AdmissionNo
                      )}
                      onChange={() => toggleSelect(s)}
                      />
                    </TableCell>
                    <TableCell>{s.IDNo || "-"}</TableCell>
                    <TableCell>{s.AdmissionNo || "-"}</TableCell>
                    <TableCell>{s.NameOfThePupil}</TableCell>
                    <TableCell>{s.StudentAadhaarNo || "-"}</TableCell>
                    <TableCell>
                      {s.DateOfAdmission
                        ? moment(s.DateOfAdmission).format("DD-MM-YYYY")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {s.DateOfBirth
                        ? moment(s.DateOfBirth).format("DD-MM-YYYY")
                        : "-"}
                    </TableCell>
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
                        className="cursor-pointer"
                        size="icon"
                        title="View"
                        variant="ghost"
                        onClick={() => router.push(`/students/view/${s.id}`)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      <Button
                        className="cursor-pointer"
                        size="icon"
                        variant="ghost"
                        title="Edit"
                        onClick={() =>
                          router.push(`/students/edit-student/${s.id}`)
                        }
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      {/* <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteStudent(s)}
                      >
                        <Trash className="w-4 h-4 text-destructive" />
                      </Button> */}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <ConfirmationModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleBulkDelete}
        loading={deleteLoading}
        title="Delete Students?"
        description={`Are you sure you want to delete ${selectedRows.length} students?`}
      />

{/* Pagination */}
<div className="flex items-center justify-center gap-3 flex-wrap mt-6">

  {/* Prev */}
    <div className="text-sm text-muted-foreground">
        {start}-{end} of {total}
      </div>
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="w-10 h-10 flex items-center justify-center rounded-full border disabled:opacity-40 hover:bg-gray-100 transition"
  >
    <ChevronLeft size={18} />
  </button>

  {(() => {
  const visiblePages: (number | string)[] = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i)
    }
  } else {
    const start = Math.max(1, page - 1)
    const end = Math.min(totalPages, page + 1)

    if (start > 1) {
      visiblePages.push(1)
      if (start > 2) visiblePages.push("...")
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i)
    }

    if (end < totalPages) {
      if (end < totalPages - 1) visiblePages.push("...")
      visiblePages.push(totalPages)
    }
  }

  return visiblePages.map((p, index) =>
    p === "..." ? (
      <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
        ...
      </span>
    ) : (
      <button
        key={`page-${p}`}
        onClick={() => setPage(Number(p))}
        className={`w-10 h-10 rounded-full border flex items-center justify-center transition
          ${
            page === p
              ? "bg-gray-300 border-gray-400"
              : "hover:bg-gray-100"
          }
        `}
      >
        {p}
      </button>
    )
  )
})()}

  {/* Next */}
  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="w-10 h-10 flex items-center justify-center rounded-full border disabled:opacity-40 hover:bg-gray-100 transition"
  >
    <ChevronRight size={18} />
  </button>

</div>

    </div>
  )
}