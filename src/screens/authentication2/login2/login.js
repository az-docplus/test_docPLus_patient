import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LogoImage from '../../../assets/icons/new_docplus_log.png';
import FacebookIcon from '../../../assets2/logo/facebookLogo.png';
import AppleIcon from '../../../assets2/logo/appleLogo.png';
import GoogleIcon from '../../../assets2/logo/googleLogo.png';
import MailIcon from '../../../assets2/logo/mailLogo.png';
import Video from 'react-native-video';
import ButtonCompo from '../../../components/atoms2/button/button';
import InputCompo from '../../../components/atoms2/Input/Input';
import {
  signupSocialPatient,
  sendOTP,
  LoginDoctor,
  LoginPatient,
} from '../../../reduxV2/action/AuthAction';
import { useDispatch } from 'react-redux';
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
import { Host } from '../../../utils/connection';
import axios from 'axios';
import { Local } from '../../../i18n';
import OtpAutocomplete from 'react-native-otp-autocomplete';
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);

const validPhoneRegex = RegExp(
  /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
);

export default function Login({ navigation, route }) {
  const status = 'NO';

  const dispatch = useDispatch();
  const [InputValue, setInputValue] = useState(null);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ visible: false, text: '' });
  // console.log('===============>>>>>>>>>>>isDoctor', isDoctor);
  const successCallback = (successResponce) => {
    setIsLoading(false);
    navigation.navigate(
      successResponce.members && successResponce.members > 0
        ? // ? 'ContinueAs'
          'MainController'
        : 'MainController',
    );
  };
  const errorCallback = (e) => {
    console.log('error : ', e);
    setIsLoading(false);
    setError({ text: e.message, visible: true });
  };
  const routeName = isDoctor ? 'doctors' : 'patient';
  // const checkUserExist = (number_mail) => {
  //   console.log('==============number_mail.phone', number_mail.phone);
  //   axios
  //     .post(`${Host}/${routeName}/check`, { phone: number_mail.phone })
  //     .then((res) => {
  //       console.log(
  //         '===========>>>>>>>>>>>>>>>>xxxxxxxxxxxtrue',
  //         res?.data?.status,
  //       );
  //       const isUser = res?.data?.status;
  //       sendOtpHandler(number_mail, isUser);
  //     })
  //     .catch((e) => {
  //       console.log(
  //         '===========>>>>>>>>>>>>>>>>yyyyyyyyyyyyyyfalse',
  //         e.response.data.status,
  //       );
  //       const isUser = e.response.data.status;
  //       sendOtpHandler(number_mail, isUser);
  //     });
  // };
  const sendOtpHandler = (number_mail) => {
    const isMailOrNumber =
      number_mail && number_mail.email
        ? {
            mode: 'email',
            modeValue: number_mail.email,
          }
        : {
            mode: 'mobile',
            modeValue: number_mail.phone,
          };
    // navigation.navigate('otp-confimation', {
    //   isSignUp: false,
    //   ...isMailOrNumber,
    //   isDoctor,
    // });

    // console.log('===========>>>>>>>>>>>>>>>>xxxxxxxxxxx', data);

    // setIsLoading(false);
   
    OtpAutocomplete.getHash()
      .then((hash) => {
        console.log('getting hash#################', { hash })
      
        dispatch(
          sendOTP(
            {
              [isMailOrNumber.mode]: isMailOrNumber.modeValue,
              checkIsExist: status === 'yes' ? 'doctor' : 'patient',
              hash
            },
            (e) => {
              console.log('otp :::::::::::: ', e);
              setError({ text: '', visible: false });
              setIsLoading(false);
              navigation.navigate('otp-confimation', {
                isSignUp: false,
                ...isMailOrNumber,
                isDoctor,
                isUser: false,
              });
            },
            (err) => {
              axios
                .post(`${Host}/otp/create`, {
                  [isMailOrNumber.mode]: isMailOrNumber.modeValue,
                })
                .then((res) => {
                  navigation.navigate('otp-confimation', {
                    isSignUp: false,
                    ...isMailOrNumber,
                    isDoctor,
                    isUser: true,
                  });
                  console.log(res, 'OTP sent');
                })
                .catch((err) => {
                  console.log('Error : ', err);
                });
              console.log('err : ', err.response.data);
              // setError({ text: 'Please Enter Valid Number', visible: true });
              setIsLoading(false);
            },
          ),
        );
      
      })
      .catch(console.log);
    
  };
  const LoginHandler = (socialData) => {
    //  _credentials  => { email : "fadfa@gmail.com" , password : "DemoDoc@1234" }
    if (isDoctor) {
      // sign in as doctor
      dispatch(LoginDoctor(socialData, successCallback, errorCallback));
    } else {
      // sign in as patient
      dispatch(LoginPatient(socialData, successCallback, errorCallback));
    }
  };
  const socialLoginHandler = async (type) => {
    if (type == 'google') {
      try {
        // await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn(); //If login is successful you'll get user info object in userInfo below I'm just printing it to console. You can store this object in a usestate or use it as you like user is logged in.
        console.log(userInfo);
        const { email, familyName, givenName, id } = userInfo.user;
        let socialData = {
          google: id,
          email,
          firstName: givenName,
          lastName: familyName,
          username: email.split('@')[0],
          // password: 'DemoDoc@1234',
        };
        LoginHandler(socialData);
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          setError({ text: 'You cancelled the sign in', visible: true });
        } else if (error.code === statusCodes.IN_PROGRESS) {
          setError({
            text: 'Google sign In operation is in process',
            visible: true,
          });
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          alert('Play Services not available');
          setError({ text: 'Play Services not available', visible: true });
        } else {
          setError({
            text: `Something unknown went wrong with Google sign in ${error.message}`,
            visible: true,
          });
        }
        setIsLoading(false);
      }
    } else if (type == 'facebook') {
      LoginManager.logInWithPermissions(['public_profile']).then(
        (login) => {
          if (login.isCancelled) {
            setError({ text: `Login cancelled`, visible: true });
          } else {
            // console.log('result ', login.grantedPermissions.toString());
            AccessToken.getCurrentAccessToken().then((data) => {
              const accessToken = data.accessToken.toString();
              const PROFILE_REQUEST_PARAMS = {
                fields: {
                  string: 'id,name,email,first_name,last_name',
                },
              };
              const profileRequest = new GraphRequest(
                '/me',
                { token: accessToken, parameters: PROFILE_REQUEST_PARAMS },
                (error, user) => {
                  if (error) {
                    setError({ text: `login info has error`, visible: true });
                  } else {
                    console.log('result:', user);
                    //! email will not be present in user object, FB sdk does not provide it in android
                    const { email, name, id } = user;
                    setIsLoading(true);
                    let socialData = {
                      facebook: id,
                      email,
                      // firstName: name.split(' ')[0],
                      // lastName: name.split(' ')[1],
                      username: email.split('@')[0],
                      // password: 'DemoDoc@1234',
                    };
                    LoginHandler(socialData);
                  }
                },
              );
              new GraphRequestManager().addRequest(profileRequest).start();
            });
          }
        },
        (error) => {
          console.log('Login fail with error: ' + error);
        },
      );
    }
  };

  useEffect(() => {
    status === 'yes' ? setIsDoctor(true) : setIsDoctor(false);
  }, [status]);
  useEffect(() => {
    return () => {
      setError({ visible: false, text: '' });
    };
  }, []);
  return (
    <>
      <Video
        source={require('../../../assets/Docplus.mp4')}
        rate={1.0}
        volume={1.0}
        muted={false}
        resizeMode={'cover'}
        repeat
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />

      {/*   <ImageBackground style={{ flex: 1, justifyContent: 'space-between', position: 'relative' }} source={require("../../../assets2/image/backgroundImage.png")}> */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 40,
          marginHorizontal: 20,
        }}>
        <Image style={{ width: 130, height: 40 }} source={LogoImage} />

        {isDoctor ? (
          <TouchableOpacity onPress={() => setIsDoctor(false)}>
            {/* <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Not a Doctor?
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                color: '#fff',
                textDecorationLine: 'underline',
                textAlign: 'right',
              }}>
              Sign in here
            </Text> */}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              // navigation.navigate('signup-onboarding', {
              //   phone: '9174203189',
              //   email: null,
              //   status: false,
              // })
              navigation.navigate('LandingPage')
            }>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: 'Gilroy-SemiBold',
              }}>
              {`${Local('doctor.V2.loginScreenCompo.skip')}`}
            </Text>
            {/* <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                color: '#fff',
                textDecorationLine: 'underline',
                textAlign: 'right',
              }}>
              Sign in here
            </Text> */}
          </TouchableOpacity>
        )}
      </View>
      <View style={{ marginTop: 90, marginHorizontal: 15 }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 26,
            fontFamily: 'Montserrat-Bold',
          }}>
          {`${Local('doctor.V2.loginScreenCompo.welcome_to')}`}
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 34,
            fontFamily: 'Montserrat-Bold',
          }}>
          {`${Local('doctor.V2.loginScreenCompo.docplus')}`}
        </Text>
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              lineHeight: 25,
              color: '#E0F4F4',
              fontSize: 20,
              fontFamily: 'Gilroy-Medium',
            }}>
            {isDoctor
              ? `${Local('doctor.V2.loginScreenCompo.make_quality')}`
              : `${Local('doctor.V2.loginScreenCompo.access_quality')}`}{' '}
          </Text>
          <Text
            style={{
              lineHeight: 25,
              color: '#E0F4F4',
              fontSize: 20,
              fontFamily: 'Gilroy-Medium',
            }}>
            {isDoctor
              ? `${Local('doctor.V2.loginScreenCompo.moreAcess')}`
              : `${Local('doctor.V2.loginScreenCompo.yourComfort')}`}
          </Text>
          <Text
            style={{
              lineHeight: 25,
              color: '#E0F4F4',
              fontSize: 20,
              fontFamily: 'Gilroy-Medium',
            }}>
            {`${Local('doctor.V2.loginScreenCompo.convi')}`}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View
          style={{
            backgroundColor: '#F9F9F9',
            paddingVertical: 30,
            paddingHorizontal: 30,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}>
          <View>
            <Text
              style={{
                color: '#297281',
                marginHorizontal: 5,
                fontSize: 19,
                // marginBottom: 10,
                fontFamily: 'Gilroy-SemiBold',
              }}>
              {`${Local('doctor.V2.loginScreenCompo.login_signup')}`}
            </Text>
            <InputCompo
              type="phone" //  mail & phone
              isLoading={isLoading}
              value={(e) => {
                setInputValue(e);
              }}
            />

            <Text
              style={{
                marginTop: error.visible ? 15 : 5,
                fontFamily: 'Gilroy-SemiBold',
                textAlign: 'center',
                marginVertical: 10,
              }}>
              {error.visible ? error.text : ''}
            </Text>

            <View style={{ elevation: 2, marginBottom: 10 }}>
              <ButtonCompo
                title={`${Local('doctor.V2.loginScreenCompo.button')}`}
                isLoading={isLoading}
                pressHandler={() => {
                  if (
                    validEmailRegex.test(InputValue && InputValue.email) ||
                    validPhoneRegex.test(InputValue && InputValue.phone)
                  ) {
                    setError({ text: '', visible: false });
                    setIsLoading(true);
                    sendOtpHandler(InputValue);
                  } else {
                    setError({
                      text: `${Local('doctor.V2.loginScreenCompo.valid')}`,
                      visible: false,
                    });
                    setIsLoading(false);
                  }

                  // setIsLoading(true)
                  // setTimeout(() => {
                  //     setIsLoading(false)
                  // }, 1000)
                }}
              />
            </View>
          </View>

          <View style={{ paddingHorizontal: 40, marginVertical: 25 }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Medium',
                fontSize: 12,
                lineHeight: 16,
                textAlign: 'center',
              }}>
              {`${Local('doctor.V2.loginScreenCompo.privacy_mess')}`}{' '}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 12,
                  lineHeight: 16,
                  textAlign: 'center',
                  color: '#297281',
                }}>
                {`${Local('doctor.V2.loginScreenCompo.condi')}`}
              </Text>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 12,
                  lineHeight: 16,
                  textAlign: 'center',
                  marginHorizontal: 5,
                }}>
                {`${Local('doctor.V2.loginScreenCompo.And')}`}
              </Text>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 12,
                  lineHeight: 16,
                  textAlign: 'center',
                  color: '#297281',
                }}>
                {`${Local('doctor.V2.loginScreenCompo.Privacy_Policy')}`}
              </Text>
            </View>

            {/* <Text
              style={{
                textAlign: 'center',
                marginTop: 10,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {`${Local('doctor.V2.loginScreenCompo.or')}`}
            </Text>
            <Text
              style={{
                fontSize: 10,
                textAlign: 'center',
                fontFamily: 'Montserrat-Regular',
              }}>
              {`${Local('doctor.V2.loginScreenCompo.continue_with')}`}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginHorizontal: 10,
                marginTop: 10,
              }}>
              <TouchableOpacity onPress={() => socialLoginHandler('google')}>
                <Image
                  style={{ width: 80, height: 80, borderRadius: 100 }}
                  source={GoogleIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => socialLoginHandler('facebook')}>
                <Image
                  style={{ width: 80, height: 80, borderRadius: 100 }}
                  source={FacebookIcon}
                />
              </TouchableOpacity>
        
            </View> */}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
