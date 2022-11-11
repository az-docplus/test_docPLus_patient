import React from 'react';
import {View, StyleSheet} from 'react-native';

function Line({style}) {
  return <View style={[Styles.Container, style ? style : null]}></View>;
}

const Styles = StyleSheet.create({
  Container: {
    width: 2,
    height: 20,
    backgroundColor: '#000',
  },
});

export default Line;
