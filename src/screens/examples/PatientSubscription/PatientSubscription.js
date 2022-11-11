import React, {Component} from 'react';
import {View, Text} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';

export default function PatientSubscription({navigation}) {
  return (
    <View>
      <TopNavBar
        navigation={navigation}
        headerText="Subsriptions"
        style={{
          Header: {
            color: '#000',
            fontSize: 23,
            alignSelf: 'center',
            // width: '0%',
          },
        }}
      />
    </View>
  );
}
