"use client"

import { useRef, useState, useEffect } from "react"
import { useBulkUploadStore } from "@/store/bulk-upload.store"
import { useToast } from "@/hooks/use-toast"
import { useSchoolStore } from "@/store/school.store"
import { useAuthStore } from "@/store/auth.store"
import { SchoolSelect } from "@/components/dropdown/dropdown"
import { YearDropdown } from "@/components/dropdown/year-dropdown"
import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Eye,
  Trash2,
} from "lucide-react"

type UploadStatus = "idle" | "uploading" | "preview" | "complete" | "error"

export function BulkUploadModule() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  const [selectedSchool, setSelectedSchool] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const user = useAuthStore((state) => state.user)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { upload, response, report, reset } = useBulkUploadStore()
  const { toast } = useToast()
  const { schools, fetchSchools } = useSchoolStore()

  useEffect(() => {
    if (user?.SchoolName && schools.length === 0) {
      fetchSchools(user.SchoolName)
    }
  }, [user?.SchoolName, schools.length, fetchSchools])

  const resetUpload = () => {
    reset()
    setUploadStatus("idle")
    setProgress(0)
    setSelectedFile(null)
  }

  const handleFileSelect = (file?: File) => {
    if (!file) return
    setSelectedFile(file)
  }
  const handleUpload = async () => {
    if (!selectedFile) return

    if (!selectedSchool) {
      toast({ variant: "destructive", title: "Select school first" })
      return
    }

    if (!selectedYear) {
      toast({ variant: "destructive", title: "Select academic year" })
      return
    }

    setUploadStatus("uploading")
    setProgress(40)

    try {
      await upload(selectedFile, selectedSchool, selectedYear)
      setProgress(100)
      setUploadStatus("preview")

      const res = useBulkUploadStore.getState().response
      if (!res) return

      toast({
        title:
          res.errors_count > 0 || res.duplicates_inserted > 0
            ? "Upload completed with issues"
            : "Bulk upload successful",
        description: `${res.inserted_total} inserted, ${res.duplicates_inserted} duplicates, ${res.errors_count} errors`,
      })
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: err.message || "Something went wrong",
      })
      setUploadStatus("error")
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* WATERMARK */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]">
        <Image src="/logo.png" alt="Watermark" width={600} height={600} />
      </div>

      <div>
        <h1 className="text-2xl font-bold">Bulk Upload</h1>
        <p className="text-muted-foreground">
          Upload CSV or Excel files to add multiple student records
        </p>
      </div>

      {/* DROPDOWNS */}
      <div className="flex bg-white flex-col sm:flex-row gap-4 max-w-xl">
        <SchoolSelect value={selectedSchool} onChange={setSelectedSchool} />
        <YearDropdown value={selectedYear} onChange={setSelectedYear} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload File
              </CardTitle>
              <CardDescription>
                Supported formats: CSV, XLS, XLSX
              </CardDescription>
            </CardHeader>

            <CardContent>
              {uploadStatus === "idle" && (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    dragActive ? "border-primary bg-primary/5" : ""
                  }`}
                  onDragEnter={(e) => {
                    e.preventDefault()
                    setDragActive(true)
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault()
                    setDragActive(false)
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    setDragActive(false)
                    handleFileSelect(e.dataTransfer.files[0])
                  }}
                >
                  <FileSpreadsheet className="w-12 h-12 mx-auto mb-4" />

                  {selectedFile ? (
                    <p className="font-medium mb-4">
                      Selected: {selectedFile.name}
                    </p>
                  ) : (
                    <p className="mb-4">Drag & drop file here</p>
                  )}

                  <div className="flex justify-center gap-3">
                    <Button onClick={() => fileInputRef.current?.click()}>
                      Choose File
                    </Button>

                  </div>

                  <input
                    ref={fileInputRef}
                    hidden
                    type="file"
                    accept=".csv,.xls,.xlsx"
                    onChange={(e) =>
                      e.target.files &&
                      handleFileSelect(e.target.files[0])
                    }
                  />
                </div>
              )}

              {uploadStatus === "uploading" && (
                <div className="space-y-4 text-center">
                  <Progress value={progress} />
                  <p>Uploading and validating data…</p>
                </div>
              )}

              {uploadStatus === "error" && (
                <Button onClick={resetUpload}>Retry</Button>
              )}
               <div className="flex justify-end gap-3 mt-5">
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || !selectedSchool || !selectedYear}
              >
                Upload Now
              </Button>
            </div>
            </CardContent>
           
          </Card>

          {uploadStatus === "preview" && response && (
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admission No</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.map((row) => (
                      <TableRow key={row.row}>
                        <TableCell>{row.AdmissionNo}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.error || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Template</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default BulkUploadModule
