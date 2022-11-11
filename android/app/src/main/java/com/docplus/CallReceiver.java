package com.docplus;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import java.util.Timer;
import java.util.TimerTask;

public class CallReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {

        //getextra    ////
        Bundle extra = intent.getExtras();

        if(extra!=null){
            boolean isAnswerButton=extra.getBoolean("isAnswerButton");
            String firstName=extra.getString("firstName");
            String lastName=extra.getString("lastName");
            String _id=extra.getString("_id");
            String room=extra.getString("room");
            String type=extra.getString("type");
            String callType=extra.getString("callType");

            if(isAnswerButton){
                Intent intent1=new Intent(context,MainActivity.class);
                //try not creating new task every time--v
//        intent1.addFlags(Intent.FLAG_ACTIVITY_MULTIPLE_TASK);
                intent1.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(intent1);
                new Timer().schedule(new TimerTask() {
                    @Override
                    public void run() {
                        WritableMap param=Arguments.createMap();
                        param.putString("answer","yes");
                        param.putString("firstName",firstName);
                        param.putString("lastName",lastName);
                        param.putString("_id",_id);
                        param.putString("room",room);
                        param.putString("type",type);
                        param.putString("callType",callType);
                        CallNotificationModule.sendEvent("onAnswer",param);
                    }
                },2000);
            }

        }

    }
}
