import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NEW_PRIMARY_LIGHT_BG, NEW_PRIMARY_COLOR } from '../../../styles/colors';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../../styles/colorsV2';
import { useDispatch, useSelector } from 'react-redux';

const NewItem = ({ onPress = () => { }, text }) => {
  const { theme } = useSelector((state) => state.AuthReducer);
  return (
    <TouchableOpacity {...{ onPress }}>
      <View
        style={{
          backgroundColor: Colors.primary_light_bg[theme],
          marginVertical: '2%',
          marginHorizontal: '2%',
          marginTop: '4%',
          marginBottom: '2%',
          borderRadius: 13,
          elevation: 2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          width: 140
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            color: Colors.primary_text_color[theme],
            fontSize: 16,
          }}>
          {text ? text : "Add New"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewItem;
