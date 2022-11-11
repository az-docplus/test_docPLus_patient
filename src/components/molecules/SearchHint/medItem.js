import React, {useState, useEffect} from 'react';
import {
  // TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const medItem = ({item, onSelect, name}) => {
//   console.log(name, item.brand, '???????????????');

  useEffect(() => {
    console.log(name, item.brand, '???????????????');

  }, [name])
  return (
    <TouchableOpacity
      style={{
        margin: '2%',
        width: '100%',
      }}
      onPress={() => {
        onSelect(item.brand);
      }}>
      <Text>{item.brand}</Text>
    </TouchableOpacity>
  );
};

export default medItem;
