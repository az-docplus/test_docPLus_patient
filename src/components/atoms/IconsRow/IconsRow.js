import React from 'react';
import {View, StyleSheet} from 'react-native';

function IconsRow({Icon, number}) {
  let arr = [];
  for (let i = 0; i < number; i++) {
    arr.push(i);
  }
  return <View style={Styles.Container}>{arr.map(item => Icon)}</View>;
}

const Styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default IconsRow;
