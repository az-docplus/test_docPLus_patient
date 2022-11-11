import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ButtonCompo from '../../../components/atoms2/button/button';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import PicturelessAvatar from '../../../components/atoms/PicturelessAvatar/PicturelessAvatar';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PrescriptionModal from './model/PrescriptionModal';
import Diagnosis from './model/Diagnosis';
import Medicine from './model/Medicine';
import LabTest from './model/LabTest';
import Refer from './model/Refer';
import FollowUp from './model/FollowUp';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetPatientDiagnosis,
  AddDiagnosis,
  AddPrescription,
  GetMedicine,
  GetPatientInfo,
  GetRecords,
  DeleteMedicine,
  DeleteRecords,
  DeleteNotification,
  GetNotification,
} from '../../../reduxV2/action/PatientAction';
const NewPrescription = ({ navigation, route }) => {
  const {
    medicines,
    gettingMedicine,
    addMedicineLoading,
    records,
    gettingRecords,
    errorGettingRecords,
    isPatientFamilyMember,
    patientFamilyMemberDetails,
    patient,
    isPatientAccountReducerLoading,
  } = useSelector((state) => state.PatientReducer);
  // const { User } = route.params;
  // const isPatientFamilyMember = true;
  const User = {
    _id: '6207c7d7b5888d17c24cb108',
  };
  const { theme, userData } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const windowHeight = Dimensions.get('window').height;
  const [modal, setModal] = useState(false);
  const [modalChildren, setModalChildren] = useState('');
  const [state, setState] = useState({
    diagnosis: [],
    medication: [],
    reports: [],
    followUps: [],
  });

  console.log('===========>>>>>>>>>>>>.followUps', state.followUps);
  console.log('===========>>>>>>>>>>>>medication', state.medication);
  useEffect(() => {
    dispatch(
      GetPatientInfo(User?._id, true, () =>
        console.log('PATIENT INFO FETCHED<<<<<<<<<<<<<<<<'),
      ),
    );

    dispatch(
      GetMedicine(
        isPatientFamilyMember
          ? patientFamilyMemberDetails.meta
          : patient?.meta?._id,
      ),
    );

    dispatch(
      GetRecords(
        isPatientFamilyMember
          ? patientFamilyMemberDetails.meta
          : patient?.meta?._id,
      ),
    );
    dispatch(
      GetNotification(patient?._id, (err, response) => {
        setState({ ...state, followUps: response });
      }),
    );
  }, [dispatch]);

  const TimeDiff = (date) => {
    const time1 = moment(date).format('YYYY-MM-DD');
    var given = moment(time1, 'YYYY-MM-DD');
    console.log(given);
    var current = moment().format('YYYY-MM-DD');

    //Difference in number of days
    const diff = given.diff(current, 'days');
    console.log(Math.abs(diff));

    if (diff > 365) {
      return `${Math.round(Math.abs(diff) / 365)} year`;
    } else if (Math.abs(diff) >= 7 && Math.abs(diff) <= 30) {
      return `${Math.round(Math.abs(diff) / 7)} week`;
    } else if (Math.abs(diff) < 7) {
      return `${Math.abs(diff)} days`;
    } else if (Math.abs(diff) > 30 && Math.abs(diff) <= 365) {
      return `${Math.round(Math.abs(diff) / 30)} months`;
    }
  };

  // console.log(Time());

  useEffect(() => {
    setState({
      ...state,
      // diagnosis: data,
      medication: medicines,
      // reports: records,
    });
  }, [medicines, records]);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const successCallback = () => {};
  const errorCallback = () => {};

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

  const properties = {
    isKeyboardVisible,
    windowHeight,
    setModal,
    setState,
    state,
    patient,
    // User,
  };

  const handleSubmit = () => {
    // const DiagnosisData = state.diagnosis.map(
    //   ({ Since, duration, ...rest }) => ({
    //     ...rest,
    //   }),
    // );
    // const MedicineData = state.medication.map(
    //   ({ frequency, taken, days, duration, dose, ...rest }) => ({
    //     ...rest,
    //   }),
    // );

    // setLoading({ ...Loading, component: true });
    // console.log('clicked!', MedicineData);
    const { meta } = patient;
    // const { doctor, appointmentId } = User;
    // const { doctor, appointmentId } = patient;
    // console.log(patient?.appointments.reverse()[0]?._id, 'dfjdslfjdsfdsfj');
    const appointmentId = patient?.appointments.reverse()[0]?._id;
    // return
    const payload = {
      id: meta._id ? meta._id : meta,
      data: {
        ...state,
        followUps: JSON.stringify(state.followUps),
        medication: state.medication,
        diagnosis: JSON.stringify(state.diagnosis),
        patient: patient._id,
        doctor: userData?._id,
        appointmentId,
      },
    };
    dispatch(
      AddPrescription(payload, (err, data) => {
        console.log('payload@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', data);
        if (err) {
          ToastAndroid.show('Prescription Not Saved', ToastAndroid.SHORT);
          console.log(
            err.response,
            'Prescription Not Saved:::::::::::::::::::::::::::',
          );
        } else {
          ToastAndroid.show('Prescription Saved', ToastAndroid.SHORT);
          console.log(' Saved:::::::::::::::::::::::::::');
        }
      }),
    );
  };
  const handleDeleteRefer = (_id) => {
    console.log('iddddddddddddd', _id);
    dispatch(
      DeleteNotification(_id, (err, response) => {
        console.log('===========>>>>>.#############', response);
        dispatch(
          GetNotification(patient._id, (err, response) => {
            setState({ ...state, followUps: response });
          }),
        );
      }),
    );
  };
  const handleDeleteRecords = (_id) => {
    dispatch(DeleteRecords({ id: patient.meta._id, reportId: _id }));
  };
  const handleDeleteMedicine = (medId) => {
    dispatch(DeleteMedicine({ id: patient._id, medid: medId }, patient.meta));
  };

  return (
    <View style={styles.Container}>
      <TopNavBar
        navigation={navigation}
        headerText={`Prescription`}
        RightComp={<View />}
      />

      <PrescriptionModal modal={modal} setModal={setModal}>
        <>
          {modalChildren === 'Diagnosis' && <Diagnosis {...properties} />}
          {modalChildren === 'Medicine' && <Medicine {...properties} />}
          {modalChildren === 'LabTest' && <LabTest {...properties} />}
          {modalChildren === 'Refer' && <Refer {...properties} />}
          {modalChildren === 'FollowUp' && <FollowUp {...properties} />}
        </>
      </PrescriptionModal>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 50,
        }}>
        <PatientInfo patient={patient} />
        <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 20,
              color: '#343434',
            }}>
            Rx
          </Text>
        </View>

        <View style={[styles.box, { padding: 20, marginBottom: 10 }]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name="stethoscope" color="#088DFF" size={20} />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 16,
                  color: '#282828',
                }}>
                Diagnosis
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setModal(true);
                  setModalChildren('Diagnosis');
                }}>
                <AntDesign name="pluscircle" color="#EA1A65" size={20} />
              </TouchableOpacity>
            </View>
          </View>

          {state.diagnosis &&
            state.diagnosis.map((item, i) => (
              <View
                key={i}
                style={{
                  marginTop: 10,
                  padding: 15,
                  paddingVertical: 15,
                  borderRadius: 15,
                  backgroundColor: 'rgba(234, 234, 234, 0.38)',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        color: '#232323',
                        fontSize: 18,
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-Regular',
                        color: '#000000',
                        fontSize: 15,
                      }}>
                      Since :{' '}
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Regular',
                          color: '#1174EE',
                          fontSize: 15,
                        }}>
                        {TimeDiff(item.date)}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        setState({
                          ...state,
                          diagnosis: state.diagnosis.filter((d) => d !== item),
                        })
                      }>
                      <Ionicons
                        name="trash-outline"
                        color="#FF3535"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </View>
        <View style={[styles.box, { padding: 20 }]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome5 name="capsules" color="#088DFF" size={20} />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 16,
                  color: '#282828',
                }}>
                Medicine
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setModal(true);
                  setModalChildren('Medicine');
                }}>
                <AntDesign name="pluscircle" color="#EA1A65" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          {state.medication &&
            state.medication.map((data, i) => {
              return data.medicines.map((item, i) => {
                let newresukt = '';
                let news = '';
                if (item.time.length === 1) {
                  let result = item.time[0].split(' ');
                  newresukt = result.slice(result.length - 4, result.length);
                  news = result.slice(0, -4);
                }

                return (
                  <View
                    key={i}
                    style={{
                      marginTop: 10,
                      padding: 15,
                      paddingVertical: 20,
                      borderRadius: 15,
                      backgroundColor: 'rgba(234, 234, 234, 0.38)',
                    }}>
                    <View
                      style={{
                        marginLeft: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View style={{ width: '90%' }}>
                            <Text
                              style={{
                                fontFamily: 'Gilroy-SemiBold',
                                color: '#232323',
                                fontSize: 18,
                              }}>
                              {item.name} | {item.quantity}
                            </Text>
                          </View>
                        </View>
                        {item.time.length === 1 && item.time.length > 0 ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Gilroy-Regular',
                                color: '#000000',
                                fontSize: 12,
                              }}>
                              {news.join(' ').toString()}
                            </Text>
                            <Entypo
                              name="dot-single"
                              size={20}
                              color="#1174EE"
                            />
                            <Text
                              style={{
                                fontFamily: 'Gilroy-Regular',
                                color: '#000000',
                                fontSize: 12,
                              }}>
                              {newresukt.slice(0, 2).join(' ').toString()}
                            </Text>
                            <Entypo
                              name="dot-single"
                              size={20}
                              color="#1174EE"
                            />
                            <Text
                              style={{
                                fontFamily: 'Gilroy-Regular',
                                color: '#000000',
                                fontSize: 12,
                              }}>
                              {newresukt.slice(2, 4).join(' ').toString()}
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            {item.time.map((t) => (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontFamily: 'Gilroy-Regular',
                                    color: '#000000',
                                    fontSize: 12,
                                    // marginRight: 10,
                                  }}>
                                  {t}
                                </Text>
                                <Entypo
                                  name="dot-single"
                                  size={20}
                                  color="#1174EE"
                                />
                              </View>
                            ))}
                          </View>
                        )}

                        <View style={{ width: '90%' }}>
                          <Text
                            style={{
                              fontFamily: 'Gilroy-Medium',
                              color: '#1174EE',
                              fontSize: 12,
                            }}>
                            notes:- {item.description}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            handleDeleteMedicine(data._id);
                            setState({
                              ...state,
                              medication: state.medication.filter(
                                (d) => d._id !== data._id,
                              ),
                            });
                          }}>
                          <Ionicons
                            name="trash-outline"
                            color="#FF3535"
                            size={20}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              });
            })}
        </View>

        <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 20,
              color: '#343434',
            }}>
            Instructions
          </Text>
        </View>
        <View style={[styles.box, { padding: 20, marginBottom: 10 }]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons
                name="test-tube"
                color="#088DFF"
                size={20}
              />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 16,
                  color: '#282828',
                }}>
                Lab Test
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setModal(true);
                  setModalChildren('LabTest');
                }}>
                <AntDesign name="pluscircle" color="#EA1A65" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          {state.reports &&
            state.reports.map((item, i) => (
              <View
                key={i}
                style={{
                  marginTop: 10,
                  padding: 15,
                  paddingVertical: 15,
                  borderRadius: 15,
                  backgroundColor: 'rgba(234, 234, 234, 0.38)',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        color: '#232323',
                        fontSize: 18,
                      }}>
                      {item.data.test_type}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-Regular',
                        color: '#000000',
                        fontSize: 15,
                      }}>
                      notes :{' '}
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Regular',
                          color: '#1174EE',
                          fontSize: 15,
                        }}>
                        {item.data.testName}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setState({
                          ...state,
                          reports: state.reports.filter(
                            (d) => d.data.date !== item.data.date,
                          ),
                        });
                        // handleDeleteRecords(_id)
                      }}>
                      <Ionicons
                        name="trash-outline"
                        color="#FF3535"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </View>
        {/* <View style={[styles.box, { padding: 20, marginBottom: 10 }]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons
                name="calendar-check"
                color="#088DFF"
                size={20}
              />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 16,
                  color: '#282828',
                }}>
                Follow-Up
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setModal(true);
                  setModalChildren('FollowUp');
                }}>
                <AntDesign name="pluscircle" color="#EA1A65" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View> */}
        <View style={[styles.box, { padding: 20 }]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Fontisto name="doctor" color="#088DFF" size={20} />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 16,
                  color: '#282828',
                }}>
                Refer
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setModal(true);
                  setModalChildren('Refer');
                }}>
                <AntDesign name="pluscircle" color="#EA1A65" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          {state.followUps &&
            state.followUps.map((data, i) => (
              <View
                key={i}
                style={{
                  marginTop: 10,
                  padding: 15,
                  paddingVertical: 15,
                  borderRadius: 15,
                  backgroundColor: 'rgba(234, 234, 234, 0.38)',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        color: '#232323',
                        fontSize: 18,
                      }}>
                      {data.specialty}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-Regular',
                        color: '#000000',
                        fontSize: 15,
                      }}>
                      Reason :{' '}
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Regular',
                          color: '#1174EE',
                          fontSize: 15,
                        }}>
                        {data.reason}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => handleDeleteRefer(data._id)}>
                      <Ionicons
                        name="trash-outline"
                        color="#FF3535"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </View>
        <View
          style={{
            marginVertical: 15,
            marginHorizontal: 50,
          }}>
          <ButtonCompo
            pressHandler={() => handleSubmit()}
            title="Next"
            textStyle={{
              fontSize: 16,
              fontFamily: 'Gilroy-SemiBold',
              lineHeight: 19,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default NewPrescription;

const PatientInfo = ({ patient }) => {
  return (
    <View style={[styles.box, { marginVertical: 15, display: 'flex' }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <PicturelessAvatar
          style={{
            marginLeft: 10,
            color: '#000',
            backgroundColor: '#f9f9f9',
            width: 70,
            height: 70,
            borderRadius: 100,
          }}
          textStyle={{ fontSize: 32 }}
          text={patient?.firstName[0]}
        />
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              paddingBottom: 5,
              fontFamily: 'Gilroy-Bold',
              fontSize: 20,
            }}>
            {patient?.firstName} {patient?.lastName}
          </Text>
          <Text
            style={{
              paddingBottom: 5,
              fontFamily: 'Gilroy-Regular',
              fontSize: 14,
              color: '#8F8f8F',
            }}>
            {patient?.age} yrs | {patient?.sex}
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-Regular',
              fontSize: 14,
              color: '#8F8f8F',
              textDecorationLine: 'underline',
            }}>
            Health concern : Blocked nose
          </Text>
        </View>
      </View>
      <View
        style={{
          marginVertical: 15,
          marginHorizontal: 70,
        }}>
        <ButtonCompo
          pressHandler={() => console.log('hello')}
          title="View Details"
          textStyle={{
            fontSize: 16,
            fontFamily: 'Gilroy-SemiBold',
            lineHeight: 19,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  box: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 20,
    marginHorizontal: 20,
  },
});
