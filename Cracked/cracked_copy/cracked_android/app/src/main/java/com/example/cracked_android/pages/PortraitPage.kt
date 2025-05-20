package com.example.cracked_android.pages

import androidx.compose.foundation.Image
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import coil.compose.rememberImagePainter
import com.example.cracked_android.viewModel.PortraitViewModel
import kotlinx.coroutines.delay

@Composable
fun PortraitPage(
    viewModel: PortraitViewModel= hiltViewModel<PortraitViewModel>(),
    //imageUrl: String,
    onTimeoutNavigate: () -> Unit
) {
    // 5초 후 자동 이동
    LaunchedEffect(Unit) {
        viewModel.fetchUserImage()
        delay(5000)
        onTimeoutNavigate()
    }

    val imageUrl by viewModel.imageUrl.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        PortraitImage(imageUrl = imageUrl)
        Spacer(modifier = Modifier.height(32.dp))
        EpitaphText()
        Spacer(modifier = Modifier.height(40.dp))
    }
}

@Composable
fun PortraitImage(imageUrl: String) {
    Image(
        painter = rememberImagePainter(imageUrl),
        contentDescription = "Portrait",
        modifier = Modifier
            .size(200.dp)
            .clip(RoundedCornerShape(12.dp))
            .border(2.dp, Color.Gray, RoundedCornerShape(12.dp)),
        contentScale = ContentScale.Crop
    )
}

@Composable
fun EpitaphText() {
    Text(
        text = buildAnnotatedString {
            append("당신은 세상을 떠나셨습니다.\n\n")
            append("하지만 그 삶은, 아직 다 하지 못한 이야기를 품고 있습니다.\n\n")
            append("이제,\n\n")
            append("당신의 시간을 되돌아보며\n\n")
            withStyle(style = SpanStyle(fontWeight = FontWeight.Bold)) {
                append("당신만의 묘비명을 남겨주세요.")
            }
        },
        style = MaterialTheme.typography.bodyLarge,
        textAlign = TextAlign.Center,
        lineHeight = 24.sp
    )
}
