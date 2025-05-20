"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { ChevronLeft, ChevronRight, ArrowLeft, Share2Icon } from "lucide-react"
import Header from "@/components/header"
import { getChapters } from "@/lib/chapterService"
import { type Image, getImages } from "@/lib/imageService"
import { useAuth } from "@/hooks/useAuth"

interface MemoirPage extends Image {
  chapterTitle: string
  description: string
}

export default function Memoir() {
  const router = useRouter()
  const bookRef = useRef<HTMLDivElement>(null)
  const soundRef = useRef<HTMLAudioElement | null>(null)
  const [pages, setPages] = useState<MemoirPage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next")
  const [visiblePages, setVisiblePages] = useState<[number, number]>([0, 1])
  const { getAuthHeader } = useAuth()

  useEffect(() => {
    const fetchMemoir = async () => {
      try {
        const authHeader = getAuthHeader()
        const chaptersRes = await getChapters(authHeader)
        const chapters = chaptersRes.chapters

        // Fetch images for each chapter and convert to MemoirPage format
        const allPages = await Promise.all(
          chapters.map(async (chapter) => {
            const imagesRes = await getImages(chapter.id, authHeader)
            return imagesRes.map((image: Image) => ({
              ...image,
              chapterTitle: chapter.chapter_name,
              description: image.content || "No description available",
            }))
          }),
        ).then((pagesArray) => pagesArray.flat())

        setPages(allPages)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching memoir:", err)
        setError("Failed to load memoir. Please try again later.")
        setLoading(false)
      }
    }

    fetchMemoir()
  }, [])

  useEffect(() => {
    if (bookRef.current) {
      bookRef.current.classList.add("book-open")
    }
    if (!soundRef.current) {
      soundRef.current = new Audio("/sounds/page-flip.mp3")
    }
  }, [])

  const playFlipSound = () => {
    if (!soundRef.current) return
    soundRef.current.currentTime = 0
    soundRef.current.play()
  }

  const goToPreviousPage = () => {
    if (currentPageIndex > 0 && !isFlipping) {
      playFlipSound()
      setFlipDirection("prev")
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPageIndex(currentPageIndex - 2)
        setVisiblePages([currentPageIndex - 2, currentPageIndex - 1])
        setIsFlipping(false)
      }, 500)
    }
  }

  const goToNextPage = () => {
    if (currentPageIndex < pages.length - 2 && !isFlipping) {
      playFlipSound()
      setFlipDirection("next")
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPageIndex(currentPageIndex + 2)
        setVisiblePages([currentPageIndex + 2, currentPageIndex + 3])
        setIsFlipping(false)
      }, 500)
    }
  }

  const leftPage = pages[visiblePages[0]] || null
  const rightPage = pages[visiblePages[1]] || null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-orange-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-orange-50">
        <div className="text-center">
          <h2 className="text-red-500">{error}</h2>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-4 bg-gradient-to-b from-rose-50 to-orange-50 flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto mt-12 mb-2 flex justify-between items-center">
          <Button
            onClick={() => router.push("/my-page")}
            variant="outline"
            className="border-rose-600 text-rose-800 hover:bg-orange-100"
          >
            돌아가기
            <ArrowLeft className="ml-2" size={16} />
          </Button>
          
          <h1 className="text-3xl font-bold text-rose-900">나의 회고록</h1>
          <div className="w-[100px]"></div>
        </div>

        <div className="book-outer-wrapper">
          <div className="book-wrapper">
            <div ref={bookRef} className={`book-container ${isFlipping ? `flipping ${flipDirection}` : ""}`}>
              <div className="book-background">
                <img src="/book-template.png" alt="Book template" className="book-image" />

                {leftPage && (
                  <div className="left-page-content">
                    <div className="page-header">

                      <h2 className=""></h2>

                    </div>
                    <div className="page-image-container">
                      <img src={leftPage.file_url || "/placeholder.svg"} alt="Page image" className="page-image" />
                    </div>
                    <div className="page-content">{leftPage.content}</div>
                    <div className="page-number">{visiblePages[0] + 1}</div>
                  </div>
                )}

                {rightPage && (
                  <div className="right-page-content">
                    <div className="page-header">

                      <h2 className=""></h2>

                    </div>
                    <div className="page-image-container">
                      <img src={rightPage.file_url || "/placeholder.svg"} alt="Page image" className="page-image" />
                    </div>
                    <div className="page-content">{rightPage.content}</div>
                    <div className="page-number">{visiblePages[1] + 1}</div>
                  </div>
                )}

                <div className="page-flip-effect"></div>
              </div>
            </div>

            <div className="navigation-buttons">
              <Button
                onClick={goToPreviousPage}
                disabled={currentPageIndex === 0 || isFlipping}
                className="nav-button prev-button"
                variant="ghost"
                size="icon"
              >
                <ChevronLeft size={24} />
              </Button>
              <Button
                onClick={goToNextPage}
                disabled={currentPageIndex >= pages.length - 2 || isFlipping}
                className="nav-button next-button"
                variant="ghost"
                size="icon"
              >
                <ChevronRight size={24} />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-rose-800">
          <p>
            페이지 {currentPageIndex + 1}-{Math.min(currentPageIndex + 2, pages.length)} / 총 {pages.length}페이지
          </p>
        </div>
      </main>

      <style jsx global>{`
        /* 책 외부 래퍼 스타일 */
        .book-outer-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
        }
        
        /* 책 래퍼 스타일 */
        .book-wrapper {
          position: relative;
          width: 100%;
          max-width: 1400px;
          height: 95vh;
          max-height: 1200px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
        }
        
        /* 책 컨테이너 스타일 */
        .book-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1500px;
          transition: transform 0.5s;
        }
        
        .book-background {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .book-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* 페이지 콘텐츠 스타일 */
        .left-page-content,
        .right-page-content {
          position: absolute;
          width: 38%;
          height: 72%;
          top: 14%;
          z-index: 2;
          overflow-y: auto;
          padding: 30px;
          display: flex;
          flex-direction: column;
          scrollbar-width: thin;
          scrollbar-color: rgba(225, 29, 72, 0.3) transparent;
        }
        
        .left-page-content::-webkit-scrollbar,
        .right-page-content::-webkit-scrollbar {
          width: 4px;
        }
        
        .left-page-content::-webkit-scrollbar-thumb,
        .right-page-content::-webkit-scrollbar-thumb {
          background-color: rgba(225, 29, 72, 0.3);
          border-radius: 2px;
        }
        
        .left-page-content {
          left: 11%;
        }
        
        .right-page-content {
          right: 10.5%;
        }
        
        .page-header {
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(225, 29, 72, 0.2);
        }
        
        .page-image-container {
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
        }
        
        .page-image {
          width: 100%;
          max-height: 200px;
          object-fit: contain;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .page-content {
          flex: 1;
          font-family: serif;
          font-size: 1rem;
          line-height: 1.6;
          color: #000000;
          white-space: pre-line;
          text-align: justify;
        }
        
        .page-number {
          align-self: center;
          font-size: 0.9rem;
          color: #000000;
          margin-top: 20px;
          font-style: italic;
        }
        
        /* 페이지 넘김 효과 */
        .page-flip-effect {
          position: absolute;
          width: 43%;
          height: 73%;
          top: 12.1%;
          right: 11%;
          background-color: rgba(255, 255, 255, 0.9);
          transform-origin: left center;
          transform: rotateY(0deg);
          transition: transform 0.6s cubic-bezier(0.86, 0, 0.07, 1);
          backface-visibility: hidden;
          z-index: 3;
          opacity: 0;
          pointer-events: none;
        }
        
        .flipping.next .page-flip-effect {
          opacity: 1;
          transform: rotateY(-180deg);
          left: auto;
          right: 6.3%;
          transform-origin: left center;
        }
        
        .flipping.prev .page-flip-effect {
          opacity: 1;
          transform: rotateY(180deg);
          right: auto;
          left: 7.5%;
          transform-origin: right center;
        }
        
        /* 네비게이션 버튼 */
        .navigation-buttons {
          position: absolute;
          width: 120%;
          display: flex;
          justify-content: space-between;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          pointer-events: none;
        }
        
        .nav-button {
          background-color: rgba(255, 237, 213, 0.7);
          border: 1px solid #FB923C;
          color: #E11D48;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          pointer-events: auto;
        }
        
        .nav-button:hover:not(:disabled) {
          background-color: rgba(251, 146, 60, 0.3);
        }
        
        .nav-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        /* 반응형 스타일 (기존과 동일) */
        @media (max-width: 1400px) { /* ... */ }
        @media (max-width: 1200px) { /* ... */ }
        @media (max-width: 992px) { /* ... */ }
        @media (max-width: 768px) { /* ... */ }
        @media (max-width: 576px) { /* ... */ }
      `}</style>
    </div>
  )
}
