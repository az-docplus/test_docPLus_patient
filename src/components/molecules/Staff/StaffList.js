import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  GREY_BACKGROUND,
  NEW_PRIMARY_COLOR,
  INPUT_PLACEHOLDER,
} from '../../../styles/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MedsItem = ({ data, handleEdit }) => {
  const { access_type, email, name, _id } = data;

  return (
    <View
      key={_id}
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 20,
        borderRadius: 13,
        marginVertical: 10,
        elevation: 2,
        flexDirection: 'row',
        paddingVertical: 15,
      }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 16,
            paddingVertical: 4,
          }}>
          {''}
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 14,
            paddingVertical: 4,
          }}>
          {email}
        </Text>
      </View>
      <View style={{ marginLeft: 'auto' }}>
        <Text style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 14,
          paddingVertical: 4,
        }}>{''}
        </Text>

        <TouchableOpacity onPress={() => handleEdit(data)}>
          <MaterialIcons
            name="edit"
            style={{ fontSize: 22, color: NEW_PRIMARY_COLOR, marginHorizontal: 4 }}>
          </MaterialIcons>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default MedsItem;
