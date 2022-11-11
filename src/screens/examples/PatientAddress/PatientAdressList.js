/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import {PRIMARY_COLOR, HEADER_TEXT} from '../../../styles/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PatientAdressScreen({navigation}) {
  const [addresses, setAddress] = useState([
    {
      address:
        'Sector 134, Noida, Uttar Pradesh. 310 m from Fast Food Corner pin-201304 (India)',
      details: 'B5',
      type: 'Other',
    },
  ]);
  const addAddress = (val) => {
    var list = addresses;
    list.push(val);
    setAddress(list);
  };
  return (
    <View>
      <View
        style={{
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
          <FontAwesome size={40} color={PRIMARY_COLOR} name="angle-left" />
        </TouchableOpacity>
        <Text style={{fontSize: 21, marginLeft: 35, fontWeight: 'bold'}}>
          Address
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddAdressScreen');
        }}
        style={{
          width: '80%',
          alignSelf: 'center',
          borderBottomColor: '#00000080',
          borderBottomWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 10,
        }}>
        <Octicons color={PRIMARY_COLOR} size={20} name="location" />
        <DmzText
          type={3}
          text="Add an address"
          style={{marginHorizontal: 10, fontSize: 18}}
        />
      </TouchableOpacity>
      <DmzText
        style={{
          marginLeft: 40,
          marginTop: 30,
          marginBottom: 50,
          fontSize: 20,
          color: HEADER_TEXT,
        }}
        text="Saved Addresses"
      />
      <FlatList
        data={addresses}
        renderItem={({item, index}) => {
          console.log(item);
          return (
            <View
              style={{width: '80%', alignSelf: 'center', flexDirection: 'row'}}>
              <View style={{width: '80%'}}>
                <DmzText text={item.type} style={{fontSize: 16}} />
                <DmzText
                  text={item.address}
                  lite
                  style={{
                    fontSize: 14,
                    lineHeight: 19,
                    marginTop: 10,
                    color: '#00000099',
                  }}
                />
              </View>
              <MaterialCommunityIcons
                name="delete-outline"
                color={HEADER_TEXT}
                size={30}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
