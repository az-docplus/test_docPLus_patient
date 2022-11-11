import React, {useRef} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text} from 'react-native';

function PanResponderComponent() {
  const pan = useRef(new Animated.Value()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        val.setOffset(val._value);
      },
      onPanResponderMove: Animated.event([null, {dy: val}]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          val.flattenOffset();
          Animated.timing(val, {
            toValue: height * 0.6,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }).start(() => {
            val.setValue(height * 0.6);
            val.setOffset(0);
          });
        } else {
          val.flattenOffset();
          Animated.timing(val, {
            toValue: height * 0.01,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }).start(() => {
            val.setValue(height * 0.01);
            val.setOffset(0);
          });
        }
        // val.flattenOffset();
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Animated.View
        style={{
          transform: [{translateY: pan.y}],
        }}
        {...panResponder.panHandlers}>
        <View style={styles.box} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default PanResponderComponent;
