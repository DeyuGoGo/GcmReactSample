package com.gcmreactsample;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.gcmreactsample.gcm.QuickstartPreferences;
import com.gcmreactsample.gcm.RegistrationIntentService;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by huangeyu on 15/11/20.
 */
public class DeyuGcm extends ReactContextBaseJavaModule {

    public static final String REACT_CLASS = "DeyuGcm";

    private ReactApplicationContext mContext;

    private boolean isReg = false;
    private BroadcastReceiver mRegistrationBroadcastReceiver;
    private static final int PLAY_SERVICES_RESOLUTION_REQUEST = 9000;
    private static final String TAG = "MainActivity";

    public DeyuGcm(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext=reactContext;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        return constants;
    }

    @ReactMethod
    public void regGcm(String userId) {
        tryGcm(userId);
    }

    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
        if(isReg)LocalBroadcastManager.getInstance(mContext).unregisterReceiver(mRegistrationBroadcastReceiver);
    }

    private void tryGcm(final String userId){

        mRegistrationBroadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                SharedPreferences sharedPreferences =
                        PreferenceManager.getDefaultSharedPreferences(context);
                boolean sentToken = sharedPreferences
                        .getBoolean(QuickstartPreferences.SENT_TOKEN_TO_SERVER, false);
                WritableMap params = Arguments.createMap();
                params.putString("deyu", "popo");
                sendEvent("registration_complete", params);
                if (sentToken) {

                } else {

                }
            }
        };
        LocalBroadcastManager.getInstance(mContext).registerReceiver(mRegistrationBroadcastReceiver,
                new IntentFilter(QuickstartPreferences.REGISTRATION_COMPLETE));
        isReg =true;
        if (checkPlayServices()) {
            // Start IntentService to register this application with GCM.
            Intent intent = new Intent(mContext, RegistrationIntentService.class);
            intent.putExtra(RegistrationIntentService.EXTRAS_USERID,userId);
            mContext.startService(intent);
        }
    }
    private boolean checkPlayServices() {
        GoogleApiAvailability apiAvailability = GoogleApiAvailability.getInstance();
        int resultCode = apiAvailability.isGooglePlayServicesAvailable(mContext);
        if (resultCode != ConnectionResult.SUCCESS) {
            if (apiAvailability.isUserResolvableError(resultCode)) {
//                apiAvailability.getErrorDialog(this, resultCode, PLAY_SERVICES_RESOLUTION_REQUEST)
//                        .show();
            } else {
                Log.i(TAG, "This device is not supported.");
//                finish();
            }
            return false;
        }
        return true;
    }


    private void sendEvent(String eventName,
                           @Nullable WritableMap params) {
        mContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}
