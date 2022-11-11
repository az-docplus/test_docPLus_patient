/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Animated,
  TextInput,
  Image,
  StatusBar,
  Easing,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {
  UploadProfilePic,
  // UpdateDoctorProfile,
  GetDoctorProfile,
} from '../../../reduxV2/action/DoctorAction';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconsOriginal from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import {
  SECONDARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import { Picker } from '@react-native-community/picker';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import RadioGroupV2 from '../../../components/molecules/RadioGroup/RadioGroupV2';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSpecialty,
  UpdateDoctorProfile,
  UploadSignature,
  SetForNow,
} from '../../../reduxV2/action/DoctorAction';
import { Host } from '../../../utils/connection';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import AnimatedErrorText from '../../../components/atoms/animatedErrorText/AnimatedErrorText';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { countries } from '../../../utils/Months';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';
import {
  GetPatientInfo,
  UpdateProfile,
  UploadProfilePicPatient,
} from '../../../reduxV2/action/PatientAction';
import BlurSpinner from '../../../components/molecules/Modal/BlurLoadingOverlay';
import yourhandle from 'countrycitystatejson';
import Axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { Alert } from 'react-native';
import { Fonts } from '../../../styles/Fonts';
import useLanguage from '../../../styles/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import { currencyJson } from '../../doctor/Onboarding/profile';
import InsetShadow from 'react-native-inset-shadow';
import DatePicker from 'react-native-datepicker';
function PatientProfile({ navigation }) {
  const { patient, isPatientAccountReducerLoading } = useSelector(
    (state) => state.PatientReducer,
  );

  const [open, setOpen] = useState(false);

  const [date, setDate] = useState(new Date());
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [prevEmail, setPrevEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [prevPhone, setPrevPhone] = useState('');

  const [gender, setGender] = useState(patient.sex);
  const [age, setAge] = useState('');
  const [pictrue, setPicture] = useState('');
  const [imageSource, setImageSource] = useState(
    require('../../../assets/images/dummy_profile.png'),
  );

  const [Changed, setChanged] = useState(false);
  const dispatch = useDispatch();
  const { userData, theme, language } = useSelector(
    (state) => state.AuthReducer,
  );
  const setLanguage = useLanguage();

  const [lang, setLang] = useState('en');
  const [curr, setCurr] = useState('INR');

  const [popupHeight, setPopupHeight] = useState(400);
  const animateHeightOfPopup = useRef(new Animated.Value(0)).current;
  const [popupVisible, setPopupVisible] = useState(false);

  const onPressAvatar = () => {
    // animateHeightOfAboutPopup.setValue(0);
    // setAboutPopupVisible(false);
    Animated.timing(animateHeightOfPopup, {
      useNativeDriver: true,
      toValue: popupVisible ? 0 : 1,
      easing: Easing.elastic(),
      duration: 500,
    }).start(() => {
      setPopupVisible(!popupVisible);
    });
  };

  const onPopupLayoutChange = (event) => {
    setPopupHeight(event.nativeEvent.layout.height);
  };

  const onChooseCamera = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted) {
      PickCamera();
    } else {
      askPermission(PickCamera);
    }
  };
  const onChooseGallery = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted) {
      PickGallery();
    } else {
      askPermission(PickGallery);
    }
  };
  const askPermission = async (launch) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'DocPlus needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launch();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const PickCamera = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('CameraPicker Error: ', response.error);
      } else {
        // const source = {uri: response.uri};
        // console.log(source);
        // const path = response.uri;
        // setData({...data, imagePath: path});
        // console.log(path);
        if (patient._id) {
          setProfileLoading(true);
          dispatch(
            UploadProfilePicPatient(
              patient._id,
              response,
              () => {
                setProfileLoading(false);
                setPopupVisible(!popupVisible);
                animateHeightOfPopup.setValue(0);
                dispatch(GetPatientInfo(patient._id));
              },
              () => {
                setProfileLoading(false);
              },
            ),
          );
        } else {
          alert('You need to login first');
        }
      }
    });
  };
  const PickGallery = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery picker');
      } else if (response.error) {
        console.log('Gallery picker Error: ', response.error);
      } else {
        // const source = {uri: response.uri};
        // console.log(source);
        // const path = response.uri;
        // setData({...data, imagePath: path});
        // console.log(path);
        if (patient._id) {
          setProfileLoading(true);
          dispatch(
            UploadProfilePicPatient(
              patient._id,
              response,
              () => {
                setProfileLoading(false);
                setPopupVisible(!popupVisible);
                animateHeightOfPopup.setValue(0);
                dispatch(GetPatientInfo(patient._id));
              },
              (err) => {
                console.log(err.response.data, '%%%%%%%%%%%%%%%');
                setProfileLoading(false);
              },
            ),
          );
        } else {
          alert('You need to login first');
        }
      }
    });
  };

  useEffect(() => {
    console.log(language, '????????????????');
  }, [language]);

  const SetLang = async (lan) => {
    setLang(lan);
    setLocale(lan);
    setLanguage(lan);
    await AsyncStorage.setItem('language', lan);
  };

  const SetCurrency = async (lan) => {
    console.log(lan);
    setCurr(lan);
    await AsyncStorage.setItem('currency', lan);
    console.log(await AsyncStorage.getItem('currency'), '^^^^^^^^^^^^^^^^');
  };

  const [JSONdata, setJSONdata] = useState({
    countryArray: yourhandle.getCountries(),
    stateArray: yourhandle.getStatesByShort('IN'),
    cityArray: yourhandle.getCities('IN', state),
  });

  const handleCity = (city) => {
    setCity(city);
  };
  const handleCountry = (country) => {
    setCountry(country);
    let shortName = '';
    JSONdata.countryArray.map((c) => {
      if (c.name == country) {
        shortName = c.shortName;
      }
    });
    if (state != '') {
      setJSONdata({
        ...JSONdata,
        stateArray: yourhandle.getStatesByShort(shortName),
        cityArray: yourhandle.getCities(shortName, state),
      });
    } else {
      setJSONdata({
        ...JSONdata,
        stateArray: yourhandle.getStatesByShort(shortName),
      });
    }
  };
  const handleState = (state) => {
    setState(state);
    if (country !== '') {
      let shortName = '';
      JSONdata.countryArray.map((c) => {
        // console.log(c.shortName, "dslfkjdslj")
        if (c.name == country) {
          shortName = c.shortName;
        }
      });
      setJSONdata({
        ...JSONdata,
        cityArray: yourhandle.getCities(shortName, state),
      });
    }
  };

  /* const [regionData, setRegionData] = useState({
    city: '',
    state: 'Andorra la Vella',
    country: 'Andorra',
    cityArray: [],
    stateArray: [],
    countryArray: [],
    ipCountryCode: '',
  }); */

  const [Loading, setLoading] = useState(false);
  /* const [state, setState] = useState({
    firstName: '',
    lastName: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    email: '',
    phone: '',
    picture: '',
  }); */

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

  const [obj, setObj] = useState({});

  useEffect(() => {
    if (
      email == prevEmail ||
      email === '' ||
      phone == prevPhone ||
      phone === ''
    ) {
      if (
        (phone == prevPhone || phone === '') &&
        (email == prevEmail || email === '')
      ) {
        // setAskOtp(false);
        setObj({
          firstName: firstName,
          lastName: lastName,
          country: country,
          state: state,
          city: city,
          sex: gender,
          age: age,
        });
      } else if (
        !(phone == prevPhone || phone === '') &&
        (email == prevEmail || email === '')
      ) {
        // setAskOtp(true);
        setObj({
          firstName: firstName,
          lastName: lastName,
          country: country,
          state: state,
          city: city,
          sex: gender,
          age: age,
          phone,
        });
      } else if (
        (phone == prevPhone || phone === '') &&
        !(email == prevEmail || email === '')
      ) {
        // setAskOtp(true);
        setObj({
          firstName: firstName,
          lastName: lastName,
          country: country,
          state: state,
          city: city,
          sex: gender,
          age: age,
          email,
        });
      }
    } else {
      // setAskOtp(true)
      setObj({
        firstName: firstName,
        lastName: lastName,
        country: country,
        state: state,
        city: city,
        sex: gender,
        age: age,
        email,
        phone,
      });
    }
    // console.log(obj, "DFKJDLKFJDLKFJLK>>>>>>>>>>>>>>>>>>>>>>DFJIOEUROIERLKD");
  }, [firstName, lastName, country, state, city, gender, age, email, phone]);

  useEffect(() => {
    // console.log(userData.favourites.length, 'lllllllllllllllllllllllllll');
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setCountry(userData.country);
    setState(userData.state);
    setCity(userData.city);
    console.log(userData.city, '%%%%%%%%%%%%%%%%%%%%%%');
    setGender(userData.sex ?? userData?.gender);
    setAge(userData.age);
    setPhone(userData?.phone);
    setPrevPhone(userData?.phone);
    setEmail(userData?.email);
    setPrevEmail(userData?.email);
    setPicture(userData.picture);

    handleState(userData?.state);

    /* let countryArray = yourhandle.getCountries();

    const shortName = patient?.country
      ? countryArray.filter(
          (country) =>
            country.name.toLowerCase() === patient?.country?.toLowerCase()
        )[0].shortName
      : '';

    setRegionData({
      city: userData.city,
      state: userData.state,
      country: userData.country,
      cityArray: yourhandle.getCities(shortName, userData.state),
      stateArray: yourhandle.getStatesByShort(shortName),
      countryArray,
      country_code: shortName,
    }); */
  }, [userData]);
  console.log('============age', userData);
  useEffect(() => {
    if (userData.picture) {
      setImageSource({
        uri: `${Host}${userData.picture
          .replace('public', '')
          .replace('\\\\', '/')}`,
      });
    }
    // else {
    //   setImageSource(require('../../../assets/images/dummy_profile.png'));
    // }
  }, [userData]);

  const [profileLoading, setProfileLoading] = useState(false);

  const handleSubmit = () => {
    setProfileLoading(true);
    const profileData = {
      firstName: firstName,
      lastName: lastName,
      country: country,
      state: state,
      city: city,
      sex: gender,
      age: age,
    };

    console.log(obj, '%%%%%%%%%%%%%%%');
    // return
    dispatch(
      UpdateProfile(
        obj,
        userData._id,
        () => {
          setProfileLoading(false);
          Alert.alert('Profile Update!', 'Profile has been updated succesfuly');
        },
        (err) => {
          console.log(err.response.data, 'LKDFJDKLFJDLKFJDLKFJLDKFJ');
          setProfileLoading(false);
        },
      ),
    );
  };

  /* const handleSubmit = () => {
    console.log('clicked');
    const obj = {
        id: userData._id,
        firstName: firstName,
        lastName: lastName,
        country: country,
        state: state,
        city: city,
        gender: gender,
        age: age,
        email: email,
        phone: phone,
        picture: picture,
    };
    dispatch(
      UpdateDoctorProfile(obj, () => {
        //update for now
        dispatch(
          SetForNow(true, () => {
            console.log('calling callback');
            console.log(navigation);
            // navigation.navigate('MainController');
          }),
        );
      }),
    );
  }; */

  String.prototype.toTitleCase = function () {
    const splited = this.split(' ')
      .map((item) => {
        if (item[0]) return `${item[0].toUpperCase()}${item.slice(1)}`;
      })
      .join(' ');
    return splited;
  };

  return (
    <>
      {/* <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} /> */}
      <View
        style={[
          OnboardingStyle.Container,
          { backgroundColor: Colors.secondary_background[theme] },
        ]}>
        <TopNavBar
          navigation={navigation}
          headerText={`${Local('doctor.profile.profile')}`}
        />
        {profileLoading && (
          <BlurSpinner visible={true}>
            <ActivityIndicator color={NEW_PRIMARY_BACKGROUND} size="large" />
          </BlurSpinner>
        )}
        <ScrollView style={OnboardingStyle.ScrollView}>
          {/* <View
            style={{
              width: '90%',
              paddingVertical: 30,
              paddingTop: 40,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '500',
              }}>
              Welcome to
              <Text style={{ color: '#077EE9', fontWeight: 'bold' }}> DocPlus</Text>
            </Text>
            <Text
              style={{
                fontSize: 18,
                letterSpacing: 0.8,
              }}>
              Finish your profile to get started
            </Text>
          </View> */}
          <View
            style={{
              width: '90%',
              paddingVertical: 10,
              paddingBottom: 5,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity onPress={onPressAvatar}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                }}>
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 100,
                    borderColor: '#dddddd',
                    borderWidth: 2,
                  }}
                  source={imageSource}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 22,
                color: Colors.primary_text_color[theme],
                fontWeight: '500',
                letterSpacing: 1.2,
                fontFamily: Fonts.default[language],
                marginTop: '4%',
              }}>
              {firstName.toTitleCase() + ' ' + lastName.toTitleCase()}
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
              marginTop: 20,
            }}>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: '8%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <RadioGroupV2
                horizontal
                activeKey={gender?.toTitleCase()}
                setActiveKey={setGender}
                Item={[
                  {
                    value: `${Local('patient.familyMember.male')}`,
                    id: 'Male',
                  },
                  {
                    value: `${Local('patient.familyMember.female')}`,
                    id: 'Female',
                  },
                ]}
              />
            </View>

            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                onChangeText={(itemValue, itemIndex) => {
                  console.log('itemvalue ', itemValue);
                  console.log('is nan ', !Number.isNaN(Number(itemValue)));
                  if (!Number.isNaN(Number(itemValue)) && itemValue != ' ') {
                    setAge(itemValue);
                  }
                }}
                maxLength={2}
                value={age}
                style={{
                  fontSize: 16,
                  color: Colors.primary_text_color[theme],
                }}
                keyboardType={'number-pad'}
                placeholder={`${Local('doctor.profile.age')}`}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            </View>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                onChangeText={(itemValue, itemIndex) => {
                  setEmail(itemValue);
                }}
                // maxLength={2}
                value={email}
                style={{
                  fontSize: 16,
                  color: Colors.primary_text_color[theme],
                }}
                // keyboardType={'number-pad'}
                placeholder={`${Local('doctor.profile.Email')}`}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            </View>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                onChangeText={(itemValue, itemIndex) => {
                  console.log('itemvalue ', itemValue);
                  setPhone(itemValue);
                  // console.log('is nan ', !Number.isNaN(Number(itemValue)));
                  // if (!Number.isNaN(Number(itemValue)) && itemValue != ' ') {
                  //   setAge(itemValue);
                  // }
                }}
                // maxLength={2}
                value={phone}
                style={{
                  fontSize: 16,
                  color: Colors.primary_text_color[theme],
                }}
                // keyboardType={'number-pad'}
                placeholder={`${Local('doctor.profile.Phone')}`}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            </View>

            {firstName !== '' ? (
              <View
                style={{
                  paddingHorizontal: '6%',
                  borderBottomWidth: 1,
                  borderColor: '#e0e0e0',
                }}>
                <Picker
                  mode={'dropdown'}
                  selectedValue={lang}
                  style={{
                    width: '100%',
                    color: Colors.primary_text_color[theme],
                  }}
                  onValueChange={(itemValue, itemIndex) => SetLang(itemValue)}>
                  <Picker.Item
                    color="#e0e0e0"
                    label="Select Language"
                    value=""
                  />
                  <Picker.Item label="English" value="en" />
                  <Picker.Item label="Hindi" value="hi" />
                </Picker>
              </View>
            ) : null}
            {firstName !== '' ? (
              <View
                style={{
                  paddingHorizontal: '6%',
                }}>
                <Picker
                  mode={'dropdown'}
                  selectedValue={curr}
                  style={{
                    width: '100%',
                    color: Colors.primary_text_color[theme],
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    SetCurrency(itemValue)
                  }>
                  {currencyJson.map((item, index) => {
                    // console.log(item.name, item.code, ":::::::::::::::")
                    return (
                      <Picker.Item
                        key={index}
                        label={item.name}
                        value={item.code}
                      />
                    );
                  })}
                </Picker>
              </View>
            ) : null}
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
              {`${Local('doctor.Profile.pers_info')}`}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                placeholder="Country"
                mode={'dropdown'}
                style={{
                  color:
                    country !== ''
                      ? Colors.primary_text_color[theme]
                      : '#8e9393',
                }}
                onValueChange={handleCountry}
                selectedValue={country}>
                <Picker.Item label="Country" value="" color="#8E9393" />
                {JSONdata.countryArray?.length > 0 &&
                  JSONdata.countryArray?.map((country, index) => (
                    <Picker.Item
                      color="#000"
                      key={index}
                      label={country.name}
                      value={country.name}>
                      {country.name}
                    </Picker.Item>
                  ))}
              </Picker>
            </View>

            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                placeholder="State"
                mode={'dropdown'}
                style={{
                  color:
                    state !== '' ? Colors.primary_text_color[theme] : '#8e9393',
                }}
                // placeholderTextColor={Colors.input_placeholder_color[theme]}
                onValueChange={handleState}
                selectedValue={state}
                itemStyle={{ fontFamily: 'Montserrat-Medium' }}>
                <Picker.Item label="State" value="" color="#8E9393" />
                {JSONdata.stateArray &&
                  JSONdata.stateArray?.length &&
                  JSONdata.stateArray?.length > 0 &&
                  JSONdata.stateArray?.map((city, index) => (
                    <Picker.Item color="#000" label={city} value={city} />
                  ))}
              </Picker>
            </View>

            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                placeholder="City of Residence"
                mode={'dropdown'}
                style={{
                  color:
                    city !== '' ? Colors.primary_text_color[theme] : '#8e9393',
                }}
                // placeholderTextColor={Colors.input_placeholder_color[theme]}
                onValueChange={handleCity}
                selectedValue={city}>
                <Picker.Item
                  label="City of Residence"
                  value=""
                  color="#8E9393"
                />
                {JSONdata.cityArray?.length > 0 &&
                  JSONdata.cityArray?.map((city, index) => (
                    <Picker.Item color="#000" label={city} value={city} />
                  ))}
              </Picker>
            </View>
          </View>

          <DmzButton
            onPress={handleSubmit}
            disabled={
              age === '' || gender === '' || state == '' || country == ''
            }
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
            text={`${Local('patient.my_profile.submit')}`}
          />
        </ScrollView>
        <Animated.View
          onLayout={onPopupLayoutChange}
          style={{
            width: '100%',
            height: '30%',
            backgroundColor: Colors.profile_popup_bg[theme],
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingVertical: '10%',
            paddingHorizontal: '10%',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: [
              {
                translateY: animateHeightOfPopup.interpolate({
                  inputRange: [0, 1],
                  outputRange: [popupHeight, 0],
                }),
              },
            ],
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: Colors.primary_text_color[theme],
            }}>
            {Local('patient.my_profile.update_profile_picture')}
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <TouchableOpacity
                onPress={onChooseGallery}
                style={{
                  backgroundColor: '#077EE9',
                  padding: '15%',
                  borderRadius: 100,
                }}>
                <FontAwesomeIcon name={'photo'} size={32} color={'#fff'} />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: '2%',
                  color: Colors.primary_text_color[theme],
                }}>
                {Local('patient.my_profile.gallery')}
              </Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1 }}>
              <TouchableOpacity
                onPress={onChooseCamera}
                style={{
                  backgroundColor: '#077EE9',
                  padding: '15%',
                  borderRadius: 100,
                }}>
                <FontAwesomeIcon name={'camera'} size={32} color={'#fff'} />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: '2%',
                  color: Colors.primary_text_color[theme],
                }}>
                {Local('patient.my_profile.camera')}
              </Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    UpdateProfile({ picture: '' }, patient._id, () => {
                      setProfileLoading(false);
                      onPressDetails();
                    }),
                  );
                }}
                style={{
                  backgroundColor: '#077EE9',
                  padding: '15%',
                  borderRadius: 100,
                }}>
                <MaterialIcon name={'delete'} size={32} color={'#fff'} />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: '2%',
                  color: Colors.primary_text_color[theme],
                }}>
                {Local('patient.my_profile.remove_photo')}
              </Text>
            </View>
          </View>
        </Animated.View>
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
  numberField: {
    flex: 1,
    borderRadius: 10,
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    height: 50,
    // width: '96%',
    marginHorizontal: 20,
    borderWidth: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PatientProfile;
