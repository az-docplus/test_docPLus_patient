import {
  ScrollView,
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
import moment from 'moment';
import { UploadRecords } from '../../../../reduxV2/action/PatientAction';
import { useDispatch } from 'react-redux';

const LabTest = ({
  isKeyboardVisible,
  windowHeight,
  patient,
  state,
  setState,
  setModal,
}) => {
  const dispatch = useDispatch();
  const [labtestData, setLabTestdata] = useState({
    notes: '',
    testName: '',
    testType: '',
    addedBy: '',
    date: moment().toISOString(),
  });

  const onSubmitLabTest = ({ testName, testType }) => {
    const data = {
      testName: testName,
      test_type: testType,
      addedBy: 'doctor',
      date: new Date().toLocaleString(),
    };
    const _data = {
      files: '',
      data: data,
      id: patient?.meta?._id,
    };

    setState({ ...state, reports: [...state.reports, _data] });
    // dispatch(
    //   UploadRecords(_data, () => {
    //     console.log('sumbmit');
    //   }),
    // );
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
              LabTest
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
          <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            <TouchableWithoutFeedback>
              <View>
                <Text
                  style={{
                    fontFamily: 'Gilroy-SemiBold',
                    color: '#707070',
                    fontSize: 16,
                    marginHorizontal: 20,
                    marginVertical: 10,
                  }}>
                  Lab test
                </Text>
                <View style={{ marginHorizontal: 20 }}>
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
                        setLabTestdata({ ...labtestData, testType: text })
                      }
                      value={labtestData.testType}
                      placeholder="Type here"
                    />
                  </InsetShadow>
                </View>
                <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      color: '#707070',
                      fontSize: 18,
                      marginVertical: 10,
                      marginTop: 20,
                    }}>
                    Suggested lab tests
                    <Text
                      style={{
                        fontFamily: 'Gilroy-Regular',
                        color: '#A8A8A8',
                      }}>
                      {'(Top to select any one)'}
                    </Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        setLabTestdata({
                          ...labtestData,
                          testType: 'CBC test',
                        })
                      }
                      style={{
                        backgroundColor: '#EDF1F4',
                        padding: 10,
                        borderRadius: 10,
                        marginRight: 10,
                        marginBottom: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Bold',
                          fontSize: 15,
                          color:
                            labtestData.testType === 'CBC test'
                              ? '#1174EE'
                              : 'rgba(98, 98, 98, 0.66)',
                        }}>
                        CBC test
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        setLabTestdata({
                          ...labtestData,
                          testType: 'Kidney function test',
                        })
                      }
                      style={{
                        backgroundColor: '#EDF1F4',
                        padding: 10,
                        borderRadius: 10,
                        marginRight: 10,
                        marginBottom: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Bold',
                          fontSize: 15,
                          color:
                            labtestData.testType === 'Kidney function test'
                              ? '#1174EE'
                              : 'rgba(98, 98, 98, 0.66)',
                        }}>
                        Kidney function test
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        setLabTestdata({
                          ...labtestData,
                          testType: 'Liver function test',
                        })
                      }
                      style={{
                        backgroundColor: '#EDF1F4',
                        padding: 10,
                        borderRadius: 10,
                        marginRight: 10,
                        marginBottom: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Bold',
                          fontSize: 15,
                          color:
                            labtestData.testType === 'Liver function test'
                              ? '#1174EE'
                              : 'rgba(98, 98, 98, 0.66)',
                        }}>
                        Liver function test
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text
                  style={{
                    marginTop: 20,
                    fontFamily: 'Gilroy-SemiBold',
                    color: '#707070',
                    fontSize: 16,
                    marginHorizontal: 20,
                    marginVertical: 10,
                  }}>
                  Notes
                </Text>
                <View style={{ marginHorizontal: 20 }}>
                  <InsetShadow
                    shadowOpacity={1}
                    shadowOffset={15}
                    containerStyle={styles.describe}
                    // shadowOffset={10}
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
                      onChangeText={(text) =>
                        setLabTestdata({
                          ...labtestData,
                          testName: text,
                        })
                      }
                      value={labtestData.testName}
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
                      onSubmitLabTest(labtestData);
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
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
};

export default LabTest;

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
