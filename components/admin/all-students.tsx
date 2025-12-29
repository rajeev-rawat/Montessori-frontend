"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { useStudentStore } from "@/store/student.store"
import StudentDetailsModal from "../Modal/StudentDetailsModal"
import StudentFormModal from "../Modal/StudentFormModal"


export function AllStudents() {
  const {
    students,
    loading,
    page,
    limit,
    total,
    search,
    status,
    fetchStudents,
    setPage,
    setSearch,
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
  }, [page, search, status])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Students</h1>
        <Button onClick={openAddModal}>
          <Plus className="w-4 h-4 mr-2" /> Add Student
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <Input
          placeholder="Search by name, Admission No..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
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
          {students.map((stu) => (
            <TableRow key={stu.AdmissionNo}>
              <TableCell>{stu.AdmissionNo}</TableCell>
              <TableCell>{stu.student_name}</TableCell>
              <TableCell>{stu.ParentNameFather}</TableCell>
              <TableCell>{stu.SchoolClass}</TableCell>
              <TableCell>
                <Badge variant={stu.status === "duplicate" ? "secondary" : "default"}>{stu.status}</Badge>
              </TableCell>
              <TableCell className="text-right flex gap-1 justify-end">
                <Button size="icon" variant="ghost" onClick={() => openViewModal(stu)}><Eye className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => openEditModal(stu)}><Edit className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => deleteStudent(stu)}><Trash className="w-4 h-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Prev
        </Button>
        <p>Page {page}</p>
        <Button disabled={page * limit >= total} onClick={() => setPage(page + 1)}>
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Modals */}
      <StudentDetailsModal open={viewModalOpen} onClose={closeModals} student={selectedStudent} />
      <StudentFormModal
        open={editModalOpen}
        onClose={closeModals}
        initialData={selectedStudent}
        onSubmit={updateStudent}
        title="Edit Student"
      />
      <StudentFormModal open={addModalOpen} onClose={closeModals} onSubmit={addStudent} title="Add Student" />
    </div>
  )
}
