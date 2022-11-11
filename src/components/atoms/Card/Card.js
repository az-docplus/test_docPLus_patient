import React from 'react';
import {View, StyleSheet} from 'react-native';

function Card({children, style = {}}) {
  return <View style={[CardStyles.Container, {...style}]}>{children}</View>;
}

const CardStyles = StyleSheet.create({
  Container: {
    height: 80,
    width: 150,
    borderRadius: 10,
  },
});

export default Card;
