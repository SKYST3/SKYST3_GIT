package com.example.cracked_android.pages

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.cracked_android.network.dto.ChatContent
import com.example.cracked_android.ui.theme.NewQuestionInput
import com.example.cracked_android.ui.theme.QuestionItem
import com.example.cracked_android.viewModel.SessionViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

@Composable
fun SessionPage(
    sessionId:String,
    viewModel:SessionViewModel = hiltViewModel<SessionViewModel>(),
    onBackClick: () -> Unit
) {
    val questions by viewModel.questions.collectAsState()
    var isCreating by remember { mutableStateOf(false) }
    val newQuestion by viewModel.newQuestion.collectAsState()
    val newAnswer by viewModel.newAnswer.collectAsState()

    LaunchedEffect(Unit){
        viewModel.fetchQuestions(sessionId)
    }

    Column(modifier = Modifier.fillMaxSize()) {
        TopBar(onBackClick)

        QuestionList(
            modifier = Modifier
                .weight(1f),
            questions = questions,
            newQuestion = newQuestion,
            isCreating = isCreating,
            newAnswer = newAnswer,
            onAnswerChange = { viewModel.setNewAnswer(it) },
            onSubmit = {
                if (newAnswer.isNotBlank()) {
                    CoroutineScope(Dispatchers.IO).launch {
                        viewModel.answerQuestion(sessionId)
                        viewModel.addQuestion(sessionId)
                        withContext(Dispatchers.Main){
                            viewModel.setNewQuestion("")
                            viewModel.setNewAnswer("")
                            isCreating = false
                        }
                    }


                }
            },
            onCancel = {
                viewModel.setNewAnswer("")
                isCreating = false
            }
        )

        if (!isCreating) {
            Button(
                onClick = {
                    CoroutineScope(Dispatchers.IO).launch{
                        val response = viewModel.createQuestion(sessionId)
                        withContext(Dispatchers.Main){
                            if(response.isSuccessful){
                                viewModel.setNewQuestion(response.body()!!.question)
                                isCreating = true
                            }
                        }
                    }
                },
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
fun TopBar(onBackClick: () -> Unit) {
    Box(modifier = Modifier.fillMaxWidth()) {
        IconButton(onClick = onBackClick) {
            Icon(Icons.Default.ArrowBack, contentDescription = "이전")
        }
    }
}

@Composable
fun QuestionList(
    modifier: Modifier=Modifier,
    questions: List<ChatContent>,
    newQuestion:String,
    isCreating: Boolean,
    newAnswer: String,
    onAnswerChange: (String) -> Unit,
    onSubmit: () -> Unit,
    onCancel: () -> Unit
) {
    LazyColumn(
        modifier = modifier
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
                    onSubmit = onSubmit,
                    onCancel = onCancel
                )
            }
        }
    }
}

