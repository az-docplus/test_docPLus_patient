import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Dimensions,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { Card } from 'react-native-paper';
import AwesomeButton from 'react-native-really-awesome-button';
import CustomTextComponent from '../../../components/CustomTextComponent';
import SearchComponent from '../../../components/SearchComponent';
import {
  availableTimeappointmentForSlot,
  availableTimeSlots2,
  availableTimeSlots3,
  dummyDaysData,
} from '../../../constants/dummyData';
import { Colors } from '../../../utils/Colors';
import { NEW_PRIMARY_COLOR, SECONDARY_COLOR } from '../../../styles/colors';
import { windowWidth } from '../../../utils/utils';
import VerticalText from '../../../components/atoms/VerticalText/VerticalText';
import { useSelector, useDispatch } from 'react-redux';
import calculateMonths from '../../../utils/calculateMonths';
import moment from 'moment';
import {
  GetAppointmentSlot,
  // GetAppointmentInpersonSlot,
  // GetFamilyMember,
} from '../../../reduxV2/action/PatientAction';
import { Colors as MainColor } from '../../../styles/colorsV2';
import { NEW_UNSELECTED_TEXT } from '../../../styles/colors';
import { Local } from '../../../i18n';
import LinearGradient from 'react-native-linear-gradient';
const week = ['SUN', 'MON', 'TUE', 'WED', 'THRU', 'FRI', 'SAT'];
const width = Dimensions.get('screen').width;

const BuildArrowComponent = ({ image }) => {
  return (
    <View
      style={{
        width: 24,
        height: 24,
        backgroundColor: Colors.GREEN,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
      }}>
      <Image
        source={image}
        style={{
          width: 10,
          height: 10,
          tintColor: '#fff',
        }}
      />
    </View>
  );
};

