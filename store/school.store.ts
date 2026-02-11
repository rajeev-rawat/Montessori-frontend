"use client"

import { create } from "zustand"
import { getSchoolsApi, School } from "@/services/school.service"

interface SchoolStore {
  schools: School[]
  loading: boolean
  fetchSchools: (schoolName?: string) => Promise<void>
}

export const useSchoolStore = create<SchoolStore>((set) => ({
  schools: [],
  loading: false,

  fetchSchools: async (schoolName) => {
    try {
      set({ loading: true })
      const schools = await getSchoolsApi(schoolName)
      set({ schools })
    } catch (err) {
      console.error(err)
      set({ schools: [] })
    } finally {
      set({ loading: false })
    }
  },
}))
