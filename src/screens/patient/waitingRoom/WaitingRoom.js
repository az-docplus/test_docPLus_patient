import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  BackHandler,
  Animated,
  Easing,
  ActivityIndicator,
  Image,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Avatar, Divider, Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  NEW_PRIMARY_COLOR,
  INPUT_PLACEHOLDER,
  NEW_HEADER_TEXT,
  SECONDARY_BACKGROUND,
  SECONDARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  GREY_OUTLINE,
  GREY_CARD,
  NEW_PRIMARY_LIGHT_BG,
} from '../../../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CallModal from '../../../components/molecules/Modal/CallModal';
import { connect, useSelector, useDispatch } from 'react-redux';
import { WaitingRoomSocket } from '../../../utils/socket';
const { width } = Dimensions.get('window');
import { Colors } from '../../../styles/colorsV2';
import { Local } from '../../../i18n';
import moment from 'moment';
import PicturelessAvatar from '../../../components/atoms/PicturelessAvatar/PicturelessAvatar';
import { Host } from '../../../utils/connection';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import { parse } from 'react-native-svg';
import { RemoveAppointment } from '../../../reduxV2/action/PatientAction';
import { GetAppointments } from '../../../reduxV2/action/DoctorAction';
import AntDesign from 'react-native-vector-icons/AntDesign';
const EvilIconsIcon = ({ name, size, color = '#000' }) => (
  <EvilIcons name={name} size={size} color={color} />
);

class WaitingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.theme = this.props.theme;
    this.WaitingRoomSocket = WaitingRoomSocket;
    this.appointment = this.props.route.params.appointment;
    this.doctor = this.appointment.doctor;

    this.state = {
      modalVisible: false,
      PatientWaiting: [],
      totalSeconds: 0,
    };
  }
  backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        styles: 'cancel',
      },
      { text: 'YES', onPress: () => this.navigation.goBack() },
    ]);
    return true;
  };
  componentDidMount() {
    console.log('routes');
    this.WaitingRoomSocket.emit('push_to_queue', {
      appointmentsDetails: this.appointment,
    });

    this.interval = setInterval(this.computeOngoingTime, 1000);
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }
  computeOngoingTime = () => {
    const { bookedFor } = this.appointment;
    const now = new Date();
    const date = new Date(bookedFor);

    let totalSeconds = Math.floor((date - now) / 1000);

    // let seconds = Math.floor((_totalSecBy - minutes) * 60);
    this.setState({ totalSeconds: totalSeconds });
    // setOngoingTime({type: 'seconds', seconds});
    // setOngoingTime(totalSeconds);
  };
  comparePatientsWaiting = (firstElement, secondElement) => {
    const firstBookedFor = new Date(firstElement.bookedFor).getTime();
    const secondBookedFor = new Date(secondElement.bookedFor).getTime();
    return firstBookedFor == secondBookedFor
      ? 0
      : firstBookedFor > secondBookedFor
      ? 1
      : -1;
  };
  onFetchedWaitingPatients = ({ PatientsWaiting }) => {
    console.log('patients waiting occured');
    const modifiedPatientWaiting = PatientsWaiting.sort(
      this.comparePatientsWaiting,
    );
    console.log(modifiedPatientWaiting);
    this.setState({ PatientWaiting: modifiedPatientWaiting });
  };
  onNewPatientEnqueued = ({ patientDetails }) => {
    console.log('new patient enqueued');
    const patientsWaiting = [...this.state.PatientWaiting, patientDetails];
    const modifiedPatientWaiting = patientsWaiting.sort(
      this.comparePatientsWaiting,
    );
    console.log(modifiedPatientWaiting);

    this.setState({ PatientWaiting: modifiedPatientWaiting });
  };
  setPatientStatus = (data, status) => {
    console.log(`${data.patientId} came ${status ? 'online' : 'offline'}`);
    // console.log(this.props.theme)

    const { patientId } = data;
    const modified = this.state.PatientWaiting.map((item) => {
      const { Patient } = item;
      const { _id } = Patient;
      if (patientId == _id) {
        return {
          _id: item._id,
          bookedFor: item.bookedFor,
          Patient: {
            ...item.Patient,
            online: status,
          },
        };
      } else {
        return item;
      }
    });
    this.setState({ PatientWaiting: modified });
  };
  onPatientOnline = (data) => {
    this.setPatientStatus(data, true);
  };
  onPatientOffline = (data) => {
    this.setPatientStatus(data, false);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    this.backHandler.remove();
  }
  render() {
    const { totalSeconds } = this.state;
    let hours = Math.floor(totalSeconds / 3600);
    let _totalSecBy = (totalSeconds / 3600 - hours) * 60;
    let minutes = Math.floor(_totalSecBy);
    return (
      <View
        style={[
          styles.mianContainer,
          {
            backgroundColor: '#FFFFFF',
          },
        ]}>
        <CallModal
          visible={this.state.modalVisible}
          onCancel={() => this.setState({ modalVisible: false })}
          onVoiceCall={() => {
            // navigation.navigate('videoCall', {});
          }}
          onVideoCall={() => {
            // navigation.navigate();
          }}
        />
        <TopNavBar
          navigation={this.navigation}
          headerText={`${Local('doctor.waiting.WaitingRoom')}`}
        />
        {/* <TopNavBar
          headerText="WaitingRoom"
          // style={{ Container: { marginTop: 5, marginBottom: 10 } }}
          navigation={}
        /> */}
        {/* <Image
          source={require('../../../assets/images/waitingRoomBanner.png')}
          style={{
            width: '100%',
            height: 130,
            resizeMode: 'contain',
          }}
        /> */}
        <ScrollView>
          <View style={{ marginBottom: 30 }}>
            <AppointmentBanner
              doctor={this.doctor}
              hours={hours}
              minutes={minutes}
              appointment={this.appointment}
              navigation={this.navigation}
              selectedAppointment={this.state.selectedAppointment}
              totalWaitingPatient={this.state.PatientWaiting.length}
              nextInLine={
                this.state.PatientWaiting.length > 1
                  ? `${this.state.PatientWaiting[1]?.appointmentsDetails?.patient?.firstName} ${this.state.PatientWaiting[1]?.appointmentsDetails?.patient?.lastName}`
                  : '---'
              }
            />
          </View>
        </ScrollView>

        <Text>hello</Text>
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <View
            style={[
              styles.tabContainer,
              {
                borderRightWidth: 1,
                backgroundColor: Colors.primary_background[this.theme],
              },
            ]}>
            <Text
              style={[
                styles.activeTabText,
                { color: Colors.primary_text_color[this.theme] },
              ]}>
              Queue
            </Text>
          </View>
        </View> */}

        {/* <View style={{flex: 1}}>
          <View
            style={{
              // height: 250,
              width: '100%',
              backgroundColor: Colors.primary_light_bg[this.theme],
              alignItems: 'center',
              padding: 30,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 18,
                color: Colors.primary_text_color[this.theme],
              }}>
              {`Dr. ${this.doctor.firstName} ${this.doctor.lastName}`}
            </Text>
            <View
              style={{
                height: 4,
                width: 70,
                backgroundColor: Colors.primary_color[this.theme],
                margin: 30,
              }}
            />
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 16,
                color: Colors.primary_text_color[this.theme],
                textAlign: 'center',
              }}>
              {''}
            </Text>
          </View>

          <View
            style={{
              borderColor: GREY_OUTLINE,
              borderBottomWidth: 1,
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 24,
                alignSelf: 'center',
              }}>{`Time remaining ${hours}:${minutes}`}</Text>
            
          </View>
          
        </View> */}
      </View>
    );
  }
}

