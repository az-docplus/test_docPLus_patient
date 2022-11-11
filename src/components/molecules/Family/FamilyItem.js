import React, {useState} from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import { useSelector, useDispatch } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../../../styles/colorsV2';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Popconfirm from '../Modal/PopConfirm';

const FamilyItem = ({ data, handleEdit, handleDelete }) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);

  const [askConfirmation, setaskConfirmation] = useState(false);

  String.prototype.toTitleCase = function () {
    const splited = this.split(' ')
      .map((item) => {
        if (item[0]) return `${item[0].toUpperCase()}${item.slice(1)}`;
      })
      .join(' ');
    return splited;
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingHorizontal: '6%',
        borderRadius: 13,
        marginVertical: '3%',
        elevation: 2,
        flexDirection: 'row',
        paddingVertical: '5%',
        backgroundColor: Colors.secondary_background[theme]
      }}>
        <Popconfirm
        text="Are you sure you want to delete this member?"
        onUpdate={() => {
          handleDelete(data._id)
          setaskConfirmation(false);
        }}
        onCancel={() => {
          setaskConfirmation(false);
        }}
        visible={askConfirmation}></Popconfirm>
      {/* <View style={{ justifyContent: 'center' }}>
        <Image
          source={require('../../../assets/jpg/person2.jpg')}
          style={{ height: 40, width: 40, borderRadius: 40, marginRight: 15 }}
        />
      </View> */}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 17,
              paddingVertical: 2,
              marginRight: '5%',
              color: Colors.primary_text_color[theme]
            }}>
            {data?.firstName.toTitleCase() + ' ' + data?.lastName.toTitleCase()}
          </Text>
        </View>
  
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: 13,
            paddingVertical: 2,
            color: NEW_PRIMARY_BACKGROUND,
          }}>
          {data.relationship}
        </Text>
  
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          {data?.problems?.map((problem, i) => (
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 11,
                paddingRight: 5,
                paddingLeft: i === 0 ? 0 : 5,
                borderColor: 'black',
                color: Colors.input_placeholder_color[theme],
                borderLeftWidth: i === 0 ? 0 : 1,
              }}>
              {problem}
            </Text>
          ))}
        </View>
      </View>
  
      <View style={{flexDirection: "column"}}>
      <View style={{ justifyContent: 'center', flexDirection: "row" }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: 11,
            paddingVertical: 2,
            marginRight: 2,
            color: Colors.primary_text_color[theme]
          }}>
          {`(${new Date().getFullYear() - new Date(data.birthdate).getFullYear()
            } yrs)`}
        </Text>
  
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: 11,
            paddingVertical: 2,
            color: Colors.primary_text_color[theme]
          }}>
          {data.gender}
        </Text>
            </View>
        <View style={{ flexDirection: 'row' }}>

              <TouchableOpacity onPress={() => {
                // handleDelete(data._id)
                setaskConfirmation(true)
              }}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  style={{ fontSize: 22, color: NEW_PRIMARY_COLOR, marginHorizontal: 4 }}>
                </MaterialCommunityIcons>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleEdit(data)}>
                <MaterialIcons
                  name="edit"
                  style={{ fontSize: 22, color: NEW_PRIMARY_COLOR, marginHorizontal: 4 }}>
                </MaterialIcons>
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={handleMoreDetails}>
                <Ionicons
                  name={more ? "chevron-down-outline" : "chevron-forward"}
                  style={{ fontSize: 24, color: NEW_PRIMARY_COLOR, marginHorizontal: 4 }}>
                </Ionicons>
              </TouchableOpacity> */}

            </View>
      </View>
        {/* <TouchableOpacity>
          <Image
            source={require('../../../assets/icons/back.png')}
            style={{
              height: 17,
              width: 17,
              transform: [{rotateZ: '180deg'}],
            }}
            resizeMode="contain"
          />
        </TouchableOpacity> */}
    </View>
  );
}

export default FamilyItem;
