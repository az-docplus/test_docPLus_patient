/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Keyboard,
  Dimensions,
  Button,
} from 'react-native';
import { Paragraph } from 'react-native-paper';
import Highlighter from 'react-native-highlight-words';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, TextInput } from 'react-native-paper';
import AwesomeButton from 'react-native-really-awesome-button';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import InsetShadow from 'react-native-inset-shadow';
import Entypo from 'react-native-vector-icons/Entypo';
import { Local, setLocale } from '../../i18n';
import {
  AddFevDoc,
  ApproveAppointment,
  CreateAppointment,
  GetAppointments,
  GetPatientInfo,
  RemoveAppointment,
  RemoveFevDoc,
} from '../../reduxV2/action/PatientAction';
import PicturelessAvatar from '../../components/atoms/PicturelessAvatar/PicturelessAvatar';
import CustomTextComponent from '../../components/CustomTextComponent';
import DoctorHeader from '../../components/DoctorHeader';
import {
  fetchCustomDoctor,
  fetchDoctorLite,
} from '../../reduxV2/action/DoctorToPatientAction';
import { Colors } from '../../utils/Colors';
import { Host } from '../../utils/connection';
import { windowWidth } from '../../utils/utils';
import DoctorSearch from './DoctorSearch';
import Favorites from '../../components/atoms2/doctor/favorites';
import ButtonCompo from '../../components/atoms2/button/button';
import { consern } from '../../components/healthData';
import { BottomSheet, Divider, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioGroupV2 from '../../components/molecules/RadioGroup/RadioGroupV2';
import AvailibilityTabComponent from './profile_component/AvailibilityTabComponent';

import axios from 'axios';
import { getSpecialty } from '../../reduxV2/action/DoctorAction';
import {
  // fetchDoctorLite,
  // fetchMoreDoctorLite,
  searchDoctors,
  fetchSuperDoc,
  fetchFilteredSuperDoc,
  fetchFilteredDoctors,
  // GetAllDoctors,
} from '../../reduxV2/action/DoctorToPatientAction';
import AnimatedLottieView from 'lottie-react-native';
import { ListingWithThumbnailLoader } from '../../components/atoms/Loader/Loader';
import BlurModal from '../../components/molecules/Modal/BlurModal';
import LinearGradient from 'react-native-linear-gradient';
export default function DoctorHome({
  navigation,
  visible,
  onCancel,
  setVisible,
}) {
  // console.log('==============333333333', visible, onCancel, setVisible);
  const [itemsToShow, setItemsToShow] = useState(6);
  const scroll = React.useRef();
  const Window = Dimensions.get('window');
  // const [screen, setScreen] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [localLoading, setLocalLoading] = React.useState(false);
  const [headerText, setHeaderText] = React.useState('');
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const [aboutPopupVisible, setAboutPopupVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const animateHeightOfPopup = useRef(new Animated.Value(0)).current;
  const animateHeightOfAboutPopup = useRef(new Animated.Value(0)).current;
  const [aboutPopupHeight, setAboutPopupHeight] = useState(600);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState(1);
  const [ActiveSpeciality, setActiveSpeciality] = useState({ item: '', i: '' });
  const [doctorLocalState, setDoctorLocalState] = useState([]);
  const [localDoctorLoading, setLocalDoctorLoading] = useState(true);
  const [toggle, setToggle] = useState(0); // 0 : all docs , 1 : super doc
  const [Slot, setSlot] = useState(null);
  const [showOverviewTab, setShowOverviewTab] = useState('overview');
  const [ShowSearchHeader, setShowSearchHeader] = useState(false);

  const getImage = (image) => {
    switch (image) {
      case 'img1':
        return require('../../assets/icons/badstomach.png');

      case 'img2':
        return require('../../assets/icons/skinrash.png');

      case 'img3':
        return require('../../assets/icons/covidcare.png');

      case 'img4':
        return require('../../assets/icons/coughcold.png');

      default:
        return '';
    }
  };
  getImage();
  const { appointments, gettingAppointment, errorGettingAppointment } =
    useSelector((state) => state.DoctorReducer);

  const dispatch = useDispatch();
  const { userData, isLoggedin, lastSearches } = useSelector(
    (state) => state.AuthReducer,
  );
  const {
    // specialtyLoading,
    specialty,
  } = useSelector((state) => state.DoctorReducer);
  const {
    doctors,
    loading,
    // moreDoctorLoading,
    // searchDoctorsLoading,
    searchedDoctors,
    superDocsLoading,
    superDocs,
  } = useSelector((state) => state.DoctorToPatientReducer);
  // console.log('docrotrs..................', specialty);
  // console.log('docrotrs..................', doctors);
  // console.log('Superdocrotrs..................', superDocs);

  const {
    patient,
    // isPatientAccountReducerLoading
  } = useSelector((state) => state.PatientReducer);
  // console.log('hello');
  // console.log('patient..................', patient);
  useEffect(() => {
    !gettingAppointment && dispatch(GetAppointments(userData._id));
  }, []);

  const [user, setUser] = useState('en');

  const getUser = async () => {
    // const value = await AsyncStorage.getItem('language');
    // if (value === null) {
    //   await AsyncStorage.setItem('language', 'en');
    // } else {
    //   setUser(value);
    // }
    // console.log(user,'=============myLanguage')
  };
  useEffect(() => {
    dispatch(getSpecialty(0, 52));
  }, [dispatch]);
  // console.log('==============@@@@@@@@@@@@@@@', doctors);
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
    getUser();
  }, []);

  // useEffect(() => {
  //   dispatch(fetchDoctorLite('', 0, false));
  //   dispatch(fetchSuperDoc('', 1, '10'));
  // }, []);

  // useEffect(() => {
  //   if (isLoggedin) {
  //     // console.log(isLoggedin);
  //   } else {
  //     navigation.navigate('verify-screen-v2');
  //   }
  // }, []);
  // const [border, setBorder] = useState(false);
  const [consernText, setConsernText] = useState('');

  //  const name = consern.map((item)=>{
  //    console.log(item.name);
  //  })
  //  console.log(name);

  const searchConsernData = () => {
    consern.map((item) => {
      if (consernText === item.name) {
        // console.log('yes');
      } else {
        // console.log('no');
      }
    });
  };

  // {doctors.map((item)=>(
  //   console.log(item.specialty)
  // ))}
  const handleSpecialtyFilter = (item, index) => {
    // console.log('spaclity>>>>>>>>>>>>>>', item);

    dispatch(searchDoctors(item, 1));
    setTap(false);
  };

  const onToggle = useCallback(() => {
    // setActiveFilter(1);
    setToggle((prev) => (prev === 0 ? 1 : 0));
  }, []);

  useEffect(() => {
    searchConsernData();
  }, [consernText]);

  const handleSearch = (searchKey) => {
    // const searchParams = {
    //   match: JSON.stringify({
    //     city: searchKey,
    //     specialty: searchKey,
    //     state: searchKey,
    //     country: searchKey,
    //     firstName: searchKey,
    //     lastName: searchKey,
    //     name: searchKey,
    //   }),
    //   name: searchKey,
    // };
    dispatch(fetchCustomDoctor(searchKey, 0, false));
    dispatch(fetchSuperDoc(searchKey, 1, '10'));
  };

  const onRefresh = useCallback(() => {
    dispatch(fetchDoctorLite('', 0, false));
    dispatch(fetchSuperDoc('', 1, '10'));
    setSearch('');
    setHeaderText('');
    setConsernText('');
    setDoctorSpacialty('');
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [docData, setDocData] = useState([]);
  const [conditionData, setConditionData] = useState([]);
  const [searchConsern, setSearchConsern] = useState('');
  const [tap, setTap] = useState(false);
  const [filteredAppointments, setfilteredAppointments] = useState([]);
  const [SelectCondition, setSelectCondition] = useState('');
  const [focus, setFocus] = useState(false);
  const [isVisibleFilter, setIsVisibleFilter] = useState(false);
  const [doctorSpacialty, setDoctorSpacialty] = useState('');
  const today = new Date();

  const [active, setactive] = useState({
    date: today.getDate(),
    month: new Date().getMonth(),
  });

  const filterAppointments = () => {
    if (typeof appointments == 'string') return;

    let startDate = new Date().setDate(active.date);
    startDate = new Date(startDate).setMonth(active.month);
    startDate = new Date(startDate).setHours(0);
    startDate = new Date(startDate).setMinutes(0);
    const endDate = new Date(startDate).setDate(active.date + 1);
    const appointment =
      appointments &&
      appointments[0] &&
      appointments.filter((item, index) => {
        if (
          new Date(item.bookedFor).getTime() > new Date(startDate).getTime() &&
          new Date(item.bookedFor).getTime() < new Date(endDate).getTime()
        )
          return item;
      });
    setfilteredAppointments(appointment);
  };
  useEffect(() => {
    setDocData([...superDocs, ...doctors]);
    // scroll.current.scrollTo({ y: Window.height / 1.8, animated: true });
  }, [superDocs, doctors]);

  useEffect(
    () => {
      filterAppointments();
    },
    [
      // appointments
    ],
  );

  const [metaData, setMetaData] = useState([]);

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  const [newConditions, setNewConditions] = useState([]);

  useEffect(() => {
    const _conditions = [];
    specialty.map((item) => {
      const Conditions = JSON.parse(item.conditions);
      Conditions.map((t) => _conditions.push(t));
    });
    setNewConditions(_conditions);
  }, [specialty]);

  useEffect(() => {
    if (search) {
      const specialties = specialty.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase()),
      );
      setFilterData(specialties);

      const conditions = newConditions.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase()),
      );
      setConditionData(conditions);
    } else {
      setFilterData(specialty);
      setConditionData(consern);
      setSearchConsern(search);
      // console.log('no data');
    }
  }, [search]);

  // console.log('=================newConditions', newConditions);
  // useEffect(() => {
  //   if (search) {
  //     const specialties = [];
  //     const conditions = [];
  //     specialty.map((element) => {
  //       if (element.name.toLowerCase().includes(search.toLowerCase()))
  //         specialties.push(element);

  //       const _conditions = JSON.parse(element.conditions);
  //       console.log('=====================>>>>>>>specialties', specialties);
  //       _conditions.map((condition) => {
  //         if (condition.name.toLowerCase().includes(search.toLowerCase()))
  //           conditions.push(condition);
  //       });
  //       setFilterData(specialties);
  //       setConditionData(conditions);
  //       console.log('=====================>>>>>>>conditions', conditions);
  //       console.log('=====================>>>>>>>specialties', specialties);
  //     });
  //   } else {
  //     setFilterData(specialty);
  //     setConditionData(consern);
  //     setSearchConsern(search);
  //     console.log('no data');
  //   }
  // }, [search]);

  useEffect(() => {
    // console.log('???????????????????');
    if (aboutPopupVisible) {
      onPressDetails();
    } else if (popupVisible) {
      // onPressAvatar();
    }
  }, []);

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

  const onAboutPopupLayoutChange = (event) => {
    setAboutPopupHeight(event.nativeEvent.layout.height);
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const [selectedConsern, setSelectedConsern] = useState('');

  return (
    <>
      <ScrollView
        ref={scroll}
        style={{
          backgroundColor: 'whitesmoke',
          paddingTop: 10,
          paddingBottom: 70,
          flex: 1,
        }}>
        {search ? (
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 15,
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity onPress={() => setSearch('')}>
              <Entypo name="chevron-thin-left" color="black" size={27} />
            </TouchableOpacity>
            <Text
              style={{
                color: '#297281',
                fontSize: 23,

                fontFamily: 'Gilroy-SemiBold',
              }}>
              Search
            </Text>
            <Entypo name="chevron-thin-left" color="whitesmoke" size={27} />
          </View>
        ) : (
          <DoctorHeader
            onPressLeftIcons={() => navigation.openDrawer()}
            showIcon
            textStyle={{
              fontFamily: 'Gilroy-Medium',
            }}
            text={`Doctors ${headerText}`}
          />
        )}
        <View style={{ paddingHorizontal: 16 }}>
          <DoctorSearch
            focusMode={() => setFocus(true)}
            onTextChange={(text) => {
              setSearch(text);
            }}
            onChangeText={(e) => getMetaData(e)}
            value={search}
            onCancle={() => setSearch('')}
            onPress={() => {
              setShowSearchHeader(true);
              handleSearch(search);
              setDoctorSpacialty('');
              if (search.length === 0) setHeaderText(``);
              else setHeaderText(`for ${search}`);
              if (search.length > 0) {
                if (!lastSearches.includes(search)) {
                  dispatch({
                    type: 'LAST_SEARCHES',
                    payload: search,
                  });
                }
              } else {
                alert('enter something');
              }
            }}
          />
          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('selfCheck')}
                style={{
                  flex: 1,
                  marginRight: 10,
                  // width: '100%',
                  // display: 'flex',
                  padding: 20,
                  borderRadius: 20,
                  backgroundColor: '#FFFFFF',
                  elevation: 10,
                  // height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderWidth: 1,
                    borderColor: '#51B4BE',
                    borderRadius: 60,
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/png/image-18.png')}
                    style={{
                      width: 40,
                      height: 50,
                      paddingHorizontal: 20,
                    }}
                  />
                </View>
                <Text
                  style={{
                    marginTop: 15,
                    textAlign: 'center',

                    fontFamily: 'Gilroy-Medium',
                    fontSize: 16,
                  }}>
                  Start Self -Check
                </Text>
                {/* </View> */}
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  marginLeft: 10,
                  // width: '100%',
                  // display: 'flex',
                  padding: 20,
                  borderRadius: 20,
                  backgroundColor: '#FFFFFF',
                  elevation: 10,
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderWidth: 1,
                    borderColor: '#51B4BE',
                    borderRadius: 60,
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/png/image-17.png')}
                    style={{
                      width: 40,
                      height: 50,
                      paddingHorizontal: 20,
                    }}
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 15,
                    fontFamily: 'Gilroy-Medium',
                    fontSize: 16,
                  }}>
                  Instant Consultation
                </Text>
                {/* </View> */}
                {/* <Image
                source={require('../../assets/png/check.png')}
                resizeMode="contain"
                style={{
                  width: 200,
                  height: 220,
                }}
              /> */}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                width: '100%',
                backgroundColor: '#FFFFFF',
                padding: 20,
                borderRadius: 20,

                elevation: 10,
              }}>
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: '#51B4BE',
                  borderRadius: 60,
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/png/image-19.png')}
                  style={{
                    width: 40,
                    height: 50,
                    paddingHorizontal: 20,
                  }}
                />
              </View>

              <View style={{ width: '70%', marginLeft: 30 }}>
                <Text style={{ fontFamily: 'Gilroy-Medium', fontSize: 16 }}>
                  Book Appointment
                </Text>
                <Text
                  style={{
                    fontFamily: 'Gilroy-Regular',
                    fontSize: 14,
                    marginVertical: 5,
                  }}>
                  Schedule appointments with doctors regarding your concerns
                  from here
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
              marginHorizontal: 5,
              // marginVertical: 10,
            }}>
            <TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  marginRight: 5,
                  // width: '100%',
                  // display: 'flex',
                  padding: 20,
                  borderRadius: 20,
                  backgroundColor: '#FFFFFF',
                  elevation: 10,
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/png/circle.png')}
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 25,
                    width: 120,
                    height: 70,
                  }}
                />
                <Image
                  resizeMode="contain"
                  source={require('../../assets/png/image-18.png')}
                  style={{
                    width: 100,
                    height: 50,
                  }}
                />
                <Text
                  style={{
                    marginVertical: 20,
                    textAlign: 'center',

                    fontFamily: 'Gilroy-Medium',
                    fontSize: 16,
                  }}>
                  Start Self -Check
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  marginRight: 5,
                  // width: '100%',
                  // display: 'flex',
                  padding: 20,
                  borderRadius: 20,
                  backgroundColor: '#FFFFFF',
                  elevation: 10,
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/png/circle.png')}
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 25,
                    width: 120,
                    height: 70,
                  }}
                />
                <Image
                  resizeMode="contain"
                  source={require('../../assets/png/image-18.png')}
                  style={{
                    width: 100,
                    height: 50,
                  }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    marginVertical: 10,
                    fontFamily: 'Gilroy-Medium',
                    fontSize: 16,
                  }}>
                  Instant Consultation
                </Text>
              </View>
             
            </TouchableOpacity>
          </View> */}
          <View>
            {focus && search ? (
              lastSearches.length > 0 ? (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 20,
                    }}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={require('../../assets/icons/clock.png')}
                        style={{
                          height: 15,
                          width: 15,
                          resizeMode: 'contain',
                          tintColor: '#297281',
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: 'Gilroy-SemiBold',
                          color: '#297281',
                          fontSize: 18,

                          marginLeft: 10,
                        }}>
                        Recently Searched
                      </Text>
                    </View>
                    <TouchableOpacity onPress={openModal}>
                      <Text
                        style={{
                          textDecorationLine: 'underline',
                          color: '#EA1A65',
                          fontFamily: 'Gilroy-SemiBold',
                          fontSize: 14,
                        }}>
                        clear
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 10 }}>
                    {lastSearches.map((item) => (
                      <TouchableOpacity
                        onPress={() => {
                          handleSearch(item);
                          setDoctorSpacialty('');
                          setSelectCondition(item);
                        }}
                        style={{
                          backgroundColor: 'white',
                          paddingHorizontal: 20,
                          paddingVertical: 15,
                          minWidth: 150,
                          marginHorizontal: 5,
                          borderRadius: 50,
                          marginVertical: 5,
                          shadowColor: '#171717',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.8,
                          shadowRadius: 2,
                          elevation: 5,
                        }}>
                        <Text
                          style={{
                            color: '#333333',
                            fontSize: 16,

                            textAlign: 'center',
                            fontFamily: 'Gilroy-SemiBold',
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </View>

          {search ? (
            <View>
              {conditionData.length > 0 ? (
                <View>
                  <View
                    style={{
                      marginTop: 20,
                    }}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          color: '#297281',
                          fontSize: 18,
                          fontFamily: 'Gilroy-SemiBold',
                          marginLeft: 10,
                        }}>
                        {`${Local(
                          'doctor.V2.doctor_home.search_consern.health_consern',
                        )}`}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexWrap: 'wrap',
                      marginTop: 10,
                    }}>
                    {getUniqueListBy(conditionData, 'name')
                      .slice(0, itemsToShow)
                      .map((item) => (
                        <TouchableOpacity
                          key={item._id}
                          onPress={() => {
                            handleSearch(item.name);
                            setDoctorSpacialty('');
                            setSelectCondition(item.name);
                            setSearch('');
                            if (!lastSearches.includes(item.name)) {
                              dispatch({
                                type: 'LAST_SEARCHES',
                                payload: item.name,
                              });
                            } else {
                              alert('enter something');
                            }
                          }}
                          style={{
                            backgroundColor: 'white',
                            paddingHorizontal: 20,
                            paddingVertical: 15,
                            width: '45%',
                            marginHorizontal: 5,
                            borderRadius: 50,
                            marginVertical: 5,
                            shadowColor: '#171717',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                            borderColor:
                              SelectCondition === item.name
                                ? '#EA1A65'
                                : 'white',
                            borderWidth: 1,
                          }}>
                          <Highlighter
                            style={{
                              color: '#000000',
                              fontSize: 16,

                              textAlign: 'center',
                              fontFamily: 'Gilroy-SemiBold',
                            }}
                            highlightStyle={{ color: '#EA1A65' }}
                            searchWords={[search]}
                            textToHighlight={item.name.substr(0, 16)}
                          />

                          {/* <Text
                            style={{
                              color: item.name
                                .toString()
                                .toLowerCase()
                                .match(search)
                                ? '#EA1A65'
                                : 'black',
                              fontSize: 15,
                              fontWeight: '600',
                              textAlign: 'center',
                              fontFamily: 'Gilroy-SemiBold',
                            }}>
                            {item.name.substr(0, 16)}
                          </Text> */}
                        </TouchableOpacity>
                      ))}
                  </View>
                  <View
                    style={{
                      paddingVertical: 20,

                      marginBottom: 40,
                    }}>
                    {getUniqueListBy(conditionData, 'name').length > 6 ? (
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            getUniqueListBy(conditionData, 'name').length ===
                            itemsToShow
                              ? setItemsToShow(6)
                              : setItemsToShow(
                                  getUniqueListBy(conditionData, 'name').length,
                                );
                          }}
                          style={{
                            // borderRadius: 30,

                            paddingHorizontal: 20,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontFamily: 'Gilroy-SemiBold',
                              fontSize: 16,
                              color: '#EA1A65',
                            }}>
                            {getUniqueListBy(conditionData, 'name').length ===
                            itemsToShow
                              ? `${Local(
                                  'doctor.V2.doctor_home.search_consern.show_less',
                                )}`
                              : `${Local(
                                  'doctor.V2.doctor_home.search_consern.show_more',
                                )}`}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
          ) : (
            <View style={{ marginTop: 20 }}>
              <View style={{flexDirection:"row",alignItems:'flex-start',justifyContent:'space-between'}}>
                <View>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 19,

                        letterSpacing: 0.5,
                        fontFamily: 'Gilroy-SemiBold',
                      }}>
                      {/* {`${Local('doctor.V2.doctor_home.common_health_consern')}`} */}
                      What’s your concern?
                    </Text>
                    <Text
                      style={{
                        color: 'grey',
                        fontSize: 12,
                        fontFamily: 'Gilroy-SemiBold',
                        marginVertical: 10,
                      }}>
                      The listed are some common health concerns
                    </Text>
                </View>
                  <TouchableOpacity onPress={() => navigation.navigate('allConsern')}>
                    <Text
                      style={{
                        color: '#3EAEAE',
                        fontSize: 18,
                      }}>
                      Show all
                    </Text>
                  </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                  marginTop: 10,
                }}>
                {Local('doctor.V2.doctor_home.health_consern').map(
                  (item, i) => (
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'white',
                        paddingHorizontal: 5,
                        paddingVertical: 7,
                        width: '45%',
                        marginLeft: 10,
                        borderRadius: 50,
                        marginVertical: 5,
                        shadowColor: '#171717',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 12,
                        borderColor:
                          SelectCondition === item.name ? '#EA1A65' : 'white',
                        borderWidth: 1,
                      }}
                      key={i}
                      onPress={() => {
                        handleSearch(item.name);
                        setDoctorSpacialty('');
                        setSelectCondition(item.name);
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Image
                          source={getImage(item.image)}
                          style={{
                            height: 50,
                            width: 40,
                            resizeMode: 'contain',
                          }}
                        />
                        <View style={{ marginLeft: 7, flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 15,

                              color: 'black',
                              maxWidth: '85%',
                              fontFamily: 'Gilroy-SemiBold',
                            }}>
                            {item.name}
                          </Text>
                        </View>
                      </View>
                      {/* </Card> */}
                    </TouchableOpacity>
                  ),
                )}
              </View>
            </View>
          )}

          {showModal ? (
            <BlurModal center={true} {...{ visible, onCancel, setVisible }}>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 18,
                  color: '#353535',
                  textAlign: 'left',
                  maxWidth: '75%',
                }}>
                Are you sure you want to clear recent searches?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  marginTop: 20,
                }}>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: 16,
                      color: '#EA1A65',
                    }}>
                    CANCEL
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowModal(false);
                    setSearch('');
                    dispatch({
                      type: 'DELETE_SEARCHES',
                      payload: [],
                    });
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: 16,
                      marginLeft: 30,
                      color: '#7B7A79',
                    }}>
                    CONFIRM
                  </Text>
                </TouchableOpacity>
              </View>
            </BlurModal>
          ) : (
            <></>
          )}
          <View>
            <View>
              {filteredAppointments > 0 ? (
                filteredAppointments.map((item) => (
                  <Card style={{ borderRadius: 20, marginVertical: 10 }}>
                    <View
                      style={{
                        paddingHorizontal: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          marginVertical: 10,
                        }}>
                        <Image
                          source={require('../../assets/icons/Date_range_light.png')}
                          style={{
                            height: 25,
                            width: 25,
                            resizeMode: 'contain',
                            tintColor: 'black',
                          }}
                        />
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 18,
                            marginLeft: 10,
                            fontWeight: 'bold',
                          }}>
                          Upcoming Appointment
                        </Text>
                      </View>
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                          }}>
                          {item.doctor.coverPhoto ? (
                            <Image
                              source={{
                                uri: `${Host}${item.doctor.coverPhoto
                                  .replace('public', '')
                                  .replace('\\\\', '/')}`,
                              }}
                              style={{
                                height: 85,
                                width: 85,
                                borderRadius: 85,
                                resizeMode: 'cover',
                              }}
                            />
                          ) : (
                            <View
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'lightgrey',
                                padding: 20,
                                borderRadius: 50,
                              }}>
                              <Text
                                style={{
                                  fontSize: 30,
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                }}>
                                {item.doctor.firstName[0]}
                                {item.doctor.lastName[0]}
                              </Text>
                            </View>
                          )}
                          <View style={{ marginLeft: 10 }}>
                            <Text
                              style={{
                                fontSize: 20,
                                color: 'black',
                                fontWeight: '600',
                              }}>
                              {item.doctor.basic.name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 13,
                                color: '#666666',
                              }}>
                              {item.doctor.specialty} | {}
                            </Text>

                            <View style={{ marginTop: 10, marginBottom: 8 }}>
                              <Text style={{ color: '#EA1A65' }}>
                                {item.bookedFor.slice(0, 10)}
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginVertical: 5,
                                }}>
                                <Text style={{ color: '#7B7A79' }}>
                                  Health Concern :
                                </Text>
                                <Text
                                  style={{
                                    marginLeft: 10,
                                    color: 'black',
                                    fontWeight: 'bold',
                                  }}></Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginTop: 15,
                                }}>
                                <Image
                                  source={require('../../assets/icons/clock.png')}
                                  style={{
                                    height: 20,
                                    width: 20,
                                    resizeMode: 'contain',
                                    tintColor: '#EA1A65',
                                  }}
                                />
                                <Text
                                  style={{
                                    marginLeft: 10,
                                    color: '#7B7A79',
                                  }}>
                                  starting in
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={require('../../assets/icons/rating.png')}
                              style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                              }}
                            />
                            <Text
                              style={{
                                marginLeft: 5,
                                fontFamily: 'Montserrat-Regular',
                              }}>
                              4.5
                            </Text>
                          </View>
                        </View>
                        <View style={{ marginVertical: 10 }}>
                          <ButtonCompo
                            title="Enter Waiting Room "
                            textStyle={{
                              fontSize: 14,
                              fontFamily: 'Montserrat-SemiBold',
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </Card>
                ))
              ) : (
                <View />
              )}
            </View>
            {userData.payment?.payment ? (
              <View />
            ) : (
              <Card style={{ marginTop: 20, borderRadius: 20 }}>
                <LinearGradient
                  colors={['#c0fafa', '#a7fafa']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    position: 'relative',
                  }}>
                  <Card.Cover
                    style={{ backgroundColor: 'transparent' }}
                    source={require('../../assets2/image/image12.png')}
                    resizeMode="contain"
                  />
                  <Image
                    source={require('../../assets/icons/Getplus.png')}
                    style={{
                      width: 100,
                      height: 40,
                      resizeMode: 'contain',
                      position: 'absolute',
                      left: '-6%',
                      top: '3%',
                    }}
                  />
                </LinearGradient>

                <Card.Content
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    paddingVertical: 10,
                  }}>
                  <Paragraph
                    style={{
                      fontSize: 20,
                      color: 'grey',
                      textAlign: 'center',
                      maxWidth: '70%',
                      marginVertical: 5,
                      fontFamily: 'Gilroy-Regular',
                    }}>
                    {`${Local(
                      'doctor.V2.doctor_home.signOut_card.Consult_with_experts',
                    )}`}
                  </Paragraph>
                  <TouchableOpacity
                    style={{ elevation: 12 }}
                    onPress={() => navigation.navigate('GetPlusNowScreen')}>
                    <LinearGradient
                      colors={['#3EAEAE', '#077EE9']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        borderRadius: 30,
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Bold',
                          fontSize: 16,
                          color: '#FFFFFF',
                        }}>
                        {Local('doctor.V2.doctor_home.signOut_card.button')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Card.Content>
              </Card>
            )}

            <View style={{ flex: 1 }}>
              {filterData.length > 0 ? (
                <View style={{ marginTop: 10, flex: 1 }}>
                  {search ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 18,
                          lineHeight: 20,
                          letterSpacing: 0.5,
                          marginVertical: 10,
                          fontFamily: 'Gilroy-SemiBold',
                          paddingLeft: 10,
                        }}>
                        {`${Local('doctor.V2.doctor_home.speciality')}`}
                      </Text>
                      <TouchableOpacity onPress={() => setSearch('')}>
                        <Text
                          style={{
                            color: '#3EAEAE',
                            fontSize: 18,
                          }}>
                          Show all
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 18,
                          lineHeight: 20,
                          letterSpacing: 0.5,
                          marginVertical: 10,
                          fontFamily: 'Gilroy-SemiBold',
                          paddingLeft: 10,
                        }}>
                        {`${Local('doctor.V2.doctor_home.top_doctors')}`}
                      </Text>
                      <TouchableOpacity onPress={() => setSearch('')}>
                        <Text
                          style={{
                            color: '#3EAEAE',
                            fontSize: 18,
                          }}>
                          Show all
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    scrollIndicatorInsets={false}>
                    {/* <TouchableOpacity
                      onPress={() => {
                        onRefresh();
                        setSelectedConsern('');
                      }}
                      style={{
                        marginVertical: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        width: 100,
                        // paddingVertical: 10,
                        borderRadius: 25,

                        marginRight: 10,
                        borderColor:
                          selectedConsern === '' ? '#EA1A65' : 'white',
                        borderWidth: 1,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 19,
                          color: '#333333',
                          maxWidth: '90%',
                          textAlign: 'center',
                          fontFamily: 'Gilroy-SemiBold',
                        }}>
                        {`${Local('doctor.V2.doctor_home.All')}`}
                      </Text>
                    </TouchableOpacity> */}
                    {filterData.map((item, i) => (
                      <TouchableOpacity
                        style={{
                          marginVertical: 20,
                          elevation: 12,
                          backgroundColor: 'white',
                          width: 180,
                          paddingVertical: 15,
                          borderRadius: 25,
                          paddingLeft: 15,
                          marginRight: 10,
                          maxHeight: 100,
                          borderColor:
                            selectedConsern === item.name ? '#EA1A65' : 'white',
                          borderWidth: 1,
                        }}
                        onPress={() => {
                          handleSearch(item.name);
                          setDoctorSpacialty(item.name);
                          setSelectedConsern(item.name);
                        }}
                        key={item._id}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <Image
                            source={require('../../assets/icons/generalphysician.png')}
                            style={{
                              height: 50,
                              width: 40,
                              resizeMode: 'contain',
                            }}
                          />
                          <View style={{ flex: 1 }}>
                            <Text
                              style={{
                                fontSize: 16,
                                lineHeight: 19,
                                color: '#333333',
                                width: '95%',
                                marginHorizontal: 5,
                                fontFamily: 'Gilroy-SemiBold',
                                // paddingHorizontal:5
                              }}>
                              {item.name}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              ) : (
                <></>
              )}
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    {
                      docData.length > 0 &&  <Text
                      style={{
                        color: 'black',
                        fontSize: 18,
                        lineHeight: 20,
                        letterSpacing: 0.5,
                        marginVertical: 10,
                        fontFamily: 'Gilroy-SemiBold',
                      }}>
                      {`${Local('doctor.V2.doctor_home.doctors_available_now')}`}
                    </Text>
                    }
                 
                  {/* <TouchableOpacity onPress={() => setSearch('')}>
                    <Text
                      style={{
                        color: '#3EAEAE',
                        fontSize: 18,
                      }}>
                      Show all
                    </Text>
                  </TouchableOpacity> */}
                </View>

                <FlatList
                  data={docData}
                  keyExtractor={(item) => item._id}
                  refreshControl={
                    <RefreshControl
                      refreshing={loading}
                      onRefresh={onRefresh}
                    />
                  }
                  showsHorizontalScrollIndicator={false}
                  refreshing={loading || localLoading}
                  onRefresh={onRefresh}
                  renderItem={({ item, index }) => {
                    const name = item.basic.name.split(' ');
                    let education = '';
                    if (item.education) {
                      item.education.map(
                        (e, i) => (education += `${e.degree}, `),
                      );
                      education.slice(0, education.length - 2);
                    }

                    const img = item.coverPhoto ? (
                      <Image
                        source={{
                          uri: `${Host}${item.coverPhoto
                            .replace('public', '')
                            .replace('\\\\', '/')}`,
                        }}
                        style={{ width: 75, height: 75, borderRadius: 100 }}
                      />
                    ) : (
                      <PicturelessAvatar
                        style={{
                          color: '#000',
                          backgroundColor: '#f9f9f9',
                          height: 70,
                          width: 70,
                          borderRadius: 35,
                        }}
                        textStyle={{ fontSize: 32 }}
                        text={`${name[0][0]}${name[1][0]}`}
                      />
                    );

                    return (
                      <View style={{ marginHorizontal: 10 }} key={index}>
                        {/* <Text>{`Dr. ${item.basic.name}`}</Text> */}
                        <BuildCustomCardComponent
                          {...item}
                          doctor={item}
                          loading={localLoading}
                          setLoading={setLocalLoading}
                          navigation={navigation}
                          drName={`Dr. ${item.basic.name}`}
                          education={education}
                          rating="4.5"
                          isLoggedin={isLoggedin}
                          image={img}
                          desc={item.languages ? item.languages.toString() : ''}
                          // state={[item]}
                          dispatch={dispatch}
                          doctorSpacialty={doctorSpacialty}
                          button={onPressDetails}
                        />
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 64 }} />
      </ScrollView>
      {/* {search ? (
        <View
          style={{
            paddingVertical: 20,
            backgroundColor: '#FFFFFF',
            marginBottom: 40,
          }}>
          {getUniqueListBy(conditionData, 'name').length > 6 ? (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  getUniqueListBy(conditionData, 'name').length === itemsToShow
                    ? setItemsToShow(6)
                    : setItemsToShow(
                        getUniqueListBy(conditionData, 'name').length,
                      );
                }}
                style={{
                  // borderRadius: 30,

                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Gilroy-SemiBold',
                    fontSize: 16,
                    color: '#EA1A65',
                  }}>
                  {getUniqueListBy(conditionData, 'name').length === itemsToShow
                    ? 'Show less'
                    : 'Show more'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
        </View>
      ) : (
        <></>
      )} */}
      {/* {isVisibleFilter && !search && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
            marginBottom: 40,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={require('../../../src/assets/icons/Filter_list.png')}
              style={{ height: 20, width: 20, resizeMode: 'contain' }}
            />
            <Text style={{ fontSize: 20, color: '#297281', marginLeft: 10 }}>
              SORT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={require('../../../src/assets/icons/sort.png')}
              style={{ height: 20, width: 20, resizeMode: 'contain' }}
            />
            <Text style={{ fontSize: 20, color: '#297281', marginLeft: 10 }}>
              FILTER
            </Text>
          </TouchableOpacity>
        </View>
      )} */}
    </>
  );
}

