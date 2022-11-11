/* eslint-disable react-native/no-inline-styles */
import React, {setState, useState, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Easing,
} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import Moment from 'moment';
import {
  PRIMARY_BACKGROUND,
  NEW_HEADER_TEXT,
  SECONDARY_COLOR,
  NEW_PRIMARY_COLOR,
  NEW_UNSELECTED_TEXT,
} from '../../../styles/colors';
import moment from 'moment';
import NewToggleButton from '../ToggleButton/NewToggleButton';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
export default function AppoinmentSlider({
  slots,
  navigation,
  setModal,
  doctorData,
  forWhom,
}) {
  const {theme} = useSelector((state) => state.AuthReducer);
  const [pos, setPos] = useState(true);
  const [selectedIndex, setselectedIndex] = useState(0);
  const [NoSlotAvailable, setNoSlotAvailable] = useState(false);

  const [timeValue, setTimeValue] = useState('');
  const [singleDay, setSingleDay] = useState();
  const [isAM, setAM] = useState(true);
  const [more, setMore] = useState(false);
  const val = useRef(new Animated.Value(height * 0.6)).current;
  const updateIndex = (i) => {
    setselectedIndex(i);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        val.setOffset(val._value);
      },
      onPanResponderMove: Animated.event([null, {dy: val}]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          val.flattenOffset();
          Animated.timing(val, {
            toValue: height * 0.6,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }).start(() => {
            val.setValue(height * 0.6);
            val.setOffset(0);
          });
        } else {
          val.flattenOffset();
          Animated.timing(val, {
            toValue: height * 0.01,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }).start(() => {
            val.setValue(height * 0.01);
            val.setOffset(0);
          });
        }
        // val.flattenOffset();
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    }),
  ).current;

  const bookAppointment = (slot) => {
    navigation.navigate('ConfirmAppointment', {
      data: {...slot, forWhom},
      doctorData,
    });
    // setModal({
    //   visible: true,
    //   onNext: () =>
    //     navigation.navigate('ConfirmAppointment', { data: { ...slot, forWhom }, doctorData }),
    // });
  };

  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFill,
        // backgroundColor: PRIMARY_BACKGROUND,
        backgroundColor: Colors.revenue_background[theme],
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: width,
        height: 'auto',
        transform: [{translateY: val}],
        zIndex: 9999,
        elevation: 2,
      }}>
      <Animated.View
        style={{
          height: 50,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}
        {...panResponder.panHandlers}>
        <View style={{width: '100%', height: 50}}>
          <View
            style={{
              backgroundColor: NEW_PRIMARY_COLOR,
              // backgroundColor: Colors.landing_toggle_bg[theme],
              height: 12,
              width: '72%',
              borderRadius: 5,
              marginBottom: 10,
              marginTop: 10,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          />
        </View>
      </Animated.View>
      <ScrollView style={{flex: 1, paddingBottom: 50}} scrollEnabled={pos}>
        {slots &&
          slots.length > 0 &&
          slots.map((u, i) => {
            const date = Moment(u._id).format('MMMM, DD');
            let {appointments} = u;
            const lastAppointment = appointments[appointments.length - 1];
            const now = moment();
            const lastSlot = moment(lastAppointment.bookedFor);
            if (lastSlot > now) {
              appointments = appointments.filter((item, index) => {
                const __time = moment(item.bookedFor);
                if (
                  __time > now &&
                  item.available != false
                  // && appointments.indexOf(item) !== index
                )
                  return item;
              });

              // console.log(appointments);

              return (
                <View
                  style={{
                    marginVertical: 5,
                    borderBottomWidth: 1,
                    borderColor: NEW_UNSELECTED_TEXT,
                    marginTop: 20,
                  }}
                  key={u._id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        // color: NEW_HEADER_TEXT,
                        color: Colors.primary_text_color[theme],
                        // fontWeight: 'bold',
                        fontFamily: 'Montserrat-Medium',
                        marginLeft: 10,
                      }}>
                      {date}
                    </Text>
                    {/* <NewToggleButton
                    text0="AM"
                    text1="PM"
                    toggle={isAM}
                    onToggle={() => {
                      setAM(!isAM);
                    }}
                    style={{ width: 100, marginRight: 20, height: 32 }}
                    textStyle={{
                      fontSize: 16,
                      fontFamily: 'Montserrat-SemiBold',
                      margin: 2,
                    }}
                  /> */}
                  </View>
                  <View
                    style={{
                      marginVertical: 20,
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    {appointments &&
                      (more ? appointments : appointments.slice(0, 6)).map(
                        (u, i) => {
                          const time = moment(u.bookedFor).format('hh:mm A');
                          const slot_temp_time = moment(u.bookedFor);
                          if (slot_temp_time > now)
                            return (
                              <View
                                key={u._id}
                                style={{
                                  width: width * 0.3,
                                  height: 38,
                                  marginBottom: 10,
                                  alignItems: 'center',
                                }}>
                                <TouchableHighlight
                                  style={{
                                    width: 85,
                                    height: 38,
                                    backgroundColor:
                                      timeValue === time
                                        ? SECONDARY_COLOR
                                        : 'transparent',
                                    borderWidth: 0,
                                    borderRadius: 6,
                                  }}
                                  onPress={() => {
                                    setTimeValue(time);
                                    bookAppointment(u);
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 17,
                                      fontWeight: '300',
                                      width: '100%',
                                      height: '100%',
                                      textAlign: 'center',
                                      textAlignVertical: 'center',
                                      fontFamily: 'Montserrat-Regular',
                                      color:
                                        timeValue === time
                                          ? '#ffffff'
                                          : Colors.primary_text_color[theme],
                                    }}>
                                    {time}
                                  </Text>
                                </TouchableHighlight>
                              </View>
                            );
                        },
                      )}
                  </View>
                  {
                    /* .filter((c, index) => {
                      return appointments.indexOf(c) !== index;
                  }) */
                    appointments.length > 6 && (
                      <TouchableOpacity onPress={() => setMore(!more)}>
                        <Text
                          style={{
                            marginLeft: 'auto',
                            marginRight: 20,
                            color: NEW_PRIMARY_COLOR,
                            textDecorationLine: 'underline',
                            fontSize: 17,
                            marginBottom: 24,
                            fontFamily: 'Montserrat-Regular',
                          }}>
                          {more ? 'less' : 'more'}
                        </Text>
                      </TouchableOpacity>
                    )
                  }
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '12%',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Montserrat-Medium',
                      color: Colors.primary_text_color[theme],
                    }}>
                    {' '}
                    {Local("patient.doc_profile.doc_not_avail")}
                  </Text>
                </View>
              );
            }
          })}
        <View
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '12%',
          }}>
          {((slots && slots.length == 0) || NoSlotAvailable || !slots) && (
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Montserrat-Medium',
                color: Colors.primary_text_color[theme],
              }}>
              {' '}
              {Local("patient.doc_profile.doc_not_avail")}
            </Text>
          )}
        </View>
      </ScrollView>
    </Animated.View>
  );
}
