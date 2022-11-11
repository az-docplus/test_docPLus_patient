/* eslint-disable react-native/no-inline-styles */
import ViewPager from '@react-native-community/viewpager';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import InsetShadow from 'react-native-inset-shadow';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import OtpAutocomplete from 'react-native-otp-autocomplete';
import { useDispatch } from 'react-redux/lib/hooks/useDispatch';
import ThumbUpImage from '../../assets2/image/thumb-up.png';
import ButtonCompo from '../../components/atoms2/button/button';
import TopNavBar from '../../components/molecules/TopNavBar/TopNavBar';
import { Local } from '../../i18n';
import {
  LoginDoctor,
  sendOTP,
  LoginPatient,
  isLoggedin,
} from '../../reduxV2/action/AuthAction';
import {
  INPUT_PLACEHOLDER,
  NEW_HEADER_TEXT,
  SQUAREBOXLG1,
  TERTIARY_TEXT,
  WHITE,
} from '../../styles/colors';
import { Host } from '../../utils/connection';

function LoginOtp(props) {
  const { isSignUp, mode, modeValue, isDoctor, status, isUser } =
    props.route.params;
  console.log('date : ', isSignUp, mode, modeValue, isDoctor, isUser, status);
  const dispatch = useDispatch();
  const [modal, setModal] = useState({ visible: false, text: '' });
  const [otp, setOtp] = useState(['', '', '', '']);
  const [validated, setValidated] = useState([true, true, true, true]);
  const inputRefs = [true, null, null, null];
  const [isVerifying, setIsVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUserOTPVerified, setIsUserOTPVerified] = useState(false);
  const pagerRef = useRef(null);
  const nextpage = (page) => {
    if (pagerRef) {
      pagerRef.current.setPage(page);
    }
  };

  const successCallback = (successResponce) => {
    console.log('data  : ', successResponce);
    nextpage(1);
    setTimeout(() => {
      setLoading(true);
    }, 8000);
    setTimeout(() => {
      setLoading(true);
      dispatch(isLoggedin());
      setLoading(false);
    }, 10000);
    // props.navigation.navigate(
    //     successResponce.members && successResponce.members > 0
    //         ? // ? 'ContinueAs'
    //         'MainController'
    //         : 'MainController',
    // );
  };
  const errorCallback = (e) => {
    setModal({ text: 'Enter valid Otp', visible: true });
    setIsVerifying(false);
  };

  useEffect(() => {
    if (otp.join('').length === 4) {
      OtpVerifyHander();
    }
  }, [otp]);
  const OtpVerifyHander = () => {
    Keyboard.dismiss();
    setModal({ text: '', visible: false });
    if (otp.join('').length === 4) {
      setIsVerifying('Verifying');
      const _OTP = {
        otp: otp.join(''),
        [mode === 'mobile' ? 'phone' : mode]: modeValue,
      };
      // console.log('============>>>>>>>>>>>>>>otp', _OTP);
      axios
        .post(`${Host}/otp/verify`, _OTP)
        .then((res) => {
          if (res.data.status) {
            console.log('res.data.status : ', res.data);
            console.log(isUser, isDoctor);
            if (isUser) {
              setIsVerifying(false);
              nextpage(1);
              setTimeout(() => {
                props.navigation.navigate('signup-onboarding', {
                  phone: modeValue,
                  email: null,
                  status: isDoctor,
                });
              }, 10000);
              setIsVerifying(false);
              setIsUserOTPVerified(true); // may in future use for now use less .
            } else {
              if (isDoctor) {
                // sign in as doctor
                dispatch(LoginDoctor(_OTP, successCallback, errorCallback));
              } else {
                // sign in as patient
                dispatch(LoginPatient(_OTP, successCallback, errorCallback));
              }
            }
          } else {
            setModal({ text: 'Enter valid otp', visible: true });
            setIsVerifying(false);
          }
        })
        .catch((e) => {
          setModal({ text: 'Enter valid otp', visible: true });
          setIsVerifying(false);
        });
    } else {
      setModal({ text: 'Enter OTP', visible: true });
      setIsVerifying(false);
    }
  };
  const ResendOTPHandler = () => {
    setIsVerifying('Sending...');
    setModal({ text: '', visible: false });
    dispatch(
      sendOTP(
        { [mode]: modeValue },
        (e) => {
          setIsVerifying(false);
          setModal({
            text: `${Local('doctor.V2.otp_conf.sent')}`,
            visible: true,
          });
        },
        (err) => {
          console.log('err : ', err);
          setModal({
            text: `${Local('doctor.V2.otp_conf.error')}`,
            visible: true,
          });
          setIsVerifying(false);
        },
      ),
    );
  };

  // const otpHandler = (message) => {
  //   console.log('##############', { message });
  //   // const otp = /(\d{4})/g.exec(message)[1];
  //   // setOtp(otp.split(' '));
  //   RNOtpVerify.removeListener();
  //   Keyboard.dismiss();
  // };

  // const startListeningForOtp = () =>
  //   RNOtpVerify.getOtp()
  //     .then((p) => {
  //       console.log({ p }, 'get otp listen call');
  //       RNOtpVerify.addListener(otpHandler);
  //     })
  //     .catch((err) => console.log({ err }));

  // const getHash = () =>
  //   RNOtpVerify.getHash()
  //     .then((hash) => console.log('getting hash', { hash }))
  //     .catch(console.log);

  // useEffect(() => {
  //   getHash();

  //   startListeningForOtp();

  //   return () => {
  //     setModal({ visible: false, text: '' });
  //     return RNOtpVerify.removeListener();
  //   };
  // }, []);

  // const getHash = () =>
  //   OtpAutocomplete.getHash()
  //     .then('getting hash', console.log)
  //     .catch(console.log);
  // let num = '1234';
  // console.log('######################################', num.split(' '));
  const getHash = () =>
    OtpAutocomplete.getHash()
      .then((hash) => console.log('getting hash@@@@@@@@@@@@@@@@@@@', { hash }))
      .catch(console.log);

  const startListeningForOtp = () =>
    OtpAutocomplete.getOtp()
      .then((p) => OtpAutocomplete.addListener(otpHandler))
      .catch((p) => console.log(p));

  const otpHandler = (message) => {
    // console.log('message##################', message);
    const Newotp = /(\d{4})/g.exec(message)[1];
    setOtp(Newotp.split(''));
    OtpAutocomplete.removeListener();
    Keyboard.dismiss();
  };

  useEffect(() => {
    getHash();
    startListeningForOtp();

    return () => OtpAutocomplete.removeListener();
  }, []);

  return (
    <>
      <ViewPager
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        scrollEnabled={false}>
        <View key="0">
          <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
            <View>
              <View>
                <TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                  style={{
                    marginVertical: 20,
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Entypo name="chevron-small-left" size={35} />
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      color: '#333333',
                      fontSize: 17,
                    }}>
                    {`${Local('doctor.V2.otp_conf.header')}`}
                  </Text>
                </TouchableOpacity>

                {/* <TopNavBar
                  headerText={`${Local('doctor.V2.otp_conf.header')}`}
                  hideRightComp={true}
                  onLeftButtonPress={() => {
                    props.navigation.goBack();
                    // nextpage(0);
                  }}
                  navigation={props.navigation}
                  // style={{
                  //   Container: {
                  //     height: 'auto',
                  //     marginTop: 5,
                  //     marginRight: 200,
                  //   },
                  // }}
                /> */}
              </View>

              <View style={{ paddingTop: 40, paddingHorizontal: 40 }}>
                <Text style={{ fontFamily: 'Gilroy-Bold', fontSize: 32 }}>
                  {`${Local('doctor.V2.otp_conf.enter')}`}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Gilroy-Regular',
                    fontSize: 14,
                    color: '#7A7979',
                  }}>
                  {`${Local('doctor.V2.otp_conf.type')}`}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Gilroy-Bold',
                    color: '#297281',
                    fontSize: 24,
                    marginTop: 20,
                  }}>
                  {modeValue ? modeValue : 'Error'}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '5%',
                  alignSelf: 'center',
                }}>
                {[0, 1, 2, 3].map((i, index) => (
                  <TextInput
                    key={index}
                    maxLength={4}
                    style={[
                      styles.inputStyle,
                      !validated[i] && { borderBottomColor: 'red' },
                      { backgroundColor: validated[i] ? WHITE : WHITE },
                    ]}
                    keyboardType="number-pad"
                    value={otp[i]}
                    autoComplete="sms-otp"
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
                    textStyle={{ ...styles.textStyle }}
                  />
                ))}
              </View>

              <View style={{ marginHorizontal: 30, marginTop: 18 }}>
                {modal.text === 'Code sent successfully!' ? (
                  <Text
                    style={{
                      color: '#0BD007',
                      textAlign: 'center',
                      fontSize: 16,
                      fontFamily: 'Gilroy-SemiBold',
                      // marginTop: 50,
                    }}>
                    {modal.visible ? modal.text : ''}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: '#F41212',
                      fontFamily: 'Gilroy-Medium',

                      fontSize: 10.5,

                      // marginTop: 50,
                    }}>
                    {modal.visible ? modal.text : ''}
                  </Text>
                )}

                {isVerifying && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ActivityIndicator />
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 10,
                        marginLeft: 5,
                      }}>
                      {isVerifying}
                    </Text>
                  </View>
                )}

                {/* <Text
                                        style={{ color: '#F41212', fontFamily: 'Montserrat-SemiBold', fontSize: 10 }}
                                    >Enter valid OTP</Text> */}
              </View>
              <View>
                <Countdown seconds={30} ResendOTPHandler={ResendOTPHandler} />
              </View>

              <View style={{ marginTop: 20, marginHorizontal: 30 }}>
                <ButtonCompo
                  title={`${Local('doctor.V2.otp_conf.button')}`}
                  isLoading={isVerifying}
                  pressHandler={OtpVerifyHander}
                />
              </View>
            </View>
          </View>
        </View>

        <View key="1">
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#6DCBCB', '#047B7B']}
            style={{ flex: 1 }}>
            {loading ? (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#FFFFFF" />
              </View>
            ) : null}

            <Image style={{ alignSelf: 'flex-end' }} source={ThumbUpImage} />
            <View style={{ marginTop: 40 }}>
              <Text
                style={{
                  color: WHITE,
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 36,

                  textAlign: 'center',
                }}>
                {`${Local('doctor.V2.otp_conf.number')}`}
              </Text>
              <Text
                style={{
                  color: WHITE,
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 36,

                  textAlign: 'center',
                }}>
                {`${Local('doctor.V2.otp_conf.verified')}`}
              </Text>
            </View>

            {/* <ActivityIndicator size={20} color="gray" /> */}
            <View style={{ marginHorizontal: 40, marginTop: 90 }}>
              <TouchableOpacity
                onPress={() => {
                  setLoading(true);
                  isUser
                    ? props.navigation.navigate('signup-onboarding', {
                        phone: modeValue,
                        email: null,
                        status: isDoctor,
                      })
                    : dispatch(isLoggedin());
                  setLoading(false);
                }}>
                <InsetShadow
                  shadowOpacity={1}
                  shadowOffset={15}
                  containerStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 30,
                    textAlignVertical: 'center',
                    paddingHorizontal: 5,
                    height: 50,
                    elevation: 3,
                    // marginHorizontal: 5,
                    marginVertical: 5,
                    borderWidth: 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  // shadowOffset={10}
                  elevation={12}>
                  <Text
                    style={{
                      color: '#297281',
                      fontSize: 24,
                      fontFamily: 'Gilroy-SemiBold',
                      textAlign: 'center',
                    }}>
                    Continue
                  </Text>
                </InsetShadow>
              </TouchableOpacity>
              {/* <ButtonCompo
                title="Continue"
                isLoading={false}
                pressHandler={() => {
                  setLoading(true);
                  isUser
                    ? props.navigation.navigate('signup-onboarding', {
                        phone: modeValue,
                        email: null,
                        status: isDoctor,
                      })
                    : dispatch(isLoggedin());
                }}
              /> */}
            </View>
          </LinearGradient>
        </View>
      </ViewPager>
    </>
  );
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '85%',
    borderBottomColor: INPUT_PLACEHOLDER,
    borderBottomWidth: 0.5,
    height: 'auto',
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: 'transparent',
  },
  MainContainer: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  HeaderText: {
    fontSize: 33,
    color: NEW_HEADER_TEXT,
    lineHeight: 50,

    fontFamily: 'Gilroy',
    marginTop: 5,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingRight: 30,
  },
  HeaderDesc: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 18,
    color: TERTIARY_TEXT,
    marginTop: 10,
    width: '100%',
    textAlign: 'center',
    opacity: 1,
    letterSpacing: 0.8,
  },
  inputStyle: {
    alignSelf: 'center',
    marginHorizontal: 5,
    textAlign: 'center',
    height: 62,
    width: 62,
    color: '#297281',
    borderRadius: 6,
    fontSize: 32,
    fontFamily: 'Gilroy-Bold',

    marginTop: 40,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  textStyle: {
    color: 'black',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    zIndex: 9,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginOtp;

function Countdown({ ResendOTPHandler }) {
  const [timeLeft, setTimeLeft] = useState(30);
  useEffect(() => {
    try {
      if (timeLeft >= 0) {
        const intervalId = setInterval(() => {
          setTimeLeft((t) => t - 1);
        }, 1000);
        return () => intervalId;
      }
    } catch (error) {}
  }, []);
  if (timeLeft >= 0) {
    return (
      <Text style={{ textAlign: 'center', marginTop: 10 }}>
        <Text style={{ color: '#EA1A65', fontFamily: 'Gilroy-SemiBold' }}>
          {`${Local('doctor.V2.otp_conf.resend')}`}
        </Text>{' '}
        {`${Local('doctor.V2.otp_conf.in')}`} 00 : {timeLeft}{' '}
      </Text>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          ResendOTPHandler();
          setTimeLeft(30);
        }}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 10,
            color: '#EA1A65',
            fontFamily: 'Gilroy-SemiBold',
          }}>
          {`${Local('doctor.V2.otp_conf.resend')}`}
        </Text>
      </TouchableOpacity>
    );
  }
}
