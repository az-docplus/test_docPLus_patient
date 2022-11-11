package com.docplus;

import android.app.Service;
import android.content.Intent;
import android.os.Bundle;
import android.os.IBinder;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationManagerCompat;

public class CallActions extends Service {

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

    Bundle extra=intent.getExtras();
    if(extra!=null){
            //stop service and cancel notification
         boolean isAnswerButton=extra.getBoolean("isAnswerButton");
         int notification_id=extra.getInt("notification_id");
         String firstName=extra.getString("firstName");
         String lastName=extra.getString("lastName");
         String _id=extra.getString("_id");
         String room=extra.getString("room");
         String type=extra.getString("type");
         String callType=extra.getString("callType");

         NotificationManagerCompat manager=NotificationManagerCompat.from(this);
         manager.cancel(notification_id);

         if(isAnswerButton){
                Intent mIntent=new Intent(this,CallReceiver.class);
                mIntent.putExtra("isAnswerButton",isAnswerButton);
                mIntent.putExtra("firstName",firstName);
                mIntent.putExtra("lastName",lastName);
                mIntent.putExtra("_id",_id);
                mIntent.putExtra("room",room);
                mIntent.putExtra("type",type);
                mIntent.putExtra("callType",callType);
//
//            mIntent.addFlags(Intent.FLAG_ACTIVITY_MULTIPLE_TASK);
//            mIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
////            mIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
////            mIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                sendBroadcast(mIntent);
//            startActivity(mIntent);
         }

    }

        stopSelf();
        return START_NOT_STICKY;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
