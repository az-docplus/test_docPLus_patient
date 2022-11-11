import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TeamItem = ({ data, navigation, teamId }) => {
  const { _id, firstName, lastName } = data;
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
          {firstName + " " + lastName}
        </Text>
      </View>
      {/* <TouchableOpacity style={{ marginLeft: "auto" }} onPress={() => {
        navigation.navigate('TeamMembers', {practise})
      }}>
        <MaterialIcons size={30} color={'#43A2A2'} name="chevron-right"></MaterialIcons>
      </TouchableOpacity> */}
    </View>
  );
};

export default TeamItem;
