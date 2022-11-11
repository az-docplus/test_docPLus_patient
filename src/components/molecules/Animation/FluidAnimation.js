import React, {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';
export default function FluidAnimation({
  children,
  duration = 300,
  delay = 200,
  ty = -25,
  tx = -25,
  scale = 1,
  opacity = 0,
  basicLayoutStyle = {},
}) {
  /**
   * ========= Animation control =============
   */
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: duration,
      delay: delay,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [anim, delay, duration]);
  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [ty, 0],
  });
  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [tx, 0],
  });
  const _scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [scale, 1],
  });
  const _opacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [opacity, 1],
  });
  /**
   * ========= Animation control END =============
   */
  return (
    <Animated.View
      style={{
        opacity: _opacity,
        transform: [
          {
            translateX,
          },
          {
            translateY,
          },
          {
            scale: _scale,
          },
          {
            perspective: 200,
          },
        ],
        ...basicLayoutStyle,
      }}>
      {children}
    </Animated.View>
  );
}
