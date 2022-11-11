import { NativeModules, NativeEventEmitter } from 'react-native';
const { CallNotification } = NativeModules;
const eventEmitter = new NativeEventEmitter(CallNotification);

export { CallNotification, eventEmitter };
