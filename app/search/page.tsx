import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SearchRecords } from "@/components/admin/search-records";


export default function SearchPage() {
    return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-auto bg-background"><SearchRecords /></main>
    </div>
  )
}
