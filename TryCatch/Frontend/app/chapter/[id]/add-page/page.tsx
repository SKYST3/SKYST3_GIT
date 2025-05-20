"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X, Plus } from "lucide-react";
import Header from "@/components/header";
// import UserHeader from "@/components/user-header";
import { useAuth } from "@/hooks/useAuth";
import { createImage } from "@/lib/imageService";

export default function AddImage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const chapterId = params.id;
  const { getAuthHeader } = useAuth();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const f = e.target.files[0];
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const addTag = () => {
    const t = currentTag.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setCurrentTag("");
    }
  };

  const removeTag = (t: string) => setTags(tags.filter((tag) => tag !== t));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setIsLoading(true);
    try {
      const header = getAuthHeader();
      // keyword: comma-separated tags, query: description
      const img = await createImage(
        chapterId,
        file,
        description || null,
        tags.length ? tags.join(",") : null,
        header
      );
      router.push(`/chapter/${chapterId}`);
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 bg-gradient-to-b from-rose-50 to-orange-50">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-rose-900">
                새 이미지 추가
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="file" className="text-rose-800">
                    이미지 파일 (필수)
                  </Label>
                  <Input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="border-orange-200 focus-visible:ring-rose-500"
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="미리보기"
                      className="w-full h-48 object-contain border border-orange-200 rounded-md mt-2"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-rose-800">
                    태그 (선택)
                  </Label>
                  <div className="flex">
                    <Input
                      id="tags"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter로 추가"
                      className="flex-1 border-orange-200 focus-visible:ring-rose-500"
                    />
                    <Button
                      type="button"
                      onClick={addTag}
                      className="ml-2 bg-rose-600 hover:bg-rose-500"
                    >
                      <Plus size={24} />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="flex items-center bg-orange-100 text-rose-700 px-3 py-1 rounded-full"
                        >
                          {t}
                          <button
                            type="button"
                            onClick={() => removeTag(t)}
                            className="ml-2 text-rose-600 hover:text-rose-800"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-rose-800">
                    설명 (선택)
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="설명을 입력하세요"
                    className="border-orange-200 focus-visible:ring-rose-500"
                  />
                </div>

                <CardFooter className="px-0 pt-4">
                  <div className="flex space-x-4 w-full">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-orange-200 text-rose-700 hover:bg-rose-50"
                      onClick={() => router.push(`/chapter/${chapterId}`)}
                    >
                      취소
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-rose-600 hover:bg-rose-500"
                      disabled={isLoading || !file}
                    >
                      {isLoading ? "업로드 중..." : "이미지 추가"}
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
