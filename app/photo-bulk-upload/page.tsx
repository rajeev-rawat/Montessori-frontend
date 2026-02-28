import { AdminSidebar } from "@/components/admin/admin-sidebar";
import PhotoBulkUploadPage from "@/components/admin/photo-bulk-upload";


export default function BulkUploadPage() {
    return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-auto bg-[#0cc0df]"><PhotoBulkUploadPage /></main>
    </div>
  )
}
