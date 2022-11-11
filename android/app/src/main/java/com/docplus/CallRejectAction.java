package com.docplus;

import android.app.Service;
import android.content.Intent;
import android.os.Bundle;
import android.os.IBinder;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Timer;
import java.util.TimerTask;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationManagerCompat;
import io.socket.client.IO;
import io.socket.client.Manager;
import io.socket.client.Socket;

public class CallRejectAction extends Service {

    private Socket mSocket;

    @Override
    public void onCreate() {
        super.onCreate();
        try {
            Manager manager = new Manager(new URI("https://server.docplus.online"));
            mSocket = manager.socket("/chat");
            mSocket.connect();
        } catch (URISyntaxException e) {}
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Bundle extra=intent.getExtras();
        if(extra!=null) {
            //stop service and cancel notification
//            boolean isAnswerButton = extra.getBoolean("isAnswerButton");
            int notification_id = extra.getInt("notification_id");
            String firstName = extra.getString("firstName");
            String lastName = extra.getString("lastName");
            String _id = extra.getString("_id");
            String room = extra.getString("room");
            String type = extra.getString("type");
            String callType = extra.getString("callType");

            NotificationManagerCompat manager = NotificationManagerCompat.from(this);
            manager.cancel(notification_id);
            JSONObject obj=new JSONObject();
            try {
                obj.put("to",_id);
                obj.put("type",type);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            mSocket.emit("hangUpCall",obj);
//            new Timer().schedule(new TimerTask() {
//                @Override
//                public void run() {
//                    WritableMap param= Arguments.createMap();
//                    param.putString("reject","yes");
//                    param.putString("firstName",firstName);
//                    param.putString("lastName",lastName);
//                    param.putString("_id",_id);
//                    param.putString("room",room);
//                    param.putString("type",type);
//                    param.putString("callType",callType);
//                    CallNotificationModule.sendEvent("onReject",param);
//                }
//            },2000);
            stopSelf();
        }

        return START_NOT_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mSocket.disconnect();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
