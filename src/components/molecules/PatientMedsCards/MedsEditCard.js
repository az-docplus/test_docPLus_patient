/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DmzText from '../../atoms/DmzText/DmzText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularButton from '../../atoms/CircularButton/CircularButton';
import {
  PRIMARY_TEXT,
  TERTIARY_TEXT,
  HEADER_TEXT,
  PRIMARY_COLOR,
} from '../../../styles/colors';
import AnimInput from '../AnimInput/AnimInput';
import { Colors } from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';

export default function MedsEditCard({style, data, onPress}) {
  return (
    <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
      <View style={[styles.Card, style ? style.Card : null]}>
        <DmzText text="Add Pills" style={{fontSize: 18, color: PRIMARY_TEXT}} />

        <AnimInput
          placeholder={`${Local("doctor.medical_history.name_of_the_pill")}`}
          style={{
            Container: styles.Container,
            Input: styles.Input,
            Placeholder: styles.Placeholder,
          }}
        />
        <AnimInput
          placeholder={`${Local("doctor.medical_history.amount_to_be_taken")}`}
          style={{
            Container: styles.Container,
            Input: styles.Input,
            Placeholder: styles.Placeholder,
          }}
        />
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <AnimInput
          placeholder={`${Local("doctor.medical_history.course_duration")}`}
          style={{
              Container: styles.Container,
              Input: styles.Input,
              Placeholder: styles.Placeholder,
            }}
          />
          <MaterialCommunityIcons
            name="calendar"
            size={23}
            color="#A7A7A7"
            style={{marginLeft: -20, marginBottom: 15}}
          />
        </View>
      </View>
      <View style={{alignSelf: 'center', marginTop: -35, elevation: 5}}>
        <CircularButton />
        <TouchableOpacity
          style={{alignSelf: 'center', height: 50, justifyContent: 'center'}}
          onPress={onPress}>
          <Text style={{color: HEADER_TEXT, fontWeight: 'bold', fontSize: 16}}>
          {Local("doctor.medical_history.cancel")}
          </Text>
        </TouchableOpacity>
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
    height: 40,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E3FE',
    width: '90%',
    color: PRIMARY_TEXT,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
