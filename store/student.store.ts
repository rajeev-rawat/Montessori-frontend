"use client"

import { create } from "zustand"
import { getStudentsApi, addStudentApi, updateStudentApi, deleteStudentApi, deleteDuplicateApi, Student } from "@/services/student.service"
import { toast } from "@/hooks/use-toast"

interface StudentStore {
  students: Student[]
  loading: boolean
  page: number
  limit: number
  total: number
  search: string
  status: string
  viewModalOpen: boolean
  editModalOpen: boolean
  addModalOpen: boolean
  selectedStudent: Student | null
  fetchStudents: () => Promise<void>
  setPage: (page: number) => void
  setSearch: (search: string) => void
  setStatus: (status: string) => void
  openViewModal: (student: Student) => void
  openEditModal: (student: Student) => void
  openAddModal: () => void
  closeModals: () => void
  addStudent: (student: Student) => Promise<void>
  updateStudent: (student: Student) => Promise<void>
  deleteStudent: (student: Student) => Promise<void>
}

export const useStudentStore = create<StudentStore>((set, get) => ({
  students: [],
  loading: false,
  page: 1,
  limit: 10,
  total: 0,
  search: "",
  status: "",
  viewModalOpen: false,
  editModalOpen: false,
  addModalOpen: false,
  selectedStudent: null,

  fetchStudents: async () => {
    const token = localStorage.getItem("auth_token")
    if (!token) return
    try {
      set({ loading: true })
      const res = await getStudentsApi({ page: get().page, limit: get().limit, search: get().search, status: get().status }, token)
      set({ students: res.data, total: res.pagination.total, loading: false })
    } catch (error: any) {
      set({ loading: false })
      toast({ title: "Error", description: error.message, variant: "destructive" })
    }
  },

  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),

  openViewModal: (student) => set({ viewModalOpen: true, selectedStudent: student }),
  openEditModal: (student) => set({ editModalOpen: true, selectedStudent: student }),
  openAddModal: () => set({ addModalOpen: true, selectedStudent: null }),
  closeModals: () => set({ viewModalOpen: false, editModalOpen: false, addModalOpen: false, selectedStudent: null }),

  addStudent: async (student) => {
    const token = localStorage.getItem("auth_token")
    if (!token) return
    try {
      await addStudentApi(student, token)
      toast({ title: "Success", description: "Student added successfully" })
      get().fetchStudents()
      get().closeModals()
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    }
  },

  updateStudent: async (student) => {
    const token = localStorage.getItem("auth_token")
    if (!token) return
    try {
      await updateStudentApi(student, token)
      toast({ title: "Success", description: "Student updated successfully" })
      get().fetchStudents()
      get().closeModals()
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    }
  },

  deleteStudent: async (student) => {
    const token = localStorage.getItem("auth_token")
    if (!token) return
    try {
      if (student.status === "duplicate") {
        await deleteDuplicateApi(student.AdmissionNo, token)
        toast({ title: "Success", description: "Duplicate student deleted" })
      } else {
        await deleteStudentApi(student.AdmissionNo, token)
        toast({ title: "Success", description: "Student deleted successfully" })
      }
      get().fetchStudents()
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    }
  },
}))
