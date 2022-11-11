import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import {INACTIVE_STEP, NEW_PRIMARY_COLOR} from '../../../styles/colors';
import {useIsDrawerOpen} from '@react-navigation/drawer';
function ProgressIndicator({text, completed, style}) {
  const progressWidth = useRef(new Animated.Value(0)).current;
  const isDrawerOpen = useIsDrawerOpen();
  useEffect(() => {
    Animated.timing(progressWidth, {
      toValue: isDrawerOpen ? 1 : 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [isDrawerOpen]);
  return (
    <View
      style={[
        {
          width: '80%',
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: 5,
          //   backgroundColor: 'red',
        },
        style ? style : null,
      ]}>
      <View
        style={[
          styles.indicator,
          {backgroundColor: INACTIVE_STEP, width: '100%'},
        ]}>
        <Animated.View
          style={{
            height: '100%',
            width: progressWidth.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', `${completed}%`],
            }),
            backgroundColor: NEW_PRIMARY_COLOR,
          }}></Animated.View>
      </View>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{fontSize: 24, fontFamily: 'Montserrat-Regular'}}>
        {text}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  indicator: {
    height: 5,
    borderRadius: 20,
  },
});

export default ProgressIndicator;
