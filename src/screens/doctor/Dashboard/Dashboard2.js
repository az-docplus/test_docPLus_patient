import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
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

const EvilIconsIcon = ({ size, name, color = '#7B7A79' }) => (
  <EvilIcons size={size} name={name} color={color} />
);

// import { parse } from 'react-native-svg';

//TODO import only necessary component in all screens which are first screen of any navigator
//TODO call APIs only if AppState is focused

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function LandingPage({ navigation }) {
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
  const { userData, theme } = useSelector((state) => state.AuthReducer);
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
  const [PatientWaiting, setPatientWaiting] = useState([]);
  const [imageSource, setImageSource] = useState(null);
  useEffect(() => {
    if (userData?.picture?.length) {
      setImageSource({
        uri: `${Host}${userData?.coverPhoto
          ?.replace('public', '')
          .replace('\\\\', '/')}`,
      });
    } else {
      setImageSource(require('../../../assets/images/dummy_profile.png'));
    }
  }, [userData]);
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

  console.log(userData.basic.name);

  console.log('dc=============', doctorProfile);
  return (
    <>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Image
              source={require('../../../assets/icons/hamburger_menu.png')}
              style={{
                width: 26,
                height: 26,
                transform: [{ rotateY: '180deg' }],
              }}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ marginLeft: 8 }}>
              <EvilIconsIcon name="bell" size={38} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              style={{ marginLeft: 8, alignItems: 'center' }}>
              {userData?.picture.length > 0 ? (
                <Image
                  source={
                    userData?.picture.length > 0
                      ? userData?.picture[0]
                      : imageSource
                  }
                  style={{ width: 50, height: 50, borderRadius: 100 }}
                />
              ) : (
                <View
                  style={{
                    height: 70,
                    width: 70,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'lightgrey',
                    borderRadius: 50,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      padding: 1,
                    }}>
                    {userData?.firstName[0]} {userData?.lastName[0]}
                  </Text>
                </View>
              )}

              <Text
                style={{ fontFamily: 'Montserrat-Regular', color: 'black' }}>
                {userData?.basic?.name}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            marginBottom: 50,
          }}>
          <View>
            {state?.appointmentsDetails && (
              <NextAppointmentCard
                navigation={navigation}
                appointmentsDetails={
                  state.selectedAppointment?.appointmentsDetails
                }
              />
            )}
          </View>
          <View>
            {PatientWaiting?.length > 0 ? (
              <WaitingRoomCard PatientWaiting={PatientWaiting} />
            ) : (
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
                  {Local('doctor.appointments.no_Patient in waitingList')}
                </Text>
              </View>
            )}
          </View>
          {appointments.length > 0 && (
            <View>
              <AppointmentsList
                navigation={navigation}
                icon={require('../../../assets2/logo/time-icon.png')}
                title="Upcoming Appointments"
                data={appointments}
              />
            </View>
          )}
          {recentPatient.length > 0 && (
            <View>
              <PatientList
                navigation={navigation}
                icon={require('../../../assets2/logo/react-icon.png')}
                title="Recent Patients"
                data={recentPatient}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

export default LandingPage;

const AppointmentsList = ({ data, title, icon, navigation }) => {
  return (
    <View
      style={{
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 15,
        backgroundColor: '#fff',
        elevation: 7,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 14,
          marginHorizontal: 18,
          marginBottom: 20,
        }}>
        <Image source={icon} />
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            marginLeft: 7,
          }}>
          {title}
        </Text>
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(e) => e.toString()}
          renderItem={({ item, index }) => {
            return <AppointmentListItem item={item} />;
          }}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
        <Text
          style={{
            marginVertical: 20,
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 16,
            textAlign: 'center',
            color: '#077EE9',
          }}>
          View All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const AppointmentListItem = ({ item }) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#D4D4D4',
        paddingBottom: 12,
        display: 'flex',
        justifyContent: 'space-between',
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 5,
              height: 5,
              backgroundColor: '#077EE9',
              borderRadius: 100,
              marginRight: 8,
            }}
          />
          <Text>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 14,
              }}>
              {item?.patient?.firstName + ' ' + item?.patient?.lastName} -{' '}
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
              }}>
              {item.reasonForVisit}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
            marginTop: 6,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
            }}>
            {moment(item.bookedFor).format(`DD MMM 'YY`)}
          </Text>
          <View
            style={{
              width: 3,
              backgroundColor: '#077EE9',
              height: 13,
              borderRadius: 12,
              marginHorizontal: 10,
            }}
          />
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color: '#7B7A79',
            }}>
            {moment(item.bookedFor).format('hh:ss')}
            {/* {item.lefttime} */}
          </Text>
        </View>
      </View>
      <View>
        <EvilIconsIcon name="chevron-right" size={30} color="#EA1A65" />
      </View>
    </View>
  );
};

