package com.meetme;


import java.util.Arrays;
import com.facebook.react.shell.MainReactPackage;
import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.react.rnspinkit.RNSpinkitPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.taluttasgiran.rnsecurestorage.RNSecureStoragePackage;
import com.horcrux.svg.SvgPackage;
import com.github.wuxudong.rncharts.MPAndroidChartPackage;
import com.reactnativecommunity.picker.RNCPickerPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.filepicker.FilePickerPackage;
import org.wonday.orientation.OrientationPackage;
import org.wonday.orientation.OrientationActivityLifecycle;
import com.brentvatne.react.ReactVideoPackage;
import com.imagepicker.ImagePickerPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.github.douglasjunior.reactNativeGetLocation.ReactNativeGetLocationPackage;
import com.johnsonsu.rnsoundplayer.RNSoundPlayerPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import androidx.multidex.MultiDexApplication;

import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;




public class MainApplication extends MultiDexApplication  implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

                  @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSpinkitPackage(),
            new BackgroundTimerPackage(),
            new ReactNativePushNotificationPackage(),
            new RNSecureStoragePackage(),
            new SvgPackage(),
            new MPAndroidChartPackage(),
            new RNCPickerPackage(),
            new ReactSliderPackage(),
            new FilePickerPackage(),
            new OrientationPackage(),
            new ReactVideoPackage(),
            new ImagePickerPackage(),
            new RNSoundPackage(),
            new ReactNativeAudioPackage(),
            new ReactNativeGetLocationPackage(),
            new RNSoundPlayerPackage(),
            new RNFirebasePackage(),
            new NetInfoPackage(),
            new VectorIconsPackage(),
            new AsyncStoragePackage(),
            new SafeAreaContextPackage(),
            new LinearGradientPackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new RNFirebaseFirestorePackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseStoragePackage()

      );
    }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    registerActivityLifecycleCallbacks(OrientationActivityLifecycle.getInstance());
    
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.meetme.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
