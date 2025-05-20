package com.example.cracked_android.network.dto

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class Session(
    @Json(name = "id") val id: Int,
    @Json(name = "user_id") val userId: String,
    @Json(name = "color") val color: String,
    @Json(name = "x") val x: Int,
    @Json(name = "y") val y: Int,
    @Json(name = "size") val size: Int,
)
