package com.example.cracked_android.pages

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.cracked_android.viewModel.GraveInsideViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@Composable
fun GraveInsidePage(
    onBackClick: () -> Unit
) {
    val viewModel = hiltViewModel<GraveInsideViewModel>()
    val name = viewModel.userInfo.collectAsState().value.username
    val epitaph by viewModel.epitaph.collectAsState()
    val deathDate = viewModel.userInfo.collectAsState().value.createdAt

    LaunchedEffect(Unit){
        viewModel.fetchUserInfo()
        viewModel.fetchGraveContent()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFFDF7F0))
            .padding(24.dp)
    ) {
        TopBackBar(onBackClick = onBackClick)

        Spacer(modifier = Modifier.height(32.dp))

        EpitaphForm(
            name = name,
            epitaph = epitaph,
            onEpitaphChange = {viewModel.setEpitaph(it)},
            deathDate = deathDate,
            onSave = { CoroutineScope(Dispatchers.IO).launch {
                viewModel.saveGraveContent()
            } }
        )
    }
}

@Composable
fun TopBackBar(onBackClick: () -> Unit) {
    Box(modifier = Modifier.fillMaxWidth()) {
        IconButton(onClick = onBackClick) {
            Icon(
                imageVector = Icons.Default.ArrowBack,
                contentDescription = "뒤로가기"
            )
        }
    }
}
@Composable
fun EpitaphForm(
    name: String,
    epitaph: String,
    onEpitaphChange: (String) -> Unit,
    deathDate: String,
    onSave:()->Unit
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = name,
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(16.dp))

        OutlinedTextField(
            value = epitaph,
            onValueChange = onEpitaphChange,
            placeholder = { Text("당신의 마지막 문장을 남겨보세요...") },
            modifier = Modifier
                .fillMaxWidth()
                .height(150.dp),
            textStyle = MaterialTheme.typography.bodyLarge,
            maxLines = 5
        )

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "사망일: $deathDate",
            style = MaterialTheme.typography.bodyMedium,
            color = Color.Gray
        )
        Button(onClick = {onSave()}) {
            Text(text ="저장")
        }
    }
}

