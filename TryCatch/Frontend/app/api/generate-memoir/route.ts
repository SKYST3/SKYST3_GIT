import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { image, tags = [], description = "" } = await req.json()

    // 태그나 설명이 없는 경우 자동 생성
    let finalTags = tags
    let finalDescription = description
    let generatedMetadata = false

    if (tags.length === 0 || !description) {
      generatedMetadata = true

      // 이미지 분석을 통한 태그 및 설명 생성 (실제로는 이미지 분석 API 사용)
      const { text: metadataText } = await generateText({
        model: openai("gpt-4o"),
        prompt: `다음 이미지에 대한 태그와 간단한 설명을 생성해주세요:
이미지: ${image || "이미지 설명 없음"}

태그는 최대 5개, 각 태그는 한 단어 또는 짧은 구문으로 작성해주세요.
설명은 한 문장으로 간결하게 작성해주세요.

다음 형식으로 응답해주세요:
태그: 태그1, 태그2, 태그3
설명: 간단한 설명`,
        system: "당신은 이미지를 분석하고 관련 태그와 설명을 생성하는 AI 도우미입니다.",
      })

      // 생성된 메타데이터 파싱
      const tagsMatch = metadataText.match(/태그: (.*)/i)
      const descMatch = metadataText.match(/설명: (.*)/i)

      if (tags.length === 0 && tagsMatch && tagsMatch[1]) {
        finalTags = tagsMatch[1].split(",").map((tag) => tag.trim())
      }

      if (!description && descMatch && descMatch[1]) {
        finalDescription = descMatch[1].trim()
      }
    }

    // AI를 사용하여 회고록 텍스트 생성
    const prompt = `
다음 정보를 바탕으로 개인 회고록의 한 페이지를 작성해주세요:

이미지 설명: ${image || "이미지 없음"}
태그: ${finalTags.join(", ")}
간단한 설명: ${finalDescription}

회고록은 1인칭 시점으로, 감성적이고 자세한 묘사가 있는 5개 문단으로 작성해주세요.
각 문단은 3-4문장으로 구성하고, 과거의 추억을 회상하는 느낌으로 작성해주세요.
`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "당신은 감성적이고 문학적인 회고록을 작성하는 작가입니다. 사용자가 제공한 정보를 바탕으로 아름답고 감성적인 회고록을 작성해주세요. 한국어로 작성해주세요.",
    })

    return NextResponse.json({
      content: text,
      tags: finalTags,
      description: finalDescription,
      generatedMetadata,
    })
  } catch (error) {
    console.error("Error generating memoir:", error)
    return NextResponse.json({ error: "회고록 생성 중 오류가 발생했습니다." }, { status: 500 })
  }
}
