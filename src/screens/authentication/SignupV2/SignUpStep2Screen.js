/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Keyboard,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import StepsTracker from '../../../components/atoms/StepsTracker/StepsTracker';
import TextInputIcon from '../../../components/atoms/TextInputCustom/TextInputIcon';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import ImagePlaceholder from '../../../assets/svg/imagePlaceholder.svg';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import {
  TERTIARY_TEXT,
  HEADER_TEXT,
  PRIMARY_COLOR,
  NEW_PRIMARY_COLOR,
  NEW_HEADER_TEXT,
  SECONDARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import GoogleReCAPTCHA from '../../../components/molecules/reCapture/reCapture';
import { useIsFocused } from '@react-navigation/native';

const height = Dimensions.get('screen').height;

export default function SignUpStep2Screen(props) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [validated, setValidated] = useState([true, true, true, true]);
  const [ShowReCaptcha, setShowReCaptcha] = useState(false);
  const [ResendCount, setResendCount] = useState(0);
  const inputRefs = [true, null, null, null];
  const { signupAs, isLoading } = props;
  let timeout = null;

  // const otpHandler = (message) => {
  //   const otp = /(\d{4})/g.exec(message)[1];
  //   console.log({message, otp : otp.split('')})
  //   setOtp(otp.split(''))
  //   // setState({otp});
  //   // RNOtpVerify.removeListener();
  //   Keyboard.dismiss();
  // };

  // const startListeningForOtp = () =>
  //   RNOtpVerify.getOtp()
  //     .then((p) => {
  //       console.log({p}, "get otp listen call");
  //       RNOtpVerify.addListener(otpHandler);
  //     })
  //     .catch((err) => console.log({err}));

  // const getHash = () =>
  //   RNOtpVerify.getHash()
  //     .then((hash) => console.log({hash}))
  //     .catch(console.log);

  // useEffect(() => {
  //   getHash();
  //   startListeningForOtp();

  //   return () => RNOtpVerify.removeListener();
  // }, []);

  useEffect(() => {
    if (otp.join('').length > 0) {
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        let newValidated = [...validated];
        otp.forEach((letter, i) => (newValidated[i] = letter?.length === 1));
        setValidated(newValidated);
      }, 500);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [otp]);

  useEffect(() => {
    setOtp(['', '', '', '']);
    setTimeout(() => {
      inputRefs[0].focus();
    }, 50);
    // inputRefs[0].focus();
  }, [props.mount]);

  const containerStyle = !isLoading
    ? {
        borderRadius: 80,
        marginTop: '10%',
        backgroundColor: SECONDARY_COLOR,
        width: '40%',
      }
    : {
        borderRadius: 80,
        marginTop: '10%',
        backgroundColor: SECONDARY_COLOR,
        paddingRight: '18%',
        paddingLeft: '18%',
      };
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
        contentContainerStyle={{ alignItems: 'center', flex: 1 }}>
        <StepsTracker
          text={signupAs === 'doctor' ? 'Step 2' : 'Step 2'}
          textStyle={{
            fontSize: 16,
            color: NEW_HEADER_TEXT,
          }}
          completed={100}
          // mode={signupAs === 'doctor' ? [25, 50, 75, 100] : [33, 66, 100]}
          mode={signupAs === 'doctor' ? [50, 100] : [50, 100]}
          completedColor={NEW_PRIMARY_COLOR}
          incompletedColor={'#F8F7FF'}
        />

        <View
          style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          <View style={{ margin: '10%', alignItems: 'center' }}>
            <Text
              style={{
                color: NEW_HEADER_TEXT,
                fontSize: 30,
                fontFamily: 'Montserrat-Bold',
              }}>
              Verify your email
            </Text>
            <Text
              style={{
                color: NEW_HEADER_TEXT,
                fontSize: 18,
                textAlign: 'center',
                marginHorizontal: '9%',
                letterSpacing: 0.3,
                fontFamily: 'Montserrat-Regular',
                marginTop: '4%',
              }}>
              Please enter the 4 digit OTP sent to you
            </Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: '5%' }}>
            {[0, 1, 2, 3].map((i) => (
              <TextInput
                //   maxLength={1}
                style={[
                  styles.inputStyle,
                  !validated[i] && { borderBottomColor: 'red' },
                ]}
                keyboardType="number-pad"
                value={otp[i]}
                // autoFocus={i===0}
                onChangeText={(text) => {
                  inputRefs[i + 1]?.focus();
                  const newOtp = [...otp];
                  newOtp[i] = text[0];
                  setOtp(newOtp);
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace' && i > 0) {
                    inputRefs[i - 1].focus();
                    const newOtp = [...otp];
                    newOtp[i - 1] = '';
                    setOtp(newOtp);
                  }
                }}
                ref={(ref) => (inputRefs[i] = ref)}
                textStyle={styles.textStyle}
              />
            ))}
            {/* <TextInput
              style={[
                styles.inputStyle,
                !validated[0] && {borderBottomColor: 'red'},
              ]}
              keyboardType="number-pad"
              autoFocus
              value={otp[0]}
              onChangeText={(text) => {
                inputRefs[1]?.focus();
                const newOtp = [...otp];
                newOtp[0] = text[0];
                setOtp(newOtp);
              }}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  inputRefs[0].focus();
                  const newOtp = [...otp];
                  newOtp[0] = '';
                  setOtp(newOtp);
                }
              }}
              ref={(ref) => (inputRefs[0] = ref)}
              textStyle={styles.textStyle}
            />
            <TextInput
              style={[
                styles.inputStyle,
                !validated[1] && {borderBottomColor: 'red'},
              ]}
              keyboardType="number-pad"
              value={otp[1]}
              onChangeText={(text) => {
                inputRefs[1 + 1]?.focus();
                const newOtp = [...otp];
                newOtp[1] = text[0];
                setOtp(newOtp);
              }}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  inputRefs[0].focus();
                  const newOtp = [...otp];
                  newOtp[1] = '';
                  setOtp(newOtp);
                }
              }}
              ref={(ref) => (inputRefs[1] = ref)}
              textStyle={styles.textStyle}
            /> */}
          </View>
          {ShowReCaptcha && (
            <GoogleReCAPTCHA
              count={ResendCount}
              ShowReCaptcha={ShowReCaptcha}
              handleSubmit={() => {
                props.sendOTP();
                setShowReCaptcha(false);
              }}></GoogleReCAPTCHA>
          )}
          <DmzButton
            onPress={() => props.onPress(otp)}
            isLoading={isLoading}
            text={'CONFIRM'}
            style={{
              Text: {
                width: '100%',
                textAlign: 'center',
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              },
              Container: containerStyle,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              margin: '4%',
              marginBottom: '3%',
            }}>
            <Text style={{ fontFamily: 'Montserrat-Regular' }}>
              Didn't receive OTP?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setResendCount(ResendCount + 1);
                setShowReCaptcha(true);
              }}>
              <Text
                style={{
                  color: NEW_PRIMARY_BACKGROUND,
                  fontFamily: 'Montserrat-Bold',
                }}>
                {'  '}Resend
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => props.onPressChangeEmail()}>
            <Text
              style={{
                color: NEW_PRIMARY_BACKGROUND,
                fontSize: 12,
                fontFamily: 'Montserrat-Medium',
              }}>
              Change email address
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            paddingTop: '2%',
            paddingBottom: '4%',
          }}>
          <Image
            // source={require('../../../assets/images/docplusIcon.png')}
            source={require('../../../assets/icons/new_docplus_log.png')}
            style={{ height: 30, width: 100 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    width: 50,
    borderBottomColor: NEW_HEADER_TEXT,
    borderBottomWidth: 1,
    height: 'auto',
    alignSelf: 'center',
    marginHorizontal: 5,
    textAlign: 'center',
  },
  textStyle: {
    color: NEW_HEADER_TEXT,
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
});
