package com.example.cracked_android.viewModel

import android.net.Uri
import androidx.lifecycle.ViewModel
import com.example.cracked_android.data.PrefRepository
import com.example.cracked_android.network.MyRestAPI
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject

@HiltViewModel
class MainViewModel @Inject constructor(
    private val prefRepository: PrefRepository,
) : ViewModel(){
    fun getUserId():String?{
        return prefRepository.getPref("userId")
    }
}