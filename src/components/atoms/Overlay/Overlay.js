import React from 'react';
import {View, StyleSheet} from 'react-native';

function Overlay({children, style}) {
  return (
    <View style={[Styles.Container, style ? style : null]}>{children}</View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

export default Overlay;
