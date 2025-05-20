package com.example.cracked_android.viewModel

import androidx.lifecycle.ViewModel
import com.example.cracked_android.data.PrefRepository
import com.example.cracked_android.network.MyRestAPI
import com.example.cracked_android.network.dto.UserInfo
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject

@HiltViewModel
class GraveInsideViewModel @Inject constructor(
    private val api: MyRestAPI,
    private val prefRepository: PrefRepository,
) : ViewModel(){


    private val _userInfo= MutableStateFlow(UserInfo("","","",0,"",""))
    val userInfo: StateFlow<UserInfo> = _userInfo.asStateFlow()

    fun setUserInfo(value: UserInfo){
        _userInfo.value = value
    }

    private val _epitaph= MutableStateFlow("")
    val epitaph: StateFlow<String> = _epitaph.asStateFlow()

    fun setEpitaph(value: String){
        _epitaph.value = value
    }

    fun getUserId():String?{
        return prefRepository.getPref("userId")
    }

    suspend fun fetchUserInfo(){
        val userId =getUserId()!!
        val response = api.getUserInfo(userId)
        if(response.isSuccessful){
            setUserInfo(response.body()!!)
        }

    }
    suspend fun fetchGraveContent(){
        val userId = getUserId()!!
        val response = api.getGraveContent(userId)
        if(response.isSuccessful){
            setEpitaph(response.body()!!)
        }
    }

    suspend fun saveGraveContent(){
        val userId = getUserId()!!
        api.saveGraveContent(userId,epitaph.value)
    }

}