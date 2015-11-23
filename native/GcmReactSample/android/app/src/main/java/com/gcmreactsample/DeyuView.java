package com.gcmreactsample;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by huangeyu on 15/11/20.
 */
public class DeyuView extends View{
    public DeyuView(Context context) {
        super(context);
        init();
    }

    public DeyuView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public DeyuView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    private void init(){
        setBackgroundColor(Color.BLUE);
        setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                onReceiveNativeEvent();
            }
        });
        onReceiveNativeEvent();
    }
    public void onReceiveNativeEvent() {
        Log.d("DeyuView" , "onReceiveNativeEvent");
        WritableMap event = Arguments.createMap();
        event.putString("message", "MyMessage");
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                "topChange",
                event);
    }
}
