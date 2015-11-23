package com.gcmreactsample;

import android.util.Log;
import android.view.View;
import android.widget.Button;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by huangeyu on 15/11/20.
 */
public class DeyuButtonManager  extends SimpleViewManager<Button> {

    private Button mBtn ;
    private ReactContext mContext;

    public static final String REACT_CLASS = "DeyuButton";
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected Button createViewInstance(ThemedReactContext reactContext) {
        mContext = reactContext;
        mBtn = new Button(reactContext);
        mBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d("DeyuButtonManager","onClick");
                onReceiveNativeEvent();
            }
        });
        return mBtn;
    }

    public void onReceiveNativeEvent() {
        WritableMap event = Arguments.createMap();
        event.putString("message", "MyMessage");
        ReactContext reactContext = (ReactContext)mBtn.getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                mBtn.getId(),
                "topChange",
                event);
    }

}
