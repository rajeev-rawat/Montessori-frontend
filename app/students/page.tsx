import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AllStudents } from "@/components/admin/all-students";

export default function StudentsPage() {
    return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-auto bg-background"><AllStudents /></main>
    </div>
  )
}
