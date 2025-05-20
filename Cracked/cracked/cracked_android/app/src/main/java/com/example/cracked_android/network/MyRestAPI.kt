package com.example.cracked_android.network

import com.example.cracked_android.network.dto.ChatContent
import com.example.cracked_android.network.dto.RegisterResponse
import com.example.cracked_android.network.dto.Session
import com.example.cracked_android.network.dto.UserInfo
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part
import retrofit2.http.Path
import retrofit2.http.Query

interface MyRestAPI {
    @Multipart
    @POST("/api/users/android/register")
    suspend fun registerUser(
        @Part("name") name: RequestBody,
        @Part("gender") gender: RequestBody,
        @Part("age") age: RequestBody,
        @Part image: MultipartBody.Part
    ): Response<RegisterResponse>

    @GET("/api/users/user_info/{user_id}")
    suspend fun getUserInfo(
        @Path("user_id") userId:String,

    ): Response<UserInfo>



    @POST("/api/grave/save_grave_content/{user_id}")
    suspend fun saveGraveContent(
        @Path("user_id") userId:String,
        @Body content:String,
    )

    @GET("/api/grave/get_grave_content/{user_id}")
    suspend fun getGraveContent(
        @Path("user_id") userId:String,
    ):Response<String>


    @GET("/api/chat/get_all_session/{user_id}")
    suspend fun getAllSession(
        @Path("user_id") userId:String,
    ): Response<List<Session>>

    @GET("/api/chat/get_all_chat/{user_id}")
    suspend fun getAllChat(
        @Path("user_id") userId:String,
        @Query("session_id") sessionId:String,
    ): Response<List<ChatContent>>

    @POST("/api/chat/create_session/{user_id}")
    suspend fun createSession(
        @Path("user_id") userId:String,
        @Query("color") color:String,
        @Query("x") x:Int,
        @Query("y") y:Int,
        @Query("size") size:Int,
    ): Response<Session>

    @POST("/api/chat/create_question/{user_id}")
    suspend fun createQuestion(
        @Path("user_id") userId:String,
        @Query("session_id") sessionId:String,
    ): Response<ChatContent>

    @POST("/api/chat/answer_question/{user_id}")
    suspend fun answerQuestion(
        @Path("user_id") userId:String,
        @Query("session_id") sessionId:String,
        @Query("answer") answer:String,
    )


}

fun getImageURL(userID:String):String{
    return "https://backend.cracked-tombstone.org/api/users/image/${userID}"
}