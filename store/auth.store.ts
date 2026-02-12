"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { loginApi, LoginPayload, LoginResponse, User } from "@/services/auth.service"

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  login: (payload: LoginPayload) => Promise<LoginResponse>
  logout: () => void
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

          set({
            user: res.user,
            token: res.token,
            loading: false,
          })

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
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
)
