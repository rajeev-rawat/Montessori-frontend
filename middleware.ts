import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value
  const url = req.nextUrl.clone()

  // Protect dashboard routes
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // Prevent logged-in users from visiting login/signup
  if (token && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup")) {
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/bulkUpload/:path*"],
}
