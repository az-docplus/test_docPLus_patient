import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  PermissionsAndroid,
  TextInput,
  Keyboard,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Tooltip, Text as TText } from 'react-native-elements';
import RadioGroupV2 from '../../../../components/molecules/RadioGroup/RadioGroupV2';
import Avater from '../../../atoms/Avater/Avater';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { resetStore } from '../../../../reduxV2/action/AuthAction';
import {
  HEADER_TEXT,
  TERTIARY_TEXT,
  GREY_OUTLINE,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
} from '../../../../styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconsOriginal from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ToggleButton from '../../../molecules/ToggleButton/ToggleButton';
import TopNavBar from '../../../molecules/TopNavBar/TopNavBar';
import { BlockDoctor } from '../../../../reduxV2/action/DoctorAction';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {
  UploadProfilePic,
  UpdateDoctorProfile,
  GetDoctorProfile,
} from '../../../../reduxV2/action/DoctorAction';
import { Host } from '../../../../utils/connection';
import ImagePicker from 'react-native-image-picker';
import ProgressIndicator from '../../../atoms/ProgressIndicator/ProgressIndicator';
import BlurSpinner from '../../../molecules/Modal/BlurLoadingOverlay';
import { Colors } from '../../../../styles/colorsV2';
import { Local } from '../../../../i18n';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import ToggleSwitch from 'toggle-switch-react-native';
import { Button } from 'react-native-paper';

