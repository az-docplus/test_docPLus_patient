import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

function DmzButton({
  text,
  icon = false,
  theme,
  onPress,
  disabled,
  style,
  numberOfLines,
  adjustsFontSizeToFit = false,
  isLoading = false,
}) {
  return (
    <TouchableOpacity
      style={[Styles.Container, style ? style.Container : null]}
      disabled={disabled}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          numberOfLines={numberOfLines}
          style={[
            Styles.Text,
            {color: theme === 'dark' ? '#fff' : '#000'},
            style ? style.Text : null,
          ]}>
          {text}
        </Text>
      )}
      {icon ? icon : null}
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
  },
});

export default DmzButton;
