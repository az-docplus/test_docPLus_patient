import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Host } from '../../../utils/connection';
import {Local, setLocale} from '../../../i18n';
import {Colors} from '../../../styles/colorsV2';
import { useDispatch, useSelector } from 'react-redux';

const MyDoctorItem = ({navigation, doctor, data, appointment }) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const [ImageSource, setImageSource] = useState('');

  useEffect(() => {
    console.log(doctor.picture, "???????????????????")
    if (doctor?.picture?.length) {
      setImageSource({
        uri: `${Host}${doctor.coverPhoto?.replace('public', '')
          .replace('\\\\', '/')}`,
      });
    } else {
      setImageSource(require('../../../assets/images/dummy_profile.png'));
    }
  }, [doctor])

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
        backgroundColor: Colors.secondary_background[theme],
        paddingHorizontal: 20,
        borderRadius: 13,
        marginVertical: 10,
        elevation: 2,
        flexDirection: 'row',
        paddingVertical: 15,
      }}>
      <View style={{ justifyContent: 'center' }}>
        <Image
          source={ImageSource}
          style={{ height: 70, width: 70, borderRadius: 35, margin: '2%', backgroundColor: Colors.primary_background[theme] }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 17,
              paddingVertical: 2,
              color: Colors.primary_text_color[theme],
              marginRight: 10,
            }}>
            {`${doctor?.firstName.toTitleCase()} ${doctor?.lastName.toTitleCase()}`}
          </Text>
        </View>

        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: 12,
            paddingVertical: 2,
            color: Colors.primary_text_color[theme]
          }}>
          {doctor.specialty}
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
        <View style={{ justifyContent: 'center' }}>
          <MaterialIcon onPress={() => navigation.navigate("Chats")} name="message" size={24} color={'#7B7A79'} />
        </View>
      )}
    </View>
  )
};

export default MyDoctorItem;
