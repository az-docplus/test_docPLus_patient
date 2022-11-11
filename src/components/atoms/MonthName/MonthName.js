import React from 'react';
import {View, Text} from 'react-native';
export default function MonthName({name}) {
  return (
    <View
      style={{
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{name}</Text>
    </View>
  );
}
