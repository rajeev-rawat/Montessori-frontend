"use client"

import { useRef, useState } from "react"
import { useBulkUploadStore } from "@/store/bulk-upload.store"
import { useToast } from "@/hooks/use-toast"

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

  const fileInputRef = useRef<HTMLInputElement>(null)

  const { upload, response, report, reset } = useBulkUploadStore()
  const { toast } = useToast()

  const resetUpload = () => {
    reset()
    setUploadStatus("idle")
    setProgress(0)
  }

  const handleFileUpload = async (file?: File) => {
    if (!file) return

    setUploadStatus("uploading")
    setProgress(40)

    try {
      await upload(file)

      setProgress(100)
      setUploadStatus("preview")

      const res = useBulkUploadStore.getState().response
      if (!res) return

      if (res.errors_count > 0 || res.duplicates_inserted > 0) {
        toast({
          title: "Upload completed with issues",
          description: `${res.inserted_total} inserted, ${res.duplicates_inserted} duplicates, ${res.errors_count} errors`,
        })
      } else {
        toast({
          title: "Bulk upload successful",
          description: `${res.inserted_total} records uploaded successfully`,
        })
      }
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Bulk Upload</h1>
        <p className="text-muted-foreground">
          Upload CSV or Excel files to add multiple student records
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload File
              </CardTitle>
              <CardDescription>
                Supported formats: CSV, XLS, XLSX (Max 10MB)
              </CardDescription>
            </CardHeader>

            <CardContent>
              {uploadStatus === "idle" && (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onDragEnter={(e) => {
                    e.preventDefault()
                    setDragActive(true)
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDragLeave={(e) => {
                    e.preventDefault()
                    setDragActive(false)
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    setDragActive(false)
                    handleFileUpload(e.dataTransfer.files[0])
                  }}
                >
                  <FileSpreadsheet className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-foreground font-medium mb-2">
                    Drag and drop your file here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">or</p>

                  <Button onClick={() => fileInputRef.current?.click()}>
                    Browse Files
                  </Button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    accept=".csv,.xls,.xlsx"
                    onChange={(e) =>
                      e.target.files &&
                      handleFileUpload(e.target.files[0])
                    }
                  />
                </div>
              )}

              {uploadStatus === "uploading" && (
                <div className="p-8 text-center space-y-4">
                  <FileSpreadsheet className="w-12 h-12 mx-auto text-primary" />
                  <p className="font-medium text-foreground">
                    Uploading & validating records...
                  </p>
                  <Progress
                    value={progress}
                    className="w-full max-w-xs mx-auto"
                  />
                </div>
              )}

              {uploadStatus === "error" && (
                <div className="p-8 text-center space-y-4">
                  <XCircle className="w-12 h-12 mx-auto text-destructive" />
                  <p className="font-medium text-foreground">
                    Upload failed
                  </p>
                  <Button onClick={resetUpload}>Upload New File</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview */}
          {uploadStatus === "preview" && response && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview Data
                </CardTitle>
                <CardDescription>
                  Total: {response.total_rows} | Inserted:{" "}
                  {response.inserted_total} | Duplicates:{" "}
                  {response.duplicates_inserted} | Errors:{" "}
                  {response.errors_count}
                </CardDescription>
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
                        <TableCell className="font-mono">
                          {row.AdmissionNo}
                        </TableCell>
                        <TableCell>
                          {row.status === "duplicate" && (
                            <span className="flex items-center gap-1 text-warning">
                              <AlertTriangle className="w-4 h-4" /> Duplicate
                            </span>
                          )}
                          {row.status === "error" && (
                            <span className="flex items-center gap-1 text-destructive">
                              <XCircle className="w-4 h-4" /> Error
                            </span>
                          )}
                          {row.status === "valid" && (
                            <span className="flex items-center gap-1 text-success">
                              <CheckCircle className="w-4 h-4" /> Valid
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{row.error || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex gap-3 mt-4">
                  <Button variant="outline" onClick={resetUpload}>
                    Upload New File
                  </Button>

                  {/* <Button
                    onClick={() => {
                      setUploadStatus("complete")
                      toast({
                        title: "Upload finalized",
                        description:
                          "Valid records have been saved successfully",
                      })
                    }}
                  >
                    Confirm Upload
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* RIGHT SECTION – UNCHANGED */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Template</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upload History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">batch_2024.csv</span>
                  <Trash2 className="w-4 h-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default BulkUploadModule