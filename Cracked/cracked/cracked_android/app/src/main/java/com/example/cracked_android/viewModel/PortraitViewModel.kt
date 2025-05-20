package com.example.cracked_android.viewModel

import androidx.lifecycle.ViewModel
import com.example.cracked_android.data.PrefRepository
import com.example.cracked_android.network.MyRestAPI
import com.example.cracked_android.network.dto.UserInfo
import com.example.cracked_android.network.getImageURL
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import java.io.File
import javax.inject.Inject

@HiltViewModel
class PortraitViewModel @Inject constructor(
    private val api: MyRestAPI,
    private val prefRepository: PrefRepository,
) : ViewModel(){

    private val _imageUrl: MutableStateFlow<String> = MutableStateFlow("")
    val imageUrl: StateFlow<String> = _imageUrl.asStateFlow()

    fun setImageUrl(value:String){
        _imageUrl.value = value
    }
    fun getUserId():String?{
        return prefRepository.getPref("userId")
    }

    fun fetchUserImage(){
        val userId = getUserId()!!
        setImageUrl(getImageURL(userId))
    }

}