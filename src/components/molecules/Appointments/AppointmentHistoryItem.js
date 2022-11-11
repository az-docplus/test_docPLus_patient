import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
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
import { useSelector, useDispatch } from 'react-redux';
import { Colors } from '../../../styles/colorsV2';
import { Avatar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
const AppointmentHistoryItem = ({ style, item, navigation }) => {
  const [expanded, setexpanded] = useState(false);
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setexpanded(expanded == true ? false : true);
  };
  console.log('History');
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const { doctor } = item;
  const [ImageSource, setImageSource] = useState('');

  String.prototype.toTitleCase = function () {
    const splited = this.split(' ')
      .map((item) => {
        if (item[0]) return `${item[0].toUpperCase()}${item.slice(1)}`;
      })
      .join(' ');
    return splited;
  };

  useEffect(() => {
    if (doctor?.picture?.length) {
      setImageSource({
        uri: `${Host}${doctor.coverPhoto
          ?.replace('public', '')
          .replace('\\\\', '/')}`,
      });
    } else {
      setImageSource(require('../../../assets/images/dummy_profile.png'));
    }
  }, [doctor]);
  const Accordian = () => {
    return (
      <View style={{ marginBottom: 19 }}>
        {/* <View>
          <Text>Feruary, {moment().format('YYYY')}</Text>

        </View> */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DoctorProfile', { data: doctor })
          }>
          <View
            style={{
              width: 385,
              height: 222,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#DEE6F3',
              alignSelf: 'center',
              top: width / 28.5,
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
                  {`${doctor.firstName?.toTitleCase()} ${doctor.lastName?.toTitleCase()}`}
                </Text>
                <Text
                  style={{
                    left: 10,
                    top: 4,
                    fontFamily: 'Gilroy-Medium',
                    color: '#666666',
                  }}>
                  {doctor.specialty == undefined
                    ? 'General Physician| MBBS, NBD'
                    : doctor.specialty}
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: '#EA1A65',
                top: 25,
                left: 94,
                fontFamily: 'Gilroy-SemiBold',
              }}>
              {moment(item.bookedFor).format('dddd, ') +
                moment(item.bookedFor).format('MMM DD')}
            </Text>

            <View style={{ flexDirection: 'row', top: 32, left: 94 }}>
              <Text
                style={{
                  color: '#7B7A79',
                  fontSize: 12,
                  fontFamily: 'Gilroy-SemiBold',
                }}>
                Health Concern :
              </Text>
              <Text
                style={{
                  color: '#333333',
                  left: 8,
                  fontSize: 14,
                  bottom: 2,
                  fontFamily: 'Gilroy-SemiBold',
                }}>
                {item.reasonForVisit}
              </Text>
            </View>
            {/* <LinearGradient
          colors={['#7B7A79', '#7B7A79', '#7B7A79']}
          // start={{ x: 0, y: 0 }}
          // end={{ x: 1, y: 0 }}
          locations={[0, 0.5, 0]}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            
          }}></LinearGradient> */}
            <View
              style={{
                width: 275,
                height: 0.5,
                borderRadius: 28,
                borderWidth: 0.5,
                borderColor: '#7B7A79',
                alignSelf: 'center',
                top: 58,
              }}
            />

            <TouchableOpacity
              style={{
                width: 153,
                height: 40,
                borderRadius: 21,
                left: 197,
                top: 68,
              }}>
              <LinearGradient
                colors={['#088DFF', '#066AC3']}
                // start={{ x: 0, y: 0 }}
                // end={{ x: 1, y: 0 }}
                style={{
                  width: 153,
                  height: 40,
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  borderRadius: 21,
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../../../assets/icons/Prescicon.png')}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: 14,
                      left: 5,
                    }}>
                    View Prescription
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return <Accordian />;
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
