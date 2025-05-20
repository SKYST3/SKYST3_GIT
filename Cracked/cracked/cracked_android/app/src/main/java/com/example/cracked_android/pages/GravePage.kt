package com.example.cracked_android.pages

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.tween
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.cracked_android.R
import com.example.cracked_android.network.dto.Session
import com.example.cracked_android.ui.theme.QuestionsPanel
import com.example.cracked_android.viewModel.GraveViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import kotlin.math.hypot

@Composable
fun GravePage(
    viewModel:GraveViewModel = hiltViewModel<GraveViewModel>(),
    onSessionClick:(Int)->Unit,
    onGraveClick:()->Unit,
) {
    var visibleSessionCount by remember { mutableStateOf(0) }

    val allSessions by viewModel.allSessions.collectAsState()

    LaunchedEffect(allSessions) {
        viewModel.fetchAllSession()
        while(visibleSessionCount<allSessions.size){
            visibleSessionCount++
            delay(150) // 별 하나마다 150ms 딜레이
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .pointerInput(Unit) {
                detectTapGestures { offset ->
                    // 터치된 좌표: offset.x, offset.y
                    CoroutineScope(Dispatchers.IO).launch {
                        val response = viewModel.createSession(offset.x.toInt(),offset.y.toInt())
                        withContext(Dispatchers.Main){
                            if(response.isSuccessful){
                                viewModel.addSession(response.body()!!)
                                onSessionClick(response.body()!!.id)
                            }
                        }
                    }
                }
            }
    ) {
        // 별 그리기
        allSessions.forEachIndexed{ index, session ->
            if (index < visibleSessionCount){
                StarItem(
                    session = session,
                    onClick = { onSessionClick(session.id) }
                )
            }
        }

        // GraveImage는 항상 중앙
        Box(modifier = Modifier.align(Alignment.Center)) {
            GraveImage{onGraveClick()}
        }
    }
}




@Composable
fun StarItem(session: Session, onClick: () -> Unit) {
    Box(
        modifier = Modifier
            .offset { IntOffset(session.x, session.y) }
            .size(session.size.dp)
            .clip(CircleShape)
            .background(
                Color(android.graphics.Color.parseColor(
                    if (session.color.startsWith("#")) session.color else "#${session.color}"
                )).copy(alpha = 0.7f)
            )
            .clickable { onClick() }
    )
}



@Composable
fun GraveImage(onClick:()->Unit) {
    Image(
        painter = painterResource(id = R.drawable.grave), // 파일 이름은 소문자 + 언더스코어만 허용
        contentDescription = "로컬 이미지",
        modifier = Modifier.clickable { onClick() },
        contentScale = ContentScale.Crop
    )
}