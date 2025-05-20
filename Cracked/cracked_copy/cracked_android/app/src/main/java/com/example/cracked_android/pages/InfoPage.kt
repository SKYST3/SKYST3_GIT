package com.example.cracked_android.pages

import android.net.Uri
import android.net.http.HttpException
import android.os.Build
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.annotation.RequiresExtension
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.KeyboardArrowLeft
import androidx.compose.material.icons.filled.KeyboardArrowRight
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import coil.compose.rememberImagePainter
import com.example.cracked_android.viewModel.InfoViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext


@RequiresExtension(extension = Build.VERSION_CODES.S, version = 7)
@Composable
fun InfoPage(
    onNextClick: () -> Unit,
    viewModel: InfoViewModel = hiltViewModel<InfoViewModel>()
) {
    val imageUri by viewModel.imageUri.collectAsState()
    val username by viewModel.username.collectAsState()
    val genderIsMale by viewModel.genderIsMale.collectAsState()
    val age by viewModel.age.collectAsState()
    //val scope = rememberCoroutineScope()
    val context = LocalContext.current
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        PhotoPicker(imageUri){
            viewModel.setImageUri(it)
        }
        Spacer(modifier = Modifier.height(24.dp))
        NameInput(username){
            viewModel.setUsername(it)
        }
        Spacer(modifier = Modifier.height(24.dp))
        GenderSelector(genderIsMale){
            viewModel.setGender(it)
        }
        Spacer(modifier = Modifier.height(24.dp))
        AgePicker(age){
            viewModel.setAge(it)
        }
        Spacer(modifier = Modifier.height(32.dp))
        NextButton(enabled = imageUri!=null && genderIsMale!=null && username !="") {
            CoroutineScope(Dispatchers.IO).launch {
                try {
                    val response = viewModel.registerUser(
                        username,
                        if(genderIsMale!!) "male" else "female",
                        age,
                        viewModel.uriToFile(context,imageUri!!))
                    withContext(Dispatchers.Main) {
                        if(response.isSuccessful){
                            viewModel.setUserId(response.body()!!.userId)
                            onNextClick()
                        }
                    }
                } catch (e:HttpException){

                }
            }
        }
    }
}

@Composable
fun PhotoPicker(
    imageUri:Uri?,
    setImageUri: (Uri?) -> Unit) {
    val launcher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        setImageUri(uri)
    }

    Box(
        modifier = Modifier
            .size(120.dp)
            .clip(RoundedCornerShape(8.dp))
            .background(Color.Gray.copy(alpha = 0.2f))
            .clickable { launcher.launch("image/*") },
        contentAlignment = Alignment.Center
    ) {
        if (imageUri != null) {
            Image(
                painter = rememberImagePainter(imageUri),
                contentDescription = null,
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )
        } else {
            Icon(
                imageVector = Icons.Default.Add,
                contentDescription = "Add Photo",
                modifier = Modifier.size(48.dp),
                tint = Color.DarkGray
            )
        }
    }
}

@Composable
fun NameInput(username:String, setUsername: (String)->Unit) {

    OutlinedTextField(
        value = username,
        onValueChange = setUsername,
        label = { Text("당신의 이름을 알려주세요") },
        singleLine = true,
        modifier = Modifier.fillMaxWidth(0.9f)
    )
}

@Composable
fun GenderSelector(genderIsMale:Boolean?,setGender:(Boolean)->Unit) {

    Row(
        horizontalArrangement = Arrangement.spacedBy(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        GenderOption("남", genderIsMale==true,setGender)
        GenderOption("여", genderIsMale==false,setGender)
    }
}

@Composable
fun GenderOption(label: String, isSelected: Boolean, onSelect: (isMale:Boolean) -> Unit) {
    OutlinedButton(
        onClick = { onSelect(label=="남") },
        colors = ButtonDefaults.outlinedButtonColors(
            containerColor = if (isSelected) Color.LightGray else Color.Transparent
        )
    ) {
        Text(label)
    }
}

@Composable
fun AgePicker(age:Int, setAge:(Int)->Unit) {

    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text("당신은 몇 살인가요?", style = MaterialTheme.typography.bodyLarge)
        Spacer(modifier = Modifier.height(8.dp))
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = { if (age > 0) setAge(age-1) }) {
                Icon(Icons.Default.KeyboardArrowLeft, contentDescription = "나이 감소")
            }
            Text("$age 세", fontSize = 20.sp)
            IconButton(onClick = { if (age < 120) setAge(age+1) }) {
                Icon(Icons.Default.KeyboardArrowRight, contentDescription = "나이 증가")
            }
        }
    }
}

@Composable
fun NextButton(
    enabled:Boolean = true,
    onClick: () -> Unit) {
    Button(
        onClick = onClick,
        modifier = Modifier
            .fillMaxWidth(0.9f)
            .height(56.dp),
        enabled = enabled,
        shape = RoundedCornerShape(12.dp)
    ) {
        Text("나의 마지막 문장을 찾아서")
    }
}
