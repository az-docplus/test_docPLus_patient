import React, {useState, useRef, useCallback, useEffect, memo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';

import Header from '../../../components/v2/header/header.component';
import RoundedImageHolder from '../../../components/v2/RoundedImageHolder/roundedImageHolder.component';
import ToggleButton from '../../../components/v2/ToggleButton/toggleButton.component';
import ContentContainer from '../../../components/v2/ContentContainer/contentContainer.component';
import BottomNavigation from '../../../components/v2/BottomNavigation/BottomNavigation.component';

import MonthOfCalendar from '../../../components/v2/Appiontment/MonthOfCalendar.component';
import TimelineContainer from '../../../components/v2/Appiontment/timelineContainer.component';
import {useDispatch, useSelector} from 'react-redux';

import {GetDoctorAppointments} from '../../../redux/action/doctor/scheduleAction';
import {GettingDocterLatestInfo} from '../../../redux/action/doctor/myDoctorAction';

const Home1 = memo(() => {
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.AuthReducer);
  const {scheduleData, isDoctorScheduleLoading} = useSelector(
    (state) => state.DoctorScheduleReducer,
  );
  const {isMyDoctorReducerLoading, doctorProfile} = useSelector(
    (state) => state.MyDoctorReducer,
  );

  const [timeline, setTimeline] = useState(1);
  const [tabIndex, settabIndex] = useState(0);
  const tabIndexPos = useRef(new Animated.Value(0)).current;

  const [myUniqueDates, setMyUniqueDates] = useState([]);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [upcomeingVisit, setUpcomeingVisit] = useState([]);

  var bookings = [];

  const FindMyUniqueDate = () => {
    console.log('Welcome to FindMyUniqueDate >>>>>>>>>>>>>>>>>>>>');
    doctorProfile.appointments.map((appiontment) => {
      // checking if the appiontment month and current moth are same or not.
      console.log(appiontment.bookedFor);
      console.log(
        `month: ${appiontment.bookedFor.slice(
          5,
          7,
        )} and date: ${appiontment.bookedFor.slice(8, 10)}`,
      );
      if (
        parseInt(appiontment.bookedFor.slice(5, 7)) === new Date().getMonth() &&
        appiontment.available
      ) {
        console.log('woo');
        setMyUniqueDates([
          ...myUniqueDates,
          appiontment.bookedFor.slice(8, 10),
        ]);
        bookings.push(appiontment.bookedFor.slice(8, 10).toString());
      }
    });

    bookings = new Set(bookings);
    console.log(bookings);
    // setUniqueDates(new Set(bookings))
    return bookings;
  };

  const GettingUpcomeingMetting = () => {
    let tmp = [];
    console.log('Welcome to UpcomeingMettings >>>>>>>>>>>>>>>>>>>>');
    doctorProfile.appointments.map((appiontment, index) => {
      // checking if the appiontment month and current moth are same or not.
      // console.log(appiontment.bookedFor)
      // console.log(`month: ${appiontment.bookedFor.slice(5, 7)} and date: ${appiontment.bookedFor.slice(8, 10)}`)
      console.log(appiontment);
      if (
        parseInt(appiontment.bookedFor.slice(5, 7)) === new Date().getMonth() &&
        appiontment.available
      ) {
        console.log('xoo');
        setMyUniqueDates([
          ...myUniqueDates,
          appiontment.bookedFor.slice(8, 10),
        ]);
        bookings.push(appiontment.bookedFor.slice(8, 10).toString());
      }

      // if (parseInt(appiontment.bookedFor.slice(5, 7)) === new Date().getMonth() && appiontment.available) {
      //       if (parseInt(appiontment.bookedFor.slice(8, 10)) === 16) {

      //             // setTodaySchedule([...todaySchedule, appiontment.bookedFor.slice(11, 16)])
      //             const fvv = {
      //                   _id: index,
      //                   PatientName: 'Bella Campbell',
      //                   Timing: appiontment.bookedFor.slice(11, 16),
      //                   Age: '26 yrs',
      //                   Disease: 'Medical Checkup',
      //                   Profile: (
      //                         <RoundedImageHolder
      //                               sourceUrl={require('../../assets/jpg/person1.jpg')}
      //                               style={{
      //                                     ImageWrapper: {
      //                                           height: 70,
      //                                           width: 70,
      //                                           borderWidth: 0,
      //                                     },
      //                               }}
      //                         />
      //                   ),
      //             }
      //             // setUpcomeingVisit([])
      //             tmp.push(fvv)
      //       }
      // }
    });

    // bookings = new Set(bookings)
    // console.log(bookings)
    // setUniqueDates(new Set(bookings))
    console.log('1111111111111111111111111110000000000000000000000000');
    console.log(tmp);
    return tmp;
  };

  useEffect(() => {
    dispatch(GettingDocterLatestInfo());
    // dispatch(GetDoctorAppointments(3, data.id, successCallback, faildCallback));
    console.log(scheduleData);
  }, []);

  const months = useRef([
    {
      month: 1,
      name: 'January',
    },
    {
      month: 2,
      name: 'February',
    },
    {
      month: 3,
      name: 'March',
    },
    {
      month: 4,
      name: 'April',
    },
    {
      month: 5,
      name: 'May',
    },
    {
      month: 6,
      name: 'June',
    },
    {
      month: 7,
      name: 'July',
    },
    {
      month: 8,
      name: 'August',
    },
    {
      month: 9,
      name: 'September',
    },
    {
      month: 10,
      name: 'October',
    },
    {
      month: 11,
      name: 'November',
    },
    {
      month: 12,
      name: 'December',
    },
  ]).current;

  const onTapTab0 = useCallback(
    function () {
      if (tabIndex === 1) {
        Animated.sequence([
          Animated.timing(tabIndexPos, {
            toValue: 0,
            easing: Easing.back(),
            duration: 500,
            useNativeDriver: false,
          }),
        ]).start(() => settabIndex(0));
      }
    },
    [tabIndex],
  );
  const onTapTab1 = useCallback(
    function () {
      if (tabIndex === 0) {
        // !isMyDoctorReducerLoading && FindMyUniqueDate()

        Animated.sequence([
          Animated.timing(tabIndexPos, {
            toValue: 1,
            easing: Easing.back(),
            duration: 500,
            useNativeDriver: false,
          }),
        ]).start(() => settabIndex(1));
      }
    },
    [tabIndex],
  );
  const Data = [
    {
      _id: 1,
      PatientName: 'Bella Campbell',
      Timing: '9:00 AM',
      Age: '26 yrs',
      Disease: 'Medical Checkup',
      Profile: (
        <RoundedImageHolder
          sourceUrl={require('../../assets/jpg/person1.jpg')}
          style={{
            ImageWrapper: {
              height: 70,
              width: 70,
              borderWidth: 0,
            },
          }}
        />
      ),
    },
    {
      _id: 2,
      PatientName: 'Michael Brown',
      Timing: '10:00 AM',
      Age: '26 yrs',
      Disease: 'Stomach upset',
      Profile: (
        <RoundedImageHolder
          sourceUrl={require('../../assets/jpg/person2.jpg')}
          style={{
            ImageWrapper: {
              height: 70,
              width: 70,
              borderWidth: 0,
            },
          }}
        />
      ),
    },
    {
      _id: 3,
      PatientName: 'Michael Brown',
      Timing: '10:00 AM',
      Age: '26 yrs',
      Disease: 'Stomach upset',
      Profile: (
        <RoundedImageHolder
          sourceUrl={require('../../assets/jpg/person3.jpg')}
          style={{
            ImageWrapper: {
              height: 70,
              width: 70,
              borderWidth: 0,
            },
          }}
        />
      ),
    },
    {
      _id: 4,
      PatientName: 'Michael Brown',
      Timing: '10:00 AM',
      Age: '26 yrs',
      Disease: 'Stomach upset',
      Profile: (
        <RoundedImageHolder
          sourceUrl={require('../../assets/jpg/person3.jpg')}
          style={{
            ImageWrapper: {
              height: 70,
              width: 70,
              borderWidth: 0,
            },
          }}
        />
      ),
    },
    {
      _id: 5,
      PatientName: 'Michael Brown',
      Timing: '10:00 AM',
      Age: '26 yrs',
      Disease: 'Stomach upset',
      Profile: (
        <RoundedImageHolder
          sourceUrl={require('../../assets/jpg/person3.jpg')}
          style={{
            ImageWrapper: {
              height: 70,
              width: 70,
              borderWidth: 0,
            },
          }}
        />
      ),
    },
  ];
  
  return (
    <View style={AppointmentScreenStyle.Container}>
      <Header
        style={{
          Container: {
            backgroundColor: '#7774F5',
            flex: 3,
          },
          ChildContainer: {
            top: '-5%',
          },
        }}
        hideOverlay="true"
        ProfileNavPic={
          <RoundedImageHolder
            style={{
              ImageWrapper: {
                height: 42,
                width: 42,
              },
            }}
            sourceUrl={require('../../assets/jpg/person1.jpg')}
          />
        }>
        <Text style={AppointmentScreenStyle.HeaderPrimaryText}>
          Appointment (8)
        </Text>
        <ToggleButton text="NOW" />
      </Header>
      <ContentContainer
        style={{
          Container: {
            flex: 6,
          },
        }}>
        <View style={AppointmentScreenStyle.SwitchSliderContainer}>
          <View style={AppointmentScreenStyle.SwitchSliderTextContainer}>
            <TouchableOpacity
              onPress={onTapTab0}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Animated.Text
                style={[
                  AppointmentScreenStyle.SwitchSliderText,
                  {
                    color: tabIndexPos.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['#fff', '#000'],
                    }),
                  },
                ]}>
                Appointments
              </Animated.Text>
            </TouchableOpacity>
          </View>
          <View style={AppointmentScreenStyle.SwitchSliderTextContainer}>
            <TouchableOpacity
              onPress={onTapTab1}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Animated.Text
                style={[
                  AppointmentScreenStyle.SwitchSliderText,
                  {
                    color: tabIndexPos.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['#000', '#fff'],
                    }),
                  },
                ]}>
                Calendar
              </Animated.Text>
            </TouchableOpacity>
          </View>
          <Animated.View
            style={[
              AppointmentScreenStyle.SwitchSlider,
              {
                left: tabIndexPos.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '50%'],
                }),
              },
            ]}
          />
        </View>
        {tabIndex === 0 ? (
          <Animated.FlatList
            style={{
              flex: 1,
              paddingTop: 10,
              transform: [
                {
                  scale: tabIndexPos.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                },
              ],
            }}
            data={() => GettingUpcomeingMetting()}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({item}) => (
              <TimelineContainer
                PatientName={item.PatientName}
                Timing={item.Timing}
                onPress={() => setTimeline(item._id)}
                Age={item.Age}
                Disease={item.Disease}
                Profile={item.Profile}
                active={item._id === timeline}
              />
            )}
          />
        ) : null}
        {tabIndex === 1 ? (
          isMyDoctorReducerLoading ? (
            <ActivityIndicator
              size="large"
              color={'#000'}
              style={{marginTop: '50%'}}
            />
          ) : (
            <Animated.FlatList
              style={{
                transform: [
                  {
                    scale: tabIndexPos.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ],
              }}
              data={[months[new Date().getMonth()]]}
              keyExtractor={(item) => item.month.toString()}
              renderItem={({item}) => (
                <MonthOfCalendar
                  month={item.month - 1}
                  item={item}
                  booked_days={() =>
                    !isMyDoctorReducerLoading && FindMyUniqueDate()
                  }
                />
              )}
            />
          )
        ) : null}
      </ContentContainer>
      <BottomNavigation />
    </View>
  );
});

