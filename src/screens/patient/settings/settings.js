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
import AD from 'react-native-vector-icons/AntDesign';
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
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import BlurModal from '../../../components/molecules/Modal/BlurLoadingOverlay';
import DraggablePanel from 'react-native-draggable-panel';

function PatientSettings({ navigation, visible, onCancel, setVisible }) {
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
  const [showModal, setShowModal] = useState(false);
  const [currency, setCurrency] = useState([]);
  const [currencyRate, setCurrencyRate] = useState('');
  const [rate, setRate] = useState('USD');

  const dispatch = useDispatch();
  const { userData, theme } = useSelector((state) => state.AuthReducer);

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

  const getCurrency = async () => {
    return fetch('https://api.frankfurter.app/latest')
      .then((res) => res.json())
      .then((data) => setCurrency(Object.keys(data.rates)));
  };

  console.log(currency, '==========latest currency');

  useEffect(() => {
    getCurrency();
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

  const currencyPanelRef = React.createRef();
  const openPanel = () => {
    currencyPanelRef.current.show();
  };

  const asyncCurrencyRate = async (e) => {
    await AsyncStorage.setItem('currencyRate', e);
  };

  useEffect(() => {
    const language = async () => {
      const value = await AsyncStorage.getItem('currencyRate');
      if (value === null) {
        await AsyncStorage.setItem('currencyRate', 'INR');
      } else {
        setRate(value);
      }
    };

    language();
  }, [rate]);

  console.log(rate, '=====rate');

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
          <TouchableOpacity
            onPress={() => navigation.navigate('AccountSetting')}
            style={{
              width: '90%',
              alignSelf: 'center',
              borderRadius: 18,
              shadowColor: '#30C1DD',
              shadowRadius: 10,
              shadowOpacity: 0.6,
              elevation: 8,
              shadowOffset: { width: 0, height: 4 },
              marginTop: 40,
              marginBottom: 20,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View>
              <View
                style={{
                  paddingVertical: 25,
                  paddingHorizontal: '6%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <FontAwesomeIcon
                      name="user"
                      size={25}
                      color="#297281"
                      style={{
                        marginRight: 15,
                      }}
                      // style={{ color: '#EA1A65' }}
                    />

                    <View>
                      <Text
                        style={{
                          color: Colors.primary_text_color[theme],
                          fontFamily: 'Gilroy-SemiBold',
                          fontSize: 20,
                        }}>
                        {Local('doctor.Settings.account')}
                      </Text>
                    </View>
                  </View>

                  <AD name="right" size={18} style={{ color: '#EA1A65' }} />
                </View>
                <Text
                  style={{
                    fontFamily: 'Gilroy-Medium',
                    color: 'gray',
                    marginTop: 10,
                    marginLeft: 30,
                    fontSize: 20,
                  }}>
                  {Local(`doctor.Languages.language`)} -{' '}
                  <Text
                    style={{ color: '#EA1A65', fontFamily: 'Gilroy-Medium' }}>
                    {Local('doctor.Setting.English')}
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationSetting')}
            style={{
              width: '90%',
              alignSelf: 'center',
              borderRadius: 18,
              shadowColor: '#f54242',
              shadowOffset: { width: 10, height: 10 },
              marginBottom: 20,
              shadowOpacity: 1,
              elevation: 5,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View>
              <View
                style={{
                  paddingVertical: 30,
                  paddingHorizontal: '6%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <FontAwesomeIcon
                      name="bell"
                      size={25}
                      color="#297281"
                      style={{
                        marginRight: 15,
                      }}
                      // style={{ color: '#EA1A65' }}
                    />
                    <Text
                      style={{
                        color: Colors.primary_text_color[theme],
                        fontFamily: 'Gilroy-Medium',
                        fontSize: 20,
                      }}>
                      {Local('doctor.Settings.notification')}
                    </Text>
                  </View>

                  <AD name="right" size={18} style={{ color: '#EA1A65' }} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openPanel}
            style={{
              width: '90%',
              alignSelf: 'center',
              borderRadius: 18,
              shadowColor: '#f54242',
              shadowOffset: { width: 10, height: 10 },
              marginBottom: 20,
              shadowOpacity: 1,
              elevation: 5,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View>
              <View
                style={{
                  paddingVertical: 30,
                  paddingHorizontal: '6%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MCI
                      name="currency-inr"
                      size={25}
                      style={{ color: '#297281' }}
                    />
                    <Text
                      style={{
                        color: Colors.primary_text_color[theme],
                        fontFamily: 'Gilroy-Medium',
                        fontSize: 20,
                      }}>
                      Select Currency
                    </Text>
                  </View>

                  <AD name="right" size={18} style={{ color: '#EA1A65' }} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <DraggablePanel ref={currencyPanelRef}>
            <ScrollView
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  marginTop: 10,
                  marginVertical: 10,
                  paddingHorizontal: 5,
                  maxWidth: 400,
                  marginHorizontal: '4%',
                }}>
                {currency.map((item, i) => (
                  <TouchableOpacity
                    onPress={()=>console.log('hihi')}
                    key={i}
                    style={{
                      backgroundColor: 'white',
                      minWidth: 100,
                      shadowColor: '#171717',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      margin: 5,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'black',
                        fontSize: 18,
                        fontWeight: 'bold',
                        fontFamily: 'Gilroy-SemiBold',
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </DraggablePanel>
          {/* <View>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View> */}
          {/* <DmzButton
            onPress={handleSubmit}
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
                borderRadius: 28,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                marginVertical: 20,
                elevation: 3,
              },
            }}
            text={`${Local('doctor.Settings.submit')}`}
          /> */}
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
