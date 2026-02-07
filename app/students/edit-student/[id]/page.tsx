"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useStudentStore } from "@/store/student.store"
import StudentForm from "@/components/admin/StudentForm"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function EditStudentPage() {
  const { id } = useParams()
  const router = useRouter()

  const {
    students,
    selectedStudent,
    fetchStudents,
    setSelectedStudent,
    updateStudent,
  } = useStudentStore()

  useEffect(() => {
    if (!students.length) {
      fetchStudents()
    }
  }, [])

  useEffect(() => {
    if (students.length && id) {
      const found = students.find((s) => String(s.id) === String(id))
      if (found) setSelectedStudent(found)
    }
  }, [students, id])

  if (!selectedStudent) return null

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-auto bg-background">
        <StudentForm
          title="Edit Student"
          initialData={selectedStudent}
          mode="edit"
          onSubmit={async (data) => {
            await updateStudent(data)
            router.push("/students")
          }}
        />
      </main>
    </div>
  )
}
