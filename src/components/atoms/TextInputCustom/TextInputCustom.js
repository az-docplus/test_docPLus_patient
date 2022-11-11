import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

/**
 *
 * @param {} param0
 */

function TextInputCustom({
  placeholder,
  textContentType,
  keyboardType = 'default',
  style,
  value
}) {
  return (
    <View style={[TextInputCustomStyles.Container, style ? style : null]}>
      <TextInput
        value={value}
        textContentType={textContentType}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={text => inputHandler(text)}
      />
    </View>
  );
}

const TextInputCustomStyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    margin: 5,
    paddingLeft: 30,
  },
});

export default TextInputCustom;
