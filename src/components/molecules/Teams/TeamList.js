import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../../../styles/colorsV2';

const TeamItem = ({ data, navigation }) => {
  const {theme} = useSelector((state) => state.AuthReducer);
  const { _id, name, practise } = data;
  return (
    <View
      key={_id}
      style={{
        // backgroundColor: 'white',
        backgroundColor: Colors.secondary_background[theme],
        paddingHorizontal: 20,
        borderRadius: 13,
        marginVertical: 10,
        elevation: 2,
        flexDirection: 'row',
        paddingVertical: 15,
      }}>
        <StatusBar
        animated
        backgroundColor={Colors.secondary_background[theme]}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 16,
            color: Colors.primary_text_color[theme],
            paddingVertical: 4,
          }}>
          {name}
        </Text>
      </View>
      <TouchableOpacity style={{ marginLeft: "auto" }} onPress={() => {
        navigation.navigate('TeamMembers', { practise, _id })
      }}>
        <MaterialIcons size={30} color={Colors.primary_color[theme]} name="chevron-right"></MaterialIcons>
      </TouchableOpacity>
    </View>
  );
};

export default TeamItem;