function AppointmentBanner({
  doctor,
  hours,
  minutes,
  appointment,
  selectedAppointment,
  totalWaitingPatient,
  nextInLine,
  navigation,
}) {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const { patient } = useSelector((state) => state.PatientReducer);
  const { recentPatient } = useSelector((state) => state.DoctorReducer);
  const dispatch = useDispatch();
  const [tab, setTab] = useState('tab1');

  const cancelAppointment = (item) => {
    const data = {
      id: item,
      patientId: patient._id,
      reason: 'nil reason',
      byDoctor: true,
      byPatient: false,
    };
    // dispatch(
    //   RemoveAppointment(data, () => {
    //     dispatch(GetAppointments(doctorId));
    //     navigation.navigate('PatientLandingScreen');
    //   }),
    // );
  };

  useEffect(() => {
    // dispatch(
    //   GetPatientInfo(selectedAppointment?._id, true, () =>
    //     console.log('PATIENT INFO FETCHED<<<<<<<<<<<<<<<<'),
    //   ),
    // );
  }, []);
  // console.log(patient, "LLLLLLLLLLLLLLLLLLLLLLLLL")
  /**
   * ========= Animation control =============
   */
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.stagger(300, [
      Animated.timing(anim1, {
        toValue: 1,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(anim2, {
        toValue: 1,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(anim3, {
        toValue: 1,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value_ = {
    inputRange: [0, 1],
    outputRange: [50, 0],
  };
  const value = {
    inputRange: [0, 0.2],
    outputRange: [0, 1],
  };
  const translateY1 = anim1.interpolate(value_);
  const translateX2 = anim1.interpolate(value_);
  const translateY2 = anim1.interpolate(value_);
  const translateX3 = anim1.interpolate(value_);
  const translateY3 = anim1.interpolate(value_);
  /**
   * ========= Animation control END =============
   */

  const isActive = {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    elevation: 5,
    borderRadius: 8,
  };
  const isNotActive = {
    flex: 1,

    padding: 10,
  };

  return (
    <View
      style={[
        styles.container,
        // {backgroundColor: "#000"},
        { backgroundColor: Colors.secondary_background[theme] },
      ]}>
      <Text
        style={{
          marginHorizontal: 15,
          marginVertical: 15,
          fontFamily: 'Gilroy-SemiBold',
          fontSize: 16,
          color: '#000000',
        }}>
        {Local('doctor.waiting.Appointment_with')} :
      </Text>
      <DoctorTopCompo
        // appointmentTime={appointmentTime}
        recentPatient={recentPatient}
        coverPhoto={doctor?.coverPhoto}
        name={`${doctor?.firstName.toTitleCase()} ${doctor?.lastName.toTitleCase()}`}
        specialty={doctor?.specialty || doctor?.specialties[0]}
        study={doctor?.educationDetails}
        experience={doctor?.experience}
        price={doctor?.fee}
        id={doctor}
        reasonForVisit={appointment.reasonForVisit}
        bookedFor={appointment.bookedFor}
        // time={`${Local(
        //   'doctor.waiting.Time remaining',
        // )}: ${hours} hours and ${minutes} minutes`}
        time={` ${hours} hours and ${minutes} minutes`}
        // Slot={Slot}
      />
      <View
        style={{
          marginHorizontal: 15,
          marginVertical: 15,
          backgroundColor: '#EEEEEE',
          padding: 5,
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => setTab('tab1')}
          style={tab === 'tab1' ? isActive : isNotActive}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Gilroy-Bold',
              fontSize: 14,
              color: tab === 'tab1' ? '#EA1A65' : '#7B7A79',
            }}>
            Queue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab('tab2')}
          style={tab === 'tab2' ? isActive : isNotActive}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Gilroy-Bold',
              fontSize: 14,
              color: tab === 'tab2' ? '#EA1A65' : '#7B7A79',
            }}>
            More details
          </Text>
        </TouchableOpacity>
      </View>

      {tab === 'tab1' && (
        <View>
          <LinearGradient
            colors={['#00EFEF', '#E7FEFE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <View>
              <TouchableOpacity
                // onPress={() => {
                //   // credential && credential?.id != patient._id
                //   //   ? dispatch(GetFamilyMeberInfo(credential, patient))
                //   //   : dispatch(ContinueAsOwner())
                //   dispatch(GetFamilyMeberInfo(credential, patient));
                //   //dispatch(ContinueAs({isPatientFamilyMember : false, ...credential}))
                //   // navigation.navigate('PatientDrawerWrapper');
                // }}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  marginHorizontal: 10,
                  marginVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 155,
                  width: 110,
                }}>
                {patient?.picture ? (
                  <Image
                    source={{
                      uri: `${Host}${patient.picture
                        .replace('public', '')
                        .replace('\\\\', '/')}`,
                    }}
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 80,
                      resizeMode: 'cover',
                    }}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/icons/unsplash_OhKElOkQ3RE.png')}
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 80,
                      resizeMode: 'cover',
                    }}
                  />
                )}
                <Text
                  style={{
                    fontFamily: 'Gilroy-Medium',
                    fontSize: 15,
                    maxWidth: '80%',
                    textAlign: 'center',
                    color: patient.AddIcon && '#3188DB',
                    // marginVertical:5
                  }}>
                  {patient.firstName} {patient.lastName}
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                fontSize: 14,
                textAlign: 'center',
              }}>
              Approx. waiting time :{' '}
              <Text style={{ fontFamily: 'Gilroy-SemiBold', fontSize: 18 }}>
                {` ${hours} hours ${minutes} mins `}
              </Text>
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 50,
              marginBottom: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => cancelAppointment()}
              style={{
                borderRadius: 20,
                flexDirection: 'row',
                backgroundColor: '#FFEFEE',
                alignItems: 'center',
                padding: 8,
              }}>
              <AntDesign name="close" color="#FF0000" size={20} />
              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  color: '#FF0000',
                  fontSize: 16,
                  marginLeft: 3,
                }}>
                {`${Local('doctor.V2.booking_detail.cancel_button')}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {tab === 'tab2' && (
        <View>
          <PatientProfile
            patient={patient}
            patientInfo={JSON.parse(appointment?.patientInfo)}
            // setSwitchProfileModal={setSwitchProfileModal}
          />
          <Text
            style={{
              marginHorizontal: 20,
              marginVertical: 20,
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            Your Concerns
          </Text>
          {appointment.quiz?.map((item, i) => (
            <PatientConcernCard item={item} keyValue={i} />
          ))}
        </View>
      )}
      {/* <Animated.View
        style={[
          styles.patientDetails,
          {
            opacity: anim1.interpolate(value),
            transform: [
              {
                translateY: translateY1,
              },
            ],
          },
        ]}>
        <Text
          style={[styles.name, { color: Colors.primary_text_color[theme] }]}>
          {`Dr. ${doctor.firstName} ${doctor.lastName}`}
        </Text>
        <View style={styles.patientSubDetails}>
          <Text
            style={[
              styles.ffMedium,
              { color: Colors.primary_text_color[theme] },
            ]}>
            {patient?.age ? patient?.age : '-- '} yrs
          </Text>
          <View
            style={[styles.dot, { color: Colors.primary_text_color[theme] }]}
          />
          <Text
            style={[
              styles.ffMedium,
              { color: Colors.primary_text_color[theme] },
            ]}>
            {patient?.gender
              ? patient?.gender?.substring(0, 1).toUpperCase()
              : '--'}
          </Text>
          <View
            style={[styles.dot, { color: Colors.primary_text_color[theme] }]}
          />
          <Text
            style={[
              styles.ffMedium,
              { color: Colors.primary_text_color[theme] },
            ]}>
            {patient?.weight?.value ? patient?.weight.value : '--'} Kg
          </Text>
        </View>
      </Animated.View> */}
      {/* <Animated.View
        style={[
          styles.appointmentDetails,
          {
            opacity: anim2.interpolate(value),
            transform: [
              {
                translateX: translateX2,
              },
              {
                translateY: translateY2,
              },
            ],
          },
        ]}>
        <View style={styles.appointmentLeftSection}>
          <Text
            style={[
              styles.textLabel,
              { color: Colors.primary_text_color[theme] },
            ]}>
            {Local('doctor.waiting.reason_visit')} :{' '}
            <Text style={styles.textHighlightValue}>
              {appointment ? appointment?.reasonForVisit : '---'}
            </Text>
          </Text>
          <Text
            style={[
              styles.textLabel,
              { color: Colors.primary_text_color[theme] },
            ]}>
            {Local('doctor.waiting.last_visit')} :
            <Text
              style={[
                styles.textNormalValue,
                { color: Colors.primary_text_color[theme] },
              ]}>
              {moment(new Date()).format('DD MMM YYYY')}
            </Text>
          </Text>
        </View>
        <View style={styles.appointmentRightSection}>
          <Text
            style={[
              styles.textLabel,
              styles.darkGrey,
              { color: Colors.color_dark_grey[theme] },
            ]}>
            {Local('doctor.waiting.to_pay')}:{' '}
            <Text style={styles.textNormalValue}>
              ${appointment?.amount}
            </Text>
          </Text>
        </View>
      </Animated.View> */}
      {/* <Divider style={styles.divider} /> */}
      {/* <Animated.View
        style={[
          styles.appointmentsDetails,
          {
            opacity: anim3.interpolate(value),
            transform: [
              {
                translateX: translateX3,
              },
              {
                translateY: translateY3,
              },
            ],
          },
        ]}>
        <Text
          style={[
            styles.textLabel,
            styles.fontMedium,
            styles.darkGrey,
            { color: Colors.color_dark_grey[theme] },
          ]}>
          {Local('doctor.waiting.Time remaining')}:{' '}
          <Text
            style={[
              styles.textNormalValue,
              { color: Colors.primary_text_color[theme] },
            ]}>
            {`${hours} hours and ${minutes} minutes`}
          </Text>
        </Text>
      </Animated.View> */}
    </View>
  );
}
const PatientProfile = ({ patient, patientInfo, setSwitchProfileModal }) => {
  return (
    <View
      style={{
        marginHorizontal: 15,
        elevation: 6,
        backgroundColor: '#fff',
        borderRadius: 13,
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomColor: 'lightgray',
          borderBottomWidth: 1,
        }}>
        <Text
          style={{
            color: '#282828',
            fontFamily: 'Gilroy-SemiBold',
            fontSize: 16,
          }}>
          {`${Local('doctor.V2.appointment_detail.your_detail')}`}
        </Text>
        {/* <TouchableOpacity onPress={() => setSwitchProfileModal(true)}>
          <Text
            style={{
              color: '#EA1A65',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.appointment_detail.switch_profile')}`}
          </Text>
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          flexDirection: 'row',
        }}>
        <View>
          <TouchableOpacity
            // onPress={() => ContinueWith(patient._id)}
            // onPress={() => {
            //   // credential && credential?.id != patient._id
            //   //   ? dispatch(GetFamilyMeberInfo(credential, patient))
            //   //   : dispatch(ContinueAsOwner())
            //   dispatch(GetFamilyMeberInfo(credential, patient));
            //   //dispatch(ContinueAs({isPatientFamilyMember : false, ...credential}))
            //   // navigation.navigate('PatientDrawerWrapper');
            // }}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
              backgroundColor: 'white',
              borderRadius: 10,

              marginVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
              height: 155,
              width: 110,
            }}>
            {patient?.picture ? (
              <Image
                source={{
                  uri: `${Host}${patient.picture.replace('public', '')}`,
                }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 80,
                  resizeMode: 'cover',
                }}
              />
            ) : (
              <View
                style={{
                  height: 100,
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    backgroundColor: 'lightgrey',
                    padding: 10,
                    borderRadius: 50,
                    textTransform: 'uppercase',
                  }}>
                  {patientInfo.firstName[0]} {patientInfo.lastName[0]}
                </Text>
              </View>
            )}
            <Text
              style={{
                fontFamily: 'Gilroy-Medium',
                fontSize: 15,
                maxWidth: '80%',
                textAlign: 'center',
                color: patientInfo.AddIcon && '#3188DB',
                // marginVertical:5
              }}>
              {patientInfo.firstName} {patientInfo.lastName}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              color: '#077EE9',
              fontSize: 14,
              textAlign: 'center',
              marginTop: 5,
            }}>
            {patientInfo.age === patient.age
              ? patientInfo.age
              : moment().diff(patientInfo.age, 'years')}{' '}
            years |{patientInfo.sex}
          </Text>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 30, paddingVertical: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Medium',
                marginVertical: 12,
                color: '#666666',

                fontSize: 14,
              }}>
              {`${Local('doctor.V2.appointment_detail.details.height')}`}: -
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Medium',
                marginVertical: 12,
                color: '#666666',

                fontSize: 14,
              }}>
              {`${Local('doctor.V2.appointment_detail.details.weight')}`}: -
            </Text>
          </View>

          <Text
            style={{
              fontFamily: 'Gilroy-Medium',
              marginVertical: 12,
              color: '#666666',

              fontSize: 14,
            }}>
            {`${Local('doctor.V2.appointment_detail.details.bp')}`}: -
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',
              marginVertical: 12,
              color: '#666666',

              fontSize: 14,
            }}>
            {`${Local('doctor.V2.appointment_detail.details.temp')}`}: -
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',
              marginVertical: 12,
              color: '#666666',

              fontSize: 14,
            }}>
            {`${Local('doctor.V2.appointment_detail.details.gulucose')}`}: -
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',
              marginVertical: 12,
              color: '#666666',

              fontSize: 14,
            }}>
            {`${Local('doctor.V2.appointment_detail.details.heart_rate')}`}: -
          </Text>
        </View>
      </View>
    </View>
  );
};

