import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  ActivityIndicator,
  BackHandler,
  Button
} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import ProfilePic from '../../../components/atoms/ProfilePic/ProfilePic';
import Clock from '../../../assets/svg/clock.svg';
import RecentPatients from '../../../assets/svg/recent_patients.svg';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import BlurLoader from '../../../components/molecules/Modal/BlurLoadingOverlay';
import {
  FONT_SIZE_12,
  FONT_SIZE_10,
  FONT_SIZE_28,
  FONT_SIZE_16,
  FONT_SIZE_24,
  FONT_SIZE_20,
} from '../../../styles/typography';
import {
  GetRecentPatient,
  GetAppointments,
} from '../../../reduxV2/action/DoctorAction';
import { Host } from '../../../utils/connection';
import NetInfo from '@react-native-community/netinfo';
import { RowLoader } from '../../../components/atoms/Loader/Loader';

import { Colors } from '../../../styles/colorsV2';
import LottieView from 'lottie-react-native';
// import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import NetworkStatus from '../../../components/atoms/NetworkStatus/NetworkStatus';
import { NEW_PRIMARY_BACKGROUND } from '../../../styles/colors';
import { colors } from 'react-native-elements';

import I18n from 'react-native-i18n';
import { Local, setLocale } from '../../../i18n';


