import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import ButtonCompo from './components/atoms2/button/button';
import Video from 'react-native-video';
export default function Splash(props) {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
        }}>
        {/* <TouchableOpacity
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 30,
            zIndex: 2,
            right: 20,
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Gilroy-Medium',
              fontSize: 20,
            }}>
            skip
          </Text>
          <Entypo name="chevron-thin-right" size={22} />
        </TouchableOpacity> */}
        <Video
          source={require('../assets/logo.mp4')}
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode={'cover'}
          onEnd={() => props.navigation.replace('Store')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
        {/* <LottieView
          source={require('./assets/Splash.json')}
          autoPlay
          loop={false}
          speed={3.5}
          onAnimationFinish={() => {
            console.log('Animation Finished!');
            // props.navigation.replace('Store');
          }}
        /> */}
        <View
          style={{
            position: 'absolute',

            zIndex: 2,

            bottom: 60,
          }}>
          <Text style={{ color: '#51B7B7', fontSize: 16 }}>
            Get Treated. Anytime, Anywhere!
          </Text>
        </View>
      </View>
    </>
  );
}