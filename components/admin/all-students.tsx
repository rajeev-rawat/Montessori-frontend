"use client"

import { useEffect } from "react"
import Image from "next/image"
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
import { Eye, Edit, Trash, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { useStudentStore } from "@/store/student.store"
import StudentDetailsModal from "../Modal/StudentDetailsModal"
import StudentFormModal from "../Modal/StudentFormModal"
import SchoolSelect from "@/components/dropdown/dropdown"
import { YearDropdown } from "@/components/dropdown/year-dropdown"

export default function AllStudents() {
  // ✅ NOTHING REMOVED FROM HERE
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
    openViewModal,
    openEditModal,
    openAddModal,
    viewModalOpen,
    editModalOpen,
    addModalOpen,
    selectedStudent,
    closeModals,
    addStudent,
    updateStudent,
    deleteStudent,
  } = useStudentStore()

  useEffect(() => {
    fetchStudents()
  }, [page, search, school, year, fetchStudents])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Students</h1>
        <Button onClick={openAddModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Search by name / admission no"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SchoolSelect value={school} onChange={setSchool} />
        <YearDropdown value={year} onChange={setYear} />
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-x-auto bg-white">
        <Table>
          <TableHeader>
            <TableRow>
               <TableHead>ID No</TableHead>
            <TableHead>Admission No</TableHead>
            <TableHead>Name of the Pupil</TableHead>
            <TableHead>Student Aadhaar No</TableHead>
            <TableHead>PEN No</TableHead>
            <TableHead>AAPAR ID</TableHead>
            <TableHead>Mail ID</TableHead>
            <TableHead>Date of Admission</TableHead>
            <TableHead>Date of Birth</TableHead>
          
            <TableHead>Class Admitted</TableHead>
            <TableHead>Class Leaving</TableHead>
            <TableHead>Date of Leaving</TableHead>
            <TableHead>Leaving TC No</TableHead>
            <TableHead>TC Taken Date</TableHead>
            <TableHead>Photo</TableHead>
            <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

           <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={33} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            students.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.IDNo}</TableCell>
                <TableCell>{s.AdmissionNo}</TableCell>
                <TableCell>{s.NameOfThePupil}</TableCell>
                <TableCell>{s.StudentAadhaarNo}</TableCell>
                <TableCell>{s.PENNo}</TableCell>
                <TableCell>{s.AAPARID}</TableCell>
                <TableCell>{s.MailID}</TableCell>
               
                <TableCell>{s.DateOfAdmission}</TableCell>
                <TableCell>{s.DateOfBirth}</TableCell>
             
                <TableCell>{s.ClassAdmitted}</TableCell>
                <TableCell>{s.ClassLeaving}</TableCell>
                <TableCell>{s.DateOfLeaving}</TableCell>
                <TableCell>{s.LeavingTCNo}</TableCell>
                <TableCell>{s.TCTakenDate}</TableCell>
                <TableCell>
                  {s.PhotoOfStudent ? (
                    <div className="flex items-center gap-2">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${s.PhotoOfStudent}`}
                        alt={s.NameOfThePupil || "Student"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => openViewModal(s)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => openEditModal(s)}
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

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Prev
        </Button>
        <span className="text-sm">
          Page {page} of {Math.ceil(total / limit)}
        </span>
        <Button disabled={page * limit >= total} onClick={() => setPage(page + 1)}>
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Modals */}
      <StudentDetailsModal
        open={viewModalOpen}
        onClose={closeModals}
        student={selectedStudent}
      />
      <StudentFormModal
        open={editModalOpen}
        onClose={closeModals}
        initialData={selectedStudent}
        onSubmit={updateStudent}
        title="Edit Student"
      />
      <StudentFormModal
        open={addModalOpen}
        onClose={closeModals}
        onSubmit={addStudent}
        title="Add Student"
      />
    </div>
  )
}
