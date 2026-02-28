import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { BulkUploadModule } from "@/components/admin/bulk-upload-module";


export default function BulkUploadPage() {
    return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-auto bg-[#0cc0df]"><BulkUploadModule /></main>
    </div>
  )
}
