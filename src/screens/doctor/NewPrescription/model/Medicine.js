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
import React, { useEffect, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InsetShadow from 'react-native-inset-shadow';
import { color } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddMedicine,
  GetAvailableMedicines,
  GetMedicine,
} from '../../../../reduxV2/action/PatientAction';
import moment from 'moment';
const Medicine = ({
  isKeyboardVisible,
  windowHeight,
  state,
  setState,
  setModal,
  User = {},
}) => {
  const dispatch = useDispatch();
  const [mg, setMg] = useState(['500 mg', '350 mg', '250 mg', '100 mg']);
  const [days, setDays] = useState(['Day', 'Week', 'Month', 'Year']);
  const [showmg, setShowmg] = useState(false);
  const [show, setShow] = useState(false);
  const [next, setNext] = useState(false);
  // const [checked, setChecked] = useState(false);
  const [availableMeds, setavailableMeds] = useState([]);
  const [search, setSearch] = useState('');
  const [medicineData, setMedicineData] = useState({
    name: '',
    from: moment().toISOString(),
    to: '',
    frequency: '',
    taken: '',
    days: 'Day',
    quantity: '250mg',
    duration: 0,
    description: '',
    time: 0,
    MedTime: '',
    modifiedBy: 'doctor',
    appointment: User?.appointmentId,
  });
  console.log(medicineData);
  useEffect(() => {
    const MedTime = `${medicineData.time} Pills ${medicineData.frequency} ${medicineData.duration} ${medicineData.days} ${medicineData.taken}`;
    const dateTo = moment()
      .add(medicineData.duration, medicineData.days.toLowerCase())
      .toISOString();
    setMedicineData({
      ...medicineData,
      to: dateTo,
      MedTime,
    });
  }, [
    medicineData.duration,
    medicineData.time,
    medicineData.days,
    medicineData.frequency,
    medicineData.taken,
  ]);

  const {
    medicines,
    gettingMedicine,
    addMedicineLoading,
    patient,
    isPatientAccountReducerLoading,
  } = useSelector((state) => state.PatientReducer);

  const successCallback = (_data) => {
    setavailableMeds(_data);
  };
  const errorCallback = () => {};

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      if (search === '') {
        setavailableMeds([]);
      } else {
        dispatch(GetAvailableMedicines(search, successCallback, errorCallback));
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [search, dispatch]);

  const handleSubmitMedicine = (values) => {
    // setLoading({ ...Loading, medication: true });
    const { _id, meta } = patient;

    const data = {
      name: values.name,
      category: '',
      description: values.description,
      from: values.from,
      to: values.to,
      time: [values.MedTime],
      quantity: values.quantity,
      addedBy: 'doctor',
      appointment: User.appointmentId,
    };
    const body = {
      metaId: meta?._id ? meta?._id : meta,
      medicines: data,
    };
    // setState({
    //   ...state,
    //   medication: [...state.medication, data],
    // });
    dispatch(
      AddMedicine(
        body,
        () => {
          console.log('medicine Add');
          // setLoading({ ...Loading, medication: false });
          // setState({
          //   ...state,
          //   medication: [...state.medication, data],
          // });
          // notification.success({ message: 'Medicine added!' });
          // dispatch(
          //   GetMedicine(meta?._id ? meta?._id : meta, (data) => {
          //     // handleCancel();
          //     const temp = [];
          //     const wholeTemp = [];
          //     data.map((d, index) => {
          //       const { medicines } = d;
          //       const item = medicines[0];
          //       let time = '';
          //       item.time.map((t, i) => {
          //         time = time + moment(t).format('hh:mm A') + ', ';
          //       });
          //       temp.push({
          //         index: index + 1,
          //         name: item.name,
          //         dosage: time,
          //         duration:
          //           moment(item.from).format('MMMM DD') +
          //           ' - ' +
          //           moment(item.to).format('MMMM DD'),
          //         instruction: item.description,
          //       });
          //       wholeTemp.push({
          //         index: index + 1,
          //         name: item.name,
          //         dosage: time,
          //         medId: d._id,
          //         duration:
          //           moment(item.from).format('MMMM DD') +
          //           ' - ' +
          //           moment(item.to).format('MMMM DD'),
          //         instruction: item.description,
          //       });
          //     });
          //     setMedication(temp);
          //     setMedicineWholeData(wholeTemp);
          //     setLoading({ ...Loading, medication: false });
          //   }),
          // );
        },
        () => {
          console.log('failde add medicine');
          // setLoading({ ...Loading, medication: false });
          // notification.error({ message: 'Something went wrong!' });
        },
      ),
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
            maxHeight: isKeyboardVisible
              ? windowHeight / 2
              : windowHeight / 1.1,
            height: 700,
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
            <TouchableOpacity
              onPress={() => {
                setModal(false);
                setNext(false);
              }}>
              <Feather name="chevron-left" color="#000000" size={30} />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: 'Gilroy-Medium',
                fontSize: 20,
                color: '#000000',

                lineHeight: 23,
              }}>
              {next ? 'Medicine' : 'Search'}
            </Text>
            <Feather name="chevron-left" color="#FFFFFF" size={20} />
          </View>
          {next ? (
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
          ) : (
            <></>
          )}
          {next ? (
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
              <TouchableWithoutFeedback>
                <View>
                  <View
                    style={{
                      marginHorizontal: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View style={{ width: '40%' }}>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-SemiBold',
                          color: '#707070',
                          fontSize: 18,
                        }}>
                        {medicineData.name}
                      </Text>
                    </View>

                    <TouchableOpacity onPress={() => setShowmg(!showmg)}>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-SemiBold',
                          color: '#707070',
                          fontSize: 18,
                          textDecorationLine: 'underline',
                          marginHorizontal: 5,
                        }}>
                        {`(${medicineData.quantity})`}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowmg(!showmg)}>
                      <Feather name="chevron-down" color="#707070" size={20} />
                    </TouchableOpacity>
                    <MaterialCommunityIcons
                      name="information"
                      color="#CCCCCC"
                      size={20}
                    />
                    {showmg ? (
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
                        {mg.map((i) => (
                          <TouchableOpacity
                            key={i}
                            onPress={() => {
                              setMedicineData({
                                ...medicineData,
                                quantity: i,
                              });
                              setShowmg(!showmg);
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
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      color: '#707070',
                      fontSize: 18,
                      marginHorizontal: 20,
                      marginTop: 20,
                    }}>
                    Dosage
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 20,
                      marginTop: 15,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        setMedicineData({
                          ...medicineData,
                          time: medicineData.time - 1,
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
                        {medicineData.time}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        setMedicineData({
                          ...medicineData,
                          time: medicineData.time + 1,
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
                        +
                      </Text>
                    </TouchableOpacity>
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
                      Duration*
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
                        {medicineData.days}
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
                          // left: 20,
                          position: 'absolute',
                          top: 30,
                          // zIndex: 9,
                        }}>
                        {days.map((i) => (
                          <TouchableOpacity
                            key={i}
                            onPress={() => {
                              setMedicineData({
                                ...medicineData,
                                days: i,
                              });
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
                      marginTop: 15,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        setMedicineData({
                          ...medicineData,
                          duration: medicineData.duration - 1,
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
                        {medicineData.duration}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        setMedicineData({
                          ...medicineData,
                          duration: medicineData.duration + 1,
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
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        color: '#707070',
                        fontSize: 18,
                        marginVertical: 10,
                        marginTop: 20,
                      }}>
                      To be take{' '}
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Regular',
                          color: '#A8A8A8',
                        }}>
                        {'(Top to select any one)'}
                      </Text>
                    </Text>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity
                        onPress={() =>
                          setMedicineData({
                            ...medicineData,
                            taken: 'After Food',
                          })
                        }
                        style={{
                          backgroundColor: '#EDF1F4',
                          padding: 10,
                          borderRadius: 10,
                          marginRight: 10,
                          // marginBottom: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Gilroy-Bold',
                            fontSize: 15,
                            color:
                              medicineData.taken === 'After Food'
                                ? '#1174EE'
                                : 'rgba(98, 98, 98, 0.66)',
                          }}>
                          After Food
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          setMedicineData({
                            ...medicineData,
                            taken: 'Before Food',
                          })
                        }
                        style={{
                          backgroundColor: '#EDF1F4',
                          padding: 10,
                          borderRadius: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Gilroy-Bold',
                            fontSize: 15,
                            color:
                              medicineData.taken === 'Before Food'
                                ? '#1174EE'
                                : 'rgba(98, 98, 98, 0.66)',
                          }}>
                          Before Food
                        </Text>
                      </TouchableOpacity>
                    </View>
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
                      Frequency{' '}
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
                          setMedicineData({
                            ...medicineData,
                            frequency: 'Everyday',
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
                              medicineData.frequency === 'Everyday'
                                ? '#1174EE'
                                : 'rgba(98, 98, 98, 0.66)',
                          }}>
                          Everyday
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          setMedicineData({
                            ...medicineData,
                            frequency: 'Alternate Days',
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
                              medicineData.frequency === 'Alternate Days'
                                ? '#1174EE'
                                : 'rgba(98, 98, 98, 0.66)',
                          }}>
                          Alternate Days
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          setMedicineData({
                            ...medicineData,
                            frequency: 'When required',
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
                              medicineData.frequency === 'When required'
                                ? '#1174EE'
                                : 'rgba(98, 98, 98, 0.66)',
                          }}>
                          When required
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
                      notes
                    </Text>
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
                        onChangeText={(text) =>
                          setMedicineData({
                            ...medicineData,
                            description: text,
                          })
                        }
                        value={medicineData.description}
                        placeholder="Type Diagnosis"
                      />
                    </InsetShadow>
                  </View>
                  <TouchableOpacity
                    style={{
                      marginHorizontal: 20,
                      marginTop: 20,
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: '#EDF1F4',
                    }}>
                    <Text
                      style={{
                        color: '#525252',
                        fontSize: 18,
                        fontFamily: 'Gilroy-Bold',
                        textAlign: 'center',
                      }}>
                      + Add Medicine
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      // zIndex: 1,
                      // flex: 1,
                      // justifyContent: 'flex-end',
                      marginVertical: 15,
                      marginHorizontal: 70,
                      marginBottom: 20,
                    }}>
                    <ButtonCompo
                      pressHandler={() => {
                        handleSubmitMedicine(medicineData);
                        // setState({
                        //   ...state,
                        //   medication: [...state.medication, medicineData],
                        // });
                        setNext(false);
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
          ) : (
            <View>
              <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
                <InsetShadow
                  shadowOpacity={1}
                  shadowOffset={15}
                  containerStyle={[
                    styles.numberField,
                    {
                      height:
                        availableMeds.length > 0 ? windowHeight / 1.5 : 50,
                    },
                  ]}
                  shadowOffset={10}
                  elevation={12}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather
                      // onPress={() => {
                      //   // Keyboard.dismiss();
                      //   setOpen(true);
                      // }}
                      name="search"
                      size={25}
                      style={{ color: '#767676' }}
                    />
                    <TextInput
                      style={styles.input}
                      // editable={open ? false : true}
                      // onFocus={() => {
                      //   // Keyboard.dismiss();
                      //   setOpen(true);
                      // }}
                      // onPress={() => setOpen(true)}
                      onChangeText={setSearch}
                      value={search}
                      placeholder="Search for medicine names"
                    />
                  </View>
                  <View style={{ marginHorizontal: 10 }}>
                    <ScrollView>
                      <TouchableWithoutFeedback>
                        <View>
                          {availableMeds.length > 0 &&
                            availableMeds.map(({ brand }, i) => (
                              <View
                                key={i}
                                style={{
                                  marginVertical: 10,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '70%',
                                    paddingRight: 10,
                                  }}>
                                  <View
                                    style={{
                                      width: 40,
                                      height: 40,
                                      borderRadius: 10,
                                      backgroundColor: '#747474',
                                      marginRight: 10,
                                    }}></View>
                                  <Text
                                    style={{
                                      fontFamily: 'Gilroy-SemiBold',
                                      color: '#828282',
                                      fontSize: 14,
                                    }}>
                                    {brand}
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <MaterialCommunityIcons
                                    name="information"
                                    color="#CCCCCC"
                                    size={20}
                                  />
                                  <TouchableOpacity
                                    style={{ marginLeft: 10 }}
                                    onPress={() =>
                                      setMedicineData({
                                        ...medicineData,
                                        name: brand,
                                      })
                                    }>
                                    {medicineData.name === brand ? (
                                      <MaterialCommunityIcons
                                        name="checkbox-marked"
                                        color="#1174EE"
                                        size={25}
                                      />
                                    ) : (
                                      <MaterialCommunityIcons
                                        name="checkbox-blank-outline"
                                        color="#1174EE"
                                        size={25}
                                      />
                                    )}
                                  </TouchableOpacity>
                                </View>
                              </View>
                            ))}
                        </View>
                      </TouchableWithoutFeedback>
                    </ScrollView>
                  </View>
                </InsetShadow>

                <View
                  style={{
                    display: availableMeds.length > 0 ? 'flex' : 'none',
                    // zIndex: 1,
                    // flex: 1,
                    // justifyContent: 'flex-end',
                    marginVertical: 15,
                    marginHorizontal: 70,
                    marginBottom: 20,
                  }}>
                  <ButtonCompo
                    pressHandler={() => setNext(true)}
                    title="Next"
                    textStyle={{
                      fontSize: 16,
                      fontFamily: 'Gilroy-SemiBold',
                      lineHeight: 19,
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
};

export default Medicine;

const styles = StyleSheet.create({
  numberField: {
    alignSelf: 'stretch',
    borderRadius: 10,
    textAlignVertical: 'center',
    paddingHorizontal: 15,

    // marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 0.1,
    // flexDirection: 'row',
    // alignItems: 'center',
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
    // marginVertical: 10,
    flex: 1,
    // width: '100%',
  },
});
