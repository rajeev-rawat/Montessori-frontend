"use client"

import { useState, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { usePhotoBulkUploadStore } from "@/store/photo-bulk-upload.store"
import Image from "next/image"
import { useRouter } from "next/navigation"

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
    Upload,
    FileSpreadsheet,
    Download,
} from "lucide-react"
import SchoolSelect from "../dropdown/dropdown"
import { YearDropdownWithoutAll } from "../dropdown/year-dropdown"
import BoardSelect from "../dropdown/bordDropdown"

type UploadStatus = "idle" | "uploading" | "complete" | "error"

export default function PhotoBulkUploadPage() {
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
    const [progress, setProgress] = useState(0)
    const [dragActive, setDragActive] = useState(false)
    const [file, setFile] = useState<File | null>(null)

      const [selectedSchool, setSelectedSchool] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedBoard, setSelectedBoard] = useState("")

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { upload, response, loading } = usePhotoBulkUploadStore()
    const { toast } = useToast()
    const router = useRouter()

    const resetUpload = () => {
        setUploadStatus("idle")
        setProgress(0)
        setFile(null)
    }

    const handleFileSelect = (selectedFile?: File) => {
        if (!selectedFile) return
        setFile(selectedFile)
    }

    const handleUpload = async () => {

        
        if (!file) return

    if (!selectedSchool) {
      toast({ variant: "destructive", title: "Select school first" })
      return
    }

    if (!selectedYear) {
      toast({ variant: "destructive", title: "Select academic year" })
      return
    }

    if (!selectedBoard) {
      toast({ variant: "destructive", title: "Select board first" })
      return
    }


        

        setUploadStatus("uploading")
        setProgress(40)

        try {
            await upload(file, selectedSchool, selectedYear, selectedBoard)
            setProgress(100)
            setUploadStatus("complete")

            toast({
                title: "Photo Bulk Upload Successful",
                description: response?.message,
            })
        } catch (err: any) {
            setUploadStatus("error")
            toast({
                variant: "destructive",
                title: "Upload Failed",
                description: err.message || "Something went wrong",
            })
        }
    }

    return (
        <div className="p-6 space-y-6 relative">
            {/* WATERMARK */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07]">
                <Image src="/logo.png" alt="Watermark" width={600} height={600} />
            </div>

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Bulk Upload</h1>
                    <p className="text-muted-foreground">
                        Upload CSV or Excel files to add multiple student photo
                    </p>
                </div>

                <div className="flex justify-start lg:justify-end">
                    <Button
                        className="bg-[#000000] text-white border-[#000000] hover:bg-[#000000]/90 hover:text-[#ffffff]/90 cursor-pointer"
                        onClick={() => router.back()}>
                        Back
                    </Button>
                </div>
            </div>

   <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-[#fcce00] p-4 rounded-lg shadow-sm">

        {/* Left Side - Dropdowns */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <SchoolSelect
            value={selectedSchool}
            onChange={setSelectedSchool}
          />
          <YearDropdownWithoutAll
            value={selectedYear}
            onChange={setSelectedYear}
          />
           <BoardSelect
           defaultValue="Please Select"
            value={selectedBoard}
            onChange={setSelectedBoard}
          />
        </div>

        {/* Right Side - Photo Bulk Upload Button */}
        <div className="flex justify-start lg:justify-end">
          <Button
            onClick={() => router.push("/photo-bulk-upload")}
            className="whitespace-nowrap bg-[#0cc0df] border-[#0cc0df] text-black hover:bg-[#0cc0df]/90 cursor-pointer"
          >
            Student Photo Bulk Upload
          </Button>
        </div>

      </div>
            <div className="grid gap-6 lg:grid-cols-3">
                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-[#fcce00]">
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
                                    className={`border-2 border-dashed border-black rounded-lg p-8 text-center transition ${dragActive ? "border-primary bg-primary/5" : ""
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
                                    <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />

                                    {file ? (
                                        <p className="font-medium mb-4">
                                            Selected: {file.name}
                                        </p>
                                    ) : (
                                        <p className="mb-4 text-muted-foreground">
                                            Drag & drop file here
                                        </p>
                                    )}

                                    <Button className="bg-[#0cc0df] border-[#0cc0df] text-black hover:bg-[#0cc0df]/90" onClick={() => fileInputRef.current?.click()}>
                                        Choose File
                                    </Button>

                                    <input
                                        hidden
                                        ref={fileInputRef}
                                        type="file"
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
                                    <p>Uploading photos...</p>
                                </div>
                            )}

                            {uploadStatus === "error" && (
                                <Button onClick={resetUpload}>Retry</Button>
                            )}

                            <div className="flex justify-end gap-3 mt-5">
                                <Button
                                className="bg-[#0cc0df] text-black border-[#000000] hover:bg-[#fcce00]/90 hover:text-[#000000] cursor-pointer"
                                    onClick={handleUpload}
                                    disabled={!file || loading}
                                >
                                    Upload Now
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* RESPONSE SUMMARY */}
                    {uploadStatus === "complete" && response && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Upload Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <p>Total Rows: {response.total_rows}</p>
                                <p>Updated: {response.updated_total}</p>
                                <p>Errors: {response.errors_count}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* RIGHT SIDE */}
                <div>
                    <Card className="bg-[#fcce00]">
                        <CardHeader>
                            <CardTitle>Template</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full bg-[#0cc0df] text-black border-[#000000] hover:bg-[#0cc0df]/90 hover:text-[#000000] cursor-pointer">
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
