// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/useAuth"  // 추가

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "나의 회고록 | My Memoir",
  description: "AI가 도와주는 개인 회고록 작성 서비스",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>  {/* AuthProvider로 감싸서 useAuth() 훅 사용 가능 */}
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
