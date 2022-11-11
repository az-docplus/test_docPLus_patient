import React from 'react';
import {View, StyleSheet} from 'react-native';

function ToggleDot({style}) {
  return <View style={[Styles.Dot, style ? style : null]} />;
}

const Styles = StyleSheet.create({
  Dot: {
    height: 20,
    width: 20,
    borderRadius: 25,
    backgroundColor: '#6231CB',
  },
});
export default ToggleDot;
