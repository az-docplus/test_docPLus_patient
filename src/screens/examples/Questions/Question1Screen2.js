/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {View, Text, Image, StyleSheet, TextInput} from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import Puzzel from '../../../assets/svg/puzzel.svg';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import ButtonChildren from '../../../components/atoms/ButtonChildren/ButtonChildren';
import NextBtn from '../../../assets/svg/next_btn.svg';
import StepsTracker from '../../../components/atoms/StepsTracker/StepsTracker';

export default function Question1Screen2(props) {
  const [selectedIndex, setIndex] = useState(2);

  const pressbtn = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <View style={{flex: 1}}>
      <RadialGradient
        style={{width: '100%', height: 'auto', zIndex: 0, flex: 1}}
        colors={['#DEF1F9', '#C0E0EC', '#95CCE0']}
        stops={[0.0, 0.2, 0.75]}
        center={[130, 100]}
        radius={200}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <DmzButton
            style={{
              Text: {
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 16,
                color: 'rgba(255, 255, 255, 0.79)',
              },
              Container: {
                width: 88,
                height: 42,
                backgroundColor: 'rgba(2, 126, 151, 0.21)',
                elevation: 0,
                borderRadius: 0,
                borderBottomRightRadius: 15,
                borderTopRightRadius: 15,
              },
            }}
            text={'SKIP'}
          />
          <Puzzel style={{marginLeft: 50}} />
        </View>
        <Text style={styles.QuesStyle}>
          How are you related to the patient?
        </Text>
        <TextInput placeholder="Type here" value="" style={styles.InputStyle} />
        <Text style={styles.QuesStyle}>
          Where can this provider call you for follow-up, If needed?
        </Text>
        <TextInput
          placeholder="Contact Number"
          value=""
          style={styles.InputStyle}
        />
        <Text style={styles.QuesStyle}>
          Invite guest(s) to join your visit?
        </Text>
        <TextInput placeholder="Optional" value="" style={styles.InputStyle} />

        <ButtonChildren
          onPress={props.onPress}
          style={{Container: [styles.nextBtn]}}>
          <NextBtn />
        </ButtonChildren>

        <StepsTracker
          text="Questions 1/5"
          textStyle={{
            fontSize: 16,
            color: '#FFFFFF',
          }}
          completed={20}
          completedColor={'#027E97'}
          incompletedColor={'#D5E9F4'}
        />
      </RadialGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  QuesStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    width: '100%',
    paddingHorizontal: '15%',
    color: '#027E97',
    textAlign: 'left',
    marginTop: 20,
  },
  InputStyle: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: '70%',
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  nextBtn: {
    width: 45,
    height: 42,
    backgroundColor: '#027E97',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
    marginLeft: 'auto',
    marginRight: '10%',
  },
});
