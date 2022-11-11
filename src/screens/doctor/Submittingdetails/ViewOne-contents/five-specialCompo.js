import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MMaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';
import { UpdateDoctorProfile } from '../../../../reduxV2/action/DoctorAction';
import { useDispatch } from 'react-redux';

const MaterialCommunityIconsIcons = ({ name, size, color }) => (
  <MaterialCommunityIcons size={size} color={color} name={name} />
);
const MMaterialIconsIconsIcons = ({ name, size, color }) => (
  <MMaterialIconsIcons size={size} color={color} name={name} />
);

export default function Special({ editHandler, doctorProfile }) {
  // const SpecialistList = ["Opthamologist", "Pulmonologist", "Oncologist", "Oral Surgeon"]
  const [specialty, setSpecialty] = useState(null);
  const dispatch = useDispatch();
  const RemovefromArray = (specialty) => {
    const dataToUpdate = {
      id: doctorProfile?._id,
      specialties: doctorProfile['specialties'].filter((e) => e != specialty),
    };
    console.log({ dataToUpdate });
    dispatch(
      UpdateDoctorProfile(
        dataToUpdate,
        () => {
          console.log('doctor profile updated .');
        },
        (e) => {
          console.log('error in saving :::::>>> ', e);
        },
      ),
    );
  };

  return (
    <View
      style={{
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: 'white',
        elevation: 15,
        marginVertical: 20,
        paddingTop: 15,
      }}>
      <View style={{ paddingHorizontal: 30 }}>
        <Text
          style={{
            fontFamily: 'Gilroy-SemiBold',
            fontSize: 20,
          }}>
          Area of Expertise
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
            Speciality
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
        style={{
          marginVertical: 10,
          marginLeft: 16,
          marginBottom: 20,
          flexDirection: 'row',
          overflow: 'scroll',
        }}>
        <FlatList
          data={doctorProfile['specialties']}
          keyExtractor={(e) => (e ? e.toString() : Math.random() * 10000)}
          horizontal
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                backgroundColor: '#FDE8F0',
                alignItems: 'center',
                marginLeft: 8,
                borderRadius: 12,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <TouchableOpacity onPress={() => setSpecialty(item)} style={{}}>
                <Text
                  style={{
                    fontFamily: 'Gilroy-SemiBold',
                    fontSize: 14,
                    marginRight: 6,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
              {specialty == item && (
                <TouchableOpacity
                  onPress={() => {
                    RemovefromArray(item);
                  }}
                  style={{}}>
                  <MaterialCommunityIconsIcons
                    name="close"
                    color="#000"
                    size={30}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>
      {/* <View style={{ marginVertical: 10, marginLeft: 16, marginBottom: 20, flexDirection: "row" }}>
        {doctorProfile['specialties'].map((item, index) => item && (
          <View key={index} style={{
            flexDirection: 'row',
            backgroundColor: "#FDE8F0",
            alignItems: "center",
            marginLeft: 8,
            borderRadius: 12,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
            <TouchableOpacity onPress={() => setSpecialty(item)} style={{}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 16,
                  marginRight: 6
                }}>
                {item}
              </Text>
            </TouchableOpacity>
            {specialty == item && (
              <TouchableOpacity
                onPress={() => {
                  console.log('item : ', item);
                }}
                style={{

                }}>
                <MaterialCommunityIconsIcons
                  name="close"
                  color="#000"
                  size={30}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View> */}
    </View>
  );
}
