// lib/chapterService.ts

export interface Chapter {
  id: number;
  chapter_name: string;
  prologue: string;
  epilogue: string;
}

/**
 * 챕터 생성: name 필드만 전송하며, Authorization 헤더와 Content-Type을 설정하고 쿠키를 포함합니다.
 */
export async function createChapter(
  name: string,
  authHeader: Record<string, string>
): Promise<Chapter> {
  const res = await fetch(
    "https://api.memory123.store/api/chapters/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
      },
      credentials: "include",
      body: JSON.stringify({ name }),
    }
  );

  if (!res.ok) {
    const detail = await res.json().catch(() => null);
    console.error("createChapter error detail:", detail);
    throw new Error(`챕터 생성 실패: ${res.status}`);
  }

  return res.json() as Promise<Chapter>;
}

/**
 * 챕터 목록 조회: Authorization 헤더를 포함하고, 쿠키를 전송합니다.
 * 반환형: { chapters: Chapter[] }
 */
export async function getChapters(
  authHeader: Record<string, string>
): Promise<{ chapters: Chapter[] }> {
  const res = await fetch(
    "https://api.memory123.store/api/chapters/get",
    {
      method: "GET",
      headers: {
        ...authHeader,
      },
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error(`챕터 목록 조회 실패: ${res.status}`);
  }

  return res.json() as Promise<{ chapters: Chapter[] }>;
}
