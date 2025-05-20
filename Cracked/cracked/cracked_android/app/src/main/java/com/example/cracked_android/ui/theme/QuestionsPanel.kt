package com.example.cracked_android.ui.theme

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.cracked_android.network.dto.ChatContent

@Composable
fun QuestionsPanel(
    questions: List<ChatContent>,
    newQuestion: String,
    isCreating: Boolean,
    newAnswer: String,
    onAnswerChange: (String) -> Unit,
    onStartCreating: () -> Unit,
    onCancelCreating: () -> Unit,
    onSubmitAnswer: () -> Unit,
    onClose: () -> Unit
) {
    Column(modifier = Modifier.fillMaxSize()) {
        // 상단 닫기 버튼
        Box(modifier = Modifier.fillMaxWidth()) {
            IconButton(
                onClick = onClose,
                modifier = Modifier.align(Alignment.TopEnd)
            ) {
                Icon(Icons.Default.Close, contentDescription = "닫기")
            }
        }

        LazyColumn(
            modifier = Modifier
                .weight(1f)
                .padding(horizontal = 16.dp),
            contentPadding = PaddingValues(vertical = 8.dp)
        ) {
            items(questions) {
                QuestionItem(it.question, it.answer)
            }

            if (isCreating) {
                item {
                    NewQuestionInput(
                        newQuestion = newQuestion,
                        answer = newAnswer,
                        onAnswerChange = onAnswerChange,
                        onCancel = onCancelCreating,
                        onSubmit = onSubmitAnswer
                    )
                }
            }
        }

        if (!isCreating) {
            Button(
                onClick = onStartCreating,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            ) {
                Text("질문 생성")
            }
        }
    }
}


@Composable
fun QuestionItem(question: String, answer: String) {
    Column(modifier = Modifier.padding(vertical = 8.dp)) {
        Text("• $question", fontWeight = FontWeight.Bold)
        Text(answer, modifier = Modifier.padding(start = 8.dp))
    }
}

@Composable
fun NewQuestionInput(
    newQuestion:String,
    answer: String,
    onAnswerChange: (String) -> Unit,
    onCancel: () -> Unit,
    onSubmit: () -> Unit
) {
    Column(modifier = Modifier.padding(vertical = 8.dp)) {
        Text(newQuestion, fontWeight = FontWeight.Bold)
        OutlinedTextField(
            value = answer,
            onValueChange = onAnswerChange,
            label = { Text("대답 입력") },
            modifier = Modifier.fillMaxWidth()
        )
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 8.dp),
            horizontalArrangement = Arrangement.End
        ) {
            TextButton(onClick = onCancel) {
                Text("취소")
            }
            Spacer(modifier = Modifier.width(8.dp))
            Button(onClick = onSubmit) {
                Text("답변")
            }
        }
    }
}

