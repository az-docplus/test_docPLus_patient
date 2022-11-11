import React, {useEffect, useRef} from 'react';
import {View, Animated, Easing} from 'react-native';

function AnimatedErrorText({text, color = 'red', style}) {
  const errorText = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(errorText, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  });

  return (
    <Animated.Text
      style={[
        {
          color: `${color}`,
          marginLeft: '4.5%',
          marginTop: '1%',
          transform: [
            {
              perspective: 800,
            },
            {
              translateY: errorText.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, -10, 0],
              }),
            },
            {
              scaleY: errorText,
            },
          ],
        },
        style && style,
      ]}>
      {text}
    </Animated.Text>
  );
}

export default AnimatedErrorText;
