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
  upload: (file: File) => Promise<void>
  reset: () => void
}

export const useBulkUploadStore = create<BulkUploadState>((set) => ({
  loading: false,
  response: null,
  report: [],

  upload: async (file) => {
    const token = localStorage.getItem("auth_token")
    if (!token) throw new Error("Unauthorized")

    set({ loading: true })

    const res = await bulkUploadApi(file, token)

    set({
      loading: false,
      response: res,
      report: res.report,
    })
  },

  reset: () => {
    set({ response: null, report: [] })
  },
}))
