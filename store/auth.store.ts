"use client"

import { create } from "zustand"
import { persist, StateStorage } from "zustand/middleware"
import { loginApi, LoginPayload, LoginResponse, User } from "@/services/auth.service"

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  login: (payload: LoginPayload) => Promise<LoginResponse>
  logout: () => void
}

// persisted state type (subset of AuthState)
interface PersistedAuthState {
  user: User | null
  token: string | null
}

// ✅ Custom storage implementing StateStorage
const localStoragePersist: StateStorage = {
  getItem: (name: string) => {
    if (typeof window === "undefined") return null
    const item = localStorage.getItem(name)
    if (!item) return null
    try {
      return JSON.parse(item) as PersistedAuthState
    } catch {
      return null
    }
  },
  setItem: (name: string, value: PersistedAuthState) => {
    if (typeof window === "undefined") return
    localStorage.setItem(name, JSON.stringify(value))
  },
  removeItem: (name: string) => {
    if (typeof window === "undefined") return
    localStorage.removeItem(name)
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,

      login: async (payload) => {
        try {
          set({ loading: true })
          const res = await loginApi(payload)

          set({ user: res.user, token: res.token, loading: false })
          return res
        } catch (err) {
          set({ loading: false })
          throw err
        }
      },

      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-store",
      storage: localStoragePersist,
      partialize: (state) => ({ user: state.user, token: state.token }), // now matches PersistedAuthState
    }
  )
)
