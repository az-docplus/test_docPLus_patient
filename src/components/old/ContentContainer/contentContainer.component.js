import React from 'react';
import {View, StyleSheet} from 'react-native';

function ContentContainer({children, style}) {
  return (
    <View
      style={[ContentContainerStyle.Container, style ? style.Container : null]}>
      {children}
    </View>
  );
}

const ContentContainerStyle = StyleSheet.create({
  Container: {
    width: '100%',
    backgroundColor: '#fefefe',
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    transform: [
      {
        translateY: -60,
      },
    ],
  },
});
export default ContentContainer;
