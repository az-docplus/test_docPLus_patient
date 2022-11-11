/* eslint-disable react-native/no-inline-styles */
import React, { useState, createRef, useRef, useEffect } from 'react';
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
  Alert,
} from 'react-native';
import Toast from 'react-native-root-toast';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import TextInputIcon from '../../../components/atoms/TextInputCustom/TextInputIcon';
import { useDispatch } from 'react-redux/lib/hooks/useDispatch';
import {
  LoginDoctor,
  LoginPatient,
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
import BlurSpinner from '../../../components/molecules/Modal/BlurLoadingOverlay';
import { useIsFocused } from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';

import LoginOtp from './LoginOtp';

import { SocialIcon } from 'react-native-elements';
import { Local } from '../../../i18n';

// GoogleSignin.configure({
//   androidClientId:
//     '744322623567-1dfr0m9icl3k6h35a5s1vlkmsq9ve6b7.apps.googleusercontent.com',
//   // iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
// });

function LoginV2(props) {
  const [credential, setCredential] = useState({ email: '', password: '' });
  const [error, setError] = useState({
    email: true,
    password: true,
  });

  console.log(props?.signup, '^^^^^^^^^^^^^^^^^^^^');

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );

  const validPhoneRegex = RegExp(
    /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
  );

  const [staff, setstaff] = useState(false);
  const [loginAs, setLoginAs] = useState('');
  const [modal, setModal] = useState({ visible: false, text: '' });
  const { loggingIn, userData, lastRouteMemory } = useSelector(
    (state) => state.AuthReducer,
  );
  const { isPatientAccountReducerLoading } = useSelector(
    (state) => state.PatientReducer,
  );
  const [loginLoading, setLoginLoading] = useState(false);

  const dispatch = useDispatch();
  let pagerRef = createRef();
  const reg = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  );

  useEffect(() => {
    console.log(props?.signup, '%%%%%%%%%%%%%%');
    if (props?.signup) {
      console.log('dkfjdklfjdf');
      props.navigation.navigate('signupScreen', { loginAs });
    }
  }, [loginAs]);

  const [isEmail, setIsEmail] = useState(true);
  const handleEmail = (email) => {
    if (validEmailRegex.test(email)) {
      setIsEmail(true);
      setError({ ...error, email: true });
    } else if (validPhoneRegex.test(email)) {
      setIsEmail(false);
      setError({ ...error, email: true });
    } else {
      setError({ ...error, email: false });
    }

    // const test = reg.test(email);
    // setError({ ...error, email: test });
    setCredential({ ...credential, email });
  };

  useEffect(() => {
    console.log(isEmail, 'kldfjsdljdsklfj');
  }, [isEmail]);

  const handlePassword = (pass) => {
    setCredential({ ...credential, password: pass });
  };

  const handlePatientLogin = (credential) => {
    let _credentials = {};
    _credentials['password'] = credential.password;
    _credentials[isEmail ? 'email' : 'phone'] = credential.email;

    console.log(_credentials, 'kldlfjdslfkjdf');

    // const _credentials = {
    //   ...credential,
    //   email: credential.email.toLowerCase()
    // }

    dispatch(LoginPatient(_credentials, successCallback, errorCallback));
  };
  const handleDoctorLogin = (credential) => {
    let _credentials = {};
    _credentials['password'] = credential.password;
    _credentials[isEmail ? 'email' : 'phone'] = credential.email;

    // const _credentials = {
    //   ...credential,
    //   email: credential.email.toLowerCase()
    // }
    dispatch(LoginDoctor(_credentials, successCallback, errorCallback));
  };

  const handleStaffLogin = () => {
    dispatch(signInStaff(credential, successCallback, errorCallback));
  };

  // BackHandler.addEventListener('hardwareBackPress', () => {
  //   props.navigation.navigate('pageNavigation');
  // });

  const handleLogin = (credential) => {
    const { email, password } = credential;
    console.log(credential, ':::::::::::::');
    if (
      email !== '' &&
      password !== '' &&
      error.email &&
      password.length >= 4
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

  const errorCallback = (faildResponce) => {
    setLoginLoading(false);
    setModal({ text: faildResponce.message, visible: true });
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

  const isFocused = useIsFocused();

  useEffect(() => {
    nextpage(0);
  }, [isFocused]);

  const logoutWithFacebook = () => {
    LoginManager.logOut();
  };

  const getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,email,first_name,last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          console.log('result:', user);
          //! email will not be present in user object, FB sdk does not provide it in android
          setIsEmail(true);
          const { email, name, id } = user;
          let socialData = {
            facebook: id,
            email,
            // firstName: name.split(' ')[0],
            // lastName: name.split(' ')[1],
            username: email.split('@')[0],
            //  password: 'DemoDoc@1234',
          };
          console.log(socialData, 'FDKLFDSL');
          setCredential(socialData);
          handleLogin(socialData);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const loginWithFacebook = () => {
    setIsEmail(true);
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(
      (login) => {
        if (login.isCancelled) {
          console.log('Login cancelled', login);
        } else {
          console.log('result ', login.grantedPermissions.toString());
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      (error) => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

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
          setModal({ text: '', visible: false });
        }}
      />
      <View style={{ backgroundColor: 'white', position: 'relative' }}>
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
          <DmzText
            text={`${Local('patient.landing_page.welcome_back')}`}
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
              // validationCallback={() => reg.test(credential.email)}
              validationCallback={() => error.email}
              value={credential.email}
            />
            {!error.email && credential.email !== '' && (
              <AnimatedErrorText
                text={'Please enter a valid email or phone number'}
              />
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
            placeholder={`${Local('patient.login.pass')}`}
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

          <TouchableOpacity
            style={{
              justifyContent: 'flex-start',
            }}
            onPress={() => {
              props.navigation.navigate('LoginOtp', {
                loginAs: loginAs,
              });
            }}>
            <Text
              style={{
                color: NEW_PRIMARY_BACKGROUND,
                textAlign: 'left',
                fontSize: 12,
                marginTop: 10,
                // marginBottom: 10,
                paddingLeft: 10,
                fontFamily: 'Montserrat-Medium',
              }}>
              {Local('patient.login.login_otp')}
            </Text>
          </TouchableOpacity>
          <DmzButton
            isLoading={isPatientAccountReducerLoading}
            onPress={() => {
              handleLogin(credential);
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
                marginTop: 10,
                elevation: 3,
              },
            }}
            text={`${Local('patient.login.login_caps')}`}
            //isLoading={loggingIn}
            //disabled={loggingIn}
          />

          {loginAs == 'doctor' && (
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
              {Local('patient.login.dont_have_acc')}
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
                {Local('patient.signup.sign_up')}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('forgotPassword', {
                loginAs: loginAs,
              });
            }}>
            <Text
              style={{
                color: NEW_PRIMARY_BACKGROUND,
                textAlign: 'center',
                fontSize: 12,
                marginTop: 10,
                // marginBottom: 10,
                paddingLeft: 10,
                fontFamily: 'Montserrat-Medium',
              }}>
              {Local('patient.login.forgot_password')}
            </Text>
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: NEW_HEADER_TEXT,
                textAlign: 'center',
                fontSize: 12,
                marginTop: 4,
                marginBottom: 0,
                paddingLeft: 10,
                fontFamily: 'Montserrat-Medium',
              }}>
              — {Local('patient.login.or')} —
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: NEW_PRIMARY_BACKGROUND,
                textAlign: 'center',
                fontSize: 13,
                marginTop: 6,
                marginLeft: '4%',
                fontFamily: 'Montserrat-Bold',
              }}>
              {Local('patient.login.login_with')}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: 'auto',
              alignItems: 'center',
              paddingLeft: 20,
              marginTop: 0,
              paddingBottom: 2,
            }}>
            <SocialIcon
              style={{
                height: 35,
                width: 35,
              }}
              iconSize={20}
              type="facebook"
              onPress={() => {
                loginWithFacebook();
              }}
              // name="sc-facebook"
              // color="#4285f4"
              // size={35}
            />
            <SocialIcon
              style={{
                height: 35,
                width: 35,
              }}
              iconSize={20}
              type="google"
              onPress={() => {
                async function signIn() {
                  try {
                    // await GoogleSignin.revokeAccess();
                    await GoogleSignin.signOut();
                    await GoogleSignin.hasPlayServices();
                    const userInfo = await GoogleSignin.signIn(); //If login is successful you'll get user info object in userInfo below I'm just printing it to console. You can store this object in a usestate or use it as you like user is logged in.
                    console.log(userInfo);
                    setIsEmail(true);
                    const { email, familyName, givenName, id } = userInfo.user;
                    let socialData = {
                      google: id,
                      email,
                      firstName: givenName,
                      lastName: familyName,
                      username: email.split('@')[0],
                      //  password: 'DemoDoc@1234',
                    };
                    setCredential(socialData);
                    handleLogin(socialData);
                  } catch (error) {
                    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                      alert('You cancelled the sign in.');
                    } else if (error.code === statusCodes.IN_PROGRESS) {
                      alert('Google sign In operation is in process');
                    } else if (
                      error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
                    ) {
                      alert('Play Services not available');
                    } else {
                      alert(
                        'Something unknown went wrong with Google sign in. ' +
                          error.message,
                      );
                    }
                  }
                }
                signIn();
              }}
              // name="google"
              // color="#fbbc05"
              // size={27}
            />
          </View>
        </View>
      </ViewPager>
      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          // paddingTop: 5,
          marginLeft: '0%',
          paddingBottom: 15,
        }}>
        <Image
          // source={require('../../../assets/images/docplusIcon.png')}
          source={require('../../../assets/icons/new_docplus_log.png')}
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
});

export default LoginV2;
