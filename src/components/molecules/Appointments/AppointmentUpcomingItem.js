import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
  NEW_PRIMARY_COLOR,
  GREY_BACKGROUND,
} from '../../../styles/colors';
import moment from 'moment';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Host } from '../../../utils/connection';
import { useSelector } from 'react-redux';
import { socket } from '../../../utils/socket';
import { Colors } from '../../../styles/colorsV2';
import { Avatar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
const AppointmentUpcomingItem = ({ style, item, navigation }) => {
  const Socket = useRef(socket);
  const { doctor } = item;
  const [ImageSource, setImageSource] = useState('');
  const { userData, theme } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (doctor.picture?.length) {
      setImageSource({
        uri: `${Host}${doctor.coverPhoto
          ?.replace('public', '')
          .replace('\\\\', '/')}`,
      });
    } else {
      setImageSource(require('../../../assets/jpg/person1.jpg'));
    }
  }, [doctor]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DoctorProfile', { data: doctor })}>
      <View
        style={{
          width: 380,
          height: 220,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#DEE6F3',
          alignSelf: 'center',
          top: width / 28,
          marginBottom: 15,
          // left: width / 8.5,
        }}>
        <View style={{ flexDirection: 'row', top: 31, left: 18 }}>
          <Avatar.Image
            //   style={{ top: 31, left: 18 }}
            size={65}
            source={ImageSource}
          />
          <Image
            style={{ position: 'absolute', top: 40, left: 45 }}
            source={require('../../../assets/icons/Ellipse.png')}
          />
          <View>
            <Text
              style={{
                left: 10,
                fontSize: 18,
                color: '#000000',
                fontFamily: 'Gilroy-SemiBold',
              }}>
              {doctor.basic.name}
            </Text>
            <Text
              style={{
                left: 10,
                top: 4,
                fontFamily: 'Gilroy-Medium',
                color: '#666666',
              }}>
              {doctor.specialty}
            </Text>
            {console.log(doctor)}
            <View
              style={{
                width: 79,
                height: 21,
                backgroundColor: '#EEEEEE',
                top: 10,
                borderRadius: 5,
                left: 10,
                flexDirection: 'row',
              }}>
              <Image
                style={{ top: 4, left: 9 }}
                source={require('../../../assets/icons/path.png')}
              />
              <Text
                style={{
                  fontSize: 12,
                  top: 3,
                  left: 14,
                  fontFamily: 'Gilroy-Medium',
                }}>
                {doctor.experience == undefined
                  ? 'Unknown'
                  : doctor.experience + 'Years'}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: 48,
              height: 21,
              borderWidth: 1,
              borderColor: '#EEEEEE',
              borderRadius: 4,
              flexDirection: 'row',
              position: 'absolute',
              left: 289,
            }}>
            <Image
              style={{ alignSelf: 'flex-start', top: 1, left: 2 }}
              source={require('../../../assets/icons/rating.png')}
            />
            <Text style={{ left: 7, bottom: 1, fontFamily: 'Gilroy-SemiBold' }}>
              4.5
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', top: 47, left: 20 }}>
          <Text
            style={{
              color: '#7B7A79',
              fontSize: 13,
              fontFamily: 'Gilroy-SemiBold',
            }}>
            Health Concern :
          </Text>
          <Text
            style={{
              color: '#333333',
              left: 8,
              fontSize: 16,
              bottom: 1,
              fontFamily: 'Gilroy-SemiBold',
            }}>
            {doctor.appointmentName == undefined
              ? 'Unknown'
              : doctor.appointmentName}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Socket.current.emit('add_empty_convo', {
              from: userData._id,
              to: doctor._id,
              message: '',
              toType: 'doctor',
              fromType: 'patient',
            });
            setTimeout(() => {
              navigation.navigate('Chats');
            }, 3000);
          }}
          style={{
            width: 109,
            height: 40,
            borderRadius: 21,
            borderWidth: 1,
            top: 10,
            left: 248,
            borderColor: '#077EE9',
          }}>
          <Image
            style={{ top: 10, left: 19 }}
            source={require('../../../assets/icons/Chat2.png')}
          />
          <Text
            style={{
              color: '#077EE9',
              fontFamily: 'Gilroy-Medium',
              fontSize: 14,
              top: -9,
              left: 55,
            }}>
            Chat
          </Text>
        </TouchableOpacity>
        <LinearGradient
          colors={['#7B7A79', '#7B7A79', '#7B7A79']}
          // start={{ x: 0, y: 0 }}
          // end={{ x: 1, y: 0 }}
          locations={[0, 0.5, 0]}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            top: 40,
          }}>
          <View style={{ width: 275, height: 1, borderRadius: 28 }} />
        </LinearGradient>

        <View style={{ flexDirection: 'row', top: 67, left: 20 }}>
          <Text
            style={{
              color: '#EA1A65',
              fontSize: 14,
              fontFamily: 'Gilroy-SemiBold',
            }}>
            {moment(item.bookedFor).format('dddd, ') +
              moment(item.bookedFor).format('MMM DD')}
          </Text>
          <TouchableOpacity
            style={{ left: 147, bottom: 4 }}
            onPress={() =>
              navigation.navigate('ConfirmAppointment', {
                showOnlyData: item,
                showOnly: true,
                onBackPress: () => {
                  navigation.navigate('Appointments');
                },
              })
            }>
            <Text
              style={{
                // left: 160,
                // bottom: 4,
                fontSize: 14,
                fontFamily: 'Gilroy-SemiBold',
                color: '#7B7A79',
                textDecorationLine: 'underline',
              }}>
              View details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <TouchableOpacity
      onPress={() => navigation.navigate('DoctorProfile', { data: doctor })}>
      <View style={[styles.mainContainer, style ?? {}]}>
        <Image
          source={ImageSource}
          style={{ height: 70, width: 70, borderRadius: 35, margin: 10 }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            margin: 10,
          }}>
          <Text
            style={[
              styles.docName,
              { color: Colors.primary_text_color[theme] },
            ]}>
            {doctor.basic.name}
          </Text>
          <Text
            style={[
              styles.docSpeciality,
              { color: Colors.primary_text_color[theme] },
            ]}>
            {doctor.specialty}
          </Text>
          <Text
            style={[
              styles.appointmentName,
              { color: Colors.primary_text_color[theme] },
            ]}>
            {doctor.appointmentName}
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              Socket.current.emit('add_empty_convo', {
                from: userData._id,
                to: doctor._id,
                message: '',
                toType: 'doctor',
                fromType: 'patient',
              });
              setTimeout(() => {
                navigation.navigate('Chats');
              }, 3000);
            }}>
            <Image
              source={require('../../../assets/icons/chat.png')}
              style={{
                height: 25,
                width: 25,
                marginBottom: 7,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginRight: '4%',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 12,
                  color: '#EA1A65',
                }}>
                {moment(item.bookedFor).format('dddd, ')}
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  color: '#EA1A65',
                }}>
                {moment(item.bookedFor).format('MMM DD')}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 10,
                color: '#EA1A65',
                textAlign: 'right',
              }}>
              {moment(item.bookedFor).format('hh:mm a')}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ConfirmAppointment', {
                showOnlyData: item,
                showOnly: true,
                onBackPress: () => {
                  navigation.navigate('Appointments');
                },
              })
            }>
            <View
              style={[
                { marginTop: '12%' },
                // styles.iconContainer,
                // { backgroundColor: NEW_PRIMARY_BACKGROUND },
              ]}>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={{
                  height: 17,
                  width: 17,
                  transform: [{ rotateZ: '180deg' }],
                }}
                resizeMode="contain"
              /> */}
      {/* <Image
                  source={require('../../../assets/icons/doc.png')}
                  style={{
                    height: 15,
                    width: 12,
                  }}
                  resizeMode="contain"
                /> */}
      {/* </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

export default AppointmentUpcomingItem;

const styles = StyleSheet.create({
  mainContainer: {
    width: width - 25,
    height: 165,
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 14,
    flexDirection: 'row',
    alignSelf: 'center',
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
    color: NEW_PRIMARY_BACKGROUND,
  },
});
