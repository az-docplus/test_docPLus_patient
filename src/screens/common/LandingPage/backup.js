import React, {useState, useRef, useEffect} from 'react';
import NewToggleButton from '../../../components/molecules/ToggleButton/NewToggleButton';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import BasicCard from '../../../components/atoms/BasicCard/BasicCard';
import Section from '../../../components/molecules/Section/Section';
import AvailDoctorContainerV2 from '../../../components/molecules/AvailDoctorContainer/AvailDoctorContainerV2';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import BlurSpinner from '../../../components/molecules/Modal/BlurLoadingOverlay';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  TouchableHighlight,
  Touchable,
  BackHandler,
} from 'react-native';

import {
  fetchDoctorLite,
  fetchMoreDoctorLite,
  searchDoctors,
  fetchSuperDoc,
  GetAllDoctors,
} from '../../../reduxV2/action/DoctorToPatientAction';

import {ListingWithThumbnailLoader} from '../../../components/atoms/Loader/Loader';
import {
  NEW_PRIMARY_COLOR,
  NEW_HEADER_TEXT,
  SEARCH_PLACEHOLDER_COLOR,
  PRIMARY_BACKGROUND,
  SECONDARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import {
  GetReviews,
  AddReviews,
  AddLastRouteMemory,
  saveNewUser,
} from '../../../reduxV2/action/AuthAction';

import Toast from 'react-native-root-toast';
import {getSpecialty} from '../../../reduxV2/action/DoctorAction';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import {BottomSheet, ListItem} from 'react-native-elements';
//    import { BottomSheet } from 'react-native-btr';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';
import BlurModal from '../../../components/molecules/Modal/BlurLoadingOverlay';
import axios from 'axios';
import {Host} from '../../../utils/connection';

//TODO import only necessary component in all screens which are first screen of any navigator
//TODO call APIs only if AppState is focused

function LandingPage({navigation}) {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
  const PopupTranslateY = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();
  const {
    doctors,
    loading,
    moreDoctorLoading,
    searchDoctorsLoading,
    searchedDoctors,
    superDocsLoading,
    superDocs,
  } = useSelector((state) => state.DoctorToPatientReducer);

  const {specialtyLoading, specialty} = useSelector(
    (state) => state.DoctorReducer,
  );

  const {lastRouteMemory} = useSelector((state) => state.AuthReducer);

  const {patient, isPatientAccountReducerLoading} = useSelector(
    (state) => state.PatientReducer,
  );

  const [Feebacks, setFeebacks] = useState([]);

  const [state, setState] = useState(doctors);
  const [searchKey, setSearchKey] = useState('');
  const [activeId, setActiveId] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [backCount, setBackCount] = useState(true);
  const [page, setPage] = useState(1);
  const [toggle, setToggle] = useState(0);
  const [consultLoading, setConsultLoading] = useState(false);
  const [disEnd, setDisEnd] = useState(0);
  const [trigger, setTrigger] = useState(true);
  const [AllDoctors, setAllDoctors] = useState([]);
  const [isSpecialityLoading, setSpecialityLoading] = useState(false);

  useEffect(() => {
    setState(doctors);
  }, [doctors]);

  useEffect(() => {
    const params = {
      match: JSON.stringify({}),
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    //dispatch(searchingDoctors());
    axios
      .post(`${Host}/doctors/searchlite`, params, config)
      .then((result) => {
        if (result.status) {
          setAllDoctors(result.data.data);
          //dispatch(setSearchedDoctors(result.data.data));
        }
      })
      .catch((err) => {
        console.log(res.data.message);
        //dispatch(haveingError(err));
      });
  }, []);

  /* useEffect(() => {
    setConsultLoading(false)
  }) */

  useEffect(() => {
    lastRouteMemory &&
      lastRouteMemory.routeName != '' &&
      navigation.navigate(lastRouteMemory.routeName, {
        data: lastRouteMemory.params,
      });
  }, []);

  const _getAllDoctorSuccessCallback = (data) => {
    console.log(data, 'cccccccccccccccccccccccccccc');
    setAllDoctors(data);
  };
  const _getAllDoctorErrorCallback = () => {};
  useEffect(() => {
    dispatch(fetchDoctorLite('', 0, false));
    dispatch(
      GetAllDoctors(_getAllDoctorSuccessCallback, _getAllDoctorErrorCallback),
    );
    !specialtyLoading && dispatch(getSpecialty());
  }, []);

  const tempSpecialityIcons = [
    require('../../../assets/icons/lungs.png'),
    require('../../../assets/icons/heart.png'),
    require('../../../assets/icons/neuro.png'),
    require('../../../assets/icons/heart.png'),
    require('../../../assets/icons/neuro.png'),
    require('../../../assets/icons/heart.png'),
  ];

  const headerPos = useRef(new Animated.Value(0)).current;
  const onPress = (id) => {
    setActiveId(id);
    __id = id;
    Animated.sequence([
      Animated.timing(PopupTranslateY, {
        toValue: showPopup ? 0 : 1,
        // easing: Easing.bezier(0.52, 0.5, 0.08, 0.78),
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
    setShowPopup(!showPopup);
  };

  const _fetchMoreDoctorLite = () => {
    let val = page + 1;
    dispatch(fetchMoreDoctorLite('', page, false));
    setPage(val);
  };

  const onEndEditing = (search) => {
    dispatch(searchDoctors(search, 1));
    setSearchKey(search);
  };

  const onToggle = () => {
    setToggle(toggle === 0 ? 1 : 0);
    if (toggle === 0) {
      dispatch(fetchSuperDoc(0));
    }
  };

  let yOffset = 0;
  headerPos.addListener((value) => {
    yOffset = value;
  });

  const scrollAnimation = async (e) => {
    var vel = e.nativeEvent.velocity.y;
    console.log(e);
    if (vel < 0) {
      console.log('in');
      Animated.timing(headerPos, {
        toValue: 300,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(headerPos, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  const onSearchDoctorRefresh = () => {
    dispatch(searchDoctors(searchKey, 1));
  };
  const onDoctorsRefresh = () => {
    dispatch(fetchDoctorLite('', 0, false));
  };
  const onSuperDocRefresh = () => {
    dispatch(fetchSuperDoc(0));
  };

  const headerViewStyle = headerPos.interpolate({
    inputRange: [0, 250],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerInterpolated = headerPos.interpolate({
    inputRange: [300, 350],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const transaleInterpolate = headerPos.interpolate({
    inputRange: [200, 350],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });
  const handleSortByName = () => {
    const sortedDoctors = doctors.sort((a, b) =>
      a.basic.name.localeCompare(b.basic.name),
    );
    console.log(sortedDoctors);
    setState(sortedDoctors);
    setIsVisible(false);
  };
  const sortByGender = (sex) => {
    const filteredDocs = doctors.filter((doc, id) => {
      if (doc.gender && doc.gender.toLowerCase() === sex.toLowerCase())
        return doc;
    });
    setState(filteredDocs);
    setIsVisible(false);
  };

  const ResetDoctors = () => {
    setState(doctors);
    setIsVisible(false);
  };

  const [allDoc, setAllDoc] = useState([]);

  const sortByFavorite = () => {
    const params = {
      match: JSON.stringify({}),
      name: '',
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    axios
      .post(`${Host}/doctors/searchlite`, params, config)
      .then((result) => {
        if (result.status) {
          setAllDoc(result.data.data);
          console.log(result.data.data);
          setSpecialityLoading(false);
        }
      })
      .catch((err) => {
        console.log(err, 'Having error...........................');
        setSpecialityLoading(false);
      });

    console.log(userData.favourites, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    const favourites = patient?.favourites?.map((f, i) => f._id);
    const filteredDocs = allDoc.filter((doc, id) => {
      if (favourites?.includes(doc._id)) return doc;
    });
    setState(filteredDocs);
    setIsVisible(false);
  };

  const [isVisible, setIsVisible] = useState(false);
  const list = [
    {
      title: `${Local('patient.landing_page.all_doctors')}`,
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: ResetDoctors,
    },
    {
      title: `${Local('patient.landing_page.female_doctors')}`,
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: () => sortByGender('Female'),
    },
    {
      title: `${Local('patient.landing_page.male_doctors')}`,
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: () => sortByGender('Male'),
    },
    {
      title: `${Local('patient.landing_page.favorites')}`,
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: () => sortByFavorite(),
    },
    {
      title: `${Local('patient.landing_page.sort_by_name')}`,
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: handleSortByName,
    },
    {
      title: `${Local('patient.landing_page.cancel')}`,
      containerStyle: {backgroundColor: SECONDARY_BACKGROUND},
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: () => setIsVisible(false),
    },
  ];

  const handleSpecialtyFilter = (item) => {
    setSpecialityLoading(true);
    console.log(item, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    let search = item.toLowerCase();
    // let search = "general" ? item === "Primary Care Doctor (PCP)" : item.toLowerCase()

    /* const filteredDocs = AllDoctors.filter((doc, id) => {
      if (doc.specialty.toLowerCase().includes(item.toLowerCase())) return doc;
    });
    setState(filteredDocs); */

    const params = {
      match: JSON.stringify({
        specialty: search,
      }),
      // pageNo: page.toString(),
      name: search,
      // size: '5',
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    // dispatch(searchingDoctors());
    axios
      .post(`${Host}/doctors/searchlite`, params, config)
      .then((result) => {
        if (result.status) {
          setState(result.data.data);
          console.log(result.data.data);
          setSpecialityLoading(false);
          // dispatch(setSearchedDoctors(result.data.data));
          // dispatch(startDoctorLoading)
        }
      })
      .catch((err) => {
        console.log(err, 'Having error...........................');
        setSpecialityLoading(false);
        // dispatch(haveingError(err));
      });
  };

  // useEffect(() => {
  //   const backAction = () => {
  //     setIsVisible(false)
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  const handleCustomDates = () => {};

  const [customDates, setcustomDates] = useState({
    startDate: '',
    endDate: '',
  });

  return (
    <>
      <StatusBar
        animated
        backgroundColor={Colors.secondary_background[theme]}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
      />
      {consultLoading && (
        <BlurModal visible={consultLoading}>
          <ActivityIndicator color="#009387" size="large" />
        </BlurModal>
      )}
      {!consultLoading && (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.primary_background[theme],
            // paddingBottom: 50
          }}>
          <BottomSheet
            /* modalProps={{
            touc: () => {
              setIsVisible(false);
            },
          }} */
            onBackButtonPress={() => setIsVisible(false)}
            // isVisible={isVisible}
            visible={isVisible}
            onBackdropPress={() => setIsVisible(false)}

            /* containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}} */
          >
            {/* <ListItem key={10} containerStyle={{ paddingBottom: 0 }} onPress={handleCustomDates}>
            <ListItem.Content style={{ padding: 0 }}>

              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: NEW_PRIMARY_BACKGROUND,
                    borderBottomWidth: 1.5,
                    marginBottom: 15,
                  }}>
                  <DatePicker
                    style={[
                      { borderBottomWidth: 0, marginBottom: 0 },
                    ]}
                    date={customDates.startDate}
                    mode="date"
                    placeholder="Select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      // dateInput:{borderWidth: 0},
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36,
                        borderWidth: 0
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(text) => { setcustomDates({ ...customDates, startDate: text }) }}
                  />
                </View>
                <Text style={{
                  marginHorizontal: 12,
                  fontSize: 20,
                  marginTop: 'auto',
                  marginBottom: 'auto', fontFamily: 'Montserrat-Medium'
                }}>to</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: NEW_PRIMARY_BACKGROUND,
                    borderBottomWidth: 1.5,
                    marginBottom: 15,
                  }}>
                  <DatePicker
                    style={[
                      { borderBottomWidth: 0, marginBottom: 0 },
                    ]}
                    date={customDates.endDate}
                    mode="date"
                    placeholder="Select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      // dateInput:{borderWidth: 0},
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36,
                        borderWidth: 0
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(text) => { setcustomDates({ ...customDates, endDate: text }) }}
                  />
                </View>

              </View>
            </ListItem.Content>
          </ListItem> */}
            {list.map((l, i) => (
              <ListItem
                key={i}
                containerStyle={[
                  l.containerStyle,
                  {backgroundColor: Colors.bottom_sheet_bg[theme]},
                ]}
                onPress={l.onPress}>
                <ListItem.Content>
                  <ListItem.Title
                    style={[
                      l.titleStyle,
                      {color: Colors.primary_text_color[theme]},
                    ]}>
                    {l.title}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </BottomSheet>
          <Toast
            visible={toastVisible}
            position={screenHeight * 0.9}
            shadow={true}
            animation={true}
            hideOnPress={true}>
            Press again to Exit
          </Toast>
          <TopNavBar
            onLeftButtonPress={() => {}}
            // onRightButtonPress={() => {}}
            LeftComp={<View></View>}
            navigation={navigation}
            style={{
              Container: {
                height: '5%',
                paddingVertical: '2%',

                // marginTop: '4%',
              },
            }}
            headerText={`${Local('patient.landing_page.search_for_doctor')}`}
          />
          {/* {isPatientAccountReducerLoading && (
          <BlurSpinner visible={isPatientAccountReducerLoading}>
            <ActivityIndicator color={NEW_PRIMARY_BACKGROUND} size="large" />
          </BlurSpinner>
        )} */}
          <View
            style={{
              // paddingTop: '5%',
              backgroundColor: Colors.primary_background[theme],
            }}>
            <View
              style={{
                height: '20%',
                paddingHorizontal: '6%',
                justifyContent: 'center',
                backgroundColor: Colors.secondary_background[theme],
              }}>
              <SearchBarSolid
                withIcon
                handleBottomList={() => setIsVisible(true)}
                placeholderTextColor={Colors.search_placeholder_text[theme]}
                icon={
                  <Image
                    source={require('../../../assets/icons/configure.png')}
                    style={{height: 24, width: 24}}
                  />
                }
                searchIcon={
                  <Image
                    source={require('../../../assets/icons/search.png')}
                    style={{height: 20, width: 18}}
                    color={Colors.search_placeholder_text[theme]}
                  />
                }
                onEndEditing={onEndEditing}
                style={{
                  // backgroundColor: SECONDARY_BACKGROUND,
                  backgroundColor: Colors.search_background[theme],
                  borderRadius: 10,
                  elevation: 2,
                }}
              />
            </View>
            <View
              style={{
                height: 'auto',
              }}>
              <AnimatedScrollView
                horizontal
                style={
                  {
                    // zIndex: 99999,
                    // paddingBottom: '5%',
                  }
                }
                contentContainerStyle={{
                  paddingTop: '7%',
                  paddingBottom: '2%',
                  paddingHorizontal: '6%',
                }}
                showsHorizontalScrollIndicator={false}>
                {specialty.map((u, i) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => handleSpecialtyFilter(u)}>
                      <BasicCard
                        key={i}
                        style={{
                          CardContainer: {
                            elevation: 6,
                            justifyContent: 'center',
                            padding: '1%',
                            height: 120,
                            width: 120,
                            borderRadius: 13,
                            backgroundColor: Colors.revenue_background[theme],
                          },
                        }}>
                        <Image
                          source={tempSpecialityIcons[i]}
                          resizeMode="contain"
                          style={{margin: '1%', height: 40, width: 40}}
                        />

                        <View>
                          <Text
                            minimumFontScale={0.8}
                            ellipsizeMode={'tail'}
                            lineBreakMode={'tail'}
                            textBreakStrategy={'balanced'}
                            numberOfLines={2}
                            style={{
                              fontSize: 13,
                              color: NEW_PRIMARY_BACKGROUND,
                              fontFamily: 'Montserrat-Medium',
                              marginTop: '5%',
                              textAlign: 'center',
                            }}>
                            {u.length > 30 ? u.slice(0, 30).concat('...') : u}
                          </Text>
                        </View>
                      </BasicCard>
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setState(doctors)}>
                  <BasicCard
                    style={{
                      CardContainer: {
                        elevation: 6,
                        justifyContent: 'center',
                        padding: '1%',
                        height: 120,
                        width: 120,
                        borderRadius: 13,
                        backgroundColor: Colors.revenue_background[theme],
                      },
                    }}>
                    <Image
                      source={tempSpecialityIcons[1]}
                      resizeMode="contain"
                      style={{margin: '1%', height: 40, width: 40}}
                    />
                    {/* <MaterialIcons
                    name="person-outline"
                    style={{ fontSize: 40, color: NEW_PRIMARY_BACKGROUND }}
                  style={{ margin: '1%', height: 40, width: 40, }} 
                  /> */}
                    {/* <Image
                    source={tempSpecialityIcons[i]}
                    resizeMode="contain"
                    style={{ margin: '1%', height: 40, width: 40 }}
                  /> */}
                    <Text
                      adjustsFontSizeToFit
                      minimumFontScale={0.8}
                      ellipsizeMode={'tail'}
                      lineBreakMode={'tail'}
                      textBreakStrategy={'balanced'}
                      numberOfLines={1}
                      style={{
                        fontSize: 13,
                        color: NEW_PRIMARY_BACKGROUND,
                        fontFamily: 'Montserrat-Medium',
                        marginTop: '5%',
                      }}>
                      {`${Local('patient.landing_page.all_doctors')}`}
                    </Text>
                  </BasicCard>
                </TouchableOpacity>
              </AnimatedScrollView>
              <View
                style={{
                  marginHorizontal: '7%',
                  // height: "3%",
                  marginTop: '3%',
                  marginBottom: 0,
                  // transform: [
                  //   {
                  //     translateX: headerPos.interpolate({
                  //       inputRange: [0, 300],
                  //       outputRange: [0, 3 * screenWidth],
                  //       extrapolate: 'clamp',
                  //     }),
                  //   },
                  // ],
                }}>
                <NewToggleButton
                  toggle={toggle}
                  onToggle={onToggle}
                  text0={`${Local('patient.landing_page.now')}`}
                  text1={`${Local('patient.landing_page.schedule')}`}
                  style={{width: 200}}
                  textStyle={{
                    fontSize: 16,
                    color: NEW_PRIMARY_COLOR,
                    // fontWeight: 'bold',
                    textAlign: 'center',
                    fontFamily: 'Montserrat-SemiBold',
                  }}
                />
              </View>
            </View>
          </View>

          {isSpecialityLoading ||
          loading ||
          searchDoctorsLoading ||
          superDocsLoading ? (
            <ListingWithThumbnailLoader style={{marginTop: 20}} />
          ) : searchKey !== '' ? (
            <FlatList
              ListFooterComponent={
                <View
                  style={{
                    marginBottom: '15%',
                  }}>
                  {/* {moreDoctorLoading && <ActivityIndicator />}
              {state?.length > 7 && (
                <TouchableOpacity onPress={_fetchMoreDoctorLite}>
                  <Text
                    style={{
                      color: NEW_PRIMARY_BACKGROUND,
                      fontFamily: 'Montserrat-Medium',
                      fontSize: 18,
                      marginLeft: 'auto',
                      marginBottom: '92%',
                      paddingHorizontal: '6%',
                    }}>
                    {Local("patient.landing_page.more")}
                  </Text>
                </TouchableOpacity>
              )} */}
                </View>
              }
              keyExtractor={(item) => item._id}
              data={searchedDoctors}
              refreshControl={
                <RefreshControl
                  refreshing={searchDoctorsLoading}
                  onRefresh={onSearchDoctorRefresh}
                />
              }
              // nestedScrollEnabled
              ListEmptyComponent={
                <View
                  style={{
                    height: 260,
                    width: '70%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    paddingBottom: '30%',
                    alignItems: 'center',
                    marginTop: '12%',
                  }}>
                  <LottieView
                    style={{height: '100%', width: '100%'}}
                    source={require('../../../assets/anim_svg/empty_bottle.json')}
                    autoPlay
                    loop
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Medium',
                      color: Colors.primary_text_color[theme],
                      fontSize: 20,
                    }}>
                    {Local('patient.landing_page.no_doctor_found')}
                  </Text>
                </View>
              }
              style={{marginTop: '-8%'}}
              renderItem={({item, index}) => (
                <AvailDoctorContainerV2
                  setConsultLoading={setConsultLoading}
                  toggle={toggle}
                  data={item}
                  navigation={navigation}
                  onPress={() => onPress(item._id)}
                  id={item._id}
                  index={index}
                  name={item.basic.name}
                  schedule={item.output}
                />
              )}
            />
          ) : !toggle ? (
            // <View
            //   style={{
            //     width: '100%',
            //   }}>
            <FlatList
              ListFooterComponent={
                <View>
                  {moreDoctorLoading && <ActivityIndicator />}
                  {state?.length > 7 && (
                    <TouchableOpacity onPress={_fetchMoreDoctorLite}>
                      <Text
                        style={{
                          color: NEW_PRIMARY_BACKGROUND,
                          fontFamily: 'Montserrat-Medium',
                          fontSize: 18,
                          marginLeft: 'auto',
                          marginBottom: '15%',
                          paddingHorizontal: '6%',
                        }}>
                        {Local('patient.landing_page.more')}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              }
              keyExtractor={(item) => String(item._id)}
              ListEmptyComponent={
                <View
                  style={{
                    height: 260,
                    width: '70%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    paddingBottom: '30%',
                    alignItems: 'center',
                    marginTop: '12%',
                  }}>
                  <LottieView
                    style={{height: '100%', width: '100%'}}
                    source={require('../../../assets/anim_svg/empty_bottle.json')}
                    autoPlay
                    loop
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Medium',
                      color: Colors.primary_text_color[theme],
                      fontSize: 20,
                    }}>
                    {Local('patient.landing_page.no_doctor_found')}
                  </Text>
                </View>
              }
              // extraData={doctors}
              data={state}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={onDoctorsRefresh}
                />
              }
              style={{marginTop: '-8%'}}
              renderItem={({item, index}) => {
                return (
                  <AvailDoctorContainerV2
                    setConsultLoading={setConsultLoading}
                    toggle={toggle}
                    data={item}
                    navigation={navigation}
                    onPress={() => onPress(item._id)}
                    id={item._id}
                    index={index}
                    name={item.basic.name}
                    schedule={item.output}
                  />
                );
              }}
            />
          ) : (
            // </View>
            <FlatList
              ListFooterComponent={
                <View
                  style={{
                    marginBottom: '15%',
                  }}>
                  {/* {moreDoctorLoading && <ActivityIndicator />}
              {state?.length > 7 && (
                <TouchableOpacity onPress={_fetchMoreDoctorLite}>
                  <Text
                    style={{
                      color: NEW_PRIMARY_BACKGROUND,
                      fontFamily: 'Montserrat-Medium',
                      fontSize: 18,
                      marginLeft: 'auto',
                      marginBottom: '92%',
                      paddingHorizontal: '6%',
                    }}>
                    {Local("patient.landing_page.more")}
                  </Text>
                </TouchableOpacity>
              )} */}
                </View>
              }
              initialNumToRender={5}
              ListEmptyComponent={
                <View
                  style={{
                    height: 260,
                    width: '70%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    paddingBottom: '30%',
                    alignItems: 'center',
                    marginTop: '12%',
                  }}>
                  <LottieView
                    style={{height: '100%', width: '100%'}}
                    source={require('../../../assets/anim_svg/empty_bottle.json')}
                    autoPlay
                    loop
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Medium',
                      color: Colors.primary_text_color[theme],
                      fontSize: 20,
                    }}>
                    {Local('patient.landing_page.no_doctor_found')}
                  </Text>
                </View>
              }
              keyExtractor={(item) => item._id}
              data={superDocs}
              refreshControl={
                <RefreshControl
                  refreshing={superDocsLoading}
                  onRefresh={onSuperDocRefresh}
                />
              }
              style={{marginTop: '-8%'}}
              renderItem={({item}) => (
                <AvailDoctorContainerV2
                  setConsultLoading={setConsultLoading}
                  toggle={toggle}
                  data={item}
                  navigation={navigation}
                  onPress={() => onPress(item._id)}
                  id={item._id}
                  name={item.basic.name}
                  schedule={item.output}
                />
              )}
            />
          )}
        </View>
      )}
    </>
  );
}

export default LandingPage;
