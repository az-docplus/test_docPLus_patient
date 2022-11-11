import React, { useState, createRef, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
  LayoutAnimation,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import DatePicker from 'react-native-date-picker';
import InsetShadow from 'react-native-inset-shadow';
const { width, height } = Dimensions.get('screen');
import LinearGradient from 'react-native-linear-gradient';
import ViewPager from '@react-native-community/viewpager';
import DoctorImage from '../../../assets2/image/doctorImage.png';
import ButtonCompo from '../../../components/atoms2/button/button';
import SimpleFieldCompo from '../../../components/atoms2/Input/simple-field';
import EmailInput from '../../../components/atoms2/Input/Input';
import whatsappLogo from '../../../assets2/logo/whatsappLogo.png';
import autoDetectLogo from '../../../assets2/logo/autoDetect.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconsAntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIconsEvilIcons from 'react-native-vector-icons/EvilIcons';
import GenericError from '../../../components/molecules/Modal/GenericError';
import SuggestionInputCompo from '../../../components/atoms2/Input/suggestion-input';
import AntiDesingIcon from 'react-native-vector-icons/Feather';
const CheckIcon = ({ size, name }) => (
  <AntiDesingIcon size={size} name={name} color="#DB3164" />
);
const AntDesignIcon = ({ size, name, color }) => (
  <MaterialIconsAntDesign
    size={size}
    name={name}
    color={color ? color : 'black'}
  />
);
import {
  signupDoctor2,
  signupPatient2,
} from '../../../reduxV2/action/AuthAction';
import { useDispatch } from 'react-redux';
import DateInputCompo from '../../../components/atoms2/Input/date-input';
import { FlatList } from 'react-native-gesture-handler';
import Axios from 'axios';
import { Host } from '../../../utils/connection';
import { UpdateDoctorProfile } from '../../../reduxV2/action/DoctorAction';
import AnimatedTextInput from '../../../components/molecules/Modal/AnimatedTextInput';
import moment from 'moment';

// import CircularProgress from '@mui/material/CircularProgress';
const RegexCheck = (type) => {
  if (type == 'name') {
    return new RegExp(/^[a-zA-Z ]+$/);
  } else if (type == 'year') {
    return new RegExp(/^(19[5-9]\d|20[0-4]\d|2050)$/);
  } else if (type == 'number') {
    return new RegExp('^[0-9]+$');
  } else if (type == 'email') {
    return new RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    );
  } else if (type == 'should10number') {
    return new RegExp(/^[0-9]{10}$/);
  } else if (type == 'phone') {
    return new RegExp(
      /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
    );
  }
};

