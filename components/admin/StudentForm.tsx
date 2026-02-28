"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Student } from "@/services/student.service"
import SchoolSelect from "@/components/dropdown/dropdown"
import { YearDropdownWithoutAll } from "@/components/dropdown/year-dropdown"
import { useStudentStore } from "@/store/student.store"
import { useRouter } from "next/navigation"
import BoardSelect from "../dropdown/bordDropdown"
import { formatDate } from "@/lib/utils"
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
    FatherQualification: "",
    FatherOccupation: "",
    MotherName: "",
    MotherAadharNo: "",
    MotherMobileNo: "",
    MotherBankAccountNo: "",
    BankIFSCCode: "",
    MotherQualification: "",
    MotherOccupation: "",
    MotherTongue: "",
    MotherMailID: "",
    FatherMailID: "",
    MailID: "",
    ResidenceAddress: "",
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
    PhotoOfStudent: "",
    EntryDate: "",
    SchoolName: "",
    AcademicYear: "",
    Board: ""
}

export default function StudentForm({
    initialData,
    title,
    onSubmit,
    mode = "create",
}: StudentFormProps) {
    // const [formData, setFormData] = useState<Student>(defaultStudent)
    const [formData, setFormData] = useState<Student>(() =>
  initialData ? { ...defaultStudent, ...initialData } : defaultStudent
)
    // const { school: selectedSchool, setSchool } = useStudentStore()
    const {
  school: selectedSchool,
  setSchool,
} = useStudentStore()
    const router = useRouter()
const [errors, setErrors] = useState<Record<string, string>>({})

    const isViewMode = mode === "view"
    const readOnly = isViewMode

    const dateFields = [
        "TCTakenDate",
        "DateOfAdmission",
        "DateOfBirth",
        "DateOfLeaving",
    ]

useEffect(() => {
  if (initialData) {
    setFormData(prev => ({
      ...prev,
      ...initialData,
      AcademicYear: initialData.AcademicYear || "",
      Board: initialData.Board || "",
    }))

    if (initialData.SchoolName) {
      setSchool(initialData.SchoolName)
    }
  }
}, [initialData, setSchool])

    console.log(formData, 'formData----')
console.log(initialData, 'initialData')

 const handleChange = (key: keyof Student, value: any) => {
    if (isViewMode) return
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (typeof value === "string") {
        validateField(key, value)
    }
}

const validateField = (key: keyof Student, value: string) => {
    let error = ""

    const isNumeric = (val: string) => /^\d+$/.test(val)
    const isIFSC = (val: string) => /^[A-Za-z0-9]{11}$/.test(val)

    if (key === "AAPARID") {
        if (!/^\d{12}$/.test(value)) {
            error = "AAPAR ID must be 12 digits"
        }
    }

    if (key === "PENNo") {
        if (!/^\d{11}$/.test(value)) {
            error = "PEN No must be 11 digits"
        }
    }

    if (
        key === "StudentAadhaarNo" ||
        key === "FatherAadhaarNo" ||
        key === "MotherAadharNo"
    ) {
        if (!/^\d{12}$/.test(value)) {
            error = "Aadhaar must be 12 digits"
        }
    }

    if (key === "BankIFSCCode") {
        if (!isIFSC(value)) {
            error = "IFSC must be 11 alphanumeric characters"
        }
    }

    if (key === "MotherBankAccountNo") {
        if (!isNumeric(value) || value.length < 9 || value.length > 18) {
            error = "Account No must be 9–18 digits"
        }
    }
    if (
    key === "MailID" ||
    key === "FatherMailID" ||
    key === "MotherMailID"
) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (value && !emailRegex.test(value)) {
        error = "Invalid email format"
    }
}

    setErrors((prev) => ({
        ...prev,
        [key]: error,
    }))
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
        <div className="min-h-[40px] px-3 py-2 rounded-md border border-[#fcce00] bg-muted/40 text-sm">
            {value || "-"}
        </div>
    )

    const renderField = (key: string, value: any) => (
        <div className="space-y-1">
            <Label className="text-sm font-medium">
               {key 
               .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")}
            </Label>

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
                    {errors[key] && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors[key]}
                        </p>
                    )}
                </div>
            ) : readOnly ? (
                renderValue(
                     dateFields.includes(key) ? formatDate(value) : value
                )
            ) : (
                <Input
                    className="bg-white border border-[#fcce00] placeholder:text-[#000000] focus:ring-[#0cc0df] focus:border-[#0cc0df]"
                    type={dateFields.includes(key) ? "date" : "text"}
                    value={value || ""}
                    onChange={(e) =>
                        handleChange(key as keyof Student, e.target.value)
                    }
                />
            )}
             {errors[key] && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors[key]}
                        </p>
                    )}
        </div>
    )

    const handlePrint = () => {
    if (!isViewMode) return

    const printContents = document.getElementById("print-section")?.innerHTML
    const originalContents = document.body.innerHTML

    if (printContents) {
        document.body.innerHTML = printContents
        window.print()
        document.body.innerHTML = originalContents
       router.back()
    }
}