const PatientConcernCard = ({ item, keyValue }) => {
  const [expand, setExpand] = useState(false);
  console.log('==============item', item);
  return (
    <View
      key={keyValue}
      style={{
        marginBottom: 10,
        marginHorizontal: 15,
        elevation: 6,
        backgroundColor: '#fff',
        borderRadius: 13,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: expand ? 'flex-end' : 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{ padding: 20 }}>
        <Text
          style={{
            marginVertical: 10,
            fontFamily: 'Gilroy-SemiBold',
            fontSize: 20,
            color: '#000000',
          }}>
          {item.questions1.a}
        </Text>
        {expand && (
          <>
            <Text
              style={{
                fontFamily: 'Gilroy-Medium',
                fontSize: 16,
                color: '#7B7A79',
                marginVertical: 10,
              }}>
              {`${Local('doctor.V2.appointment_detail.question_card.q1')}`}:{' '}
              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 16,
                  color: '#077EE9',
                }}>
                {item.questions2.a}
              </Text>
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Medium',
                fontSize: 16,
                color: '#7B7A79',
                marginVertical: 10,
              }}>
              {`${Local('doctor.V2.appointment_detail.question_card.q2')}`}:{' '}
              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 16,
                  color: '#077EE9',
                }}>
                {item.questions3.a}
              </Text>
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Medium',
                fontSize: 16,
                color: '#7B7A79',
                marginVertical: 10,
              }}>
              {`${Local('doctor.V2.appointment_detail.question_card.q3')}`}:{' '}
              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 16,
                  color: '#077EE9',
                }}>
                {item.questions4.a}
              </Text>
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Medium',
                fontSize: 16,
                color: '#7B7A79',
                marginVertical: 10,
              }}>
              {`${Local('doctor.V2.appointment_detail.question_card.q4')}`}:{' '}
              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 16,
                  color: '#077EE9',
                }}>
                {item.questions5.a}
              </Text>
            </Text>
          </>
        )}
      </View>
      <View style={{ justifyContent: 'flex-end', paddingVertical: 20 }}>
        <TouchableOpacity onPress={() => setExpand(!expand)}>
          <Entypo
            name={expand ? 'chevron-small-up' : 'chevron-small-down'}
            style={{
              fontSize: 30,
              color: '#077EE9',

              // color: NEW_PRIMARY_COLOR,
              // marginHorizontal: 4,
            }}></Entypo>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapProps = (state) => {
  // console.log(this.props.theme)
  return {
    theme: state.AuthReducer.theme,
  };
};

