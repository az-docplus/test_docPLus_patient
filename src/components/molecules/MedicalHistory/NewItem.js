import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import {
  NEW_PRIMARY_LIGHT_BG,
  NEW_PRIMARY_COLOR,
} from '../../../styles/colors';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../../styles/colorsV2';
import { Local } from '../../../i18n';

const NewItem = ({ onPress = () => {}, text, icon }) => {
  const { theme } = useSelector((state) => state.AuthReducer);
  return (
    <TouchableOpacity {...{ onPress }}>
      <View
        style={{
          backgroundColor: '#297281',
          paddingVertical: '4%',
          marginVertical: '2%',
          marginHorizontal: '5%',
          marginTop: '5%',
          marginBottom: '16%',
          borderRadius: 14,
          elevation: 2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {!icon && <Feather name="plus" size={30} color="#EEEEEE" />}
        <Text
          style={{
            fontFamily: 'Gilroy-SemiBold',
            color: '#EEEEEE',
            fontSize: 16,
            paddingVertical: 4,
            marginLeft: 10,
          }}>
          {text ? text : `${Local('doctor.patients_list.add_new')}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewItem;
