"use client"

import { create } from "zustand"
import {
  bulkUploadApi,
  BulkUploadApiResponse,
  BulkUploadReportRow,
} from "@/services/bulk-upload.service"

interface BulkUploadState {
  loading: boolean
  response: BulkUploadApiResponse | null
  report: BulkUploadReportRow[]
  upload: (file: File, schoolSchoolName: string, selectedYear: string) => Promise<void>
  reset: () => void
}

export const useBulkUploadStore = create<BulkUploadState>((set) => ({
  loading: false,
  response: null,
  report: [],

  upload: async (file, schoolSchoolName, selectedYear) => {
    const token = localStorage.getItem("auth_token")
    if (!token) throw new Error("Unauthorized")
    if (!schoolSchoolName) throw new Error("School not selected")

    set({ loading: true })

    try {
      const res = await bulkUploadApi(file, token, schoolSchoolName, selectedYear)

      set({
        loading: false,
        response: res,
        report: res.report,
      })
    } catch (err: any) {
      set({ loading: false })
      throw err
    }
  },

  reset: () => {
    set({ response: null, report: [] })
  },
}))
