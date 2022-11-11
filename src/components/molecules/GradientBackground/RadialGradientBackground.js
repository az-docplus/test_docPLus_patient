import React from 'react';
import {StyleSheet} from 'react-native';
import RadialGradient from 'react-native-radial-gradient';

export default function RadialGradientBackground({
  style,
  colors,
  stops,
  center,
  radius,
  children,
}) {
  return (
    <RadialGradient
      style={[styles.container, style ? style : null]}
      colors={colors ? colors : ['#DEF1F9', '#C0E0EC', '#95CCE0']}
      stops={stops ? stops : [0.0, 0.2, 0.75]}
      center={center ? center : [130, 100]}
      radius={radius ? radius : 200}>
      {children}
    </RadialGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
});