const AppointmentScreenStyle = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  HeaderPrimaryText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  SwitchSliderContainer: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 38,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  SwitchSliderTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderRadius: 38,
  },
  SwitchSliderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  SwitchSliderTextActive: {
    color: '#fff',
  },
  SwitchSlider: {
    position: 'absolute',
    backgroundColor: '#6231CB',
    height: 60,
    width: '50%',
    left: '0%',
    borderRadius: 38,
    zIndex: -10,
  },
});
export default React.memo(Home1);

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import {
//       View,
//       FlatList,
//       StyleSheet,
//       Text,
//       useWindowDimensions,
// } from 'react-native';
// import calculateMonths from '../../../utils/calculateMonths.utils';

// const MonthOfCalendar = ({ month, item, booked_days }) => {
//       const dimen = useWindowDimensions();
//       const [dayNdate, setdayNdate] = useState([]);
//       var booked = []
//       const months = useRef([
//             {
//                   month: 1,
//                   name: 'January',
//             },
//             {
//                   month: 2,
//                   name: 'February',
//             },
//             {
//                   month: 3,
//                   name: 'March',
//             },
//             {
//                   month: 4,
//                   name: 'April',
//             },
//             {
//                   month: 5,
//                   name: 'May',
//             },
//             {
//                   month: 6,
//                   name: 'June',
//             },
//             {
//                   month: 7,
//                   name: 'July',
//             },
//             {
//                   month: 8,
//                   name: 'August',
//             },
//             {
//                   month: 9,
//                   name: 'September',
//             },
//             {
//                   month: 10,
//                   name: 'October',
//             },
//             {
//                   month: 11,
//                   name: 'November',
//             },
//             {
//                   month: 12,
//                   name: 'December',
//             },
//       ]).current;

//       const calculateMonthsOnMount = useCallback(() => {
//             const arr = calculateMonths(month);
//             const Timeout = setTimeout(() => {
//                   setdayNdate(arr);
//             }, 100);
//             return () => clearTimeout(Timeout);
//       }, [dayNdate]);

//       useEffect(() => {
//             console.log('****************************')
//             booked_days.map(dayw => {
//                   console.log(dayw.bookedFor.slice(0, 10))
//                   booked.push(dayw.bookedFor.slice(0, 10))
//             })

//             console.log(new Set(booked))
//             console.log('****************************')

//       }, [calculateMonthsOnMount]);
//       return (
//             <View style={MonthOfCalendarStyles.Container}>
//                   <View style={MonthOfCalendarStyles.Header}>
//                         <Text style={MonthOfCalendarStyles.HeaderText}>
//                               {months[item.month - 1].name} 2020
//                         </Text>
//                   </View>
//                   <View style={MonthOfCalendarStyles.ContentContainer}>
//                         <FlatList
//                               listKey={item.month.toString()}
//                               data={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
//                               numColumns={7}
//                               keyExtractor={item => item.toString()}
//                               renderItem={({ item }) => (
//                                     <View
//                                           style={{
//                                                 width: (dimen.width - 40) / 7,
//                                                 height: (dimen.width - 100) / 7,
//                                                 alignItems: 'center',
//                                                 justifyContent: 'center',
//                                           }}>
//                                           <Text style={{ fontWeight: '600' }}>{item}</Text>
//                                     </View>
//                               )}
//                         />
//                         <FlatList
//                               listKey={item.name + item.month}
//                               data={dayNdate}
//                               numColumns={7}
//                               keyExtractor={item => item.date.toString()}
//                               renderItem={({ item }) => (
//                                     <View
//                                           style={{
//                                                 width: (dimen.width - 40) / 7,
//                                                 height: (dimen.width - 40) / 7,
//                                                 alignItems: 'center',
//                                                 justifyContent: 'center',
//                                                 borderColor: 'rgba(0,0,0,0.1)',
//                                                 borderWidth: 0.2,
//                                           }}>
//                                           <Text
//                                                 style={[
//                                                       {
//                                                             fontWeight: '700',
//                                                             width: 20,
//                                                             textAlign: 'center',
//                                                             borderRadius: 2,
//                                                       },
//                                                       item.date.toString().length > 0 && {
//                                                             backgroundColor: '#F4C130',
//                                                             color: '#fff',
//                                                       },
//                                                 ]}>
//                                                 {item.date}
//                                           </Text>
//                                     </View>
//                               )}
//                         />
//                   </View>
//             </View>
//       );
// };

// const MonthOfCalendarStyles = StyleSheet.create({
//       Container: {
//             height: 'auto',
//             marginLeft: 20,
//             marginRight: 20,
//       },
//       Header: {},
//       HeaderText: {
//             fontSize: 20,
//             fontWeight: 'bold',
//             letterSpacing: 0.5,
//       },
//       ContentContainer: {
//             borderWidth: 0.2,
//             borderColor: 'rgba(0,0,0,0.08)',
//       },
// });
// export default MonthOfCalendar;
