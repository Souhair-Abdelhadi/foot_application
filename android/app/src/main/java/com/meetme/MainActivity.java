package com.meetme;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.content.res.Configuration;
import org.json.JSONObject;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "meetme";
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
       super.onConfigurationChanged(newConfig);
       Intent intent = new Intent("onConfigurationChanged");
       intent.putExtra("newConfig", newConfig);
       this.sendBroadcast(intent);
   }
  
  @Override
  public void invokeDefaultOnBackPressed() {
      moveTaskToBack(true);
  }

}
