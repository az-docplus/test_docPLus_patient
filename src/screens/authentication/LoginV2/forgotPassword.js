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
import GoogleReCAPTCHA from '../../../components/molecules/reCapture/reCapture';
function forgotPassword(props) {
  const [ShowReCaptcha, setShowReCaptcha] = useState(false);
  const [ResendCount, setResendCount] = useState(0);
  const [credential, setCredential] = useState({
    email: '',
    password: '',
    confirmPass: '',
    otpValue: '',
  });
  const [error, setError] = useState({
    email: true,
    password: true,
    confirmPass: true,
  });
  const [tendigit, setTendigit] = useState(false);
  const [staff, setstaff] = useState(false);
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

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );

  const validPhoneRegex = RegExp(
    /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
  );

  const handleEmail = (email) => {
    const test = reg.test(email) || validPhoneRegex.test(email);
    if (validEmailRegex.test(email) == true) {
      setIsEmail(true);
    } else if (validPhoneRegex.test(email) == true && email.length <= 10) {
      setIsEmail(false);
      setTendigit(true);
      setTimeout(() => {
        setTendigit(false);
      }, 6000);
    }
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

  /* const handlePatientLogin = () => {
    const _credentials = {
      ...credential,
      email: credential.email.toLowerCase()
    }
    dispatch(LoginPatient(_credentials, successCallback, errorCallback));
  };
  const handleDoctorLogin = () => {
    const _credentials = {
      ...credential,
      email: credential.email.toLowerCase()
    }
    dispatch(LoginDoctor(_credentials, successCallback, errorCallback));
  }; */

  const handleSendOtp = () => {
    if (credential.email !== '') {
      console.log(loginAs);
      // setIsOtp(true)
      const OTP = {
        // email: credential.email,
        checkIsExist: loginAs === 'patient' ? 'patient' : 'doctor',
        // mobile: credential.email
      };

      OTP[isEmail ? 'email' : 'mobile'] = credential.email;
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

  const handleVerifyOtp = () => {
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
        if (res.data.status) {
          setChangePassword(true);
          showTost('OTP verified!', () => { });
        } else {
          setModal({ text: res.data.message, visible: true });
          throw new Error(res.data.message);
        }
      });
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
    let emailPhoneToPass = {}
    if (validPhoneRegex.test(email)) {
      emailPhoneToPass = { phone: email, password }
    } else {
      emailPhoneToPass = { email, password }
    }
    axios
      .post(`${Host}/patient/password/update`, emailPhoneToPass)
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
        console.log(err.response.data.message, '?????????????????');
        // console.log(err.response.data.message)
        setModal({ text: err.response.data.message, visible: true });
      });
  };

  const handleDoctorPasswordChange = () => {
    const { email, password } = credential;
    let emailPhoneToPass = {}
    if (validPhoneRegex.test(email)) {
      emailPhoneToPass = { phone: email, password }
    } else {
      emailPhoneToPass = { email, password }
    }

    axios
      .post(`${Host}/doctors/password/update`, emailPhoneToPass)
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
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key="1">
        <DmzText
        text={!changePassword?'Forgot Password!': 'Change Password!'}
        style={styles.HeaderText}
        />
        <View
        style={{
        backgroundColor: '#ededed',
        height: 100,
        width: 100,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 64,
      }}>
        <UserProfile />
        </View>
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
        placeholder="Email/Phone"
                iconStyle={{alignSelf: 'center'}}
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
        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
      {[0, 1, 2, 3].map((i) => (
        <TextInput
        //   maxLength={1}
        style={[
        styles.inputStyle,
        !validated[i]&& { borderBottomColor: 'red' },
      ]}
        keyboardType="number-pad"
        value={otp[i]}
        // autoFocus={i===0}
        onChangeText={(text) => {
        inputRefs[i + 1]?.focus();
        const newOtp =[...otp];
        newOtp[i]= text[0];
        setOtp(newOtp);
      }}
        onKeyPress={({ nativeEvent }) => {
        if (nativeEvent.key === 'Backspace' && i > 0) {
        inputRefs[i - 1].focus();
        const newOtp =[...otp];
        newOtp[i - 1]= '';
        setOtp(newOtp);
      }
      }}
        ref={(ref) => (inputRefs[i]= ref)}
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
        name={passVisible?'eye': 'eye-off'}
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
        validationCallback={() => credential.confirmPass.length >= 4}
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
        name={confirmPassVisible?'eye': 'eye-off'}
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
      <DmzButton
        isLoading={isPatientAccountReducerLoading}
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
                text="Verify OTP"
                //isLoading={loggingIn}
                //disabled={loggingIn}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  margin: '4%',
                  marginBottom: '2%',
                  marginTop: '8%',
                }}>
                <Text style={{fontFamily: 'Montserrat-Regular'}}>
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
            </View>
      )}

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
        backgroundColor: SECONDARY_COLOR,
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
      {isOtp && !changePassword && (
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
        <Text
        style={{
        color: NEW_PRIMARY_BACKGROUND,
        textAlign: 'center',
        fontSize: 12,
        marginTop: 10,
        paddingLeft: 10,
        fontFamily: 'Montserrat-Medium',
      }}>
        Change email address or phone number?
        </Text>
        </TouchableOpacity>
      )}
        </View>
      </ViewPager>
      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          paddingTop: 5,
          paddingBottom: 15,
        }}>
        <Image
          source={require('../../../assets/icons/new_docplus_log.png')}
          // source={require('../../../assets/images/docplusIcon.png')}
          style={{ height: 30, width: 100 }}
        />
      </View>
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
    fontFamily: 'Montserrat-Bold',
    color: NEW_HEADER_TEXT,
    marginTop: 5,
    width: '100%',
    textAlign: 'center',
    lineHeight: 50,
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

export default forgotPassword;