import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import LogoImage from '../../../assets/icons/new_docplus_log.png';
import ButtonCompo from '../../../components/atoms2/button/button';
import InputCompo from '../../../components/atoms2/Input/Input';
import FacebookIcon from '../../../assets2/logo/facebookLogo.png';
import AppleIcon from '../../../assets2/logo/appleLogo.png';
import GoogleIcon from '../../../assets2/logo/googleLogo.png';
import Video from 'react-native-video';
import {
  signupSocialPatient,
  sendOTP,
} from '../../../reduxV2/action/AuthAction';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Host } from '../../../utils/connection';
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

const validPhoneRegex = RegExp(
  /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
);

export default function SignUp({ navigation, route }) {
  const status = route.params.verifyStatus;
  console.log(status);
  const dispatch = useDispatch();
  const [InputValue, setInputValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ visible: false, text: '' });

  const LoginHandler = (socialData) => {
    //  _credentials  => { email : "fadfa@gmail.com" , password : "DemoDoc@1234" }
    // console.log("social data : ", socialData)
    navigation.navigate('signup-onboarding', {
      email: socialData.email,
      phone: null,
    });
  };
  const sendOtpHandler = (number) => {
 

    dispatch(
      sendOTP(
        {
          mobile: number,
          //checkUserExist: "patient"
        },
        (e) => {
          setIsLoading(false);
          setError({ text: '', visible: false });
          navigation.navigate('otp-confimation', {
            isSignUp: true,
            mode: 'phone',
            modeValue: number,
            isDoctor: status,
            status: status,
          });
        },
        (err) => {
          //console.log("err : ", err)
          setError({ text: JSON.stringify(err.message), visible: true });
          setIsLoading(false);
        },
      ),
    );
  };
  const CheckIsUserExist = (number) => {
    sendOtpHandler(number);

    // const checkApi = axios.post(`${Host}/doctors/check`, { phone: number })
    // checkApi
    //     .then((res) => {
    //         if (res?.data?.status) {
    //             sendOtpHandler(number)
    //             setError({ text: "", visible: false })
    //         } else {
    //             setError({ text: "This email is already registered", visible: true })
    //             setIsLoading(false)
    //         }
    //     }).catch((e) => {
    //         if (!e.response.data.status) {
    //             setError({ text: "This email is already registered", visible: true })
    //             setIsLoading(false)
    //         } else {
    //             console.log('====>>>>>>>>>>>', e.response.data.message, e.response.data.status)
    //             setError({ text: e.response.data.message, visible: true })
    //             setIsLoading(false)
    //         }
    //     })
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
    return () => {
      setError({ visible: false, text: '' });
    };
  }, []);
  return (
    // <ImageBackground style={{ flex: 1, justifyContent: 'space-between', position: 'relative' }} source={require("../../../assets2/image/backgroundImage.png")}>
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
      <View style={{ marginTop: 30, marginHorizontal: 20 }}>
        <Image style={{ width: 130, height: 40 }} source={LogoImage} />
        <View style={{ marginTop: 50, marginHorizontal: 5 }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 26,
              fontFamily: 'Montserrat-Bold',
            }}>
            Welcome to
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 34,
              fontFamily: 'Montserrat-Bold',
            }}>
            Docplus
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 17,
              fontFamily: 'Montserrat-Regular',
              marginTop: 20,
            }}>
            Your access to the{' '}
            <Text style={{ fontSize: 20, fontFamily: 'Montserrat-SemiBold' }}>
              Doctors, Treatments
            </Text>{' '}
            and{' '}
            <Text style={{ fontSize: 20, fontFamily: 'Montserrat-SemiBold' }}>
              procedures
            </Text>{' '}
            around the Globe
          </Text>
        </View>
      </View>

      <View
        style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View
          style={{
            backgroundColor: '#fff',
            paddingVertical: 25,
            paddingHorizontal: 30,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}>
          <View>
            <Text
              style={{
                fontSize: 19,
                marginBottom: 20,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Sign up
            </Text>
            <InputCompo
              type="phone"
              isLoading={isLoading}
              value={(e) => setInputValue(e)}
            />
            <Text
              style={{
                marginTop: 15,
                fontFamily: 'Montserrat-SemiBold',
                textAlign: 'center',
                marginVertical: 10,
              }}>
              {error.visible ? error.text : ''}
            </Text>
            <View
              style={{
                marginTop: 15,
                zIndex: -1,
              }}>
              <ButtonCompo
                title="Continue"
                isLoading={isLoading}
                pressHandler={() => {
                  if (validPhoneRegex.test(InputValue && InputValue.phone)) {
                    setIsLoading(true);
                    setError({ text: '', visible: false });
                    CheckIsUserExist(InputValue.phone);
                  } else {
                    setIsLoading(false);
                    setError({ text: 'Enter valid number', visible: true });
                  }
                }}
              />
            </View>
          </View>

          <View style={{ elevation: 3 }}>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 10,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              OR
            </Text>
            <Text
              style={{
                fontSize: 10,
                textAlign: 'center',
                marginTop: 8,
                fontFamily: 'Montserrat-Regular',
              }}>
              Continue with
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginHorizontal: 30,
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  socialLoginHandler('facebook');
                }}>
                <Image
                  style={{ width: 80, height: 80, borderRadius: 100 }}
                  source={FacebookIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  socialLoginHandler('google');
                }}>
                <Image
                  style={{ width: 80, height: 80, borderRadius: 100 }}
                  source={GoogleIcon}
                />
              </TouchableOpacity>
              {/* <Image style={{ width: 80, height: 80, borderRadius: 100 }} source={AppleIcon} />  */}
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
