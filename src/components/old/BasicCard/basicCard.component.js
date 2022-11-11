import React, {Children} from 'react';
import {View, StyleSheet, Text, Switch, Image} from 'react-native';

function BasicCard({children, style}) {
  return (
    <View
      style={[
        BasicCardStyles.CardContainer,
        style ? style.CardContainer : null,
      ]}>
      {children}
    </View>
  );
}

const BasicCardStyles = StyleSheet.create({
  CardContainer: {
    elevation: 5,
    backgroundColor: '#fff',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderRadius: 15,
    marginRight: 30,
  },
});
export default BasicCard;
