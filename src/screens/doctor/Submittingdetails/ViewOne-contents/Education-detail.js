import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MMaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';

const MaterialCommunityIconsIcons = ({ name, size, color }) => (
  <MaterialCommunityIcons size={size} color={color} name={name} />
);
const MMaterialIconsIconsIcons = ({ name, size, color }) => (
  <MMaterialIconsIcons size={size} color={color} name={name} />
);

export default function EducationDetail({
  editCredentials,
  doctorProfile,
  setEditQualification,
  goToEdit,
}) {
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
          Education Details
        </Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 35,
            justifyContent: 'space-between',
            paddingTop: 20,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 16,
                marginRight: 5,
              }}>
              Qualification
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setEditQualification({
                  isEdit: false,
                  title: '',
                  university: '',
                  year: '',
                });
                goToEdit();
              }}
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
            data={doctorProfile.education}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            key={(e) => e.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setEditQualification({
                      index,
                      isEdit: true,
                      title: item.degree,
                      university: item.university,
                      year: item.year,
                    });
                    goToEdit();
                  }}
                  style={{
                    elevation: 8,
                    // width: '70%',
                    marginLeft: 10,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    marginBottom: 15,
                    paddingVertical: 30,
                    paddingHorizontal: 30,
                    // paddingVertical: 15,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}>
                  <Text style={{ fontFamily: 'Gilroy-SemiBold', fontSize: 16 }}>
                    {item.degree}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Medium',
                      fontSize: 14,
                      color: '#7B7A79',
                    }}>
                    {item.university}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Regular',
                      fontSize: 12,
                      color: '#077EE9',
                    }}>
                    {item.year}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
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
              Credentials
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                editCredentials({
                  isEdit: false,
                  title: '',
                  year: '',
                });
              }}
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
            data={doctorProfile.awards}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            key={(e) => e.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    editCredentials({
                      isEdit: true,
                      index,
                      title: item.title,
                      year: item.year,
                    });
                  }}
                  style={{
                    elevation: 8,
                    // width: '70%',
                    marginLeft: 10,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    marginBottom: 15,
                    paddingVertical: 30,
                    paddingHorizontal: 30,
                    // paddingVertical: 15,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 16,
                      color: '#077EE9',
                    }}>
                    {item.year}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}
