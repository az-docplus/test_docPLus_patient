import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Highlighter from 'react-native-highlight-words';
import Moment from 'moment';
// import Slider from '@react-native-community/slider';
import Slider from 'react-native-slider';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DocDummyImage from '../../assets/png/doc-center-image.png';
import LinearGradient from 'react-native-linear-gradient';
import InsetShadow from 'react-native-inset-shadow';
import ButtonCompo from '../../components/atoms2/button/button';
import UploadDocsCompo from '../doctor/Submittingdetails/__Components/Upload-documents';
import PicturelessAvatar from '../../components/atoms/PicturelessAvatar/PicturelessAvatar';
import { Host } from '../../utils/connection';
import TopNavBar from '../../components/molecules/TopNavBar/TopNavBar';
import { Local } from '../../i18n';
import Favorites from '../../components/atoms2/doctor/favorites';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Button } from 'react-native-paper';
// import Modal from 'react-native-modal';
// import { Slider, Icon } from 'react-native-elements';
import { consern } from '../../components/healthData';
import { color } from 'react-native-reanimated';
import { Colors as colorv2 } from '../../styles/colorsV2';
import { Colors } from '../../styles/colorsV3';
import { BlurView } from '@react-native-community/blur';
import {
  GetAppointmentSlot,
  AddTransactions,
  bookAppointment,
} from '../../reduxV2/action/PatientAction';
import { useIsFocused } from '@react-navigation/native';
import { hp } from '../../components/Scalling';
const AntDesignIcon = ({ name, size, color = '#000' }) => (
  <AntDesign name={name} size={size} color={color} />
);
const FontAwesomeIcon = ({ name, size, color = '#000' }) => (
  <FontAwesome name={name} size={size} color={color} />
);
const EvilIconsIcon = ({ name, size, color = '#000' }) => (
  <EvilIcons name={name} size={size} color={color} />
);
const MaterialCommunityIconsIcon = ({ name, size, color = '#000' }) => (
  <MaterialCommunityIcons name={name} size={size} color={color} />
);
const IoniconsIcon = ({ name, size, color = '#000' }) => (
  <Ionicons name={name} size={size} color={color} />
);
const { height, width } = Dimensions.get('window');
const AppointmentDetails = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  console.log('@@@@@@@@@@@@@@@@@@', isFocused);
  const windowHeight = Dimensions.get('window').height;
  const refRBSheet = useRef();
  const { recentPatient } = useSelector((state) => state.DoctorReducer);
  const {
    patient,
    familyMember,
    appointmentForSlot,
    gettingFamilyMember,
    appointmentForSlotLoading,
  } = useSelector((state) => state.PatientReducer);
  const { userData } = useSelector((state) => state.AuthReducer);
  const { theme } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const { doctor, Slot, nextSlot } = route.params;
  const [appointmentTime, setAppointmentTime] = useState({});
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(true);
  const [search, setSearch] = useState('');
  const [searchConsern, setSearchConsern] = useState('');
  const [filterData, setFilterData] = useState(consern);
  const [canSaveConcern, setCanSaveConcern] = useState(false);
  const [loading, setLoading] = useState(true);
  const [patientInfo, setPaientInfo] = useState(patient);
  const [switchProfileModal, setSwitchProfileModal] = useState(false);
  const [rate, setRate] = useState('');

  useEffect(() => {
    // console.log('@@@@@@@@@@@@@@@@@@###################', isFocused);
    removeDetails();
  }, [isFocused]);

  useEffect(() => {
    todaysAppointments();
  }, [isFocused]);

  // const [details, setDetails] = useState({
  //   sinceFeeling: '',
  //   concernName: '',
  //   duration: '',
  //   seavere: '',
  //   describe: '',
  // });
  // console.log('appointmentTime=========>>>>>>>>',appointmentTime);
  const [details, setDetails] = useState({
    questions1: {
      q: `${Local('doctor.V2.appointment_detail.question.q1')}`,
      a: '',
    },
    questions2: {
      q: `${Local('doctor.V2.appointment_detail.question.q2')}`,
      a: '',
    },
    questions3: {
      q: `${Local('doctor.V2.appointment_detail.question.q2')}`,
      a: '',
    },
    questions4: {
      q: `${Local('doctor.V2.appointment_detail.question.q4')}`,
      a: '',
    },
    questions5: {
      q: `${Local('doctor.V2.appointment_detail.question.q5')}`,
      a: '',
    },
  });

  const removeDetails = () => {
    setDetails((prevSate) => ({
      ...details,
      questions1: {
        ...prevSate.questions1,
        a: '',
      },
      questions2: {
        ...prevSate.questions2,
        a: '',
      },
      questions3: {
        ...prevSate.questions3,
        a: '',
      },
      questions4: {
        ...prevSate.questions4,
        a: '',
      },
      questions5: {
        ...prevSate.questions5,
        a: '',
      },
    }));
    setSearchConsern('');
  };
  // console.log(
  //   '===============>>>>>>>>>>>>>>>appointmentForSlot',
  //   appointmentForSlot,
  // );
  const getDateView = (startDate, endDate) => {
    if (startDate !== '' && endDate !== '') {
      const start = Moment(startDate).format('YYYY-MM-DD');
      let end = Moment(endDate).format('YYYY-MM-DD');
      // if (start === end) {0
      //   endDate = new Date(startDate).setDate(
      //     new Date(startDate).getDate() + 1,
      //   );
      //   end = Moment(endDate).format('YYYY-MM-DD');
      // }
      dispatch(GetAppointmentSlot([[start, end]], doctor._id));
    }
  };
  const todaysAppointments = () => {
    const start = new Date();

    const end = new Date().setDate(new Date().getDate() + 1);

    getDateView(start, end);
  };

  useEffect(() => {
    if (appointmentForSlot.length > 0) {
      let appointments = appointmentForSlot[0]?.appointments;
      const lastAppointment = appointments[appointments?.length - 1];
      const now = moment();
      const lastSlot = moment(lastAppointment?.bookedFor);
      if (lastSlot > now) {
        appointments = appointments?.filter((item, index) => {
          const __time = moment(item.bookedFor);

          if (__time > now && item.available !== false) {
            return item;
          }
        });

        setAppointmentTime(appointments[0]);
      }
    }
  }, [appointmentForSlot, isFocused]);

  const confirmBookingHandler = () => {
    // const newArr = appointmentForSlot[0].appointments.map((i) => ({
    //   ...i,
    //   bookedFor: moment(i.bookedFor).format('hh:mm'),
    // }));

    // const currTime = moment().format('hh:mm');
    // const compareTime = moment(currTime, 'hh:mm');
    // const SlotNow = newArr.find((time) => {
    //   const diff = moment(time.bookedFor, 'hh:mm').diff(compareTime, 'minutes');
    //   return diff >= 0;
    // });

    // setLoading(true);
    const appointmentBookingData = {
      timeSlot: Slot ? Slot._id : appointmentTime?._id,
      patient: patient._id,
      forWhom: 'Myself',
      patientInfo: {
        name: `${patientInfo.firstName} ${patientInfo.lastName}`,
        firstName: patientInfo.firstName,
        lastName: patientInfo.lastName,
        contact: patientInfo.phone,
        age: patientInfo.age,
        gender: patientInfo.gender || patientInfo.sex,
        meta: patientInfo.meta,
      },
      reasonForVisit: details.questions5.a,
      //   fee: doctor?.fee,
      fee: 0,
      doctor: doctor?._id,
    };
    // handle success
    dispatch(
      bookAppointment(
        {
          ...appointmentBookingData,
          amount: '0',
          fee: '0',
          quiz: concernData,
          patientInfo: JSON.stringify({
            ...appointmentBookingData.patientInfo,
          }),
        },
        (dataId) => {
          setLoading(false);
          dispatch(
            AddTransactions({
              id: userData._id,
              amount: appointmentBookingData.fee,
              reason: appointmentBookingData.reasonForVisit,
              date: new Date(),
              doctor: appointmentBookingData.doctor,
            }),
          );
          // navigation.navigate('Appointments', { reset: true });
          navigation.navigate('ConfirmAppointment', {
            doctor,
            concernData,
            patientInfo,
            dataId,
          });

          Axios.post(`${Host}/notification/send`, {
            deviceToken: deviceToken,
            // deviceToken: ["ef9nteQUTY-j2mO3vSwXOF:APA91bFXKksWyLyVO6GRdr-4-eNHVzLhk3uXLb5pCUf0sJSh3JLmvkrM5sOotmnG1uRBlw-01BFlDJxXFX9pxWMCBSwyvlUOLEjcYNG0wUgRfKuN61jpY_P2uaR5Uguv0bJJ-3NEl_wZ"],
            data: {
              title: 'Appointment booked.',
              description: `A appointment has been booked for ${moment(
                appointmentBookingData?.bookedFor,
              ).format('LLLL')}. Check application for more details`,
            },
          })
            .then((res) => {
              console.log(
                res.data.data,
                '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
              );
            })
            .catch((e) => {
              console.log(
                e.response.data,
                '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
              );
            });
        },
      ),
    );
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [isKeyboardVisible]);
  useEffect(() => {
    if (
      details.questions1.a !== '' &&
      details.questions2.a !== '' &&
      details.questions3.a !== '' &&
      details.questions4.a !== ''
    ) {
      setCanSaveConcern(true);
      console.log('hello');
    } else {
      console.log('blocks');

      // setCanSaveConcern(true);
    }
  }, [details]);
  useEffect(() => {
    setPaientInfo(patient);
  }, [patient]);

  const GetFamilyMemberDetails = async (item) => {
    try {
      const res = await Axios.get(`${Host}/patient/getfullinfo/${item.id}`);
      let { data } = res.data;
      // console.log('result', data);
      setPaientInfo({ ...data, sex: item.gender, age: item.birthdate });
      setSwitchProfileModal(false);
      // setConcernData([]);
    } catch (error) {
      console.log(error);
    }
  };
  const [concernData, setConcernData] = useState([]);
  const onChangeNumber = (text) => {
    setSearch(text);
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (searchConsern === '') {
      setFilterData(consern);
    }
  }, [searchConsern]);

  const searchFilter = (text) => {
    if (text) {
      setLoading(true);
      const newData = consern.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearchConsern(text);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      // console.log(newData);
    } else {
      setFilterData(consern);
      setSearchConsern(text);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      // console.log('no data');
    }
  };
  const Time = moment(appointmentTime?.bookedFor).format('hh:mm A');

  // console.log('======<<<<<<<<<', concernData);

  const availbaleTime = moment(
    Slot ? Slot?.bookedFor : appointmentTime?.bookedFor,
  ).format('hh:mm A');
  // console.log(
  //   '==================xxxxxxxxxxxxxxxxxxx',
  //   Time,
  //   availbaleTime,
  //   nextSlot,
  // );
  const availbaleSlot = moment(
    Slot ? Slot?.bookedFor : appointmentTime?.bookedFor,
  ).format('MM/DD/YYYY');
  const nowDate = moment().format('MM/DD/YYYY');
  const tomorrow = moment().add(1, 'day').format('MM/DD/YYYY');
  const nextAvailableSlot = moment(
    Slot ? Slot?.bookedFor : appointmentTime?.bookedFor,
  ).format('dddd, DD MMMM YYYY');
  function TodayOrTomorrow() {
    if (availbaleSlot === nowDate) {
      return 'Today';
    }
    if (availbaleSlot === tomorrow) {
      return 'Tomorrow';
    }
    return nextAvailableSlot;
  }

  const ConfirmBottomCard = () => {
    return (
      <View style={{ zIndex: 9999, backgroundColor: '#F9F9F9', elevation: 20 }}>
        {/* <View
          style={{
            marginHorizontal: 20,
            backgroundColor:
              (!modal && concernData.length > 0) || canSaveConcern
                ? '#2D7D8E'
                : '#789DA5',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 8,
            marginVertical: 10,
          }}> */}
        <LinearGradient
          colors={
            (!modal && concernData.length > 0) || canSaveConcern
              ? ['#2D7D8E', '#246370']
              : ['rgba(45, 125, 142, 0.5)', 'rgba(36, 99, 112, 0.5)']
          }
          // start={{ x: 0, y: 0 }}
          // end={{ x: 1, y: 0 }}
          style={{
            marginHorizontal: 20,
            // backgroundColor:
            //   (!modal && concernData.length > 0) || canSaveConcern
            //     ? '#2D7D8E'
            //     : '#789DA5',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 8,
            marginVertical: 10,
          }}>
          <View>
            <Text
              style={{
                marginBottom: 5,
                color: '#FFFFFF',
                fontSize: 14,
                fontFamily: 'Gilroy-Medium',
              }}>
              {TodayOrTomorrow() === 'Today'
                ? nextSlot === availbaleTime || Time === availbaleTime
                  ? `${Local(
                      'doctor.V2.DoctorProfileScreen.bottom_card.Next_available_slot',
                    )}`
                  : `${Local(
                      'doctor.V2.DoctorProfileScreen.bottom_card.appointment_time',
                    )}`
                : `${Local(
                    'doctor.V2.DoctorProfileScreen.bottom_card.appointment_time',
                  )}`}
            </Text>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,

                fontFamily: 'Gilroy-SemiBold',
              }}>
              {Slot
                ? availbaleTime
                : moment(appointmentTime?.bookedFor).format('hh:mm A')}
              , {TodayOrTomorrow()}
            </Text>
          </View>
          <TouchableOpacity
            disabled={
              (!modal && concernData.length > 0) || canSaveConcern
                ? false
                : true
            }
            onPress={() => {
              if (modal) {
                setConcernData([...concernData, details]);
                setModal(false);
                removeDetails();
                setCanSaveConcern(false);
              } else {
                confirmBookingHandler();
                console.log('confiremd');
              }
            }}
            // onPress={() => {
            //   if (Slot)
            //     navigation.navigate('DoctorProfileConfirmBooking', {
            //       doctor: { ...params, image: img, educationDetails: education },
            //       Slot: Slot,
            //     });
            //   else setShowOverviewTab('availibility');
            // }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  marginRight: 10,
                  fontFamily: 'Gilroy-Bold',
                }}>
                {modal
                  ? `${Local(
                      'doctor.V2.DoctorProfileScreen.bottom_card.continue',
                    )}`
                  : Slot
                  ? `${Local('doctor.V2.DoctorProfileScreen.bottom_card.book')}`
                  : `${Local(
                      'doctor.V2.DoctorProfileScreen.bottom_card.confirm',
                    )}`}
              </Text>
              <AntDesign size={20} name="caretright" color="#FFFFFF" />
              {/* <Image
                source={require('../../../src/assets/icons/Polygon.png')}
                style={{ height: 20, width: 20, resizeMode: 'contain' }}
              /> */}
            </View>
          </TouchableOpacity>
        </LinearGradient>
        {/* </View> */}
      </View>
    );
  };

  const currencyConverterEndPoint = 'https://api.frankfurter.app';
  const [currencyList, setCurrencyList] = useState([]);
  const [covertFee, setConvertFee] = useState();

  const fetchCurrencyLatest = () => {
    return fetch(`${currencyConverterEndPoint}/latest`)
      .then((res) => res.json())
      .then((data) => Object.keys(data.rates));
  };

  const convertCurrency = (amount, sourceCurrency, targetCurrency) => {
    return fetch(
      `${currencyConverterEndPoint}/latest?amount=${amount}&from=${sourceCurrency}&to=${targetCurrency}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.rates.USD, 'currency data ======');
        setConvertFee(Math.round(data.rates.USD))
      });
  };

  useEffect(() => {
    const language = async () => {
      const value = await AsyncStorage.getItem('currencyRate');
      if (value === null) {
        await AsyncStorage.setItem('currencyRate', 'INR');
      } else {
        setRate(value);
      }
    };

    language();
  }, [rate]);

  console.log(rate, '=====rate');

  

  useEffect(() => {
    fetchCurrencyLatest().then((list) => setCurrencyList(list));

    convertCurrency(doctor?.fee, 'INR', "USD").then((data) =>
      console.log(data, '==========convert data'),
    );
  }, []);

  return (
    <View style={styles.container}>
      <TopNavBar
        navigation={navigation}
        headerText={`${Local('doctor.V2.appointment_detail.title')}`}
      />
      <ScrollView>
        <DoctorTopCompo
          appointmentTime={appointmentTime}
          recentPatient={recentPatient}
          coverPhoto={doctor?.coverPhoto}
          name={doctor?.basic?.name}
          specialty={doctor?.specialty || doctor?.specialties[0]}
          study={doctor?.educationDetails}
          experience={doctor?.experience}
          price={covertFee}
          id={doctor}
          date={date}
          slot={Slot}
        />
        <PatientProfile
          patient={patient}
          patientInfo={patientInfo}
          setSwitchProfileModal={setSwitchProfileModal}
        />
        <View style={{ marginHorizontal: 20, marginVertical: 30 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                color: '#000000',
                fontSize: 18,
              }}>
              {`${Local('doctor.V2.appointment_detail.concern')}`}
            </Text>
            <TouchableOpacity onPress={() => setModal(true)}>
              <AntDesign name="pluscircle" color="#EA1A65" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <Slider
          value={details.seavere}
          onValueChange={(val) => setDetails({ ...details, seavere: val })}
          maximumValue={5}
          minimumValue={0}
          step={1}
          allowTouchTrack
          trackStyle={{
            height: 5,
            backgroundColor: 'transparent',
          }}
          thumbStyle={{
            height: 20,
            width: 20,
            backgroundColor: 'transparent',
          }}
          thumbProps={{
            children: (
              <Icon
                name="heartbeat"
                type="font-awesome"
                size={20}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color="green"
              />
            ),
          }}
        /> */}
        {concernData.length > 0 ? (
          <View>
            {concernData?.map((item, i) => (
              <PatientConcernCard item={item} keyValue={i} />
            ))}
            <LinearGradient
              colors={['#3EAEAE', '#077EE9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                marginVertical: 10,
                marginHorizontal: 15,
                elevation: 6,
                backgroundColor: '#fff',
                borderRadius: 13,

                flexDirection: 'row',
                padding: 20,
                justifyContent: 'space-between',
              }}>
              <View style={{ width: '80%' }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy-Medium',
                    fontSize: 20,
                  }}>
                  {`${Local('doctor.V2.appointment_detail.plusCard.get')}`}
                </Text>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy-Medium',
                    fontSize: 20,
                  }}>
                  {`${Local('doctor.V2.appointment_detail.plusCard.with')}`}
                </Text>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy-Bold',
                    fontSize: 20,
                  }}>
                  {`${Local('doctor.V2.appointment_detail.plusCard.pro')}`}
                </Text>
              </View>
              <View style={{ justifyContent: 'flex-end' }}>
                <TouchableOpacity>
                  <AntDesign name="arrowright" color="#FFFFFF" size={26} />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        ) : (
          <View />
        )}

        <Modal
          animationType="fade"
          visible={switchProfileModal}
          transparent={true}
          onRequestClose={() => {
            setSwitchProfileModal(false);
          }}>
          <TouchableOpacity
            onPress={() => {
              setSwitchProfileModal(false);
              removeDetails();
            }}
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'rgba(0,0,0,0.4)',
            }}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  flex: 1,
                  padding: 15,
                }}>
                <View
                  style={{
                    // height: 360,
                    marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#51B7B7',
                      padding: 6,
                      borderRadius: 20,
                      marginBottom: 20,
                    }}>
                    <Image
                      source={require('../../assets/logo/favicon.png')}
                      style={{ height: 80, width: 80 }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 26,
                      color: '#297281',
                      fontFamily: 'Gilroy-SemiBold',
                      marginVertical: 20,
                    }}>
                    Switch profile
                  </Text>
                  <Text
                    style={{
                      maxWidth: '80%',
                      textAlign: 'center',
                      fontSize: 18,
                      lineHeight: 18,
                      color: 'grey',
                      fontFamily: 'Gilroy-Regular',
                    }}>
                    Choose a profile for consultation
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    // alignItems: 'center',
                    justifyContent: 'center',
                    // maxWidth: '70%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setPaientInfo(patient);
                      setSwitchProfileModal(false);
                    }}
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
                    {patientInfo?.picture ? (
                      <Image
                        source={{
                          uri: `${Host}${patient.picture
                            .replace('public', '')
                            .replace('\\\\', '/')}`,
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
                        color: patient.AddIcon && '#3188DB',
                        // marginVertical:5
                      }}>
                      {patient.firstName} {patient.lastName}
                    </Text>
                  </TouchableOpacity>
                  {familyMember.map((item, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => GetFamilyMemberDetails(item)}
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
                      {item.image ? (
                        <Image
                          source={item.image}
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
                            {item.firstName[0]} {item.lastName[0]}
                          </Text>
                        </View>
                      )}
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Medium',
                          fontSize: 15,
                          maxWidth: '80%',
                          textAlign: 'center',
                          color: item.AddIcon && '#3188DB',
                          // marginVertical:5
                        }}>
                        {item.firstName} {item.lastName}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>

        <Modal
          animationType="fade"
          visible={modal}
          transparent={true}
          onRequestClose={() => {
            setModal(false);
            setCanSaveConcern(false);
            removeDetails();
          }}>
          <BlurView
            blurRadius={7}
            downsampleFactor={1}
            overlayColor={colorv2.blur_overlay_color[theme]}
            blurAmount={1}
            style={StyleSheet.absoluteFill}
            blurType="light"
          />
          <TouchableOpacity
            onPress={() => {
              setModal(false);
              setCanSaveConcern(false);
              removeDetails();
            }}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
              // backgroundColor: 'rgba(0,0,0,0.4)',
            }}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  zIndex: 1,
                  backgroundColor: '#FFFFFF',
                  maxHeight: isKeyboardVisible ? windowHeight / 2 : 600,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <Text
                  style={{
                    marginTop: 30,
                    paddingHorizontal: 25,
                    fontFamily: 'Gilroy-Medium',
                    fontSize: 20,
                    color: '#000000',
                    paddingRight: 50,
                    lineHeight: 23,
                  }}>
                  {`${Local('doctor.V2.appointment_detail.modal.title')}`}
                </Text>
                <View style={{ marginVertical: 20, paddingHorizontal: 25 }}>
                  <InsetShadow
                    shadowOpacity={1}
                    shadowOffset={15}
                    containerStyle={styles.numberField}
                    // shadowOffset={10}
                    elevation={12}>
                    <TextInput
                      style={styles.input}
                      // editable={open ? false : true}

                      // onPress={() => setOpen(true)}
                      onChangeText={(text) => searchFilter(text)}
                      value={searchConsern}
                      placeholder={`${Local(
                        'doctor.V2.appointment_detail.modal.search',
                      )}`}
                    />

                    {searchConsern !== '' ? (
                      <View>
                        {loading ? (
                          <ActivityIndicator color="gray" size="small" />
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              removeDetails();
                              setSearchConsern('');
                            }}>
                            <AntDesign
                              name="closecircle"
                              size={20}
                              style={{ color: '#297281' }}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : null}
                  </InsetShadow>
                </View>

                {/* Cards  */}
                <View>
                  <ScrollView>
                    <View style={{ marginBottom: 150 }}>
                      <View
                        style={{
                          display:
                            details.questions1.a === '' ? 'flex' : 'none',
                        }}>
                        <Text
                          style={{
                            marginTop: 10,
                            paddingHorizontal: 25,
                            fontFamily: 'Gilroy-SemiBold',
                            fontSize: 20,
                            color: '#297281',
                            paddingRight: 50,
                            lineHeight: 23,
                          }}>
                          {`${Local(
                            'doctor.V2.appointment_detail.modal.common',
                          )}`}
                        </Text>
                        <View
                          style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            flexWrap: 'wrap',
                            paddingBottom: 10,
                          }}>
                          {filterData.map((item) => (
                            <TouchableOpacity
                              key={item.name}
                              onPress={() => {
                                setDetails((prevState) => ({
                                  ...details,
                                  questions1: {
                                    ...prevState.questions1,
                                    a: item.name,
                                  },
                                }));
                                setSearchConsern(item.name);
                                setLoading(false);
                              }}
                              // onPress={async () => {
                              //   let data = {
                              //     name: item.name,
                              //   };
                              //   await AsyncStorage.setItem('name', JSON.stringify(data))
                              //     .then(() =>
                              //       // navigation.navigate('all-doctor', {
                              //       //   consern: item.name,
                              //       // }),
                              //       setIsVisible(false),
                              //     )
                              //     .then(() => nextStep());
                              // }}
                              style={{
                                backgroundColor: 'white',
                                paddingHorizontal: 30,
                                paddingVertical: 15,
                                width: '40%',
                                marginHorizontal: 10,
                                borderRadius: 50,
                                marginVertical: 5,
                                shadowColor: '#171717',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
                                // borderWidth: user.name === item.name ? 1 : 0,
                                borderColor: '#EA1A65',
                              }}>
                              <Highlighter
                                style={{
                                  color: '#000000',
                                  fontSize: 18,

                                  textAlign: 'center',
                                  fontFamily: 'Gilroy-SemiBold',
                                }}
                                highlightStyle={{ color: '#EA1A65' }}
                                searchWords={[searchConsern]}
                                textToHighlight={item.name.substr(0, 16)}
                              />
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>

                      {/* start */}
                      <TouchableWithoutFeedback>
                        <View
                          style={{
                            display:
                              details.questions1.a === '' ? 'none' : 'flex',
                          }}>
                          <View
                            style={{
                              marginHorizontal: 20,
                              padding: 20,
                              marginVertical: 20,
                              backgroundColor: '#FFFFFF',
                              borderRadius: 15,
                              elevation: 10,
                            }}>
                            <View>
                              <View style={{ flexDirection: 'row' }}>
                                <Text
                                  style={{
                                    fontFamily: 'Gilroy-Medium',
                                    fontSize: 18,
                                  }}>
                                  1.
                                </Text>
                                <Text
                                  style={{
                                    marginLeft: 20,
                                    fontFamily: 'Gilroy-Medium',
                                    fontSize: 18,
                                    paddingRight: 50,
                                    lineHeight: 23,
                                  }}>
                                  {`${Local(
                                    'doctor.V2.appointment_detail.question.q2',
                                  )}`}
                                  *
                                </Text>
                              </View>
                              <View style={{ padding: 25 }}>
                                {[
                                  '1 - 2 days',
                                  '3 - 10 days',
                                  'more than 10 days',
                                  'more than 1 month',
                                ].map((item, i) => (
                                  <TouchableOpacity
                                    onPress={() =>
                                      setDetails((prevState) => ({
                                        ...details,
                                        questions2: {
                                          ...prevState.questions2,
                                          a: item,
                                        },
                                      }))
                                    }
                                    key={i}
                                    style={{
                                      marginVertical: 10,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <InsetShadow
                                      shadowOpacity={1}
                                      shadowOffset={15}
                                      shadowRadius={15}
                                      containerStyle={{
                                        borderRadius: 50,
                                        width: 25,
                                        height: 25,
                                        backgroundColor: '#fff',
                                      }}
                                      // shadowOffset={10}
                                      elevation={12}>
                                      <View
                                        style={{
                                          width: 25,
                                          height: 25,
                                          // elevation: 0.1,
                                          borderWidth:
                                            details.questions2.a === item
                                              ? 6
                                              : 0,
                                          borderRadius: 15,
                                          borderColor:
                                            details.questions2.a === item
                                              ? '#3893E4'
                                              : 'white',
                                        }}></View>
                                    </InsetShadow>
                                    <Text
                                      style={{
                                        marginHorizontal: 10,
                                        fontFamily: 'Gilroy-Regular',
                                        fontSize: 16,
                                        color: '#000000',
                                      }}>
                                      {item}
                                    </Text>
                                  </TouchableOpacity>
                                ))}
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              marginHorizontal: 20,
                              padding: 20,
                              marginVertical: 20,
                              backgroundColor: '#FFFFFF',
                              borderRadius: 15,
                              elevation: 10,
                            }}>
                            <View>
                              <View style={{ flexDirection: 'row' }}>
                                <Text
                                  style={{
                                    fontFamily: 'Gilroy-Medium',
                                    fontSize: 18,
                                  }}>
                                  2.
                                </Text>
                                <Text
                                  style={{
                                    marginLeft: 20,
                                    fontFamily: 'Gilroy-Medium',
                                    fontSize: 18,
                                    paddingRight: 50,
                                    lineHeight: 23,
                                  }}>
                                  {`${Local(
                                    'doctor.V2.appointment_detail.question.q3',
                                  )}`}
                                  *
                                </Text>
                              </View>
                              <View style={{ padding: 25 }}>
                                {[
                                  'Everyday',
                                  'Once a week',
                                  'More than once a week',
                                ].map((item, i) => (
                                  <TouchableOpacity
                                    onPress={() =>
                                      setDetails((prevState) => ({
                                        ...details,
                                        questions3: {
                                          ...prevState.questions3,
                                          a: item,
                                        },
                                      }))
                                    }
                                    key={i}
                                    style={{
                                      marginVertical: 10,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <InsetShadow
                                      shadowOpacity={1}
                                      shadowOffset={15}
                                      shadowRadius={15}
                                      containerStyle={{
                                        borderRadius: 50,
                                        width: 23,
                                        height: 23,
                                        backgroundColor: '#fff',
                                      }}
                                      // shadowOffset={10}
                                      elevation={12}>
                                      <View
                                        style={{
                                          width: 23,
                                          height: 23,
                                          // elevation: 0.1,
                                          borderWidth:
                                            details.questions3.a === item
                                              ? 6
                                              : 0,
                                          borderRadius: 15,
                                          borderColor:
                                            details.questions3.a === item
                                              ? '#3893E4'
                                              : 'white',
                                        }}></View>
                                    </InsetShadow>
                                    <Text
                                      style={{
                                        marginHorizontal: 10,
                                        fontFamily: 'Gilroy-Regular',
                                        fontSize: 16,
                                        color: '#000000',
                                      }}>
                                      {item}
                                    </Text>
                                  </TouchableOpacity>
                                ))}
                              </View>
                            </View>
                          </View>
                          {/* slider */}
                          <View
                            style={{
                              marginHorizontal: 20,
                              padding: 20,
                              marginVertical: 20,
                              backgroundColor: '#FFFFFF',
                              borderRadius: 15,
                              elevation: 10,
                            }}>
                            <View>
                              <View style={{ flexDirection: 'row' }}>
                                <Text
                                  style={{
                                    fontFamily: 'Gilroy-Medium',
                                    fontSize: 18,
                                  }}>
                                  3.
                                </Text>
                                <Text
                                  style={{
                                    marginLeft: 20,
                                    fontFamily: 'Gilroy-Medium',
                                    fontSize: 18,
                                    paddingRight: 50,
                                    lineHeight: 23,
                                  }}>
                                  {`${Local(
                                    'doctor.V2.appointment_detail.question.q4',
                                  )}`}
                                  *
                                </Text>
                              </View>
                              <View style={{ padding: 25 }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginHorizontal: 15,
                                  }}>
                                  {['1', '2', '3', '4', '5'].map((num) => (
                                    <Text
                                      style={{
                                        fontFamily: 'Gilroy-Medium',
                                        fontSize: 16,
                                        color: '#000000',
                                      }}
                                      key={num}>
                                      {num}
                                    </Text>
                                  ))}
                                </View>
                                <View>
                                  <Slider
                                    style={{ width: '100%' }}
                                    trackStyle={{
                                      height: hp(1.6),
                                      borderRadius: 8,
                                    }}
                                    value={2}
                                    minimumValue={0}
                                    maximumValue={4}
                                    minimumTrackTintColor={Colors.color20}
                                    maximumTrackTintColor={Colors.color21}
                                    thumbStyle={styles.thumbImage}
                                    thumbTintColor={Colors.white}
                                    // style={{width: 280, height: 40}}
                                    // minimumValue={0}
                                    // maximumValue={4}
                                    // thumbTintColor="#3893E4"
                                    // maximumTrackTintColor="lightgray"
                                    // minimumTrackTintColor="#3893E4"
                                    // tapToSeek={true}
                                    // thumbTouchSize={{ width: 50, height: 40 }}
                                    // thumbImage={
                                    //   <AntDesign
                                    //     name="closecircle"
                                    //     size={20}
                                    //     style={{ color: '#297281' }}
                                    //   />
                                    // }
                                    // inverted
                                    // style={{
                                    //   width: '100%',
                                    //   opacity: 1,
                                    //   height: 50,
                                    //   marginTop: 10,
                                    // }}
                                    step={1}
                                    onValueChange={(val) =>
                                      setDetails((prevState) => ({
                                        ...details,
                                        questions4: {
                                          ...prevState.questions4,
                                          a:
                                            val === 0
                                              ? 'least'
                                              : val === 4
                                              ? 'very'
                                              : val,
                                        },
                                      }))
                                    }
                                  />
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginHorizontal: 15,
                                  }}>
                                  <Text
                                    style={{
                                      color: '#3F3F3F',
                                      fontSize: 14,
                                      fontFamily: 'Gilroy-Medium',
                                    }}>
                                    {`${Local(
                                      'doctor.V2.appointment_detail.question.least',
                                    )}`}
                                  </Text>
                                  <Text
                                    style={{
                                      color: '#3F3F3F',
                                      fontSize: 14,
                                      fontFamily: 'Gilroy-Medium',
                                    }}>
                                    {`${Local(
                                      'doctor.V2.appointment_detail.question.mild',
                                    )}`}
                                  </Text>
                                  <Text
                                    style={{
                                      color: '#3F3F3F',
                                      fontSize: 14,
                                      fontFamily: 'Gilroy-Medium',
                                    }}>
                                    {`${Local(
                                      'doctor.V2.appointment_detail.question.very',
                                    )}`}
                                  </Text>
                                </View>
                                {/* <Slider
                                value={value}
                                onValueChange={(val) => setValue(val)}
                                maximumValue={5}
                                minimumValue={0}
                                step={1}
                                allowTouchTrack
                                trackStyle={{
                                  height: 5,
                                  backgroundColor: '#3893E4',
                                  color: '#3893E4',
                                }}
                                thumbStyle={{
                                  height: 20,
                                  width: 20,
                                  color: '#3893E4',
                                  backgroundColor: '#3893E4',
                                }}
                                thumbProps={{
                                  children: (
                                    <Icon
                                      name="heartbeat"
                                      type="font-awesome"
                                      size={20}
                                      reverse
                                      containerStyle={{ bottom: 20, right: 20 }}
                                      color="green"
                                    />
                                  ),
                                }}
                              /> */}
                              </View>
                            </View>
                          </View>
                          {/* describe */}
                          <View
                            style={{
                              marginHorizontal: 20,
                              padding: 20,
                              marginVertical: 20,
                              backgroundColor: '#FFFFFF',
                              borderRadius: 15,
                              elevation: 10,
                            }}>
                            <View>
                              <View>
                                <Text
                                  style={{
                                    fontFamily: 'Gilroy-Medium',
                                    fontSize: 18,
                                  }}>
                                  4.
                                </Text>
                                <Text
                                  style={{
                                    marginLeft: 20,
                                    fontFamily: 'Gilroy-Medium',
                                    fontSize: 18,
                                    paddingRight: 50,
                                    lineHeight: 23,
                                  }}>
                                  {`${Local(
                                    'doctor.V2.appointment_detail.question.q5',
                                  )}`}
                                  *
                                </Text>
                                <Text
                                  style={{
                                    marginLeft: 20,
                                    fontFamily: 'Gilroy-Medium',
                                    fontSize: 16,
                                    color: 'lightgray',
                                    lineHeight: 23,
                                  }}>
                                  {`${Local(
                                    'doctor.V2.appointment_detail.question.optional',
                                  )}`}
                                </Text>
                              </View>
                              <View style={{ padding: 25 }}>
                                <View>
                                  <InsetShadow
                                    shadowOpacity={1}
                                    shadowOffset={15}
                                    containerStyle={styles.describe}
                                    // shadowOffset={10}
                                    elevation={12}>
                                    <TextInput
                                      multiline={true}
                                      value={details.questions5.a}
                                      onChangeText={(text) =>
                                        setDetails((prevState) => ({
                                          ...details,
                                          questions5: {
                                            ...prevState.questions5,
                                            a: text,
                                          },
                                        }))
                                      }
                                      placeholder={`${Local(
                                        'doctor.V2.appointment_detail.question.placeholder',
                                      )}`}
                                      placeholderTextColor="#7B7A79"
                                      style={{
                                        height: '100%',
                                        textAlignVertical: 'top',
                                        padding: 10,
                                        fontFamily: 'Gilroy-Medium',
                                      }}
                                    />
                                  </InsetShadow>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                      {/* end */}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>

          <ConfirmBottomCard />
        </Modal>

        {/* <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: '#fff7f9',

              height: 800,
            },
            // wrapper: {
            //   borderTopRightRadius: 30,
            // },
            // draggableIcon: {
            //   display: 'none',
            // },
          }}> */}

        {/* </RBSheet> */}
        <View style={{ height: 60 }} />
      </ScrollView>
      <ConfirmBottomCard />
    </View>
  );
};

const PatientConcernCard = ({ item, keyValue }) => {
  const [expand, setExpand] = useState(false);
  // console.log('==============item', item);
  return (
    <View
      key={keyValue}
      style={{
        marginVertical: 10,
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
        <TouchableOpacity onPress={() => setSwitchProfileModal(true)}>
          <Text
            style={{
              color: '#EA1A65',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.appointment_detail.switch_profile')}`}
          </Text>
        </TouchableOpacity>
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
            {patientInfo?.picture ? (
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
}) => {
  // console.log('coverPhoto============>>>>>>>>', coverPhoto);
  name = name?.split(' ');
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
        marginVertical: 20,
        marginHorizontal: 15,
        elevation: 6,
        backgroundColor: '#fff',
        borderRadius: 13,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: 23,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
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
            <Favorites setLoading={() => {}} doctor={id} />
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
          <FontAwesome name="calendar-check-o" color="#297281" size={20} />
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',
              fontSize: 14,
              marginLeft: 10,
            }}>
            {moment(slot ? slot.bookedFor : appointmentTime?.bookedFor).format(
              'dddd, DD MMMM YYYY, hh:mm A',
            )}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* <FontAwesomeIcon name="rupee" color="#000" size={16} /> */}
          <Text style={{
            ...styles.text,
            fontSize: 18,
            // fontFamily: 'Gilroy',
            fontWeight: '900',
            marginLeft: 3,
          }}>USD</Text>
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

export default AppointmentDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7f9',
  },
  thumbImage: {
    width: width * 0.08,
    height: width * 0.08 * 1,
    borderRadius: (width * 0.08 * 1) / 2,
    borderWidth: 3,
    borderColor: Colors.color20,
  },
  numberField: {
    alignSelf: 'stretch',
    borderRadius: 10,
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    height: 50,
    // marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  describe: {
    alignSelf: 'stretch',
    borderRadius: 10,
    textAlignVertical: 'center',
    // paddingHorizontal: 10,
    height: 130,
    padding: 5,

    // marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    // height: 40,
    // margin: 12,
    // borderWidth: 1,
    // padding: 10,
    flex: 1,
    // width: '100%',
  },
});
