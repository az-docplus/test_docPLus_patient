import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ButtonCompo from '../../../../components/atoms2/button/button';
import React, { useEffect, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import InsetShadow from 'react-native-inset-shadow';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { AddDiagnosis } from '../../../../reduxV2/action/PatientAction';

const Diagnosis = ({
  isKeyboardVisible,
  windowHeight,
  state,
  setState,
  setModal,
  _id = '6218f291400c714fdce953b8',
  patient,
}) => {
  const dispatch = useDispatch();
  const [sinceWhen, setSinceWhen] = useState(['Day', 'Week', 'Month', 'Year']);
  const [show, setShow] = useState(false);
  const [diag, setSince] = useState('Day');
  const [diagnosisData, setDiagnosisData] = useState({
    Since: 'Day',
    name: '',
    duration: 0,
    date: '',
    patient: '',
    practise: '',
  });
  console.log('diagnosisData', moment(diagnosisData.date).format('YYYY-MM-DD'));
  const successCallback = (data) => {
    setState({
      ...state,
      diagnosis: [...state.diagnosis, data],
    });
  };
  const errorCallback = () => {};
  const handleSubmit = () => {
    const _data = {
      name: diagnosisData.name,
      date: diagnosisData.date,
      patient: patient._id,
      practise: _id,
    };
    dispatch(AddDiagnosis(_data, successCallback(_data), errorCallback));
  };

  useEffect(() => {
    setDiagnosisData({
      ...diagnosisData,
      date: moment()
        .subtract(diagnosisData.duration, diagnosisData.Since.toLowerCase())
        .toISOString(),
    });
  }, [diagnosisData.Since, diagnosisData.duration]);

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
              Diagnosis
              {/* {moment(date).format('DD MM YYYY')} */}
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
          <View style={{ marginHorizontal: 20 }}>
            <Text
              style={{
                marginTop: 30,
                fontFamily: 'Gilroy-SemiBold',
                color: '#707070',
                fontSize: 16,

                marginVertical: 10,
              }}>
              Diagnosis*
            </Text>
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
                onChangeText={(text) =>
                  setDiagnosisData({ ...diagnosisData, name: text })
                }
                value={diagnosisData.name}
                placeholder="Type Diagnosis"
              />
            </InsetShadow>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                color: '#707070',
                fontSize: 18,
              }}>
              Since{' '}
            </Text>
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  color: '#707070',
                  fontSize: 18,
                  textDecorationLine: 'underline',
                  marginHorizontal: 5,
                }}>
                {diagnosisData.Since}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Feather name="chevron-down" color="#707070" size={20} />
            </TouchableOpacity>

            {show ? (
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  elevation: 4,
                  borderRadius: 15,
                  padding: 10,
                  position: 'absolute',
                  top: 40,
                  zIndex: 2,
                }}>
                {sinceWhen.map((i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      setDiagnosisData({ ...diagnosisData, Since: i });
                      setShow(!show);
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-Medium',
                        color: '#909090',
                        fontSize: 20,
                        paddingVertical: 8,
                        paddingHorizontal: 20,
                      }}>
                      {i}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() =>
                setDiagnosisData({
                  ...diagnosisData,
                  duration: diagnosisData.duration - 1,
                })
              }
              style={{
                width: 35,
                height: 35,
                backgroundColor: '#EDF1F4',
                borderRadius: 50,
                // padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#A5A5A5',
                  fontFamily: 'Gilroy-Regular',
                  fontSize: 28,
                }}>
                -
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                backgroundColor: '#EDF1F4',
                borderRadius: 10,
                // padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 10,
                borderColor: '#A5A5A5',
                borderWidth: 1,
              }}>
              <Text
                style={{
                  color: '#A5A5A5',
                  fontFamily: 'Gilroy-Regular',
                  fontSize: 28,
                }}>
                {diagnosisData.duration}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // setPersCriptions({...});
                setDiagnosisData({
                  ...diagnosisData,
                  duration: diagnosisData.duration + 1,
                });
              }}
              style={{
                width: 35,
                height: 35,
                backgroundColor: '#EDF1F4',
                borderRadius: 50,
                // padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#A5A5A5',
                  fontFamily: 'Gilroy-Regular',
                  fontSize: 28,
                }}>
                +
              </Text>
            </TouchableOpacity>
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
                handleSubmit();
                // setState({
                //   ...state,
                //   diagnosis: [...state.diagnosis, diagnosisData],
                // });
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

export default Diagnosis;

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
  input: {
    // height: 40,
    // margin: 12,
    // borderWidth: 1,
    // padding: 10,
    flex: 1,
    // width: '100%',
  },
});