const BuildCardButtonComponent = ({ image, text }) => {
  return (
    <TouchableOpacity style={styles.button_shadow}>
      <Image
        source={image}
        style={{ width: 16, height: 16, tintColor: '#FF0000' }}
      />
      <Text
        style={{
          fontSize: 11,
          color: 'black',
          marginLeft: 4,
          fontFamily: 'Montserrat-Regular',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const Card1 = ({ item, doctorId, navigation, history }) => {
  const { patient } = item ? item : {};
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.AuthReducer);

  String.prototype.toTitleCase = function () {
    const splited = this.split(' ')
      .map((item) => {
        if (item[0]) return `${item[0].toUpperCase()}${item.slice(1)}`;
      })
      .join(' ');
    return splited;
  };

  const cancelAppointment = () => {
    const data = {
      id: item._id,
      patientId: patient._id,
      reason: 'nil reason',
      byDoctor: true,
      byPatient: false,
    };
    dispatch(
      RemoveAppointment(data, () => dispatch(GetAppointments(doctorId))),
    );
  };

  const approveAppointment = () => {
    const data = {
      _id: item._id,
      patient: patient._id,
      time: item.bookedFor,
      date: item.bookedFor,
      address: '',
      doctor: doctorId,
    };
    dispatch(
      ApproveAppointment(data, () => dispatch(GetAppointments(doctorId))),
    );
  };
  if (patient) {
    return (
      <View
        style={{
          backgroundColor: 'cyan',
          width: '100%',
          elevation: 2,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: '2%',
          marginBottom: '5%',
        }}>
        <View
          style={{
            paddingVertical: '4%',
            paddingHorizontal: '4%',
            flex: 1,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 8,
                backgroundColor: '#077EE9',
              }}></View>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: '2%',
              }}>
              {`${patient.firstName?.toTitleCase()} ${patient.lastName?.toTitleCase()}`}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              {' '}
              {item.reasonForVisit && '-'} {item.reasonForVisit}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: '5%',
              marginTop: '2%',
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                marginRight: '4%',
              }}>
              {moment(item.bookedFor).format("DD MMM 'YY")}
            </Text>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                color: '#077EE9',
              }}>
              |
            </Text>
            <Text
              style={{
                color: '#7B7A79',
                color: 'black',
                marginLeft: '4%',
              }}>
              {moment(item.bookedFor).format('hh:mm a')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: '2%',
            }}>
            {!item.approved && !history && (
              <TouchableOpacity onPress={approveAppointment}>
                <Text style={{ marginRight: '6%', color: '#077EE9' }}>
                  {Local('doctor.appointments.confirm')}
                </Text>
              </TouchableOpacity>
            )}
            {!history && (
              <TouchableOpacity onPress={cancelAppointment}>
                <Text style={{ color: '#EA1A65' }}>
                  {Local('doctor.appointments.cancel')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PatientDetails', { patient });
          }}>
          <MaterialIcon name={'chevron-right'} size={38} color={'#43A2A2'} />
        </TouchableOpacity>
      </View>
    );
  } else {
    return null;
  }
};

