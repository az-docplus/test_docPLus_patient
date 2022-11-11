/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import DmzText from '../../atoms/DmzText/DmzText';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  PRIMARY_TEXT,
  TERTIARY_TEXT,
  PRIMARY_COLOR,
} from '../../../styles/colors';

export default function PatientSurgeryDetails({
  style,
  title,
  status,
  doctorName,
  date,
  otName,
  onPress,
}) {
  return (
    <View style={[styles.Card, style ? style.Card : null]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <DmzText
          style={[styles.title, style ? style.title : null]}
          text={title}
        />
        <DmzText
          style={[styles.status, style ? style.status : null]}
          text={status}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <DmzText
          style={[styles.doctor, style ? style.doctor : null]}
          text={`Dr. ${doctorName}`}
        />
        <TouchableOpacity onPress={onPress} style={{marginRight: 10}}>
          <Entypo name="chevron-right" size={22} color={TERTIARY_TEXT} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Card: {
    height: 140,
    elevation: 0,
    width: '80%',
    paddingHorizontal: 4,
  },
  Container: {
    flexDirection: 'row',
    borderBottomColor: '#E7E3FE',
    borderBottomWidth: 1,
    width: '100%',
    paddingBottom: 10,
  },
  status: {
    color: TERTIARY_TEXT,
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 8,
    fontWeight: '500',
  },
  title: {
    color: TERTIARY_TEXT,
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 8,
    fontWeight: '500',
  },
  HeaderTwo: {
    color: TERTIARY_TEXT,
    fontSize: 13,
    paddingLeft: 10,
    lineHeight: 16,
    marginTop: 10,
  },
  InfoOne: {
    color: PRIMARY_TEXT,
    fontSize: 24.5,
    paddingLeft: 10,
    width: 'auto',
  },
  doctor: {
    color: PRIMARY_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  InfoThree: {
    color: PRIMARY_TEXT,
    fontSize: 13,
    paddingLeft: 10,
    lineHeight: 16,
    marginTop: 5,
    fontWeight: 'normal',
    textTransform: 'none',
  },
});
