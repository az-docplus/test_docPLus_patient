/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {View, Text, BackHandler} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import DmzText from '../../atoms/DmzText/DmzText';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import {PRIMARY_COLOR} from '../../../styles/colors';

export default function EditEmailId({navigation}) {
  const [email, setEmail] = useState(navigation.getParam('email', ''));
  console.log(navigation.getParam('email'));
  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.navigate('ProfileScreen');
    BackHandler.removeEventListener('hardwareBackPress', () => {});
    return true;
  });

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          //   flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 15,
          paddingBottom: 5,
          marginHorizontal: 20,
          marginBottom: 50,
        }}>
        <TouchableOpacity
          style={{
            width: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'stretch',
          }}
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <FontAwesome size={30} color={PRIMARY_COLOR} name="angle-left" />
        </TouchableOpacity>
        <Text style={{fontSize: 21, marginLeft: 25, fontWeight: 'bold'}}>
          {email == '' ? 'Add Email ID' : 'Update Email ID'}
        </Text>
      </View>
      <DmzText
        lite
        style={{
          fontSize: 16,
          alignSelf: 'center',
          marginHorizontal: 60,
          textAlign: 'center',
        }}
        text="Confirm and Enter OTP to update Email ID"
      />
      <TextInput
        value={email}
        autoCapitalize="none"
        onChangeText={(text) => {
          setEmail(text);
        }}
        style={{
          width: '60%',
          marginTop: 20,
          fontWeight: '300',
          fontSize: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          marginLeft: 20,
          letterSpacing: 1,
          alignSelf: 'center',
          textAlign: 'center',
        }}
      />
      <DmzButton
        disabled={email == '' ? true : false}
        onPress={() => {
          navigation.navigate(
            'EmailIdOtp',
            // 'Profile',
            {email: email},
            // navigation.navigate('PhoneNumberOtp'),
          );
        }}
        text="SEND OTP"
        style={{
          Container: {
            marginTop: 50,
            alignSelf: 'center',
            width: '70%',
            borderRadius: 18,
            elevation: 0,
            backgroundColor: PRIMARY_COLOR,
          },
          Text: {
            fontSize: 20,
            color: '#fff',
            fontWeight: 'normal',
          },
        }}
      />
    </View>
  );
}
