import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import {
  NEW_HEADER_TEXT,
  GREY_OUTLINE,
  SECONDARY_COLOR,
  INPUT_PLACEHOLDER,
} from '../../../styles/colors';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import RazorpayCheckout from 'react-native-razorpay';
import { useDispatch, useSelector } from 'react-redux';
import {
  bookAppointment,
  AddTransactions,
} from '../../../reduxV2/action/PatientAction';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';
import BlurModal from '../../../components/molecules/Modal/BlurModal';
import { socket } from '../../../utils/socket';
import { Host } from '../../../utils/connection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Axios from 'axios';
import {
  profilePicUploaded,
  startLoading,
} from '../../../reduxV2/action/PatientAction';

const PaymentsV2 = ({ route, navigation }) => {
  const Socket = useRef(socket).current;
  const dispatch = useDispatch();
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const {
    appointmentBookingData,
    doctorDataPayment,
    _isFollowUpAvaiable,
    QandA,
    // currency,
    deviceToken,
  } = route.params;
  const [loading, setLoading] = useState(true);

  const [auto, setAuto] = useState(true);

  // const getcurrency = async () => {
  //   return
  // }

  // const currency = getcurrency()
  // console.log(await AsyncStorage.getItem("currency"), "^^^^^^^^^^^^^^")

  const OnClickPay = async () => {
    const currency = await AsyncStorage.getItem('currency');
    setAuto(false);
    setLoading(true);
    if (
      (doctorDataPayment ||
        !_isFollowUpAvaiable ||
        (appointmentBookingData?.fee && appointmentBookingData?.fee != 0) ||
        appointmentBookingData?.fee) &&
      appointmentBookingData?.payment
    ) {
      var options = {
        key: 'rzp_test_hRsc7oAQ82vplt',
        amount: appointmentBookingData.fee
          ? parseInt(appointmentBookingData.fee) * 100
          : 500 * 100, //for rupees-paise conversion
        currency: currency ? currency : 'INR',
        // currency: 'INR',
        name: 'DocPlus', // company or merchant name
        description: 'Consultation fees',
        image: 'https://i.imgur.com/3g7nmJC.png',
        // order_id: 'order_DslnoIgkIDL8Zt',
        prefill: {
          email: userData.email,
          contact: userData.phone,
          name: `${userData.firstName} ${userData.lastName}`,
        },
        theme: { color: '#43A2A2' },
      };
      console.log(options, ':::::::::::');
      RazorpayCheckout.open(options)
        .then((response) => {
          // const data = {
          //   orderCreationId: order_id,
          // };
          setLoading(true);
          // handle success
          dispatch(
            bookAppointment(
              {
                ...appointmentBookingData,
                paid: true,
                razorpayPaymentId: response.razorpay_payment_id,
                // razorpayOrderId: response.razorpay_order_id,
                // razorpaySignature: response.razorpay_signature,
                amount: appointmentBookingData.fee,
                patientInfo: JSON.stringify({
                  ...appointmentBookingData.patientInfo,
                  QandA,
                }),
              },
              () => {
                console.log('in handle succes');

                dispatch(
                  AddTransactions({
                    id: userData._id,
                    amount: appointmentBookingData.fee,
                    reason: appointmentBookingData.reasonForVisit,
                    date: new Date(),
                    doctor: appointmentBookingData.doctor,
                  }),
                );
                //add empty convo
                console.log('socket');
                Socket.current.emit('add_empty_convo', {
                  from: userData._id,
                  to: appointmentBookingData.doctor._id,
                  message: '',
                  toType: 'doctor',
                  fromType: 'patient',
                });
                setLoading(false);
              },
              (id) => {
                console.log('in handle invoice');
                setLoading(false);
                navigation.navigate('invoice', {
                  id,
                  bookedFor: appointmentBookingData?.bookedFor,
                });
                console.log(
                  deviceToken,
                  '^^^^^^^^^^^^^^^^^^^^^^^^^^%%%%%%%%%%%%%%%%%%%%%%%%%%%',
                );
                Axios.post(`${Host}/notification/send`, {
                  deviceToken: deviceToken,
                  data: {
                    title: 'Appointment booked',
                    description: `A appointment has been booked for ${moment(
                      appointmentBookingData?.bookedFor,
                    ).format('LLLL')}. Check application for more details`,
                  },
                })
                  .then((res) => {
                    console.log(res.data.data);
                    // to make loading false.
                  })
                  .catch((e) => {
                    console.log(e.response.data);
                  });

                // Axios.post(`${Host}/notification/send`, {
                //   deviceToken: appointmentBookingData?.deviceToken,
                //   data: {
                //     title: "Appointment Booked!",
                //     description: "Your Appointment has been booked"
                //   }
                // }).then(() => {

                // }).catch((e) => {
                //   console.log(e.response.data)
                // })

                // navigation.navigate('AppointmentsHome')
                // navigation.navigate('Appointments', {reset: true});
              },
            ),
          );
        })
        .catch((error) => {
          // handle failure
          console.log('error:', error);
          setLoading(false);
        });
    } else {
      dispatch(
        bookAppointment(
          {
            ...appointmentBookingData,
            amount: '0',
            fee: '0',
            patientInfo: JSON.stringify({
              ...appointmentBookingData.patientInfo,
              QandA,
            }),
          },
          () => {
            setLoading(false);
            // dispatch(
            //   AddTransactions({
            //     id: userData._id,
            //     amount: appointmentBookingData.fee,
            //     reason: appointmentBookingData.reasonForVisit,
            //     date: new Date(),
            //     doctor: appointmentBookingData.doctor,
            //   }),

            // );
            // navigation.navigate('Appointments', {reset: true});

            navigation.navigate('Home', {
              screen: 'Appointments',
            });

            // navigation.navigate('Home', {
            //   screen: 'Appointments',
            //   params: {
            //     screen: 'ConfirmAppointment',
            //     params: {
            //       data: {...slot, forWhom},
            //       doctorData,
            //     },
            //   },
            // });

            console.log(deviceToken, '%%%%%%%%%%%%%%%%%%%%%%%%%%%');
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

            // Axios.post(`${Host}/notification/send`, {
            //   deviceToken: appointmentBookingData?.deviceToken,
            //   data: {
            //     title: "Appointment Booked!",
            //     description: "Your Appointment has been booked"
            //   }
            // }).then(() => {

            // }).catch((e) => {
            //   console.log(e.response.data)
            // })
          },
        ),
      );
    }
  };

  useEffect(() => {
    // setLoading(true)
    auto && OnClickPay();
  }, []);
  return (
    <View style={styles.Container}>
      <TopNavBar
        headerText={`${Local('patient.transactions.payment')}`}
        navigation={navigation}
        style={{
          Container: {
            height: 'auto',
            paddingTop: 5,
          },
        }}
      />
      <BlurModal visible={loading}>
        <ActivityIndicator color="#009387" size="large" />
      </BlurModal>
      {/* <ScrollView style={styles.ScrollView}>
        <View style={[styles.rootGroup, {marginTop: 40}]}>
          <Text style={styles.rootHeading}>Credit/ Debit Cards</Text>
          <View style={styles.inputGroup}>
            <View style={[styles.row, styles.upperRow]}>
              <Image
                source={require('../../../assets/icons/mastercard.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.text}>3967-XXXXXXXX-8243</Text>
            </View>

            <View style={[styles.row]}>
              <Image
                source={require('../../../assets/icons/mastercard.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.text}>5428-XXXXXXXX-5685 </Text>
            </View>

            <View style={[styles.row, styles.bottomRow]}>
              <Image
                source={require('../../../assets/icons/newcard.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.text}>ADD NEW CARD </Text>
            </View>
          </View>
        </View>

        <View style={[styles.rootGroup]}>
          <Text style={styles.rootHeading}>Wallets</Text>
          <View style={styles.inputGroup}>
            <View style={[styles.row, styles.upperRow]}>
              <Image
                source={require('../../../assets/icons/amazonpay.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.text}>Amazon Pay</Text>
            </View>

            <View style={[styles.row]}>
              <Image
                source={require('../../../assets/icons/paytm.png')}
                style={[styles.logo, {height: 30}]}
                resizeMode="contain"
              />
              <Text style={styles.text}>PayTM </Text>
            </View>

            <View style={[styles.row, styles.bottomRow]}>
              <Image
                source={require('../../../assets/icons/newcard.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.text}>LINK NEW ACCOUNT </Text>
            </View>
          </View>
        </View>

        <View style={[styles.rootGroup]}>
          <Text style={styles.rootHeading}>UPI</Text>
          <View style={styles.inputGroup}>
            <View style={[styles.row, styles.upperRow]}>
              <Image
                source={require('../../../assets/icons/gpay.png')}
                style={[styles.logo, {height: 30}]}
                resizeMode="contain"
              />
              <Text style={styles.text}>Google Pay</Text>
            </View>

            <View style={[styles.row, styles.bottomRow]}>
              <Image
                source={require('../../../assets/icons/newcard.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.text}>LINK NEW UPI ACCOUNT </Text>
            </View>
          </View>
        </View>

        <View style={[styles.rootGroup]}>
          <Text style={styles.rootHeading}>Others</Text>
          <View style={styles.inputGroup}>
            <View style={[styles.row, styles.upperRow]}>
              <Image
                source={require('../../../assets/icons/paypal.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.text}>Paypal</Text>
              <Text style={[styles.text, {color: INPUT_PLACEHOLDER}]}>
                (Link Account)
              </Text>
            </View>

            <View style={[styles.row, styles.bottomRow]}>
              <Image
                source={require('../../../assets/icons/cash.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.text}>Cash Payment</Text>
            </View>
          </View>
        </View> */}

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.secondary_background[theme],
        }}>
        <DmzButton
          onPress={OnClickPay}
          style={{
            Text: {
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            },
            Container: {
              width: 250,
              height: 46,
              borderRadius: 25,
              backgroundColor: SECONDARY_COLOR,
              alignSelf: 'center',
              marginVertical: 20,
              elevation: 3,
            },
          }}
          text={
            (doctorDataPayment ||
              !_isFollowUpAvaiable ||
              (appointmentBookingData?.fee &&
                appointmentBookingData?.fee != 0) ||
              appointmentBookingData?.fee) &&
            appointmentBookingData?.payment
              ? `PAY ₹${appointmentBookingData?.fee ?? 0}`
              : 'Free'
          }
          // text={`PAY ₹${
          //   appointmentBookingData.fee ? appointmentBookingData.fee : '0'
          // }`}
        />
      </View>

      {/* </ScrollView> */}
    </View>
  );
};

export default PaymentsV2;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ScrollView: {
    flex: 1,
  },
  rootGroup: {
    margin: 15,
    marginVertical: 20,
  },
  rootHeading: {
    fontSize: 19,
    fontFamily: 'Montserrat-SemiBold',
    color: NEW_HEADER_TEXT,
    marginBottom: 10,
  },
  inputGroup: {
    borderRadius: 15,
    // padding: 10,
    borderWidth: 1,
    borderColor: GREY_OUTLINE,
    overflow: 'hidden',
  },
  row: {
    padding: 15,
    borderWidth: 1,
    borderColor: GREY_OUTLINE,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  upperRow: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  bottomRow: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  logo: {
    height: 17,
    marginHorizontal: 5,
    width: 50,
  },
});
