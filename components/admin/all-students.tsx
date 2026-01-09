"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  Edit,
  Trash,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { useStudentStore } from "@/store/student.store"
import StudentDetailsModal from "../Modal/StudentDetailsModal"
import StudentFormModal from "../Modal/StudentFormModal"
import SchoolSelect from "@/components/dropdown/dropdown"
import { YearDropdown } from "@/components/dropdown/year-dropdown"

export function AllStudents() {
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
  }, [page, search, school, year])

  return (
    <div className="p-6 space-y-6">
      {/* WATERMARK */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]">
        <Image src="/logo.png" alt="Watermark" width={600} height={600} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Students</h1>
        <Button onClick={openAddModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Input
          placeholder="Search by name, Admission No..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <SchoolSelect
          value={school}
          onChange={setSchool}
          placeholder="Select School"
        />

        <YearDropdown
          value={year}
          onChange={setYear}
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-x-auto bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Admission No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Father Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              students.map((stu) => (
                <TableRow key={stu.id}>
                  <TableCell className="font-mono">
                    {stu.AdmissionNo}
                  </TableCell>
                  <TableCell>{stu.student_name}</TableCell>
                  <TableCell>{stu.ParentNameFather}</TableCell>
                  <TableCell>{stu.SchoolClass}</TableCell>
                  <TableCell>
                    <Badge>{stu.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openViewModal(stu)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => openEditModal(stu)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => deleteStudent(stu)}>
                        <Trash className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
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
      <StudentDetailsModal open={viewModalOpen} onClose={closeModals} student={selectedStudent} />
      <StudentFormModal open={editModalOpen} onClose={closeModals} initialData={selectedStudent} onSubmit={updateStudent} title="Edit Student" />
      <StudentFormModal open={addModalOpen} onClose={closeModals} onSubmit={addStudent} title="Add Student" />
    </div>
  )
}

export default AllStudents
