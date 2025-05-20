"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "../hooks/useAuth"
import { useRouter } from "next/navigation"

export default function Header() {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="w-full py-4 px-6 bg-rose-800 text-rose-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          나의 회고록
        </Link>
        <div className="space-x-2">
          {isAuthenticated ? (
            <Button className="bg-rose-400 hover:bg-rose-500 text-white" onClick={handleLogout}>
              로그아웃
            </Button>
          ) : (
            <>
              <Link href="/signin">
                <Button className="bg-rose-400 hover:bg-rose-500 text-white">로그인</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-rose-400 hover:bg-rose-500 text-white">회원가입</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
