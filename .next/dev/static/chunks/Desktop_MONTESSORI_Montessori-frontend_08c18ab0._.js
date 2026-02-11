(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/MONTESSORI/Montessori-frontend/services/student.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addStudentApi",
    ()=>addStudentApi,
    "deleteDuplicateApi",
    ()=>deleteDuplicateApi,
    "deleteStudentApi",
    ()=>deleteStudentApi,
    "getStudentsApi",
    ()=>getStudentsApi,
    "updateStudentApi",
    ()=>updateStudentApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use client";
const BASE_URL = ("TURBOPACK compile-time value", "https://warrantyindia.co.in/student/api");
const API_KEY = ("TURBOPACK compile-time value", "asdtfyghjklcghvhbjknlmfxcghbjknlmgcvhbjnkml");
async function getStudentsApi(params, token) {
    const query = new URLSearchParams({
        page: String(params.page || 1),
        limit: String(params.limit || 10),
        search: params.search || "",
        SchoolName: params.school || "",
        AcademicYear: params.year || ""
    });
    const res = await fetch(`${BASE_URL}/student_list?${query}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "X-Api-Key": API_KEY
        }
    });
    const data = await res.json();
    if (!data.status) throw new Error(data.message);
    return data;
}
async function addStudentApi(student, token) {
    const res = await fetch(`${BASE_URL}/student_insert`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "X-Api-Key": API_KEY
        },
        body: student
    });
    const data = await res.json();
    if (!data.status) throw new Error(data.message);
    return data;
}
async function updateStudentApi(student, token) {
    const res = await fetch(`${BASE_URL}/student_update`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "X-Api-Key": API_KEY
        },
        body: student
    });
    const data = await res.json();
    if (!data.status) throw new Error(data.message);
    return data;
}
async function deleteStudentApi(admissionNo, token) {
    const res = await fetch(`${BASE_URL}/delete_student.php`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "X-Api-Key": API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            AdmissionNo: admissionNo,
            confirm: "DELETE"
        })
    });
    const data = await res.json();
    if (!data.status) throw new Error(data.message);
    return data;
}
async function deleteDuplicateApi(admissionNo, token) {
    const res = await fetch(`${BASE_URL}/delete_duplicates_by_admission`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "X-Api-Key": API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            AdmissionNo: admissionNo
        })
    });
    const data = await res.json();
    if (!data.status) throw new Error(data.message);
    return data;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/MONTESSORI/Montessori-frontend/store/student.store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStudentStore",
    ()=>useStudentStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$services$2f$student$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/services/student.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/hooks/use-toast.ts [app-client] (ecmascript)");
"use client";
;
;
;
const useStudentStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        students: [],
        loading: false,
        page: 1,
        limit: 50,
        total: 0,
        search: "",
        school: "",
        year: "",
        viewModalOpen: false,
        editModalOpen: false,
        addModalOpen: false,
        selectedStudent: null,
        fetchStudents: async ()=>{
            const token = localStorage.getItem("auth_token");
            if (!token) return;
            set({
                loading: true
            });
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$services$2f$student$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStudentsApi"])(get(), token);
                set({
                    students: res.data,
                    total: res.pagination.total
                });
            } catch (e) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                    title: "Error",
                    description: e.message,
                    variant: "destructive"
                });
            } finally{
                set({
                    loading: false
                });
            }
        },
        setPage: (page)=>{
            if (page !== get().page) set({
                page
            });
        },
        setSearch: (search)=>{
            if (search !== get().search) {
                set({
                    search,
                    page: 1
                });
            }
        },
        setSchool: (school)=>{
            if (school !== get().school) {
                set({
                    school,
                    page: 1
                });
            }
        },
        setYear: (year)=>{
            if (year !== get().year) {
                set({
                    year,
                    page: 1
                });
            }
        },
        /* ---------------- MODALS ---------------- */ openViewModal: (s)=>set({
                viewModalOpen: true,
                selectedStudent: s
            }),
        openEditModal: (s)=>set({
                editModalOpen: true,
                selectedStudent: s
            }),
        openAddModal: ()=>set({
                addModalOpen: true,
                selectedStudent: null
            }),
        closeModals: ()=>set({
                viewModalOpen: false,
                editModalOpen: false,
                addModalOpen: false
            }),
        /* ---------------- PAGE SAFE ---------------- */ setSelectedStudent: (s)=>set({
                selectedStudent: s
            }),
        /* ---------------- CRUD ---------------- */ addStudent: async (formData)=>{
            const token = localStorage.getItem("auth_token");
            if (!token) return;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$services$2f$student$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addStudentApi"])(formData, token);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                title: "Student added successfully"
            });
            await get().fetchStudents();
        },
        updateStudent: async (formData)=>{
            const token = localStorage.getItem("auth_token");
            if (!token) return;
            const selected = get().selectedStudent;
            if (!selected) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                    title: "Error",
                    description: "No student selected for update",
                    variant: "destructive"
                });
                return;
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$services$2f$student$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateStudentApi"])(formData, token);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                title: "Student updated successfully"
            });
            await get().fetchStudents();
            set({
                selectedStudent: null
            });
        },
        deleteStudent: async (student)=>{
            const token = localStorage.getItem("auth_token");
            if (!token) return;
            if (student.status === "duplicate") {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$services$2f$student$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDuplicateApi"])(student.AdmissionNo, token);
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$services$2f$student$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteStudentApi"])(student.AdmissionNo, token);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                title: "Student deleted successfully"
            });
            get().fetchStudents();
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/MONTESSORI/Montessori-frontend/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/MONTESSORI/Montessori-frontend/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/MONTESSORI/Montessori-frontend/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Label;
;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudentForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/components/ui/label.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function StudentForm({ mode, title, defaultData }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const isView = mode === "view";
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: defaultData?.name || "",
        admissionNo: defaultData?.admissionNo || "",
        aadhar: defaultData?.aadhar || "",
        classAdmitted: defaultData?.classAdmitted || "",
        photo: defaultData?.photo || "",
        photoFile: null
    });
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (isView) return;
        const payload = new FormData();
        payload.append("name", form.name);
        payload.append("admissionNo", form.admissionNo);
        payload.append("aadhar", form.aadhar);
        payload.append("classAdmitted", form.classAdmitted);
        if (form.photoFile) {
            payload.append("photo", form.photoFile);
        }
        console.log("SUBMIT DATA", payload);
    // 🔥 call your API here
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        variant: "outline",
                        onClick: ()=>router.back(),
                        children: "Back"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border bg-white p-6 space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold",
                        children: "Student Details"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: form.photo || "/avatar.png",
                                alt: "Profile",
                                className: "h-24 w-24 rounded-lg border object-cover"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            !isView && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                type: "file",
                                accept: "image/*",
                                onChange: (e)=>setForm({
                                        ...form,
                                        photoFile: e.target.files?.[0] || null
                                    })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        children: "Name Of The Pupil"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    isView ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-sm",
                                        children: form.name || "-"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        value: form.name,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                name: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                        lineNumber: 103,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        children: "Admission No"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, this),
                                    isView ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-sm",
                                        children: form.admissionNo || "-"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        value: form.admissionNo,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                admissionNo: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        children: "Student Aadhaar No"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, this),
                                    isView ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-sm",
                                        children: form.aadhar || "-"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        value: form.aadhar,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                aadhar: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        children: "Class Admitted"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                        lineNumber: 146,
                                        columnNumber: 13
                                    }, this),
                                    isView ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-sm",
                                        children: form.classAdmitted || "-"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                        lineNumber: 148,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        value: form.classAdmitted,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                classAdmitted: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                        lineNumber: 152,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    !isView && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end gap-4 pt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "submit",
                            className: "px-8",
                            children: mode === "edit" ? "Update Student" : "Add Student"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                            lineNumber: 168,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(StudentForm, "l//2HOWbbBWrcKHsh7KaDFcDDuE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = StudentForm;
var _c;
__turbopack_context__.k.register(_c, "StudentForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/MONTESSORI/Montessori-frontend/services/auth.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loginApi",
    ()=>loginApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const BASE_URL = ("TURBOPACK compile-time value", "https://warrantyindia.co.in/student/api");
const API_KEY = ("TURBOPACK compile-time value", "asdtfyghjklcghvhbjknlmfxcghbjknlmgcvhbjnkml");
async function loginApi(payload) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": API_KEY
        },
        body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!data.status) {
        throw new Error(data.message || "Login failed");
    }
    return data;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/MONTESSORI/Montessori-frontend/store/auth.store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/services/auth.service.ts [app-client] (ecmascript)");
"use client";
;
;
;
// ✅ Custom storage implementing StateStorage
const localStoragePersist = {
    getItem: (name)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const item = localStorage.getItem(name);
        if (!item) return null;
        try {
            return JSON.parse(item);
        } catch  {
            return null;
        }
    },
    setItem: (name, value)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        localStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        localStorage.removeItem(name);
    }
};
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        user: null,
        token: null,
        loading: false,
        login: async (payload)=>{
            try {
                set({
                    loading: true
                });
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginApi"])(payload);
                set({
                    user: res.user,
                    token: res.token,
                    loading: false
                });
                return res;
            } catch (err) {
                set({
                    loading: false
                });
                throw err;
            }
        },
        logout: ()=>set({
                user: null,
                token: null
            })
    }), {
    name: "auth-store",
    storage: localStoragePersist,
    partialize: (state)=>({
            user: state.user,
            token: state.token
        })
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminSidebar",
    ()=>AdminSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar1$3e$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/lucide-react/dist/esm/icons/calendar-1.js [app-client] (ecmascript) <export default as Calendar1>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPen$3e$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/lucide-react/dist/esm/icons/user-pen.js [app-client] (ecmascript) <export default as UserPen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileClock$3e$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/lucide-react/dist/esm/icons/file-clock.js [app-client] (ecmascript) <export default as FileClock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UsersRound$3e$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/lucide-react/dist/esm/icons/users-round.js [app-client] (ecmascript) <export default as UsersRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRoundCheck$3e$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/lucide-react/dist/esm/icons/user-round-check.js [app-client] (ecmascript) <export default as UserRoundCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/lucide-react/dist/esm/icons/printer.js [app-client] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/store/auth.store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const menuItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"],
        route: "/dashboard"
    },
    {
        id: "bulk-upload",
        label: "Bulk Upload",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"],
        route: "/bulkUpload"
    },
    {
        id: "students",
        label: "All Students",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        route: "/students"
    },
    {
        id: "events",
        label: "Events",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar1$3e$__["Calendar1"],
        route: "/events"
    },
    {
        id: "account",
        label: "Account",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPen$3e$__["UserPen"],
        route: "/account"
    },
    {
        id: "attendance",
        label: "Attendance",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileClock$3e$__["FileClock"],
        route: "/attendance"
    },
    {
        id: "staff",
        label: "Staff",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UsersRound$3e$__["UsersRound"],
        route: "/staff"
    },
    {
        id: "staff-attendance",
        label: "Staff Attendance",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRoundCheck$3e$__["UserRoundCheck"],
        route: "/staff-attendance"
    },
    {
        id: "tc-print",
        label: "TC Print",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"],
        route: "/tc-print"
    },
    {
        id: "student-certificates",
        label: "Student Certificates",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"],
        route: "/student-certificates"
    }
];
function AdminSidebar() {
    _s();
    const [collapsed, setCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "AdminSidebar.useAuthStore[user]": (state)=>state.user
    }["AdminSidebar.useAuthStore[user]"]);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "AdminSidebar.useAuthStore[logout]": (state)=>state.logout
    }["AdminSidebar.useAuthStore[logout]"]);
    const STUDENT_MENU_INDEX = menuItems.findIndex((item)=>item.id === "students");
    const handleLogout = ()=>{
        logout();
        document.cookie = "auth_token=; path=/; max-age=0";
        router.replace("/login");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-all duration-300", collapsed ? "w-16" : "w-64"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-sidebar-border flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3", collapsed && "justify-center"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/logo.png",
                                    alt: "Montessori Golden Jubilee Logo",
                                    width: 80,
                                    height: 80,
                                    className: "object-contain",
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                                    lineNumber: 65,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this),
                            !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-sm",
                                children: "Montessori"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                                lineNumber: 77,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        className: "text-sidebar-foreground hover:bg-sidebar-accent h-8 w-8",
                        onClick: ()=>setCollapsed(!collapsed),
                        children: collapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                            lineNumber: 85,
                            columnNumber: 24
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                            lineNumber: 85,
                            columnNumber: 55
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex-1 p-3 space-y-1",
                children: menuItems.map((item, index)=>{
                    const isDisabled = index > STUDENT_MENU_INDEX;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        disabled: isDisabled,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full justify-start gap-3", collapsed && "justify-center px-2", isDisabled ? "opacity-40 cursor-not-allowed hover:bg-transparent" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"),
                        onClick: ()=>{
                            if (!isDisabled) router.push(item.route);
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                className: "w-5 h-5 shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                                lineNumber: 110,
                                columnNumber: 15
                            }, this),
                            !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                                lineNumber: 111,
                                columnNumber: 30
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                        lineNumber: 95,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 border-t border-sidebar-border mt-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 mb-3 px-3", collapsed && "justify-center"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-medium",
                                    children: user?.name?.split(" ").map((n)=>n[0]).join("") || "AD"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            !collapsed && user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium truncate",
                                        children: user.name
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                                        lineNumber: 127,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-sidebar-foreground/60 truncate",
                                        children: user.user_type
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                                        lineNumber: 128,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-sidebar-foreground/60 truncate",
                                        children: user.SchoolName
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-sidebar-foreground/60 truncate",
                                        children: user.username
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent", collapsed && "justify-center px-2"),
                        onClick: handleLogout,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                className: "w-5 h-5 shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Logout"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                                lineNumber: 144,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(AdminSidebar, "BmXsBN49A7TqNa1DKZmj4PNkrHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = AdminSidebar;
var _c;
__turbopack_context__.k.register(_c, "AdminSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/MONTESSORI/Montessori-frontend/app/students/edit-student/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditStudentPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$store$2f$student$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/store/student.store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$admin$2f$StudentForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/StudentForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$admin$2f$admin$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/MONTESSORI/Montessori-frontend/components/admin/admin-sidebar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function EditStudentPage() {
    _s();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { students, selectedStudent, fetchStudents, setSelectedStudent, updateStudent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$store$2f$student$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudentStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditStudentPage.useEffect": ()=>{
            if (!students.length) {
                fetchStudents();
            }
        }
    }["EditStudentPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditStudentPage.useEffect": ()=>{
            if (students.length && id) {
                const found = students.find({
                    "EditStudentPage.useEffect.found": (s)=>String(s.id) === String(id)
                }["EditStudentPage.useEffect.found"]);
                if (found) setSelectedStudent(found);
            }
        }
    }["EditStudentPage.useEffect"], [
        students,
        id
    ]);
    if (!selectedStudent) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$admin$2f$admin$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminSidebar"], {}, void 0, false, {
                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/app/students/edit-student/[id]/page.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 overflow-auto bg-background",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$components$2f$admin$2f$StudentForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Edit Student",
                    initialData: selectedStudent,
                    mode: "edit",
                    onSubmit: async (data)=>{
                        await updateStudent(data);
                        router.push("/students");
                    }
                }, void 0, false, {
                    fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/app/students/edit-student/[id]/page.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/app/students/edit-student/[id]/page.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/MONTESSORI/Montessori-frontend/app/students/edit-student/[id]/page.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(EditStudentPage, "/VbcOuWqUoMZs/lEfpSMC2auYts=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$MONTESSORI$2f$Montessori$2d$frontend$2f$store$2f$student$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudentStore"]
    ];
});
_c = EditStudentPage;
var _c;
__turbopack_context__.k.register(_c, "EditStudentPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_MONTESSORI_Montessori-frontend_08c18ab0._.js.map