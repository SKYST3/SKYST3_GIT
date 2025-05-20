package com.example.cracked_android.data

interface PrefRepository {
    fun getPref(key: String): String?
    fun setPref(key: String,data: String)
    fun clearPref(key:String)

}