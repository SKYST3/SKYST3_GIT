package com.example.cracked_android.viewModel

import androidx.lifecycle.ViewModel
import com.example.cracked_android.data.PrefRepository
import com.example.cracked_android.network.MyRestAPI
import com.example.cracked_android.network.dto.ChatContent
import com.example.cracked_android.network.dto.UserInfo
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import retrofit2.Response
import javax.inject.Inject

@HiltViewModel
class SessionViewModel @Inject constructor(
    private val api:MyRestAPI,
    private val prefRepository: PrefRepository,
) : ViewModel(){
    private val _newAnswer = MutableStateFlow("")
    val newAnswer: StateFlow<String> = _newAnswer.asStateFlow()

    fun setNewAnswer(value: String){
        _newAnswer.value = value
    }

    private val _questions: MutableStateFlow<List<ChatContent>> = MutableStateFlow(emptyList())
    val questions: StateFlow<List<ChatContent>> = _questions.asStateFlow()

    fun setQuestions(value: List<ChatContent>){
        _questions.value = value
    }

    fun addQuestion(sessionId: String){
        val nl=_questions.value.toMutableList()
        nl.add(ChatContent(0,getUserId()!!,sessionId,newQuestion.value,newAnswer.value, questions.value.size))
        setQuestions(nl)
    }

    private val _userInfo: MutableStateFlow<UserInfo> = MutableStateFlow(UserInfo("","","",0,"",""))
    val userInfo: StateFlow<UserInfo> = _userInfo.asStateFlow()

    fun setUserInfo(value: UserInfo){
        _userInfo.value = value
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

    suspend fun fetchQuestions(sessionId:String){
        val userId =getUserId()!!
        val response = api.getAllChat(userId, sessionId)
        if(response.isSuccessful){
            setQuestions(response.body()!!)
        }

    }

    suspend fun createQuestion(sessionId:String):Response<ChatContent>{
        val userId =getUserId()!!
        return api.createQuestion(userId, sessionId)


    }

    suspend fun answerQuestion(sessionId:String){
        val userId =getUserId()!!
        api.answerQuestion(userId, sessionId, newAnswer.value)


    }

    private val _newQuestion = MutableStateFlow("")
    val newQuestion: StateFlow<String> = _newQuestion.asStateFlow()

    fun setNewQuestion(value: String){
        _newQuestion.value = value
    }
}