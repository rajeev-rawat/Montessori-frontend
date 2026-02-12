"use client"

import { useRouter } from "next/navigation"
import { addStudentApi } from "@/services/student.service"
import { useToast } from "@/hooks/use-toast"
import StudentForm from "@/components/admin/StudentForm"

export default function RegisterStudentPage() {
  const router = useRouter()
  const { toast } = useToast()

  const handleRegisterStudent = async (data: FormData) => {
    try {
      const token = localStorage.getItem("auth_token") || ""

      await addStudentApi(data, token)

      toast({
        title: "Registration Successful",
        description: "Student registered successfully",
      })

      router.push("/")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <StudentForm
      title="Register Student"
      mode="create"
      onSubmit={handleRegisterStudent}
    />
  )
}
