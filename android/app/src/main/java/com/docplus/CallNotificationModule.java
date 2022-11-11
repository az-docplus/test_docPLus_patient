package com.docplus;

import android.content.Intent;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import androidx.annotation.NonNull;
public class CallNotificationModule extends ReactContextBaseJavaModule{
    private static ReactApplicationContext mContext;

    CallNotificationModule(ReactApplicationContext context) {
        super(context);
        mContext=context;
    }


    public static void sendEvent(String event, WritableMap params) {
        mContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(event, params);
    }
    @ReactMethod
    public void createNotification(String firstName,String lastName,String _id,String room,String type,String callType,Integer notificationId){
        Intent intent=new Intent(mContext,CallService.class);
        intent.putExtra("firstName",firstName);
        intent.putExtra("lastName",lastName);
        intent.putExtra("_id",_id);
        intent.putExtra("room",room);
        intent.putExtra("type",type);
        intent.putExtra("notificationId",notificationId);
        intent.putExtra("callType",callType);
        mContext.startService(intent);
    }

    @NonNull
    @Override
    public String getName() {
        return "CallNotification";
    }

}
