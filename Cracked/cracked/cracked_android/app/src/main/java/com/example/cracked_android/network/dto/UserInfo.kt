package com.example.cracked_android.network.dto

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class UserInfo(

    @Json(name = "user_id") val userId: String,
    @Json(name = "username") val username: String,
    @Json(name = "gender") val gender: String,
    @Json(name = "age") val age: Int,
    @Json(name = "image_path") val imagePath: String,
    @Json(name = "created_at") val createdAt: String,//??????????????????
    )