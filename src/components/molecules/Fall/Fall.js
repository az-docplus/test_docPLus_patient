import React, {useRef, useState} from 'react';
import {Animated, Easing, useWindowDimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../styles/index';

function Fall({start, children}) {
  const dimen = useWindowDimensions();
  const screenHeight = dimen.height;
  const [showContent, setShowContent] = useState(false);
  const color = useRef(new Animated.Value(0)).current;
  const AnimatedLinearGradient = Animated.createAnimatedComponent(
    LinearGradient,
  );
  if (start) {
    Animated.timing(color, {
      toValue: 1,
      duration: 1000,
      delay: 300,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start(() => setShowContent(true));
  }
  return (
    <AnimatedLinearGradient
      style={{
        height: color.interpolate({
          inputRange: [0, 1],
          outputRange: [0, screenHeight],
        }),
        opacity: color.interpolate({
          inputRange: [0, 1],
          outputRange: [0.2, 1],
        }),
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
      }}
      useAngle={true}
      angle={0}
      colors={[Colors.header_grad_one, Colors.header_grad_two]}>
      {showContent && children}
    </AnimatedLinearGradient>
  );
}

export default Fall;
