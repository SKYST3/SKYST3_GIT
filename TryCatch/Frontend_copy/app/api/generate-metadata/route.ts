import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { image } = await req.json()

    if (!image) {
      return NextResponse.json({ error: "이미지가 필요합니다." }, { status: 400 })
    }

    // 이미지 분석을 통한 태그 및 설명 생성 (실제로는 이미지 분석 API 사용)
    const { text: metadataText } = await generateText({
      model: openai("gpt-4o"),
      prompt: `다음 이미지에 대한 태그와 간단한 설명을 생성해주세요:
이미지: ${image}

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

    const tags = tagsMatch && tagsMatch[1] ? tagsMatch[1].split(",").map((tag) => tag.trim()) : []
    const description = descMatch && descMatch[1] ? descMatch[1].trim() : ""

    return NextResponse.json({
      tags,
      description,
    })
  } catch (error) {
    console.error("Error generating metadata:", error)
    return NextResponse.json({ error: "메타데이터 생성 중 오류가 발생했습니다." }, { status: 500 })
  }
}
