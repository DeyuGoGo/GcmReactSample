package com.gcmreactsample;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by huangeyu on 15/11/20.
 */
    public class ViewEEE extends Event<ViewEEE> {
        public static final String EVENT_NAME = "topChange";
        public ViewEEE(int viewId, long timestampMs) {
            super(viewId, timestampMs);
        }

        @Override
        public String getEventName() {
            return EVENT_NAME;
        }

        @Override
        public short getCoalescingKey() {
            return 0;
        }

        @Override
        public void dispatch(RCTEventEmitter rctEventEmitter) {
            rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
        }

        private WritableMap serializeEventData() {
            WritableMap eventData = Arguments.createMap();
            eventData.putString("message", "MyMessage");
            return eventData;
        }

}
