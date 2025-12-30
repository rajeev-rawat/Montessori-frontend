"use client"

import { create } from "zustand"
import { getTotalCountsApi, TotalCounts } from "@/services/dashboard.service"

interface DashboardStore {
  counts: TotalCounts | null
  loading: boolean
  fetchCounts: (schoolShortName: string) => Promise<void>
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  counts: null,
  loading: false,

  fetchCounts: async (schoolShortName: string) => {
    try {
      set({ loading: true })
      const counts = await getTotalCountsApi(schoolShortName)
      set({ counts })
    } catch (error) {
      console.error("fetchCounts error:", error)
      set({ counts: null })
    } finally {
      set({ loading: false })
    }
  },
}))
