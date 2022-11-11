import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
} from 'react-native';
import BlurModal from './BlurModal';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  SECONDARY_COLOR,
  GREY_OUTLINE,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TextInputMask} from 'react-native-masked-text';
import NewToggleButton from '../ToggleButton/NewToggleButton';
import Feather from 'react-native-vector-icons/Feather';
import {set} from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';
import {GetAvailableMedicines} from '../../../reduxV2/action/PatientAction';
import moment from 'moment';
import {SearchHint} from '../SearchHint/SearchHint';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';


const AddCondition = ({visible, onCancel, onUpdate, editMode, setEditMode, data, setVisible}) => {
    console.log(data._id, "::::::::::::::")
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [details, setDetails] = useState({
    name: '',
    // category: '',
    amount: '',
    description: '',
    time: [
      {
        value: '',
        amPm: 'AM',
      },
    ],
  });

  const handleUpdate =(createNew = false) => {
    if(createNew) {
      setEditMode(false)
    }
      // medicineArray.push(details)
      // reportsArray.push(reportDetails)
      const _timeArray = details?.time?.map((t, i) => {
        return (t.value + t.amPm)
      })
      setConditionData({
        ...conditionData,
        condition: conditionData.condition,
        medicines: [...medicineArray, {...details, time: _timeArray}],
        reports: [...reportsArray, reportDetails]
      })
    console.log([...medicineArray, details], [...reportsArray, reportDetails], "LLLLLLLLLLLLLLLLLLL")
    onUpdate({
      ...conditionData,
      condition: conditionData.condition,
      medicines: [...medicineArray, {...details, time: _timeArray, quantity: _timeArray?.length}],
      reports: [...reportsArray, reportDetails]
    }, data._id, createNew)
  }
  const [medicineArray, setMedicineArray] = useState([])
  const [reportsArray, setReportsArray] = useState([])
  const [conditionData, setConditionData] = useState({})
  const [count, setCount] = useState(1)
  const [reportCount, setReportCount] = useState(1)
  const [error, setError] = useState([true, true, true]);
  const [timeValidation, settimeValidation] = useState(false);
  const [availableMeds, setavailableMeds] = useState([]);
  const [focused, setFocused] = useState(false);
  const [topOffset, setTopOffset] = useState(0);
  const [medSelected, setMedSelected] = useState(false);
  const [reportDetails, setReportsDetails] = useState({
      name: "",
      type: ""
  })
  const dispatch = useDispatch();

  const addCount = () => {
      setCount(count => count + 1)
  }
  const subCount = () => {
      setCount(count => count - 1)
      console.log(count)
  }

  const addReportCount = () => {
      setReportCount(reportCount => reportCount + 1)
  }
  const subReportCount = () => {
      setReportCount(reportCount => reportCount - 1)
      console.log(count)
  }

  useEffect(() => {
    if (editMode) {
      // console.log(data?.medicines, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        // setConditionData({
        //     condition: data.condition
        // })
        // setMedicineArray(data?.medicines)
        const temp = []
        data.medicines.map((item, index) => {
              console.log({ item })
              const med = item?.medicines[0]
              if (med) {
                temp.push(med)
              }
          })
        console.log(temp.length, "ksdfjsdkfjfdsl")
        setMedicineArray(temp)
        setReportsArray(data?.reports)
        setReportsDetails(data?.reports[0])
        setConditionData({
          condition: data.condition,
          medicines: medicineArray,
          reports: reportsArray

      })
      console.log(temp[0], "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
      setDetails(temp[0])

      const {time} = details;
      const _time = [];
      if (time) {
        time.map((t, i) => {
          if (t) {
            const time =
              t && moment(t) && moment(t).format('hh:mm a') != 'Invalid date'
                ? moment(t).format('hh:mm a')
                : t;
            _time.push({
              value: time.substr(0, time.length - 2),
              amPm: time.substr(time.length - 2, 2),
            });
          }
        });
      }
      setDetails({
        ...temp[0],
        time: _time,
      });

      console.log(details, "DKJFLKDFJLKDFJDKFJDKFJKDFJDKFJKDFJDKFJDKFJDK")
      
      settimeValidation(true);
    } else {
        setConditionData({})
        setMedicineArray([])
        setReportsArray([])
        setCount(0)
        setReportCount(0)
        setReportsDetails({
            name: "",
            type: ""
        })
      setDetails({
        name: '',
        // category: '',
        amount: '',
        description: '',
        time: [
          {
            value: '',
            amPm: 'AM',
          },
        ],
      });
    }
  }, [data, editMode]);

  const successCallback = (_data) => {
    setavailableMeds(_data);
  };
  const errorCallback = () => {};

  const onChange = (text) => {
    setDetails({...details, name: text});
  };
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      if (details?.name == '') {
        setavailableMeds([]);
      } else {
        dispatch(
          GetAvailableMedicines(details?.name, successCallback, errorCallback),
        );
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [details?.name, dispatch]);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onCancel);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onCancel);
    };
  }, []);
  const onFocus = () => {
    setFocused(true);
    setMedSelected(false);
  };
  const onBlur = () => {
    // setFocused(false);
  };


  return (
    <BlurModal
      {...{visible, setVisible}}
      onCancel={() => {
        setDetails({
          name: '',
          category: '',
          //amount: '',
          date: '',
          time: [
            {
              value: '',
              amPm: 'AM',
            },
          ],
        });
        onCancel();
      }}>
      <ScrollView>
      {!medSelected && focused && availableMeds?.length > 0 ? (
        <SearchHint
          onSelect={(text) => {
            console.log({text});
            setMedSelected(true);
            setDetails({...details, name: text});
          }}
          name={details?.name}
          topOffset={topOffset}
          data={availableMeds}
        />
      ) : null}
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          color: Colors.primary_text_color[theme],
          marginBottom: 15,
        }}>
        {`${Local("doctor.template.add_temp")}`}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: NEW_PRIMARY_BACKGROUND,
          borderBottomWidth: 1.5,
          marginBottom: 15,
          width: 300,
        }}>
        <TextInput
          value={conditionData.condition}
          onChangeText={(text) => setConditionData({
              ...conditionData,
              condition : text
          })}
          placeholderTextColor={Colors.input_placeholder_color[theme]}
          placeholder={`${Local("doctor.template.con")}`}
          style={[
            styles.text,
            {
              borderBottomWidth: 0,
              flex: 1,
              marginBottom: 0,
              color: Colors.primary_text_color[theme],
            },
          ]}
        />
      </View>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 15,
          textAlign: "left",
          color: Colors.primary_text_color[theme],
          marginBottom: 5,
        }}>
                {`${Local("doctor.template.med")}`}
 {count + 1}
      </Text>
      <View style={{flexDirection: 'row', marginBottom: 0, justifyContent: "space-between"}}>
      <View style={{flexDirection: 'row', marginBottom: 0, marginRight: 20}}>
        <TouchableOpacity
          disabled={details?.time?.length > 9}
          onPress={() => {
            const _timeArray = details?.time?.map((t, i) => {
              return (t.value + t.amPm)
            })
            medicineArray.push({...details, time: _timeArray})
            addCount()
            setDetails({
                name: '',
                // category: '',
                amount: '',
                description: '',
                time: [
                  {
                    value: '',
                    amPm: 'AM',
                  },
                ],
              })
            
            console.log(medicineArray.length)
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              borderWidth: 1,
              borderColor: Colors.input_placeholder_color[theme],
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather
              name="plus"
              size={20}
              color={Colors.input_placeholder_color[theme]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={count == 0}
          onPress={() => {
            subCount()
            medicineArray.pop()
            console.log(medicineArray.length)
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              borderWidth: 1,
              borderColor: Colors.input_placeholder_color[theme],
              borderRadius: 30,
              marginLeft: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather
              name="minus"
              size={20}
              color={Colors.input_placeholder_color[theme]}
            />
          </View>
        </TouchableOpacity>
        {/* <Image
          source={require('../../../assets/icons/inactive_toggle.png')}
          style={{
            height: 35,
            width: 80,
            marginLeft: 20,
          }}
          resizeMode="stretch"
        /> */}
      </View>
      <View style={{flexDirection: 'row', marginBottom: 0}}>
        <TouchableOpacity
          disabled={count == 0}
          onPress={() => {
            subCount()
            setDetails(medicineArray[count - 1])
            // if(medicineArray[count - 1]) setDetails(medicineArray[count - 1])
            
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              borderWidth: 1,
              borderColor: Colors.input_placeholder_color[theme],
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather
              name="chevron-left"
              size={20}
              color={Colors.input_placeholder_color[theme]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={count == medicineArray.length - 1}
          onPress={() => {
            addCount()
            setDetails(medicineArray[count + 1])
            // if(medicineArray[count + 1]) setDetails(medicineArray[count + 1])
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              borderWidth: 1,
              borderColor: Colors.input_placeholder_color[theme],
              borderRadius: 30,
              marginLeft: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather
              name="chevron-right"
              size={20}
              color={Colors.input_placeholder_color[theme]}
            />
          </View>
        </TouchableOpacity>
        {/* <Image
          source={require('../../../assets/icons/inactive_toggle.png')}
          style={{
            height: 35,
            width: 80,
            marginLeft: 20,
          }}
          resizeMode="stretch"
        /> */}
      </View>
      </View>
      <View
        onLayout={({
          nativeEvent: {
            layout: {height, y},
          },
        }) => {
          setTopOffset(height + y + 8);
        }}
        style={{width: 300}}>
        <TextInput
          style={[styles.text, {color: Colors.primary_text_color[theme]}]}
          value={details?.name}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChange}
          // placeholder={`Medicine Name`}
          placeholder={`${Local('doctor.medical_history.search_medicine')}`}
          placeholderTextColor={
            Colors.input_placeholder_color[theme]
          }></TextInput>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: NEW_PRIMARY_BACKGROUND,
          borderBottomWidth: 1.5,
          marginBottom: 15,
          width: 300,
        }}>
        <TextInput
          value={details?.description}
          onChangeText={(text) => setDetails({...details, description: text})}
          placeholderTextColor={Colors.input_placeholder_color[theme]}
          placeholder={`${Local('doctor.medical_history.course_description')}`}
          style={[
            styles.text,
            {
              borderBottomWidth: 0,
              flex: 1,
              marginBottom: 0,
              color: Colors.primary_text_color[theme],
            },
          ]}
        />
      </View>

      <Text
        style={[
          styles.text,
          {
            borderBottomWidth: 0,
            marginBottom: 0,
            color: Colors.primary_text_color[theme],
          },
        ]}>
        {Local('doctor.medical_history.time')}
      </Text>

      {details?.time?.map((time, i) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <View>
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'HH:mm',
              }}
              value={time.value}
              onChangeText={(text) => {
                console.log(text);
                let temp = details?.time;
                temp[i].value = text;
                setDetails({...details, time: temp});
                let valid = true;
                let errors = error;
                details?.time?.map((t, i) => {
                  const split = t.value.split(':');
                  const hours = split[0] ? parseInt(split[0]) : null;
                  const mins = split[1] ? parseInt(split[1]) : null;
                  //don't use && when there's change that any of the operand could be 0(as valid)
                  // hours != null && mins != null
                  //   ? hours > 12
                  //     ? (valid = false)
                  //     : mins >= 60
                  //     ? (valid = false)
                  //     : (valid = true)
                  //   : (valid = false);

                  if(hours > 23 || mins > 59){
                    valid = false
                  }

                  // if(hours > 12 && mins > 59) errors[i] = false
                  if (text.length > 5 || text.length < 5) {
                    valid = false
                    errors[i] = valid;
                  } else {
                    errors[i] = valid
                  }
                });
                setError(errors);
                settimeValidation(valid);
              }}
              style={{
                padding: 5,
                borderRadius: 30,
                borderColor: GREY_OUTLINE,
                borderWidth: 1,
                width: 80,
                fontFamily: 'Montserrat-Regular',
                fontSize: 16,
                color: Colors.primary_text_color[theme],
                paddingHorizontal: 10,
                textAlign: 'center',
                height: 35,
              }}
            />
            {!error[i] && (
              <AnimatedErrorText
                style={{alignSelf: 'center'}}
                text={'Invalid time'}
              />
            )}
          </View>
          <View style={!error[i] && {marginBottom: 20}}>
            <NewToggleButton
              text0="AM"
              text1="PM"
              style={{
                width: 80,
                marginLeft: 20,
                elevation: 0,
                height: 35,
                backgroundColor: SECONDARY_COLOR,
                backgroundColor: Colors.landing_toggle_btn[theme],
                // padding: 2,
                // borderWidth: 1,
                // borderColor: "#fff"
              }}
              toggle={time.amPm === 'AM'}
              onToggle={() => {
                let temp = details?.time;
                temp[i].amPm = temp[i].amPm === 'AM' ? 'PM' : 'AM';
                setDetails({...details, time: temp});
              }}
            />
          </View>
        </View>
      ))}

      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <TouchableOpacity
          disabled={details?.time?.length > 9}
          onPress={() => {
            let temp = details?.time;
            console.log(details?.time, '......time fefore');
            //if (temp[temp.length - 1].value.length !== 5) return;
            temp.push({value: '', amPm: 'AM'});
            settimeValidation(false);
            setDetails({...details, time: temp});
            const errors = error;
            errors.push(true);
            setError(errors);
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              borderWidth: 1,
              borderColor: Colors.input_placeholder_color[theme],
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather
              name="plus"
              size={20}
              color={Colors.input_placeholder_color[theme]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={details?.time?.length == 1}
          onPress={() => {
            let temp = details?.time;
            if (temp.length == 1) return;
            //if (temp[temp.length - 1].value.length !== 5) return;
            temp.pop();
            setDetails({...details, time: temp});
            const errors = error;
            errors.pop();
            setError(errors);
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              borderWidth: 1,
              borderColor: Colors.input_placeholder_color[theme],
              borderRadius: 30,
              marginLeft: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather
              name="minus"
              size={20}
              color={Colors.input_placeholder_color[theme]}
            />
          </View>
        </TouchableOpacity>
        {/* <Image
          source={require('../../../assets/icons/inactive_toggle.png')}
          style={{
            height: 35,
            width: 80,
            marginLeft: 20,
          }}
          resizeMode="stretch"
        /> */}
      </View>

      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 15,
          textAlign: "left",
          color: Colors.primary_text_color[theme],
          marginBottom: 5,
        }}>
{`${Local("doctor.template.rep")}`} {reportCount + 1}
      </Text>
      <View style={{flexDirection: 'row', marginBottom: 0, justifyContent: "space-between"}}>
      <View style={{flexDirection: 'row', marginBottom: 0, marginRight: 20}}>
        <TouchableOpacity
          disabled={reportCount > 5}
          onPress={() => {
            reportsArray.push(reportDetails)
            addReportCount()
            setReportsDetails({
                name: '',
                type: ""
              })
            
            console.log(reportsArray.length)
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              borderWidth: 1,
              borderColor: Colors.input_placeholder_color[theme],
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather
              name="plus"
              size={20}
              color={Colors.input_placeholder_color[theme]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={reportCount == 0}
          onPress={() => {
            subReportCount()
            reportsArray.pop()
            console.log(reportsArray.length)
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              borderWidth: 1,
              borderColor: Colors.input_placeholder_color[theme],
              borderRadius: 30,
              marginLeft: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather
              name="minus"
              size={20}
              color={Colors.input_placeholder_color[theme]}
            />
          </View>
        </TouchableOpacity>
        {/* <Image
          source={require('../../../assets/icons/inactive_toggle.png')}
          style={{
            height: 35,
            width: 80,
            marginLeft: 20,
          }}
          resizeMode="stretch"
        /> */}
      </View>
      <View style={{flexDirection: 'row', marginBottom: 0}}>
        <TouchableOpacity
          disabled={reportCount == 0}
          onPress={() => {
            subReportCount()
            setReportsDetails(reportsArray[reportCount - 1])
            // if(reportsArray[reportCount - 1]) setDetails(reportsArray[reportCount - 1])
            
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              borderWidth: 1,
              borderColor: Colors.input_placeholder_color[theme],
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather
              name="chevron-left"
              size={20}
              color={Colors.input_placeholder_color[theme]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={reportCount == reportsArray.length - 1}
          onPress={() => {
            addReportCount()
            setReportsDetails(reportsArray[reportCount + 1])
            // if(reportsArray[reportCount + 1]) setDetails(reportsArray[reportCount + 1])
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              borderWidth: 1,
              borderColor: Colors.input_placeholder_color[theme],
              borderRadius: 30,
              marginLeft: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather
              name="chevron-right"
              size={20}
              color={Colors.input_placeholder_color[theme]}
            />
          </View>
        </TouchableOpacity>
        {/* <Image
          source={require('../../../assets/icons/inactive_toggle.png')}
          style={{
            height: 35,
            width: 80,
            marginLeft: 20,
          }}
          resizeMode="stretch"
        /> */}
      </View>
      </View>
      
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: NEW_PRIMARY_BACKGROUND,
          borderBottomWidth: 1.5,
          marginBottom: 15,
          width: 300,
        }}>
        <TextInput
          value={reportDetails?.name ?? ""}
          onChangeText={(text) => setReportsDetails({...reportDetails, name: text})}
          placeholderTextColor={Colors.input_placeholder_color[theme]}
          placeholder={`${Local("doctor.template.rep_name")}`}
          style={[
            styles.text,
            {
              borderBottomWidth: 0,
              flex: 1,
              marginBottom: 0,
              color: Colors.primary_text_color[theme],
            },
          ]}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: NEW_PRIMARY_BACKGROUND,
          borderBottomWidth: 1.5,
          marginBottom: 15,
          width: 300,
        }}>
        <TextInput
          value={reportDetails?.type ?? ""}
          onChangeText={(text) => setReportsDetails({...reportDetails, type: text})}
          placeholderTextColor={Colors.input_placeholder_color[theme]}
          placeholder={`${Local("doctor.template.rep_type")}`}
          style={[
            styles.text,
            {
              borderBottomWidth: 0,
              flex: 1,
              marginBottom: 0,
              color: Colors.primary_text_color[theme],
            },
          ]}
        />
      </View>

      <DmzButton
        disabled={
          details?.name === '' ||
          //  details?.amount == '' ||
          // details?.category === '' ||
          details?.description === '' ||
          !timeValidation
        }
        onPress={() => {
          let valid = true;
          details?.time.map((t, i) => {
            if (t.value === '') valid = false;
          });
          if (valid) {
            console.log('isValid');
            handleUpdate();
            onCancel();
            setDetails({
              name: '',
              // category: '',
              amount: '',
              description: '',
              time: [
                {
                  value: '',
                  amPm: 'AM',
                },
              ],
            });
            setReportsDetails({
              name: "",
              type: ""
          })
          }
        }}
        style={{
          Text: {
            width: '100%',
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Montserrat-SemiBold',
          },
          Container: {
            width: '70%',
            height: 46,
            borderRadius: 25,
            backgroundColor: SECONDARY_COLOR,
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 5,
            elevation: 3,
          },
        }}
        text={`${Local("doctor.template.update")}`}
      />

      {
        editMode && <DmzButton
        disabled={
          details?.name === '' ||
          //  details?.amount == '' ||
          // details?.category === '' ||
          details?.description === '' ||
          !timeValidation
        }
        onPress={() => {
          let valid = true;
          details?.time.map((t, i) => {
            if (t.value === '') valid = false;
          });
          if (valid) {
            console.log('isValid');
            handleUpdate(true);
            onCancel();
            setDetails({
              name: '',
              // category: '',
              amount: '',
              description: '',
              time: [
                {
                  value: '',
                  amPm: 'AM',
                },
              ],
            });
          }
        }}
        style={{
          Text: {
            width: '100%',
            textAlign: 'center',
            color: '#fff',
            fontSize: 17,
            fontFamily: 'Montserrat-SemiBold',
          },
          Container: {
            width: '70%',
            height: 46,
            borderRadius: 25,
            backgroundColor: SECONDARY_COLOR,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 5,
            elevation: 3,
          },
        }}
        text={`${Local("doctor.template.Save and Create New")}`}
      />
      }
      </ScrollView>
    </BlurModal>
  );
};

export default AddCondition;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    alignSelf: 'stretch',
    borderBottomWidth: 1.5,
    borderColor: NEW_PRIMARY_BACKGROUND,
    padding: 5,
    paddingTop: 20,
    marginBottom: 7,
  },
  inputContainer: {},
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25,
  },
  infoText: {
    textAlign: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  openingText: {
    textAlign: 'center',
  },
});
