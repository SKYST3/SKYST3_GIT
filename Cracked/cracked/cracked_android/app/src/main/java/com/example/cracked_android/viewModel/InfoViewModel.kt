package com.example.cracked_android.viewModel

import android.content.Context
import android.net.Uri
import androidx.lifecycle.ViewModel
import com.example.cracked_android.data.PrefRepository
import com.example.cracked_android.network.MyRestAPI
import com.example.cracked_android.network.dto.RegisterResponse
import com.example.cracked_android.network.dto.UserInfo
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import retrofit2.Response
import retrofit2.http.Path
import retrofit2.http.Query
import java.io.File
import java.io.FileOutputStream
import javax.inject.Inject

@HiltViewModel
class InfoViewModel @Inject constructor(
    private val api: MyRestAPI,
    private val prefRepository: PrefRepository,
) :ViewModel(){

    private val _imageUri:MutableStateFlow<Uri?> = MutableStateFlow(null)
    val imageUri: StateFlow<Uri?> = _imageUri.asStateFlow()

    fun setImageUri(value:Uri?){
        _imageUri.value = value
    }

    private val _username = MutableStateFlow("")
    val username: StateFlow<String> = _username.asStateFlow()

    fun setUsername(value:String){
        _username.value = value
    }

    private val _genderIsMale:MutableStateFlow<Boolean?> = MutableStateFlow(null)
    val genderIsMale: StateFlow<Boolean?> = _genderIsMale.asStateFlow()

    fun setGender(isMale:Boolean){
        _genderIsMale.value = isMale
    }

    private val _age = MutableStateFlow(20)
    val age: StateFlow<Int> = _age.asStateFlow()

    fun setAge(value:Int){
        _age.value = value
    }


    suspend fun registerUser(
        name: String,
        gender: String,
        age: Int,
        imageFile: File
    ):Response<RegisterResponse>{

        return api.registerUser(
            name.toRequestBody("text/plain".toMediaTypeOrNull()),
            gender.toRequestBody("text/plain".toMediaTypeOrNull()),
            age.toString().toRequestBody("text/plain".toMediaTypeOrNull()),
            MultipartBody.Part.createFormData(
                "image", imageFile.name, imageFile.asRequestBody("image/png".toMediaTypeOrNull())
            ))


    }

    fun getUserId():String?{
        return prefRepository.getPref("userId")
    }
    fun setUserId(userId: String) {
        prefRepository.setPref("userId",userId)
    }

    fun uriToFile(context: Context, uri: Uri): File {
        val inputStream = context.contentResolver.openInputStream(uri)
        val tempFile = File.createTempFile("upload_", ".jpg", context.cacheDir)
        tempFile.outputStream().use { output ->
            inputStream?.copyTo(output)
        }
        return tempFile
    }

    private val _imageUrl = MutableStateFlow("")
    val imageUrl: StateFlow<String> = _imageUrl.asStateFlow()

    /*
    fun setImageUrl(value:String){
        _imageUrl.value = value
    }*/

    suspend fun getUserInfo():Response<UserInfo>{
        val userId = getUserId()!!
        return api.getUserInfo(userId)
    }




}