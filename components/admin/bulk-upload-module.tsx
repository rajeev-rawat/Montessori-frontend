"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileSpreadsheet, CheckCircle, XCircle, AlertTriangle, Download, Eye, Trash2 } from "lucide-react"

type UploadStatus = "idle" | "uploading" | "validating" | "preview" | "complete" | "error"

const samplePreviewData = [
  { id: "STU001", name: "Rahul Sharma", email: "rahul@email.com", course: "B.Tech CSE", year: "2020", status: "valid" },
  { id: "STU002", name: "Priya Patel", email: "priya@email.com", course: "B.Tech ECE", year: "2021", status: "valid" },
  { id: "STU003", name: "Amit Kumar", email: "", course: "MBA", year: "2019", status: "error" },
  { id: "STU004", name: "Sneha Reddy", email: "sneha@email.com", course: "B.Tech ME", year: "2022", status: "valid" },
  {
    id: "STU001",
    name: "Duplicate Entry",
    email: "dup@email.com",
    course: "B.Tech CSE",
    year: "2020",
    status: "duplicate",
  },
]

const uploadHistory = [
  { id: 1, filename: "batch_2024.csv", date: "2024-01-15", total: 1250, success: 1230, failed: 20 },
  { id: 2, filename: "alumni_dec.xlsx", date: "2024-01-14", total: 890, success: 845, failed: 45 },
  { id: 3, filename: "engineering.csv", date: "2024-01-13", total: 2100, success: 2100, failed: 0 },
]

export function BulkUploadModule() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = () => {
    setUploadStatus("uploading")
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadStatus("validating")
          setTimeout(() => setUploadStatus("preview"), 1500)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleConfirmUpload = () => {
    setUploadStatus("complete")
  }

  const handleReset = () => {
    setUploadStatus("idle")
    setProgress(0)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Bulk Upload</h1>
        <p className="text-muted-foreground">Upload CSV or Excel files to add multiple student records</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Drag & Drop Zone */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload File
              </CardTitle>
              <CardDescription>Supported formats: CSV, XLS, XLSX (Max 10MB)</CardDescription>
            </CardHeader>
            <CardContent>
              {uploadStatus === "idle" && (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onDragEnter={() => setDragActive(true)}
                  onDragLeave={() => setDragActive(false)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    setDragActive(false)
                    handleFileUpload()
                  }}
                >
                  <FileSpreadsheet className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-foreground font-medium mb-2">Drag and drop your file here</p>
                  <p className="text-sm text-muted-foreground mb-4">or</p>
                  <Button onClick={handleFileUpload}>Browse Files</Button>
                </div>
              )}

              {(uploadStatus === "uploading" || uploadStatus === "validating") && (
                <div className="p-8 text-center space-y-4">
                  <FileSpreadsheet className="w-12 h-12 mx-auto text-primary" />
                  <div>
                    <p className="font-medium text-foreground">
                      {uploadStatus === "uploading" ? "Uploading file..." : "Validating records..."}
                    </p>
                    <p className="text-sm text-muted-foreground">student_records_2024.csv</p>
                  </div>
                  <Progress
                    value={uploadStatus === "validating" ? 100 : progress}
                    className="w-full max-w-xs mx-auto"
                  />
                </div>
              )}

              {uploadStatus === "complete" && (
                <div className="p-8 text-center space-y-4">
                  <CheckCircle className="w-12 h-12 mx-auto text-success" />
                  <div>
                    <p className="font-medium text-foreground">Upload Complete!</p>
                    <p className="text-sm text-muted-foreground">
                      Successfully added 1,230 records. 20 records had errors.
                    </p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Error Report
                    </Button>
                    <Button size="sm" onClick={handleReset}>
                      Upload Another
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview Table */}
          {uploadStatus === "preview" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview Data
                </CardTitle>
                <CardDescription>
                  Review the data before confirming. Found 3 valid, 1 error, 1 duplicate.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {samplePreviewData.map((row, i) => (
                        <TableRow key={i} className={row.status !== "valid" ? "bg-destructive/5" : ""}>
                          <TableCell className="font-mono text-sm">{row.id}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.email || <span className="text-destructive">Missing</span>}</TableCell>
                          <TableCell>{row.course}</TableCell>
                          <TableCell>{row.year}</TableCell>
                          <TableCell>
                            {row.status === "valid" && (
                              <span className="flex items-center gap-1 text-success">
                                <CheckCircle className="w-4 h-4" /> Valid
                              </span>
                            )}
                            {row.status === "error" && (
                              <span className="flex items-center gap-1 text-destructive">
                                <XCircle className="w-4 h-4" /> Error
                              </span>
                            )}
                            {row.status === "duplicate" && (
                              <span className="flex items-center gap-1 text-warning">
                                <AlertTriangle className="w-4 h-4" /> Duplicate
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" onClick={handleReset}>
                    Cancel
                  </Button>
                  <Button onClick={handleConfirmUpload}>Confirm & Upload Valid Records</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Upload History & Template */}
        <div className="space-y-6">
          {/* Download Template */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Template</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Download our template to ensure your data is formatted correctly.
              </p>
              <Button variant="outline" className="w-full bg-transparent" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </CardContent>
          </Card>

          {/* Upload History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upload History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {uploadHistory.map((item) => (
                <div key={item.id} className="p-3 rounded-lg bg-muted/50 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground truncate max-w-[150px]">{item.filename}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className="text-success">{item.success} success</span>
                    <span className="text-destructive">{item.failed} failed</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
