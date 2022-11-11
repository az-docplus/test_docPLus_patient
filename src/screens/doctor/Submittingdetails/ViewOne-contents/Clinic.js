import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MMaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

const MaterialCommunityIconsIcons = ({ name, size, color }) => (
  <MaterialCommunityIcons size={size} color={color} name={name} />
);
const MMaterialIconsIconsIcons = ({ name, size, color }) => (
  <MMaterialIconsIcons size={size} color={color} name={name} />
);

export default function Clinics({ editHandler, doctorProfile }) {
  const { gettingClincs, Clinics } = useSelector(
    (state) => state.DoctorReducer,
  );

  return (
    <View>
      <View style={{ paddingHorizontal: 30 }}></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 20,
          marginHorizontal: 35,
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 17,
              marginRight: 5,
            }}>
            Clinic
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={editHandler}
            style={{
              backgroundColor: '#E0F4F4',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 2,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 24,
                color: '#297281',
              }}>
              +
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 12,
                color: '#297281',
                marginLeft: 7,
              }}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginVertical: 15, marginLeft: 16 }}>
        <FlatList
          data={Clinics}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          key={(e) => e.toString()}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  padding: 10,
                  borderRadius: 10,
                  marginLeft: 15,
                  backgroundColor: '#fff',
                  marginHorizontal: 10,
                  marginVertical: 5,
                  marginBottom: 25,
                  elevation: 6,
                }}>
                {/* <Image style={{ width: 300, height: 180, borderTopLeftRadius: 14, borderTopRightRadius: 14 }} source={{ uri: item.img }} /> */}
                <Text
                  style={{
                    fontFamily: 'Gilroy-Medium',
                    fontSize: 16,
                    paddingTop: 5,
                    paddingLeft: 16,
                    textTransform: 'capitalize',
                  }}>
                  {item.ClinicName}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
                    paddingBottom: 25,
                    paddingLeft: 10,
                    paddingTop: 10,
                  }}>
                  <MMaterialIconsIconsIcons
                    name="location-pin"
                    size={18}
                    color="#EA1A65"
                  />
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Medium',
                      fontSize: 12,
                      textTransform: 'capitalize',
                    }}>
                    {item.Locality}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
