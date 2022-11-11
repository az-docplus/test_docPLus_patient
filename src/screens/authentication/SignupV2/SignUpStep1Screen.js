/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import TextInputIcon from '../../../components/atoms/TextInputCustom/TextInputIcon';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import StepsTracker from '../../../components/atoms/StepsTracker/StepsTracker';
import {
  TERTIARY_TEXT,
  HEADER_TEXT,
  PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  NEW_PRIMARY_COLOR,
  NEW_HEADER_TEXT,
  SECONDARY_COLOR,
  INPUT_PLACEHOLDER,
} from '../../../styles/colors';

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
import auth from '@react-native-firebase/auth';
import UserProfile from '../../../assets/svg/male_profile.svg';
import AnimatedErrorText from '../../../components/atoms/animatedErrorText/AnimatedErrorText';
import PasswordStrengthChecker from '../../../components/atoms/PasswordStrengthChecker/PasswordStrengthChecker';
import { Local, setLocale } from '../../../i18n';
import PhoneInput from 'react-native-phone-number-input';
import { SocialIcon } from 'react-native-elements';

export default function SignUpStep1Screen(props) {
  const {
    credential,
    setCredential,
    isLoading,
    onChoosePicture,
    imageData,
    error,
    staff,
  } = props;
  const handleFirstName = (firstName) => {
    setCredential('firstName', firstName);
  };
  const handleLastName = (lastName) => {
    setCredential('lastName', lastName);
  };
  const handleEmail = (email) => {
    setCredential('email', email);
  };
  const handlePassword = (password) => {
    setCredential('password', password);
  };

  const handlePhone = (phone) => {
    setCredential('phone', phone);
    console.log(phone);
  };

  const [passVisible, setPass] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const viewPassword = () => {
    setPass(!passVisible);
  };
  const reg = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  );

  const { signupAs } = props;

  const [askPhone, setAskPhone] = useState(false);

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
          setAskPhone(true);
          const { email, name, id } = user;
          let socialData = {
            facebook: id,
            email,
            firstName: name.split(' ')[0],
            lastName: name.split(' ')[1],
            username: email.split('@')[0],
            password: 'DemoDoc@1234',
          };
          console.log(socialData, 'dfjdslfkjdf')
          setCredential(null, null, true, socialData);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const loginWithFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(
      (login) => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
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
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={{
          // position: 'absolute',
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}>
        {!staff && (
          <StepsTracker
            text={`${Local('patient.signup.step1')}`}
            textStyle={{
              fontSize: 16,
              color: NEW_HEADER_TEXT,
            }}
            completed={signupAs === 'doctor' ? 50 : 50}
            mode={signupAs === 'doctor' ? [50, 100] : [50, 100]}
            completedColor={NEW_PRIMARY_COLOR}
            incompletedColor={'#F8F7FF'}
          />
        )}
        <DmzText
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            fontSize: 35,
            color: NEW_HEADER_TEXT,
            marginTop: 20,
            width: '100%',
            textAlign: 'center',
            lineHeight: 46,
            paddingHorizontal: 20,
            fontFamily: 'Montserrat-Bold',
          }}
          text={`${Local('patient.signup.hey_there')}`}
        />
        {/* <Image
          source={require('../../../assets/images/doc_2.png')}
          style={{
            alignSelf: 'center',
            transform: [{scale: 0.9}],
          }}
          resizeMode="cover"
          resizeMethod="scale"
        /> */}
        {!staff && (
          <TouchableOpacity
            onPress={onChoosePicture}
            style={{
              backgroundColor: '#ededed',
              height: 100,
              width: 100,
              paddingVertical: 20,
              paddingHorizontal: 20,
              borderRadius: 64,
              marginTop: 20,
              alignSelf: 'center',
            }}>
            {imageData?.uri ? (
              <Image
                source={{ uri: imageData.uri }}
                style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
              />
            ) : (
              <UserProfile />
            )}
          </TouchableOpacity>
        )}
        {!askPhone && (
          <>
            <TextInputIcon
              placeholder={`${Local('patient.signup.first_name')}`}
              inputHandler={handleFirstName}
              placeholderTextColor={INPUT_PLACEHOLDER}
              style={[
                styles.inputStyle,
                !error.firstName && { borderBottomColor: 'red' },
                staff && { marginTop: '24%' },
              ]}
              textStyle={styles.textStyle}
              validationCallback={() => credential.firstName != ''}
              value={credential.firstName}
            />
            {!error.firstName && (
              <AnimatedErrorText
                style={{ width: '70%', alignSelf: 'center' }}
                text={'First name should only contain letters'}
              />
            )}
          </>
        )}
        {!askPhone && (
          <>
            <TextInputIcon
              placeholder={`${Local('patient.signup.last_name')}`}
              inputHandler={handleLastName}
              placeholderTextColor={INPUT_PLACEHOLDER}
              style={[
                styles.inputStyle,
                !error.lastName && { borderBottomColor: 'red' },
              ]}
              textStyle={styles.textStyle}
              validationCallback={() => credential.lastName != ''}
              value={credential.lastName}
            />
            {!error.lastName && (
              <AnimatedErrorText
                style={{ width: '70%', alignSelf: 'center' }}
                text={'Last name should only contain letters'}
              />
            )}
          </>
        )}
        <>
          <View
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: '#fff',
              borderBottomColor: NEW_PRIMARY_COLOR,
              padding: 0,
              borderBottomWidth: 0.4,
              // height: 'auto',
              alignSelf: 'center',
            }}>
            <PhoneInput
              // ref={phoneInput}
              containerStyle={{
                backgroundColor: '#fff',
                width: '70%',
                height: 70,
                paddingVertical: 0,
                marginVertical: 0,
                borderBottomColor: NEW_PRIMARY_COLOR,
                borderBottomWidth: 0.8,
              }}
              textInputStyle={{
                backgroundColor: '#fff',
                height: 'auto',
                marginTop: 0,
              }}
              textContainerStyle={{
                backgroundColor: '#fff',
                borderBottomWidth: 0,
                paddingTop: "4%"
              }}
              placeholder={`${Local('patient.signup.phone_no')}`}

              // inputStyle={{backgroundColor: '#fff'}}
              codeTextStyle={{
                backgroundColor: '#fff',
                // color: "blue"
              }}
              defaultValue={credential.phone}
              defaultCode="IN"
              /* onChangeText={(text) => {
              handlePhone(text);
            }} */
              onChangeFormattedText={(text) => {
                handlePhone(text);
              }}
            // withDarkTheme
            // withShadow
            // autoFocus
            />
          </View>
          {!error.phone && (
            <AnimatedErrorText
              style={{ width: '70%', alignSelf: 'center' }}
              text={'Phone number should be valid'}
            />
          )}
        </>
        {!askPhone && (
          <>
            <TextInputIcon
              autoCapitalize="none"
              placeholder={`${Local('patient.signup.email')}`}
              inputHandler={handleEmail}
              keyboardType={'email-address'}
              placeholderTextColor={INPUT_PLACEHOLDER}
              style={[
                styles.inputStyle,
                !error.email && { borderBottomColor: 'red' },
              ]}
              textStyle={styles.textStyle}
              validationCallback={() => reg.test(credential.email)}
              value={credential.email}
            />
            {!error.email && (
              <AnimatedErrorText
                style={{ width: '70%', alignSelf: 'center' }}
                text={'Email ID should be valid'}
              />
            )}
          </>
        )}
        {!askPhone && (
          <>
            <TextInputIcon
              hasIcon={true}
              iconName={passVisible ? 'eye' : 'eye-off'}
              validationCallback={() => credential.password.length >= 4}
              size={25}
              iconPos="right"
              secureTextEntry={!passVisible}
              onPress={viewPassword}
              placeholder={`${Local('patient.signup.password')}`}
              inputHandler={handlePassword}
              placeholderTextColor={INPUT_PLACEHOLDER}
              style={[
                styles.inputStyle,
                !error.password && { borderBottomColor: 'red' },
              ]}
              iconStyle={{
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              textStyle={[styles.textStyle, { width: '83%' }]}
              value={credential.password}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            {/* {passwordFocus && (
            <PasswordStrengthChecker
              password={credential.password}
              style={{ width: '70%', alignSelf: 'center', marginTop: '1%' }}
            />
          )} */}
          </>
        )}

        <DmzButton
          onPress={() => {
            if (credential.phone != "") {
              !askPhone ? props.onPress() : props.onSocialPress()
            } else {
              handlePhone("")
            }
          }}
          style={{
            Text: {
              width: '100%',
              textAlign: 'center',
              color: 'white',
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            },
            Container: {
              width: 250,
              height: 46,
              borderRadius: 23,
              backgroundColor: SECONDARY_COLOR,
              alignSelf: 'center',
              marginTop: 20,
              elevation: 3,
            },
          }}
          text={!(staff || askPhone) ? `${Local("patient.signup.next")}` : `${Local("patient.signup.submit")}`}
          isLoading={isLoading}
          disabled={
            // isLoading ||
            !askPhone ? (
              !error.firstName ||
              !error.lastName ||
              !error.email ||
              !error.password ||
              !error.phone ||
              credential.firstName === '' ||
              credential.lastName === '' ||
              credential.email === '' ||
              // credential.phone === '' ||
              credential.password === ''
            ) : (
              !error.phone || credential.phone === ''
            )
          }
        />
        {!staff && signupAs === 'doctor' && (
          <TouchableOpacity
            style={{ alignSelf: 'center', marginTop: 20 }}
            onPress={() => {
              props.navigation.navigate('staffScreen');
            }}>
            <Text
              style={{
                color: NEW_PRIMARY_BACKGROUND,
                fontFamily: 'Montserrat-Bold',
              }}>
              {'   '}
              {Local("patient.signup.register_as_staff")}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{ alignSelf: 'center', marginBottom: 15 }}
          onPress={() => {
            props.navigation.navigate('loginScreen');
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: NEW_HEADER_TEXT,
              fontSize: 14,
              marginTop: 15,
              fontFamily: 'Montserrat-Regular',
            }}>
            {Local('patient.signup.already_have_accound')}
            <Text
              style={{
                color: NEW_PRIMARY_BACKGROUND,
                fontFamily: 'Montserrat-Bold',
              }}>
              {'   '}
              {Local('patient.signup.sign_in')}
            </Text>
          </Text>
        </TouchableOpacity>
        {!askPhone && (
          <>
            <View>
              <Text
                style={{
                  color: NEW_HEADER_TEXT,
                  textAlign: 'center',
                  fontSize: 12,
                  marginTop: 0,
                  marginBottom: 0,
                  paddingLeft: 0,
                  fontFamily: 'Montserrat-Medium',
                }}>
                — {Local("patient.login.or")} —
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: NEW_PRIMARY_BACKGROUND,
                  marginTop: '2%',
                  marginLeft: '-2.7%',
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Montserrat-Bold',
                }}>
                {'   '}
                {Local('patient.signup.signup_with')}
              </Text>
            </View>
          </>
        )}
        {!askPhone && (
          <View
            style={{
              alignSelf: 'center',
              marginBottom: 10,
              marginTop: 10,
              flexDirection: 'row',
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
                    setAskPhone(false); 
                    const { email, familyName, givenName, id } = userInfo.user; 
                    let socialData = {
                      google: id,
                      email,
                      firstName: givenName,
                      lastName: familyName,
                      username: email.split('@')[0],
                      password: 'DemoDoc@1234',
                    }; 
                    setCredential(null, null, true, socialData);
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
        )}

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
            style={{ height: 30, width: 100 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    width: '70%',
    borderBottomColor: NEW_PRIMARY_COLOR,
    borderBottomWidth: 1,
    height: 'auto',
    alignSelf: 'center',
  },
  textStyle: {
    color: NEW_HEADER_TEXT,
    fontSize: 14,
    marginTop: 15,
    width: '100%',
    fontFamily: 'Montserrat-Medium',
  },
});






















