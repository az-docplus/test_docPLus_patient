import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useReducer,
} from 'react';
import moment from 'moment';
import {
  View,
  Text,
  UIManager,
  Platform,
  StyleSheet,
  Image,
  RefreshControl,
  BackHandler,
  SectionList,
  Dimensions,
  Animated,
  LayoutAnimation,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {
  NEW_PRIMARY_COLOR,
  INPUT_PLACEHOLDER,
  NEW_HEADER_TEXT,
  PRIMARY_BACKGROUND,
  // GREY_BACKGROUND,
} from '../../../styles/colors';
import {
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native-gesture-handler';
import AppointmentHistoryItem from '../../../components/molecules/Appointments/AppointmentHistoryItem';
import AppointmentOngoingItem from '../../../components/molecules/Appointments/AppointmentOngoingItem';
import AppointmentUpcomingItem from '../../../components/molecules/Appointments/AppointmentUpcomingItem';

import { GetAppointments } from '../../../reduxV2/action/PatientAction';
import { ListingWithThumbnailLoader } from '../../../components/atoms/Loader/Loader';
import LottieView from 'lottie-react-native';
import {
  // SUCCESS,
  NEW_PRIMARY_BACKGROUND,
  // SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import {
  // BottomSheet,
  ListItem,
} from 'react-native-elements';
import { BottomSheet } from 'react-native-btr';
import DatePicker from 'react-native-datepicker';
import { Colors } from '../../../styles/colorsV2';
import { Local } from '../../../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const customDateInitialState = {
  startDate: '',
  endDate: '',
};

function customDateReducer(state, action) {
  switch (action.type) {
    case 'setStartDate':
      return {
        ...state,
        startDate: action.payload,
      };
    case 'setEndDate':
      return {
        ...state,
        endDate: action.payload,
      };
    case 'setCustomDate':
      return {
        ...state,
        startDate: '',
        endDate: '',
      };
    default:
      return state;
  }
}

const upcomingAndOngoingAppointmentInitState = [];
function upcomingAndOngoingListReducer(state, action) {
  switch (action.type) {
    case 'updateOngoing':
      let newOngoingState = state.filter(
        (i) => i.title != 'Ongoing Appointments',
      );
      newOngoingState.unshift({
        title: 'Ongoing Appointments',
        data: action.payload,
      });
      return newOngoingState;
    case 'removeOngoing':
      let _newOngoingState = state.filter(
        (i) => i.title != 'Ongoing Appointments',
      );
      return _newOngoingState;
    case 'updateUpcoming':
      let newUpcomingState = state.filter(
        (i) => i.title != 'Upcoming Appointments',
      );
      newUpcomingState.push({
        title: 'Upcoming Appointments',
        data: action.payload,
      });
      return newUpcomingState;
    case 'removeUpcoming':
      let _newUpcomingState = state.filter(
        (i) => i.title != 'Upcoming Appointments',
      );
      return _newUpcomingState;
    // case 'updateBoth':
    //   let bothState = state;
    //   bothState = [
    //     {
    //       title: 'Ongoing Appointments',
    //       data: action.payload.ongoing,
    //     },
    //     {
    //       title: 'Upcoming Appointments',
    //       data: action.payload.upcoming,
    //     },
    //   ];
    //   return bothState;
    default:
      return state;
  }
}

function Appointments({ navigation, route }) {
  const [scrollval, setscrollval] = useState(0);
  const [scrollval2, setscrollval2] = useState(0);
  const [expanded, setexpanded] = useState(true);
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setexpanded(expanded == true ? false : true);
  };
  const scrollIndicator = useRef(new Animated.Value(0)).current;
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * visibleScrollBarHeight) /
        completeScrollBarHeight
      : visibleScrollBarHeight;
  const Customscrollbar = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20 }}>
        {/* ScrollView component here */}
        <View
          style={{
            height: '100%',
            width: 6,
            backgroundColor: '#52057b',
            borderRadius: 8,
            zIndex: 1,
            position: 'absolute',
          }}>
          <View
            style={{
              width: 6,
              borderRadius: 8,
              backgroundColor: '#bc6ff1',
              height: '100%',
            }}
          />
          {/* <Text>hh</Text> */}
        </View>
      </View>
    );
  };
  const reset = route?.params?.reset ?? true;
  // const reset = false

  useEffect(() => {
    // console.log("historyAppointmentList : ", historyAppointmentList)
  }, []);
  useEffect(() => {
    const backAction = async () => {
      // navigation.goBack()
      if (patient.doctorToPatient) {
        // console.log('%%%%%%%%%%%');
        const dataB = await AsyncStorage.getItem('dataB');
        const { patient, appointment } = JSON.parse(dataB);
        navigation.navigate('PatientDetails', {
          patient,
          appointment,
        });
        // navigation.goBack();
      } else {
        navigation.navigate('PatientLandingScreen');
      }
      // setState(doctors);
      // setActive("allDoctors")

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  // useEffect(() => {
  //   console.log(reset, "RESET:::::::::::::::")
  //   if(reset) {
  //     navigation.jumpTo("PatientLandingScreen")
  //   }
  // }, [])
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const {
    gettingAppointments,
    appointments,
    // errorGettingAppointments,
    patient,
  } = useSelector((state) => state.PatientReducer);
  const [customDates, setcustomDates] = useReducer(
    customDateReducer,
    customDateInitialState,
  );
  const dispatch = useDispatch();
  const [tablocation, setTabLocation] = useState(0);
  const [upcomingAppointmentList, setUpcomingAppointmentList] = useState([]);
  const [ongoingAppointmentList, setOngoingAppointmentList] = useState([]);
  const [
    sectionForUpcomingAndOngoingAppointment,
    setSectionForUpcomingAndOngoingAppointment,
  ] = useReducer(
    upcomingAndOngoingListReducer,
    upcomingAndOngoingAppointmentInitState,
  );
  const [historyAppointmentList, setHistoryAppointmentList] = useState([]);
  const [extractingAppointmentList, setExtractingAppointmentList] =
    useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const listLocalState = useRef({
    upcomming: [],
    ongoing: [],
    history: [],
  });
  const handleBackButtonClick = useCallback(async () => {
    // navigation.goBack();
    if (patient.doctorToPatient) {
      // console.log('%%%%%%%%%%%');
      const dataB = await AsyncStorage.getItem('dataB');
      const { patient, appointment } = JSON.parse(dataB);
      navigation.navigate('PatientDetails', {
        patient,
        appointment,
      });
      // navigation.goBack();
    } else {
      navigation.navigate('PatientLandingScreen');
    }
  }, [navigation]);
  const switchToTab0 = useCallback(() => setTabLocation(0), []);
  const switchToTab1 = useCallback(() => setTabLocation(1), []);
  const showBottomSheet = useCallback(() => setIsBottomSheetVisible(true), []);
  const hideBottomSheet = useCallback(() => setIsBottomSheetVisible(false), []);

  const onPressResetBottomList = useCallback(() => {
    hideBottomSheet();
    setcustomDates({
      type: 'setCustomDate',
    });
    const { upcomming, ongoing, history } = listLocalState.current;
    console.log('upcomming : ', upcomming);
    setOngoingAppointmentList(ongoing);
    setUpcomingAppointmentList(upcomming);
    setHistoryAppointmentList(history);
  }, [hideBottomSheet]);
  const list = useMemo(() => {
    return [
      {
        title: 'Reset',
        titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
        onPress: onPressResetBottomList,
      },
      {
        title: 'Cancel',
        containerStyle: { backgroundColor: SECONDARY_BACKGROUND },
        titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
        onPress: hideBottomSheet,
      },
    ];
  }, [hideBottomSheet, onPressResetBottomList]);

  // useEffect(() => {
  //   const backAction = () => {
  //     navigation.goBack();
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);
  const fetchAppointments = useCallback(() => {
    if (patient && !patient.doctorToPatient) {
      dispatch(GetAppointments(patient._id));
    }
  }, [dispatch, patient]);
  useEffect(() => {
    setExtractingAppointmentList(true);
    fetchAppointments();
  }, [fetchAppointments]);

  useEffect(() => {
    const upcomming = [];
    const ongoing = [];
    const history = [];
    if (appointments.length !== 0) {
      appointments.forEach((item) => {
        const bookedForTime = new Date(item.bookedFor).getTime();
        const plusOneHour = new Date().setHours(new Date().getHours() + 1);
        const todayTime = new Date().getTime();
        // console.log(item?.cancelledBy, "%%%%%%%%%%%%%%%%%")
        if (bookedForTime > plusOneHour) {
          // upcomming.push(item);
          ongoing.push(item);
        } else if (bookedForTime > todayTime && bookedForTime < plusOneHour) {
          ongoing.push(item);
        } else if (bookedForTime < todayTime) {
          history.push(item);
          // ongoing.push(item);
          // upcomming.push(item);
        }
      });
      ongoing.sort(
        (b, a) =>
          new Date(a.bookedFor).getTime() - new Date(b.bookedFor).getTime(),
      );
      upcomming.sort(
        (b, a) =>
          new Date(b.bookedFor).getTime() - new Date(a.bookedFor).getTime(),
      );
      history.sort(
        (b, a) =>
          new Date(a.bookedFor).getTime() - new Date(b.bookedFor).getTime(),
      );
    }
    setOngoingAppointmentList(ongoing);
    setUpcomingAppointmentList(upcomming);
    setHistoryAppointmentList(history);
    setExtractingAppointmentList(false);
    listLocalState.current.history = history;
    listLocalState.current.ongoing = ongoing;
    listLocalState.current.upcomming = upcomming;
  }, [appointments]);

  useEffect(() => {
    if (upcomingAppointmentList.length > 0) {
      setSectionForUpcomingAndOngoingAppointment({
        type: 'updateUpcoming',
        payload: upcomingAppointmentList,
      });
    }
    if (upcomingAppointmentList.length == 0) {
      setSectionForUpcomingAndOngoingAppointment({
        type: 'removeUpcoming',
      });
    }
  }, [upcomingAppointmentList]);
  useEffect(() => {
    if (ongoingAppointmentList.length > 0) {
      setSectionForUpcomingAndOngoingAppointment({
        type: 'updateOngoing',
        payload: ongoingAppointmentList,
      });
    }

    if (ongoingAppointmentList.length == 0) {
      setSectionForUpcomingAndOngoingAppointment({
        type: 'removeOngoing',
      });
    }
  }, [ongoingAppointmentList]);
  const onEndEditing = useCallback(
    (search) => {
      setExtractingAppointmentList(true);
      const { upcomming, ongoing, history } = listLocalState.current;
      if (search === '') {
        setOngoingAppointmentList(ongoing);
        setUpcomingAppointmentList(upcomming);
        setHistoryAppointmentList(history);
      } else {
        if (tablocation === 0) {
          const c = upcomming.filter((p, id) => {
            if (
              p.doctor &&
              p.doctor.basic.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return p;
            }
          });

          setUpcomingAppointmentList(c);
          const o = ongoing.filter((p, id) => {
            if (
              p.doctor &&
              p.doctor.basic.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return p;
            }
          });
          setOngoingAppointmentList(o);
        } else if (tablocation === 1) {
          const c = history.filter((p, id) => {
            if (
              p.doctor &&
              p.doctor.basic.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return p;
            }
          });
          setHistoryAppointmentList(c);
        }
      }
      setExtractingAppointmentList(false);
    },
    [tablocation],
  );

  const handleCustomDates = useCallback(() => {
    if (customDates.startDate !== '' && customDates.endDate !== '') {
      const { upcomming, history, ongoing } = listLocalState.current;
      if (tablocation === 0) {
        const c = upcomming.filter((p, id) => {
          if (
            new Date(p.bookedFor).getTime() >=
              new Date(customDates.startDate).getTime() &&
            new Date(p.bookedFor).getTime() <=
              new Date(customDates.endDate).getTime()
          )
            return p;
        });
        setUpcomingAppointmentList(c);

        const o = ongoing.filter((p, id) => {
          if (
            new Date(p.bookedFor).getTime() >=
              new Date(customDates.startDate).getTime() &&
            new Date(p.bookedFor).getTime() <=
              new Date(customDates.endDate).getTime()
          )
            return p;
        });
        setOngoingAppointmentList(o);
      } else if (tablocation === 1) {
        const c = history.filter((p, id) => {
          if (
            new Date(p.bookedFor).getTime() >=
              new Date(customDates.startDate).getTime() &&
            new Date(p.bookedFor).getTime() <=
              new Date(customDates.endDate).getTime()
          )
            return p;
        });
        setHistoryAppointmentList(c);
      }
      setcustomDates({
        type: 'setCustomDate',
      });
      hideBottomSheet();
    }
  }, [
    customDates.endDate,
    customDates.startDate,
    hideBottomSheet,
    tablocation,
  ]);

  useEffect(() => {
    handleCustomDates();
  }, [handleCustomDates]);

  const extraDataForTabs = useMemo(
    () => ({
      gettingAppointments,
      extractingAppointmentList,
    }),
    [extractingAppointmentList, gettingAppointments],
  );

  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.secondary_background[theme] }}>
      <TopNavBar
        navigation={navigation}
        onLeftButtonPress={handleBackButtonClick}
        headerText={`${Local('doctor.appointments.my_appointments')}`}
        style={{
          Section: { overflow: 'hidden', height: '20%', marginBottom: 0 },
        }}
      />
      <View
        style={{
          backgroundColor: Colors.Tabbar_bg_color[theme],
          padding: '4%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={[styles.tabView, { borderRightWidth: 1 }]}>
          <TouchableOpacity onPress={switchToTab0}>
            <Text
              style={{
                color:
                  tablocation === 0
                    ? Colors.pop_color[theme]
                    : Colors.damp_color[theme],
                fontSize: 18,
                fontFamily: tablocation === 0 ? 'Gilroy-Bold' : 'Gilroy-Medium',
              }}>
              {Local('doctor.appointments.upcoming')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.tabView, { borderLeftWidth: 1 }]}>
          <TouchableOpacity onPress={switchToTab1}>
            <Text
              style={{
                color:
                  tablocation === 1
                    ? Colors.pop_color[theme]
                    : Colors.damp_color[theme],
                fontSize: 18,
                fontFamily:
                  tablocation === 1 ? 'Montserrat-Bold' : 'Montserrat-Regular',
              }}>
              {Local('doctor.appointments.history')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        onBackButtonPress={hideBottomSheet}
        visible={isBottomSheetVisible}
        onBackdropPress={hideBottomSheet}
        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}>
        <ListItem
          key={10}
          containerStyle={{
            paddingBottom: 0,
            backgroundColor: Colors.bottom_sheet_bg[theme],
          }}
          onPress={handleCustomDates}>
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
                  style={[{ borderBottomWidth: 0, marginBottom: 0 }]}
                  date={customDates.startDate}
                  mode="date"
                  placeholder={`${Local(
                    'patient.medical_history.select_date',
                  )}`}
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    // dateInput:{borderWidth: 0},
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                      borderWidth: 0,
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(text) => {
                    setcustomDates({ type: 'setStartDate', payload: text });
                  }}
                />
              </View>
              <Text
                style={{
                  marginHorizontal: 12,
                  fontSize: 20,
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  color: Colors.primary_text_color[theme],
                  fontFamily: 'Montserrat-Medium',
                }}>
                {Local('doctor.appointments.to')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: NEW_PRIMARY_BACKGROUND,
                  borderBottomWidth: 1.5,
                  marginBottom: 15,
                }}>
                <DatePicker
                  style={[{ borderBottomWidth: 0, marginBottom: 0 }]}
                  date={customDates.endDate}
                  mode="date"
                  placeholder={`${Local(
                    'patient.medical_history.select_date',
                  )}`}
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    // dateInput:{borderWidth: 0},
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                      borderWidth: 0,
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(text) => {
                    setcustomDates({ type: 'setEndDate', payload: text });
                  }}
                />
              </View>
            </View>
          </ListItem.Content>
        </ListItem>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={[
              l.containerStyle,
              { backgroundColor: Colors.bottom_sheet_bg[theme] },
            ]}
            onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title
                style={[
                  l.titleStyle,
                  { color: Colors.primary_text_color[theme] },
                ]}>
                {l.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      {/* <View
        style={{
          paddingVertical: '4%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SearchBarSolid
          withIcon={true}
          handleBottomList={showBottomSheet}
          onEndEditing={onEndEditing}
          placeholderTextColor={Colors.search_placeholder_text[theme]}
          placeholder={`${Local(
            'doctor.appointments.search_for_an_appointment',
          )}`}
          searchIcon={
            <Image
              source={require('../../../assets/icons/search.png')}
              style={{ height: 20, width: 18 }}
              color={Colors.search_placeholder_text[theme]}
            />
          }
          icon={
            <Image
              source={require('../../../assets/icons/configure.png')}
              style={{ height: 24, width: 24, marginLeft: 8 }}
            />
          }
          style={{
            backgroundColor: Colors.search_background[theme],
            borderRadius: 10,
            elevation: 2,
          }}
        />
      </View> */}

      <View style={{ flex: 1, backgroundColor: Colors.grey_background[theme] }}>
        {tablocation === 1 ? (
          <FlatList
            style={{ flex: 1, padding: '3%', marginBottom: 60 }}
            showsVerticalScrollIndicator={false}
            data={appointments}
            refreshing={gettingAppointments || extractingAppointmentList}
            refreshControl={
              <RefreshControl
                refreshing={gettingAppointments || extractingAppointmentList}
                onRefresh={fetchAppointments}
              />
            }
            onRefresh={fetchAppointments}
            ListEmptyComponent={
              <ListEmptyComponent loading={gettingAppointments} theme={theme} />
            }
            extraData={extraDataForTabs}
            // onScroll={(event) => {
            //   setscrollval2(event.nativeEvent.contentOffset.y);
            //   console.log(scrollval2);
            // }}
            // scrollEventThrottle={16}
            keyExtractor={(item) => item._id}
            // ListHeaderComponent={(item) => {
            //   return (
            //     <View>
            //       <TouchableOpacity onPress={() => toggleExpand()}>
            //         <View style={{ flexDirection: 'row', top: 10, left: 40 }}>
            //           <Text
            //             style={{
            //               fontFamily: 'Gilroy-Medium',
            //               fontSize: 16,
            //               fontWeight: 'bold',
            //               marginBottom: 10,
            //             }}>
            //             {moment(item.bookedFor).format('MMMM, YYYY')}
            //           </Text>
            //           {expanded == false ? (
            //             <Image
            //               style={{
            //                 top: 9.7,
            //                 left: 205,
            //                 transform: [{ rotate: '180deg' }],
            //               }}
            //               source={require('../../../assets/icons/dropdown.png')}
            //             />
            //           ) : (
            //             <Image
            //               style={{ top: 9.7, left: 205 }}
            //               source={require('../../../assets/icons/dropdown.png')}
            //             />
            //           )}
            //         </View>
            //         <View
            //           style={{
            //             width: 275,
            //             height: 0.5,
            //             borderRadius: 28,
            //             borderWidth: 0.2,
            //             borderColor: '#7B7A79',
            //             alignSelf: 'center',
            //             top: 10,
            //           }}
            //         />
            //       </TouchableOpacity>
            //     </View>
            //   );
            // }}
            // ListFooterComponent={() => {
            //   return (
            //     <View
            //       style={{
            //         width: 1,
            //         height: height,
            //         borderColor: 'grey',
            //         borderWidth: 1,
            //         borderRadius: 8,
            //         left: 380,
            //         bottom: 800,
            //         //height - 590,
            //         marginRight: 59,
            //         alignItems: 'center',
            //       }}>
            //       <View
            //         style={{
            //           width: 8,
            //           height: 90,
            //           backgroundColor: '#3893E4',
            //           // borderColor: '#3893E4',
            //           // borderWidth: 2.4,
            //           borderRadius: 8,
            //           bottom: -scrollval2,
            //           //left: 1,
            //           // transform: [{ translateY: -450 }],
            //         }}
            //       />
            //     </View>
            //   );
            // }}
            renderItem={({ item }) => {
              if (gettingAppointments) {
                return <ListingWithThumbnailLoader />;
              }
              if (item.doctor) {
                return (
                  <View>
                    {/* {expanded == true ? ( */}
                    <AppointmentHistoryItem
                      navigation={navigation}
                      item={item}
                      style={{ margin: '2%' }}
                    />
                    {/* ) : null} */}
                  </View>
                );
              }
              return null;
            }}
          />
        ) : (
          <SectionList
            style={{
              flex: 1,
              paddingHorizontal: '1%',
              marginBottom: '15%',
              // maxHeight: 350,
              right: 7,
            }}
            showsVerticalScrollIndicator={false}
            // onScroll={(event) => {
            //   setscrollval(event.nativeEvent.contentOffset.y);
            //   // console.log(scrollval);
            // }}
            // scrollEventThrottle={16}
            sections={sectionForUpcomingAndOngoingAppointment}
            ListEmptyComponent={
              <ListEmptyComponent theme={theme} loading={gettingAppointments} />
            }
            keyExtractor={(item) => item._id}
            renderSectionHeader={({ section: { title } }) => {
              return (
                <View style={{ left: 7 }}>
                  <Text
                    style={{
                      ...styles.sectionHead,
                      color: Colors.primary_text_color[theme],
                    }}>
                    {title}
                  </Text>
                </View>
              );
            }}
            // renderSectionFooter={() => {
            //   return (
            //     <View>
            //       <View
            //         style={{
            //           width: 1,
            //           height: height,
            //           borderColor: 'grey',
            //           borderWidth: 1,
            //           borderRadius: 8,
            //           left: width - 11,
            //           bottom: height - 590,
            //           marginRight: 59,
            //           alignItems: 'center',
            //         }}>
            //         <View
            //           style={{
            //             width: 8,
            //             height: 90,
            //             backgroundColor: '#171717',
            //             // borderColor: '#3893E4',
            //             // borderWidth: 2.4,
            //             borderRadius: 8,
            //             bottom: -scrollval,
            //             left: 1,
            //             // transform: [{ translateY: -450 }],
            //           }}
            //         />
            //       </View>
            //     </View>
            //   );
            // }}
            onRefresh={fetchAppointments}
            refreshing={gettingAppointments || extractingAppointmentList}
            extraData={extraDataForTabs}
            refreshControl={
              <RefreshControl
                refreshing={gettingAppointments || extractingAppointmentList}
                onRefresh={fetchAppointments}
              />
            }
            renderItem={({ item, index, section }) => {
              if (gettingAppointments) {
                return <ListingWithThumbnailLoader />;
              } //Ongoing Appointments
              if (section.title == 'Ongoing Appointments') {
                return (
                  <AppointmentOngoingItem
                    navigation={navigation}
                    item={item}
                    style={{
                      margin: '2%',
                      backgroundColor: Colors.secondary_background[theme],
                    }}
                  />
                );
              }
              if (section.title == 'Upcoming Appointments') {
                return (
                  <AppointmentUpcomingItem
                    navigation={navigation}
                    item={item}
                    style={{
                      margin: '2%',
                      backgroundColor: Colors.secondary_background[theme],
                    }}
                  />
                );
              }
            }}
          />
        )}
      </View>
    </View>
  );
}

