import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import DmzText from '../../atoms/DmzText/DmzText';
import AnimInput from '../../molecules/AnimInput/AnimInput';
import GradientButton from '../../molecules/GradientButton/GradientButton';
import {Local, setLocale} from '../../../i18n';

function LoginAsDoctor({style, onPressLogin}) {
  return (
    <Animated.View style={[Styles.CardContainer, style ? style : null]}>
      <DmzText
          text={`${Local("patient.login.login_as_doctor")}`}
          type={5}
        center
        style={Styles.HeaderText}
      />
      <AnimInput
          placeholder={`${Local("patient.login.email_or_phone")}`}
          autoCapitalize="none"
          style={{Container: Styles.AnimInput}}
      />
      <AnimInput 
          placeholder={`${Local("patient.signup.password")}`}
          autoCapitalize="none"
          style={{Container: Styles.AnimInput}} />
      <DmzText
          text={`${Local("patient.login.forgot_password")}`}
          lite
        type={2}
        style={Styles.ForgotPasswordText}
      />
      <GradientButton 
          placeholder={`${Local("patient.login.login")}`}
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
export default LoginAsDoctor;
