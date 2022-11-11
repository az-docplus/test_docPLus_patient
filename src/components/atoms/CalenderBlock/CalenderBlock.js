import React from 'react';
import {View, StyleSheet, useWindowDimensions, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
function CalenderBlock({style, text, active, tapActive, onPress}) {
  const dimen = useWindowDimensions();
  return (
    <TouchableOpacity
      style={{
        width: (dimen.width - 40) / 7,
        height: (dimen.width - 100) / 7,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <View
        style={[
          Styles.Container,
          style ? style.Container : null,
          {
            width: '55%',
            height: '55%',
            borderRadius: 10,
          },
          {
            backgroundColor: tapActive ? '#9C77BC' : 'transparent',
          },
        ]}>
        <Text
          style={[
            Styles.Text,
            {color: tapActive ? '#fff' : '#6859A2'},
            style ? style.Text : null,
          ]}>
          {text}
        </Text>
      </View>
      {active && (
        <View
          style={{
            height: 3,
            width: 3,
            backgroundColor: '#EA508F',
            borderRadius: 5,
          }}></View>
      )}
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {fontWeight: 'normal', fontSize: 13},
});

export default CalenderBlock;