export default Appointments;

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    borderColor: PRIMARY_BACKGROUND,
    alignItems: 'center',
    padding: 5,
  },
  inactiveColor: {
    fontFamily: 'Montserrat-Regular',
    color: INPUT_PLACEHOLDER,
    fontSize: 18,
  },
  activeColor: {
    fontFamily: 'Montserrat-SemiBold',
    color: NEW_HEADER_TEXT,
    fontSize: 18,
  },
  section: {
    marginBottom: 15,
    margin: 10,
  },
  sectionHead: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: NEW_HEADER_TEXT,
    marginTop: 20,
    marginBottom: 6,
    marginLeft: 4,
  },
});

const ListEmptyComponent = React.memo(function ListEmptyComponent({
  theme,
  loading,
}) {
  useEffect(() => {
    console.log('rerendering');
  });
  if (loading) {
    return <ListingWithThumbnailLoader />;
  }
  return (
    <View
      style={{
        height: 200,
        width: '70%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        style={{ height: '90%', width: '90%' }}
        source={require('../../../assets/anim_svg/empty_bottle.json')}
        autoPlay
        loop
      />
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'Montserrat-Medium',
          fontSize: 18,
          color: Colors.primary_text_color[theme],
        }}>
        {Local('doctor.appointments.no_appointments')}
      </Text>
    </View>
  );
});

