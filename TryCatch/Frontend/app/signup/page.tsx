"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"

import { useAuth } from "../../hooks/useAuth";            // AuthContext 훅
import { signUp } from "../../lib/authService";           // API 호출 함수
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const today = new Date();
const defaultYear  = today.getFullYear().toString();
const defaultMonth = (today.getMonth()+1).toString().padStart(2,"0");
const defaultDay   = today.getDate().toString().padStart(2,"0");

export default function SignUp() {
  const router = useRouter();
  const auth = useAuth();
  const today = new Date();

  const currentYear = new Date().getFullYear()
  const [formData, setFormData] = useState({
    name: "",
    // 기본값을 오늘 년/월/일로 세팅
    birthYear:  defaultYear,
    birthMonth: defaultMonth,
    birthDay:   defaultDay,
    // 시간은 00시 00분
    birthHour:   "00",
    birthMinute: "00",
    id: "",
    password: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProfileImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // 여기에 회원가입 로직 추가
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const payload = {
      username: formData.name,
      login_id: formData.id,
      password: formData.password,
      birth_year:  Number(formData.birthYear),
      birth_month: Number(formData.birthMonth),
      birth_date:   Number(formData.birthDay),
      birth_hour:   Number(formData.birthHour),
      birth_minute: Number(formData.birthMinute)
      // (필요하면 profileImage 등도)
    };

    try {
      // 3) signUp API 호출
      await signUp(payload);
      // 4) 가입 후 리다이렉트
      router.push("/signin");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "회원가입에 실패했습니다.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-rose-50 to-orange-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">회원가입</CardTitle>
            <CardDescription className="text-center">
              나의 회고록 서비스에 가입하고 당신의 이야기를 시작하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름 <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력해 주세요."
                />
              </div>

              <div className="space-y-4">
                
                {/* 생년월일: 년/월/일 셀렉트 */}
                <div className="space-y-2">
                  <Label>생년월일</Label>
                  <div className="flex space-x-2">
                    <Select
                      name="birthYear"
                      value={formData.birthYear}
                      onValueChange={(val: string) =>
                        setFormData(prev => ({ ...prev, birthYear: val }))
                      }
                    >
                      <SelectTrigger className="bg-white w-auto px-3 py-2">
                        <SelectValue placeholder="년" />
                      </SelectTrigger>
                      <SelectContent className="max-h-40 overflow-auto bg-white">
                        {Array.from({ length: currentYear - 1850 + 1 }, (_, i) => {
                          const yy = (1850 + i).toString();
                          return (
                            <SelectItem key={yy} value={yy}>
                              {yy}년
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <Select
                      name="birthMonth"
                      value={formData.birthMonth}
                      onValueChange={(val: string) =>
                        setFormData(prev => ({ ...prev, birthMonth: val }))
                      }
                    >
                      <SelectTrigger className="bg-white w-auto px-3 py-2">
                        <SelectValue placeholder="월" />
                      </SelectTrigger>
                      <SelectContent className="max-h-40 overflow-auto bg-white">
                        {Array.from({ length: 12 }, (_, i) => {
                          const mm = (i + 1).toString().padStart(2, "0");
                          return (
                            <SelectItem key={mm} value={mm}>
                              {mm}월
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <Select
                      name="birthDay"
                      value={formData.birthDay}
                      onValueChange={(val: string) =>
                        setFormData(prev => ({ ...prev, birthDay: val }))
                      }
                    >
                      <SelectTrigger className="bg-white w-auto px-3 py-2">
                        <SelectValue placeholder="일" />
                      </SelectTrigger>
                      <SelectContent className="max-h-40 overflow-auto bg-white">
                        {(() => {
                          const y = parseInt(formData.birthYear);
                          const m = parseInt(formData.birthMonth);
                          const daysInMonth = y && m ? new Date(y, m, 0).getDate() : 31;
                          return Array.from({ length: daysInMonth }, (_, i) => {
                            const dd = (i + 1).toString().padStart(2, "0");
                            return (
                              <SelectItem key={dd} value={dd}>
                                {dd}일
                              </SelectItem>
                            );
                          });
                        })()}
                      </SelectContent>
                    </Select>
                  </div>
                  {(() => {
                    const { birthYear, birthMonth, birthDay } = formData;
                    if (birthYear && birthMonth && birthDay) {
                      const sel = new Date(
                        +birthYear,
                        +birthMonth - 1,
                        +birthDay
                      );
                      if (sel > new Date()) {
                        return (
                          <p className="mt-1 text-sm text-red-500">
                            미래 날짜는 선택할 수 없습니다.
                          </p>
                        );
                      }
                    }
                    return null;
                  })()}
                </div>

                {/* 출생 시간: 24시간 */}
                <div className="space-y-2">
                  <Label>출생 시간 (24시간)</Label>
                  <div className="flex space-x-2">
                    <Select
                      name="birthHour"
                      value={formData.birthHour}
                      onValueChange={(val: string) =>
                        setFormData(prev => ({ ...prev, birthHour: val }))
                      }
                    >
                      <SelectTrigger className="bg-white w-auto px-3 py-2">
                        <SelectValue placeholder="시" />
                      </SelectTrigger>
                      <SelectContent className="max-h-40 overflow-auto bg-white">
                        {Array.from({ length: 24 }, (_, i) => {
                          const hh = i.toString().padStart(2, "0");
                          return (
                            <SelectItem key={hh} value={hh}>
                              {hh}시
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <Select
                      name="birthMinute"
                      value={formData.birthMinute}
                      onValueChange={(val: string) =>
                        setFormData(prev => ({ ...prev, birthMinute: val }))
                      }
                    >
                      <SelectTrigger className="bg-white w-auto px-3 py-2">
                        <SelectValue placeholder="분" />
                      </SelectTrigger>
                      <SelectContent className="max-h-40 overflow-auto bg-white">
                        {Array.from({ length: 60 }, (_, i) => {
                          const mm = i.toString().padStart(2, "0");
                          return (
                            <SelectItem key={mm} value={mm}>
                              {mm}분
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileImage">프로필 이미지</Label>
                <div className="flex items-center space-x-4">
                  {imagePreview && (
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="프로필 미리보기"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <Input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="id">아이디 <span className="text-red-500">*</span></Label>
                <Input
                  id="id"
                  name="id"
                  type="text"
                  required
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="아이디를 입력해 주세요."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호 <span className="text-red-500">*</span></Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="비밀번호를 입력해 주세요."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인 <span className="text-red-500">*</span></Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="비밀번호를 다시 입력해 주세요."
                />
              </div>

              <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-500">
                회원가입
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p>
              이미 계정이 있으신가요?{" "}
              <Link href="/signin" className="text-rose-600 hover:underline">
                로그인
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
