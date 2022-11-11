import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ButtonCompo from '../../atoms2/button/button';
import { useEffect } from 'react';
import { Local } from '../../../i18n';
import LinearGradient from 'react-native-linear-gradient';
// import ThumbUpImage from '../../assets2/image/thumb-up.png';
import ThumbUpImage from '../../../assets2/image/thumb-up.png';
import InsetShadow from 'react-native-inset-shadow';
const ConfirmAppointment = ({ navigation, route }) => {
  const { doctor, Slot, concernData, patientInfo, dataId } = route.params;
  useEffect(() => {
    // setTimeout(()=>{
    //   navigation.navigate('Appointments');
    // },2000)
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#6DCBCB', '#047B7B']}
        style={{ flex: 1 }}>
        <Image style={{ alignSelf: 'flex-end' }} source={ThumbUpImage} />
        <View style={{ marginTop: 40 }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 36,

              textAlign: 'center',
            }}>
            {`${Local('doctor.V2.confirm_appointment.message')}`}
          </Text>
          {/* <Text
            style={{
              color: WHITE,
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 36,

              textAlign: 'center',
            }}>
            {`${Local('doctor.V2.otp_conf.verified')}`}
          </Text> */}
        </View>

        {/* <ActivityIndicator size={20} color="gray" /> */}
        <View style={{ marginHorizontal: 40, marginTop: 90 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BookingDetails', {
                doctor,
                Slot,
                concernData,
                patientInfo,
                dataId,
              })
            }>
            <InsetShadow
              shadowOpacity={1}
              shadowOffset={15}
              containerStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: 30,
                textAlignVertical: 'center',
                paddingHorizontal: 5,
                height: 50,
                elevation: 3,
                // marginHorizontal: 5,
                marginVertical: 5,
                borderWidth: 0.1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              // shadowOffset={10}
              elevation={12}>
              <Text
                style={{
                  color: '#297281',
                  fontSize: 24,
                  fontFamily: 'Gilroy-SemiBold',
                  textAlign: 'center',
                }}>
                Continue
              </Text>
            </InsetShadow>
          </TouchableOpacity>
          {/* <ButtonCompo
                title="Continue"
                isLoading={false}
                pressHandler={() => {
                  setLoading(true);
                  isUser
                    ? props.navigation.navigate('signup-onboarding', {
                        phone: modeValue,
                        email: null,
                        status: isDoctor,
                      })
                    : dispatch(isLoggedin());
                }}
              /> */}
        </View>
      </LinearGradient>

      {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={require('../../../assets/icons/confirmed.png')}
          style={{ height: 120, width: 120, resizeMode: 'contain' }}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            maxWidth: '60%',
            textAlign: 'center',

            marginVertical: 30,
            fontFamily: 'Gilroy-Medium',
          }}>
          {`${Local('doctor.V2.confirm_appointment.message')}`}
        </Text>

        <ButtonCompo
          pressHandler={() =>
            navigation.navigate('BookingDetails', {
              doctor,
              Slot,
              concernData,
              patientInfo,
              dataId,
            })
          }
          title={`${Local('doctor.V2.confirm_appointment.button')}`}
          textStyle={{
            fontSize: 16,
            fontFamily: 'Gilroy-Bold;',
            marginHorizontal: 25,
          }}
        />
      </View> */}
    </View>
  );
};

export default ConfirmAppointment;

const styles = StyleSheet.create({});
