import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../styles/colorsV2';

function VerticalText({ text, isActive = false, setActiveDate, theme }) {
  return (
    <TouchableOpacity
      onPress={() => {
        setActiveDate(text);
      }}>
      {/* <View style={[Styles.Day, isActive && Styles.DayActive]}> */}
      <LinearGradient
        colors={isActive ? ['#3BA2B8', '#1D515C'] : ['#EEEEEE', '#EEEEEE']}
        style={Styles.Day}
        start={{ x: 2, y: 2 }}
        end={{ x: 0, y: 2 }}>
        <Text
          style={
            // isActive && Styles.DayTextActive,
            {
              color: isActive ? '#FFFFFF' : '#000000',
              // color: Colors.secondary_text_color[theme],
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 18,
              marginBottom: 10,
            }
          }>
          {text.Bottom}
        </Text>
        <Text
          style={
            // isActive && Styles.DayTextActive,
            {
              color: isActive ? '#FFFFFF' : '#000000',
              // color: Colors.secondary_text_color[theme],
              fontFamily: 'Gilroy-Medium',
              fontSize: 12,
            }
          }>
          {text.Top}
        </Text>
      </LinearGradient>
      {/* </View> */}
    </TouchableOpacity>
  );
}
const Styles = StyleSheet.create({
  Day: {
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 10,
    width: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 4,
  },

  DayTextActive: {
    color: '#fff',
  },

  DayActive: {
    backgroundColor: '#449A9A',
    borderRadius: 15,
  },
});

export default VerticalText;