const PatientList = ({ data, title, icon, navigation }) => {
  return (
    <View
      style={{
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 15,
        backgroundColor: '#fff',
        elevation: 7,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 14,
          marginHorizontal: 18,
          marginBottom: 20,
        }}>
        <Image source={icon} />
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            marginLeft: 7,
          }}>
          {title}
        </Text>
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(e) => e.toString()}
          renderItem={({ item, index }) => {
            return item.patient && <PatientListItem item={item} />;
          }}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('PatientsList')}>
        <Text
          style={{
            marginVertical: 20,
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 16,
            textAlign: 'center',
            color: '#077EE9',
          }}>
          View All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const PatientListItem = ({ item }) => {
  const { patient, appointment } = item ? item : {};
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#D4D4D4',
        paddingBottom: 12,
        justifyContent: 'space-between',
      }}>
      <View style={{}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 5,
              height: 5,
              backgroundColor: '#077EE9',
              borderRadius: 100,
              marginRight: 8,
            }}
          />
          <Text>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 14,
              }}>
              {patient.firstName + ' ' + patient.lastName} -{' '}
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
              }}>
              {appointment.reasonForVisit}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
            marginTop: 6,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
            }}>
            {moment(appointment.bookedFor).format("DD MMM 'YY")}
          </Text>
          <View
            style={{
              width: 3,
              backgroundColor: '#077EE9',
              height: 13,
              borderRadius: 12,
              marginHorizontal: 10,
            }}
          />
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color: '#7B7A79',
            }}>
            {moment(appointment.bookedFor).format('hh:ss')}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '20%',
          alignItems: 'center',
        }}>
        <EvilIconsIcon name="chevron-right" size={30} color="#EA1A65" />
      </View>
    </View>
  );
};

const NextAppointmentCard = ({ appointmentsDetails, navigation }) => {
  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#1174EE', '#023778']}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 20,
          elevation: 7,
          marginTop: 26,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <EvilIconsIcon name="calendar" color="#fff" size={25} />
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 20,
              color: '#fff',
              marginLeft: 3,
            }}>
            Next Appointment
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <Text
            style={{
              width: '25%',
              fontFamily: 'Montserrat-Regular',
              color: '#fff',
            }}>
            Name
          </Text>
          <Text
            style={{
              width: '75%',
              fontFamily: 'Montserrat-SemiBold',
              color: '#fff',
            }}>
            {appointmentsDetails.firstName + ' ' + appointmentsDetails.lastName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <Text
            style={{
              width: '25%',
              fontFamily: 'Montserrat-Regular',
              color: '#fff',
            }}>
            {'Cause'}
            {/* {appointmentsDetails.reasonForVisit} */}
          </Text>
          <Text
            style={{
              width: '75%',
              fontFamily: 'Montserrat-SemiBold',
              color: '#fff',
            }}>
            : {appointmentsDetails.reasonForVisit}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: '#fff',
            }}>
            {moment(appointmentsDetails.bookedFor).format(`DD MMM 'YY hh:mm A`)}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('WaitingRoom')}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: '#023778',
                backgroundColor: '#fff',
                paddingVertical: 15,
                paddingHorizontal: 21,
                borderRadius: 100,
              }}>
              View Details
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};
const WaitingRoomCard = ({ PatientWaiting }) => {
  const imagesArray = [
    require('../../../assets/images/doc.jpg'),
    require('../../../assets/images/doc.jpg'),
    require('../../../assets/images/doc.jpg'),
    require('../../../assets/images/doc.jpg'),
    require('../../../assets/images/doc.jpg'),
  ];

  return (
    <View>
      <View
        style={{
          marginVertical: 30,
          marginHorizontal: 20,
          elevation: 7,
          paddingVertical: 15,
          paddingHorizontal: 58,
          backgroundColor: '#fff',
          borderRadius: 20,
          position: 'relative',
        }}>
        <View>
          <ScrollView style={{}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 20,
              }}>
              {PatientWaiting.map((val, index) => {
                const { patient } = val?.appointmentsDetails;
                const style = {
                  width:
                    index == 2
                      ? 70
                      : index < 2
                      ? (index + 1) * 20
                      : 40 - (index - 3) * 20,
                  height:
                    index == 2
                      ? 70
                      : index < 2
                      ? (index + 1) * 20
                      : 40 - (index - 3) * 20,
                  zIndex: index > 2 ? imagesArray.length - index - 1 : index,
                  borderRadius: 100,
                  borderWidth: 1.4,
                  borderColor: '#0D84E2',
                  margin: -3,
                  transform: [{ scale: 1.2 }],
                };
                const img = patient?.coverPhoto ? (
                  <Image
                    source={{
                      uri: `${Host}${coverPhoto
                        .replace('public', '')
                        .replace('\\\\', '/')}`,
                    }}
                    style={style}
                  />
                ) : (
                  <PicturelessAvatar
                    style={style}
                    textStyle={{ fontSize: 32 }}
                    text={`${patient.firstName[0]} ${patient.lastName[0]}`}
                  />
                );
                return img;
              })}
            </View>
          </ScrollView>
        </View>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 18,
            textAlign: 'center',
          }}>
          Waiting Room
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            textAlign: 'center',
            fontSize: 28,
          }}>
          {PatientWaiting.length > 9
            ? PatientWaiting.length
            : '0' + PatientWaiting.length}
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            textAlign: 'center',
            fontSize: 14,
            color: '#666666',
            paddingVertical: 12,
          }}>
          Patients Waiting to be attended
        </Text>
        <ButtonCompo
          title="See Patients"
          textStyle={{
            fontSize: 17,
          }}
          pressHandler={() => {}}
        />
      </View>
    </View>
  );
};
