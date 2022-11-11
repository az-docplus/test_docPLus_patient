package com.docplus;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;
import android.widget.RemoteViews;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

public class CallService extends Service {

    @Override
    public void onCreate() {
        createNotificationChannel();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        Bundle extra=intent.getExtras();
        if(extra!=null){
            String firstName=extra.getString("firstName");
            String lastName=extra.getString("lastName");
            String _id=extra.getString("_id");
            String room=extra.getString("room");
            String type=extra.getString("type");
            int notificationId=extra.getInt("notificationId");
            String callType=extra.getString("callType");

            Log.d("CallService ","received intent in callService ");
//
//            Intent fullScreenIntent = new Intent(this, MainActivity.class);
            Intent answerIntent = new Intent(this, CallActions.class);
            answerIntent.putExtra("isAnswerButton",true);
            answerIntent.putExtra("notification_id",notificationId);
            answerIntent.putExtra("firstName",firstName);
            answerIntent.putExtra("lastName",lastName);
            answerIntent.putExtra("_id",_id);
            answerIntent.putExtra("room",room);
            answerIntent.putExtra("type",type);
            answerIntent.putExtra("callType",callType);

            Intent declineIntent = new Intent(this, CallRejectAction.class);
            declineIntent.putExtra("isAnswerButton",false);
            declineIntent.putExtra("notification_id",notificationId);
            declineIntent.putExtra("firstName",firstName);
            declineIntent.putExtra("lastName",lastName);
            declineIntent.putExtra("_id",_id);
            declineIntent.putExtra("room",room);
            declineIntent.putExtra("type",type);
            declineIntent.putExtra("callType",callType);

//            PendingIntent fullScreenPendingIntent = PendingIntent.getActivity(this, 0,
//                    fullScreenIntent, PendingIntent.FLAG_UPDATE_CURRENT);
            PendingIntent answerPendingIntent = PendingIntent.getService(this, 0,
                    answerIntent, PendingIntent.FLAG_UPDATE_CURRENT);
            PendingIntent declinePendingIntent = PendingIntent.getService(this, 0,
                    declineIntent, PendingIntent.FLAG_UPDATE_CURRENT);

            RemoteViews remoteview=new RemoteViews(getPackageName(),R.layout.custom_call_notification);

//        remoteview.setIntent(R.id.btnAnswer,"onPressAnswer",answerIntent);
//        remoteview.setTextViewText(R.id.name,"Ayush tripathi");
            remoteview.setTextViewText(R.id.name,firstName+" "+lastName);
            remoteview.setOnClickPendingIntent(R.id.btnAnswer,answerPendingIntent);
            remoteview.setOnClickPendingIntent(R.id.btnDecline,declinePendingIntent);
            NotificationCompat.Builder notificationBuilder  = new NotificationCompat.Builder(this,"2")
                        .setContentTitle("DocPlus")
                        .setContentText("IncomingCall")
                        .setTicker("CALL_STATUS")
                        .setSmallIcon(R.drawable.ic_baseline_account_circle_24)
        //                .setDefaults(Notification.DEFAULT_LIGHTS|Notification.DEFAULT_SOUND)
                        .setCategory(NotificationCompat.CATEGORY_CALL)
                        .setPriority(NotificationCompat.PRIORITY_MAX)
                        .setCustomBigContentView(remoteview)
                        .setCustomContentView(remoteview)
//                        .setFullScreenIntent(fullScreenPendingIntent,true)
        //                .setStyle(new NotificationCompat.DecoratedCustomViewStyle())
                        .setCustomHeadsUpContentView(remoteview);

                Notification incomingCall=notificationBuilder.build();
                NotificationManagerCompat notificationManager=NotificationManagerCompat.from(this);
                notificationManager.notify(notificationId,incomingCall);
//        startForeground(1124,incomingCall);
        }
        return START_NOT_STICKY;
    }


    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            long[] pattern={1000,1500,1000,1500,1000,1500,1000,1500,1000,1500,1000,1500};
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel channel = new NotificationChannel("2","a notif", importance);
            channel.enableVibration(true);
            channel.setVibrationPattern(pattern);
//            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    @Override
    public void onDestroy() {
        Toast.makeText(this, "service ended", Toast.LENGTH_SHORT).show();
        Log.d("CallService ","destroyed");
        //broadcast a message
        super.onDestroy();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
