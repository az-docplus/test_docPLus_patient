import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Pressable,
} from 'react-native';
import PencilPng from '../../../../assets/png/pencil.png';
import MaterialEvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialFontawesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MMaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { FlatList } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import { ScrollView } from 'react-native';
const EvilIcons = ({ name, size, color }) => (
  <MaterialEvilIcons size={size} color={color} name={name} />
);
const MaterialFontawesomeIcons = ({ name, size, color }) => (
  <MaterialFontawesome size={size} color={color} name={name} />
);
const MaterialCommunityIconsIcons = ({ name, size, color }) => (
  <MaterialCommunityIcons size={size} color={color} name={name} />
);
const MMaterialIconsIconsIcons = ({ name, size, color }) => (
  <MMaterialIconsIcons size={size} color={color} name={name} />
);
const AntDesignIconsIcons = ({ name, size, color }) => (
  <AntDesignIcons size={size} color={color} name={name} />
);

export default function Availablity({ editHandler, doctorProfile }) {
  return (
    <View style={{ backgroundColor: '#fff' }}>
      <View style={{ height: 1, backgroundColor: '#EEEEEE' }}></View>
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
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
              marginRight: 5,
            }}>
            Availability
          </Text>
          {/* <MMaterialIconsIconsIcons name="info" color="#51B7B7" size={20} /> */}
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', marginHorizontal: 12 }}>
          {doctorProfile.appointmentsString &&
            JSON.parse(doctorProfile?.appointmentsString)?.weekdaysArr.map(
              (val) => {
                return (
                  <View
                    style={{
                      borderWidth: 0.2,
                      paddingVertical: 12,
                      paddingHorizontal: 20,
                      borderRadius: 10,
                      marginLeft: 12,
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      {val.days.map((i) => (
                        <Text
                          style={{
                            fontFamily: 'Gilroy-SemiBold',
                            textTransform: 'capitalize',
                            marginLeft: 2,
                          }}>
                          {i.substr(0, 3)},
                        </Text>
                      ))}
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 8,
                      }}>
                      <Text
                        style={{ fontFamily: 'Gilroy-Regular', fontSize: 14 }}>
                        {val.startTime}
                      </Text>
                      <Text>-</Text>
                      <Text
                        style={{ fontFamily: 'Gilroy-Regular', fontSize: 14 }}>
                        {val.endTime}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 5,
                      }}>
                      <Text style={{ fontFamily: 'Montserrat-Regular' }}>
                        {val.lunchStart}
                      </Text>
                      <Text>-</Text>
                      <Text style={{ fontFamily: 'Montserrat-Regular' }}>
                        {val.lunchEnd}
                      </Text>
                    </View>
                  </View>
                );
              },
            )}
        </View>
      </ScrollView>
    </View>
  );
}
