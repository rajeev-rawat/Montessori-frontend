"use client"

import { create } from "zustand"
import {
  Student,
  getStudentsApi,
  addStudentApi,
  updateStudentApi,
  deleteStudentApi,
  deleteDuplicateApi,
  bulkDeleteStudentsApi,
} from "@/services/student.service"
import { toast } from "@/hooks/use-toast"

interface StudentStore {
  students: Student[]
  loading: boolean

  page: number
  limit: number
  total: number

  search: string
  school: string
  year: string
  board: string

  viewModalOpen: boolean
  editModalOpen: boolean
  addModalOpen: boolean

  selectedStudent: Student | null

  // fetchStudents: () => Promise<void>
  fetchStudents: (
  customLimit?: number,
  exportMode?: boolean
) => Promise<Student[] | void>

  setPage: (page: number) => void
  setSearch: (search: string) => void
  setSchool: (school: string) => void
  setYear: (year: string) => void
  setBoard: (board: string) => void  

  openViewModal: (s: Student) => void
  openEditModal: (s: Student) => void
  openAddModal: () => void
  closeModals: () => void

  setSelectedStudent: (s: Student | null) => void

  addStudent: (data: FormData) => Promise<void>
  updateStudent: (data: FormData) => Promise<void>
  deleteStudent: (s: Student) => Promise<void>
  bulkDeleteStudents: (
  admissionNos: string[],
  schoolNames: string[],
  boards: string[]
) => Promise<void>
}

export const useStudentStore = create<StudentStore>((set, get) => ({
  students: [],
  loading: false,

  page: 1,
  limit: 200,
  total: 0,

  search: "",
  school: "",
  year: "",
  board: "", 

  viewModalOpen: false,
  editModalOpen: false,
  addModalOpen: false,

  selectedStudent: null,

  /* ================= FETCH ================= */

  // fetchStudents: async () => {
  //   const token = localStorage.getItem("auth_token")
  //   if (!token) return

  //   set({ loading: true })

  //   try {
  //     const res = await getStudentsApi(get(), token)

  //     set({
  //       students: res.data,
  //       total: res.pagination.total,
  //     })
  //   } catch (e: any) {
  //     toast({
  //       title: "Error",
  //       description: e.message,
  //       variant: "destructive",
  //     })
  //   } finally {
  //     set({ loading: false })
  //   }
  // },

  fetchStudents: async (
  customLimit,
  exportMode = false
) => {
  const token = localStorage.getItem("auth_token")
  if (!token) return

  if (!exportMode) {
    set({ loading: true })
  }

  try {
    const res = await getStudentsApi(
      {
        ...get(),
        page: 1,
        limit: customLimit || get().limit,
      },
      token
    )

    if (exportMode) {
      return res.data
    }

    set({
      students: res.data,
      total: res.pagination.total,
    })
  } catch (e: any) {
    toast({
      title: "Error",
      description: e.message,
      variant: "destructive",
    })
  } finally {
    if (!exportMode) {
      set({ loading: false })
    }
  }
},

  /* ================= FILTERS ================= */

  setPage: (page) => {
    if (page !== get().page) set({ page })
  },

  setSearch: (search) => {
    if (search !== get().search) {
      set({ search, page: 1 })
    }
  },

  setSchool: (school) => {
    if (school !== get().school) {
      set({ school, page: 1 })
    }
  },

  setYear: (year) => {
    if (year !== get().year) {
      set({ year, page: 1 })
    }
  },

  setBoard: (board) => {
    if (board !== get().board) {
      set({ board, page: 1 })
    }
  },

  /* ================= MODALS ================= */

  openViewModal: (s) =>
    set({ viewModalOpen: true, selectedStudent: s }),

  openEditModal: (s) =>
    set({ editModalOpen: true, selectedStudent: s }),

  openAddModal: () =>
    set({ addModalOpen: true, selectedStudent: null }),

  closeModals: () =>
    set({
      viewModalOpen: false,
      editModalOpen: false,
      addModalOpen: false,
    }),

  /* ================= PAGE SAFE ================= */

  setSelectedStudent: (s) => set({ selectedStudent: s }),

  /* ================= CRUD ================= */

  addStudent: async (formData) => {
    const token = localStorage.getItem("auth_token")
    if (!token) return

    await addStudentApi(formData, token)

    toast({
      title: "Student added successfully",
    })

    await get().fetchStudents()
  },

  updateStudent: async (formData) => {
    const token = localStorage.getItem("auth_token")
    if (!token) return

    const selected = get().selectedStudent
    if (!selected) {
      toast({
        title: "Error",
        description: "No student selected for update",
        variant: "destructive",
      })
      return
    }

    await updateStudentApi(formData, token)

    toast({
      title: "Student updated successfully",
    })

    await get().fetchStudents()
    set({ selectedStudent: null })
  },

  deleteStudent: async (student) => {
    const token = localStorage.getItem("auth_token")
    if (!token) return

    if ((student as any).status === "duplicate") {
      await deleteDuplicateApi(student.AdmissionNo, token)
    } else {
      await deleteStudentApi(student.AdmissionNo, token)
    }

    toast({
      title: "Student deleted successfully",
    })

    await get().fetchStudents()
  },

bulkDeleteStudents: async (
  admissionNos,
  schoolNames,
  boards
) => {
  const token = localStorage.getItem("auth_token")
  if (!token) return

  await bulkDeleteStudentsApi(
    admissionNos,
    schoolNames,
    boards,
    token
  )

  toast({
    title: "Students deleted successfully",
  })

  await get().fetchStudents()
},
}))