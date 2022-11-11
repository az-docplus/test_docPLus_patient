import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, Animated} from 'react-native';
import {Colors} from '../../../styles/index';

/**
 *
 * @param {Object} style
 * @param {Number} Size
 * @param {Number} Rotate
 * @param {Number} ScaleX
 * @param {Number} top
 * @param {Number} left
 * @param {Number} right
 * @param {Number} bottom
 */

function Curve({
  style,
  Size,
  Rotate,
  ScaleX,
  top,
  left,
  right,
  bottom,
  borderRadius,
  gradientAngle,
}) {
  const AnimatedLinearGradient = Animated.createAnimatedComponent(
    LinearGradient,
  );
  const rotate = [
    {rotate: '0deg'},
    {rotate: '45deg'},
    {rotate: '90deg'},
    {rotate: '135deg'},
    {rotate: '180deg'},
    {rotate: '225deg'},
    {rotate: '270deg'},
  ];
  const scaleX = [
    {scaleX: 1},
    {
      scaleX: 1.1,
    },
    {
      scaleX: 1.2,
    },
    {
      scaleX: 1.3,
    },
    {
      scaleX: 1.4,
    },
    {
      scaleX: 1.5,
    },
    {
      scaleX: 1.6,
    },
    {
      scaleX: 1.7,
    },
    {
      scaleX: 1.8,
    },
  ];
  const customStyle = [
    Styles.Container,
    {
      height: Size,
      width: Size,
      borderRadius: Size,
    },
    {
      transform: [
        Rotate ? rotate[Rotate] : rotate[0],
        ScaleX ? scaleX[ScaleX] : rotate[0],
      ],
    },
    top ? {top: top} : {},
    left ? {left: left} : {},
    right ? {right: right} : {},
    bottom ? {bottom: bottom} : {},
    borderRadius && {borderRadius: borderRadius},
    style || {},
  ];
  return (
    <AnimatedLinearGradient
      style={customStyle}
      colors={[Colors.header_grad_one, Colors.header_grad_two]}
      useAngle={true}
      angle={gradientAngle || 0}
    />
  );
}

const Styles = StyleSheet.create({
  Container: {
    position: 'absolute',
  },
});

export default Curve;
