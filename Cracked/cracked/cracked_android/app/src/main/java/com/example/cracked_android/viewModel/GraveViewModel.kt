package com.example.cracked_android.viewModel

import android.net.Uri
import androidx.compose.runtime.MutableState
import androidx.lifecycle.ViewModel
import com.example.cracked_android.data.PrefRepository
import com.example.cracked_android.network.MyRestAPI
import com.example.cracked_android.network.dto.Session
import com.example.cracked_android.network.dto.UserInfo
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import retrofit2.Response
import javax.inject.Inject


@HiltViewModel
class GraveViewModel @Inject constructor(
    private val api: MyRestAPI,
    private val prefRepository: PrefRepository,
) : ViewModel(){



    fun getUserId():String?{
        return prefRepository.getPref("userId")
    }


    /*
    suspend fun fetchQuestions(){
        val userId =getUserId()!!
        val response = api.getAllChat(userId)
        if(response.isSuccessful){
            setQuestions(response.body()!!)
        }

    }*/

    private val _allSessions:MutableStateFlow<List<Session>> = MutableStateFlow(emptyList())
    val allSessions: StateFlow<List<Session>> = _allSessions.asStateFlow()

    fun setAllSessions(value: List<Session>){
        _allSessions.value = value
    }

    fun addSession(value:Session){
        val nl = allSessions.value.toMutableList()
        nl.add(value)
        setAllSessions(nl)
    }

    suspend fun fetchAllSession(){
        val userId=getUserId()!!
        val response = api.getAllSession(userId)
        if(response.isSuccessful){
            setAllSessions(response.body()!!)
        }
    }

    suspend fun createSession(x:Int, y:Int):Response<Session>{
        val userId = getUserId()!!
        return api.createSession(userId,"FFFF00",x,y,10)

    }

}
