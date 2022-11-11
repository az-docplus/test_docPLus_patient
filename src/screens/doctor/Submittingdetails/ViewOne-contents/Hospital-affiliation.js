import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MMaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { GetHospitalsOfDoctor } from '../../../../reduxV2/action/DoctorAction';

const MaterialCommunityIconsIcons = ({ name, size, color }) => (
  <MaterialCommunityIcons size={size} color={color} name={name} />
);
const MMaterialIconsIconsIcons = ({ name, size, color }) => (
  <MMaterialIconsIcons size={size} color={color} name={name} />
);

export default function Hospital({
  editHandler,
  doctorProfile,
  updateComponent,
}) {
  const { userData } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [AffiliatedHospitals, setAffiliatedHospitals] = useState([]);

  const GetDoctorHospitals = (
    payload = {
      doctor: userData._id,
    },
  ) => {
    dispatch(
      GetHospitalsOfDoctor(payload, (err, response) => {
        console.log({ response });
        if (!err) setAffiliatedHospitals(response);
        // else console.log(response);
      }),
    );
  };

  useEffect(() => {
    console.log('Updating____________--');
    GetDoctorHospitals();
  }, [updateComponent]);

  return (
    <View>
      <View style={{ paddingHorizontal: 30 }}>
        <Text
          style={{
            fontFamily: 'Gilroy-SemiBold',
            fontSize: 20,
          }}>
          Practice Details
        </Text>
      </View>
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
            Hospital Affiliations
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
      <View
        style={{ marginVertical: 15, marginLeft: 16, marginHorizontal: 10 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {AffiliatedHospitals.map((item, index) => (
            <View
              key={index}
              style={{
                position: 'relative',
                elevation: 6,
                width: 160,
                marginLeft: 10,
                backgroundColor: '#fff',
                borderRadius: 7,
                marginBottom: 15,
                paddingHorizontal: 25,
                paddingVertical: 15,
                marginHorizontal: 5,
                marginVertical: 5,
              }}>
              <Text style={{ fontFamily: 'Gilroy-Medium', fontSize: 16 }}>
                {item.Name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 12,
                  marginTop: 8,
                }}>
                {item.Address}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
