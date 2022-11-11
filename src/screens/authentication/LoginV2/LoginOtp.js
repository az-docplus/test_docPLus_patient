/* eslint-disable react-native/no-inline-styles */
import React, { useState, createRef, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Image,
  Animated,
  Easing,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import Toast from 'react-native-root-toast';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import TextInputIcon from '../../../components/atoms/TextInputCustom/TextInputIcon';
import { useDispatch } from 'react-redux/lib/hooks/useDispatch';
import {
  LoginDoctor,
  LoginPatient,
  sendOTP,
  signInStaff,
} from '../../../reduxV2/action/AuthAction';
import { GetPatientInfo } from '../../../reduxV2/action/PatientAction';
import { useSelector } from 'react-redux/lib/hooks/useSelector';
import {
  HEADER_TEXT,
  TERTIARY_TEXT,
  NEW_HEADER_TEXT,
  SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  LOGINLG1,
  SQUAREBOXLG1,
} from '../../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import ViewPager from '@react-native-community/viewpager';
import SignupSplash from '../SignupV2/SignupSplash';

import UserProfile from '../../../assets/svg/male_profile.svg';
import GenericError from '../../../components/molecules/Modal/GenericError';
import AnimatedErrorText from '../../../components/atoms/animatedErrorText/AnimatedErrorText';
import { set } from 'lodash';
import { Host } from '../../../utils/connection';
import axios from 'axios';
import { Local } from '../../../i18n';
import GoogleReCAPTCHA from '../../../components/molecules/reCapture/reCapture';

function LoginOtp(props) {

  const [ShowReCaptcha, setShowReCaptcha] = useState(false);
  const [ResendCount, setResendCount] = useState(0);
  const [tendigit, setTendigit] = useState(false);
  const [timeouts, setTimeouts] = useState(15);
  const [timmeron, setTimeron] = useState(false);
  const [credential, setCredential] = useState({
    email: '',
    password: '',
    confirmPass: '',
    otpValue: '',
    countryCode: '91',
  });

  const [error, setError] = useState({
    email: true,
    password: true,
    confirmPass: true,
  });
  const [showResendCode, setShowResendCode] = useState(true);
  const [enableresend, setEnableResend] = useState(true);
  const [staff, setstaff] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [handlespinner, setHandlespinner] = useState(false);
  const [loginAs, setLoginAs] = useState('patient');
  const [modal, setModal] = useState({ visible: false, text: '' });
  const [changePassword, setChangePassword] = useState(false);
  const { loggingIn, userData, lastRouteMemory } = useSelector(
    (state) => state.AuthReducer,
  );
  const { isPatientAccountReducerLoading } = useSelector(
    (state) => state.PatientReducer,
  );
  const [otp, setOtp] = useState(['', '', '', '']);
  const [validated, setValidated] = useState([true, true, true, true]);
  const inputRefs = [true, null, null, null];
  let timeout = null;

  useEffect(() => {
    if (otp.join('').length > 0) {
      setCredential({ ...credential, otpValue: otp.join('') });
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        let newValidated = [...validated];
        otp.forEach((letter, i) => (newValidated[i] = letter?.length === 1));
        setValidated(newValidated);
        console.log(otp);
      }, 500);
    }

    console.log(credential.otpValue, ':::::::::::::');

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [otp]);

  const [isOtp, setIsOtp] = useState(false);
  const [isEmail, setIsEmail] = useState(true);

  const dispatch = useDispatch();
  let pagerRef = createRef();
  const reg = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  );

  const validEmailRegex = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  );

  const validPhoneRegex = RegExp(
    /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
  );
  const handleEmail = (email) => {
    const test = reg.test(email) || validPhoneRegex.test(email);
    const testEmail = validEmailRegex.test(email);
    const testPhone = validPhoneRegex.test(email);
    console.log(email.length);
    console.log(tendigit);
    if (validEmailRegex.test(email) == true) {
      setIsEmail(true);
    } else if (validPhoneRegex.test(email) == true && email.length <= 10) {
      setIsEmail(false);
      setTendigit(true);
      setTimeout(() => {
        setTendigit(false);
      }, 2000);
    }

    console.log(isEmail, 'dfjsdlfkj');
    setError({ ...error, email: test });
    setCredential({ ...credential, email });
  };

  const handleOtp = (otp) => {
    setCredential({ ...credential, otpValue: otp });
  };

  const handlePassword = (password) => {
    setCredential({ ...credential, password: password });
  };

  const handleConfirmPassword = (confirmPass) => {
    setCredential({ ...credential, confirmPass: confirmPass });
  };

  const handleSendOtp = () => {
    /*
      by EMAIL to create otp : https://server.docplus.online/otp/create
      payload : {
        checkIsExist: "patient"
        email: "rahulkashyap2870@gmail.com"
      }

      by email to verify otp : https://server.docplus.online/otp/verify
      payload : {
        email: "rahulkashyap2870@gmail.com"
        otp: "5823"
        patient: true
      }
      response : {"status":true,"message":"Otp verified"}


     */
    console.log('credential : ', credential);
    if (credential.email !== '') {
      console.log(loginAs);
      // setIsOtp(true)
      const OTP = {
        // email: credential.email,
        checkIsExist: loginAs === 'patient' ? 'patient' : 'doctor',
        // mobile: credential.email
      };

      OTP[isEmail ? 'email' : 'mobile'] =
        credential.email.length === 10
          ? `+${credential.countryCode + '' + credential.email}`
          : credential.email;

      console.log(OTP, '%%%%%%%%%%%');
      dispatch(
        sendOTP(
          OTP,
          () => {
            setIsOtp(true);
            // setModal({ text: faildResponce.message, visible: true });
            console.log('sent otp');
            showTost('OTP sent!', () => { });
          },
          (err) => {
            setModal({ text: err.response.data.message, visible: true });
          },
        ),
      );
    }
  };

  const successCallback = (successResponce) => {
    setLoginLoading(false);
    showTost(successResponce.message.toString(), () => {
      // console.log(lastRouteMemory, '.lastRouteMemory.___________________');
      lastRouteMemory.routeName !== ''
        ? props.navigation.navigate(lastRouteMemory.routeName, {
          data: lastRouteMemory.params,
        })
        : props.navigation.navigate(
          successResponce.members && successResponce.members > 0
            ? // ? 'ContinueAs'
            'MainController'
            : 'MainController',
        );
    });
  };
  const timer = () => {
    setTimeron(true);
    setTimeout(() => {
      setTimeron(false);
    }, 17000);
  };
  useEffect(() => {
    if (timmeron) {
      setTimeout(() => {
        setTimeouts(timeouts - 1);
      }, 1000);
    } else {
      setTimeouts(15);
      setShowReCaptcha(false);
    }
  });

  const errorCallback = (faildResponce) => {
    setLoginLoading(false);
    setModal({ text: faildResponce.message, visible: true });
    showTost(faildResponce.message, () => { });
    console.log(`PatientLoginAction(error):  ${faildResponce.message}`);
  };

  const handlePatientLogin = (credential) => {
    let _credentials = {};
    _credentials['otp'] = credential.otp;
    _credentials[isEmail ? 'email' : 'phone'] = credential.email;

    console.log(_credentials, 'kldlfjdslfkjdf');

    dispatch(LoginPatient(_credentials, successCallback, errorCallback));
  };
  const handleDoctorLogin = (credential) => {
    let _credentials = {};
    _credentials['otp'] = credential.otp;
    _credentials[isEmail ? 'email' : 'phone'] = credential.email;

    console.log(_credentials, 'KLDJFKLDJFS');

    dispatch(LoginDoctor(_credentials, successCallback, errorCallback));
  };

  const handleVerifyOtp = () => {
    setShowResendCode(!showResendCode);
    setShowReCaptcha(false);
    setHandlespinner(true);
    setCredential({ ...credential, otpValue: otp.join('') });
    if (credential.otpValue !== '') {
      const _OTP = {
        otp: credential.otpValue,
        // email: credential.email
      };
      _OTP[isEmail ? 'email' : 'phone'] = credential.email;
      console.log(_OTP, '::::::::::::::::');
      axios.post(`${Host}/otp/verify`, _OTP).then((res) => {
        console.log(res, 'OTP verified');
        setHandlespinner(false);
        if (res.data.status) {
          handleLogin({ email: credential.email, otp: credential.otpValue });
          // setChangePassword(true)
          showTost('OTP verified!', () => { });
        } else {
          setModal({ text: res.data.message, visible: true });
          throw new Error(res.data.message);
        }
      });
    }
  };

  const handleLogin = (credential) => {
    const { email, otp } = credential;
    console.log(credential, ':::::::::::::');
    if (
      email !== '' &&
      //   password !== '' &&
      error.email &&
      otp.length <= 4
    ) {
      setLoginLoading(true);
      loginAs === 'patient' && handlePatientLogin(credential);
      loginAs === 'doctor' && !staff && handleDoctorLogin(credential);
      loginAs === 'doctor' && staff && handleStaffLogin(credential);
    } else {
      let modalValue = {
        text:
          email.length === 10
            ? 'Please enter phone number with country code'
            : email.length == 0
              ? 'Please enter a valid email or phone number'
              : password.length < 1
                ? 'Please enter a valid password'
                : 'Please enter valid email or phone number with country code',
        visible: true,
      };
      setModal(modalValue);
    }
  };

  // BackHandler.addEventListener('hardwareBackPress', () => {
  //   props.navigation.navigate('pageNavigation');
  // });

  const handleChangePassword = () => {
    const { password, confirmPass } = credential;
    if (password === confirmPass) {
      loginAs === 'patient' && handlePatientPasswordChange();
      loginAs === 'doctor' && handleDoctorPasswordChange();
    } else {
      setModal({ text: 'Password Mismatch!', visible: true });
      console.log('Password Mismatch');
    }
  };

  const handlePatientPasswordChange = () => {
    const { email, password } = credential;
    axios
      .post(`${Host}/patient/password/update`, { email, password })
      .then((res) => {
        console.log(res, 'password changed');
        if (res.data.status) {
          // setChangePassword(true)
          props.navigation.navigate('loginScreen');
          console.log('password changed');
          showTost('Password Changed!', () => { });
        } else {
          console.log(res.data.message);
          setModal({ text: res.data.message, visible: true });
          // throw new Error(res.data.message)
        }
      })
      .catch((err) => {
        // console.log(err.response.data.message, "?????????????????")
        // console.log(err.response.data.message)
        setModal({ text: err.response.data.message, visible: true });
      });
  };

  const handleDoctorPasswordChange = () => {
    const { email, password } = credential;
    axios
      .post(`${Host}/doctors/password/update`, { email, password })
      .then((res) => {
        console.log(res, 'password changed');
        if (res.data.status) {
          // setChangePassword(true)
          props.navigation.navigate('loginScreen');
          console.log('password changed');
          showTost('Password Changed!', () => { });
        } else {
          setModal({ text: res.data.message, visible: true });
          throw new Error(res.data.message);
        }
      });
  };

  /* const handleLogin = () => {
    const { email, password } = credential;
    if (
      email !== '' &&
      password !== '' &&
      reg.test(email) &&
      password.length >= 4
    ) {
      loginAs === 'patient' && handlePatientLogin();
    //   loginAs === 'doctor' && handleDoctorLogin();
      loginAs === 'doctor' && !staff && handleDoctorLogin();
      loginAs === 'doctor' && staff && handleStaffLogin();

    } else {
      let modalValue = {
        text:
          password.length < 4
            ? 'Password must be atleast 4 characters'
            : reg.test(email)
              ? 'One or more fields empty'
              : 'Not a valid Email.',
        visible: true,
      };
      setModal(modalValue);
    }
  };
  const successCallback = (successResponce) => {
    showTost(successResponce.message.toString(), () => {
      console.log(lastRouteMemory, '.lastRouteMemory.___________________')
      lastRouteMemory.routeName !== ''
        ? props.navigation.navigate(lastRouteMemory.routeName, { data: lastRouteMemory.params })
        : props.navigation.navigate(
          successResponce.members
            && successResponce.members > 0
            ? 'ContinueAs'
            : 'MainController')
    });
  };

  const errorCallback = (faildResponce) => {
    setModal({ text: faildResponce.message, visible: true });
    showTost(faildResponce.message, () => { });
    console.log(`PatientLoginAction(error):  ${faildResponce.message}`);
  }; */

  const [passVisible, setPass] = useState(false);
  const [confirmPassVisible, setConfirmPass] = useState(false);
  const viewPassword = () => {
    setPass(!passVisible);
  };

  const viewConfirmPassword = () => {
    setConfirmPass(!confirmPassVisible);
  };

  const showTost = (msg = '...', callback) => {
    Toast.show(msg, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      },
    });
    callback && callback();
  };

  const nextpage = (page) => {
    pagerRef.current.setPage(page);
  };
  const countryCodeHandler = (text) => {
    setCredential({ ...credential, countryCode: text });
  };
  return (
    <>
      <GenericError
        {...modal}
        onCancel={() => {
          setModal({ text: '', visible: false });
        }}
      />
      <View style={{ backgroundColor: 'white', position: 'relative' }}>
        <TopNavBar
          headerText="Verification"
          hideRightComp={true}
          onLeftButtonPress={() => {
            props.navigation.goBack();
            // nextpage(0);
          }}
          navigation={props.navigation}
          style={{
            Container: {
              height: 'auto',
              marginTop: 5,
              marginRight: 200,
            },
          }}
        />
      </View>
      <ViewPager
        ref={pagerRef}
        style={styles.viewPager}
        initialPage={0}
        scrollEnabled={false}>
        <View key="0">
          <SignupSplash
            signupAs={props?.route?.params?.loginAs}
            setSignupAs={setLoginAs}
            onPress={() => nextpage(1)}
          />
        </View>
        <View
          style={{
            fontFamily: 'Gilroy',
            fontWeight: 600,
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 17,
            position: 'absolute',
          }}
          key="1">
          <KeyboardAvoidingView>
            <View
              style={{
                flex: 1,
                marginTop: 40,
              }}>
              {isOtp && !changePassword && (
                <View>
                  <DmzText
                    text={
                      !changePassword
                        ? `${Local('patient.login.enter_your_code')}`
                        : `${Local('patient.login.change_pass')}`
                    }
                    style={styles.HeaderText}
                  />
                  <DmzText
                    text="Please type the code we sent to"
                    style={{
                      fontFamily: 'Gilroy',
                      marginTop: 15,
                      width: '100%',
                      textAlign: 'center',
                      fontSize: 14,
                      lineHeight: 16,
                      marginRight: 100,
                      paddingRight: 50,
                      color: '#7A7979',
                    }}
                  />
                </View>
              )}
              {isOtp && !changePassword && (
                <DmzText
                  text={credential.email}
                  style={{
                    fontFamily: 'Gilroy',
                    marginTop: 25,
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 24,
                    color: '#43A2A2',
                    marginLeft: 60,
                    lineHeight: 25,

                    paddingRight: 150,
                  }}
                />
              )}
              {console.log(credential.email)}
              {/* <DmzText
            Text="nishankphulera17@gmail.com"
            style={{
              fontFamily: 'Gilroy',
              marginTop: 5,
              width: '100%',
              textAlign: 'center',
              marginBottom: 280,
              fontSize: 24,
              color: 'black',
              lineHeight: 20,
              marginRight: 60,
            }}
          /> */}
              {/*<View
            style={{
              backgroundColor: '#ededed',
              height: 100,
              width: 100,
              paddingVertical: 20,
              paddingHorizontal: 20,
              borderRadius: 64,
            }}>
            <UserProfile />
          </View>*/}
              <View>
                {!isOtp && !changePassword && (
                  <TextInputIcon
                    style={styles.inputContainer}
                    autoCapitalize="none"
                    inputHandler={handleEmail}
                    textContentType="emailAddress"
                    keyboardType={'email-address'}
                    textStyle={{
                      paddingLeft: 20,
                      color: NEW_HEADER_TEXT,
                      fontSize: 14,
                      fontFamily: 'Montserrat-Medium',
                      flex: 1,
                    }}
                    placeholderTextColor={INPUT_PLACEHOLDER}
                    hasIcon={true}
                    iconName="email"
                    placeholder={`${Local('patient.login.email_or_phone')}`}
                    iconStyle={{ alignSelf: 'center' }}
                    iconColor={NEW_PRIMARY_BACKGROUND}
                    size={30}
                    validationCallback={() =>
                      reg.test(credential.email) ||
                      validPhoneRegex.test(credential.email)
                    }
                    value={credential.email}
                  />
                )}
                {!error.email && (
                  <AnimatedErrorText text={'Email/Phone should be valid'} />
                )}
                {tendigit && (
                  <AnimatedErrorText
                    text={
                      'Please enter a valid mobile number with country\ncode ( eg. 919123451234 )'
                    }
                  />
                )}
              </View>

              {/* {isOtp && !changePassword && <TextInputIcon */}
              {false && (
                <TextInputIcon
                  // {true && <TextInputIcon
                  style={styles.inputContainer}
                  autoCapitalize="none"
                  textStyle={{
                    paddingLeft: 20,
                    color: NEW_HEADER_TEXT,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                    flex: 1,
                  }}
                  maxLength={4}
                  // secureTextEntry={!passVisible}
                  // validationCallback={() => credential.Otp.length >= 4}
                  value={credential.otpValue}
                  hasIcon={true}
                  inputHandler={handleOtp}
                  iconName="lock"
                  placeholderTextColor={INPUT_PLACEHOLDER}
                  placeholder="OTP"
                  iconStyle={{ alignSelf: 'center' }}
                  iconColor={NEW_PRIMARY_BACKGROUND}
                  size={30}>
                  {/* <Icon
              onPress={viewPassword}
              name={passVisible ? 'eye' : 'eye-off'}
              style={{
                alignSelf: 'center',
              }}
              size={25}
            /> */}
                </TextInputIcon>
              )}

              {isOtp && !changePassword && (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: '5%',
                    marginLeft: 78,
                  }}>
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
                </View>
              )}

              {changePassword && (
                <>
                  <TextInputIcon
                    style={styles.inputContainer}
                    autoCapitalize="none"
                    textStyle={{
                      paddingLeft: 20,
                      color: NEW_HEADER_TEXT,
                      fontSize: 14,
                      fontFamily: 'Montserrat-Medium',
                      flex: 1,
                    }}
                    secureTextEntry={!passVisible}
                    validationCallback={() => credential.password.length >= 4}
                    value={credential.password}
                    hasIcon={true}
                    inputHandler={handlePassword}
                    iconName="lock"
                    placeholderTextColor={INPUT_PLACEHOLDER}
                    placeholder="Password"
                    iconStyle={{ alignSelf: 'center' }}
                    iconColor={NEW_PRIMARY_BACKGROUND}
                    size={30}>
                    <Icon
                      onPress={viewPassword}
                      name={passVisible ? 'eye' : 'eye-off'}
                      style={{
                        alignSelf: 'center',
                      }}
                      size={25}
                    />
                  </TextInputIcon>
                  <TextInputIcon
                    style={styles.inputContainer}
                    autoCapitalize="none"
                    textStyle={{
                      paddingLeft: 20,
                      color: NEW_HEADER_TEXT,
                      fontSize: 14,
                      fontFamily: 'Montserrat-Medium',
                      flex: 1,
                    }}
                    secureTextEntry={!confirmPassVisible}
                    validationCallback={() =>
                      credential.confirmPass.length >= 4
                    }
                    value={credential.confirmPass}
                    hasIcon={true}
                    inputHandler={handleConfirmPassword}
                    iconName="lock"
                    placeholderTextColor={INPUT_PLACEHOLDER}
                    placeholder="Confirm Password"
                    iconStyle={{ alignSelf: 'center' }}
                    iconColor={NEW_PRIMARY_BACKGROUND}
                    size={30}>
                    <Icon
                      onPress={viewConfirmPassword}
                      name={confirmPassVisible ? 'eye' : 'eye-off'}
                      style={{
                        alignSelf: 'center',
                      }}
                      size={25}
                    />
                  </TextInputIcon>
                </>
              )}

              {!isOtp && (
                <DmzButton
                  isLoading={isPatientAccountReducerLoading}
                  // onPress={handleLogin}
                  onPress={() => {
                    handleSendOtp();
                    /* props.navigation.navigate(
                    'forgotPasswordEmailOtp',
                    // 'Profile',
                    {email: credential.email},
                    // navigation.navigate('PhoneNumberOtp'),
                  ); */
                  }}
                  style={{
                    Text: {
                      width: '100%',
                      textAlign: 'center',
                      color: '#fff',
                      fontSize: 18,
                      fontFamily: 'Montserrat-SemiBold',
                    },
                    Container: {
                      width: 250,
                      height: 46,
                      borderRadius: 25,
                      backgroundColor: SECONDARY_COLOR,
                      alignSelf: 'center',
                      marginTop: 50,
                      elevation: 3,
                    },
                  }}
                  text="Send OTP"
                //isLoading={loggingIn}
                //disabled={loggingIn}
                />
              )}

              {ShowReCaptcha && (
                <GoogleReCAPTCHA
                  count={ResendCount}
                  ShowReCaptcha={ShowReCaptcha}
                  handleSubmit={() => {
                    handleSendOtp();
                    setShowReCaptcha(false);
                  }}></GoogleReCAPTCHA>
              )}

              {isOtp && !changePassword && (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 100,
                      marginTop: 10,
                    }}>
                    {handlespinner && <ActivityIndicator />}

                    {showResendCode && (
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                          onPress={() => {
                            setResendCount(ResendCount + 1);
                            setShowReCaptcha(true);
                            timer();
                          }}>
                          <Text
                            style={{
                              color: '#EA1A65',
                              fontFamily: 'Gilroy',
                              marginTop: 15,
                              marginBottom: 10,
                              marginLeft: 60,
                              textAlign: 'center',
                              fontWeight: 'bold',
                              fontSize: 16,
                              lineHeight: 19,
                            }}>
                            Resend code{' '}
                          </Text>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: 'Gilroy',
                            marginTop: 15,
                            marginBottom: 10,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 16,
                            lineHeight: 19,
                          }}>
                          in 00:{timeouts}
                        </Text>
                      </View>
                    )}
                  </View>

                  <DmzButton
                    //   isLoading={isPatientAccountReducerLoading}
                    isLoading={loginLoading}
                    // onPress={handleLogin}
                    onPress={() => {
                      handleVerifyOtp();
                      /* props.navigation.navigate(
                  'forgotPasswordEmailOtp',
                  // 'Profile',
                  {email: credential.email},
                  // navigation.navigate('PhoneNumberOtp'),
                ); */
                    }}
                    style={{
                      Text: {
                        width: '100%',
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: 20,
                        fontFamily: 'Montserrat-SemiBold',
                        lineHeight: 23,
                      },
                      Container: {
                        width: 295,
                        height: 56,
                        borderRadius: 35,
                        backgroundColor: '#088DFF',
                        alignSelf: 'center',
                        marginTop: 50,
                        elevation: 3,
                      },
                    }}
                    text="Continue"
                  //isLoading={loggingIn}
                  //disabled={loggingIn}
                  />
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
          {changePassword && (
            <DmzButton
              isLoading={isPatientAccountReducerLoading}
              // onPress={handleLogin}
              onPress={() => {
                handleChangePassword();

                /* props.navigation.navigate(
                  'forgotPasswordEmailOtp',
                  // 'Profile',
                  {email: credential.email},
                  // navigation.navigate('PhoneNumberOtp'),
                ); */
              }}
              style={{
                Text: {
                  width: '100%',
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: 'Montserrat-SemiBold',
                },
                Container: {
                  width: 250,
                  height: 46,
                  borderRadius: 25,
                  backgroundColor: LOGINLG1,
                  alignSelf: 'center',
                  marginTop: 50,
                  elevation: 3,
                },
              }}
              text="Change Password"
            //isLoading={loggingIn}
            //disabled={loggingIn}
            />
          )}
          {/* {loginAs == 'doctor' && (
            <TouchableOpacity
              style={{ alignSelf: 'center', marginTop: 24 }}
              onPress={() => {
                setstaff(!staff);
              }}>
              <Text
                style={{
                  color: NEW_PRIMARY_BACKGROUND,
                  fontFamily: 'Montserrat-Bold',
                }}>
                {'   '}
                {'Login as a'} {!staff ? 'staff member' : 'doctor'} {'?'}
              </Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: 'auto',
              alignItems: 'center',
              marginTop: 4,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: NEW_HEADER_TEXT,
                fontSize: 13,
                marginTop: 10,
                fontFamily: 'Montserrat-Regular',
              }}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('signupScreen', { loginAs });
              }}>
              <Text
                style={{
                  color: NEW_PRIMARY_BACKGROUND,
                  textAlign: 'center',
                  fontSize: 13,
                  marginTop: 10,
                  paddingLeft: 10,
                  fontFamily: 'Montserrat-Bold',
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View> */}
          {(isOtp || changePassword) && (
            <TouchableOpacity
              onPress={() => {
                setIsOtp(false);
                setChangePassword(false);
                setCredential({
                  ...credential,
                  // email: '',
                  // password: "",
                  // confirmPass: "",
                  otpValue: '',
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  margin: '4%',
                  marginBottom: '2%',
                  marginTop: '8%',
                }}></View>
            </TouchableOpacity>
          )}
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
    backgroundColor: SQUAREBOXLG1,
    borderRadius: 6,
    color: 'white',
    fontSize: 28,
    fontFamily: 'Gilroy',
    fontWeight: 'bold',
    marginTop: 40,
    marginRight: 20,
  },
  textStyle: {
    color: NEW_HEADER_TEXT,
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
});

export default LoginOtp;
