import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  LayoutAnimation,
  Text,
  Platform,
  UIManager,
  InteractionManager,
  Easing,
  PanResponder,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import FancyHeader from '../../../components/organisms/FancyHeader/FancyHeader';
import ToggleButton from '../../../components/molecules/ToggleButton/ToggleButton';
import Container from '../../../components/organisms/Container/Container';
import DmzSwitch from '../../../components/molecules/DmzSwitch/DmzSwitch';
import ProfilePic from '../../../components/atoms/ProfilePic/ProfilePic';
import TimelineContainer from '../../../components/molecules/TimelineContainer/TimelineContainer';
import CalenderMonth from '../../../components/molecules/CalenderMonth/CalenderMonth';
import {useDispatch, useSelector} from 'react-redux';
import {
  GettingDocterLatestInfo,
  FetchAppointments,
  FetchAllAppointments,
} from '../../../redux/action/doctor/myDoctorAction';
import RadialGradient from 'react-native-radial-gradient';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import VerticalText from '../../../components/atoms/VerticalText/VerticalText';
import calculateMonths from '../../../utils/calculateMonths';
import {months} from '../../../utils/Months';
import AppoinmentSlider from '../../../components/molecules/YearCalendar.js/AppoinmentSlider';
import {values} from 'lodash';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Moment from 'moment';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Home = ({navigation}) => {
  String.prototype.toTitleCase = function () {
    const splited = this.split(' ')
      .map((item) => {
        return `${item[0].toUpperCase()}${item.slice(1)}`;
      })
      .join(' ');
    return splited;
  };
  // const dispatch = useDispatch();
  // const {
  //   appointmentLoading,
  //   appointments,
  //   appointmentFetchError,
  //   allAppointmentLoading,
  //   allAppointments,
  //   allAppointmentFetchError,
  // } = useSelector((state) => state.MyDoctorReducer);
  // const {data} = useSelector((state) => state.AuthReducer);
  const {height, width} = Dimensions.get('window');
  // const [dayNdate, setdayNdate] = useState([]);
  // const [activeAppointments, setActiveAppointments] = useState([]);
  // const date = new Date();
  // const [activeDate, setActiveDate] = useState(date.getDate());
  // const [globalShowCalendar, setGlobalShowCalendar] = useState(false);
  // useEffect(() => {
  //   const date = new Date();
  //   !allAppointmentLoading &&
  //     dispatch(
  //       FetchAllAppointments(
  //         data.id,
  //         new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString(),
  //       ),
  //     );
  // }, []);
  // useEffect(() => {
  //   let arr = calculateMonths(date.getMonth());
  //   if (!allAppointmentLoading) {
  //     arr = arr.map((item) => {
  //       if (allAppointments[item.date]) {
  //         return {
  //           ...item,
  //           active: true,
  //         };
  //       }
  //       return {
  //         ...item,
  //         active: false,
  //       };
  //     });
  //     setdayNdate(arr);
  //   }
  //   const todayDate = date.getDate();
  //   if (allAppointments[todayDate]) {
  //     setActiveDate(todayDate);
  //     setActiveAppointments(allAppointments[todayDate]);
  //   } else {
  //     setActiveAppointments([]);
  //   }
  // }, [allAppointments]);

  // getting recent appointments
  // useEffect(() => {
  //   dispatch(GettingDocterLatestInfo());
  // }, []);
  /**handling animation gesture */

  const panning = useRef(new Animated.Value(height * 0.6)).current;
  // const [scrollV, setScroll] = useState(0);
  // panning.addListener(({value}) => {
  //   setScroll(value);
  //   console.log('from listener');
  //   console.log(value);
  // });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        panning.setOffset(panning.__getValue());
      },
      onPanResponderMove: (evt, gestureState) => {
        const scroll = panning.__getValue();
        if (scroll > 10 || gestureState.dy > 0)
          panning.setValue(gestureState.dy);
        if (scroll < 0) panning.setOffset(0);

        // console.log('%%%%%%%%%%');
        // console.log(scroll <= height * 0.6);
        // console.log(scroll);
        // console.log(height * 0.6);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (!(panning.__getValue() > height * 0.6))
          panning.setOffset(panning.__getValue());
        panning.setValue(0);
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    }),
  ).current;
  // const setDate = (date) => {
  //   if (allAppointments[date]) {
  //     setActiveDate(date);
  //     setActiveAppointments(allAppointments[date]);
  //     console.log(allAppointments[date]);
  //   } else {
  //     setActiveAppointments([]);
  //   }
  // };

  
  return (
    <RadialGradient
      style={{width: '100%', height: '100%', zIndex: 0}}
      colors={['#F8F7FF', '#E9E5FF']}
      stops={[0.0, 0.2, 0.75]}
      center={[130, 100]}
      radius={200}>
      <TopNavBar
        // onRightButtonPress={() => {}}
        navigation={navigation}
        style={{
          Container: {
            height: '5%',
            marginTop: 10,
          },
        }}></TopNavBar>
      <Text
        style={{
          fontSize: 32,
          textAlign: 'center',
          color: '#6859A2',
          fontWeight: 'bold',
        }}>
        Appointments
      </Text>
      {/* <CalenderMonth
        style={{Container: {marginTop: 30}}}
        dayNdate={dayNdate}
        activeDate={activeDate}
        setGlobalShowCalendar={setGlobalShowCalendar}
        setDate={setDate}></CalenderMonth> */}
      <Animated.View
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 15,
          paddingVertical: 25,
          width: '100%',
          height: 'auto',
          transform: [{translateY: panning}],
          zIndex: 10,
          elevation: 2,
        }}>
        <View style={{marginLeft: 15}} {...panResponder.panHandlers}>
          <Text style={{color: '#AAA4C5', fontWeight: 'bold', fontSize: 16}}>
            Hello
            {/* {data.basic.name.toTitleCase()}, */}
          </Text>
          <Text style={{color: '#AAA4C5', fontWeight: 'bold', fontSize: 16}}>
            You have{' '}
            <Text style={{color: '#6859A2'}}>
              {/* {activeAppointments.length} */}
              Appointments
            </Text>
          </Text>
        </View>
        <ScrollView>
          {/* still have to create search bar */}
          {/* {activeAppointments.map((item, index) => {
            const {patient} = item;
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PatientDetails', {patient: patient});
                }}
                style={{marginTop: 25}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#E9E5FF',
                    borderRadius: 25,
                    flexDirection: 'row',
                    paddingVertical: 20,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#9C77BC',
                      }}>
                      {index + 1}
                    </Text>
                  </View>
                  <View style={{flex: 4, paddingHorizontal: 10}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#6859A2',
                      }}>
                      {`${patient.firstName} ${patient.lastName}`}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'normal',
                        color: '#AAA4C5',
                      }}>
                      Medical Checkup
                    </Text>
                  </View>
                  <View style={{flex: 1.5}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#6859A2',
                      }}>
                      {Moment(item.bookedFor).format('h:mm a')}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    width: '80%',
                    alignSelf: 'center',
                    backgroundColor: '#AAA4C5',
                    marginTop: 15,
                  }}></View>
              </TouchableOpacity>
            );
          })}
        */}
        </ScrollView>
      </Animated.View>
    </RadialGradient>
  );
};

export default Home;
