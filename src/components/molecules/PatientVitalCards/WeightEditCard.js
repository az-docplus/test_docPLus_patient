/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Card from '../../atoms/Card/Card';
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
import {UpdateVitals} from '../../../redux/action/patientAccountAction';
import {useDispatch, useSelector} from 'react-redux';
import {Local, setLocale} from '../../../i18n';

export default function WeightEditCard({style, details}) {
  const [weight, setWeight] = useState(details.infoOne);
  const [date, setDate] = useState(details.headerTwo);
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.AuthReducer);
  const {patientVitals} = useSelector((state) => state.PatientAccountReducer);

  const saveWeight = async () => {
    const response = {
      field: 'weight',
      data: {
        value: weight,
        date: date,
      },
    };
    await dispatch(
      UpdateVitals(response, patientVitals.userId, patientVitals._id),
    );
  };
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
      }}>
      <View style={[styles.Card, style ? style.Card : null]}>
        <DmzText
          text="Add your Weight"
          style={{fontSize: 18, color: PRIMARY_TEXT}}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <AnimInput
            inputHandler={(txt) => setWeight(txt)}
            value={weight}
            placeholder={`${Local("doctor.medical_history.weight")}`}
            style={{
              Container: {...styles.Container, width: '40%'},
              Input: styles.Input,
              Placeholder: styles.Placeholder,
            }}
          />
          <AnimInput
              placeholder={`${Local("doctor.medical_history.fat_mass")}`}
              style={{
              Container: {...styles.Container, width: '40%'},
              Input: styles.Input,
              Placeholder: styles.Placeholder,
            }}
          />
        </View>
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
        <CircularButton
          onPress={() => {
            saveWeight();
          }}
        />
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
