import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HEADER_TEXT} from '../../../styles/colors';

export default function CircularButton({style, onPress}) {
  return (
    // <View>
    <TouchableOpacity
      onPress={onPress}
      style={[styles.Btn, style ? style : null]}>
      <MaterialCommunityIcons
        name="check"
        style={{width: '100%', height: '100%'}}
        color="white"
        size={40}
      />
    </TouchableOpacity>
    // </View>
  );
}

const styles = StyleSheet.create({
  Btn: {
    width: 70,
    borderRadius: 35,
    height: 70,
    backgroundColor: HEADER_TEXT,
    padding: 15,
  },
});
