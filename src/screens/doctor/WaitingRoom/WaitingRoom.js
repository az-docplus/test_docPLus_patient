/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  // Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Button,
  ActivityIndicator,
} from 'react-native';
import { StyleSheet } from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {
  NEW_PRIMARY_COLOR,
  INPUT_PLACEHOLDER,
  NEW_HEADER_TEXT,
  NEW_PRIMARY_BACKGROUND,
  // GREY_OUTLINE,
  // TERTIARY_TEXT,
} from '../../../styles/colors';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import CallModal from '../../../components/molecules/Modal/CallModal';  no. of patients
import {
  connect,
  useDispatch,
  useSelector,
  //  useSelector
} from 'react-redux';
// import {BottomSheet, ListItem} from 'react-native-elements';
import { socket, WaitingRoomSocket } from '../../../utils/socket';
// const {width} = Dimensions.get('window');
import { Colors } from '../../../styles/colorsV2';
import { Avatar, Divider, Icon } from 'react-native-elements';
import SkeletonLoader from '../../../components/atoms/Loader/SkeletonLoader';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { Host } from '../../../utils/connection';
import { Color } from 'react-native-agora';
import {
  GetPatientInfo,
  ApproveAppointment,
  RemoveAppointment,
} from '../../../reduxV2/action/PatientAction';
import BlurSpinner from '../../../components/molecules/Modal/BlurLoadingOverlay';
import { Local } from '../../../i18n';
import PicturelessAvatar from '../../../components/atoms/PicturelessAvatar/PicturelessAvatar';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Favorites from '../../../components/atoms2/doctor/favorites';
const FontAwesomeIcon = ({ name, size, color = '#000' }) => (
  <FontAwesome name={name} size={size} color={color} />
);
const IoniconsIcon = ({ name, size, color = '#000' }) => (
  <Ionicons name={name} size={size} color={color} />
);
const EvilIconsIcon = ({ name, size, color = '#000' }) => (
  <EvilIcons name={name} size={size} color={color} />
);

class WaitingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.WaitingRoomSocket = WaitingRoomSocket;
    this.socket = socket;
    this.userData = this.props.userData;
    this.theme = this.props.theme;
    this.state = {
      modalVisible: false,
      PatientWaiting: [],
      selectedAppointment: null,
      refreshing: false,
      contentLoading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      //fallback in case when data never returns from socket ---- using till error and acknowledgement not implemented in socket
      this.setState({ contentLoading: false });
    }, 5000);
    const { _id } = this.userData;
    this.WaitingRoomSocket.emit('enter_waiting_room', { doctor_id: _id });
    this.WaitingRoomSocket.on(
      'patients_waiting',
      this.onFetchedWaitingPatients,
    );
    this.WaitingRoomSocket.on(
      'new_patient_enqueued',
      this.onNewPatientEnqueued,
    );
    this.socket.on('new_patient_online', this.onPatientOnline);
    this.socket.on('patient_offline', this.onPatientOffline);
  }

  comparePatientsWaiting = (firstElement, secondElement) => {
    const firstBookedFor = new Date(
      firstElement?.appointmentsDetails?.bookedFor,
    ).getTime();
    const secondBookedFor = new Date(
      secondElement?.appointmentsDetails?.bookedFor,
    ).getTime();
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
    this.setState({ PatientWaiting: modifiedPatientWaiting }, () => {
      this.setState({
        selectedAppointment: modifiedPatientWaiting[0],
        contentLoading: false,
      });
    });
  };
  onNewPatientEnqueued = ({ appointmentsDetails }) => {
    console.log('new patient enqueued');
    const patientsWaiting = [
      ...this.state.PatientWaiting,
      { appointmentsDetails, _id: `${Date.now()}` },
    ];
    const modifiedPatientWaiting = patientsWaiting.sort(
      this.comparePatientsWaiting,
    );
    this.setState({ PatientWaiting: modifiedPatientWaiting }, () => {
      this.setState({
        selectedAppointment: modifiedPatientWaiting[0],
      });
    });
  };

  setPatientStatus = (data, status) => {
    console.log(`${data.patientId} came ${status ? 'online' : 'offline'}`);
    // console.log({ PatientWaiting: this.state.PatientWaiting });
    const { patientId } = data;
    const modified = this.state.PatientWaiting.map((item) => {
      const { _id, appointmentsDetails } = item;
      const { patient } = appointmentsDetails;

      if (patientId == patient?._id) {
        return {
          _id,
          appointmentsDetails: {
            ...appointmentsDetails,
            patient: {
              ...patient,
              online: status,
            },
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
    this.WaitingRoomSocket.off(
      'patients_waiting',
      this.onFetchedWaitingPatients,
    );
    this.WaitingRoomSocket.off(
      'new_patient_enqueued',
      this.onNewPatientEnqueued,
    );
    this.socket.off('new_patient_online', this.onPatientOnline);
    this.socket.off('patient_offline', this.onPatientOffline);
  }
  ListHeaderComponent = (patient) => {
    return (
      <>
        <TopNavBar
          headerText={`${Local('doctor.waiting.waiting_room')}`}
          style={{ Container: { marginTop: 0, marginBottom: 0 } }}
          navigation={this.navigation}
        />
        {/* <View style={{
          flexDirection: 'row',
          backgroundColor: "#EEEEEE",
          paddingVertical: 6,
          paddingHorizontal: 8,
          marginHorizontal: 16,
          marginVertical: 20,
          borderRadius: 9,

        }}>
          <Text style={{ fontFamily: "Montserrat-SemiBold", backgroundColor: "#fff", color: "#FF7AA2", flex: 1, textAlign: "center", elevation: 7, paddingVertical: 10, borderRadius: 9 }}>Queue</Text>
          <Text style={{ fontFamily: "Montserrat-SemiBold", backgroundColor: "#EEEEEE", color: "#333333", flex: 1, textAlign: "center", textAlignVertical: "center" }}>More</Text>
        </View> */}
        {/* <Image
          source={require('../../../assets/images/waitingRoomBanner.png')}
          style={{
            width: '100%',
            height: 130,
            resizeMode: 'contain',
          }}
        /> */}

        <AppointmentBanner
          navigation={this.navigation}
          selectedAppointment={this.state.selectedAppointment}
          totalWaitingPatient={this.state.PatientWaiting.length}
          nextInLine={
            this.state.PatientWaiting.length > 1
              ? `${this.state.PatientWaiting[1]?.appointmentsDetails?.patient?.firstName} ${this.state.PatientWaiting[1]?.appointmentsDetails?.patient?.lastName}`
              : '---'
          }
        />
      </>
    );
  };
  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 3000);
  };
  EmptyListComponent = () => {
    const { userData, theme } = useSelector((state) => state.AuthReducer);
    const navigation = useNavigation();
    return (
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
            color: '#888',
            fontFamily: 'Montserrat-Medium',
            color: Colors.primary_text_color[theme],
            fontSize: 16,
          }}>
          {Local('doctor.waiting.no_app_found')}
        </Text>
      </View>
    );
  };
  setWaitingPatient = (callback) => {
    const data = callback(this.state.PatientWaiting);
    this.setState({
      PatientWaiting: data,
      selectedAppointment: data.length > 0 ? data[0] : null,
    });
  };

  onVideoCall = () => {
    const { patient = {} } =
      this.state.selectedAppointment?.appointmentsDetails;
    this.navigation.navigate('videoCall', {
      mode: 'thisSide', //thisSide,thatSide
      User: {
        firstName: patient?.firstName,
        lastName: patient?.lastName,
        picture: patient?.picture,
        _id: patient?._id,
        meta: patient?.meta?._id ? patient?.meta?._id : patient?.meta,
      }, //firstName,lastName,picture,_id
      type: 'patient', //Practise,patient
      callType: 'video',
    });
  };

  onAudioCall = () => {
    const { patient = {} } = this.state.selectedAppointment.appointmentsDetails;
    this.navigation.navigate('videoCall', {
      mode: 'thisSide', //thisSide,thatSide
      User: {
        firstName: patient?.firstName,
        lastName: patient?.lastName,
        picture: patient?.picture,
        _id: patient?._id,
        meta: patient?.meta._id ? patient?.meta._id : patient?.meta,
      }, //firstName,lastName,picture,_id
      type: 'patient', //Practise,patient
      callType: 'audio',
    });
  };

  render() {
    console.log(
      '============@@@@@@@@@@waitng',
      this.state.PatientWaiting.length,
    );
    const theme = this.props.theme;
    const patient = this.props.patient;
    const { contentLoading, selectedAppointment } = this.state;
    return (
      <View style={[styles.mainContainer]}>
        {contentLoading ? (
          <>
            <TopNavBar
              headerText="WaitingRoom"
              style={{ Container: { marginTop: 0, marginBottom: 0 } }}
              navigation={this.navigation}
            />
            <BlurSpinner visible={contentLoading}>
              <ActivityIndicator color={NEW_PRIMARY_BACKGROUND} size="large" />
            </BlurSpinner>
            {/* <SkeletonLoader /> */}
            {/* <SkeletonLoader /> */}
          </>
        ) : (
          <View>
            {selectedAppointment?.appointmentsDetails?.patient &&
              this.ListHeaderComponent(
                selectedAppointment?.appointmentsDetails?.patient,
              )}

            <View
              style={{
                // flex: 1,
                display: 'flex',
                flexDirection: 'row',
                overflow: 'scroll',
                backgroundColor: '#96F0F0',
              }}>
              {this.state.PatientWaiting.map(
                (item, index) =>
                  item.appointmentsDetails && (
                    <AppointmentCard
                      item={item.appointmentsDetails}
                      selectAppointment={(appointment) => {
                        // console.log({ appointment });
                        this.setState({
                          selectedAppointment: appointment.appointmentsDetails,
                        });
                      }}
                      setWaitingPatient={this.setWaitingPatient}
                    />
                  ),
              )}
            </View>

            <>
              <View
                style={{
                  marginTop: 40,
                  marginBottom: 100,
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 20,
                    textAlign: 'center',
                  }}>
                  Call Now?
                </Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 15,
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Start your appointment
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginHorizontal: 80,
                    marginTop: 20,
                  }}>
                  <TouchableOpacity onPress={this.onAudioCall}
                    style={{
                      backgroundColor: '#088DFF',
                      padding: 20,
                      borderRadius: 100,
                      elevation: 7,
                    }}>
                    <IoniconsIcon name="call" size={30} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.onVideoCall}
                    style={{
                      backgroundColor: '#088DFF',
                      padding: 20,
                      borderRadius: 100,
                      elevation: 7,
                    }}>
                    <FontAwesomeIcon
                      name="video-camera"
                      size={30}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          </View>
        )}
      </View>
    );
  }
}

