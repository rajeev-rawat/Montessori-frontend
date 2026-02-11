"use client"

import { create } from "zustand"
import {
  photoBulkUploadApi,
  PhotoBulkUploadResponse,
} from "@/services/photo-bulk-upload.service"

interface PhotoBulkUploadState {
  loading: boolean
  response: PhotoBulkUploadResponse | null
  upload: (file: File) => Promise<void>
  reset: () => void
}

export const usePhotoBulkUploadStore = create<PhotoBulkUploadState>((set) => ({
  loading: false,
  response: null,

  upload: async (file) => {
    const token = localStorage.getItem("auth_token")
    if (!token) throw new Error("Unauthorized")

    set({ loading: true })

    try {
      const res = await photoBulkUploadApi(file, token)

      set({
        loading: false,
        response: res,
      })
    } catch (err: any) {
      set({ loading: false })
      throw err
    }
  },

  reset: () => {
    set({ response: null })
  },
}))
