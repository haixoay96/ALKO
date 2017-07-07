package com.tzusman.alko;

import android.app.Application;
import android.util.Log;
import android.support.multidex.MultiDex;
import android.content.Context;
import com.facebook.react.ReactApplication;
import com.transistorsoft.rnbackgroundgeolocation.RNBackgroundGeolocation;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.ivanwu.googleapiavailabilitybridge.ReactNativeGooglePlayServicesPackage;
import io.fullstack.firestack.FirestackPackage;
import com.joshblour.reactnativepermissions.ReactNativePermissionsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  @Override
  protected void attachBaseContext(Context base) {
      super.attachBaseContext(base);
      MultiDex.install(this);
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNBackgroundGeolocation(),
            new PickerPackage(),
            new FIRMessagingPackage(),
            new RNFetchBlobPackage(),
            new ReactNativeGooglePlayServicesPackage(),
            new FirestackPackage(),
            new ReactNativePermissionsPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
            new MapsPackage(),
            new ReactNativeI18n(),
            new RNDeviceInfo(),
            new ReactNativeConfigPackage()
      );
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
  }
}
