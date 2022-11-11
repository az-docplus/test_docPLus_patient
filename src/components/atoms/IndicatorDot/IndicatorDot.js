import React from 'react';
import {View, StyleSheet} from 'react-native';

function IndicatorDot({isActive = false, activeColor = '#000'}) {
  const style = isActive
    ? {backgroundColor: activeColor, height: 10, width: 10}
    : {backgroundColor: '#C4C4C4'};
  return <View style={[Styles.Container, {...style}]}></View>;
}

const Styles = StyleSheet.create({
  Container: {
    height: 9,
    width: 9,
    borderRadius: 10,
    marginLeft: 2,
  },
});
export default IndicatorDot;
