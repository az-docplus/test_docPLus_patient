/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Picker} from '@react-native-community/picker';
import DmzText from '../../atoms/DmzText/DmzText';
import CircularButton from '../../atoms/CircularButton/CircularButton';
import {
  PRIMARY_TEXT,
  TERTIARY_TEXT,
  PRIMARY_COLOR,
} from '../../../styles/colors';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import AnimInput from '../AnimInput/AnimInput';
import {useDispatch, useSelector} from 'react-redux';
import {UpdateVitals} from '../../../redux/action/patientAccountAction';
import {Local, setLocale} from '../../../i18n';

export default function WeightEditCard({style, details}) {
  const [heightType, setHeightType] = useState('cm');
  const [heightCm, setHeightCm] = useState(details.height);
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [date, setDate] = useState(details.date);
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.AuthReducer);
  const {patientVitals} = useSelector((state) => state.PatientAccountReducer);

  const saveHeight = async () => {
    var val = heightCm;
    if (heightType == 'ft') {
      val =
        parseInt(heightFeet, 10) * 30.48 + parseInt(heightInches, 10) * 2.54;
      console.log(val);
      setHeightCm(val);
    } else {
      cmToFeet(val);
    }
    const response = {
      field: 'height',
      data: {
        value: val,
        date: date,
      },
    };
    await dispatch(
      UpdateVitals(response, patientVitals.userId, patientVitals._id),
    );
  };

  useEffect(() => {
    cmToFeet(heightCm);
  }, []);

  const cmToFeet = (val) => {
    var realFeet = (parseInt(val, 10) * 0.3937) / 12;
    var feet = Math.floor(realFeet);
    var inches = ((realFeet - feet) * 12).toPrecision(3);
    console.log(val, 'qwerty4');
    setHeightInches(inches.toString());
    setHeightFeet(feet.toString());
    console.log(inches, feet, 'done');
  };

  return (
    <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
      <View style={[styles.Card, style ? style.Card : null]}>
        <DmzText
              text={`${Local("doctor.medical_history.add_your_height")}`}
              style={{fontSize: 18, color: PRIMARY_TEXT}}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 0,
            alignItems: 'flex-end',
            alignContent: 'flex-end',
          }}>
          {heightType == 'cm' ? (
            <AnimInput
              inputHandler={(txt) => setHeightCm(txt)}
              value={heightCm}
              placeholder={`${Local("doctor.medical_history.height")}`}
              style={{
                Container: {...styles.Container, width: '60%'},
                Input: styles.Input,
                Placeholder: styles.Placeholder,
              }}
            />
          ) : (
            <View
              style={{
                width: '60%',
                justifyContent: 'flex-end',
              }}>
              <Text style={styles.Input}>Height</Text>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignContent: 'flex-end',
                }}>
                <TextInput
                  value={heightFeet}
                  onChangeText={(txt) => {
                    setHeightFeet(txt);
                  }}
                  style={[styles.Input, {marginTop: 0}]}
                />
                <Text
                  style={{
                    textAlignVertical: 'center',
                  }}>
                  :
                </Text>
                <TextInput
                  value={heightInches}
                  onChangeText={(txt) => {
                    setHeightInches(txt);
                  }}
                  style={[styles.Input, {marginTop: 0}]}
                />
              </View>
            </View>
          )}
          <DmzText
            text={heightType}
            style={{
              ...styles.Input,
              width: 'auto',
              lineHeight: 20,
              textTransform: 'none',
              paddingBottom: 12,
              alignSelf: 'flex-end',
            }}
          />
          <Picker
            style={{width: 50, marginLeft: 20}}
            selectedValue={heightType}
            onValueChange={(val) => {
              setHeightType(val);
            }}>
            <Picker.Item value="cm" label="cm" />
            <Picker.Item value="ft" label="ft" />
          </Picker>
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
        <CircularButton onPress={saveHeight} />
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
