package com.example.cracked_android.network.dto

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class ChatContent(
    @Json(name = "id") val id: Int,
    @Json(name = "user_id") val userId: String,
    @Json(name = "session_id") val sessionId: String,
    @Json(name = "question") val question: String,
    @Json(name = "answer") val answer: String,
    @Json(name = "order_idx") val orderIdx: Int,
)
