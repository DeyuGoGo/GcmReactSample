package com.gcmreactsample;

import android.graphics.Color;
import android.util.Log;

import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

/**
 * Created by huangeyu on 15/11/20.
 */
public class DeyuViewManager extends SimpleViewManager<DeyuView> {
    public static final String REACT_CLASS = "RCTDeyuView";
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected DeyuView createViewInstance(ThemedReactContext reactContext) {
        return new DeyuView(reactContext);
    }

    @ReactProp(name = "DeyuColor" ,defaultInt = Color.BLUE)
    public void setDeyuColor(DeyuView view, int color) {
        view.setBackgroundColor(color);
        Log.d("DeyuView","setDeyuColor : " + color);
    }


}
