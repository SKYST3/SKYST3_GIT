export interface userInfo {
    name: string
    photoUrl: string          // 사진 미리보기용 URL (local blob URL)
    photoFile: File | undefined         // ✅ 실제 서버에 보낼 File 객체 추가
    gender: string
    age: number | undefined
    portraitUrl: string       // 서버에서 받아온 영정사진 URL
}

export interface rawUserInfo {
    user_id: string,
    username: string,
    gender: string,
    age: number,
    image_path: string,
    created_at: string
}

export interface rawGraveContent {
    grave_content: string
}

export interface rawSession {
    id: number
    user_id: string
    color: string
    x: number
    y: number
    size: number
}

export interface rawChat {
    id: number
    user_id: string
    session_id: number
    question: string
    answer: string
    order_idx: number      
}