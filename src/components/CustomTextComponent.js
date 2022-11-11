import React from 'react';
import { View, Text } from 'react-native';
import { windowWidth } from '../utils/utils';

export default function CustomTextComponent({
  style,
  text,
  fs,
  ff,
  fw,
  textColor,
  textAign,
  lineHeight,
  fontFamily = 'Gilroy-Medium',
}) {
  var fsn = 0;
  if (windowWidth < 380) {
    fsn = fs - 2;
  } else {
    fsn = fs;
  }
  return (
    <Text
      style={[
        {
          fontSize: fsn,
          color: textColor,
          textAlign: textAign,
          lineHeight: lineHeight,
          fontFamily: ff,
          fontWeight: fw,
        },
        style,
      ]}>
      {text}
    </Text>
  );
}
