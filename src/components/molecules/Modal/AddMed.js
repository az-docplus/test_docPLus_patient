import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
  Modal,
  ToastAndroid,
  Easing,
} from 'react-native';
import InsetShadow from 'react-native-inset-shadow';
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
import { TextInputMask } from 'react-native-masked-text';
import NewToggleButton from '../ToggleButton/NewToggleButton';
import Feather from 'react-native-vector-icons/Feather';
import { set } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';
import { GetAvailableMedicines } from '../../../reduxV2/action/PatientAction';
import moment from 'moment';
import { SearchHint } from '../SearchHint/SearchHint';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';
import { TouchableWithoutFeedback } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import SimpleFieldCompo from '../../components/atoms2/Input/simple-field';
import SimpleFieldCompo from '../../atoms2/Input/simple-field';
import { Animated } from 'react-native';
import { useRef } from 'react';
import AnimatedTextInput from './AnimatedTextInput';
const AddMed = ({
  visible,
  onCancel,
  onUpdate,
  editMode,
  data,
  setVisible,
}) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const [details, setDetails] = useState({
    name: '',
    // category: '',
    amount: '',
    description: '',
    time: [],
  });
  const [date, setdate] = useState(new Date());
  const [error, setError] = useState([true, true, true]);
  const [timeValidation, settimeValidation] = useState(false);
  const [availableMeds, setavailableMeds] = useState([]);
  const [focused, setFocused] = useState(false);
  const [addTime, setAddTime] = useState(false);
  const [topOffset, setTopOffset] = useState(0);
  const [medSelected, setMedSelected] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  console.log('================>>>>>>>>>>>>>new date', data);
  useEffect(() => {
    if (editMode) {
      const { time } = data;
      const _time = [];
      // if (time) {
      //   time.map((t, i) => {
      //     if (t) {
      //       const time =
      //         t && moment(t) && moment(t).format('hh:mm a') != 'Invalid date'
      //           ? moment(t).format('hh:mm a')
      //           : t;
      //       _time.push({
      //         value: time.substr(0, time.length - 2),
      //         amPm: time.substr(time.length - 2, 2),
      //       });
      //     }
      //   });
      // }
      setDetails({
        ...data,
        time: time,
      });
      settimeValidation(true);
    } else {
      setDetails({
        name: '',
        // category: '',
        amount: '',
        description: '',
        time: [],
      });
    }
  }, [data, editMode]);

  const successCallback = (_data) => {
    setavailableMeds(_data);
  };
  const errorCallback = () => {};

  const onChange = (text) => {
    setDetails({ ...details, name: text });
  };
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      if (details.name == '') {
        setavailableMeds([]);
      } else {
        dispatch(
          GetAvailableMedicines(details.name, successCallback, errorCallback),
        );
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [details.name, dispatch]);
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
  const inputTextRefMove = useRef(new Animated.Value(0)).current;
  const inputTextRefSize = useRef(new Animated.Value(1)).current;
  const moveUp = () => {
    Animated.parallel([
      Animated.timing(inputTextRefMove, {
        toValue: -33,
        duration: 500,
        easing: Easing.elastic(),
        useNativeDriver: true,
      }),
      Animated.timing(inputTextRefSize, {
        toValue: 0.7,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <BlurModal
      {...{ visible, setVisible }}
      onCancel={() => {
        setDetails({
          name: '',
          category: '',
          //amount: '',
          date: '',
          time: [],
        });
        setIsSubmit(false);
        onCancel();
      }}>
      {availableMeds.length > 0 &&
      details.name.length > 0 &&
      !medSelected &&
      focused ? (
        // <TouchableWithoutFeedback
        // onPress={() => {setMedSelected(!medSelected)}}
        // // style={customTouchableStyle}
        // >
        <SearchHint
          onSelect={(text) => {
            console.log({ text });
            setMedSelected(true);
            setDetails({ ...details, name: text });
          }}
          name={details.name}
          topOffset={topOffset}
          data={availableMeds}
          setMedSelected={setMedSelected}
        />
      ) : // </TouchableWithoutFeedback>
      null}
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          color: Colors.primary_text_color[theme],
          marginBottom: 15,
          textAlign: 'center',
        }}>
        {Local('doctor.medical_history.add_pills')}
      </Text>

      <View
        onLayout={({
          nativeEvent: {
            layout: { height, y },
          },
        }) => {
          setTopOffset(height + y + 8);
        }}>
        <AnimatedTextInput
          onFocus={onFocus}
          icon={true}
          placeholder={`${Local('doctor.medical_history.search_medicine')}`}
          onChangeText={(text) => setDetails({ ...details, name: text })}
          value={details.name}
          error={details.name === '' && isSubmit}
        />
        {/* {details.name == '' && isSubmit && (
          <AnimatedErrorText
            style={{ width: '100%', alignSelf: 'center' }}
            text={'Medicine Name should not be empty'}
          />
        )} */}

        <AnimatedTextInput
          // onFocus={onFocus}
          placeholder={`${Local('doctor.medical_history.course_description')}`}
          onChangeText={(text) => setDetails({ ...details, description: text })}
          value={details.description}
          error={details.description === '' && isSubmit}
        />
      </View>

      <View
        style={{
          marginTop: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={[
            styles.text,
            {
              fontSize: 16,
              fontFamily: 'Gilroy-Medium',
              color: Colors.primary_text_color[theme],
            },
          ]}>
          {`${Local('doctor.V2.sheet.add_time_to_intake')}`}
        </Text>
        <TouchableOpacity
          onPress={() => setAddTime(true)}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 3,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 15,
            backgroundColor: '#E0F4F4',
          }}>
          <Text
            style={{
              color: '#297281',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 25,
            }}>
            +
          </Text>
          <Text
            style={{
              color: '#297281',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
              marginLeft: 3,
            }}>
            {`${Local('doctor.V2.your_family.add')}`}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        onRequestClose={() => {
          setAddTime(false);
        }}
        transparent={true}
        visible={addTime}
        animationType="fade">
        <TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              // backgroundColor: Colors.secondary_background[theme]
            }}>
            <BlurView
              blurRadius={7}
              downsampleFactor={1}
              overlayColor={Colors.blur_overlay_color[theme]}
              blurAmount={1}
              style={StyleSheet.absoluteFill}
              blurType="light"
            />
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={{
                  // backgroundColor: 'white',
                  backgroundColor: Colors.secondary_background[theme],
                  padding: '8%',
                  borderRadius: 30,
                  marginHorizontal: 20,
                  // alignSelf: 'center',
                  // margin: !moreMargin ? '4%' : '8%',
                  justifyContent: 'center',
                  // alignItems: 'center',
                  //   borderWidth: 1,
                }}>
                <Text
                  style={{
                    fontFamily: 'Gilroy-SemiBold',
                    fontSize: 20,
                    color: '#297281',
                    // color: Colors.primary_text_color[theme],
                    marginBottom: 15,
                    textAlign: 'center',
                  }}>
                  Add Time
                </Text>
                <DatePicker
                  style={{ justifyContent: 'space-between' }}
                  mode="time"
                  open={addTime}
                  date={date}
                  onDateChange={(txt) => {
                    // setOpen(false);
                    console.log('=====>>>>>>>>>date', txt);
                    setdate(txt);
                    // setDetails({
                    //   ...details,
                    //   birthDay: moment(txt).format('YYYY-MM-DD'),
                    // });
                    // console.log('=====>>>>>>>>>datebb', details.birthDay);
                  }}
                  onCancel={() => {
                    setAddTime(false);
                  }}
                />
                <View style={{ marginHorizontal: 40, marginVertical: 15 }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (
                        !details.time.includes(moment(date).format('hh:mm A'))
                      ) {
                        setDetails({
                          ...details,
                          time: [
                            ...details.time,
                            moment(date).format('hh:mm A'),
                          ],
                        });
                      } else {
                        ToastAndroid.show(
                          'This Time Already Added',
                          ToastAndroid.SHORT,
                        );
                      }

                      setAddTime(false);
                    }}>
                    <LinearGradient
                      colors={['#225F6B', '#2E8192']}
                      start={{ x: 1, y: 1 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        borderRadius: 30,

                        paddingVertical: 15,
                        elevation: 10,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#FFFFFF',
                          fontFamily: 'Gilroy-SemiBold',
                          fontSize: 20,
                        }}>
                        Confirm
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',

          height: 80,
          width: '100%',
        }}>
        {details.time.map((t, i) => (
          <TouchableOpacity
            onPress={() =>
              ToastAndroid.show('Long Press to delete time', ToastAndroid.SHORT)
            }
            onLongPress={() =>
              setDetails({
                ...details,
                time: details.time.filter((time) => time !== t),
              })
            }
            style={{
              alignItems: 'center',
              backgroundColor: '#F9DDE7',
              // backgroundColor: Colors.primary_light_bg[theme],
              borderWidth: 0,
              borderRadius: 6,
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginRight: '2%',
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Medium',
                fontSize: 14,
                color: '#EA1A65',
                // color: Colors.primary_text_color[theme],
                paddingVertical: 4,
              }}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* {details.time.map((time, i) => (
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
                let temp = details.time;
                temp[i].value = text;
                setDetails({ ...details, time: temp });
                let valid = true;
                let errors = error;
                details.time.map((t, i) => {
                  const split = t.value.split(':');
                  const hours = split[0] ? parseInt(split[0]) : null;
                  const mins = split[1] ? parseInt(split[1]) : null;
                  //don't use && when there's change that any of the operand could be 0(as valid)
                  hours != null && mins != null
                    ? hours > 12
                      ? (valid = false)
                      : mins >= 60
                      ? (valid = false)
                      : (valid = true)
                    : (valid = false);
                  if (text.length == 5) {
                    errors[i] = valid;
                  } else {
                    errors[i] = true;
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
            {(!error[i] || !timeValidation) && isSubmit && (
              <AnimatedErrorText
                style={{ alignSelf: 'center' }}
                text={'Invalid time'}
              />
            )}
          </View>
          <View style={!error[i] && { marginBottom: 20 }}>
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
                let temp = details.time;
                temp[i].amPm = temp[i].amPm === 'AM' ? 'PM' : 'AM';
                setDetails({ ...details, time: temp });
              }}
            />
          </View>
        </View>
      ))} */}

      {/* <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <TouchableOpacity
          disabled={details.time.length > 4}
          onPress={() => {
            let temp = details.time;
            console.log(details.time, '......time fefore');
            //if (temp[temp.length - 1].value.length !== 5) return;
            temp.push({ value: '', amPm: 'AM' });
            settimeValidation(false);
            setDetails({ ...details, time: temp });
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
          disabled={details.time.length == 1}
          onPress={() => {
            let temp = details.time;
            if (temp.length == 1) {
              return;
            }
            //if (temp[temp.length - 1].value.length !== 5) return;
            temp.pop();
            setDetails({ ...details, time: temp });
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
      </View> */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => onCancel()}
          style={{
            marginRight: 5,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: '#297281',
            paddingVertical: 15,
            flex: 1,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#297281',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 20,
            }}>
            {`${Local('doctor.V2.booking_detail.button.cancel')}`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsSubmit(true);
            let valid = true;

            if (details.time.length === 0) {
              valid = false;
            }

            if (valid) {
              console.log('isValid');
              if (
                details.name === '' ||
                //  details.amount == '' ||
                // details.category === '' ||
                details.description === ''
                // !timeValidation
              ) {
                return;
              }
              onUpdate(details);
              onCancel();
              setIsSubmit(false);
              setDetails({
                name: '',
                // category: '',
                amount: '',
                description: '',
                time: [],
              });
            }
          }}
          style={{ flex: 1, marginLeft: 5 }}>
          <LinearGradient
            colors={['#225F6B', '#2E8192']}
            start={{ x: 1, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 30,

              paddingVertical: 15,
              elevation: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#FFFFFF',
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 20,
              }}>
              {`${Local("doctor.template.update")}`}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* <DmzButton
        // disabled={
        // details.name === '' ||
        //  details.amount == '' ||
        // details.category === '' ||
        // details.description === '' ||
        // !timeValidation
        // }
        onPress={() => {
          setIsSubmit(true);
          let valid = true;
          details.time.map((t, i) => {
            if (t.value === '') valid = false;
          });
          if (valid) {
            console.log('isValid');
            if (
              details.name === '' ||
              //  details.amount == '' ||
              // details.category === '' ||
              details.description === '' ||
              !timeValidation
            ) {
              return;
            }
            onUpdate(details);
            onCancel();
            setIsSubmit(false);
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
            fontSize: 18,
            fontFamily: 'Montserrat-SemiBold',
          },
          Container: {
            width: '70%',
            height: 46,
            borderRadius: 25,
            backgroundColor: SECONDARY_COLOR,
            alignSelf: 'center',
            marginTop: 20,
            elevation: 3,
          },
        }}
        text="UPDATE"
      /> */}
    </BlurModal>
  );
};

export default AddMed;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    alignSelf: 'stretch',
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
  numberField: {
    // flex: 1,
    width: '100%',
    // alignSelf: 'stretch',
    borderRadius: 15,
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    height: 50,
    // marginHorizontal: 5,
    marginVertical: 5,
    // borderWidth: 0.1,
    marginRight: 20,
  },
  input: {
    width: '100%',
  },
  smallText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    color: INPUT_PLACEHOLDER,
    marginLeft: 5,
    //alignSelf: 'flex-start',
  },
  animatedText: {
    left: 10,
    flexDirection: 'row',
    color: '#707585',
    position: 'absolute',
    zIndex: -1,
    height: '100%',
    paddingLeft: 22,
    alignItems: 'center',
  },
});
