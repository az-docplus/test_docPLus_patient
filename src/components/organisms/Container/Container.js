import React from 'react';
import {View, StyleSheet} from 'react-native';

function Container({children, style}) {
  return (
    <View style={[Styles.Container, style ? style : null]}>{children}</View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
  },
});
export default Container;
