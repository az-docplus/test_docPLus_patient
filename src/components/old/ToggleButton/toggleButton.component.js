import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
function ToggleButton({text}) {
  return (
    <View style={ToggleButtonStyles.Container}>
      <Text style={ToggleButtonStyles.Text}>{text}</Text>
      <View style={ToggleButtonStyles.Dot}></View>
    </View>
  );
}

const ToggleButtonStyles = StyleSheet.create({
  Container: {
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 2,
    width: 70,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  Text: {
    color: '#6231CB',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  Dot: {
    height: 20,
    width: 20,
    borderRadius: 25,
    backgroundColor: '#6231CB',
  },
});
export default ToggleButton;
