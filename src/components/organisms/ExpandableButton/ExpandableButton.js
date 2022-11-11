import React, {useRef, useEffect, useState} from 'react';
import {
  Animated,
  TouchableOpacity,
  Text,
  Easing,
  Dimensions,
} from 'react-native';

function ExpandableButton({
  width,
  height,
  expandedWidth,
  expandedHeight,
  expandedTop,
  onPress,
  buttonText,
}) {
  let count = 0;
  const translate = useRef(new Animated.Value(0)).current;
  const [heightOffsetCurrent, setHeightOffsetCurrent] = useState(0);
  const widthAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;
  const startAnim = () => {
    Animated.sequence([
      Animated.timing(widthAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.bezier(0.15, 0.63, 0.8, 1.18),
        useNativeDriver: false,
      }),
      //   Animated.timing(translate, {
      //     toValue: 1,
      //     easing: Easing.ease,
      //     duration: 100,
      //     useNativeDriver: false,
      //   }),
      Animated.timing(heightAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.bezier(0.15, 0.63, 0.8, 1.18),
        useNativeDriver: false,
      }),
    ]).start();
  };
  const onPressButton = () => {
    onPress(startAnim);
  };
  const onLayout = props => {
    if (count === 0) {
      setHeightOffsetCurrent(props.nativeEvent.layout.y);
      count++;
    }
  };
  return (
    <Animated.View
      onLayout={onLayout}
      style={{
        width: width,
        height: height,
        backgroundColor: '#EB4B2B',
        borderRadius: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        zIndex: 9999,
        // transform: [
        //   {
        //     translateY: translate.interpolate({
        //       inputRange: [0, 0.5, 1],
        //       outputRange: [0, -20, 0],
        //     }),
        //   },
        // ],
        height: heightAnim.interpolate({
          inputRange: [0, 0.4, 1],
          outputRange: [height, expandedHeight / 9, expandedHeight],
        }),
        top: heightAnim.interpolate({
          inputRange: [0, 0.4, 1],
          outputRange: [
            0,
            -expandedTop / 8,
            -(expandedTop + heightOffsetCurrent),
          ],
        }),
        width: widthAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [width, expandedWidth],
        }),
        borderRadius: widthAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 0],
        }),
      }}>
      <TouchableOpacity
        onPress={onPressButton}
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {buttonText}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default ExpandableButton;
