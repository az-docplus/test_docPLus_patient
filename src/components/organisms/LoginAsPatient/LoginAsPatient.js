import React, {useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import DmzText from '../../atoms/DmzText/DmzText';
import AnimInput from '../../molecules/AnimInput/AnimInput';
import GradientButton from '../../molecules/GradientButton/GradientButton';
import {Local, setLocale} from '../../../i18n';

function LoginAsPatient({style, onPressLogin}) {
  return (
    <Animated.View style={[Styles.CardContainer, style ? style : null]}>
      <DmzText
          text={`${Local("patient.login.login_as_patient")}`}
          type={5}
        center
        style={Styles.HeaderText}
      />
      <AnimInput
        inputHandler={txt => setData({...data, email: txt})}
        autoCapitalize="none"
        placeholder={`${Local("patient.login.email_or_phone")}`}
        style={{Container: Styles.AnimInput}}
      />
      <AnimInput
        inputHandler={txt => setData({...data, password: txt})}
        autoCapitalize="none"
        text={`${Local("patient.singup.password")}`}
        style={{Container: Styles.AnimInput}}
      />
      <DmzText
          text={`${Local("patient.login.forgot_password")}`}
          lite
        type={2}
        style={Styles.ForgotPasswordText}
      />
      <GradientButton 
          text={`${Local("patient.login.login")}`}
          onPress={onPressLogin} />
    </Animated.View>
  );
}

const Styles = StyleSheet.create({
  CardContainer: {
    width: '100%',
    height: 400,
    padding: 20,
    flexDirection: 'column',
  },
  HeaderText: {marginLeft: 'auto', marginRight: 'auto'},
  AnimInput: {marginBottom: 20, marginTop: 20, width: '90%'},
  ForgotPasswordText: {marginLeft: 'auto', marginRight: 'auto', color: '#555'},
});
export default LoginAsPatient;