export default function AvailibilityTabComponent({
  doctor,
  navigation,
  setSlot,
  setNextAvailableSlot,
}) {
  const dateListRef = useRef();
  const dispatch = useDispatch();
  const [more, setMore] = useState(false);
  const { theme } = useSelector((state) => state.AuthReducer);
  const {
    appointmentForSlotLoading,
    appointmentForSlot,
    familyMember,
    isPatientAccountReducerLoading,
    patient,
  } = useSelector((state) => state.PatientReducer);
  // console.log('======appointmentForSlotss', appointmentForSlot);
  const today = new Date();
  const [isFirstrender, setIsFirstrender] = useState(true);
  // const [time, setTime] = useState('');
  const [months, setMonths] = useState([]);
  const [month, setMonth] = useState([]);
  const [showMonthOptions, setShowMonthOptions] = useState(false);
  const [NoSlotAvailable, setNoSlotAvailable] = useState(false);
  const [timeValue, setTimeValue] = useState('');
  const [forWhom, setforWhom] = useState('');
  const [active, setActive] = useState({
    date: today.getDate(),
    month: new Date().getMonth(),
  });
  useEffect(() => {
    setTimeValue('');
    setSlot(null);
  }, [appointmentForSlot]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedMonthDateObj, setSelectedMonthDateObj] = useState(today);

  const getMonths = () => {
    const monthList = moment.months();
    const coming12Months = monthList
      .concat(monthList.slice(0, moment().month()))
      .slice(-12);
    setMonths(coming12Months);
  };

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
  }, [month, selectedMonthDateObj]);
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

  const setActiveDate = (args) => {
    // console.log(args, '.................args');
    setActive({
      month: new Date().getMonth() + selectedIndex,
      date: args.Bottom,
    });
    getDateView();
  };
  // console.log('states***********@@@@@@@@@@@@@', active);
  const getDateView = (startDate, endDate) => {
    if (!startDate) {
      startDate = new Date(
        `${today.getFullYear()}/${active.month + 1}/${active.date}`,
      );
    }
    if (!endDate) {
      endDate = new Date(
        `${today.getFullYear()}/${active.month + 1}/${active.date + 1}`,
      );
    }
    const start = moment(startDate).format('YYYY-MM-DD');
    const end = moment(endDate).format('YYYY-MM-DD');

    dispatch(GetAppointmentSlot([[start, end]], doctor._id));
  };

  const todaysAppointments = () => {
    const start = new Date();
    const end = new Date().setDate(new Date().getDate() + 1);
    getDateView(start, end);
    setIsFirstrender(false);
  };
  useEffect(() => {
    if (isFirstrender) {
      todaysAppointments();
    } else {
      getDateView();
    }
  }, [active]);

  const bookAppointment = (slot) => {
    // navigation.navigate('ConfirmAppointment', {
    //   data: { ...slot, forWhom },
    //   doctor,
    // });
  };

  const renderDaysCardComponent = () => {
    return (
      <>
        <View style={{ height: 16 }} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <BuildArrowComponent
            image={require('../../../../assets/arrow-back.png')}
          /> */}
          <View style={{ width: 16 }} />
          <TouchableOpacity
            onPress={() => {
              setShowMonthOptions(!showMonthOptions);
              LayoutAnimation.spring();
            }}>
            <BuildTitleComponent
              title={`${moment(new Date().setMonth(active.month)).format(
                'MMMM',
              )}, ${today.getFullYear()}`}
            />
          </TouchableOpacity>
          <View style={{ width: 16 }} />
          <Image
            source={require('../../../../assets/arrow-down.png')}
            style={{
              width: 13,
              height: 13,
              marginLeft: 5,
            }}
          />
          {/* <BuildArrowComponent
            image={require('../../../../assets/arrow-forward.png')}
          /> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // paddingHorizontal: '4%',
            paddingVertical: '4%',
            marginTop: 18,
          }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={month}
            ref={dateListRef}
            keyExtractor={(item) => `${item.date}`}
            renderItem={({ item }) => {
              if (!item.date) {
                return null;
              }
              return (
                <VerticalText
                  theme={theme}
                  setActiveDate={(text) => {
                    setActiveDate(text);
                  }}
                  isActive={
                    item.date === active.date && item.month === active.month
                  }
                  text={{
                    Top: week[item.day],
                    Bottom: item.date,
                  }}
                />
              );
            }}
          />
          {/* {dummyDaysData.map((data, index) => {
            return (
              <BuildDaysCardComponent
                key={index}
                data={data}
                index={index}
                day={day}
                setTime={setTime}
              />
            );
          })} */}
          {showMonthOptions && (
            <View
              style={{
                position: 'absolute',
                elevation: 8,
                zIndex: 9,
                top: -39 * 5,
                borderWidth: 0.1,
                borderRadius: 20,
              }}>
              {months &&
                months.map((val, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      //   setActiveKey(val);
                      setSelectedIndex(index);
                      setShowMonthOptions(!showMonthOptions);
                      LayoutAnimation.spring();
                    }}
                    style={{
                      backgroundColor: '#fff',
                      paddingVertical: 7,
                      paddingHorizontal: 17,
                      paddingRight: 24,
                      height: 38,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 14,
                      }}>
                      {val}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>
      </>
    );
  };

  return (
    <View style={{ marginHorizontal: 10 }}>
      <SearchComponent bgHeight={0} />
      {renderDaysCardComponent()}
      <ScrollView style={{ flex: 1, paddingBottom: 50 }} scrollEnabled={true}>
        {appointmentForSlot && appointmentForSlot.length > 0 && (
          <View>
            <Text />
            <BuildTitleComponent
              title={`${Local(
                'doctor.V2.DoctorProfileScreen.availibility.title',
              )}`}
            />
            <Text />
            {/* <CustomTextComponent
              text={'Morning'}
              fs={15}
              fw={'700'}
              textColor={Colors.BLUE2}
            /> */}
          </View>
        )}
        {appointmentForSlot &&
          appointmentForSlot.length > 0 &&
          appointmentForSlot.map((u, i) => {
            // console.log('============uuuuuuuuuu', u);
            const date = moment(u._id).format('MMMM, DD');
            let { appointments } = u;
            // console.log('appointmentsaaaaaaaa', appointments);
            const lastAppointment = appointments[appointments.length - 1];
            const now = moment();
            const lastSlot = moment(lastAppointment.bookedFor);
            if (lastSlot > now) {
              appointments = appointments.filter((item, index) => {
                const __time = moment(item.bookedFor);

                if (__time > now && item.available !== false) {
                  return item;
                }
              });
              const morning = [];
              const afternoon = [];
              const evening = [];
              const night = [];
              appointments.map((d, i) => {
                const time = moment(d.bookedFor).format('hh:mm A');
                const number = moment(time, ['h:mm A']).format('HH:mm');
                const hour = moment(number, 'hh:mm').hour();
                if (hour < 12) {
                  morning.push(d);
                }
                if (hour > 11 && hour <= 16) {
                  afternoon.push(d);
                }
                if (hour > 16 && hour <= 18) {
                  evening.push(d);
                }
                if (hour > 18) {
                  night.push(d);
                }
              });
              const nextAvailableSlot = moment(
                appointments[0].bookedFor,
              ).format('hh:mm A');
              if (timeValue === '') {
                setTimeValue(nextAvailableSlot);
                setSlot(appointments[0]);
                setNextAvailableSlot(nextAvailableSlot);
              }

              return (
                <View
                  style={{
                    borderColor: NEW_UNSELECTED_TEXT,
                  }}
                  key={u._id}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      color: '#077EE9',
                      fontSize: 16,
                    }}>
                    {`${Local(
                      'doctor.V2.DoctorProfileScreen.availibility.avail_time.morning',
                    )}`}
                  </Text>
                  <View
                    style={{
                      marginVertical: 20,
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    {morning &&
                      morning.map((d, i) => {
                        const time = moment(d.bookedFor).format('hh:mm A');
                        const slot_temp_time = moment(d.bookedFor);

                        if (slot_temp_time > now) {
                          return (
                            <View
                              style={{
                                width: width * 0.2,
                                height: 38,
                              
                                marginVertical:10,
                                marginHorizontal:12,
                                alignItems: 'center',
                              }}>
                              <BuildShowTimeSlot
                                index={d._id}
                                setTime={() => {
                                  setSlot(d);
                                  setNextAvailableSlot(nextAvailableSlot);
                                  setTimeValue(time);
                                  // console.log(
                                  //   '===============>>>>>>>>>>>Slot',
                                  //   d,
                                  //   time,
                                  // );
                                }}
                                item={time}
                                day={timeValue}
                              />
                            </View>
                          );
                        }
                      })}
                  </View>
                  {/* .filter((c, index) => {
                  return appointments.indexOf(c) !== index;
              }) */}
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      color: '#077EE9',
                      fontSize: 16,
                    }}>
                    {`${Local(
                      'doctor.V2.DoctorProfileScreen.availibility.avail_time.afternoon',
                    )}`}
                  </Text>
                  <View
                    style={{
                      marginVertical: 20,
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    {afternoon &&
                      afternoon.map((d, index) => {
                        const time = moment(d.bookedFor).format('hh:mm A');
                        const slot_temp_time = moment(d.bookedFor);

                        if (slot_temp_time > now) {
                          return (
                            <View
                              style={{
                                width: width * 0.2,
                                height: 38,
                              
                                marginVertical:10,
                                marginHorizontal:12,
                                alignItems: 'center',
                              }}>
                              <BuildShowTimeSlot
                                index={index}
                                setTime={() => {
                                  setNextAvailableSlot(nextAvailableSlot);
                                  setSlot(d);
                                  setTimeValue(time);
                                }}
                                item={time}
                                day={timeValue}
                              />
                            </View>
                          );
                        }
                      })}
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      color: '#077EE9',
                      fontSize: 16,
                    }}>
                    {`${Local(
                      'doctor.V2.DoctorProfileScreen.availibility.avail_time.evening',
                    )}`}
                  </Text>
                  <View
                    style={{
                      marginVertical: 10,
                      marginHorizontal:10,
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    {evening &&
                      evening.map((d, index) => {
                        const time = moment(d.bookedFor).format('hh:mm A');
                        const slot_temp_time = moment(d.bookedFor);

                        if (slot_temp_time > now) {
                          return (
                            <View
                              style={{
                                width: width * 0.2,
                                height: 38,
                              
                                marginVertical:10,
                                marginHorizontal:12,
                                alignItems: 'center',
                              }}>
                              <BuildShowTimeSlot
                                index={index}
                                setTime={() => {
                                  setNextAvailableSlot(nextAvailableSlot);
                                  setSlot(d);
                                  setTimeValue(time);
                                  // bookAppointment(u);
                                }}
                                item={time}
                                day={timeValue}
                              />
                            </View>
                          );
                        }
                      })}
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      color: '#077EE9',
                      fontSize: 16,
                    }}>
                    {`${Local(
                      'doctor.V2.DoctorProfileScreen.availibility.avail_time.night',
                    )}`}
                  </Text>
                  <View
                    style={{
                      marginVertical: 10,
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      // justifyContent: 'space-around',
                    }}>
                    {night &&
                      night.map((d, i) => {
                        const time = moment(d.bookedFor).format('hh:mm A');
                        const slot_temp_time = moment(d.bookedFor);

                        if (slot_temp_time > now) {
                          return (
                            <View
                              style={{
                                width: width * 0.2,
                                height: 38,
                                marginBottom: 10,
                                alignItems: 'center',
                              }}>
                              <BuildShowTimeSlot
                                index={d._id}
                                setTime={() => {
                                  setNextAvailableSlot(nextAvailableSlot);
                                  setSlot(d);
                                  setTimeValue(time);
                                  // bookAppointment(u);
                                }}
                                item={time}
                                day={timeValue}
                              />
                            </View>
                          );
                        }
                      })}
                  </View>
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '12%',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Montserrat-Medium',
                      color: MainColor.primary_text_color[theme],
                    }}>
                    {' '}
                    {Local('patient.doc_profile.doc_not_avail')}
                  </Text>
                </View>
              );
            }
          })}
        <View
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '12%',
          }}>
          {((appointmentForSlot && appointmentForSlot.length == 0) ||
            NoSlotAvailable ||
            !appointmentForSlot) && (
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Montserrat-Medium',
                color: MainColor.primary_text_color[theme],
              }}>
              {' '}
              {Local('patient.doc_profile.doc_not_avail')}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const BuildTitleComponent = ({ title, color }) => {
  return (
    <Text
      style={{
        color: color ? color : Colors.BLACK,
        fontSize: 20,
        fontFamily: 'Gilroy-SemiBold',
      }}>
      {title}
    </Text>
  );
};