const BuildCustomCardComponent = (props) => {
  const {
    dispatch,
    doctor,
    doctorSpacialty,
    navigation,
    drName,
    desc,
    rating,
    image,
    experience,
    location,
    city,
    state,
    country,
    fee,
    education,
    specialty,
    specialties,
    _id,
    isLoggedin,
    setLoading,
    button,
  } = props;
  const [heartActive, setHeartActive] = React.useState(false);
  let drInfo = '';
  if (specialty || (specialties && specialties[0]))
    drInfo += specialty || specialties[0];
  // if (education.length > 0 || (specialties && specialties[0])) drInfo += ' | ';
  if (education.length > 0) drInfo += ' | ';

  if (education.length > 0) drInfo += education;
  // if (specialty !== doctorSpacialty)
  return (
    <View>
      <Card
        onPress={() => {
          let data = {
            ...doctor,
            appointments: [],
            desc,
            education: doctor.education ? doctor.education : [],
          };
          if (isLoggedin) navigation.navigate('DoctorProfileScreen', data);
          else navigation.openDrawer();
        }}
        style={{
          marginVertical: 10,
          paddingBottom: 10,
          borderRadius: 10,
          // width: 300,
          width: '100%',
        }}>
        <View
          style={{
            height: 180,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: 'grey',
          }}>
          {image}
          <Image
            style={{
              position: 'absolute',
              height: 40,
              width: 100,
              left: '-6.5%',
              top: 10,
              resizeMode: 'contain',
            }}
            source={require('../../assets/icons/Getplus.png')}
          />
          <View
            // onPress={() => setHeartActive(!heartActive)}
            style={{
              position: 'absolute',
              right: 20,
              top: 10,
              padding: 3,
              backgroundColor: 'whitesmoke',
              borderRadius: 20,
            }}>
            <Favorites setLoading={() => {}} doctor={doctor} />
            {/* <MCI
              name={heartActive ? 'heart' : 'heart-outline'}
              size={24}
              color={heartActive ? 'red' : 'grey'}
            /> */}
          </View>
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 10,
            // marginTop: '-2%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: doctor.is_superDoc
                ? 'space-between'
                : 'flex-start',
              paddingTop: 5,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  // fontWeight: 'bold',
                  fontFamily: 'Gilroy-SemiBold',
                }}>
                {drName}
              </Text>
              <Text
                style={{
                  color: 'rgba(0,0,0,0.4)',
                  fontFamily: 'Gilroy-Medium',
                }}>
                {/* {drInfo ? drInfo : 'NA'} */}
                {specialty || (specialties && specialties[0])
                  ? doctorSpacialty !== ''
                    ? doctorSpacialty
                    : specialty || (specialties && specialties[0])
                  : 'NA'}
                {specialty && education ? '|' : ''} {education}
              </Text>
            </View>

            {doctor.is_superDoc ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  backgroundColor: 'whitesmoke',
                  borderRadius: 5,
                }}>
                <Image
                  source={require('../../assets/icons/path.png')}
                  style={{ height: 15, width: 15, resizeMode: 'contain' }}
                />
                <Text style={{ fontFamily: 'Gilroy-Medium' }}>
                  {experience}{' '}
                  {`${Local('doctor.V2.doctor_home.Doc_Card.Years')}`}
                </Text>
              </View>
            ) : null}
            {/* <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-end',
                marginBottom: 10,
              }}></View> */}
          </View>

          {doctor.is_superDoc ? (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  let data = {
                    ...doctor,
                    specialty:
                      doctorSpacialty !== '' ? doctorSpacialty : specialty,
                    appointments: [],
                    desc,
                    education: doctor.education ? doctor.education : [],
                  };
                  if (isLoggedin)
                    navigation.navigate('DoctorProfileScreen', data);
                  else navigation.openDrawer();
                }}
                style={{
                  
                  borderWidth: 1,
                  borderColor: '#297281',
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  borderRadius: 30,
                  alignItems: 'center',
                  maxWidth: 200,
                }}>
                <Text
                  style={{
                    fontSize: 17,

                    fontFamily: 'Gilroy-SemiBold',
                    color: '#297281',
                  }}>
                  {`${Local(
                    'doctor.V2.doctor_home.Doc_Card.Button.book_appointment.Book',
                  )}`}
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: 'Gilroy-SemiBold',
                    color: '#297281',
                  }}>
                  {`${Local(
                    'doctor.V2.doctor_home.Doc_Card.Button.book_appointment.Appointment',
                  )}`}
                </Text>
              </TouchableOpacity>
              <View>
                <ButtonCompo
                  pressHandler={
                    () =>
                      isLoggedin
                        ? navigation.navigate('AppointmentDetails', {
                            doctor,
                          })
                        : navigation.openDrawer()

                    // dispatch(
                    //   CreateAppointment(
                    //     { doctor: doctor._id },
                    //     (err, response) => {
                    //       if (isLoggedin)
                    //         navigation.navigate('ConfirmAppointment', {
                    //           data: { ...response },
                    //           doctorData: doctor,
                    //         });
                    //       else navigation.openDrawer();
                    //     },
                    //   ),
                    // )
                  }
                  title={`${Local(
                    'doctor.V2.doctor_home.Doc_Card.Button.Consult',
                  )}`}
                  textStyle={{
                    fontSize: 15,
                    fontFamily: 'Gilroy-SemiBold',
                    lineHeight: 19,
                    marginVertical: 5,
                  }}
                />
              </View>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  backgroundColor: 'whitesmoke',
                  borderRadius: 5,
                }}>
                <Image
                  source={require('../../assets/icons/path.png')}
                  style={{ height: 15, width: 15, resizeMode: 'contain' }}
                />
                <Text style={{ fontFamily: 'Gilroy-Medium' }}>
                  {experience} Years
                </Text>
              </View>

              <ButtonCompo
                pressHandler={() => {
                  let data = {
                    ...doctor,
                    specialty:
                      doctorSpacialty !== '' ? doctorSpacialty : specialty,
                    appointments: [],
                    desc,
                    education: doctor.education ? doctor.education : [],
                  };
                  if (isLoggedin)
                    navigation.navigate('DoctorProfileScreen', data);
                  else navigation.openDrawer();
                }}
                title={`${Local(
                  'doctor.V2.doctor_home.Doc_Card.Button.Consult',
                )}`}
                textStyle={{
                  fontSize: 15,
                  fontFamily: 'Gilroy-SemiBold',
                  lineHeight: 19,
                }}
              />
            </View>
          )}
        </View>
      </Card>
    </View>
  );
};

const BuildDoctorAvailibility = ({ text }) => {
  return (
    <View
      style={{
        paddingHorizontal: 6,
        paddingVertical: 6,
        backgroundColor: '#EEEEEE',
        borderRadius: 4,
      }}>
      <Text
        style={{
          fontSize: 11,
          fontFamily: 'Montserrat-Regular',
          fontWeight: '800',
        }}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    flex: 1,
  },
  shadow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: windowWidth - 32,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  button_shadow: {
    flexDirection: 'row',
    // shadowColor: "#999999",
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // shadowOffset: {
    //     height: 2,
    //     width: 0
    // },
    // elevation: 4,
    borderRadius: 4,
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 6,
    paddingVertical: 5,
    alignItems: 'center',
  },
  button_bookAppointment: {
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    elevation: 12,
    borderRadius: 30,
    backgroundColor: '#3893e4',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
