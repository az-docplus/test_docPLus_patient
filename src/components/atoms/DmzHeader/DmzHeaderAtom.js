import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function DmzHeaderAtom({children, style}) {
  return (
    <LinearGradient
      style={[Styles.Container, style ? style : null]}
      useAngle={true}
      angle={180}
      colors={['#7479F7', '#904FEC']}>
      {children}
    </LinearGradient>
  );
}

const Styles = StyleSheet.create({
  Container: {
    height: 250,
    width: '100%',
  },
});
export default DmzHeaderAtom;
