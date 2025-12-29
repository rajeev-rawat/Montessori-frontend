"use client"

import { create } from "zustand"
import { loginApi, LoginPayload, LoginResponse, User } from "@/services/auth.service"

interface AuthState {
  user: User | null
  loading: boolean
  login: (payload: LoginPayload) => Promise<LoginResponse>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  login: async (payload) => {
    try {
      set({ loading: true })
      const res = await loginApi(payload)
      set({ user: res.user, loading: false }) // store only user
      return res // important: return response to component
    } catch (err) {
      set({ loading: false })
      throw err
    }
  },

  logout: () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    localStorage.removeItem("auth_expires_at")
    set({ user: null })
  },
}))
