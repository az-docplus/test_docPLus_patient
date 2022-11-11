/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Image,
  StatusBar,
  BackHandler,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SECONDARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import ToggleButton from '../../../components/molecules/ToggleButton/ToggleButton';
import { Picker } from '@react-native-community/picker';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import RadioGroupV2 from '../../../components/molecules/RadioGroup/RadioGroupV2';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSpecialty,
  UpdateDoctorProfile,
  SetForNow,
} from '../../../reduxV2/action/DoctorAction';
import { Host } from '../../../utils/connection';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import AnimatedErrorText from '../../../components/atoms/animatedErrorText/AnimatedErrorText';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { countries } from '../../../utils/Months';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';
import { UpdateProfile } from '../../../reduxV2/action/PatientAction';
import BlurSpinner from '../../../components/molecules/Modal/BlurLoadingOverlay';
import TextInputIcon from '../../../components/atoms/TextInputCustom/TextInputIcon';

function PatientSettings({ navigation }) {
  const [lang, setLang] = useState('en');

  const [loading, setLoading] = useState(false);

  const SetLang = async (lan) => {
    setLang(lan);
    setLocale(lan);
    await AsyncStorage.setItem('language', lan);
  };

  const [id, setId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passVis1, setPassVis1] = useState(false);
  const [passVis2, setPassVis2] = useState(false);
  const [passVis3, setPassVis3] = useState(false);
  const [smsNotification, setSmsNotification] = useState(true);
  const [mobileNotification, setMobileNotification] = useState(true);
  const [emailNotification, setEmailNotification] = useState(true);
  const [whatsAppNotification, setWhatsAppNotification] = useState(true);
  const dispatch = useDispatch();
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  console.log('==============>>>>>>>>>', userData);
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const language = async () => {
      const value = await AsyncStorage.getItem('language');
      if (value === null) {
        await AsyncStorage.setItem('language', 'en');
      } else {
        SetLang(value);
      }
    };

    language();
  }, [lang]);

  useEffect(() => {
    console.log({ userData });
    const {
      password,
      smsNotification,
      mobileNotification,
      emailNotification,
      id,
    } = userData;
    console.log(userData._id);
    setId(id);
    setSmsNotification(smsNotification);
    setMobileNotification(mobileNotification);
    setEmailNotification(emailNotification);
  }, [userData]);
  useEffect(() => {
    console.log('loading changed ', loading);
  }, [loading]);
  const handleSubmit = () => {
    setLoading(true);
    if (password === '' && confirmPassword === '' && oldPassword === '') {
      const obj = {
        // id: userData._id,
        smsNotification: smsNotification,
        mobileNotification: mobileNotification,
        emailNotification: emailNotification,
        whatsAppNotification: whatsAppNotification,
        // oldPassword: oldPassword,
        // password: password,
      };

      dispatch(
        UpdateProfile(
          obj,
          userData._id,
          () => {
            Alert.alert(
              'Settings Updated!',
              'Settings has been updated successfuly',
              [
                {
                  text: 'Okay',
                  onPress: () => {
                    setLoading(false);
                  },
                },
              ],
            );
          },
          () => {
            setLoading(false);
          },
        ),
      );
    } else if (
      password === confirmPassword &&
      oldPassword !== '' &&
      password !== ''
    ) {
      const obj = {
        // id: userData._id,
        smsNotification: smsNotification,
        mobileNotification: mobileNotification,
        emailNotification: emailNotification,
        oldPassword: !(
          (userData?.facebook || userData?.google) &&
          userData?.firstTime
        )
          ? oldPassword
          : 'DemoDoc@1234',
        newPassword: password,
      };
      dispatch(
        UpdateProfile(
          obj,
          userData._id,
          () => {
            setLoading(false);
            Alert.alert(
              'Settings Updated!',
              'settings has been updated successfuly',
              [
                {
                  text: 'Okay',
                  onPress: () => {
                    setLoading(false);
                  },
                },
              ],
            );
          },
          (err) => {
            setLoading(false);
            console.log(
              err.response.data,
              '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',
            );
            Alert.alert(
              'Error!',
              'Invalid Password, Please enter a correct password',
            );
          },
        ),
      );
      console.log('updated');
    } else {
      setLoading(false);
      console.log('Password Mismatch or empty input field');
      Alert.alert('Error!', 'Password Mismatch', [
        {
          text: 'Try again',
          onPress: () => {
            setLoading(false);
          },
        },
      ]);
    }
  };

  return (
    <>
      {/* <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} /> */}
      <View
        style={[
          OnboardingStyle.Container,
          { backgroundColor: Colors.secondary_background[theme] },
        ]}>
        <BlurSpinner visible={loading}>
          <ActivityIndicator color={NEW_PRIMARY_BACKGROUND} size="large" />
        </BlurSpinner>
        <TopNavBar
          navigation={navigation}
          headerText={`${Local('doctor.Settings.settings')}`}
        />
        <ScrollView style={OnboardingStyle.ScrollView}>
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {/* {Local('doctor.profile.registration_details')} */}
              {`${Local('doctor.Settings.account')}`}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            {!(
              (userData?.facebook || userData?.google) &&
              userData?.firstTime
            ) && (
              <View
                style={{
                  paddingHorizontal: '6%',
                  borderBottomWidth: 1,
                  borderColor: '#e0e0e0',
                }}>
                <TextInputIcon
                  hasIcon={true}
                  iconName={passVis1 ? 'eye' : 'eye-off'}
                  // validationCallback={() => credential.password.length >= 4}
                  size={25}
                  iconPos="right"
                  secureTextEntry={!passVis1}
                  onPress={() => {
                    setPassVis1(!passVis1);
                  }}
                  placeholder={`${Local('doctor.Settings.old_pass')}`}
                  placeholderTextColor={Colors.input_placeholder_color[theme]}
                  inputHandler={(text) => {
                    setOldPassword(text);
                  }}
                  // placeholderTextColor={INPUT_PLACEHOLDER}
                  // style={[
                  //   styles.inputStyle,
                  //   !error.password && {borderBottomColor: 'red'},
                  // ]}
                  iconStyle={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    color: Colors.primary_text_color[theme],
                  }}
                  // textStyle={[styles.textStyle, {width: '83%'}]}
                  textStyle={{
                    color: Colors.primary_text_color[theme],
                  }}
                  value={oldPassword}
                  // onFocus={() => setPasswordFocus(true)}
                  // onBlur={() => setPasswordFocus(false)}
                />
                {/* <TextInput
                autoCapitalize="none"
                secureTextEntry={true}
                // keyboardType={'text'}
                onChangeText={(text) => {
                  setOldPassword(text);
                }}
                value={oldPassword}
                style={{
                  fontSize: 16,
                  marginLeft: '2%',
                  color: Colors.primary_text_color[theme],
                }}
                placeholder="Old Password"
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              /> */}
              </View>
            )}
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInputIcon
                hasIcon={true}
                iconName={passVis2 ? 'eye' : 'eye-off'}
                // validationCallback={() => credential.password.length >= 4}
                size={25}
                iconPos="right"
                secureTextEntry={!passVis2}
                onPress={() => {
                  setPassVis2(!passVis2);
                }}
                placeholder={`${Local('doctor.Settings.new_pass')}`}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
                inputHandler={(text) => {
                  setPassword(text);
                }}
                // placeholderTextColor={INPUT_PLACEHOLDER}
                // style={[
                //   styles.inputStyle,
                //   !error.password && {borderBottomColor: 'red'},
                // ]}
                iconStyle={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  color: Colors.primary_text_color[theme],
                }}
                // textStyle={[styles.textStyle, {width: '83%'}]}
                textStyle={{
                  color: Colors.primary_text_color[theme],
                }}
                // textStyle={[styles.textStyle, {width: '83%'}]}
                value={password}
                // onFocus={() => setPasswordFocus(true)}
                // onBlur={() => setPasswordFocus(false)}
              />
              {/* <TextInput
                autoCapitalize="none"
                secureTextEntry={true}
                // keyboardType={'text'}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                value={password}
                style={{
                  fontSize: 16,
                  marginLeft: '2%',
                  color: Colors.primary_text_color[theme],
                }}
                placeholder="New Password"
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              /> */}
            </View>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInputIcon
                hasIcon={true}
                iconName={passVis3 ? 'eye' : 'eye-off'}
                // validationCallback={() => credential.password.length >= 4}
                size={25}
                iconPos="right"
                secureTextEntry={!passVis3}
                onPress={() => {
                  setPassVis3(!passVis3);
                }}
                placeholder={`${Local('doctor.Settings.con_pass')}`}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
                inputHandler={(text) => {
                  setConfirmPassword(text);
                }}
                // placeholderTextColor={INPUT_PLACEHOLDER}
                // style={[
                //   styles.inputStyle,
                //   !error.password && {borderBottomColor: 'red'},
                // ]}
                iconStyle={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  color: Colors.primary_text_color[theme],
                }}
                // textStyle={[styles.textStyle, {width: '83%'}]}
                textStyle={{
                  color: Colors.primary_text_color[theme],
                }}
                // textStyle={[styles.textStyle, {width: '83%'}]}
                value={confirmPassword}
                // onFocus={() => setPasswordFocus(true)}
                // onBlur={() => setPasswordFocus(false)}
              />
            </View>
          </View>

          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('doctor.Settings.notification')}:
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: '8%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    marginTop: 7,
                    color: Colors.primary_text_color[theme],
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  {Local('doctor.Settings.sms_notification')}
                </Text>
                <ToggleButton
                  toggle={smsNotification}
                  onToggle={() => setSmsNotification(!smsNotification)}
                  style={{
                    borderRadius: 10,
                    width: 120,
                    backgroundColor: Colors.secondary_background[theme],
                  }}
                  dotStyle={{
                    backgroundColor: '#43A2A2',
                    width: '50%',
                    height: 25,
                    borderRadius: 8,
                  }}
                  textStyle={{ fontSize: 14, color: '#077EE9' }}
                  text0="OFF"
                  text1="ON"
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    marginTop: 7,
                    color: Colors.primary_text_color[theme],
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  {Local('doctor.Settings.mobile_notification')}
                </Text>
                <ToggleButton
                  toggle={mobileNotification}
                  onToggle={() => setMobileNotification(!mobileNotification)}
                  style={{
                    borderRadius: 10,
                    width: 120,
                    backgroundColor: Colors.secondary_background[theme],
                  }}
                  dotStyle={{
                    backgroundColor: '#43A2A2',
                    width: '50%',
                    height: 25,
                    borderRadius: 8,
                  }}
                  textStyle={{ fontSize: 14, color: '#077EE9' }}
                  text0="OFF"
                  text1="ON"
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    marginTop: 7,
                    color: Colors.primary_text_color[theme],
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  {Local('doctor.Settings.email_notification')}
                </Text>
                <ToggleButton
                  toggle={emailNotification}
                  onToggle={() => setEmailNotification(!emailNotification)}
                  style={{
                    borderRadius: 10,
                    width: 120,
                    backgroundColor: Colors.secondary_background[theme],
                  }}
                  dotStyle={{
                    backgroundColor: '#43A2A2',
                    width: '50%',
                    height: 25,
                    borderRadius: 8,
                  }}
                  textStyle={{ fontSize: 14, color: '#077EE9' }}
                  text0="OFF"
                  text1="ON"
                />
              </View>
            </View>
          </View>

          <DmzButton
            onPress={() => navigation.navigate('NotificationSetting')}
            // disabled={
            //   activeGender === '' ||
            //   specialitySelected === '' ||
            //   bio === '' ||
            //   degree === '' ||
            //   college === '' ||
            //   year === '' ||
            //   registrationNumber === '' ||
            //   registrationCouncil === '' ||
            //   registrationYear === '' ||
            //   yearOfExperience === '' ||
            //   ConsultationFee == 0
            // }
            isLoading={loading}
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
                marginVertical: 20,
                elevation: 3,
              },
            }}
            text={`${Local('doctor.Settings.submit')}`}
          />
        </ScrollView>
      </View>
    </>
  );
}

const OnboardingStyle = StyleSheet.create({
  Container: {
    flex: 1,
    // backgroundColor: '#fff',
    height: '100%',
  },
  ScrollView: {
    flex: 1,
  },
});

export default PatientSettings;
