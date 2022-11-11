import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, BackHandler } from 'react-native';
import Moment from 'moment';
import Calendar from '../../../components/molecules/YearCalendar.js/Calendar';
import AppoinmentSlider from '../../../components/molecules/YearCalendar.js/AppoinmentSlider';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {
  GetAppointmentSlot,
  GetAppointmentInpersonSlot,
  GetFamilyMember,
} from '../../../reduxV2/action/PatientAction';
import { useDispatch, useSelector } from 'react-redux';
import { NEW_PRIMARY_BACKGROUND } from '../../../styles/colors';
import AppointmentQuestion from '../../../components/molecules/Modal/AppointmentQuestion';
import { ActivityIndicator } from 'react-native';
import BlurSpinner from '../../../components/molecules/Modal/BlurLoadingOverlay';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function TimeSlotScreen({ navigation, route }) {
  const { theme } = useSelector((state) => state.AuthReducer);
  const [selectedStartDate, setStartDate] = useState();
  const [today, settoday] = useState(true);
  const [selectedEndDate, setEndDate] = useState('');
  const [forWhom, setforWhom] = useState('');
  const [activeConsultationType, setActiveConsultationType] = useState('TC');
  const [questionModal, setModal] = useState({
    visible: false,
    onNext: () => {},
  });
  const dispatch = useDispatch();
  const {
    appointmentForSlotLoading,
    appointmentForSlot,
    familyMember,
    isPatientAccountReducerLoading,
    patient,
  } = useSelector((state) => state.PatientReducer);
  // console.log(appointmentForSlot, "..........apoointment for slot")
  const [forWhomOption, setForWhomOption] = useState([
    'Myself',
    'Mother',
    'Father',
    'Other',
  ]);

  const data = route.params.data;
  const { _id } = data;

  useEffect(() => {
    if (data.consultationType === 'In-person') {
      setActiveConsultationType('IP');
    } else if (data.consultationType === 'Tele-consult') {
      setActiveConsultationType('TC');
    } else {
      setActiveConsultationType('TC');
    }
  }, []);

  useEffect(() => {
    // console.log("**************************************",activeConsultationType)
    // console.log(data.consultationType)
    // getDateView()
  }, [activeConsultationType]);

  useEffect(() => {
    !isPatientAccountReducerLoading && dispatch(GetFamilyMember(patient.meta));
  }, []);
  useEffect(() => {
    const relationship = Array.from(
      new Set(familyMember.map((item) => item.relationship)),
    );
    relationship.push('Myself');
    setForWhomOption(relationship);
  }, [familyMember]);

  const getDateView = (startDate, endDate) => {
    if (startDate !== '' && endDate !== '') {
      const start = Moment(startDate).format('YYYY-MM-DD');
      let end = Moment(endDate).format('YYYY-MM-DD');
      if (start === end) {
        endDate = new Date(startDate).setDate(
          new Date(startDate).getDate() + 1,
        );
        end = Moment(endDate).format('YYYY-MM-DD');
      }
      if (!appointmentForSlotLoading) {
        // console.log(start, end, "................dscsfsff")
        if (activeConsultationType === 'TC') {
          // console.log("activeConsultationType...................", activeConsultationType)
          dispatch(GetAppointmentSlot([[start, end]], _id));
        } else {
          // console.log("activeConsultationType...................", activeConsultationType)
          dispatch(GetAppointmentInpersonSlot([[start, end]], _id));
        }
      }
    }
  };
  const todaysAppointments = () => {
    const start = new Date();
    const end = new Date().setDate(new Date().getDate() + 1);
    getDateView(start, end);
  };
  useEffect(() => {
    todaysAppointments();
  }, []);
  async function onDateChange(date, type) {
    if (type == 'START_DATE') {
      setStartDate(date);
      console.log('in1', date);
      // setEndDate(null);
    } else if (type == 'END_DATE') {
      setEndDate(date);
      // console.log('in2', type);
      if (date != null) {
        // console.log(selectedStartDate, date, '66666666666');
        settoday(false);
        getDateView(selectedStartDate, date);
      }
      // getDateView(selectedStartDate, selectedEndDate);
    }
  }
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    getDateView(today.toISOString(), tomorrow.toISOString());
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // const onDateChange = (date, type) => {
  //   if (type === 'END_DATE') {

  //     console.log(selectedStartDate, selectedEndDate);
  //   } else {
  //   }
  // };
  return (
    <>
      <AppointmentQuestion
        {...questionModal}
        onCancel={() => {
          setModal({ visible: false });
        }}
        setforWhom={setforWhom}
        text="Who is this visit for?"
        options={forWhomOption}
      />
      {appointmentForSlotLoading && (
        <BlurSpinner visible={appointmentForSlotLoading}>
          <ActivityIndicator color={NEW_PRIMARY_BACKGROUND} size="large" />
        </BlurSpinner>
      )}
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: Colors.secondary_background[theme],
        }}>
        <View>
          <TopNavBar
            navigation={navigation}
            // onLeftButtonPress={() => {
            //   navigation.goBack()
            // }}
            headerText={`${Local('patient.doc_profile.book')}`}
            style={{ Container: { paddingVertical: 5 } }}
          />
          <Calendar
            onDateChange={onDateChange}
            activeConsultationType={activeConsultationType}
            data={data.consultationType}
            setActiveConsultationType={setActiveConsultationType}
          />
          {/* <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginTop: 20,
              paddingHorizontal: '15%',
            }}>
            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
              <TouchableOpacity
                onPress={() => { settoday(true); todaysAppointments() }}
              >
                <Text
                  style={!today ? {
                    borderRadius: 6,
                    borderWidth: 1,
                    width: 20,
                    height: 20,
                    textAlign: 'center',
                    borderColor: NEW_PRIMARY_COLOR,
                    fontSize: 18,
                  } : {
                      borderRadius: 5,
                      backgroundColor: SECONDARY_COLOR,
                      width: 20,
                      height: 20,
                      textAlign: 'center',
                      borderColor: 'white',
                    }}>
                  {' '}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  height: 20,
                  textAlignVertical: 'center',
                  color: NEW_HEADER_TEXT,
                  fontFamily: 'Montserrat-Regular',
                }}>
                Today
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => { settoday(false) }}
              >
                <Text
                  style={today ? {
                    borderRadius: 6,
                    borderWidth: 1,
                    width: 20,
                    height: 20,
                    textAlign: 'center',
                    borderColor: NEW_PRIMARY_COLOR,
                    fontSize: 18,
                  } : {
                      borderRadius: 5,
                      backgroundColor: SECONDARY_COLOR,
                      width: 20,
                      height: 20,
                      textAlign: 'center',
                      borderColor: 'white',
                    }}>
                  {' '}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  color: NEW_HEADER_TEXT,
                  fontFamily: 'Montserrat-Regular',
                }}>
                Chosen
              </Text>
            </View>
          </View> */}
        </View>
        <AppoinmentSlider
          navigation={navigation}
          slots={appointmentForSlot}
          // slots={filteredSlots}
          doctorData={data}
          setModal={setModal}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bodyViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLayoutStyle: {
    width,
    height: 100,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slidingPanelLayoutStyle: {
    width,
    height,
    backgroundColor: '#7E52A0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commonTextStyle: {
    color: 'white',
    fontSize: 18,
  },
});
