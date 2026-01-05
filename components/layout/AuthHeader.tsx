"use client"

import Image from "next/image"

export default function AuthHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          
          {/* Logo */}
          <div className="w-12 h-12 flex items-center justify-center">
            <Image
              src="/logo.png"   // put logo in public/logo.png
              alt="Montessori Golden Jubilee Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>

          {/* Text */}
          <div>
            <h1 className="font-semibold text-foreground">
              Indus Education hhh
            </h1>
            <p className="text-xs text-muted-foreground">
              Student Records Management Portal
            </p>
          </div>

        </div>
      </div>
    </header>
  )
}
