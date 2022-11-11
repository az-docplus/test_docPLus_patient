package com.docplus;


import android.os.Build;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

import androidx.annotation.RequiresApi;
import androidx.core.content.ContextCompat;

public class MainActivity extends ReactActivity {

  @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    Window window = MainActivity.this.getWindow();
    window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
    window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
    window.setStatusBarColor(ContextCompat.getColor(MainActivity.this, R.color.white));
    // SplashScreen.show(this,true);
    super.onCreate(savedInstanceState);
    //if intent available don't start splash... otherwise start
  }

    /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  @Override
  protected String getMainComponentName() {
    return "DocMz_v2";
  }

}