const BuildDaysCardComponent = ({ data, index, day, setTime }) => {
  return (
    <Card
      key={index}
      style={[
        styles.daysCardContainerStyle,
        {
          backgroundColor: day === data.name ? Colors.GREEN : '#EEEEEE',
        },
      ]}>
      <AwesomeButton
        backgroundColor={day === data.name ? Colors.GREEN : '#EEEEEE'}
        backgroundShadow={day === data.name ? Colors.GREEN : '#EEEEEE'}
        activeOpacity={0.5}
        width={48}
        elevation={8}
        backgroundDarker={day === data.name ? Colors.GREEN : '#EEEEEE'}
        borderRadius={12}
        onPress={() => {
          setTime(data.name);
        }}>
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={[
              styles.daysCardNumberStyle,
              {
                color: day === data.name ? Colors.WHITE : Colors.GREEN,
                fontFamily: 'Montserrat-Regular',
              },
            ]}>
            {data.id}
          </Text>
          <Text
            style={[
              styles.daysCardTextStyle,
              {
                color: day === data.name ? Colors.WHITE : Colors.GREEN,
                fontFamily: 'Montserrat-Regular',
              },
            ]}>
            {data.name}
          </Text>
        </View>
      </AwesomeButton>
    </Card>
  );
};

const BuildShowTimeSlot = ({ item, index, day, setTime }) => {
  const active = day === item;
  // console.log("day===========>>>>>>>>>>.", day);
  // console.log('item===================', item, active, index);
  return (
    <View>
      <TouchableOpacity onPress={setTime}>
        <LinearGradient
          colors={active ? ['#3BA2B8', '#1D515C'] : ['#EEEEEE', '#EEEEEE']}
          start={{ x: 2, y: 2 }}
          end={{ x: 0, y: 2 }}
          style={{
            width: 80,
            borderRadius: 14,
            padding: 10,
          }}>
          <Text
            style={{
              color: active ? Colors.WHITE : Colors.BLACK,
              marginVertical: 3,
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 13,
              textAlign: 'center',
            }}>
            {item}
            {/* {moment(item).format('hh:mm A')}  F */}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  daysCardContainerStyle: {
    elevation: 4,
    marginTop: 16,
    shadowColor: '#999',
    borderRadius: 12,
    padding: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysCardNumberStyle: {
    color: Colors.GREEN,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  daysCardTextStyle: {
    color: Colors.GREEN,
    fontSize: 11,
    marginTop: 4,
    fontWeight: '400',
  },
  inputCardStyle: {
    elevation: 5,
    shadowColor: '#999',
    borderRadius: 10,
    overflow: 'hidden',
  },
  textareaInputStyle: {
    width: '100%',
    height: 190,
    paddingHorizontal: 18,
    color: 'black',
    borderRadius: 10,
    paddingBottom: 16,
    marginTop: -70,
    fontFamily: 'Montserrat-Regular',
  },
});