const CustomDoctorDrawer = (props) => {
  const { theme } = useSelector((state) => state.AuthReducer);
  const { navigation } = props;
  String.prototype.toTitleCase = function () {
    const splited = this.split(' ')
      .map((item) => {
        if (item[0]) return `${item[0].toUpperCase()}${item.slice(1)}`;
      })
      .join(' ');
    return splited;
  };

  const state = useSelector((state) => state.AuthReducer);
  const { userData } = state;
  const { access_type } = userData;
  const { doctorProfile, isMyDoctorReducerLoading } = useSelector(
    (state) => state.DoctorReducer,
  );

  const Navigation = [
    {
      active: access_type ? access_type.includes('My Appointments') : true,
      name: `${Local('doctor.Settings.my_appointments')}`,
      navigateTo: 'Appointments',
      icon: 'calendar-account',
    },
    {
      active: access_type ? access_type.includes('Questionnaire') : true,
      name: `${Local('doctor.Settings.questionnaire')}`,
      navigateTo: 'Questionnaire',
      icon: 'comment-question-outline',
    },
    {
      active: access_type ? access_type.includes('Template') : true,
      name: `${Local('doctor.Settings.template')}`,
      navigateTo: 'Template',
      icon: 'template',
    },
    {
      active: access_type ? access_type.includes('Clinics') : true,
      name: `${Local('doctor.Settings.clinics')}`,
      navigateTo: 'Clincs',
      icon: 'hospital-box-outline',
    },
    {
      active: access_type ? access_type.includes('My staff') : true,
      name: `${Local('doctor.Settings.my_staff')}`,
      navigateTo: 'MyStaff',
      icon: 'addusergroup',
    },
    {
      active: access_type ? access_type.includes('Availiblity') : true,
      name: `${Local('doctor.Settings.availability')}`,
      navigateTo: 'Availiblity',
      icon: 'clock-outline',
    },
    {
      active: access_type ? access_type.includes('Payment') : true,
      name: `${Local('doctor.Settings.payment')}`,
      navigateTo: 'Payment',
      icon: 'credit-card-outline',
    },
    {
      active: access_type ? access_type.includes('My Teams') : true,
      name: `${Local('doctor.Settings.my_teams')}`,
      navigateTo: 'Teams',
      icon: 'account-group-outline',
    },
    {
      active: access_type ? access_type.includes('Profile') : true,
      name: `${Local('doctor.Settings.profile')}`,
      navigateTo: 'Boarding',
      icon: 'user',
    },
    // {
    //   active: access_type ? access_type.includes('Skins') : true,
    //   name: `${Local('doctor.Settings.skin')}`,
    //   navigateTo: 'Skins',
    //   icon: 'format-color-fill',
    // },
    {
      active: access_type ? access_type.includes('Skins') : true,
      name: `${Local('doctor.Settings.settings')}`,
      navigateTo: 'Settings',
      icon: 'settings',
    },
    // {
    //   active: access_type ? access_type.includes('Skins') : true,
    //   name: `${Local("doctor.Settings.settings")}`,
    //   navigateTo: 'onboarding',
    //   icon: "settings"
    // }
  ];

  const [credential, setCredential] = useState({
    name: '',
    age: '',
    gender: '',
  });

  const [Block, setBlock] = useState(false);
  const [online, setOnline] = useState(true);

  const [toggleLoading, setToggleLoading] = useState(false);
  const [popupHeight, setPopupHeight] = useState(400);
  const animateHeightOfPopup = useRef(new Animated.Value(0)).current;
  const [popupVisible, setPopupVisible] = useState(false);
  const [aboutPopupHeight, setAboutPopupHeight] = useState(400);
  const animateHeightOfAboutPopup = useRef(new Animated.Value(0)).current;
  const [aboutPopupVisible, setAboutPopupVisible] = useState(false);
  const [imageSource, setImageSource] = useState(
    require('../../../../assets/images/dummy_profile.png'),
  );
  const [completed, setCompleted] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const isDrawer = useIsDrawerOpen();
  // console.log('================>>>>>>>>>>doctorProfile', imageSource);
  // console.log('================>>>>>>>>>>>>>>>>>pppprrrrooofile',doctorProfile)
  useEffect(() => {
    console.log('???????????????????');
    if (aboutPopupVisible) {
      onPressDetails();
    } else if (popupVisible) {
      onPressAvatar();
    }
  }, [isDrawer]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    setCredential({
      name: userData.name,
      gender: userData.gender,
      age: userData.age,
    });
    setBlock(userData.block ?? doctorProfile.block);
    setOnline(userData.online ?? doctorProfile.online);
    /* const total =  Object.keys(userData).length;
    if (total > 0) {
      let c = 0;
      for (let i in userData) {
        const obj = userData[i];
        if (Array.isArray(obj) || typeof obj === 'string') {
          if (obj.length === 0) c++;
        } else if (typeof obj === 'object') {
          if (Object.keys(obj).length === 0) c++;
        } else {
          if (!userData[i]) c++;
        }
      }
      setCompleted((1 - c / total) * 100);
    } */
  }, []);

  const dispatch = useDispatch();
  const onUpdateDoctor = () => {
    setToggleLoading(true);
    dispatch(
      UpdateDoctorProfile(
        { id: userData.id, is_superDoc: !doctorProfile?.is_superDoc },
        () => {
          setToggleLoading(false);
        },
        () => { },
      ),
    );
  };

  const onBlock = () => {
    // console.log(userData?.id, userData?._id);
    // console.log(doctorProfile?._id);
    // setBlock(!Block);
    setToggleLoading(true);
    dispatch(
      BlockDoctor(
        userData?._id,
        () => {
          // console.log(doctorProfile?._id);
          setToggleLoading(false);
          setBlock(!Block);
          console.log('success');
        },
        () => {
          setToggleLoading(false);
          console.log('error');
        },
      ),
    );
  };

  const onOnline = () => {
    // console.log(userData?.id, userData?._id);
    setOnline(!online);
    setToggleLoading(true);
    dispatch(
      UpdateDoctorProfile(
        { id: doctorProfile._id, online: true },
        (res) => {
          setToggleLoading(false);
          // console.log(res?.online);
        },
        () => {
          setOnline(!online);
          setToggleLoading(false);
        },
      ),
    );
    // dispatch(
    //   BlockDoctor(
    //     userData?._id,
    //     () => {
    //       console.log(doctorProfile?._id);
    //       setToggleLoading(false);
    //       setOnline(!online);
    //       console.log('success');
    //     },
    //     () => {
    //       setToggleLoading(false);
    //       console.log('error');
    //     },
    //   ),
    // );
  };

  // if (data && isLogedin && !isDoctor && data.picture) {
  //   imageSource = {
  //     uri: `${Host}${data.picture.replace('public', '').replace('\\\\', '/')}`,
  //   };
  // } else if (data && isLogedin && isDoctor && data.picture.length > 0) {
  //   imageSource = {
  //     uri: `${Host}${data.coverPhoto
  //       .replace('public', '')
  //       .replace('\\\\', '/')}`,
  //   };
  // } else {
  //   imageSource = require('../../../../assets/images/dummy_profile.png');
  // }

  // useEffect(() => {
  //   dispatch(GetDoctorProfile(userData._id));
  // }, []);

  useEffect(() => {
    // console.log(doctorProfile.picture, ">>>>>>>>>>>>>>>>>>>>>")
    if (doctorProfile?.picture?.length) {
      setImageSource({
        uri: `${Host}${doctorProfile?.picture[0]?.replace('public', '')}`,
      });
    } else {
      setImageSource(require('../../../../assets/images/dummy_profile.png'));
    }
  }, [doctorProfile]);

  // useEffect(() => {
  //   if (doctorProfile?.picture?.length) {
  //     setImageSource({
  //       uri: `${Host}${doctorProfile?.coverPhoto
  //         ?.replace('public', '')
  //         .replace('\\\\', '/')}`,
  //     });
  //   } else {
  //     setImageSource(require('../../../../assets/images/dummy_profile.png'));
  //   }
  // }, []);
  const onLogout = () => {
    setLoggingOut(true);
    dispatch(
      resetStore(() => {
        navigation.navigate('MainController');
      }),
    );
  };
  const onPressAvatar = () => {
    animateHeightOfAboutPopup.setValue(0);
    setAboutPopupVisible(false);
    Animated.timing(animateHeightOfPopup, {
      useNativeDriver: true,
      toValue: popupVisible ? 0 : 1,
      easing: Easing.elastic(),
      duration: 500,
    }).start(() => {
      setPopupVisible(!popupVisible);
    });
  };
  const onPressDetails = () => {
    animateHeightOfPopup.setValue(0);
    setPopupVisible(false);
    Animated.timing(animateHeightOfAboutPopup, {
      useNativeDriver: true,
      toValue: aboutPopupVisible ? 0 : 1,
      easing: Easing.elastic(),
      duration: 500,
    }).start(() => {
      setAboutPopupVisible(!aboutPopupVisible);
    });
  };

  const onPopupLayoutChange = (event) => {
    setPopupHeight(event.nativeEvent.layout.height);
  };
  const onAboutPopupLayoutChange = (event) => {
    setAboutPopupHeight(event.nativeEvent.layout.height);
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
      console.warn(err, 'sldkfjdslkfjsdlkfj');
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
        // console.log(response, '...................');
        if (userData._id) {
          setToggleLoading(true);
          dispatch(
            UploadProfilePic(
              userData._id,
              response,
              () => {
                setToggleLoading(false);
                setPopupVisible(!popupVisible);
                animateHeightOfPopup.setValue(0);
                dispatch(GetDoctorProfile(userData._id));
              },
              () => {
                setToggleLoading(false);
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
      // console.log(response, '...................');
      if (response.didCancel) {
        console.log('User cancelled gallery picker');
      } else if (response.error) {
        console.log('Gallery picker Error: ', response.error);
      } else {
        // console.log(response, '...................');
        if (userData._id) {
          setToggleLoading(true);
          dispatch(
            UploadProfilePic(
              userData._id,
              response,
              () => {
                setToggleLoading(false);
                setPopupVisible(!popupVisible);
                animateHeightOfPopup.setValue(0);
                dispatch(
                  GetDoctorProfile(userData._id, () => {
                    setToggleLoading(false);
                  }),
                );
              },
              () => {
                setToggleLoading(false);
              },
            ),
          );
        } else {
          alert('You need to login first');
        }
      }
    });
  };

  const onUpdateDetails = () => {
    setToggleLoading(true);
    const name = credential.name.split(' ');
    const profileData = {
      firstName: name[0],
      lastName: name[1],
      name: credential.name,
      age: credential.age,
      gender: credential.gender.toLowerCase(),
      id: userData._id,
    };
    dispatch(
      UpdateDoctorProfile(
        profileData,
        () => {
          setToggleLoading(false);
          onPressDetails();
        },
        () => {
          setToggleLoading(false);
        },
      ),
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: Colors.secondary_background[theme] },
      ]}>
      <StatusBar
        animated
        backgroundColor={Colors.secondary_background[theme]}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
      />
      {isMyDoctorReducerLoading && (
        <BlurSpinner visible={false}>
          <ActivityIndicator color={NEW_PRIMARY_BACKGROUND} size="large" />
        </BlurSpinner>
      )}
      {(toggleLoading || loggingOut) && (
        <BlurSpinner visible={true}>
          <ActivityIndicator color={NEW_PRIMARY_BACKGROUND} size="large" />
        </BlurSpinner>
      )}
      <View>
        {/* <TopNavBar
          hideRightComp
          onLeftButtonPress={() => {
            navigation.toggleDrawer();
          }}
          headerText={`${Local('doctor.profile.profile')}`}
          {...{ navigation }}
          style={{
            Container: { marginTop: 0, marginBottom: 10 },
            Header: { marginLeft: -24 },
          }}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            // onPress={onProfileClick}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 20,
              marginTop: 30,
            }}>
            {/* <TouchableOpacity onPress={onPressAvatar}>
              <Avater
                src={imageSource}
                type={7}
                style={{
                  borderRadius: 10,
                  borderWidth: theme !== 'DARK' ? 4 : 0,
                  // borderColor: Colors.secondary_background[theme]
                }}
              />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={onPressAvatar}>
              <Image
                source={imageSource}
                style={{
                  height: 80,
                  width: 80,
                  resizeMode: 'cover',
                  borderRadius: 80,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginRight: '20%',
              }}
              onPress={onPressDetails}>
              <View
                style={{
                  paddingHorizontal: '3%',
                  justifyContent: 'space-around',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Gilroy-SemiBold',
                    lineHeight: 20,
                    color: Colors.primary_text_color[theme],
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  {/* {console.log(
                    userData?.firstName,
                    userData?.lastName,
                    '?????????????',
                  )} */}
                  {!userData
                    ? ''
                    : `Dr. ${userData?.firstName?.toTitleCase()} ${userData?.lastName?.toTitleCase()}`}
                </Text>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                      fontWeight: 'normal',
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    4.92
                  </Text>
                  <MaterialCommunityIcons
                    style={{ marginLeft: 5 }}
                    name="star"
                    color={'#43A2A2'}
                    size={18}
                  />
                </View> */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 5,
                  }}>
                  {userData?.age && userData?.age !== '' && (
                    <View
                      style={{
                        alignItems: 'center',
                        borderColor: NEW_PRIMARY_COLOR,
                        borderRightWidth: 1.5,
                        paddingRight: '8%',
                      }}>
                      <Text
                        style={[
                          styles.smallText,
                          { color: Colors.primary_text_color[theme] },
                        ]}>
                        {userData?.age} yrs
                      </Text>
                    </View>
                  )}
                  {userData?.gender && (
                    <View
                      style={
                        userData?.age
                          ? {
                            alignItems: 'center',
                            // borderColor: NEW_PRIMARY_COLOR,
                            // borderLeftWidth: 1.5,
                            paddingLeft: '8%',
                          }
                          : {
                            alignItems: 'center',
                          }
                      }>
                      {/* {console.log(userData.age, '????????????????/')} */}
                      <Text
                        style={[
                          styles.smallText,
                          { color: Colors.primary_text_color[theme] },
                        ]}>
                        {userData.gender.toTitleCase()}
                      </Text>
                    </View>
                  )}
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    // color: '#000',
                    // color: Colors.primary_text_color[theme],
                    color: '#EA1A65',
                    fontFamily: 'Gilroy-Medium',
                    textDecorationLine: 'underline',
                  }}>
                  {Local('doctor.Settings.edit_your_profile')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {
            // !isKeyboardVisible && (
            //   <ProgressIndicator
            //     text={`Complete Your Profile (${Math.floor(completed)}%)`}
            //     textStyle={{
            //       fontSize: 14,
            //       color: '#F8F7FF',
            //       lineHeight: 30,
            //       textAlign: 'center',
            //     }}
            //     style={{
            //       width: '80%',
            //       marginTop: '8%',
            //     }}
            //     completed={completed}
            //     completedColor={'#EA508F'}
            //     incompletedColor={'#FFFFFF'}
            //   />
            // )
          }
        </View>
      </View>
      <View
        style={{
          flex: 4,
          //marginTop: "8%",
          width: '100%',
        }}>
        <ScrollView
          style={{
            marginTop: '5%',
            flex: 1,
            paddingHorizontal: '4%',
          }}>
          <Section
            style={{
              marginTop: '5%',
              paddingBottom: '5%',
              paddingHorizontal: '6%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                justifyContent: 'space-between',
              }}>
              {/* <Tooltip popover={<TText>Doctor on Demand</TText>}>  <TText>
                Doctor on Demand
              </TText></Tooltip> */}
              <Text
                style={{
                  color: '#000',
                  fontSize: 14,
                  fontFamily: 'Gilroy-Medium',
                  color: Colors.primary_text_color[theme],
                }}>
                {Local('doctor.Settings.doctor_on_demand')}
              </Text>
              <ToggleSwitch
                isOn={doctorProfile?.is_superDoc}
                onColor="#297281"
                offColor="gray"
                labelStyle={{ color: 'black', fontWeight: '900' }}
                size="medium"
                onToggle={onUpdateDoctor}
                animationSpeed={200}
              />
              {/* <ToggleButton
                toggle={doctorProfile?.is_superDoc}
                onToggle={onUpdateDoctor}
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
              /> */}
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 24,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 14,
                  // fontWeight: 'bold',
                  fontFamily: 'Gilroy-Medium',
                  color: Colors.primary_text_color[theme],
                }}>
                {Local('doctor.Settings.block')}
              </Text>

              <ToggleSwitch
                isOn={Block}
                onColor="#297281"
                offColor="gray"
                labelStyle={{ color: 'black', fontWeight: '900' }}
                size="medium"
                onToggle={onBlock}
                animationSpeed={200}
              />

              {/* <ToggleButton
                toggle={Block}
                onToggle={onBlock}
                style={{
                  borderRadius: 10,
                  width: 120,
                  marginLeft: '3%',
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
              /> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 24,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 14,
                  // fontWeight: 'bold',
                  fontFamily: 'Gilroy-Medium',

                  color: Colors.primary_text_color[theme],
                }}>
                {Local('doctor.Settings.Online')}
              </Text>
              <ToggleSwitch
                isOn={online}
                onColor="#297281"
                offColor="gray"
                labelStyle={{ color: 'black', fontWeight: '900' }}
                size="medium"
                onToggle={onOnline}
                animationSpeed={200}
              />

              {/* <ToggleButton
                toggle={online}
                onToggle={onOnline}
                style={{
                  borderRadius: 10,
                  width: 120,
                  marginLeft: '3%',
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
              /> */}
            </View>
          </Section>
          {Navigation.map((item, index) => {
            if (item.active)
              return (
                <Section>
                  {/* <TouchableOpacity
                  onPress={() => navigation.navigate(item.navigateTo)}>
                  <View style={styles.listRow}>
                    <Image
                      source={require('../../../assets/icons/profile/referals.png')}
                      style={{ height: 30, width: 50, marginHorizontal: 10 }}
                      resizeMode="contain"
                    />
                    <Text style={[styles.smallText, { flex: 1 }]}>My Appointments</Text>
                    <Image
                      source={require('../../../assets/icons/back.png')}
                      style={styles.rowRightIcon}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(item.navigateTo);
                    }}>
                    <View
                      style={[
                        styles.listRow,
                        { backgroundColor: Colors.secondary_background[theme] },
                      ]}>
                      <View
                        style={{
                          height: 20,
                          width: 50,
                          marginHorizontal: 4,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {item.name === 'My Staff' || item.name === 'Profile' ? (
                          <AntDesignIcons
                            name={item.icon}
                            size={32}
                            color={'#297281'}
                          />
                        ) : item.name === 'Settings' ? (
                          <MaterialIconsOriginal
                            style={{
                              fontSize: 30,
                              marginHorizontal: '6%',
                              color: '#297281',
                            }}
                            name="settings"></MaterialIconsOriginal>
                        ) : item.name === 'Template' ? (
                          <FontAwesome5
                            style={{
                              fontSize: 30,
                              marginHorizontal: '6%',
                              color: '#297281',
                            }}
                            name="notes-medical"></FontAwesome5>
                        ) : (
                          <MaterialIcon
                            name={item.icon}
                            size={32}
                            color={'#297281'}
                          />
                        )}
                      </View>
                      <Text
                        style={[
                          styles.smallText,
                          { flex: 1, color: Colors.primary_text_color[theme] },
                        ]}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Section>
              );
          })}
          <Section>
            <View
              style={{
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={onLogout}
                // mode="outlined"
                // color="#077EE9"
                style={{
                  borderColor: '#077EE9',
                  borderWidth: 1,
                  borderRadius: 28,
                  paddingVertical: 15,
                  paddingHorizontal: 35,
                  borderRadius: 30,
                  fontFamily: 'Gilroy-Medium',
                }}>
                <Text
                  style={{
                    color: '#077EE9',
                    fontSize: 16,
                    textTransform: 'capitalize',
                    fontFamily: 'Gilroy-Medium',
                  }}>
                  {`${Local('doctor.Settings.submit')}`}
                </Text>
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity onPress={onLogout}>
              <View
                style={[
                  styles.listRow,
                  { backgroundColor: Colors.secondary_background[theme] },
                ]}>
                <View
                  style={{
                    height: 20,
                    width: 50,
                    // marginHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcon name={'lock'} size={32} color={'#297281'} />
                </View>
                <Text
                  style={[
                    styles.smallText,
                    { flex: 1, color: Colors.primary_text_color[theme] },
                  ]}>
                  {Local('doctor.Settings.logout')}
                </Text>
              </View>
            </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={onLogout}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 15,
                }}>
                {'Logout'}
              </Text>
            </TouchableOpacity> */}
          </Section>
        </ScrollView>
      </View>
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
          {Local('doctor.Settings.update_profile_picture')}
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
              {Local('doctor.Settings.gallery')}
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
              {Local('doctor.Settings.camera')}
            </Text>
          </View>

          <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  UpdateDoctorProfile(
                    { id: userData.id, picture: [] },
                    () => {
                      setToggleLoading(false);
                      console.log('sucess');
                    },
                    () => {
                      setToggleLoading(false);
                      console.log('failure');
                    },
                  ),
                );
              }}
              style={{
                backgroundColor: '#077EE9',
                padding: '15%',
                borderRadius: 100,
              }}>
              <MaterialCommunityIcons
                name={'delete'}
                size={32}
                color={'#fff'}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginTop: '2%',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('doctor.Settings.remove_photo')}
            </Text>
          </View>
        </View>
      </Animated.View>
      <Animated.View
        onLayout={onAboutPopupLayoutChange}
        style={{
          width: '100%',
          height: isKeyboardVisible ? '40%' : '30%',
          // backgroundColor: '#077EE9',
          backgroundColor: Colors.profile_popup_bg[theme],
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingVertical: '5%',
          paddingHorizontal: '10%',
          alignItems: 'center',
          justifyContent: 'space-around',
          transform: [
            {
              translateY: animateHeightOfAboutPopup.interpolate({
                inputRange: [0, 1],
                outputRange: [aboutPopupHeight, 0],
              }),
            },
          ],
        }}>
        <Text
          style={{
            fontSize: 22,
            color: Colors.primary_text_color[theme],
            fontFamily: 'Montserrat-SemiBold',
          }}>
          {Local('doctor.Settings.update_profile_details')}
        </Text>
        <View style={{ width: '75%' }}>
          <TextInput
            onChangeText={(name) => setCredential({ ...credential, name })}
            value={credential.name}
            placeholder={`${Local('doctor.profile.name')}`}
            placeholderTextColor={Colors.input_placeholder_color[theme]}
            style={{
              borderBottomWidth: 1,
              color: Colors.primary_text_color[theme],
              borderBottomColor: '#43A2A2',
              paddingVertical: '2%',
              marginBottom: '2%',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              placeholder={`${Local('doctor.profile.age')}`}
              placeholderTextColor={Colors.input_placeholder_color[theme]}
              keyboardType={'number-pad'}
              value={credential.age}
              maxLength={2}
              onChangeText={(age) => {
                if (!Number.isNaN(Number(age)) && age != ' ') {
                  setCredential({ ...credential, age });
                }
              }}
              style={{
                borderBottomWidth: 1,
                color: Colors.primary_text_color[theme],
                borderBottomColor: '#43A2A2',
                paddingVertical: '2%',
                paddingRight: '9%',
                width: '40%',
              }}
            />
            {/* <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: '8%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}> */}
            <RadioGroupV2
              horizontal
              activeKey={credential.gender}
              style={{
                justifyContent: 'space-around',
                paddingRight: '20%',
                paddingLeft: '10%',
                paddingTop: '5%',
              }}
              setActiveKey={(gender) =>
                setCredential({ ...credential, gender })
              }
              Item={[
                { value: 'Male', id: 'male' },
                { value: 'Female', id: 'female' },
              ]}
            />
            {/* </View> */}
            {/* <TextInput
              placeholder={`${Local("doctor.profile.gender")}`}
              placeholderTextColor={Colors.input_placeholder_color[theme]}
              value={credential.gender}
              onChangeText={(gender) => setCredential({ ...credential, gender })}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#43A2A2',
                color: Colors.primary_text_color[theme],
                paddingVertical: '2%',
                paddingRight: '9%',
                width: '40%'
              }}
            /> */}
          </View>
        </View>
        <TouchableOpacity
          onPress={onUpdateDetails}
          style={{
            backgroundColor: '#43A2A2',
            paddingVertical: '3%',
            paddingHorizontal: '5%',
            borderRadius: 10,
            marginTop: '5%',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              fontFamily: 'Gilroy-Medium',
            }}>
            {Local('doctor.Settings.submit')}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};;

const styles = StyleSheet.create({
  smallText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
  },
  listRow: {
    flexDirection: 'row',
    // paddingVertical: 15,
    // borderColor: GREY_OUTLINE,
    // borderBottomWidth: 1,
    alignItems: 'center',
    height: 50,
  },
  rowRightIcon: {
    height: 15,
    width: 20,
    transform: [{ rotateZ: '180deg' }],
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    zIndex: 99,
  },
  section: {
    backgroundColor: '#fafafa',
    marginBottom: 8,
  },
  sectionTop: { marginBottom: 50, position: 'relative' },
  profile: {
    display: 'flex',
    paddingHorizontal: '10%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  backButtonContainer: {
    height: 28,
    width: 28,
    marginTop: 10,
    marginLeft: 15,
  },
  touchableButton: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingCard: {
    height: 70,
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 10,
    elevation: 2,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    position: 'absolute',
    bottom: -35,
    alignSelf: 'center',
    zIndex: 1,
  },
  floatingCardSection: {
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  thinBorderRight: {
    borderRightWidth: 0.3,
  },
  floatingCardSectionHeading: {
    textTransform: 'uppercase',
    color: HEADER_TEXT,
    fontSize: 13,
    lineHeight: 20,
  },
  floatingCardSectionHeading2: {
    textTransform: 'uppercase',
    color: HEADER_TEXT,
    fontSize: 24,
    marginTop: 5,
  },

  option: {},
});

const Section = ({ children, style = {} }) => {
  return (
    <View
      style={[
        {
          paddingVertical: '2%',
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default CustomDoctorDrawer;
