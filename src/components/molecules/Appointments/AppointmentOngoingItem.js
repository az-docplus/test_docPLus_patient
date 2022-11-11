import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useReducer, useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  BackHandler,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_LIGHT_BG,
  NEW_HEADER_TEXT,
  GREY_BACKGROUND,
} from '../../../styles/colors';
import { Host } from '../../../utils/connection';
import { socket } from '../../../utils/socket';
import Popconfirm from '../../../components/molecules/Modal/PopConfirm';
import {
  RemoveAppointment,
  GetAppointments,
  InitiateRefund,
  cancelAppointment,
} from '../../../reduxV2/action/PatientAction';
import { Colors } from '../../../styles/colorsV2';
import PicturelessAvatar from '../../../components/atoms/PicturelessAvatar/PicturelessAvatar';
import LinearGradient from 'react-native-linear-gradient';

import FontAwesomeIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const initialOngoingState = {
  minutes: 0,
  hours: 0,
  // seconds: 0,
};

function ongoingReducer(state, action) {
  switch (action.type) {
    case 'minutes':
      return { ...state, minutes: action.minutes };
    case 'hours':
      return { ...state, hours: action.hours };
    // case 'seconds':
    //   return {...state, seconds: action.seconds};
    default:
      throw new Error();
  }
}
function AppointmentOngoingItem({ style, item }) {
  // const Customscrollbar = () => {
  //   const scrollIndicator = useRef(new Animated.Value(0)).current;
  //   const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  //   const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);

  //   const scrollIndicatorSize =
  //     completeScrollBarHeight > visibleScrollBarHeight
  //       ? (visibleScrollBarHeight * visibleScrollBarHeight) /
  //         completeScrollBarHeight
  //       : visibleScrollBarHeight;
  //   return (
  //     <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20 }}>
  //       {/* ScrollView component here */}
  //       <View
  //         style={{
  //           height: '100%',
  //           width: 6,
  //           backgroundColor: '#52057b',
  //           borderRadius: 8,
  //         }}>
  //         <View
  //           style={{
  //             width: 6,
  //             borderRadius: 8,
  //             backgroundColor: '#bc6ff1',
  //             height: scrollIndicatorSize,
  //           }}
  //         />
  //       </View>
  //     </View>
  //   );
  // };
  console.log('onGoingAppointment################', item);
  const Socket = useRef(socket);
  const { doctor } = item;
  const [ongoingTime, setOngoingTime] = useReducer(
    ongoingReducer,
    initialOngoingState,
  );
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const navigation = useNavigation();

  useEffect(function () {
    const interval = setInterval(computeOngoingTime, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Home');
      BackHandler.removeEventListener('hardwareBackPress', () => {});
      return true;
    });
  }, [navigation]);

  const dispatch = useDispatch();

  function computeOngoingTime() {
    const { bookedFor } = item;
    const now = new Date();
    const date = new Date(bookedFor);

    let totalSeconds = Math.floor((date - now) / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let _totalSecBy = (totalSeconds / 3600 - hours) * 60;
    let minutes = Math.floor(_totalSecBy);
    // let seconds = Math.floor((_totalSecBy - minutes) * 60);
    if (hours !== ongoingTime.hours) {
      setOngoingTime({ type: 'hours', hours });
    }
    if (minutes !== ongoingTime.minutes) {
      setOngoingTime({ type: 'minutes', minutes });
    }
    // setOngoingTime({type: 'seconds', seconds});
    // setOngoingTime(totalSeconds);
  }

  function onClickWaitingRoom() {
    navigation.navigate('WaitingRoom', { appointment: item });
  }
  const [ImageSource, setImageSource] = useState('');

  useEffect(() => {
    if (doctor.picture?.length) {
      setImageSource({
        uri: `${Host}${doctor.coverPhoto
          ?.replace('public', '')
          .replace('\\\\', '/')}`,
      });
    } else {
      setImageSource(require('../../../assets/jpg/person1.jpg'));
    }
  }, [doctor]);

  const [askConfirmation, setaskConfirmation] = useState(false);

  const cancelAppointments = () => {
    const data = {
      id: item._id,
      patientId: userData._id,
      reason: 'nil reason',
      byDoctor: false,
      byPatient: true,
      type: item?.type ?? 'Tele-consult',
    };
    console.log(item, 'sdfjsdklfjf');
    cancelAppointment(data).then((res) => {
      console.log(res.data.data, '%%%%%%%%%%%%%%%%%%');
      dispatch(GetAppointments(userData._id));
    });
    dispatch(
      InitiateRefund(
        {
          razorpayPaymentId: item.razorpayPaymentId,
          amount: item.amount,
          _id: item._id,
          ongoingTime,
          cancelationPolicy: doctor.cancelationPolicy,
        },
        () => dispatch(GetAppointments(userData._id)),
      ),
    );
    // dispatch(RemoveAppointment(
    //   data,
    //   () => dispatch(InitiateRefund(
    //     { razorpayPaymentId: item.razorpayPaymentId, amount: item.amount, _id: item._id, ongoingTime },
    //     () => dispatch(GetAppointments(userData._id))
    //   ))
    // ));
  };

  String.prototype.toTitleCase = function () {
    const splited = this.split(' ')
      .map((item) => {
        if (item[0]) return `${item[0].toUpperCase()}${item.slice(1)}`;
      })
      .join(' ');
    return splited;
  };

  return (
    // <TouchableOpacity
    // onPress={() => navigation.navigate('ConfirmAppointment', {
    //   showOnlyData: item, showOnly: true, onBackPress: () => { navigation.navigate('Appointments') }
    // })}
    // onPress={() => navigation.navigate('DoctorProfile', { data: doctor })}
    // >

    <ScrollView>
      {/* {console.log(item.firstName)} */}
      <View style={[styles.mainContainer, style ?? {}]}>
        <Popconfirm
          text="Are you sure you want to cancel these appointment"
          onUpdate={() => {
            cancelAppointments();
            setaskConfirmation(false);
          }}
          onCancel={() => {
            setaskConfirmation(false);
          }}
          visible={askConfirmation}></Popconfirm>
        <View style={styles.body}>
          <PicturelessAvatar
            style={{
              color: '#000',
              backgroundColor: '#f9f9f9',
              height: 70,
              width: 70,
              borderRadius: 35,
            }}
            textStyle={{ fontSize: 32 }}
            text={`${doctor?.firstName.split(' ')[0][0]}${
              doctor?.lastName.split(' ')[0][0]
            }`}
          />

          <View
            style={{
              flex: 1,
              justifyContent: 'space-evenly',
              margin: 10,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[
                  styles.docName,
                  { color: Colors.primary_text_color[theme] },
                ]}>{`${doctor?.firstName.toTitleCase()} ${doctor?.lastName.toTitleCase()}`}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 52,
                  borderWidth: 1,
                  borderColor: '#EEEEEE',
                  borderRadius: 4,
                  position: 'absolute',
                  left: 220,
                }}>
                <Image
                  source={require('../../../assets/icons/rating.png')}
                  style={{
                    height: 16,
                    width: 16,
                    left: 3,
                    marginRight: 2,
                    resizeMode: 'contain',
                  }}
                />
                <Text style={{ marginLeft: 5, fontFamily: 'Gilroy-SemiBold' }}>
                  {'4.5'}
                </Text>
              </View>
            </View>
            <Text
              style={[
                styles.docSpeciality,
                { color: Colors.DocSpeciality[theme] },
              ]}>
              {doctor.specialty == undefined
                ? 'General Physician| MBBS, NBD'
                : doctor.specialty}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 8,
                paddingVertical: 3,
                backgroundColor: 'whitesmoke',
                borderRadius: 5,
                width: 80,
                top: 9,
              }}>
              <Image
                source={require('../../../assets/icons/path.png')}
                style={{ height: 15, width: 15, resizeMode: 'contain' }}
              />
              <Text style={{ fontFamily: 'Gilroy-Medium' }}>
                {item.experience == undefined ? '8' : item.experience} Years
              </Text>
            </View>
            <View style={{ flexDirection: 'row', top: 14, right: 70 }}>
              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 14,
                  color: '#7B7A79',
                  marginRight: 4,
                }}>
                Health Concern :
              </Text>
              <Text
                style={[
                  styles.appointmentName,
                  { color: Colors.primary_text_color[theme] },
                ]}>
                {item.reasonForVisit}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', top: 25, left: -5 }}>
              <Image
                source={require('../../../assets/icons/feather_clock.png')}
              />
              <Text
                style={{
                  color: '#7B7A79',
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 12,
                  left: 10,
                }}>
                Starting in{' '}
                {`${ongoingTime.hours} hours and ${ongoingTime.minutes} minutes`}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClickWaitingRoom}
              style={{
                backgroundColor: 'red',
                width: 275,
                height: 48,
                borderRadius: 28,
                // alignSelf: 'center',
                top: 40,
                right: 30,
              }}>
              <LinearGradient
                colors={['#088DFF', '#066AC3']}
                // start={{ x: 0, y: 0 }}
                // end={{ x: 1, y: 0 }}
                style={{
                  width: 275,
                  height: 48,
                  borderRadius: 28,

                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontFamily: 'Gilroy-SemiBold',
                    fontSize: 14,
                  }}>
                  Enter Waiting Room
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* <View
          style={{
            justifyContent: 'space-between',
            width: 65,
            alignItems: 'center',
            borderColor: GREY_BACKGROUND,
            // borderLeftWidth: 1,
            paddingLeft: 5,
            //   borderWidth: 1,
          }}> */}
          {/* <Image
            source={require('../../../assets/icons/clock.png')}
            style={{
              height: 25,
              width: 25,
              // marginBottom: 7,
            }}
            resizeMode="contain"
          /> */}
          {/* <Text
            style={[styles.time, { color: Colors.primary_text_color[theme] }]}>
            Starting in{' '}
            {`${ongoingTime.hours} hours and ${ongoingTime.minutes} minutes`}
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('invoice', { id: item._id, time: 100 })
            }>
            <FontAwesomeIcons
              style={{ fontSize: 24 }}
              color={Colors.primary_text_color[theme]}
              name="file-document-outline"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Socket.current.emit('add_empty_convo', {
                from: userData._id,
                to: doctor._id,
                message: '',
                toType: 'doctor',
                fromType: 'patient',
              });
              setTimeout(() => {
                navigation.navigate('Chats');
              }, 3000);
            }}>
            <Image
              source={require('../../../assets/icons/chat.png')}
              style={{
                height: 22,
                width: 22,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View> */}
        </View>
        {/* <TouchableOpacity onPress={() => setaskConfirmation(true)}>
        <Text
          style={{
            color: '#EA1A65',
            fontFamily: 'Montserrat-Medium',
            textAlign: 'right',
            marginBottom: 4,
            marginRight: 8,
          }}>
          CANCEL
        </Text>
      </TouchableOpacity> */}
        {/* <TouchableOpacity
        activeOpacity={0.75}
        onPress={onClickWaitingRoom}
        style={[
          styles.footerContainer,
          { backgroundColor: Colors.primary_light_bg[theme] },
        ]}>
        <Text style={[styles.footerText, {}]}>Enter Waiting Room </Text>
      </TouchableOpacity> */}
      </View>
    </ScrollView>
    // </TouchableOpacity >
  );
}

export default AppointmentOngoingItem;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 2,
    marginBottom: '2%',
    height: 220,
    width: 380,
    alignSelf: 'center',
    // borderWidth: 1,
  },
  body: {
    padding: 7,
    flexDirection: 'row',
  },
  docName: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 17,
    marginBottom: 5,
  },
  docSpeciality: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 12,
  },
  appointmentName: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 16,
    left: 8,
    color: NEW_HEADER_TEXT,
  },
  time: {
    textAlign: 'center',
    color: NEW_HEADER_TEXT,
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    // borderWidth: 1,
  },
  footerContainer: {
    padding: 12,
    backgroundColor: NEW_PRIMARY_LIGHT_BG,
    alignItems: 'center',
  },
  footerText: {
    color: NEW_PRIMARY_BACKGROUND,
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
});
