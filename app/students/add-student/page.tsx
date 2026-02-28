"use client"

import { AdminSidebar } from "@/components/admin/admin-sidebar"
import StudentForm from "@/components/admin/StudentForm"
import { useStudentStore } from "@/store/student.store"
import { useRouter } from "next/navigation"

export default function AddStudentPage() {
  const { addStudent } = useStudentStore()
  const router = useRouter()

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-auto bg-[#0cc0df]">
        <StudentForm
          title="Add"
          onSubmit={async (data: any) => {
            await addStudent(data)
            router.push("/students")
          }}
        />

      </main>
    </div>


  )
}
