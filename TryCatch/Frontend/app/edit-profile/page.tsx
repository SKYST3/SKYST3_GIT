"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PlusCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Define the Chapter type
interface Chapter {
  id: string
  title: string
  createdAt: string
  pageCount: number
  imageUrl?: string
  tags: string[]
  description: string
}

export default function MemoirTimeline() {
  const router = useRouter()

  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: "1",
      title: "어린 시절의 추억",
      createdAt: "2023-01-15",
      pageCount: 5,
      imageUrl: "/childhood-playground.png",
      tags: ["어린시절", "놀이터", "친구"],
      description: "동네 놀이터에서 친구들과 놀던 기억",
    },
    {
      id: "2",
      title: "대학 생활",
      createdAt: "2023-02-20",
      pageCount: 3,
      imageUrl: "/family-dinner.png",
      tags: ["가족", "저녁식사", "대화"],
      description: "가족과 함께한 저녁 식사 시간",
    },
  ])

  const [deleteChapterId, setDeleteChapterId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleViewMemoir = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsTransitioning(true)

    // 애니메이션 후 페이지 이동
    setTimeout(() => {
      router.push("/memoir")
    }, 800) // 애니메이션 시간에 맞춰 조정
  }

  const addChapter = (index: number) => {
    const newChapterId = String(chapters.length + 1)
    const newChapter: Chapter = {
      id: newChapterId,
      title: `새 챕터 ${newChapterId}`,
      createdAt: new Date().toISOString().split("T")[0],
      pageCount: 0,
      imageUrl: "/placeholder.svg",
      tags: ["새로운", "챕터"],
      description: "새로운 챕터 설명을 입력하세요",
    }

    const newChapters = [...chapters]
    newChapters.splice(index, 0, newChapter)
    setChapters(newChapters)
  }

  const handleDeleteClick = (chapterId: string, e: React.MouseEvent) => {
    e.preventDefault() // 링크 이동 방지
    e.stopPropagation() // 이벤트 버블링 방지
    setDeleteChapterId(chapterId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (deleteChapterId) {
      // 챕터 삭제 로직
      setChapters(chapters.filter((chapter) => chapter.id !== deleteChapterId))
      setDeleteChapterId(null)
      setIsDeleteDialogOpen(false)
    }
  }

  // Calculate minimum width with more spacing for cards
  const minWidth = Math.max(1200, chapters.length * 300 + 300)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main
        className={`flex-1 p-6 bg-gradient-to-b from-amber-50 to-amber-100 transition-opacity duration-800 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
      >
        {/* Header section constrained */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-amber-900">챕터 목록</h1>
          </div>
        </div>
        {chapters.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-32">
            <button
              onClick={() => addChapter(0)}
              className="bg-amber-600 hover:bg-amber-500 text-white rounded-full p-8 shadow-lg transition-colors"
              aria-label="Add first chapter"
            >
              <PlusCircle size={64} />
            </button>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <div className="w-full overflow-x-auto pb-8">
                <div className="relative py-16 px-12" style={{ minWidth: `${minWidth}px` }}>
                  <div className="absolute left-12 right-12 top-1/2 h-1 bg-amber-300 transform -translate-y-1/2 z-0" />

                  <div className={`relative z-10 flex items-center ${chapters.length === 1 ? "justify-center" : ""}`}>
                    {chapters.length > 1 && (
                      <div className="flex items-center justify-center w-16 mr-12">
                        <button
                          onClick={() => addChapter(0)}
                          className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-500 transition-colors"
                          aria-label="Add chapter at beginning"
                        >
                          <PlusCircle size={24} />
                        </button>
                      </div>
                    )}

                    <div
                      className="flex-grow grid gap-8"
                      style={{
                        gridTemplateColumns: `repeat(${chapters.length * 2 - 1}, 1fr)`,
                        alignItems: "center",
                      }}
                    >
                      {chapters.map((chapter, index) => (
                        <>
                          <div
                            key={`chapter-${chapter.id}`}
                            className="relative w-64 flex flex-col items-center justify-center"
                          >
                            {/* Stacked background cards: offset to top-right */}
                            <div className="absolute bottom-4 left-4 w-full h-full bg-white rounded-lg shadow-md"></div>
                            <div className="absolute bottom-2 left-2 w-full h-full bg-white rounded-lg shadow-md"></div>

                            <Link href={`/chapter/${chapter.id}`} className="relative w-full z-10 group">
                              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                                {/* 삭제 버튼 */}
                                <button
                                  onClick={(e) => handleDeleteClick(chapter.id, e)}
                                  className="absolute top-2 right-2 w-7 h-7 bg-white/80 hover:bg-red-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 text-red-500 hover:text-red-600"
                                  aria-label="챕터 삭제"
                                >
                                  <Trash2 size={14} />
                                </button>

                                <div className="h-36 overflow-hidden">
                                  <img
                                    src={chapter.imageUrl || "/placeholder.svg"}
                                    alt={chapter.description}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-3">
                                  <div className="flex flex-wrap gap-1 mb-1">
                                    {chapter.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                  <h3 className="font-medium text-amber-900 truncate">{chapter.title}</h3>
                                  <p className="text-xs text-amber-700 mt-1">{chapter.pageCount}페이지</p>
                                  <p className="text-xs text-amber-700 mt-1 line-clamp-2">{chapter.description}</p>
                                </div>
                              </div>
                            </Link>
                          </div>

                          {index < chapters.length - 1 && (
                            <div key={`add-${chapter.id}`} className="flex items-center justify-center">
                              <button
                                onClick={() => addChapter(index + 1)}
                                className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-500 transition-colors"
                                aria-label={`Add chapter after ${chapter.title}`}
                              >
                                <PlusCircle size={24} />
                              </button>
                            </div>
                          )}
                        </>
                      ))}
                    </div>

                    {chapters.length > 1 && (
                      <div className="flex items-center justify-center w-16 ml-12">
                        <button
                          onClick={() => addChapter(chapters.length)}
                          className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-500 transition-colors"
                          aria-label="Add chapter at end"
                        >
                          <PlusCircle size={24} />
                        </button>
                      </div>
                    )}
                  </div>
                  {chapters.length === 1 && (
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                      <button
                        onClick={() => addChapter(1)}
                        className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-500 transition-colors"
                        aria-label="Add chapter"
                      >
                        <PlusCircle size={24} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={handleViewMemoir}
                className="bg-amber-800 hover:bg-amber-700 text-white px-8 py-6 text-lg transition-transform duration-300 hover:scale-105"
              >
                전체 회고록 보기
              </Button>
            </div>
          </>
        )}
      </main>

      {/* 삭제 확인 대화상자 */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>챕터 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              이 챕터를 정말 삭제하시겠습니까? 챕터에 포함된 모든 페이지가 함께 삭제되며, 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