const handleExportCSV = () => {
    if (!isViewMode) return

    const studentData = {
        ...formData,
        SchoolName: selectedSchool || "",
        AcademicYear: formData.AcademicYear
            ? `${Number(formData.AcademicYear) - 1}-${formData.AcademicYear}`
            : "",
    }

    const headers = Object.keys(studentData)
    const values = Object.values(studentData)

    const csvContent =
        headers.join(",") +
        "\n" +
        values.map((val) => `"${val ?? ""}"`).join(",")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `${formData.NameOfThePupil || "student"}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-semibold">{title}</h1>
                <div className="flex gap-3">
      {isViewMode && (
    <>
        {/* <Button
            className="cursor-pointer"
            type="button"
            variant="outline"
            onClick={handleExportCSV}
        >
            Export CSV
        </Button> */}

        <Button
            className="cursor-pointer bg-[#fcce00] text-black hover:bg-[#fcce00]/90 hover:text-[#000000] cursor-pointer"
            type="button"
            variant="outline"
            onClick={handlePrint}
        >
            Print
        </Button>
    </>
)}

        <Button type="button" className="cursor-pointer bg-[#000000] text-white hover:bg-[#000000]/90 hover:text-[#ffffff]/90 cursor-pointer" onClick={() => router.back()}>
            Back
        </Button>
    </div>
               
            </div>
            <div id="print-section">
            <form onSubmit={handleSubmit} className="space-y-8">

                {/* STUDENT DETAILS */}
                <section className="bg-white rounded-xl border shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-6 border-b pb-2">
                        Student Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* School */}
                        <div className="space-y-1">
                            <Label className="text-sm font-medium">School</Label>
                            {readOnly ? (
                                renderValue(selectedSchool)
                            ) : (
                                <SchoolSelect
                                    value={selectedSchool}
                                    onChange={setSchool}
                                />
                            )}
                        </div>

                        {/* Academic Year */}
                        <div className="space-y-1">
                            <Label className="text-sm font-medium">
                                Academic Year
                            </Label>

                            {readOnly ? (
                                renderValue(
                                    formData.AcademicYear
                                        ? `${Number(formData.AcademicYear) - 1}-${formData.AcademicYear}`
                                        : ""
                                )
                            ) : (
                                <YearDropdownWithoutAll
                                    value={formData.AcademicYear}
                                    onChange={(val) =>
                                        handleChange("AcademicYear", val)
                                    }
                                />
                            )}
                            
                        </div>

                        {/* Board */}
                            <div className="space-y-1">
                            <Label className="text-sm font-medium">Board</Label>

                            {readOnly ? (
                                renderValue(formData.Board || "")
                            ) : (
                               <BoardSelect
                                defaultValue="Please Eelect"
                                value={formData.Board || ""}
                                onChange={(val) => handleChange("Board", val)}
                                />
                            )}
                            </div>

                        {/* Other Student Fields */}
                        {Object.entries(formData).map(([key, value]) => {
                            if (
                                key === "id" ||
                                key === "EntryDate" ||
                                key === "SchoolName" ||
                                key === "AcademicYear" ||
                                key === "BankIFSCCode" ||
                                 key === "Board" ||
                                key.startsWith("Father") ||
                                key.startsWith("Mother") && key !== "MotherTongue"
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
                            "FatherQualification",
                            "FatherOccupation",
                            "FatherMailID"
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
                            "BankIFSCCode",
                            "MotherQualification",
                            "MotherOccupation",
                            "MotherMailID",
                        ].map((key) => (
                            <div key={key}>
                                {renderField(key, (formData as any)[key])}
                            </div>
                        ))}
                    </div>
                </section>

                {!isViewMode && (
                    <div className="flex justify-end pt-4 gap-5">
                        <Button
                            
                            type="button"
                            variant="outline"
                            className="cursor-pointer bg-[#000000] text-white hover:bg-[#000000]/90 hover:text-[#ffffff]/90"
                            onClick={() => router.back()}
                        >
                            Back
                        </Button>
                        <Button  type="submit" className="px-8 cursor-pointer bg-[#fcce00] text-black hover:bg-[#fcce00]/90 hover:text-[#000000]">
                            {title}
                        </Button>
                    </div>
                )}
            </form>
            </div>
        </div>
    )
}
