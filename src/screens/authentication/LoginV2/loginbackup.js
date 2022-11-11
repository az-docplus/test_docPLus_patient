/* eslint-disable react-native/no-inline-styles */
import React, {useState, createRef, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
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
import {useDispatch} from 'react-redux/lib/hooks/useDispatch';
import {
  LoginDoctor,
  LoginPatient,
  signInStaff,
} from '../../../reduxV2/action/AuthAction';
import {GetPatientInfo} from '../../../reduxV2/action/PatientAction';
import {useSelector} from 'react-redux/lib/hooks/useSelector';
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
import BlurSpinner from '../../../components/molecules/Modal/BlurLoadingOverlay';
import {useIsFocused} from '@react-navigation/native';
import Otpscreen from '../../../Otpscreen';

function LoginV2(props) {
  const [credential, setCredential] = useState({email: '', password: ''});
  const [error, setError] = useState({
    email: true,
    password: true,
  });

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );

  const validPhoneRegex = RegExp(
    /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
  );

  const [staff, setstaff] = useState(false);
  const [loginAs, setLoginAs] = useState('patient');
  const [modal, setModal] = useState({visible: false, text: ''});
  const {loggingIn, userData, lastRouteMemory} = useSelector(
    (state) => state.AuthReducer,
  );
  const {isPatientAccountReducerLoading} = useSelector(
    (state) => state.PatientReducer,
  );
  const [loginLoading, setLoginLoading] = useState(false);

  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  let pagerRef = createRef();
  const reg = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  );

  const [isEmail, setIsEmail] = useState(false);
  const handleEmail = (email) => {
    // /* if (validEmailRegex.test(email) == true) {
    //   setIsEmail(true);
    //   setError({ ...error, email: false });
    // } else if (validPhoneRegex.test(email) == true) {
    //   setIsEmail(false);
    //   setError({ ...error, email: false });
    // } */

    const test = reg.test(email);
    setError({...error, email: test});
    setCredential({...credential, email});
  };

  const handlePassword = (pass) => {
    setCredential({...credential, password: pass});
  };

  const handlePatientLogin = () => {
    // let _credentials = {};
    // _credentials['password'] = credential.password;
    // _credentials[isEmail ? 'email' : 'phone'] = credential.email;

    const _credentials = {
      ...credential,
      email: credential.email.toLowerCase(),
    };
    dispatch(LoginPatient(_credentials, successCallback, errorCallback));
  };
  const handleDoctorLogin = () => {
    // let _credentials = {};
    // _credentials['password'] = credential.password;
    // _credentials[isEmail ? 'email' : 'phone'] = credential.email;

    const _credentials = {
      ...credential,
      email: credential.email.toLowerCase(),
    };
    dispatch(LoginDoctor(_credentials, successCallback, errorCallback));
  };

  const handleStaffLogin = () => {
    dispatch(signInStaff(credential, successCallback, errorCallback));
  };

  // BackHandler.addEventListener('hardwareBackPress', () => {
  //   props.navigation.navigate('pageNavigation');
  // });

  const handleLogin = () => {
    const {email, password} = credential;
    if (
      email !== '' &&
      password !== '' &&
      reg.test(email) &&
      password.length >= 4
    ) {
      setLoginLoading(true);
      loginAs === 'patient' && handlePatientLogin();
      loginAs === 'doctor' && !staff && handleDoctorLogin();
      loginAs === 'doctor' && staff && handleStaffLogin();
    } else {
      let modalValue = {
        // text:
        //   password.length < 1
        //     ? 'Please enter a valid password'
        //     :  email.length === 10 ? "Please enter phone number with country code" : email.length == 0 ? "Please enter a valid email or phone number" : "",
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
    setLoginLoading(false);
    showTost(successResponce.message.toString(), () => {
      console.log(lastRouteMemory, '.lastRouteMemory.___________________');
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

  const errorCallback = (faildResponce) => {
    setLoginLoading(false);
    setModal({text: faildResponce.message, visible: true});
    showTost(faildResponce.message, () => {});
    console.log(`PatientLoginAction(error):  ${faildResponce.message}`);
  };

  const [passVisible, setPass] = useState(false);
  const viewPassword = () => {
    setPass(!passVisible);
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

  // useEffect(() => {
  //   nextpage(0)
  // }, [isFocused])

  return (
    <>
      {loginLoading && (
        <BlurSpinner visible={true}>
          <ActivityIndicator color={NEW_PRIMARY_BACKGROUND} size="large" />
        </BlurSpinner>
      )}
      <GenericError
        {...modal}
        onCancel={() => {
          setModal({text: '', visible: false});
        }}
      />
      <View style={{backgroundColor: 'white', position: 'relative'}}>
        <TopNavBar
          hideRightComp={true}
          onLeftButtonPress={() => {
            // nextpage(0);
            // setLoginAs(null)
            props.navigation.goBack();
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
            signupAs={loginAs}
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
          <DmzText text="Welcome back!" style={styles.HeaderText} />
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
              placeholder="Email"
              iconStyle={{alignSelf: 'center'}}
              iconColor={NEW_PRIMARY_BACKGROUND}
              size={30}
              validationCallback={() => reg.test(credential.email)}
              value={credential.email}
            />
            {!error.email && (
              <AnimatedErrorText text={'Email id should be valid'} />
            )}
          </View>

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
            iconStyle={{alignSelf: 'center'}}
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
          <DmzButton
            isLoading={isPatientAccountReducerLoading}
            onPress={handleLogin}
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
            text="LOGIN"
            //isLoading={loggingIn}
            //disabled={loggingIn}
          />
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
          )} */}
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
                //props.navigation.navigate('signupScreen', {loginAs});
                navigation.navigate('Otpscreen');
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
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('forgotPassword');
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
              Forgot Password?
            </Text>
          </TouchableOpacity>
          {/* </View> */}
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
          // source={require('../../../assets/images/docplusIcon.png')}
          source={require('../../../assets/icons/new_docplus_log.png')}
          style={{height: 30, width: 100}}
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
});

export default LoginV2;
