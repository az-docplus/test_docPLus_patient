import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useDispatch, useSelector } from 'react-redux';
import ButtonCompo from '../../../components/atoms2/button/button';
import {
  GetAppointments,
  GetRecentPatient,
} from '../../../reduxV2/action/DoctorAction';
import { Host } from '../../../utils/connection';
import { WaitingRoomSocket } from '../../../utils/socket';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import PicturelessAvatar from '../../../components/atoms/PicturelessAvatar/PicturelessAvatar';
import { Local } from '../../../i18n';
import { Colors } from '../../../styles/colorsV2';
import { loggedIn } from '../../../reduxV2/action/AuthAction';
import { signedUp } from './../../../reduxV2/action/AuthAction';
const EvilIconsIcon = ({ size, name, color = '#7B7A79' }) => (
  <EvilIcons size={size} name={name} color={color} />
);

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const LandingPage = ({ navigation }) => {
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
  const { userData, theme, isLoggedin, loggingIn, signingUp } = useSelector(
    (state) => state.AuthReducer,
  );

  setTimeout(() => {
    if (loggingIn) {
      dispatch(loggedIn());
    } else {
      if (signingUp) {
        dispatch(signedUp());
      }
    }
  }, 10000);
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
  const [state, setState] = useState({
    selectedAppointment: null,
  });
  const { isPatientAccountReducerLoading } = useSelector(
    (state) => state.PatientReducer,
  );
  const [Revenue, setRevenue] = useState(0);
  const [PatientWaiting, setPatientWaiting] = useState([]);
  const [imageSource, setImageSource] = useState(null);
  useEffect(() => {
    if (doctorProfile?.picture?.length) {
      setImageSource({
        uri: `${Host}${doctorProfile?.picture[0]
          ?.replace('public', '')
          .replace('\\\\', '/')}`,
      });
    } else {
      setImageSource(require('../../../assets/images/dummy_profile.png'));
    }
  }, [doctorProfile]);

  useEffect(() => {
    !recentPatientLoading && dispatch(GetRecentPatient(userData._id));
  }, []);
  useEffect(() => {
    dispatch(GetAppointments(userData._id));
    dispatch(
      GetAppointments(userData._id, (data) => {
        console.log('data :: ', data);
        setappointments(data.reverse());
      }),
    );
    !gettingAppointment &&
      dispatch(
        GetAppointments(userData._id, (data) => {
          console.log('data :: ', data);
          setappointments(data.reverse());
        }),
      );
  }, []);

  // console.log('dc=============', doctorProfile);
  console.log('dc=============', userData);
  return (
    <View
      style={{
        // marginHorizontal: 15,
        paddingVertical: 10,
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 30 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Image
                source={require('../../../assets/icons/hamburger_menu.png')}
                style={{
                  width: 24,
                  height: 24,
                  transform: [{ rotateY: '180deg' }],
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            {loggingIn ? (
              <Text
                style={{
                  color: '#297281',
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 20,
                }}>
                {`${Local('doctor.V2.Doctor_screen.Home.welcome_back')}`}
              </Text>
            ) : null}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={{ marginLeft: 8 }}>
                <EvilIconsIcon name="bell" size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('onboarding')}
                style={{ marginLeft: 8, alignItems: 'center' }}>
                {doctorProfile?.picture?.length > 0 ? (
                  <Image
                    source={imageSource}
                    style={{ width: 40, height: 40, borderRadius: 100 }}
                  />
                ) : (
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'lightgrey',
                      borderRadius: 50,
                      marginTop: 15,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        padding: 1,
                      }}>
                      {userData?.firstName[0]} {userData?.lastName[0]}
                    </Text>
                  </View>
                )}

                <Text
                  style={{ fontFamily: 'Montserrat-Regular', color: 'black' }}>
                  {/* {`${Local('doctor.V2.Doctor_screen.Home.Hi')}`},{' '}
                  {userData?.firstName} */}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginHorizontal: 5, marginTop: 15 }}>
            <View>
              {signingUp ? <WelcomeNewUser navigation={navigation} /> : null}

              {/* Next AppointmentCard */}
              {state?.appointmentsDetails && (
                <NextAppointmentCard
                  navigation={navigation}
                  appointmentsDetails={
                    state.selectedAppointment?.appointmentsDetails
                  }
                />
              )}
              {/* WaitingRoom and RevenueCard */}
              <View
                style={{
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 20,
                  marginHorizontal: 15,
                  // marginVertical: 10,
                }}>
                <RevenueCard navigation={navigation} />
                <WaitingRoomCard
                  navigation={navigation}
                  PatientWaiting={PatientWaiting}
                />
              </View>

              {/* Upcoming Appointment */}
              <UpcomingAppointmentCard
                navigation={navigation}
                data={appointments}
              />

              {/* Recent Appointment */}
              <PatientCard navigation={navigation} data={recentPatient} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const UpcomingAppointmentCard = ({ data, navigation }) => {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: '#FFFFFF',
        elevation: 10,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 2,
        shadowRadius: 2,
        borderRadius: 20,
        marginHorizontal: 15,
        marginVertical: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            //   padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            width: 35,
            height: 35,
            backgroundColor: '#289BC5',
          }}>
          <Fontisto size={20} color="#FFFFFF" name="clock" />
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 18,
              lineHeight: 28,
              color: '#000000',
              marginHorizontal: 10,
            }}>
            {`${Local(
              'doctor.V2.Doctor_screen.Home.upcomming_appointment_card.Next_Appointment',
            )}`}
          </Text>
        </View>
      </View>
      <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
        <View>
          {data && data.length > 0 ? (
            <FlatList
              data={data}
              keyExtractor={(e) => e.toString()}
              renderItem={({ item, index }) => {
                return (
                  <AppointmentListItem
                    key={index}
                    navigation={navigation}
                    item={item}
                  />
                );
              }}
            />
          ) : (
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                fontFamily: 'Gilroy-SemiBold',
                color: '#7B7A79',
              }}>
              {`${Local(
                'doctor.V2.Doctor_screen.Home.upcomming_appointment_card.No_next_appointments',
              )}`}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
        <Text
          style={{
            display: data.length > 0 ? 'flex' : 'none',
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'Gilroy-SemiBold',
            color: '#077EE9',
          }}>
          {`${Local(
            'doctor.V2.Doctor_screen.Home.upcomming_appointment_card.button',
          )}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const AppointmentListItem = ({ item, navigation }) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
      }}>
      <View
        style={{
          flexDirection: 'row',
          //   borderBottomWidth: 1,
          //   borderBottomColor: 'lightgray',
          marginVertical: 10,
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Entypo size={20} color="#077EE9" name="dot-single" />
          <View>
            <Text
              style={{
                color: '#000000',
                fontSize: 16,
                fontFamily: 'Gilroy-Medium',
                lineHeight: 19,
              }}>
              {item?.patient?.firstName + ' ' + item?.patient?.lastName} -{' '}
              {item?.reasonForVisit}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat',
                }}>
                {moment(item.bookedFor).format(`DD MMM 'YY`)}
              </Text>
              <Text
                style={{
                  color: '#077EE9',
                  fontSize: 20,
                  marginHorizontal: 10,
                }}>
                |
              </Text>
              <Text
                style={{
                  color: '#7B7A79',
                  fontFamily: 'Montserrat',
                }}>
                {moment(item.bookedFor).format('hh:mm A')}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Appointments', {
              bookedFor: item?.bookedFor,
            })
          }>
          <AntDesign
            style={{ marginLeft: 15 }}
            size={20}
            color="#EA1A65"
            name="right"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const PatientCard = ({ data, navigation }) => {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: '#FFFFFF',
        elevation: 10,
        borderRadius: 20,
        marginHorizontal: 15,
        marginVertical: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            //   padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            width: 35,
            height: 35,
            backgroundColor: '#289BC5',
          }}>
          <MaterialCommunityIcons size={20} color="#FFFFFF" name="tab-plus" />
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 18,
              lineHeight: 28,
              color: '#000000',
              marginHorizontal: 10,
            }}>
            {`${Local(
              'doctor.V2.Doctor_screen.Home.recent_patient_card.recent_patients',
            )}`}
          </Text>
        </View>
      </View>
      <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
        <View>
          {data && data.length > 0 ? (
            <FlatList
              data={data}
              keyExtractor={(e) => e.toString()}
              renderItem={({ item, index }) => {
                return (
                  item.patient && (
                    <PatientListItem
                      key={index}
                      navigation={navigation}
                      item={item}
                    />
                  )
                );
              }}
            />
          ) : (
            <Text
              style={{
                fontSize: 14,
                textAlign: 'center',
                fontFamily: 'Gilroy-SemiBold',
                color: '#7B7A79',
              }}>
              {`${Local(
                'doctor.V2.Doctor_screen.Home.recent_patient_card.No_next_appointments',
              )}`}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('PatientsList')}>
        <Text
          style={{
            display: data.length > 0 ? 'flex' : 'none',
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'Gilroy-SemiBold',
            color: '#077EE9',
          }}>
          {`${Local(
            'doctor.V2.Doctor_screen.Home.upcomming_appointment_card.button',
          )}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const PatientListItem = ({ item, navigation }) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          //   borderBottomWidth: 1,
          //   borderBottomColor: 'lightgray',
          marginVertical: 10,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Entypo size={20} color="#077EE9" name="dot-single" />
          <View>
            <Text
              style={{
                color: '#000000',
                fontSize: 16,
                fontFamily: 'Gilroy-Medium',
                lineHeight: 19,
              }}>
              {item?.patient?.firstName + ' ' + item?.patient?.lastName} -{' '}
              {item?.reasonForVisit}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat',
                }}>
                {moment(item.bookedFor).format(`DD MMM 'YY`)}
              </Text>
              <Text
                style={{
                  color: '#077EE9',
                  fontSize: 20,
                  marginHorizontal: 10,
                }}>
                |
              </Text>
              <Text
                style={{
                  color: '#7B7A79',
                  fontFamily: 'Montserrat',
                }}>
                {moment(item.bookedFor).format('hh:mm A')}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Appointments', {
              bookedFor: item?.bookedFor,
            })
          }>
          <AntDesign
            style={{ marginLeft: 15 }}
            size={20}
            color="#EA1A65"
            name="right"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RevenueCard = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        marginRight: 5,
        // width: '100%',
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        elevation: 10,
        height: '100%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
        }}>
        <FontAwesome5 size={18} color="#2598C9" name="wallet" />
        <Text
          style={{
            fontFamily: 'Gilroy-SemiBold',
            fontSize: 19,
            lineHeight: 28,
            color: '#000000',
            marginHorizontal: 10,
          }}>
          {`${Local('doctor.V2.Doctor_screen.Home.revenue_card.earning')}`}
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontFamily: 'Gilroy-SemiBold',
            fontSize: 30,
            // lineHeight: 20,
            textAlign: 'center',
          }}>
          ₹ 0.0K
        </Text>
        <Text
          style={{
            fontFamily: 'Gilroy-Regular',

            fontSize: 13,
            lineHeight: 28,
            color: '#666666',
            textAlign: 'center',
          }}>
          {`${Local(
            'doctor.V2.Doctor_screen.Home.revenue_card.Approximate_revenue_for',
          )}`}
        </Text>
        <Text
          style={{
            fontFamily: 'Gilroy-Medium',

            fontSize: 15,
            lineHeight: 28,
            color: '#EA1A65',
            textAlign: 'center',
          }}>
          December
        </Text>
        <TouchableOpacity
          // onPress={() => navigation.navigate('AddPrescription')}
          style={{
            elevation: 10,
            // borderWidth: 1,
            // borderColor: '#0676D5',
            // paddingVertical: 1,
            padding: 15,
            paddingHorizontal: 20,
            borderRadius: 30,
            alignItems: 'center',
            backgroundColor: '#FFFFFF',

            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 15,

              fontFamily: 'Gilroy-SemiBold',
              color: '#077EE9',
            }}>
            {`${Local('doctor.V2.Doctor_screen.Home.revenue_card.button')}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WaitingRoomCard = ({ PatientWaiting, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        marginLeft: 5,
        // width: '100%',
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        elevation: 10,
        height: '100%',
        // paddingHorizontal: 18,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
        }}>
        <FontAwesome5 size={20} color="#2598C9" name="users" />
        <View>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 19,
              lineHeight: 28,
              color: '#000000',
              marginHorizontal: 10,
            }}>
            {`${Local(
              'doctor.V2.Doctor_screen.Home.waiting_room_card.Waiting_room',
            )}`}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontFamily: 'Gilroy-SemiBold',
            fontSize: 30,
            // lineHeight: 20,
            textAlign: 'center',
          }}>
          {PatientWaiting?.length > 0 ? PatientWaiting?.length : '00'}
        </Text>
        <Text
          style={{
            fontFamily: 'Gilroy-Regular',

            fontSize: 13,
            lineHeight: 28,
            color: '#666666',
            textAlign: 'center',
          }}>
          {`${Local(
            'doctor.V2.Doctor_screen.Home.waiting_room_card.Patients_waiting_to_be',
          )}`}
        </Text>
        <Text
          style={{
            fontFamily: 'Gilroy-Medium',

            fontSize: 13,
            lineHeight: 28,
            color: '#666666',
            textAlign: 'center',
          }}>
          attended
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('WaitingRoom')}
          style={{
            elevation: 10,
            // borderWidth: 1,
            // borderColor: '#0676D5',
            // paddingVertical: 1,
            padding: 15,
            paddingHorizontal: 20,
            borderRadius: 30,
            alignItems: 'center',
            backgroundColor: '#2D7D8E',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 14,

              fontFamily: 'Gilroy-Bold',
              color: '#FFFFFF',
            }}>
            {`${Local(
              'doctor.V2.Doctor_screen.Home.waiting_room_card.button',
            )}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WelcomeNewUser = ({ navigation }) => {
  return (
    <View style={{ marginHorizontal: 15 }}>
      <LinearGradient
        colors={['#047B7B', '#56BABA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradient}>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Bold',
                fontSize: 25,
                lineHeight: 28,
                color: '#FFFFFF',
                marginHorizontal: 10,
              }}>
              {`${Local('doctor.V2.Doctor_screen.Home.new_user.Welcome!')}`}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',
              marginHorizontal: 10,
              fontSize: 18,
              lineHeight: 28,
              color: '#FFFFFF',
            }}>
            {`${Local('doctor.V2.Doctor_screen.Home.new_user.Thank')}`}
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',
              marginHorizontal: 10,
              fontSize: 18,
              lineHeight: 28,
              color: '#FFFFFF',
            }}>
            {`${Local(
              'doctor.V2.Doctor_screen.Home.new_user.healthcare_more',
            )}`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('WaitingRoom')}
              style={{
                // borderWidth: 1,
                // borderColor: '#0676D5',
                // paddingVertical: 1,
                marginTop: 10,
                padding: 12,
                paddingHorizontal: 20,
                borderRadius: 30,
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#FFFFFF',
              }}>
              <Text
                style={{
                  fontSize: 17,

                  fontFamily: 'Gilroy-SemiBold',
                  color: '#297281',
                }}>
                {`${Local(
                  'doctor.V2.Doctor_screen.Home.new_user.Explore_docplus',
                )}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const NextAppointmentCard = ({ appointmentsDetails, navigation }) => {
  return (
    <View>
      <LinearGradient
        colors={['#047B7B', '#56BABA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradient}>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign size={20} name="calendar" color="#FFFFFF" />
            <Text
              style={{
                fontFamily: 'Gilroy-Bold',
                fontSize: 25,
                lineHeight: 28,
                color: '#FFFFFF',
                marginHorizontal: 10,
              }}>
              {`${Local(
                'doctor.V2.Doctor_screen.Home.Next_appointment_card.Next_Appointment',
              )}`}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',

              fontSize: 15,
              lineHeight: 28,
              color: '#FFFFFF',
            }}>
            {`${Local(
              'doctor.V2.Doctor_screen.Home.Next_appointment_card.Name',
            )}`}{' '}
            :
            {appointmentsDetails?.firstName +
              ' ' +
              appointmentsDetails?.lastName}
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',

              fontSize: 15,
              lineHeight: 28,
              color: '#FFFFFF',
            }}>
            {`${Local(
              'doctor.V2.Doctor_screen.Home.Next_appointment_card.Concern',
            )}`}{' '}
            : {appointmentsDetails?.reasonForVisit}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Medium',

                fontSize: 18,
                lineHeight: 28,
                color: '#FFFFFF',
              }}>
              {moment(appointmentsDetails.bookedFor).format(
                `DD MMM YY, hh:mm A`,
              )}
              {/* 28 Dec 21, 10:30 AM */}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('WaitingRoom')}
              style={{
                // borderWidth: 1,
                // borderColor: '#0676D5',
                // paddingVertical: 1,
                padding: 12,
                paddingHorizontal: 20,
                borderRadius: 30,
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#FFFFFF',
              }}>
              <Text
                style={{
                  fontSize: 17,

                  fontFamily: 'Gilroy-SemiBold',
                  color: '#297281',
                }}>
                {`${Local(
                  'doctor.V2.Doctor_screen.Home.Next_appointment_card.View_Details',
                )}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 25,
    // padding: 10,

    // top: 30,
  },
});
