import React, {useRef, useEffect} from 'react';
import {View, Animated, Easing, A} from 'react-native';
import Curve from '../../../components/atoms/Curve/Curve';

function ForgotPassword() {
  const translate = useRef(new Animated.Value(0)).current;
  const val = Math.floor(Math.random() * 300);
  useEffect(() => {
    Animated.loop(
      Animated.timing(translate, {
        toValue: 1,
        duration: 2000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ).start(() => {
      val = Math.floor(Math.random() * 300);
    });
  });
  return (
    <View style={{flex: 1}}>
      <Curve
        style={{
          transform: [
            {
              translateX: translate.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, val, 0],
              }),
            },
            {
              translateY: translate.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 200, 0],
              }),
            },
          ],
        }}
        Size={80}
        Rotate={1}
        ScaleX={3}
      />
    </View>
  );
}

export default ForgotPassword;
