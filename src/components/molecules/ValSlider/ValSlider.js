import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text, PanResponder, Animated} from 'react-native';
import Line from '../../atoms/Line/Line';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function ValSlider({value = 0}) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [age, setAge] = useState(value);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // pan.setOffset({
        //   x: pan.x._value,
        //   y: pan.y._value,
        // });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        listener: (event, gestureState) =>
          setAge(Math.ceil(event.nativeEvent.locationX)),
        useNativeDriver: false,
      }),
      onPanResponderRelease: e => {
        // console.log('tap release ' + e.nativeEvent.locationX);
      },
    }),
  ).current;

  return (
    <View style={Styles.Container} {...panResponder.panHandlers}>
      <Text style={{alignSelf: 'center', marginBottom: 5}}>{age}</Text>
      <View style={Styles.LineContainer}>
        <Line />
        <Line />
        <Line />
        <Line />
        <Line style={{height: 25}} />
        <Line />
        <Line />
        <Line />
        <Line />
        <Line style={{height: 25}} />
        <Line />
        <Line />
        <Line />
        <Line />
        <Line style={{height: 25}} />
        <Line />
        <Line />
        <Line />
        <Line />
        <Line style={{height: 25}} />
        <Line />
        <Line />
      </View>
      <Animated.View
        style={[
          Styles.PointerContainer,
          {
            transform: [{translateX: pan.x}],
          },
        ]}>
        <MaterialCommunityIcons name="triangle" size={20} />
      </Animated.View>
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
  },
  LineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
});

export default ValSlider;
