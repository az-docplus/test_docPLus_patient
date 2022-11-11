import React from 'react';
import {View, StyleSheet} from 'react-native';

/**
 *
 * Experimenting design
 */
function CardHole({children, style = {}}) {
  return (
    <View style={[CardStyles.Container, {...style}]}>
      <View style={{justifyContent: 'space-between', height: '100%'}}>
        <View style={[CardStyles.Curve, CardStyles.CurveUp]} />
        <View style={[CardStyles.Curve, CardStyles.CurveMiddle]} />
        <View style={[CardStyles.Curve, CardStyles.CurveDown]} />
      </View>
    </View>
  );
}

const CardStyles = StyleSheet.create({
  Container: {
    height: 90,
    width: 150,
    borderRadius: 10,
  },
  Curve: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: 'red',
    right: 0,
  },
  CurveMiddle: {
    marginLeft: -20,
    backgroundColor: '#eee',
  },
});

export default CardHole;
