import React from 'react';
import {View, StyleSheet} from 'react-native';

function BasicCard({children, style, active}) {
  let bg_color = active ? '#6231CB' : '#fff';
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
    marginRight: 30,
  },
});
export default BasicCard;