const DoctorTopCompo = ({
  coverPhoto,
  name,
  specialty,
  study,
  experience,
  price,
  id,
  date,
  slot,
  recentPatient,
  appointmentTime,
  reasonForVisit,
}) => {
  console.log('coverPhoto============>>>>>>>>', coverPhoto);
  // name = name?.split(' ');
  const img = coverPhoto ? (
    <Image
      source={{
        uri: `${Host}${coverPhoto.replace('public', '').replace('\\\\', '/')}`,
      }}
      style={{ width: 80, height: 80, borderRadius: 100 }}
    />
  ) : (
    <PicturelessAvatar
      style={{
        color: '#000',
        backgroundColor: '#f9f9f9',
        width: 90,
        height: 90,
        borderRadius: 100,
      }}
      textStyle={{ fontSize: 32 }}
      text={`${name[0][0]}${name[1][0]}`}
    />
  );
  return (
    <View
      style={{
        marginBottom: 20,
        marginHorizontal: 15,
        elevation: 6,
        backgroundColor: '#fff',
        borderRadius: 13,
        paddingHorizontal: 15,
        paddingVertical: 15,
        // marginTop: 23,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {img}
        <Image
          style={{
            position: 'absolute',
            height: 40,
            width: 100,
            right: '-10.9%',
            top: 5,
            resizeMode: 'contain',
          }}
          source={require('../../../assets/icons/Getplusrigh.png')}
        />
        <View
          style={{
            flex: 1,
            marginLeft: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Gilroy-SemiBold',
              }}>
              Dr. {name}
            </Text>
            {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <AntDesignIcon name="star" size={17} color="#FCC02A" />
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 14,
                marginLeft: 5,
              }}>
              {rate}
            </Text>
          </View> */}
            {/* <Favorites setLoading={() => {}} doctor={id} /> */}
          </View>
          <View
            style={{
              marginTop: 7,
            }}>
            <Text style={{ fontFamily: 'Gilroy-Regular' }}>
              <Text style={{ fontFamily: 'Gilroy-Regular' }}>
                {specialty} |{' '}
              </Text>
              <Text style={{ fontFamily: 'Gilroy-Regular' }}>{study} </Text>
            </Text>
          </View>
          <View
            style={{
              marginTop: 7,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'space-evenly',
              }}>
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                  borderRadius: 5,
                  backgroundColor: '#EEEEEE',
                }}>
                <AntDesign size={16} name="star" color="#FFBF46" />

                <Text style={{ fontFamily: 'Gilroy-SemiBold' }}> 4.5</Text>
              </View> */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                  borderRadius: 5,
                  backgroundColor: '#EEEEEE',
                  marginRight: 10,
                }}>
                <SimpleLineIcons size={16} name="badge" color="#EA1A65" />

                <Text style={{ fontFamily: 'Gilroy-Medium' }}>
                  {' '}
                  {experience} years
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                  borderRadius: 5,
                  backgroundColor: '#EEEEEE',
                }}>
                <FontAwesome5 size={16} name="user-friends" color="#077EE9" />

                <Text style={{ fontFamily: 'Gilroy-Medium' }}>
                  {' '}
                  {recentPatient.length} Consults
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: '#EEEEEE',
          marginTop: 10,
          marginBottom: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 6,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/* <FontAwesome name="calendar-check-o" color="#297281" size={20} /> */}
          <Text style={{ fontFamily: 'Gilroy-Medium', fontSize: 14 }}>
            Regarding:{' '}
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',
              fontSize: 14,
              marginLeft: 10,
            }}>
            {reasonForVisit}
            {/* {moment(slot ? slot.bookedFor : appointmentTime?.bookedFor).format(
              'dddd, DD MMMM YYYY, hh:mm A',
            )} */}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesome name="rupee" color="#000" size={16} />
          <Text
            style={{
              ...styles.text,
              fontSize: 18,
              fontFamily: 'Gilroy',
              fontWeight: '800',
              marginLeft: 3,
            }}>
            {price}
          </Text>
        </View>
      </View>
    </View>
  );
};

