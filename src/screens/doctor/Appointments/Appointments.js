import React, { createRef, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {
  NEW_HEADER_TEXT,
  NEW_PRIMARY_COLOR,
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_BACKGROUND,
  NEW_UNSELECTED_TEXT,
} from '../../../styles/colors';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import VerticalText from '../../../components/atoms/VerticalText/VerticalText';
import moment from 'moment';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { GetAppointments } from '../../../reduxV2/action/DoctorAction';
import {
  RemoveAppointment,
  ApproveAppointment,
} from '../../../reduxV2/action/PatientAction';
import { ListingWithThumbnailLoader } from '../../../components/atoms/Loader/Loader';
import calculateMonths from '../../../utils/calculateMonths';
import LottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';
import NetworkStatus from '../../../components/atoms/NetworkStatus/NetworkStatus';
import { Colors } from '../../../styles/colorsV2';
import { colors } from 'react-native-elements';
import {
  SUCCESS,
  SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import {
  // BottomSheet,
  ListItem,
} from 'react-native-elements';
import { BottomSheet } from 'react-native-btr';
import DatePicker from 'react-native-datepicker';
import { Local } from '../../../i18n';
import Axios from 'axios';
import { Host } from '../../../utils/connection';
const week = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function Appointments({ navigation, route }) {
  const [months, setMonths] = useState([]);
  const [month, setMonth] = useState([]);
  const today = new Date();
  const [isHistoryTab, setisHistoryTab] = useState(false);
  const [history, sethistory] = useState([]);
  const [state, setState] = useState({
    history: [],
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme } = useSelector((state) => state.AuthReducer);
  const [filteredAppointments, setfilteredAppointments] = useState([]);
  const [active, setactive] = useState({
    date: today.getDate(),
    month: new Date().getMonth(),
  });
  const [selectedMonthDateObj, setSelectedMonthDateObj] = useState(today);
  const dateListRef = useRef();
  const dispatch = useDispatch();
  const getMonths = () => {
    const monthList = moment.months();
    const coming12Months = monthList
      .concat(monthList.slice(0, moment().month()))
      .slice(-12);
    setMonths(coming12Months);
  };

  useEffect(() => {
    if (route?.params?.bookedFor) {
      setactive({
        ...active,
        date: new Date(route?.params?.bookedFor)?.getDate(),
      });
    }
  }, [route]);
  useEffect(() => {
    const wait = new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    wait
      .then(() => {
        const now_scroll_index = selectedMonthDateObj.getDate() - 1;
        // console.log(selectedMonthDateObj.getDate());
        // console.log(selectedIndex);
        // console.log('now scroll index', now_scroll_index);
        dateListRef.current.scrollToIndex({
          index: now_scroll_index,
          animated: true,
          viewPosition:
            now_scroll_index < 25 ? 0.5 : now_scroll_index < 6 ? 0 : 1,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [month]);
  useEffect(() => {
    getMonths();
  }, []);
  useEffect(() => {
    const d = new Date();
    const MONTH_INDEX = d.getMonth();
    const monthIndex = (selectedIndex + MONTH_INDEX) % 12;
    const m = calculateMonths(monthIndex);
    const month_filtered = m.filter((item) => item.date !== '');

    const MonthDateObj = new Date(
      d.getFullYear(),
      monthIndex,
      monthIndex === MONTH_INDEX ? d.getDate() : 1,
    );
    setSelectedMonthDateObj(MonthDateObj);
    setMonth(month_filtered);
  }, [selectedIndex]);
  const { appointments, gettingAppointment, errorGettingAppointment } =
    useSelector((state) => state.DoctorReducer);
  const { userData } = useSelector((state) => state.AuthReducer);

  const getHistory = () => {
    if (typeof appointments === 'string') return;
    const appointment = appointments.filter((item, index) => {
      if (new Date(item.bookedFor) < today) return item;
    });
    sethistory(appointment);
    setState({ ...state, history: appointment });
  };
  useEffect(() => {
    !gettingAppointment && dispatch(GetAppointments(userData._id));
    filterAppointments();
    getHistory();
  }, []);

  const takeLeave = () => {
    let startDate = new Date().setDate(active.date);
    startDate = new Date(startDate).setMonth(active.month);
    startDate = new Date(startDate).setHours(0);
    startDate = new Date(startDate).setMinutes(0);
    const endDate = new Date(startDate).setDate(active.date + 1);

    const body = {
      doctor: userData?._id,
      date: startDate,
    };

    // return

    Axios.post(`${Host}/appointment/mark-unavailable`, body)
      .then((res) => {
        console.log(
          res.data.data,
          'DKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK',
        );
        Alert.alert('Success!', "You're now unavailable for this date");
      })
      .catch((e) => {
        console.log(
          e.response.data,
          'DKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK',
        );
      });
  };

  const filterAppointments = () => {
    // console.log(appointments, '________________________');
    // console.log(active, 'active______________----');
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

    console.log(appointment);
    setfilteredAppointments(appointment);
  };
  useEffect(() => {
    filterAppointments();
  }, [active.date || active.month]);

  useEffect(() => {
    filterAppointments();
    getHistory();
  }, [appointments]);

  const setActiveDate = (args) => {
    console.log(args, '.................args');
    setactive({
      month: new Date().getMonth() + selectedIndex,
      date: args.Bottom,
    });
  };
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable) {
        setIsConnected(state.isConnected);
      } else {
        setIsConnected(state.isConnected);
      }
    });
    return unsubscribe;
  });

  const [isVisible, setIsVisible] = useState(false);

  const onEndEditing = (search) => {
    if (search === '') {
      sethistory(state.history);
    } else {
      const c = state.history.filter((p, id) => {
        if (
          p.patient &&
          `${p.patient.firstName} ${p.patient.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())
          //  || (patient.lastName).toLowerCase().includes(search.toLowerCase())
        )
          return p;
      });
      sethistory(c);
    }
  };

  const handleSortByDate = () => {
    const sortedStaff = state.history.sort((a, b) => {
      new Date(b.bookedFor) - new Date(a.bookedFor);
    });
    sethistory(sortedStaff);
    setIsVisible(false);
  };

  const list = [
    // {
    //   title: 'Latest first',
    //   titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
    //   onPress: handleSortByDate,
    // },
    {
      title: 'Reset',
      titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
      onPress: () => {
        setIsVisible(false);
        setcustomDates({
          startDate: '',
          endDate: '',
        });
        sethistory(state.history);
      },
    },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: SECONDARY_BACKGROUND },
      titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
      onPress: () => setIsVisible(false),
    },
  ];

  const handleCustomDates = () => {
    if (customDates.startDate !== '' && customDates.endDate !== '') {
      const c = state.history.filter((p, id) => {
        if (
          new Date(p.bookedFor).getTime() >
            new Date(customDates.startDate).getTime() &&
          new Date(p.bookedFor).getTime() <
            new Date(customDates.endDate).getTime()
        )
          return p;
      });
      sethistory(c);

      setcustomDates({
        startDate: '',
        endDate: '',
      });
      setIsVisible(false);
    }
  };

  const [customDates, setcustomDates] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    handleCustomDates();
  }, [customDates]);
  return (
    <>
      <NetworkStatus isConnected={isConnected} />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.secondary_background[theme],
        }}>
        <TopNavBar
          navigation={navigation}
          headerText={`${Local(
            'doctor.appointments.my_appointments',
          )}`}></TopNavBar>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: '8%',
            paddingVertical: '3%',
            alignItems: 'center',
            width: '100%',
            marginTop: 10,
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                setisHistoryTab(false);
              }}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  color: !isHistoryTab
                    ? Colors.secondary_text_color[theme]
                    : Colors.input_placeholder_color[theme],
                  fontSize: 18,
                  fontFamily: !isHistoryTab
                    ? 'Montserrat-Bold'
                    : 'Montserrat-Regular',
                }}>
                {Local('doctor.appointments.upcoming')}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              borderLeftWidth: 2,
              borderColor: NEW_PRIMARY_COLOR,
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                setisHistoryTab(true);
              }}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  color: isHistoryTab
                    ? Colors.secondary_text_color[theme]
                    : Colors.input_placeholder_color[theme],
                  fontSize: 18,
                  fontFamily: isHistoryTab
                    ? 'Montserrat-Bold'
                    : 'Montserrat-Regular',
                }}>
                {Local('doctor.appointments.history')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {!isHistoryTab ? (
          <View>
            <View style={{ paddingVertical: '4%' }}>
              <FlatList
                data={months}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: 150,
                        alignItems: 'center',
                        borderRightWidth: 2,
                        borderColor: NEW_PRIMARY_COLOR,
                      }}
                      onPress={() => {
                        setSelectedIndex(index);
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color:
                            selectedIndex == index
                              ? Colors.secondary_text_color[theme]
                              : NEW_UNSELECTED_TEXT,
                          // fontWeight: 'bold',
                          fontFamily:
                            selectedIndex == index
                              ? 'Montserrat-Bold'
                              : 'Montserrat-Regular',
                        }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: Colors.secondary_background[theme],
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: '4%',
                paddingVertical: '4%',
              }}>
              <FlatList
                horizontal
                data={month}
                ref={dateListRef}
                // initialScrollIndex={`${selectedMonthDateObj.getDate() - 1}`}
                // onScrollToIndexFailed={() => {
                //   console.log('failed');
                // }}
                keyExtractor={(item) => `${item.date}`}
                renderItem={({ item }) => {
                  if (!item.date) return null;
                  return (
                    <VerticalText
                      theme={theme}
                      setActiveDate={setActiveDate}
                      isActive={
                        item.date === active.date && item.month === active.month
                      }
                      text={{
                        Top: week[item.day],
                        Bottom: item.date,
                      }}></VerticalText>
                  );
                }}
              />
            </View>
            <ScrollView>
              <View
                style={{
                  backgroundColor: Colors.primary_background[theme],
                  paddingHorizontal: '5%',
                  paddingTop: '4%',
                  paddingBottom: '2%',
                }}>
                {/* <Text
          style={{
            fontSize: 22,
            marginTop: '4%',
            marginBottom: '3%',
            marginLeft: '1%',
          }}>
          10:00 am - 12:00 pm
        </Text> */}
                {gettingAppointment ? (
                  <ListingWithThumbnailLoader />
                ) : filteredAppointments?.length === 0 ? (
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
                      style={{ height: '100%', width: '100%' }}
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
                ) : (
                  filteredAppointments?.map((item) => {
                    //
                    if (item.booked)
                      return (
                        <Card
                          key={item._id}
                          item={item}
                          doctorId={userData._id}
                          navigation={navigation}
                        />
                      );
                  })
                )}

                {/* <View
                  style={{
                    backgroundColor: Colors.secondary_background[theme],
                    width: '100%',
                    elevation: 2,
                    borderRadius: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: '2%',
                    // marginBottom: '5%',
                    backgroundColor: '#077EE9',
                  }}>
                  <View
                    style={{
                      paddingVertical: '4%',
                      paddingHorizontal: '4%',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity onPress={takeLeave}>
                      <Text
                        style={{
                          color: Colors.secondary_text_color[theme],
                          fontSize: 16,
                          fontWeight: 'bold',
                          marginLeft: '2%',
                        }}>
                        Take Leave
                      </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View> */}
              </View>
            </ScrollView>
          </View>
        ) : (
          <View>
            <BottomSheet
              onBackButtonPress={() => setIsVisible(false)}
              visible={isVisible}
              onBackdropPress={() => setIsVisible(false)}
              // isVisible={isVisible}
              containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}>
              <ListItem
                key={10}
                containerStyle={{
                  paddingBottom: 0,
                  backgroundColor: Colors.bottom_sheet_bg[theme],
                }}
                onPress={handleCustomDates}>
                <ListItem.Content
                  style={{
                    padding: 0,
                    backgroundColor: Colors.bottom_sheet_bg[theme],
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: Colors.bottom_sheet_bg[theme],
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: NEW_PRIMARY_BACKGROUND,
                        backgroundColor: Colors.bottom_sheet_bg[theme],
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
                          setcustomDates({ ...customDates, startDate: text });
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        marginHorizontal: 12,
                        fontSize: 20,
                        marginTop: 'auto',
                        color: Colors.primary_text_color[theme],
                        marginBottom: 'auto',
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
                          setcustomDates({ ...customDates, endDate: text });
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
            <View
              style={{
                paddingVertical: '4%',
                alignItems: 'center',
                //      backgroundColor: GREY_BACKGROUND ,
                justifyContent: 'center',
              }}>
              <SearchBarSolid
                withIcon={true}
                handleBottomList={() => setIsVisible(true)}
                onEndEditing={onEndEditing}
                placeholderTextColor={Colors.search_placeholder_text[theme]}
                placeholder={`search for an appointment`}
                searchIcon={
                  <Image
                    source={require('../../../assets/icons/search.png')}
                    style={{ height: 20, width: 18 }}
                    color={SEARCH_PLACEHOLDER_COLOR}
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
            </View>

            <ScrollView>
              <View
                style={{
                  backgroundColor: Colors.primary_background[theme],
                  paddingHorizontal: '5%',
                  paddingTop: '4%',
                  paddingBottom: '2%',
                }}>
                {/* <Text
          style={{
            fontSize: 22,
            marginTop: '4%',
            marginBottom: '3%',
            marginLeft: '1%',
          }}>
          10:00 am - 12:00 pm
        </Text> */}
                {gettingAppointment ? (
                  <ListingWithThumbnailLoader />
                ) : history.length === 0 ? (
                  <View
                    style={{
                      height: 340,
                      width: '70%',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      paddingBottom: '15%',
                      alignItems: 'center',
                      marginTop: '12%',
                    }}>
                    <LottieView
                      style={{ height: '100%', width: '100%' }}
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
                ) : (
                  history?.map((item) => {
                    // console.log(item, "............................")
                    return (
                      <Card
                        key={item._id}
                        item={item}
                        history={true}
                        doctorId={userData._id}
                        navigation={navigation}
                      />
                    );
                  })
                )}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </>
  );
}

const Card = ({ item, doctorId, navigation, history }) => {
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
          backgroundColor: Colors.secondary_background[theme],
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
                color: Colors.secondary_text_color[theme],
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: '2%',
              }}>
              {`${patient.firstName?.toTitleCase()} ${patient.lastName?.toTitleCase()}`}
            </Text>
            <Text
              style={{
                color: Colors.secondary_text_color[theme],
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
                color: Colors.secondary_text_color[theme],
                fontWeight: 'bold',
                marginRight: '4%',
              }}>
              {moment(item.bookedFor).format("DD MMM 'YY")}
            </Text>
            <Text
              style={{
                color: Colors.secondary_text_color[theme],
                fontWeight: 'bold',
                color: '#077EE9',
              }}>
              |
            </Text>
            <Text
              style={{
                color: '#7B7A79',
                color: Colors.secondary_text_color[theme],
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
