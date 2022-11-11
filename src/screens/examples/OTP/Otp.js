import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import AnimInput from '../../../components/molecules/AnimInput/AnimInput';

function Otp() {
  const opac = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opac, {
      toValue: 1,
      duration: 800,
      delay: 200,
      easing: Easing.back(),
    }).start();
  });
  return (
    <Animated.View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 40,
        opacity: opac,
      }}>
      <DmzText
        type={4}
        lite
        gap_small
        text="Enter you OTP"
        style={{marginTop: 150, opacity: 0.8}}
      />
      <View style={Styles.InputContainer}>
        <AnimInput
          style={{
            Container: Styles.CardContainer,
          }}
        />
        <AnimInput
          style={{
            Container: Styles.CardContainer,
          }}
        />
        <AnimInput
          style={{
            Container: Styles.CardContainer,
          }}
        />
        <AnimInput
          style={{
            Container: Styles.CardContainer,
          }}
        />
      </View>
      <DmzText text="Resend OTP?" lite gap_small />
    </Animated.View>
  );
}

const Styles = StyleSheet.create({
  CardContainer: {
    height: null,
    width: null,
    flex: 1,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.4)',
    marginRight: 5,
  },
  InputContainer: {
    height: 60,
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.4)',
    elevation: 1000,
    marginTop: 20,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
});
export default Otp;
