import React, { useState, useRef } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import InsetShadow from 'react-native-inset-shadow';

export default function DateInput({ onDateSelect, DOB, disabled }) {
  const inputTextRefMove = useRef(new Animated.Value(0)).current;
  const inputTextRefSize = useRef(new Animated.Value(1)).current;
  const moveUp = () => {
    Animated.parallel([
      Animated.timing(inputTextRefMove, {
        toValue: -33,
        duration: 1000,
        easing: Easing.elastic(),
        useNativeDriver: true,
      }),
      Animated.timing(inputTextRefSize, {
        toValue: 0.7,
        duration: 5000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const maxDate = new Date();
  //   maxDate.setFullYear(2010);

  const minDate = new Date();
  minDate.setFullYear(1950);

  return (
    <View style={{ position: 'relative', marginTop: 20 }}>
      {/* <Animated.View style={[styles.animatedText, { transform: [{ translateY: inputTextRefMove, scale: inputTextRefSize, translateX: (inputTextRefSize < 0.7) ? 22 : -20 }], opacity: (inputTextRefSize < 0.7) ? 0 : 1 }]}>
                <Text style={{ padding: 0, margin: 0, textAlignVertical: 'center', height: '100%', color: '#8F8F8F', fontFamily: 'Montserrat-Regular' }}>Date of Birth</Text>
            </Animated.View> */}
      <InsetShadow
        shadowOpacity={1}
        shadowOffset={15}
        containerStyle={{
          borderRadius: 10,
          paddingHorizontal: 20,
          height: 50,
          width: '98%',
          borderWidth: 0.1,
        }}
        shadowOffset={10}
        elevation={12}>
        <DatePicker
          style={{
            width: '100%',
            marginTop: 5,
          }}
          date={DOB}
          mode="date"
          placeholder="Date of birth"
          format="YYYY-MM-DD"
          // minDate={new Date("01-01-1950")}
          maxDate={maxDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onOpenModal={moveUp}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              right: 0,
              marginLeft: 0,
            },
            dateInput: {
              marginRight: 45,
              borderWidth: 0,
              alignItems: 'flex-start',
            },
          }}
          onDateChange={onDateSelect}
        />
      </InsetShadow>
    </View>
  );
}

const styles = StyleSheet.create({
  animatedText: {
    color: '#707585',
    position: 'absolute',
    zIndex: -1,
    height: '100%',
    paddingLeft: 22,
  },
});
