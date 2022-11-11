import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

function CustomButton({title, style, onPress, disabled}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={style ? style.Touchable : null}>
      <View
        style={[CustomButtonStyles.Container, style ? style.Container : null]}>
        <Text style={[CustomButtonStyles.Text, style ? style.Text : null]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const CustomButtonStyles = StyleSheet.create({
  Container: {
    // flex: 4,
    padding: 25,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  Text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default CustomButton;
