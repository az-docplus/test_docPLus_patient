import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
function CardInRow({children, style}) {
  return (
    <View style={[Styles.Container, style ? style : null]}>{children}</View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});

export default CardInRow;
