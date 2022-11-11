import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function LinearGradientBackground({
  style,
  colors,
  useAngle = true,
  angle,
  start,
  end,
  children,
}) {
  return (
    <LinearGradient
      start={start ? start : {x: 0, y: 0}}
      end={end ? end : {x: 1, y: 0}}
      useAngle={useAngle}
      angle={angle ? angle : 100}
      colors={colors ? colors : ['#fff', 'rgba(2, 126, 151, 0.31)']}
      style={[{flex: 1, opacity: 0.4}, style ? style : null]}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
});
