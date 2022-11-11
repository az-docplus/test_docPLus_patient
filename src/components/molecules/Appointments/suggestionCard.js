import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
  NEW_PRIMARY_COLOR,
} from '../../../styles/colors';
import moment from 'moment';
import { Host } from '../../../utils/connection';
import { Touchable } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../../../styles/colorsV2';

const AppointmentHistoryItem = ({ style, item, navigation, handleSetDocData }) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const { doctor } = item;
  const [ImageSource, setImageSource] = useState('')

  useEffect(() => {
    if (item?.picture?.length) {
      setImageSource({
        uri: `${Host}${item?.coverPhoto?.replace('public', '')
          .replace('\\\\', '/')}`,
      });
    } else {
      setImageSource(require('../../../assets/images/dummy_profile.png'));
    }
  }, [item])

  return (
    <TouchableOpacity style={{
        width: "400%"
    }} onPress={() => {handleSetDocData(item)}}>
      {/* {console.log(item, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")} */}
      <View style={[{...styles.mainContainer, backgroundColor: Colors.secondary_background[theme]}, style ?? { backgroundColor: Colors.secondary_background[theme]}]}>
        <Image
          source={ImageSource}
          style={{ height: 70, width: 70, borderRadius: 35,
             marginRight: '2%',
           backgroundColor: Colors.primary_background[theme] }}
        />

        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            // margin: '3%',
          }}>
          <Text style={[styles.docName, { color: Colors.primary_text_color[theme]}]}>{item?.basic?.name}</Text>
          <Text style={[styles?.docSpeciality, { color: Colors.primary_text_color[theme]}]}>{item?.specialty}</Text>
          {/* <Text style={[styles.appointmentName, { color: Colors.primary_text_color[theme]}]}>{doctor.appointmentName}</Text> */}
        </View>

        <View style={{ justifyContent: 'space-evenly', marginRight: "20%" }}>
          {/* <View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 12,
                  color: Colors.input_placeholder_color[theme],
                }}>
                {moment(item.bookedFor).format('dddd, ')}
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  color: Colors.input_placeholder_color[theme],
                }}>
                {moment(item.bookedFor).format('MMM DD')}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 9,
                color: Colors.input_placeholder_color[theme],
              }}>
              {moment(item.bookedFor).format('hh:mm a')}
            </Text>
          </View> */}

          <View
            style={{}}>
            
            {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

              <TouchableOpacity
                onPress={() => navigation.navigate(
                  'invoice',
                  { id: item._id, time: 100 }
                )}>
                <FontAwesomeIcons
                  style={{ fontSize: 24 }}
                  name="file-document-outline" />
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => navigation.navigate(
                  'ConfirmAppointment',
                  {
                    showOnlyData: item,
                    showOnly: true,
                    onBackPress: () => { navigation.navigate('Appointments') }
                  }
                )}
                >
                <FontAwesomeIcons
                  style={{ fontSize: 24 }}
                  name="chevron-right" />
              </TouchableOpacity>

            </View> */}
          </View>
        </View>
      </View>

    </TouchableOpacity>
  );
};

export default AppointmentHistoryItem;

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: 'white',
    padding: 7,
    borderRadius: 14,
    flexDirection: 'row',
    // borderWidth: 1,
  },
  docName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
  },
  docSpeciality: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  appointmentName: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    // color: NEW_PRIMARY_BACKGROUND,
  },
  iconContainer: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    borderRadius: 15,
  },
});
