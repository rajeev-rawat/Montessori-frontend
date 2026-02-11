"use client"

import { create } from "zustand"
import {
  Student,
  getStudentsApi,
  addStudentApi,
  updateStudentApi,
  deleteStudentApi,
  deleteDuplicateApi,
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

  viewModalOpen: boolean
  editModalOpen: boolean
  addModalOpen: boolean
  selectedStudent: Student | null

  fetchStudents: () => Promise<void>

  setPage: (page: number) => void
  setSearch: (search: string) => void
  setSchool: (school: string) => void
  setYear: (year: string) => void

  openViewModal: (s: Student) => void
  openEditModal: (s: Student) => void
  openAddModal: () => void
  closeModals: () => void

  addStudent: (data: FormData) => Promise<void>
  updateStudent: (data: FormData) => Promise<void>
  deleteStudent: (s: Student) => Promise<void>
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

  viewModalOpen: false,
  editModalOpen: false,
  addModalOpen: false,
  selectedStudent: null,

  fetchStudents: async () => {
    const token = localStorage.getItem("auth_token")
    if (!token) return

    set({ loading: true })
    try {
      const res = await getStudentsApi(get(), token)
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
      set({ loading: false })
    }
  },

  setPage: (page) => {
    if (page !== get().page) set({ page })
  },

  // ✅ reset page ONLY if value actually changed
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
      selectedStudent: null,
    }),

  addStudent: async (formData) => {
    const token = localStorage.getItem("auth_token")
    if (!token) return

    await addStudentApi(formData, token)
    toast({ title: "Student added successfully" })
    get().fetchStudents()
    get().closeModals()
  },

  updateStudent: async (formData) => {
    const token = localStorage.getItem("auth_token")
    if (!token) return

    await updateStudentApi(formData, token)
    toast({ title: "Student updated successfully" })
    get().fetchStudents()
    get().closeModals()
  },

  deleteStudent: async (student) => {
    const token = localStorage.getItem("auth_token")
    if (!token) return

    if (student.status === "duplicate") {
      await deleteDuplicateApi(student.AdmissionNo, token)
    } else {
      await deleteStudentApi(student.AdmissionNo, token)
    }

    toast({ title: "Student deleted successfully" })
    get().fetchStudents()
  },
}))
