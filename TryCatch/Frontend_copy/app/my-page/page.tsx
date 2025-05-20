// app/memoir-timeline/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useAuth } from "@/hooks/useAuth";
import {
  getChapters,
  createChapter,
  Chapter as ApiChapter,
} from "@/lib/chapterService";

export default function MemoirTimeline() {
  const router = useRouter();
  const { getAuthHeader } = useAuth();

  const [chapters, setChapters] = useState<ApiChapter[]>([]);
  const [deleteChapterId, setDeleteChapterId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // API에서 챕터 목록 fetch
  useEffect(() => {
    const header = getAuthHeader();
    // if there's no auth header (no token), kick to login
    if (!header || Object.keys(header).length === 0) {
      // replace so user can’t click “back” into this page
      router.replace("/signin");
      return;
    }

    (async () => {
      try {
        const res = await getChapters(getAuthHeader());
        setChapters(res.chapters);
      } catch (err) {
        console.error("챕터 목록 조회 실패:", err);
      }
    })();
  }, [getAuthHeader]);

  // 실제 API 연동하여 챕터 생성 후 state 업데이트
  const addChapter = async (index: number) => {
    try {
      const newCh = await createChapter("새 챕터", getAuthHeader());
      setChapters(prev => {
        const updated = [...prev];
        updated.splice(index, 0, newCh);
        return updated;
      });
    } catch (err: any) {
      console.error("챕터 생성 실패:", err);
      alert(`챕터 생성 실패: ${err.message}`);
    }
  };

  const handleDeleteClick = (chapterId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteChapterId(chapterId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteChapterId !== null) {
      setChapters(chapters.filter((c) => c.id !== deleteChapterId));
      setDeleteChapterId(null);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 bg-gradient-to-b from-rose-50 to-orange-50">
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <h1 className="mt-8 text-3xl font-bold text-rose-900">챕터 목록</h1>
          </div>
        </div>

        {chapters.length === 0 ? (
          <div className="w-full flex items-center justify-center py-32">
            <button
              onClick={() => addChapter(0)}
              className="bg-rose-400 hover:bg-orange-300 text-white rounded-full p-8 shadow-lg transition-colors"
              aria-label="Add first chapter"
            >
              <PlusCircle size={64} />
            </button>
          </div>
        ) : (
          <div className="w-full overflow-x-auto pb-8">
            <div className="relative py-16 px-12 min-w-fit">
              <div className="absolute left-12 right-12 top-1/2 h-1 bg-orange-200 transform -translate-y-1/2 z-0" />

              <div className="relative z-10 flex items-center justify-center">
                <div className="flex items-center justify-center w-16 mr-12">
                  <button
                    onClick={() => addChapter(0)}
                    className="w-10 h-10 rounded-full bg-rose-400 text-white flex items-center justify-center hover:bg-orange-300 transition-colors"
                    aria-label="Add chapter at beginning"
                  >
                    <PlusCircle size={24} />
                  </button>
                </div>

                <div
                  className="grid gap-8 justify-center mx-auto"
                  style={{
                    display: "inline-grid",
                    gridTemplateColumns: `repeat(${
                      chapters.length * 2 - 1
                    }, 1fr)`,
                    alignItems: "center",
                  }}
                >
                  {chapters.map((chapter, idx) => (
                    <React.Fragment key={chapter.id}>
                      <div className="relative w-96 flex flex-col items-center justify-center">
                        <div className="absolute bottom-4 left-4 w-full h-full bg-white rounded-lg shadow-md"></div>
                        <div className="absolute bottom-2 left-2 w-full h-full bg-white rounded-lg shadow-md"></div>

                        <Link
                          href={`/chapter/${chapter.id}`}
                          className="relative w-full z-10 group"
                        >
                          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                            <button
                              onClick={(e) =>
                                handleDeleteClick(chapter.id, e)
                              }
                              className="absolute top-2 right-2 w-7 h-7 bg-white/80 hover:bg-red-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 text-red-500 hover:text-red-600"
                              aria-label="챕터 삭제"
                            >
                              <Trash2 size={14} />
                            </button>

                            <div className="h-48 overflow-hidden">
                              <img
                                src="/placeholder.svg"
                                alt={chapter.chapter_name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-5">
                              <h3 className="font-medium text-rose-900 truncate">
                                {chapter.chapter_name}
                              </h3>
                              <p className="text-xs text-rose-700 mt-1 line-clamp-2">
                                {chapter.prologue}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>

                      {idx < chapters.length - 1 && (
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => addChapter(idx + 1)}
                            className="w-10 h-10 rounded-full bg-rose-400 text-white flex items-center justify-center hover:bg-orange-300 transition-colors"
                            aria-label={`Add chapter after ${chapter.chapter_name}`}
                          >
                            <PlusCircle size={24} />
                          </button>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex items-center justify-center w-16 ml-12">
                  <button
                    onClick={() => addChapter(chapters.length)}
                    className="w-10 h-10 rounded-full bg-rose-400 text-white flex items-center justify-center hover:bg-orange-300 transition-colors"
                    aria-label="Add chapter at end"
                  >
                    <PlusCircle size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/memoir">
            <Button className="bg-rose-800 hover:bg-rose-700 text-white px-8 py-6 text-lg">
              전체 회고록 보기
            </Button>
          </Link>
        </div>
      </main>

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
  );
}
