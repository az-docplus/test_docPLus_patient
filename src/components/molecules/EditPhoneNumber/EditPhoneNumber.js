/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {View, Text, BackHandler} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import DmzText from '../../atoms/DmzText/DmzText';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import {PRIMARY_COLOR} from '../../../styles/colors';

export default function EditPhoneNumber({navigation}) {
  const [phone, setPhone] = useState(navigation.getParam('phone', ''));
  console.log(navigation.getParam('phone'));
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
            navigation.navigate('ProfileScreen');
          }}>
          <FontAwesome size={30} color={PRIMARY_COLOR} name="angle-left" />
        </TouchableOpacity>
        <Text style={{fontSize: 21, marginLeft: 25, fontWeight: 'bold'}}>
          {phone == '' ? 'Add Phone Number' : 'Update Phone Number'}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: '20%',
          alignItems: 'center',
        }}>
        <DmzText text="+91" style={{fontSize: 20, fontFamily: 'comic-sans'}} />
        <TextInput
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
          }}
          style={{
            width: 'auto',
            marginTop: 0,
            fontWeight: '300',
            fontSize: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            marginLeft: 20,
            letterSpacing: 1,
          }}
          keyboardType={'number-pad'}
          maxLength={10}
        />
      </View>
      <DmzButton
        disabled={phone == '' ? true : false}
        onPress={() => {
          navigation.navigate(
            'PhoneNumberOtp',
            // 'Profile',
            {phone: phone},
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
