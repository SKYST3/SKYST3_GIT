"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, Edit, Save, X, Plus, Trash2 } from "lucide-react";
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
import { getImages } from "@/lib/imageService";
import { useAuth } from "@/hooks/useAuth";

interface Page {
  id: string;
  imageUrl: string;
  tags: string[];
  description: string;
  content: string;
}

export default function EditPage({ params }: { params: { id: string; pageId: string } }) {
  const router = useRouter();
  const { getAuthHeader } = useAuth();
  const { id: chapterId, pageId } = params;

  const [page, setPage] = useState<Page | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingMetadata, setIsEditingMetadata] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [editedTags, setEditedTags] = useState<string[]>([]);
  const [editedDescription, setEditedDescription] = useState("");
  const [newTag, setNewTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const header = getAuthHeader();
    if (!header || Object.keys(header).length === 0) {
      router.replace("/signin");
      return;
    }

    getImages(chapterId, header)
      .then((imgs) => {
        const target = imgs.find((img) => String(img.id) === pageId);
        if (!target) {
          router.push(`/chapter/${chapterId}`);
          return;
        }

        const loadedPage: Page = {
          id: String(target.id),
          imageUrl: target.file_url,
          tags: [], // <- 빈 태그 배열
          description: "", // <- 빈 설명
          content: target.content || "",
        };

        setPage(loadedPage);
        setEditedContent(loadedPage.content);
        setEditedDescription(""); // <- 빈 설명
        setEditedTags([]); // <- 빈 태그
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("페이지 로드 실패:", err);
        router.push(`/chapter/${chapterId}`);
      });
  }, [chapterId, pageId, getAuthHeader, router]);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      const newContent = "재생성된 텍스트입니다.";
      setPage((prev) => prev && { ...prev, content: newContent });
      setEditedContent(newContent);
      setIsRegenerating(false);
    }, 2000);
  };

  const handleEdit = () => setIsEditing(true);
  const handleEditMetadata = () => setIsEditingMetadata(true);

  const handleSave = () => {
    if (!page) return;
    setPage({ ...page, content: editedContent });
    setIsEditing(false);
  };

  const handleSaveMetadata = () => {
    if (!page) return;
    setPage({ ...page, tags: editedTags, description: editedDescription });
    setIsEditingMetadata(false);
  };

  const handleCancel = () => {
    if (!page) return;
    setEditedContent(page.content);
    setIsEditing(false);
  };

  const handleCancelMetadata = () => {
    if (!page) return;
    setEditedTags([...page.tags]);
    setEditedDescription(page.description);
    setIsEditingMetadata(false);
  };

  const handleFinish = () => {
    router.push(`/chapter/${chapterId}`);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log(`페이지 삭제: ${pageId}`);
    router.push(`/chapter/${chapterId}`);
  };

  const addTag = () => {
    if (newTag.trim() && !editedTags.includes(newTag.trim())) {
      setEditedTags([...editedTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setEditedTags(editedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  if (isLoading || !page) {
    return <div className="p-10 text-center text-rose-700">페이지를 불러오는 중입니다...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 bg-gradient-to-b from-rose-50 to-orange-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-rose-900">
              {page.description || ""}
            </h1>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handleRegenerate}
                disabled={isRegenerating || isEditing}
                className="flex items-center"
              >
                <RefreshCw size={16} className={`mr-2 ${isRegenerating ? "animate-spin" : ""}`} />
                {isRegenerating ? "재생성 중..." : "재생성"}
              </Button>
              {!isEditing ? (
                <Button onClick={handleEdit} className="bg-rose-600 hover:bg-rose-500 flex items-center">
                  <Edit size={16} className="mr-2" />
                  텍스트 편집
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={handleCancel} className="flex items-center">
                    <X size={16} className="mr-2" />
                    취소
                  </Button>
                  <Button onClick={handleSave} className="bg-rose-600 hover:bg-rose-500 flex items-center">
                    <Save size={16} className="mr-2" />
                    저장
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-1/3">
              <Card className="overflow-hidden">
                <img
                  src={page.imageUrl || "/placeholder.svg"}
                  alt={page.description}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  {!isEditingMetadata ? (
                    <>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {page.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-orange-100 text-rose-700 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-rose-900 font-medium">
                        {page.description || ""}
                      </p>
                      <Button
                        onClick={handleEditMetadata}
                        variant="ghost"
                        className="mt-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 p-0 h-auto"
                      >
                        <Edit size={14} className="mr-1" />
                        태그 및 설명 편집
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-rose-700 mb-1">태그</label>
                        <div className="flex mb-2">
                          <Input
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="새 태그 추가"
                            className="flex-1 text-sm border-orange-200 focus-visible:ring-rose-500"
                          />
                          <Button type="button" onClick={addTag} className="ml-2 bg-rose-600 hover:bg-rose-500 h-9">
                            <Plus size={14} />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {editedTags.map((tag) => (
                            <div
                              key={tag}
                              className="flex items-center bg-orange-100 text-rose-700 px-2 py-1 rounded-full text-xs"
                            >
                              <span>{tag}</span>
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 text-rose-600 hover:text-rose-800"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-rose-700 mb-1">설명</label>
                        <Textarea
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          className="text-sm border-orange-200 focus-visible:ring-rose-500"
                          rows={3}
                        />
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" onClick={handleCancelMetadata} className="flex-1 text-xs h-8">
                          취소
                        </Button>
                        <Button
                          onClick={handleSaveMetadata}
                          className="flex-1 bg-rose-600 hover:bg-rose-500 text-xs h-8"
                        >
                          저장
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="md:w-2/3">
              <Card className="p-6 min-h-[400px] bg-rose-50 shadow-md">
                {isEditing ? (
                  <Textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="min-h-[400px] font-serif text-lg leading-relaxed bg-rose-50 border-orange-200 focus-visible:ring-rose-500"
                  />
                ) : (
                  <div className="prose prose-rose max-w-none font-serif text-lg leading-relaxed whitespace-pre-line">
                    {page.content}
                  </div>
                )}
              </Card>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleDelete}
              className="px-4 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
            >
              <Trash2 size={16} className="mr-2" />
              페이지 삭제
            </Button>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => router.push(`/chapter/${chapterId}`)} className="px-8">
                취소
              </Button>
              <Button onClick={handleFinish} className="bg-rose-800 hover:bg-rose-700 px-8">
                완료
              </Button>
            </div>
          </div>
        </div>
      </main>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>페이지 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              이 페이지를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
