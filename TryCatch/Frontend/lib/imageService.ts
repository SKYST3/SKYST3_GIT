// lib/imageService.ts with modifications for handling presigned URLs

export interface Image {
  id: number;
  file_url: string;
  chapter_id: number;
  user_id: number;
  is_main: boolean;
  content: string;
}

export interface Chapter {
  id: number;
  chapter_name: string;
  prologue: string;
  epilogue: string;
  images: Image[];
}

/**
 * 이미지 생성: multipart/form-data로 파일과 선택적 query, keyword를 전송
 */
export async function createImage(
  chapterId: number | string,
  file: File,
  query: string | null,
  keyword: string | null,
  authHeader: Record<string, string>
): Promise<Image> {
  const form = new FormData();
  form.append("file", file);
  if (query !== null && query !== undefined) {
    form.append("query", query);
  }
  if (keyword !== null && keyword !== undefined) {
    form.append("keyword", keyword);
  }

  try {
    const res = await fetch(
      `https://api.memory123.store/api/images/create/${chapterId}`,
      {
        method: "POST",
        headers: {
          ...authHeader,
        },
        credentials: "include",
        body: form,
      }
    );

    if (!res.ok) {
      const detail = await res.json().catch(() => null);
      console.error("createImage error detail:", detail);
      throw new Error(`이미지 생성 실패: ${res.status}`);
    }

    const data = await res.json();
    return processImageResponse(data);
  } catch (error) {
    console.error("Error in createImage:", error);
    throw error;
  }
}

/**
 * 챕터의 이미지 리스트만 가져오기
 */
export async function getImages(
  chapterId: number | string,
  authHeader: Record<string, string>
): Promise<Image[]> {
  try {
    console.log(
      `Fetching images for chapter ${chapterId} with auth:`,
      Object.keys(authHeader).join(", ")
    );

    const res = await fetch(
      `https://api.memory123.store/api/chapters/get/${chapterId}`,
      {
        method: "GET",
        headers: {
          ...authHeader,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!res.ok) {
      let detail: any = null;
      try {
        detail = await res.json();
      } catch {
        // ignore parse errors
      }
      console.error("getImages error detail:", detail);
      throw new Error(`이미지 목록 조회 실패: ${res.status}`);
    }

    const chapter: Chapter = await res.json();
    console.log(
      `Received chapter data for ${chapterId}:`,
      JSON.stringify({
        id: chapter.id,
        name: chapter.chapter_name,
        imageCount: chapter.images?.length || 0,
      })
    );

    // Process each image to ensure URLs are properly handled
    return chapter.images.map(processImageResponse);
  } catch (error) {
    console.error("Error in getImages:", error);
    throw error;
  }
}

/**
 * Process image response to handle presigned URLs properly
 */
function processImageResponse(image: Image): Image {
  if (!image) return image;

  try {
    // If URL already has query parameters, it's likely a presigned URL
    if (image.file_url && image.file_url.includes("?")) {
      // Some presigned URLs might be double-encoded, so we try to decode once
      if (image.file_url.includes("%25")) {
        try {
          const decodedOnce = decodeURIComponent(image.file_url);
          image.file_url = decodedOnce;
        } catch (e) {
          console.warn("Error decoding URL:", e);
        }
      }

      // Log the processed URL for debugging
      console.log(
        `Processed presigned URL for image ${image.id}: ${image.file_url}`
      );
    } else {
      console.warn(
        `Image ${image.id} may not have a presigned URL: ${image.file_url}`
      );
    }
  } catch (e) {
    console.error("Error processing image response:", e);
  }

  return image;
}
