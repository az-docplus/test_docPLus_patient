import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ButtonCompo from '../../../../components/atoms2/button/button';
import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import InsetShadow from 'react-native-inset-shadow';
import { useDispatch, useSelector } from 'react-redux';
import { AddNotification } from '../../../../reduxV2/action/DoctorAction';
import { GetNotification } from '../../../../reduxV2/action/PatientAction';

const Refer = ({
  isKeyboardVisible,
  windowHeight,
  setModal,
  patient,
  state,
  setState,
}) => {
  const dispatch = useDispatch();

  const { theme, userData } = useSelector((state) => state.AuthReducer);

  const [specialty, setSpecialty] = useState('');
  const [reason, setReason] = useState('');

  const onSubmitRefer = () => {
    const payload = {
      by: userData?._id,
      to: patient._id,
      //  for: doctorId,
      specialty: specialty,
      appointment: patient?.appointments.reverse()[0]?._id,
      reason: reason,
    };
    dispatch(
      AddNotification(payload, (err, response) => {
        dispatch(
          GetNotification(patient._id, (err, response) => {
            setState({
              ...state,
              followUps: response,
            });
          }),
        );
        console.log('============>>>>>>>>>>@@@@@@@@@@', response);
      }),
    );
  };

  return (
    <TouchableOpacity
      // onPress={() => setModal(false)}
      style={{
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end',

        // backgroundColor: 'rgba(0,0,0,0.4)',
      }}>
      <TouchableWithoutFeedback>
        <View
          style={{
            // width: '100%',
            // marginHorizontal: 20,

            backgroundColor: '#FFFFFF',
            maxHeight: isKeyboardVisible ? windowHeight / 2 : 600,
            height: 600,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View
            style={{
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => setModal(false)}>
              <Feather name="chevron-left" color="#000000" size={30} />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: 'Gilroy-Medium',
                fontSize: 20,
                color: '#000000',

                lineHeight: 23,
              }}>
              Refer
            </Text>
            <Feather name="chevron-left" color="#FFFFFF" size={20} />
          </View>
          <View
            style={{
              elevation: 4,
              backgroundColor: '#FFFFFF',
              padding: 10,
              marginVertical: 30,
              paddingVertical: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 14,
                  color: '#6E7191',
                }}>
                Patient: {patient.firstName} {patient.lastName} {patient.age}
                yrs, {patient.sex}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: 'Gilroy-Bold',
                    fontSize: 14,
                    color: '#242424',
                  }}>
                  View patient details{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              color: '#707070',
              fontSize: 16,
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            Refer to a Specialist
          </Text>
          <View style={{ marginHorizontal: 20 }}>
            <InsetShadow
              shadowOpacity={1}
              shadowOffset={15}
              containerStyle={styles.numberField}
              shadowOffset={10}
              elevation={12}>
              <TextInput
                style={styles.input}
                // editable={open ? false : true}

                // onPress={() => setOpen(true)}
                onChangeText={(text) => setSpecialty(text)}
                value={specialty}
                placeholder="Type here"
              />
            </InsetShadow>
          </View>
          <Text
            style={{
              marginTop: 30,
              fontFamily: 'Gilroy-SemiBold',
              color: '#707070',
              fontSize: 16,
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            Reason
          </Text>
          <View style={{ marginHorizontal: 20 }}>
            <InsetShadow
              shadowOpacity={1}
              shadowOffset={15}
              containerStyle={styles.describe}
              shadowOffset={10}
              elevation={12}>
              <TextInput
                multiline={true}
                // style={styles.input}
                style={{
                  flex: 1,
                  height: '100%',
                  textAlignVertical: 'top',
                  padding: 10,
                  fontFamily: 'Gilroy-Medium',
                }}
                // editable={open ? false : true}

                // onPress={() => setOpen(true)}
                onChangeText={(text) => setReason(text)}
                value={reason}
                placeholder="Type Diagnosis"
              />
            </InsetShadow>
          </View>
          <View
            style={{
              zIndex: 1,
              flex: 1,
              justifyContent: 'flex-end',
              marginVertical: 15,
              marginHorizontal: 70,
              marginBottom: 20,
            }}>
            <ButtonCompo
              pressHandler={() => {
                onSubmitRefer();
                setModal(false);
              }}
              title="Ok"
              textStyle={{
                fontSize: 16,
                fontFamily: 'Gilroy-SemiBold',
                lineHeight: 19,
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
};

export default Refer;

const styles = StyleSheet.create({
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