const DoctorInfo = ({
  coverPhoto,
  name,
  price,
  id,
  reasonForVisit,
  time,
  bookedFor,
}) => {
  name = name.split(' ');
  const img = coverPhoto ? (
    <Image
      source={{
        uri: `${Host}${coverPhoto.replace('public', '').replace('\\\\', '/')}`,
      }}
      style={{ width: 90, height: 90, borderRadius: 100 }}
    />
  ) : (
    <PicturelessAvatar
      style={{
        color: '#000',
        backgroundColor: '#f9f9f9',
        width: 90,
        height: 90,
        borderRadius: 100,
      }}
      textStyle={{ fontSize: 32 }}
      text={`${name[0][0]}${name[1][0]}`}
    />
  );
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
        marginHorizontal: 15,
        elevation: 6,
        backgroundColor: '#fff',
        borderRadius: 13,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 23,
      }}>
      {img}
      <View
        style={{
          flex: 1,
          marginLeft: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
            }}>
            {name}
          </Text>
          {/* <Favorites setLoading={() => {}} doctor={id} /> */}
        </View>
        <View
          style={{
            marginTop: 7,
          }}>
          <Text style={styles.text}>
            <Text>{reasonForVisit} | </Text>
            <Text>{moment(bookedFor).format(`DD MMM 'YY hh:mm A`)} </Text>
          </Text>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#EEEEEE',
            marginTop: 4,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 6,
          }}>
          <EvilIconsIcon name="clock" color="#077EE9" size={20} />
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 13,
            }}>
            {time}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default connect(mapProps)(WaitingRoom);