export default function OnBoardingSignUp(props) {
  const { phone, email, status } = props.route.params;
  // const { email } = props.route.params;
  // console.log("phone :::::::::::::::", phone, email)
  // const phone = '+9184484133311';
  const dispatch = useDispatch();
  const pagerRef = useRef(null);
  const [isDoctor, setIsDoctor] = useState(false);
  const nextpage = (page) => {
    pagerRef.current.setPage(page);
  };
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDobGenderOpen, setIsDobGenderOpen] = useState(true);
  const [modal, setModal] = useState({ visible: false, text: '' });
  const [modal2, setModal2] = useState({ visible: false, text: '' });
  const [loading, setLoading] = useState(false);
  const [prevSelectedDoctors, setPrevSelectedDoctors] = useState([]);
  const [registeredDoctorID, setRegisteredID] = useState(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: null,
    phone: null,
    location: '',
    isTermTicked: false,
    isTermTicked2: false,
    isWhatsappUpdates: false,
    dob: new Date(),
    gender: 'male',
    registration_number: '',
    specialty: '',
    registrationYear: '',
    npiNumber: '',
  });
  const [doctorSelectedProfile, setDoctoSelectedProfile] = useState(false);
  console.log('form@@@@@@@@@@@@@@@@@@@@@', form['dob']?.length, form.dob, form);
  const ContineToNextViewHandler = () => {
    if (isDoctor) {
      if (!form['isTermTicked']) {
        return setModal({
          text: 'Please Accept the Terms of Services !',
          visible: true,
        });
      }
      if (
        form['firstName']?.length &&
        form['lastName']?.length &&
        (RegexCheck('email').test(form['email']) ||
          RegexCheck('phone').test(form['phone'])) &&
        form['isTermTicked'] &&
        form['location']
      ) {
        setModal({ text: '', visible: false });
        nextpage(1);
      } else {
        setModal({ text: 'Please enter appropiate values !', visible: true });
      }
    } else {
      setLoading(true);
      if (
        form['firstName']?.length &&
        form['lastName']?.length &&
        (RegexCheck('email').test(form['email']) ||
          RegexCheck('phone').test(form['phone'])) &&
        form['isTermTicked']
        // form['dob']?.length &&
        // form['gender']
      ) {
        const objToPass = {
          basic: JSON.stringify({}),
          password: 'DemoDoc@123',
          // city: "New york",
          // state: "New york",
          location: form['location'],
          phone: form['phone'] ? form['phone'] : phone,
          email: form['email'] ? form['email'] : email,
          firstName: form['firstName'],
          lastName: form['lastName'],
          isTermTicked: form.isTermTicked,
          isWhatsappUpdates: isEnabled,
          dob: moment().diff(form.dob, 'years'),
          gender: form.gender,
        };
        console.log('=====================>>>>>>>>>>>>>>>>>', { objToPass });
        dispatch(signupPatient2(objToPass, successCallback, errorCallback));
      } else {
        setModal({ text: 'Please enter appropiate values !', visible: true });
        setLoading(false);
      }
    }
  };
  const successCallback = () => {
    showTost('account created successfully');
    setLoading(false);
    props.navigation.navigate('MainController');
  };
  const errorCallback = (e) => {
    console.log(e, 'show modal next');
    setLoading(false);
    setModal({
      text: `${e?.response?.data?.message || e.data.message}`,
      visible: true,
    });
    setModal2({
      text: `${e?.response?.data?.message || e.data.message}`,
      visible: true,
    });
  };
  const checkUserAlreadyExist = (registration_number, userData) => {
    return new Promise((resolve, reject) => {
      const params = {
        match: JSON.stringify({
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          name: userData?.name,
        }),
        exact: true,
        name: userData?.name,
        pageNo: '0',
        size: '10',
      };
      Axios.post(`${Host}/doctors/searchlite`, params)
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          console.log('error1 : ', err);
          reject('error :', err);
        });
    });
  };
  const registerDoctor = (data) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    Axios.post(`${Host}/doctors/register`, data, config).then((result) => {});
  };
  const [progress, setProgress] = React.useState(0);

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress >= 100 ? 0 : prevProgress + 10,
  //     );
  //   }, 800);

  //   return () => {
  //     clearInterval(timer);
  //     setModal({ visible: false, text: '' });
  //     setModal2({ visible: false, text: '' });
  //   };
  // }, []);

  useEffect(() => {
    status ? setIsDoctor(true) : setIsDoctor(false);
  }, []);

  const UpdateDoctorProfileHandler = (userData) => {
    dispatch(
      UpdateDoctorProfile(
        userData,
        () => {
          setLoading(false);
          props.navigation.navigate('MainController');
        },
        () => {
          setLoading(false);
          nextpage(2);
          setDoctoSelectedProfile(null);
        },
      ),
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* position absolute height 30% */}
      <View style={{ position: 'absolute', zIndex: -1 }}>
        <Image
          source={DoctorImage}
          style={{ height: height * 0.3, transform: [{ rotateY: '180deg' }] }}
        />
      </View>

      <View style={{ flex: 1, zIndex: 1 }}>
        <ViewPager
          ref={pagerRef}
          style={{ flex: 1 }}
          initialPage={0}
          scrollEnabled={false}>
          <View key="0">
            <View
              style={{
                height: height * 0.25,
                marginTop: 10,
                paddingVertical: 20,
                alignItems: 'flex-end',
              }}>
              <View style={{ marginRight: 35 }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: 'Gilroy-SemiBold',
                    color: '#333333',
                    textAlign: 'right',
                  }}>
                  Let's get
                </Text>
                <Text
                  style={{
                    fontFamily: 'Gilroy-SemiBold',
                    fontSize: 32,
                    color: '#333333',
                    marginTop: -8,
                  }}>
                  started!
                </Text>
              </View>
              <View style={{ alignSelf: 'flex-end', marginTop: 34 }}>
                <View>
                  <LinearGradient
                    colors={['#56BABA', '#047B7B']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      borderTopLeftRadius: 25,
                      borderBottomLeftRadius: 25,
                      padding: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#F9F9F9',
                        fontFamily: 'Gilroy-SemiBold',
                      }}>
                      Are you a {isDoctor ? 'Patient' : 'Doctor'}?
                    </Text>
                    <TouchableOpacity onPress={() => setIsDoctor(!isDoctor)}>
                      <Text
                        style={{
                          textAlign: 'right',
                          textDecorationLine: 'underline',
                          fontSize: 16,
                          color: '#F9F9F9',
                          fontFamily: 'Gilroy-SemiBold',
                        }}>
                        Register here
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
                {/* <View
                  style={{
                    backgroundColor: '#EB2069',
                    paddingHorizontal: 17,
                    paddingVertical: 10,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    elevation: 10,
                    paddingLeft: 40,
                  }}>
                  {isDoctor ? (
                    <TouchableOpacity onPress={() => setIsDoctor(false)}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          fontFamily: 'Montserrat-SemiBold',
                        }}>
                        Not a doctor
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          fontFamily: 'Montserrat-SemiBold',
                          textDecorationLine: 'underline',
                        }}>
                        Register here
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setIsDoctor(true)}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          fontFamily: 'Montserrat-SemiBold',
                        }}>
                        I m a doctor
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          fontFamily: 'Montserrat-SemiBold',
                          textDecorationLine: 'underline',
                        }}>
                        Register here
                      </Text>
                    </TouchableOpacity>
                  )}
                </View> */}
              </View>
            </View>
            <ScrollView
              style={{
                backgroundColor: 'white',
                height: height * 0.75,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                elevation: 10,
                paddingHorizontal: 20,
                paddingVertical: 24,
              }}>
              <Text style={{ fontSize: 20, fontFamily: 'Montserrat-SemiBold' }}>
                Join <Text style={{ color: '#297281' }}>Docplus</Text>
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 6,
                }}>
                <SimpleFieldCompo
                  isLoading={loading}
                  title="First Name"
                  inputType="name" // required
                  value={(e) => {
                    setForm({ ...form, firstName: e });
                  }}
                />
                <SimpleFieldCompo
                  isLoading={loading}
                  title="Last Name"
                  inputType="name" // required
                  value={(e) => {
                    setForm({ ...form, lastName: e });
                  }}
                />
              </View>
              <View style={{ width: '98%', marginTop: 6 }}>
                {!phone ? (
                  <EmailInput
                    type="phone"
                    isLoading={loading}
                    isError={
                      RegexCheck('phone').test(form.phone)
                        ? false
                        : 'Enter valid'
                    }
                    value={(e) => {
                      if (e) {
                        return setForm({ ...form, phone: e.phone });
                      }
                      setForm({ ...form, phone: null });
                    }}
                  />
                ) : (
                  <EmailInput
                    type="email"
                    isLoading={loading}
                    isError={
                      RegexCheck('email').test(form.email)
                        ? false
                        : 'Enter valid'
                    }
                    value={(e) => {
                      if (e) {
                        return setForm({ ...form, email: e.email });
                      }
                      setForm({ ...form, email: null });
                    }}
                  />
                )}
                <View style={{ marginTop: 25 }}>
                  <AnimatedTextInput
                    value={moment(form.dob).format('YYYY-MM-DD')}
                    onFocus={() => setOpen(true)}
                    onChangeText={(text) => setForm({ ...form, dob: text })}
                    Righicon={
                      <TouchableOpacity
                        onPress={() => {
                          setOpen(true);
                          // Keyboard.dismiss();
                          // setOpen(true);
                        }}>
                        <MaterialCommunityIcons
                          name="calendar-blank"
                          size={35}
                          style={{ color: '#297281' }}
                        />
                      </TouchableOpacity>
                    }
                    placeholder={'Date'}
                  />
                  {/* <DateInputCompo
                          onDateSelect={(e) => {
                            setForm({ ...form, dob: e });
                          }}
                          DOB={form.dob}
                        /> */}
                </View>
                {open ? (
                  <View
                    style={{
                      flex: 1,
                      padding: 5,
                      elevation: 3,
                      backgroundColor: '#fff',
                      paddingVertical: 20,
                      borderRadius: 15,
                      marginTop: 10,
                      marginHorizontal: 5,
                    }}>
                    <DatePicker
                      mode="date"
                      open={open}
                      date={date}
                      onDateChange={(txt) => {
                        // setOpen(false);
                        console.log('=====>>>>>>>>>date', txt);
                        setForm({
                          ...form,
                          dob: txt,
                        });

                        // console.log('=====>>>>>>>>>datebb', details.birthDay);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    />
                    <View style={{ marginHorizontal: 60, marginVertical: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          // setDetails({
                          //   ...details,
                          //   date: date,
                          // });
                          setOpen(false);
                        }}>
                        <LinearGradient
                          colors={['#225F6B', '#2E8192']}
                          start={{ x: 1, y: 1 }}
                          end={{ x: 1, y: 1 }}
                          style={{
                            borderRadius: 30,

                            paddingVertical: 15,
                            elevation: 10,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              color: '#FFFFFF',
                              fontFamily: 'Gilroy-SemiBold',
                              fontSize: 20,
                            }}>
                            Confirm
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View />
                )}
              </View>
              {isDoctor && (
                <View style={{ flexDirection: 'row', marginTop: 6 }}>
                  <SuggestionInputCompo
                    isLoading={loading}
                    title="Location"
                    value={(e) => {
                      setForm({ ...form, location: e });
                    }}
                  />
                </View>
              )}

              {/* dob and gender for patient */}
              {!isDoctor && (
                <View>
                  {isDobGenderOpen && (
                    <View>
                      {/* <View style={{ marginTop: 15 }}>
                        <AnimatedTextInput
                          value={form.dob}
                          onChangeText={(text) =>
                            setForm({ ...form, dob: text })
                          }
                          Righicon={
                            <MaterialCommunityIcons
                              onPress={() => {
                                // Keyboard.dismiss();
                                // setOpen(true);
                              }}
                              name="calendar-blank"
                              size={35}
                              style={{ color: '#297281' }}
                            />
                          }
                          placeholder={'Date'}
                        /> */}
                      {/* <DateInputCompo
                          onDateSelect={(e) => {
                            setForm({ ...form, dob: e });
                          }}
                          DOB={form.dob}
                        /> */}
                      {/* </View> */}
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Gilroy-Medium',
                            marginTop: 16,
                            marginLeft: 14,
                            marginBottom: 5,
                            colro: '#707585',
                          }}>
                          Gender
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            marginTop: 14,
                          }}>
                          {['male', 'female', 'other'].map((item, i) => (
                            <TouchableOpacity
                              onPress={() => setForm({ ...form, gender: item })}
                              key={i}
                              style={{
                                marginVertical: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <InsetShadow
                                shadowOpacity={1}
                                shadowOffset={15}
                                shadowRadius={15}
                                containerStyle={{
                                  borderRadius: 50,
                                  width: 23,
                                  height: 23,
                                  backgroundColor: '#fff',
                                }}
                                // shadowOffset={10}
                                elevation={12}>
                                <View
                                  style={{
                                    width: 23,
                                    height: 23,
                                    // elevation: 0.1,
                                    borderWidth: form.gender === item ? 6 : 0,
                                    borderRadius: 15,
                                    borderColor:
                                      form.gender === item
                                        ? '#297281'
                                        : 'white',
                                  }}></View>
                              </InsetShadow>
                              <Text
                                style={{
                                  marginHorizontal: 10,
                                  fontFamily: 'Gilroy-Medium',
                                  fontSize: 14,
                                  color: '#000000',
                                }}>
                                {item.toLocaleUpperCase()}
                              </Text>
                            </TouchableOpacity>
                          ))}
                          {/* <TouchableOpacity
                            onPress={() => setForm({ ...form, gender: 'male' })}
                            style={{ flexDirection: 'row' }}>
                            <View
                              style={[
                                form.gender == 'male'
                                  ? styles.selectedRadio
                                  : styles.radiobutton,
                              ]}></View>
                            <Text
                              style={{
                                fontFamily: 'Montserrat-Regular',
                                marginLeft: 7,
                              }}>
                              Male
                            </Text>
                          </TouchableOpacity> */}
                          {/* <TouchableOpacity
                            onPress={() =>
                              setForm({ ...form, gender: 'female' })
                            }
                            style={{ flexDirection: 'row' }}>
                            <View
                              style={[
                                form.gender == 'female'
                                  ? styles.selectedRadio
                                  : styles.radiobutton,
                              ]}></View>
                            <Text
                              style={{
                                fontFamily: 'Montserrat-Regular',
                                marginLeft: 7,
                              }}>
                              Female
                            </Text>
                          </TouchableOpacity> */}
                          {/* <TouchableOpacity
                            onPress={() =>
                              setForm({ ...form, gender: 'other' })
                            }
                            style={{ flexDirection: 'row' }}>
                            <View
                              style={[
                                form.gender == 'other'
                                  ? styles.selectedRadio
                                  : styles.radiobutton,
                              ]}></View>
                            <Text
                              style={{
                                fontFamily: 'Montserrat-Regular',
                                marginLeft: 7,
                              }}>
                              Other
                            </Text>
                          </TouchableOpacity> */}
                        </View>
                      </View>
                    </View>
                  )}
                  {/* {isDobGenderOpen ? (
                    <TouchableOpacity
                      onPress={() => {
                        setIsDobGenderOpen(false);
                        LayoutAnimation.linear();
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 20,
                        marginTop: 27,
                      }}>
                      <Text>
                        <AntDesignIcon
                          name="minuscircle"
                          size={18}
                          color="#077EE9"
                        />
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Regular',
                          marginLeft: 8,
                        }}>
                        less
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setIsDobGenderOpen(true);
                        LayoutAnimation.spring();
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 20,
                        marginTop: 27,
                      }}>
                      <Text>
                        <AntDesignIcon
                          name="pluscircle"
                          size={18}
                          color="#077EE9"
                        />
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Regular',
                          marginLeft: 8,
                        }}>
                        more
                      </Text>
                    </TouchableOpacity>
                  )} */}
                </View>
              )}

              <TouchableOpacity
                onPress={() => {
                  setForm({ ...form, isTermTicked: !form.isTermTicked });
                }}
                style={{
                  backgroundColor: '#FFFFFF',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                  marginHorizontal: 5,
                  zIndex: -1,
                  elevation: 6,
                  padding: 20,
                  borderRadius: 15,
                }}>
                <View
                  style={{
                    flex: 0.05,
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    elevation: 3,
                    borderWidth: 0.1,
                    backgroundColor: '#F2F2F2',
                    marginTop: 6,
                    position: 'relative',
                  }}>
                  {form.isTermTicked && (
                    <Text>
                      <CheckIcon size={20} name="check" />
                    </Text>
                  )}
                </View>
                <Text
                  style={{
                    color: '#444446',
                    fontSize: 11,
                    fontFamily: 'Gilroy-Medium',
                    marginLeft: 10,
                    flex: 0.95,
                  }}>
                  Yes, I understand and agree to the{' '}
                  <Text style={{ color: '#339999' }}>
                    Docplus Terms of Service
                  </Text>
                  , including the{' '}
                  <Text style={{ color: '#339999' }}>User Agreement</Text> and{' '}
                  <Text style={{ color: '#339999' }}>Privacy Policy.</Text>
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 18,
                  marginHorizontal: 7,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={whatsappLogo}
                    style={{ width: 32, height: 32, marginRight: 5 }}
                  />
                  <Text style={{ fontFamily: 'Gilroy-Medium', fontSize: 14 }}>
                    Get update on Whatsapp
                  </Text>
                </View>
                <View>
                  <ToggleSwitch
                    isOn={isEnabled}
                    onColor="#297281"
                    offColor="gray"
                    labelStyle={{ color: 'black', fontWeight: '900' }}
                    size="medium"
                    onToggle={(isOn) => {
                      setIsEnabled(!isEnabled);
                    }}
                    animationSpeed={200}
                  />
                  {/* <Switch
                    trackColor={{ false: '#D5D9E7', true: '#077EE9' }}
                    thumbColor={isEnabled ? '#fff' : '#fff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() =>
                      setIsEnabled((previousState) => !previousState)
                    }
                    value={isEnabled}
                  /> */}
                </View>
              </View>

              {modal.visible ? (
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Montserrat-Bold',
                    marginVertical: 4,
                    fontSize: 10,
                    color: '#EA1A65',
                  }}>
                  {modal.text}
                </Text>
              ) : (
                <Text></Text>
              )}

              <View style={{ marginTop: 10, marginBottom: 50 }}>
                <ButtonCompo
                  title="Continue"
                  isLoading={loading}
                  pressHandler={ContineToNextViewHandler}
                />
              </View>
            </ScrollView>
          </View>

          <View key="1">
            <View
              style={{
                height: height * 0.25,
                paddingHorizontal: 15,
                paddingVertical: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  nextpage(0);
                }}>
                <AntDesignIcon name="left" size={27} />
              </TouchableOpacity>
              <View style={{ paddingLeft: 35, paddingTop: 24 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Montserrat-Regular',
                    color: '#333333',
                  }}>
                  Hello
                </Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 26,
                    color: '#077EE9',
                    marginTop: -3,
                  }}>
                  Dr. {form['firstName']}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                height: height * 0.75,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                elevation: 10,
                paddingHorizontal: 20,
                paddingVertical: 24,
              }}>
              <Text
                style={{
                  color: '#444446',
                  fontSize: 15,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Please enter your{' '}
                <Text style={{ color: 'violet' }}>Registration Details</Text>
              </Text>

              {form['location'].toLowerCase().includes('usa') ||
              form['location'].toLowerCase().includes('new york') ? (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                    }}>
                    <SimpleFieldCompo
                      isLoading={loading}
                      title="Enter your NPI number*"
                      inputType="number" // required
                      value={(e) => {
                        setForm({ ...form, npiNumber: e }); // change fields
                      }}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                    }}>
                    <SimpleFieldCompo
                      isLoading={loading}
                      title="Registration number*  "
                      regexType="should10number"
                      inputType="number" // required
                      value={(e) => {
                        setForm({ ...form, registration_number: e });
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 6,
                    }}>
                    <SimpleFieldCompo
                      isLoading={loading}
                      title="Medical Council*"
                      inputType="name" // required
                      value={(e) => {
                        setForm({ ...form, specialty: e });
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 6,
                    }}>
                    <SimpleFieldCompo
                      isLoading={loading}
                      title="Registration Year*"
                      inputType="year" // required
                      value={(e) => {
                        setForm({ ...form, registrationYear: e });
                      }}
                    />
                  </View>
                </View>
              )}

              <TouchableOpacity
                onPress={() => {
                  setForm({ ...form, isTermTicked2: !form.isTermTicked2 });
                }}
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  marginHorizontal: 5,
                  zIndex: -1,
                }}>
                <View
                  style={{
                    flex: 0.05,
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    elevation: 3,
                    borderWidth: 0.1,
                    backgroundColor: '#F2F2F2',
                    marginTop: 6,
                    position: 'relative',
                  }}>
                  {form.isTermTicked2 && (
                    <Text>
                      <CheckIcon size={20} name="check" />
                    </Text>
                  )}
                </View>
                <Text
                  style={{
                    color: '#444446',
                    fontSize: 11,
                    fontFamily: 'Montserrat-Regular',
                    marginLeft: 10,
                    flex: 0.95,
                  }}>
                  Yes, I understand and agree to the Docplus Terms of Service,
                  including the User Agreement and Privacy Policy.
                </Text>
              </TouchableOpacity>

              {modal2.visible ? (
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Montserrat-Bold',
                    marginVertical: 14,
                    fontSize: 10,
                    color: '#EA1A65',
                  }}>
                  {modal2.text}
                </Text>
              ) : (
                <Text></Text>
              )}

              <View style={{ marginTop: 15 }}>
                <ButtonCompo
                  icon={true}
                  title="Continue"
                  isLoading={loading}
                  pressHandler={() => {
                    //nextpage(0)
                    if (!form['isTermTicked2']) {
                      return setModal2({
                        text: 'Please Accept the Terms and Service to continue !',
                        visible: true,
                      });
                    }
                    if (
                      (RegexCheck('should10number').test(
                        form['registration_number'],
                      ) &&
                        RegexCheck('name').test(form['specialty']) &&
                        RegexCheck('year').test(form['registrationYear']) &&
                        form['isTermTicked2']) ||
                      (RegexCheck('number').test(form['npiNumber']) &&
                        form['isTermTicked2'])
                    ) {
                      setModal2({ text: '', visible: false });
                      setLoading(true);
                      let registration = {
                        regNo: form['registration_number'],
                        regCouncil: form['specialty'],
                        regYear: form['registrationYear'],
                      };
                      if (
                        form['location'].toLowerCase().includes('usa') ||
                        form['location'].toLowerCase().includes('new york')
                      ) {
                        registration = {
                          regNo: form['npiNumber'],
                        };
                      }
                      const DocObjToPass = {
                        basic: JSON.stringify({}),
                        password: 'DemoDoc@123',
                        location: form['location'],
                        phone: form['phone'] ? form['phone'] : phone,
                        email: form['email'] ? form['email'] : email,
                        firstName: form['firstName'],
                        lastName: form['lastName'],
                        registration: registration,
                      };

                      checkUserAlreadyExist(registration.regNo, {
                        name: `${form['firstName']} ${form['lastName']}`,
                        firstName: `${form['firstName']}`,
                        lastName: `${form['lastName']}`,
                        email: form['email'],
                      })
                        .then((e) => {
                          // console.log({ e});
                          if (e && e?.length) {
                            setPrevSelectedDoctors(e);
                            nextpage(2);
                            setLoading(false);
                            setModal2({ text: '', visible: false });
                          } else {
                            dispatch(
                              signupDoctor2(
                                DocObjToPass,
                                (doctorID) => {
                                  setRegisteredID(doctorID);
                                  console.log('check id : ', doctorID);
                                },
                                errorCallback,
                              ),
                            );
                            successCallback();
                          }
                          setLoading(false);
                          setModal2({ text: '', visible: true });
                        })
                        .catch((err) => {
                          setLoading(false);
                          // setModal2({
                          //   text: 'Error in fetching prev result !',
                          //   visible: true,
                          // });
                        });
                    } else {
                      setModal2({
                        text: 'Please enter appropiate values !',
                        visible: true,
                      });
                    }
                  }}
                />
              </View>
            </View>
          </View>

          <View key="2">
            <View
              style={{
                height: height * 0.2,
                paddingHorizontal: 15,
                paddingVertical: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  nextpage(1);
                }}>
                <AntDesignIcon name="left" size={27} />
              </TouchableOpacity>
              <View style={{ paddingLeft: 35, paddingTop: 24 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Montserrat-Regular',
                    color: '#333333',
                  }}>
                  Great
                </Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 26,
                    color: '#077EE9',
                    marginTop: -3,
                  }}>
                  Dr. {form['firstName']}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                height: height * 0.8,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                elevation: 10,
                paddingHorizontal: 20,
                paddingVertical: 24,
                flex: 1,
              }}>
              <Text
                style={{
                  color: '#444446',
                  fontSize: 15,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Please{' '}
                <Text style={{ color: 'violet' }}>Select your Profile</Text>
              </Text>

              <View style={{ flex: 1, marginTop: 10 }}>
                <FlatList
                  data={prevSelectedDoctors}
                  keyExtractor={(e) => e && e._id}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setDoctoSelectedProfile(item);
                          LayoutAnimation.linear();
                        }}
                        style={{
                          paddingHorizontal: 25,
                          paddingVertical: 22,
                          borderRadius: 14,
                          marginTop: 20,
                          borderWidth: doctorSelectedProfile == item ? 2 : 0.1,
                          borderColor:
                            doctorSelectedProfile == item ? '#066AC3' : '#000',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Bold',
                            fontSize: 20,
                          }}>
                          {item?.firstName} {item?.lastName}
                        </Text>
                        {(item.specialty ||
                          (item.specialties && item.specialties[0])) && (
                          <Text
                            style={{
                              fontFamily: 'Montserrat-Regular',
                              fontSize: 16,
                            }}>
                            {item.specialty || item.specialties[0]}
                          </Text>
                        )}
                        {item?.location && (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 15,
                            }}>
                            <Text>
                              <MaterialIconsEvilIcons
                                name="location"
                                size={27}
                              />
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Montserrat-Regular',
                                fontSize: 14,
                              }}>
                              {item?.location}
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              <View style={{ marginTop: 20 }}>
                <ButtonCompo
                  icon={false}
                  title="Yes, This is me!"
                  isLoading={doctorSelectedProfile ? false : true}
                  pressHandler={() => {
                    // nextpage(3);
                    let clone = doctorSelectedProfile;
                    setDoctoSelectedProfile(null);
                    console.log({ location: form.location });
                    let registration = {
                      regNo: form['registration_number'],
                      regCouncil: form['specialty'],
                      regYear: form['registrationYear'],
                    };
                    if (
                      form['location'].toLowerCase().includes('usa') ||
                      form['location'].toLowerCase().includes('new york')
                    ) {
                      registration = {
                        regNo: form['npiNumber'],
                      };
                    }
                    const DocObjToPass = {
                      basic: JSON.stringify({}),
                      password: 'DemoDoc@123',
                      location: form['location'],
                      phone: form['phone'] ? form['phone'] : phone,
                      email: form['email'] ? form['email'] : email,
                      firstName: form['firstName'],
                      lastName: form['lastName'],
                      registration: registration,
                      onBoarding: true,
                    };
                    dispatch(
                      signupDoctor2(
                        DocObjToPass,
                        (doctorID, doctor = {}) => {
                          setRegisteredID(doctorID);
                          UpdateDoctorProfileHandler({
                            ...clone,
                            ...DocObjToPass,
                            password: doctor.password,
                            _id: doctor._id,
                            meta: doctor.meta,
                            onBoarding: true,
                          });
                        },
                        errorCallback,
                      ),
                    );
                  }}
                />
                <Text
                  onPress={() => {
                    let registration = {
                      regNo: form['registration_number'],
                      regCouncil: form['specialty'],
                      regYear: form['registrationYear'],
                    };
                    if (
                      form['location'].toLowerCase().includes('usa') ||
                      form['location'].toLowerCase().includes('new york')
                    ) {
                      registration = {
                        regNo: form['npiNumber'],
                      };
                    }
                    const DocObjToPass = {
                      basic: JSON.stringify({}),
                      password: 'DemoDoc@123',
                      location: form['location'],
                      phone: form['phone'] ? form['phone'] : phone,
                      email: form['email'] ? form['email'] : email,
                      firstName: form['firstName'],
                      lastName: form['lastName'],
                      registration: registration,
                      onBoarding: true,
                    };
                    dispatch(
                      signupDoctor2(
                        DocObjToPass,
                        (doctorID, doctor = {}) => {
                          setRegisteredID(doctorID);
                        },
                        errorCallback,
                      ),
                    );
                  }}
                  style={{
                    color: '#3893E7',
                    fontFamily: 'Montserrat-SemiBold',
                    textAlign: 'center',
                    marginTop: 24,
                  }}>
                  Couldn’t find your profile?
                </Text>
              </View>
            </View>
          </View>

          <View key="3">
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  textAlign: 'center',
                  fontSize: 20,
                  marginBottom: 60,
                }}>
                Fetching more details
              </Text>
              {/* <CircularProgress variant="determinate" percent={progress} /> */}
            </View>
          </View>
        </ViewPager>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  radiobutton: {
    width: 18,
    height: 18,
    elevation: 0.1,
    borderRadius: 9,
  },
  selectedRadio: {
    width: 18,
    height: 18,
    borderWidth: 5,
    borderRadius: 9,
    borderColor: '#297281',
  },
});

const propStyle = (percent) => {
  const base_degrees = -135;
  const rotateBy = base_degrees + percent * 3.6;
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }],
  };
};

const CircularProgress2 = ({ percent }) => {
  let stylesFromProps = propStyle(percent);
  return (
    <View style={styles2.container}>
      <View style={[styles2.progressLayer, stylesFromProps]}></View>
      <View style={styles2.offsetLayer}></View>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'Montserrat-SemiBold',
          position: 'absolute',
        }}>
        {percent < 50
          ? `${percent}%`
          : percent >= 50 && percent <= 99
          ? 'Almost done!'
          : 'Done!'}
      </Text>
    </View>
  );
};

const styles2 = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderWidth: 20,
    borderRadius: 100,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressLayer: {
    width: 200,
    height: 200,
    borderWidth: 20,
    borderRadius: 100,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#3498db',
    borderTopColor: '#3498db',
    transform: [{ rotateZ: '-135deg' }],
  },
  offsetLayer: {
    width: 200,
    height: 200,
    position: 'absolute',
    borderWidth: 20,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'grey',
    borderTopColor: 'grey',
    transform: [{ rotateZ: '-135deg' }],
  },
});
