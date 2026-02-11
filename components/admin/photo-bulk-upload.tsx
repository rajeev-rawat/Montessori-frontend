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

type UploadStatus = "idle" | "uploading" | "complete" | "error"

export default function PhotoBulkUploadPage() {
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
    const [progress, setProgress] = useState(0)
    const [dragActive, setDragActive] = useState(false)
    const [file, setFile] = useState<File | null>(null)

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

        setUploadStatus("uploading")
        setProgress(40)

        try {
            await upload(file)
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
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]">
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
                    <Button onClick={() => router.back()}>
                        Back
                    </Button>
                </div>
            </div>


            <div className="grid gap-6 lg:grid-cols-3">
                {/* LEFT SIDE */}
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
                                    className={`border-2 border-dashed rounded-lg p-8 text-center transition ${dragActive ? "border-primary bg-primary/5" : ""
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

                                    <Button onClick={() => fileInputRef.current?.click()}>
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