function Dashboard({ navigation }) {


  const {
    recentPatient,
    recentPatientLoading,
    doctorProfile,
    gettingAppointment,
    errorGettingAppointment,
  } = useSelector((state) => state.DoctorReducer);
  const [appointments, setappointments] = useState(
    useSelector((state) => state.DoctorReducer.appointments),
  );
  const { isPatientAccountReducerLoading } = useSelector(
    (state) => state.PatientReducer,
  );
  const [Revenue, setRevenue] = useState(0);
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const [imageSource, setImageSource] = useState(
    require('../../../assets/images/dummy_profile.png'),
  );

  useEffect(() => {
    // console.log(doctorProfile?.deviceToken, "kdfjsdlkfjdskljfdslkjf")
    if (doctorProfile?.picture?.length) {
      setImageSource({
        uri: `${Host}${doctorProfile?.coverPhoto?.replace('public', '')
          .replace('\\\\', '/')}`,
      });
    } else {
      setImageSource(require('../../../assets/images/dummy_profile.png'));
    }
  }, [doctorProfile]);

  const dispatch = useDispatch();
  useEffect(() => {
    !recentPatientLoading && dispatch(GetRecentPatient(userData._id));
  }, []);
  useEffect(() => {
    // dispatch(GetAppointments(userData._id));
    !gettingAppointment && dispatch(GetAppointments(userData._id, (data) => {
      setappointments(data.reverse())
    }));
  }, []);


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

  useEffect(() => {
    const backAction = () => {
      // navigation.navigate("LandingPage")
      // setActive("allDoctors")
      // setState(doctors);
      /*  Alert.alert("Hold on!", "Are you sure you want to go back?", [
         {
           text: "Cancel",
           onPress: () => null,
           style: "cancel"
         },
         { text: "YES", onPress: () => BackHandler.exitApp() }
       ]); */
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (typeof appointments === 'string') return;
    let revenue = 0;
    appointments.map((a) => {
      if (a.amount) {
        revenue = revenue + parseInt(a.amount);
      }
    });
    const appointment = appointments.filter((item) => {
      if (new Date(item.bookedFor) > new Date()) return item;
    });
    setRevenue(revenue);
    setappointments(appointment);
  }, [doctorProfile]);

  useEffect(() => {
    // console.log(Revenue)
  }, [Revenue])

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
      <StatusBar
        animated
        backgroundColor={Colors.secondary_background[theme]}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
      />
      {/* {isPatientAccountReducerLoading && (
        <BlurLoader visible={isPatientAccountReducerLoading}>
          <ActivityIndicator color={NEW_PRIMARY_BACKGROUND} size="large" />
        </BlurLoader>
      )} */}
      <NetworkStatus isConnected={isConnected} />
      <View
        style={{ flex: 1, backgroundColor: Colors.primary_background[theme] }}>
        <TopNavBar
          navigation={navigation}
          onLeftButtonPress={() => {}}
          headerText={`${Local("doctor.dashboard.my_dashboard")}`}
          LeftComp={
            <ProfilePic
              style={{
                Container: {
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                },
                Image: { borderRadius: 50 },
              }}
              sourceurl={imageSource}></ProfilePic>
          }>
        </TopNavBar> 
        <ScrollView contentContainerStyle={{
          paddingBottom: "10%"
        }}>
          <View
            style={{
              width: '85%',
              alignSelf: 'center',
              flexDirection: 'row',
              paddingTop: '5%',
              justifyContent: 'space-between',
            }}>
            {/* <View
              style={{
                height: 'auto',
                width: '55%',
                backgroundColor: '#e6f7f5',
                borderRadius: 15,
                paddingHorizontal: '5%',
                paddingVertical: '4%',
              }}>
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  paddingBottom: '10%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                    backgroundColor: Colors.ctx_primary_color[theme],
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: FONT_SIZE_28,
                      lineHeight: 32,
                      fontWeight: 'bold',
                      color: '#fff',
                    }}>
                    +
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: FONT_SIZE_16,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Waiting Room
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: '5%',
                }}>
                <Text
                  style={{
                    fontSize: FONT_SIZE_28,
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  04
                </Text>
                <Text
                  style={{
                    fontSize: FONT_SIZE_12,
                    paddingHorizontal: '10%',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Patients waiting to be attended
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  paddingVertical: '4%',
                }}>
                <Text
                  style={{
                    color: '#ef786e',
                    fontSize: FONT_SIZE_12,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Approx. wait time: 12 mins
                </Text>
              </View>
            </View>*/}
            <View
              style={{
                width: '100%',
                alignSelf: 'stretch',
                backgroundColor: Colors.revenue_background[theme],
                // backgroundColor: "#e6f7f5",
                borderRadius: 15,
                paddingHorizontal: '5%',
                paddingVertical: '4%',
              }}>
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  paddingBottom: '10%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  //         justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                    backgroundColor: '#37acac',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: FONT_SIZE_24,
                      lineHeight: 28,
                      fontWeight: 'bold',
                      fontFamily: 'Montserrat-Bold',
                      color: '#fff',
                    }}>
                    $
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: FONT_SIZE_16,
                    fontFamily: 'Montserrat-Medium',
                    marginLeft: '5%',
                    color: Colors.primary_text_color[theme],
                  }}>
                  {Local('doctor.dashboard.revenue')}
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: '5%',
                }}>
                <Text
                  style={{
                    fontSize: FONT_SIZE_28,
                    fontFamily: 'Montserrat-Bold',
                    color: Colors.primary_text_color[theme],
                  }}>
                  ₹{(Revenue / 1000).toFixed(1)}K
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  paddingVertical: '4%',
                }}>
                <Text style={{ fontSize: 16, color: Colors.primary_text_color[theme], fontFamily: 'Montserrat-Medium' }}>
                  {Local("doctor.dashboard.approx_revenue")}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '85%',
              alignSelf: 'center',
              marginTop: '5%',
              paddingVertical: '5%',
              // backgroundColor: '#fcf0e4',
              backgroundColor: Colors.appointment_background[theme],
              paddingHorizontal: '4%',
              borderRadius: 15,
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                paddingBottom: '5%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                  backgroundColor: '#efa860',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Clock />
              </View>
              <Text
                style={{
                  fontSize: FONT_SIZE_16,
                  marginLeft: '5%',
                  fontFamily: 'Montserrat-Medium',
                  color: Colors.primary_text_color[theme],
                }}>
                {Local("doctor.dashboard.upcoming_appointments")}
              </Text>
            </View>
            {gettingAppointment ? (
              <RowLoader />
            ) : appointments.length === 0 ? (
              <View
                style={{
                  height: 160,
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
                    fontSize: 16,
                    color: Colors.primary_text_color[theme],
                  }}>
                  {Local("doctor.dashboard.no_appointments")}
                </Text>
              </View>
            ) : (
              appointments?.slice(0, 3).map((item) => {
                const { patient } = item;
                return (
                  <View
                    style={{
                      width: '90%',
                      // backgroundColor: 'red',
                      alignSelf: 'center',
                      borderBottomWidth: 1.5,
                      borderColor: 'rgba(0,0,0,0.08)',
                      paddingVertical: '4%',
                    }}>
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
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            height: 8,
                            width: 8,
                            borderRadius: 10,
                            backgroundColor: '#efa860',
                            marginRight: '1%',
                          }}></View>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginRight: '8%',
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Montserrat-Bold',
                                color: Colors.primary_text_color[theme],
                              }}>{`${patient?.firstName.toTitleCase()} ${patient?.lastName.toTitleCase()}`}</Text>
                            <Text
                              style={{
                                fontSize: FONT_SIZE_12,
                                color: Colors.primary_text_color[theme],
                                fontFamily: 'Montserrat-Medium',
                              }}>
                              {' '}
                              {item.reasonForVisit && '--'}{' '}
                              {item.reasonForVisit}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              // paddingHorizontal: '6%',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: FONT_SIZE_12,
                                marginRight: '4%',
                                fontFamily: 'Montserrat-SemiBold',
                                color: Colors.primary_text_color[theme],
                              }}>
                              {moment(item.bookedFor).format("DD MMM 'YY")}
                            </Text>
                            <Text style={{ fontWeight: '900', color: '#efa860' }}>
                              |
                            </Text>
                            <Text
                              style={{
                                fontSize: FONT_SIZE_12,
                                marginLeft: '4%',
                                color: '#a09e9e',
                                fontFamily: 'Montserrat-SemiBold',
                              }}>
                              {moment(item.bookedFor).format('HH:mm')}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <TouchableOpacity
                        onPress={() => navigation.navigate('Appointments', {
                          bookedFor: item?.bookedFor
                        })}>
                        <View>
                          <MaterialIcon
                            name="chevron-right"
                            size={28}
                            color={'#a09e9e'}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            )}
          </View>
          <View
            style={{
              width: '85%',
              alignSelf: 'center',
              marginTop: '5%',
              paddingVertical: '5%',
              backgroundColor: Colors.revenue_background[theme],
              // backgroundColor: "#e6f7f5",
              paddingHorizontal: '5%',
              marginBottom: '4%',
              borderRadius: 15,
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                paddingBottom: '5%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                  backgroundColor: '#37acac',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <RecentPatients />
              </View>
              <Text
                style={{
                  fontSize: FONT_SIZE_16,
                  color: Colors.primary_text_color[theme],
                  marginLeft: '5%',
                  fontFamily: 'Montserrat-Medium',
                }}>
                {Local("doctor.dashboard.recent_patients")}
              </Text>
            </View>
            {recentPatient?.length === 0 ? (
              <View
                style={{
                  height: 160,
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
                    color: Colors.primary_text_color[theme],
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 16,
                  }}>
                  {Local("doctor.dashboard.no_patient_found")}
                </Text>
              </View>
            ) : (
              recentPatient.slice(0, 3).map((item) => {
                if (item) {
                  const { _id, appointment } = item;
                  const { patient } = item ? item : {};
                  return patient ? (
                    <View
                      key={_id}
                      style={{
                        width: '90%',
                        // backgroundColor: 'red',
                        alignSelf: 'center',
                        borderBottomWidth: 1.5,
                        borderColor: 'rgba(0,0,0,0.08)',
                        paddingVertical: '4%',
                      }}>
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
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              height: 8,
                              width: 8,
                              borderRadius: 10,
                              backgroundColor: '#efa860',
                              marginRight: '1%',
                            }}></View>
                          <View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginRight: '8%',
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Montserrat-Bold',
                                  color: Colors.primary_text_color[theme],
                                }}>{`${patient?.firstName} ${patient?.lastName}`}</Text>
                              <Text
                                style={{
                                  fontSize: FONT_SIZE_12,
                                  fontFamily: 'Montserrat-Medium',
                                  color: Colors.primary_text_color[theme],
                                }}>
                                {' '}
                                {appointment.reasonForVisit && '--'}{' '}
                                {appointment.reasonForVisit}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                // paddingHorizontal: '6%',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: FONT_SIZE_12,
                                  color: Colors.primary_text_color[theme],
                                  marginRight: '4%',
                                  fontFamily: 'Montserrat-Bold',
                                }}>
                                {moment(appointment.bookedFor).format(
                                  "DD MMM 'YY",
                                )}
                              </Text>
                              <Text
                                style={{ fontWeight: '900', color: '#efa860' }}>
                                |
                              </Text>
                              <Text
                                style={{
                                  fontSize: FONT_SIZE_12,
                                  marginLeft: '4%',
                                  // color: '#a09e9e',
                                  color: Colors.patient_time[theme],
                                  fontFamily: 'Montserrat-SemiBold',
                                }}>
                                {moment(appointment.bookedFor).format('HH:ss')}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('PatientDetails', {
                              patient,
                              appointment,
                            });
                          }}>
                          <View>
                            <MaterialIcon
                              name="chevron-right"
                              size={28}
                              color={'#a09e9e'}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null;
                }
                return null;
              })
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default Dashboard;
