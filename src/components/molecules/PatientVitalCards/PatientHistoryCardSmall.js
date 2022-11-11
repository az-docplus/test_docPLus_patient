/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import DmzText from '../../atoms/DmzText/DmzText';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Notepad from '../../../assets/svg/notepad.svg';
import Height from '../../../assets/svg/height.svg';
import Temp from '../../../assets/svg/temprature.svg';
import Microscope from '../../../assets/svg/microscope.svg';
import {PRIMARY_TEXT, TERTIARY_TEXT} from '../../../styles/colors';
import {useSelector} from 'react-redux';

export default function PatientHistoryCardSmall({
  style,
  headerOne,
  infoOne,
  headerTwo,
  infoTwo,
  infoThree,
  onPress,
}) {
  const {isLogedin} = useSelector((state) => state.AuthReducer);

  const getIcon = () => {
    if (headerOne == 'Weight') {
      return <Notepad style={{marginRight: 15, marginTop: 10}} />;
    } else if (headerOne == 'Height') {
      return <Height style={{marginRight: 15, marginTop: 10}} />;
    } else if (headerOne == 'Temprature') {
      return <Temp style={{marginRight: 15, marginTop: 10}} />;
    } else if (headerOne == 'Glucose') {
      return <Microscope style={{marginRight: 15, marginTop: 10}} />;
    }
  };
  return (
    <View style={[styles.Card, style ? style.Card : null]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <DmzText
          style={[styles.HeaderOne, style ? style.HeaderOne : null]}
          text={headerOne}
        />
        {/* {getIcon()} */}
      </View>
      <View style={styles.Container}>
        <DmzText
          style={[styles.InfoOne, style ? style.InfoOne : null]}
          text={infoOne}
        />
        <DmzText
          style={[styles.InfoTwo, style ? style.InfoTwo : null]}
          text={infoTwo}
        />
      </View>
      <DmzText
        style={[styles.HeaderTwo, style ? style.HeaderTwo : null]}
        text={headerTwo}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <DmzText
          style={[styles.InfoThree, style ? style.InfoThree : null]}
          text={infoThree}
        />
        <TouchableOpacity
          onPress={onPress}
          style={{marginRight: 10}}
          disabled={!isLogedin}>
          <Entypo name="chevron-right" size={22} color="#E7E3FE" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Card: {
    elevation: 4,
    borderRadius: 30,
    height: 'auto',
    width: '40%',
    paddingHorizontal: 4,
    paddingBottom: 10,
  },
  Container: {
    flexDirection: 'row',
    borderBottomColor: '#E7E3FE',
    borderBottomWidth: 1,
    width: '100%',
    paddingBottom: 10,
  },
  HeaderOne: {
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
  InfoTwo: {
    color: PRIMARY_TEXT,
    fontSize: 13,
    marginLeft: '25%',
    fontWeight: 'normal',
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
