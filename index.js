import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Main from './Main';
// import Search from './example/Search';
import messaging from '@react-native-firebase/messaging';
import {CallNotification} from './src/NativeModules';
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from 'react-native-push-notification';
// import SearchComponent from './example/Search';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    // console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.log(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

PushNotification.createChannel({
    channelId: '123456789', // (required)
    channelName: 'Default', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log({remoteMessage}, '^^^^^^^^^');
  console.log('Message handled in the background! ', typeof remoteMessage);

  if (remoteMessage?.data?.title || remoteMessage?.data?.description) {
    PushNotification.localNotification({
      channelId: '123456789',
      title: remoteMessage?.data?.title,
      message: remoteMessage?.data?.description,
    });
    return;
  }
  // const {data} = JSON.parse(remoteMessage);
  const User = JSON.parse(remoteMessage.data.User); //object
  const room = JSON.parse(remoteMessage.data.room); //string
  const type = JSON.parse(remoteMessage.data.type); //string
  const callType = JSON.parse(remoteMessage.data.callType);
  //not imp
  //   const fromSocket = JSON.parse(data.fromSocket); //string
  //   const mySockets = JSON.parse(data.mySockets); //array

  CallNotification.createNotification(
    User.firstName,
    User.lastName,
    User._id,
    room,
    type,
    callType,
    12,
  );
});

//debug android clientId : 778881852588-q47o149rer6vvcvgt3p4a6d18vu16au5.apps.googleusercontent.com
GoogleSignin.configure({
  // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  // webClientId:
  //   '490030510009-hs7n7ctc4hp2lsjaa17ueh7qakv7e234.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  androidClientId:
    '778881852588-mrg4qa0l5ksiq4okp6tq00dh54s9k6u5.apps.googleusercontent.com',
  // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
  // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  // accountName: '', // [Android] specifies an account name on the device that should be used
  // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});
//import Home from './src/components/atoms2/doctor-card/doctor-card.js';
//import Home from './src/screens/patient/home/Home'
AppRegistry.registerComponent(appName, () => Main);
