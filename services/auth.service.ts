export interface LoginPayload {
  username: string
  password: string
}

export interface User {
  id: number
  username: string
  name: string
  mobile: string
  user_type: string
  SchoolName:string,
  SchoolName?: string
  City: string
  State: string
  address: string
  email: string
}

export interface LoginResponse {
  status: boolean
  message: string
  token: string
  expires_at: string
  user: User
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!

export async function loginApi(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": API_KEY,
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (!data.status) {
    throw new Error(data.message || "Login failed")
  }

  return data
}
