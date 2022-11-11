import React from 'react';
import {View, StyleSheet} from 'react-native';

function BasicCardN({children, style, active}) {
  let bg_color = "#e0f2f2";
  return (
    <View
      style={[
        BasicCardStyles.CardContainer,
        {
          backgroundColor: bg_color,
        },
        style ? style.CardContainer : null,
      ]}>
      {children}
    </View>
  );
}

const BasicCardStyles = StyleSheet.create({
  CardContainer: {
    elevation: 5,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: '#e0f2f2',
    flexDirection: 'row'
  },
});
export default BasicCardN;