const styles = StyleSheet.create({
  mianContainer: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'flex-start',
  },
  // tabContainer: {
  //   flex: 1,
  //   marginVertical: 15,
  //   alignItems: 'center',
  //   borderColor: NEW_PRIMARY_COLOR,
  //   paddingVertical: 3,
  // },
  // inactiveTabText: {
  //   fontFamily: 'Montserrat-Regular',
  //   color: INPUT_PLACEHOLDER,
  //   fontSize: 18,
  // },
  // activeTabText: {
  //   fontFamily: 'Montserrat-Bold',
  //   fontSize: 18,
  //   // color: NEW_HEADER_TEXT,
  // },
  container: {
    // padding: '4%',
    // backgroundColor: '#FFF',
    // elevation: 5,
  },
  bannerHeading: {
    color: '#7B7A79',
    textTransform: 'uppercase',
    fontSize: 12,
    lineHeight: 20,
    fontFamily: 'Montserrat-Medium',
  },
  patientDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flex: 4,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    lineHeight: 26,
  },
  patientSubDetails: {
    flex: 2.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 50,
    backgroundColor: '#077EE9',
  },
  appointmentDetails: {
    paddingTop: '3%',
    paddingBottom: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  appointmentLeftSection: {
    flex: 5,
  },
  textLabel: {
    fontSize: 12,
    color: '#7B7A79',
    lineHeight: 22,
    fontFamily: 'Montserrat-Regular',
  },
  small: {
    fontSize: 13,
    lineHeight: 16,
  },
  ffRegular: {
    fontFamily: 'Montserrat-Regular',
  },
  ffSemiBold: {
    fontFamily: 'Montserrat-SemiBold',
  },
  textHighlightValue: {
    color: '#EA1A65',
    fontFamily: 'Montserrat-Medium',
  },
  textNormalValue: {
    color: '#000',
    fontFamily: 'Montserrat-Medium',
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
  appointmentRightSection: {
    flex: 1.8,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  divider: {
    height: 1.5,
    backgroundColor: '#eaeaea',
  },
  appointmentsDetails: {
    paddingTop: '2%',
  },
  ffMedium: {
    fontFamily: 'Montserrat-Medium',
  },
  fontLarge: {
    fontSize: 17,
  },
  fontMedium: {
    fontSize: 14,
    lineHeight: 30,
  },
  darkGrey: {
    color: '#7c7c7c',
  },
});
