import React, {useRef, useState, useEffect} from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {CallNotification} from '../src/NativeModules';

export default function Search() {
  const test = () => {
    CallNotification.createNotification(
      'ayush',
      'mani',
      '87e7yhureiudyruedhe',
      'aroom',
      'patient',
      12,
    );
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={test}
        style={[styles.actionButton, {bottom: 62}]}>
        <Text>click to blur</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  actionButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'yellow',
    padding: '2%',
  },
});
