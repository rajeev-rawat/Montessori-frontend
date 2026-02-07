"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Student } from "@/services/student.service"
import SchoolSelect from "@/components/dropdown/dropdown"
import { useStudentStore } from "@/store/student.store"
import { useRouter } from "next/navigation"

interface StudentFormProps {
    initialData?: Student | null
    title: string
    onSubmit?: (data: FormData) => Promise<void>
    mode?: "view" | "edit" | "create"
}

const defaultStudent: Student = {
    IDNo: "",
    AdmissionNo: "",
    NameOfThePupil: "",
    StudentAadhaarNo: "",
    PENNo: "",
    AAPARID: "",
    FatherName: "",
    FatherAadhaarNo: "",
    FatherMobileNumber: "",
    ParentOccupation: "",
    MotherName: "",
    MotherAadharNo: "",
    MotherMobileNo: "",
    MotherBankAccountNo: "",
    MailID: "",
    ResidenceAddress: "",
    BankIFSCCode: "",
    PreviousSchoolClass: "",
    ClassAdmitted: "",
    ClassLeaving: "",
    TCNumber: "",
    LeavingTCNo: "",
    TCTakenDate: "",
    DateOfAdmission: "",
    DateOfBirth: "",
    DateOfLeaving: "",
    Nationality: "Indian",
    Religion: "",
    Caste: "",
    SubCaste: "",
    MotherTongue: "",
    PhotoOfStudent: "",
    EntryDate: "",
    SchoolName: "",
    AcademicYear: "",
}

export default function StudentForm({
    initialData,
    title,
    onSubmit,
    mode = "create",
}: StudentFormProps) {
    const [formData, setFormData] = useState<Student>(defaultStudent)
    const { school: selectedSchool, setSchool } = useStudentStore()
    const router = useRouter()

    const isViewMode = mode === "view"

    // ✅ FIX: ONLY view mode is read-only
    const readOnly = isViewMode

    useEffect(() => {
        if (initialData) {
            setFormData({ ...defaultStudent, ...initialData })
            if (initialData.SchoolName) setSchool(initialData.SchoolName)
        }
    }, [initialData, setSchool])

    const handleChange = (key: keyof Student, value: any) => {
        if (isViewMode) return
        setFormData((prev) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!onSubmit || isViewMode) return

        const payload = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "PhotoOfStudent") {
                if (value instanceof File) payload.append(key, value)
            } else {
                payload.append(key, String(value ?? ""))
            }
        })

        if (selectedSchool) payload.append("SchoolName", selectedSchool)
        await onSubmit(payload)
    }

    const renderValue = (value: any) => (
        <div className="min-h-[40px] px-3 py-2 rounded-md border bg-muted/40 text-sm">
            {value || "-"}
        </div>
    )

    const renderField = (key: string, value: any) => (
        <div className="space-y-1">
            <Label className="text-sm font-medium">
                {key.replace(/([A-Z])/g, " $1")}
            </Label>

            {/* PROFILE PHOTO */}
            {key === "PhotoOfStudent" ? (
                <div className="space-y-2">
                    {value ? (
                        <img
                            src={
                                value instanceof File
                                    ? URL.createObjectURL(value)
                                    : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${value}`
                            }
                            alt="Student"
                            className="w-32 h-32 rounded-lg object-cover border"
                        />
                    ) : (
                        <div className="text-sm text-muted-foreground">
                            No photo available
                        </div>
                    )}

                    {/* ✅ Upload allowed in EDIT + CREATE */}
                    {!isViewMode && (
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                handleChange(
                                    key as keyof Student,
                                    e.target.files?.[0]
                                )
                            }
                        />
                    )}
                </div>
            ) : readOnly ? (
                renderValue(value)
            ) : (
                <Input
                    value={value || ""}
                    onChange={(e) =>
                        handleChange(key as keyof Student, e.target.value)
                    }
                />
            )}
        </div>
    )

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-semibold">{title}</h1>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Back
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* STUDENT DETAILS */}
                <section className="bg-white rounded-xl border shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-6 border-b pb-2">
                        Student Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                            <Label className="text-sm font-medium">School</Label>
                            {readOnly ? (
                                renderValue(selectedSchool)
                            ) : (
                                <SchoolSelect value={selectedSchool} onChange={setSchool} />
                            )}
                        </div>

                        {Object.entries(formData).map(([key, value]) => {
                            if (
                                key === "id" ||
                                key === "EntryDate" ||
                                key === "SchoolName" ||
                                key.startsWith("Father") ||
                                key.startsWith("Mother")
                            )
                                return null

                            return <div key={key}>{renderField(key, value)}</div>
                        })}
                    </div>
                </section>

                {/* FATHER DETAILS */}
                <section className="bg-white rounded-xl border shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-6 border-b pb-2">
                        Father Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            "FatherName",
                            "FatherAadhaarNo",
                            "FatherMobileNumber",
                            "ParentOccupation",
                        ].map((key) => (
                            <div key={key}>
                                {renderField(key, (formData as any)[key])}
                            </div>
                        ))}
                    </div>
                </section>

                {/* MOTHER DETAILS */}
                <section className="bg-white rounded-xl border shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-6 border-b pb-2">
                        Mother Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            "MotherName",
                            "MotherAadharNo",
                            "MotherMobileNo",
                            "MotherBankAccountNo",
                        ].map((key) => (
                            <div key={key}>
                                {renderField(key, (formData as any)[key])}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ACTION */}
                {!isViewMode && (
                    <div className="flex justify-end pt-4 gap-5">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            Back
                        </Button>
                        <Button type="submit" className="px-8">
                            {title}
                        </Button>
                    </div>
                )}
            </form>
        </div>
    )
}
