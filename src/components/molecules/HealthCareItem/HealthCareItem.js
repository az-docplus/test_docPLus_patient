import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const HealthCareItem = ({data}) => (
  <View
    style={{
      backgroundColor: 'white',
      paddingHorizontal: 20,
      borderRadius: 13,
      marginVertical: 10,
      elevation: 2,
      flexDirection: 'row',
      paddingVertical: 15,
    }}>
    <View style={{justifyContent: 'center'}}>
      <Image
        source={require('../../../assets/jpg/person2.jpg')}
        style={{height: 50, width: 50, borderRadius: 50, marginRight: 15}}
      />
    </View>
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 17,
            paddingVertical: 2,
            marginRight: 10,
          }}>
          {data.name}
        </Text>
      </View>

      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: 12,
          paddingVertical: 2,
          color: '#000',
        }}>
        {data.speciality}
      </Text>
      {data.acceptance && (
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: 12,
            paddingVertical: 2,
            color: '#EA1A65',
          }}>
          {data.acceptance}
        </Text>
      )}
      {data.reffered && (
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: 12,
            paddingVertical: 2,
            color: '#7B7A79',
          }}>
          {data.reffered}
        </Text>
      )}
    </View>
    {data.canDoMessage && (
      <View style={{justifyContent: 'center'}}>
        <MaterialIcon name="message" size={24} color={'#7B7A79'} />
      </View>
    )}
  </View>
);

export default HealthCareItem;