{
  /* <ScrollView
  refreshControl={
    <RefreshControl
      refreshing={gettingAppointments}
      onRefresh={() => {
        !patient.doctorToPatient && dispatch(GetAppointments(patient._id));
      }}
    />
  }
  style={{flex: 1}}
  showsVerticalScrollIndicator={false}>
  <View style={styles.section}> */
}
{
  /* <Text style={styles.sectionHead}>Upcoming Appointments</Text> */
}
{
  /* {gettingAppointments && extractingAppointmentList ? (
      <ListingWithThumbnailLoader />
    ) : upcomingAppointmentList.length === 0 &&
      ongoingAppointmentList.length == 0 ? (
      <View
        style={{
          height: 260,
          width: '70%',
          alignSelf: 'center',
          justifyContent: 'center',
          paddingBottom: '12%',
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
            fontSize: 20,
            color: Colors.primary_text_color[theme],
          }}>
          {Local('doctor.appointments.no_appointments')}
        </Text>
      </View>
    ) : ( */
}
{
  /* <>
        <FlatList
          data={ongoingAppointmentList}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => {
            return (
              <AppointmentOngoingItem
                navigation={navigation}
                item={item}
                style={{
                  margin: '2%',
                  backgroundColor: Colors.secondary_background[theme],
                }}
              />
            );
          }}
        />
        <FlatList
          data={upcomingAppointmentList}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => {
            return (
              <AppointmentUpcomingItem
                navigation={navigation}
                item={item}
                style={{
                  margin: '2%',
                  backgroundColor: Colors.secondary_background[theme],
                }}
              />
            );
          }}
        />
      </>
    )}
  </View>
</ScrollView>; */
}