const mapProps = function (state) {
  return {
    userData: state.AuthReducer.userData,
    theme: state.AuthReducer.theme,
    patient: state.PatientReducer.patient,
  };
};
export default connect(mapProps)(WaitingRoom);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#efefef',
    justifyContent: 'flex-start',
  },
  tabContainer: {
    flex: 1,
    marginVertical: 15,
    alignItems: 'center',
    borderColor: NEW_PRIMARY_COLOR,
    paddingVertical: 3,
  },
  inactiveTabText: {
    fontFamily: 'Montserrat-Regular',
    color: INPUT_PLACEHOLDER,
    fontSize: 18,
  },
  activeTabText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: NEW_HEADER_TEXT,
  },
});

function StatusDot({ online }) {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: 7,
          width: 7,
          borderRadius: 12,
          backgroundColor: online ? '#00fa00' : '#777',
        }}
      />
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          marginLeft: '10%',
          textTransform: 'uppercase',
          // color: '#777',
          color: Colors.color_grey[theme],
          fontSize: 10,
        }}>
        {online
          ? `${Local('doctor.waiting.online')}`
          : `${Local('doctor.waiting.offline')}`}
      </Text>
    </View>
  );
}

function CellRendererComponent({ children, ...props }) {
  return (
    <View
      {...props}
      style={
        {
          // paddingVertical: '2%',
          // paddingHorizontal: '3%',
        }
      }>
      {children}
    </View>
  );
}
function AppointmentCard({ item, setWaitingPatient, selectAppointment }) {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  /**
   * ========= Animation control =============
   */
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.stagger(400, [
      Animated.timing(anim1, {
        toValue: 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(anim2, {
        toValue: 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(anim3, {
        toValue: 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value_ = {
    inputRange: [0, 1],
    outputRange: [30, 0],
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

  const waitingRoomSocket = useRef(WaitingRoomSocket).current;
  const {
    userData: { _id },
  } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [working, setWorking] = useState(false);
  const navigation = useNavigation();

  const {
    _id: appointmentId,
    patient,
    amount,
    reasonForVisit,
    approved,
    bookedFor,
    // available,
  } = item ? item : {};

  const onRemovePatientFromWaitingList = useCallback(() => {
    //TODO send appointment id from patient side for which he/she has entering in waiting room
    //TODO use that id here to remove it from waitingList and mark that appointment complete
    setWorking(true);
    console.log(_id, appointmentId);
    waitingRoomSocket.emit(
      'pop_from_queue',
      {
        doctor_id: _id,
        appointmentsDetails: {
          _id: appointmentId,
        },
      },
      (_) => {
        //achknowledgement function
        // console.log('achknowledgement called');
        Animated.timing(anim1, {
          toValue: 0,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start(() => {
          setWorking(false);
          setWaitingPatient((prevState) => {
            const newPatients = prevState.filter(
              (item) => item.appointmentsDetails?._id != appointmentId,
            );
            return newPatients;
          });
        });
      },
    );
  }, [_id, appointmentId]);

  const cancelAppointment = () => {
    const data = {
      id: appointmentId,
      patientId: patient._id,
      reason: 'nil reason',
      byDoctor: true,
      byPatient: false,
    };
    dispatch(
      RemoveAppointment(data, () => {
        onRemovePatientFromWaitingList();
        console.log('success');
      }),
    );
  };
  const approveAppointment = () => {
    setWorking(true);
    const data = {
      _id: appointmentId,
      patient: patient._id,
      time: bookedFor,
      date: bookedFor,
      address: '',
      doctor: _id,
    };
    dispatch(
      ApproveAppointment(data, () => {
        waitingRoomSocket.emit('enter_waiting_room', { doctor_id: _id });
        setWorking(false);
      }),
    );
  };

  const image = patient?.coverPhoto ? (
    <Image
      source={{
        uri: `${Host}${patient.coverPhoto
          .replace('public', '')
          .replace('\\\\', '/')}`,
      }}
      style={{ width: 52, height: 52, borderRadius: 52 }}
    />
  ) : (
    <PicturelessAvatar
      style={{
        color: '#000',
        backgroundColor: '#f9f9f9',
        width: 52,
        height: 52,
        borderRadius: 52,
      }}
      textStyle={{ fontSize: 18 }}
      text={`${patient?.firstName[0]}${patient?.lastName[0]}`}
      // text={`JP`}
    />
  );
  // console.log({ item });
  return (
    <TouchableOpacity
      // onPress={() => selectAppointment(item)}
      onPress={() => cancelAppointment()}
      style={{
        backgroundColor: '#96F0F0',
        margin: 6,
        padding: 6,
      }}>
      {image}
      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          textAlign: 'center',
          marginTop: 5,
        }}>
        {`${patient?.firstName}`}
      </Text>
    </TouchableOpacity>
  );
  // return (
  //   <Animated.View
  //     style={[
  //       ACstyle.container,
  //       { backgroundColor: Colors.secondary_background[theme] },
  //       {
  //         opacity: anim1.interpolate(value),
  //         transform: [
  //           {
  //             translateY: translateY1,
  //           },
  //         ],
  //       },
  //     ]}>
  //     {working ? (
  //       <View
  //         style={[
  //           ACstyle.overlay,
  //           { backgroundColor: Colors.secondary_background[theme] },
  //         ]}>
  //         <ActivityIndicator />
  //       </View>
  //     ) : null}
  //     <Animated.View
  //       style={[
  //         ACstyle.appointmentDetails,
  //         { backgroundColor: Colors.secondary_background[theme] },
  //         {
  //           opacity: anim2.interpolate(value),
  //           transform: [
  //             {
  //               translateX: translateX2,
  //             },
  //             {
  //               translateY: translateY2,
  //             },
  //           ],
  //         },
  //       ]}>
  //       <View style={[ACstyle.header]}>
  //         <Text
  //           style={[
  //             bStyle.small,
  //             bStyle.ffMedium,
  //             { color: Colors.primary_text_color[theme] },
  //           ]}>
  //           10:30 - 11:00
  //         </Text>
  //         <StatusDot online={patient?.online} />
  //         <Icon
  //           name={'close'}
  //           type={'antdesign'}
  //           color={Colors.primary_text_color[theme]}
  //           onPress={onRemovePatientFromWaitingList}
  //         />
  //       </View>
  //       <View style={ACstyle.patientDetails}>
  //         <View style={ACstyle.avatarContainer}>
  //           <Avatar
  //             rounded
  //             size={52}
  //             source={
  //               patient?.picture
  //                 ? {
  //                   uri: `${Host}${patient?.picture
  //                     .replace('public', '')
  //                     .replace('\\\\', '/')}`,
  //                 }
  //                 : require('../../../assets/jpg/person2.jpg')
  //             }
  //           />
  //         </View>
  //         <View style={ACstyle.patientSubDetails}>
  //           <Text
  //             style={[
  //               bStyle.fontLarge,
  //               bStyle.ffMedium,
  //               { color: Colors.primary_text_color[theme] },
  //             ]}>
  //             {`${patient?.firstName} ${patient?.lastName}`}
  //           </Text>
  //           <Text
  //             style={[
  //               bStyle.textLabel,
  //               bStyle.small,
  //               bStyle.ffRegular,
  //               { color: Colors.primary_text_color[theme] },
  //             ]}>
  //             {reasonForVisit ? reasonForVisit : '--'}
  //           </Text>
  //         </View>
  //       </View>
  //       <View style={ACstyle.appointmentSubDetails}>
  //         <Text
  //           style={[
  //             bStyle.darkGrey,
  //             bStyle.ffRegular,
  //             ACstyle.flex4,
  //             { color: Colors.color_dark_grey[theme] },
  //           ]}>
  //           {Local("doctor.waiting.to_pay")}:{' '}
  //           <Text
  //             style={[
  //               bStyle.textNormalValue,
  //               bStyle.ffMedium,
  //               { color: Colors.primary_text_color[theme] },
  //             ]}>
  //             $ {amount}
  //           </Text>
  //         </Text>
  //         <View style={ACstyle.chatActionContainer}>
  //           <Icon
  //             type={'ionicon'}
  //             name={'ios-call'}
  //             size={26}
  //             color={approved ? '#43A2A2' : '#7B7A79'}
  //             onPress={approved ? onAudioCall : () => { }}
  //           />
  //           <Icon
  //             type={'ionicon'}
  //             name={'ios-videocam'}
  //             size={26}
  //             color={approved ? '#43A2A2' : '#7B7A79'}
  //             onPress={approved ? onVideoCall : () => { }}
  //           />
  //           <Icon
  //             type={'entypo'}
  //             name={'message'}
  //             size={26}
  //             color={approved ? '#43A2A2' : '#7B7A79'}
  //             onPress={() => { }}
  //           />
  //         </View>
  //       </View>
  //     </Animated.View>
  //     {!approved ? (
  //       <Animated.View
  //         style={[
  //           ACstyle.actionButtonContainer,
  //           {
  //             opacity: anim3.interpolate(value),
  //             transform: [
  //               {
  //                 translateX: translateX3,
  //               },
  //               {
  //                 translateY: translateY3,
  //               },
  //             ],
  //           },
  //         ]}>
  //         <TouchableOpacity
  //           onPress={cancelAppointment}
  //           activeOpacity={0.71}
  //           style={ACstyle.button}>
  //           <Text
  //             style={[ACstyle.cancelText, bStyle.ffSemiBold, bStyle.fontLarge]}>
  //             {Local("doctor.waiting.cancel")}
  //           </Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           onPress={approveAppointment}
  //           activeOpacity={0.71}
  //           style={ACstyle.button}>
  //           <Text
  //             style={[ACstyle.acceptText, bStyle.ffSemiBold, bStyle.fontLarge]}>
  //             {Local("doctor.waiting.accept")}
  //           </Text>
  //         </TouchableOpacity>
  //       </Animated.View>
  //     ) : null}
  //   </Animated.View>
  // );
}
const ACstyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  appointmentDetails: {
    padding: '6%',
    paddingVertical: '4%',
  },
  header: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '3%',
  },
  patientDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    flex: 2,
  },
  patientSubDetails: {
    flex: 7,
  },
  appointmentSubDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '5%',
  },
  chatActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 3,
    justifyContent: 'space-between',
  },
  flex4: {
    flex: 4,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#eaeaea',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '5%',
  },
  cancelText: {
    color: '#EA1A65',
    textTransform: 'uppercase',
  },
  acceptText: {
    color: '#077EE9',
    textTransform: 'uppercase',
  },
});
function AppointmentBanner({
  selectedAppointment,
  totalWaitingPatient,
  nextInLine,
  navigation,
}) {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  // const { patient } = useSelector((state) => state.PatientReducer);
  const { patient } = selectedAppointment?.appointmentsDetails;
  const { doctorProfile } = useSelector((state) => state.DoctorReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetPatientInfo(selectedAppointment?._id, true, () =>
        console.log('PATIENT INFO FETCHED<<<<<<<<<<<<<<<<'),
      ),
    );
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
  return (
    <View
      style={[
        bStyle.container,
        { backgroundColor: Colors.secondary_background[theme] },
      ]}>
      <Text
        style={{
          textAlign: 'center',
          color: '#3893E7',
          textTransform: 'capitalize',
          fontFamily: 'Montserrat-Regular',
          fontSize: 15,
        }}>
        {Local('doctor.waiting.appointment_with')}:
      </Text>

      <PatientInfo
        coverPhoto={patient?.coverPhoto}
        name={`${patient?.firstName} ${patient?.lastName}`}
        reasonForVisit={
          selectedAppointment?.appointmentsDetails?.reasonForVisit
        }
        bookedFor={selectedAppointment?.appointmentsDetails?.bookedFor}
        id={patient?._id}
        // Slot={Slot}
      />

      {/* <Text style={{
        fontFamily: "Montserrat-SemiBold",
        marginVertical: 8,
        textAlign: "center"
      }}>Medanta - The Medicity</Text> */}
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          marginVertical: 8,
          textAlign: 'center',
          backgroundColor: '#FCFCFC',
          borderRadius: 3,
          paddingVertical: 5,
          fontSize: 12,
          color: '#212121',
        }}>
        {patient?.firstName + ' ' + patient?.lastName} is ready for your
        consulation.
      </Text>

      <Text
        style={{
          backgroundColor: '#96F0F0',
          fontFamily: 'Montserrat-SemiBold',
          marginHorizontal: -20,
          paddingHorizontal: 30,
          fontSize: 15,
          paddingTop: 20,
          paddingBottom: 30,
          marginBottom: -20,
        }}>
        PATIENTS QUEUE (2)
      </Text>

      {/* <Animated.View
        style={[
          bStyle.patientDetails,
          {
            opacity: anim1.interpolate(value),
            transform: [
              {
                translateY: translateY1,
              },
            ],
          },
        ]}>
        <Text style={[bStyle.name, { color: Colors.primary_text_color[theme] }]}>
          {selectedAppointment
            ? `${selectedAppointment?.appointmentsDetails?.patient?.firstName} ${selectedAppointment?.appointmentsDetails?.patient?.lastName}`
            : '---'}
        </Text>
        <View style={bStyle.patientSubDetails}>
          <Text
            style={[
              bStyle.ffMedium,
              { color: Colors.primary_text_color[theme] },
            ]}>
            {patient?.age ? patient?.age : '-- '} yrs
          </Text>
          <View
            style={[bStyle.dot, { color: Colors.primary_text_color[theme] }]}
          />
          <Text
            style={[
              bStyle.ffMedium,
              { color: Colors.primary_text_color[theme] },
            ]}>
            {patient?.gender
              ? patient?.gender?.substring(0, 1).toUpperCase()
              : '--'}
          </Text>
          <View
            style={[bStyle.dot, { color: Colors.primary_text_color[theme] }]}
          />
          <Text
            style={[
              bStyle.ffMedium,
              { color: Colors.primary_text_color[theme] },
            ]}>
            {patient?.weight?.value ? patient?.weight.value : '--'}
          </Text>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          bStyle.appointmentDetails,
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
        <View style={bStyle.appointmentLeftSection}>
          <Text
            style={[
              bStyle.textLabel,
              { color: Colors.primary_text_color[theme] },
            ]}>
            {Local("doctor.waiting.reason_visit")} :{' '}
            <Text style={bStyle.textHighlightValue}>
              {selectedAppointment
                ? selectedAppointment?.appointmentsDetails?.reasonForVisit
                : '---'}
            </Text>
          </Text>
          <Text
            style={[
              bStyle.textLabel,
              { color: Colors.primary_text_color[theme] },
            ]}>
            {Local("doctor.waiting.last_visit")} :
            <Text
              style={[
                bStyle.textNormalValue,
                { color: Colors.primary_text_color[theme] },
              ]}>
              14 May 20
            </Text>
          </Text>
        </View>
        <View style={bStyle.appointmentRightSection}>
          <Text
            style={[
              bStyle.textLabel,
              bStyle.darkGrey,
              { color: Colors.color_dark_grey[theme] },
            ]}>
            {Local("doctor.waiting.to_pay")}:{' '}
            <Text style={bStyle.textNormalValue}>
              ${selectedAppointment?.appointmentsDetails?.amount}
            </Text>
          </Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate('PatientDetails', {
              selectedAppointment,
              appointment: {},
            });
          }}>
            <Text
              style={[
                bStyle.textLabel,
                bStyle.textUnderline,
                { color: Colors.primary_text_color[theme] },
              ]}>
              View Profile
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Divider style={bStyle.divider} />
      <Animated.View
        style={[
          bStyle.appointmentsDetails,
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
            bStyle.textLabel,
            bStyle.fontMedium,
            bStyle.darkGrey,
            { color: Colors.color_dark_grey[theme] },
          ]}>
          {Local("doctor.waiting.no_of_patient")}
          :{' '}
          <Text
            style={[
              bStyle.textNormalValue,
              { color: Colors.primary_text_color[theme] },
            ]}>
            {totalWaitingPatient}
          </Text>
        </Text>
        <Text
          style={[
            bStyle.textLabel,
            bStyle.fontMedium,
            bStyle.darkGrey,
            { color: Colors.color_dark_grey[theme] },
          ]}>
          {Local("doctor.waiting.next_in_line")} :{' '}
          <Text
            style={[
              bStyle.textNormalValue,
              { color: Colors.primary_text_color[theme] },
            ]}>
            {nextInLine}
          </Text>
        </Text>
      </Animated.View> */}
    </View>
  );
}

const bStyle = StyleSheet.create({
  container: {
    padding: '4%',
    backgroundColor: '#FFF',
    elevation: 5,
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

const PatientInfo = ({
  coverPhoto,
  name,
  price,
  id,
  reasonForVisit,
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
            Available Now
          </Text>
        </View>
      </View>
    </View>
  );
};
