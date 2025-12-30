"use client"

import { create } from "zustand"
import { getSchoolsApi, School } from "@/services/school.service"

interface SchoolStore {
  schools: School[]
  loading: boolean
  fetchSchools: (SchoolName: string) => Promise<void>
}

export const useSchoolStore = create<SchoolStore>((set) => ({
  schools: [],
  loading: false,

  fetchSchools: async (SchoolName: string) => {
    try {
      set({ loading: true })

      const schools = await getSchoolsApi(SchoolName)

      set({ schools })
    } catch (error) {
      console.error("fetchSchools error:", error)
      set({ schools: [] })
    } finally {
      set({ loading: false })
    }
  },
}))
