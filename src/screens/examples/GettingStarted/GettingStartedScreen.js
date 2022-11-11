import React, {Component} from 'react';
import {View, Text} from 'react-native';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import DocMzTitle from '../../../assets/svg/docMztitle.svg';
import IntroImage from '../../../assets/svg/introImage.svg';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';

export default function GettingStartedScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <DocMzTitle />
      <DmzText
        style={{fontSize: 18, fontWeight: 'bold', color: '#6859A2'}}
        text="We Take Care of"
      />
      <DmzText
        style={{fontSize: 18, fontWeight: 'bold', color: '#6859A2'}}
        text="Your Health"
      />
      <IntroImage />
      <DmzText
        style={{fontSize: 16, fontWeight: 'normal', color: '#9C77BC'}}
        text="Choose from the best doctors around you!"
      />
      <View style={{alignSelf: 'flex-end', marginTop: 50}}>
        <DmzButton
          style={{
            Text: {
              width: '100%',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'normal',
              color: 'rgba(255, 255, 255, 0.79)',
            },
            Container: {
              width: 150,
              height: 42,
              backgroundColor: '#9C77BC',
              elevation: 0,
              borderRadius: 0,
              borderBottomLeftRadius: 15,
              borderTopLeftRadius: 15,
            },
          }}
          text={'Get Started'}
        />
      </View>
    </View>
  );
}
