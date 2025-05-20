package com.example.cracked_android

import android.net.Uri
import android.os.Build
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.annotation.RequiresExtension
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.cracked_android.pages.GraveInsidePage
import com.example.cracked_android.pages.GravePage
import com.example.cracked_android.pages.InfoPage
import com.example.cracked_android.pages.PortraitPage
import com.example.cracked_android.pages.SessionPage
import com.example.cracked_android.pages.StartPage
import com.example.cracked_android.ui.theme.Cracked_androidTheme
import com.example.cracked_android.viewModel.MainViewModel
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {


    @RequiresExtension(extension = Build.VERSION_CODES.S, version = 7)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val viewModel = hiltViewModel<MainViewModel>()
            Cracked_androidTheme {
                // A surface container using the 'background' color from the theme
                if(viewModel.getUserId()==null){
                    MyApp(startDestination = "StartPage")
                }else{
                    MyApp(startDestination = "GravePage")
                }
            }
        }
    }
}

@RequiresExtension(extension = Build.VERSION_CODES.S, version = 7)
@Composable
private fun MyApp(
    modifier: Modifier = Modifier,
    navController: NavHostController = rememberNavController(),
    startDestination: String = "StartPage"
) {

    Surface(
        modifier = Modifier.fillMaxSize(),
    ) {
        NavHost(navController = navController, startDestination = startDestination) {
            composable("StartPage") {
                StartPage{navController.navigate("InfoPage")}
            }
            composable("InfoPage") {
                InfoPage(onNextClick = {
                    //val encodedUrl = Uri.encode(it)
                    //navController.navigate("PortraitPage?imageUrl=$encodedUrl")
                    navController.navigate("PortraitPage")
                })
            }
            composable("PortraitPage",
                //arguments = listOf(navArgument("imageUrl") { type = NavType.StringType })
            ) {
                //val imageUrl = it.arguments?.getString("imageUrl") ?: ""
                PortraitPage(/**/){

                    navController.navigate("GravePage")
                }
            }
            composable("GravePage"){
                GravePage(onSessionClick = {
                    navController.navigate("SessionPage/$it")
                }, onGraveClick = {
                    navController.navigate("GraveInsidePage")
                })
            }
            composable ("SessionPage/{sessionId}"){
                val sessionId = it.arguments!!.getString("sessionId")!!
                SessionPage(sessionId){
                    navController.popBackStack()
                }
            }
            composable ("GraveInsidePage"){
                GraveInsidePage{navController.popBackStack()}
            }


        }
    }

}