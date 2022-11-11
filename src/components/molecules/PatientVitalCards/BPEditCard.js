/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import DmzText from '../../atoms/DmzText/DmzText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularButton from '../../atoms/CircularButton/CircularButton';
import {
  PRIMARY_TEXT,
  TERTIARY_TEXT,
  PRIMARY_COLOR,
} from '../../../styles/colors';
import AnimInput from '../AnimInput/AnimInput';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {UpdateVitals} from '../../../redux/action/patientAccountAction';
import {Local, setLocale} from '../../../i18n';

export default function WeightEditCard({style, details}) {
  const [diastolic, setDiastolic] = useState(
    details.bloodPressure.split('/')[0],
  );
  console.log(details.heartRate);
  const [systolic, setSystolic] = useState(details.bloodPressure.split('/')[1]);
  const [heartRate, setHeartRate] = useState(details.heartRate);
  const [date, setDate] = useState(details.date);
  const dispatch = useDispatch();
  const {patientVitals} = useSelector((state) => state.PatientAccountReducer);

  const saveBp = async () => {
    const response1 = {
      field: 'bloodPressure',
      data: {
        value: `${diastolic}/${systolic}`,
        date: date,
      },
    };
    const response2 = {
      field: 'heartRate',
      data: {
        value: heartRate,
        date: date,
      },
    };
    await dispatch(
      UpdateVitals(response1, patientVitals.userId, patientVitals._id),
    );
    await dispatch(
      UpdateVitals(response2, patientVitals.userId, patientVitals._id),
    );
  };
  return (
    <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
      <View style={[styles.Card, style ? style.Card : null]}>
        <DmzText
          text={`${Local("doctor.medical_history.enter_your_bp")}`}
          style={{fontSize: 18, color: PRIMARY_TEXT}}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <AnimInput
          placeholder={`${Local("doctor.medical_history.systolic")}`}
          inputHandler={(txt) => setSystolic(txt)}
            value={systolic}
            style={{
              Container: {...styles.Container, width: '40%'},
              Input: styles.Input,
              Placeholder: styles.Placeholder,
            }}
          />
          <AnimInput
          placeholder={`${Local("doctor.medical_history.diastolic")}`}
          inputHandler={(txt) => setDiastolic(txt)}
            value={diastolic}
            style={{
              Container: {...styles.Container, width: '40%'},
              Input: styles.Input,
              Placeholder: styles.Placeholder,
            }}
          />
        </View>
        <AnimInput
          placeholder={`${Local("doctor.medical_history.heart_rate")}`}
          inputHandler={(txt) => setHeartRate(txt)}
          value={heartRate}
          style={{
            Container: styles.Container,
            Input: styles.Input,
            Placeholder: styles.Placeholder,
          }}
        />
        <DmzText
          lite
          text="Date"
          style={[styles.Placeholder, {marginTop: 20, marginBottom: -20}]}
        />
        <DatePicker
          date={date}
          mode="date"
          placeholder={`${Local("patient.medical_history.select_date")}`}
          format="DD MMM YYYY"
          minDate="06 Jan 1950"
          maxDate={Moment(new Date(), 'DD MMM YYYY')}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          allowFontScaling={true}
          customStyles={{
            dateInput: {
              borderWidth: 0,
              fontSize: 15,
              height: 40,
              marginBottom: 10,
            },
            dateText: {
              width: '100%',
              fontSize: 18,
              fontWeight: 'bold',
              color: PRIMARY_COLOR,
              left: 0,
              marginTop: 15,
              marginBottom: -10,
              marginLeft: 0,
            },
            placeholderText: {
              width: '100%',
              color: '#ccc',
              fontWeight: 'normal',
              marginTop: 0,
              fontSize: 18,
              left: 0,
              marginBottom: -10,
              marginLeft: 0,
            },
          }}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            width: '100%',
            marginTop: 20,
            alignItems: 'center',
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
      </View>
      <View style={{alignSelf: 'center', marginTop: -35, elevation: 5}}>
        <CircularButton onPress={saveBp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Card: {
    elevation: 4,
    borderRadius: 20,
    height: 'auto',
    width: '80%',
    padding: 15,
    backgroundColor: '#E9E5FF',
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingBottom: 70,
  },
  Container: {height: 60, marginTop: 20, left: 0},
  Input: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    left: 0,
    marginTop: 15,
    marginBottom: 0,
  },
  Placeholder: {
    fontSize: 16,
    color: TERTIARY_TEXT,
  },
  Input2: {
    elevation: 0,
    height: 'auto',
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E3FE',
    width: '90%',
    color: PRIMARY_TEXT,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
