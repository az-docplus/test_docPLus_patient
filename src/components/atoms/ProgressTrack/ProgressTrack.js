import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';

function ProgressTrack({ProgressVal, progressColor}) {
  const animatedBar = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedBar, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(),
      delay: 1000,
      useNativeDriver: false,
    }).start();
  });

  return (
    <View style={[Styles.Container]}>
      <Animated.View
        style={[
          Styles.Progress,
          {
            backgroundColor: progressColor,
            width: animatedBar.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', `${ProgressVal}%`],
            }),
          },
        ]}></Animated.View>
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    height: 4,
    width: '100%',
    backgroundColor: 'rgba(207, 206, 206, 0.56)',
  },
  Progress: {
    height: '100%',
    width: '0%',
    maxWidth: '100%',
  },
});
export default ProgressTrack;
