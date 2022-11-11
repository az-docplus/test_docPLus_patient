/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import DmzText from '../../atoms/DmzText/DmzText';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Tablet from '../../../assets/svg/tablet.svg';
import {TERTIARY_TEXT, PRIMARY_COLOR} from '../../../styles/colors';

export default function PatientMedsDetails({
  style,
  medName,
  reason,
  times,
  weeks,
  alarm,
  onPress,
}) {
  return (
    <View style={[styles.Card, style ? style.Card : null]}>
      <Tablet style={{width: '30%'}} />
      <View style={{width: '70%', paddingLeft: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <DmzText
            style={[styles.medName, style ? style.medName : null]}
            text={medName}
          />
          {alarm ? (
            <Icon name="alarm" size={22} color={TERTIARY_TEXT} />
          ) : (
            <Icon name="alarm-off" size={22} color={TERTIARY_TEXT} />
          )}
        </View>
        <DmzText
          style={[styles.reason, style ? style.reason : null]}
          text={reason}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <DmzText
            style={[styles.period, style ? style.period : null]}
            text={`${times}/day,${weeks}w`}
          />
          <TouchableOpacity onPress={onPress} style={{marginRight: 10}}>
            <Entypo name="chevron-right" size={22} color={TERTIARY_TEXT} />
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    marginBottom: 40,
  },
  Container: {
    flexDirection: 'row',
    borderBottomColor: '#E7E3FE',
    borderBottomWidth: 1,
    width: '100%',
    paddingBottom: 10,
  },
  reason: {
    color: TERTIARY_TEXT,
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 8,
    fontWeight: '500',
  },
  medName: {
    color: PRIMARY_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  period: {
    color: TERTIARY_TEXT,
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 8,
    fontWeight: '500',
  },
});
