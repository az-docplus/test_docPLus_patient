import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function DmzButton({
  text,
  icon = false,
  theme,
  onPress,
  disabled,
  style,
  children,
  isLoading = false,
}) {
  return (
    <TouchableOpacity
      style={[Styles.Container, style ? style.Container : null]}
      disabled={disabled}
      onPress={onPress}>
      {icon ? icon : null}
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View
          style={[Styles.innerContainer, style ? style.innerContainer : null]}>
          {children}
        </View>
      )}
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  Container: {
    height: 50,
    width: 80,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  Text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  innerContainer: {
    width: '100%',
    height: '100%',
  },
});

export default DmzButton;
