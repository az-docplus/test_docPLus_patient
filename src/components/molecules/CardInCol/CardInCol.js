import React from 'react';
import {View, StyleSheet} from 'react-native';
function CardInCol({children}) {
  return <View style={Styles.Container}>{children}</View>;
}

const Styles = StyleSheet.create({
  Container: {
    width: '100%',
  },
});

export default CardInCol;
