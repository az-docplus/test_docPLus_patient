import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

function CardContent({Profile, DoctorName, rating, Specialization, onPress}) {
  const ratingStars = (() => {
    let arr = [];
    let i, j;
    for (i = 0; i < rating; i++) {
      arr.push(
        <FontAwesomeIcon key={i} name="star" size={12} color="#F4C130" />,
      );
    }
    for (j = 0; j < 5 - rating; j++) {
      arr.push(<Icon key={i + j} name="star" size={11} color="#F4C130" />);
    }
    return arr;
  })();
  return (
    <>
      <View style={CardContentStyles.AvailableDoctorsCardContent}>
        {Profile}
        <View style={CardContentStyles.AvailableDoctorsDetails}>
          <View style={CardContentStyles.AvailableDoctorsNameContainer}>
            <Text style={CardContentStyles.AvailableDoctorsName}>
              {DoctorName}
            </Text>
            <View style={CardContentStyles.AvailableDoctorsRating}>
              {ratingStars}
            </View>
          </View>
          <Text style={CardContentStyles.AvailableDoctorsSpecialization}>
            {Specialization}
          </Text>
          <View style={CardContentStyles.AvailableDoctorsAvailableTimes}>
            <Text style={CardContentStyles.AvailableDoctorsAvailableTime}>
              9:00
            </Text>
            <Text
              style={[
                CardContentStyles.AvailableDoctorsAvailableTime,
                {
                  backgroundColor: 'rgba(255,255,255,0)',
                  fontWeight: '600',
                },
              ]}>
              11:00
            </Text>
            <Text
              style={[
                CardContentStyles.AvailableDoctorsAvailableTime,
                {
                  backgroundColor: 'rgba(255,255,255,0)',
                  fontWeight: '600',
                },
              ]}>
              16:00
            </Text>
          </View>
        </View>
      </View>
      <View style={CardContentStyles.AvailableDoctorsContinueButton}>
        <TouchableOpacity onPress={onPress}>
          <FontAwesomeIcon name="arrow-right" size={18} color="#555" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const CardContentStyles = StyleSheet.create({
  AvailableDoctorsCardContent: {
    flexDirection: 'row',
  },
  AvailableDoctorsDetails: {
    marginLeft: 10,
  },
  AvailableDoctorsNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  AvailableDoctorsName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  AvailableDoctorsRating: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  AvailableDoctorsSpecialization: {
    color: '#666',
  },
  AvailableDoctorsAvailableTimes: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 5,
  },
  AvailableDoctorsAvailableTime: {
    backgroundColor: '#F4C130',
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    fontWeight: 'bold',
    color: '#555',
    marginRight: 10,
  },
  AvailableDoctorsContinueButton: {
    backgroundColor: '#F4C130',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 6,
    paddingRight: 12,
    paddingLeft: 12,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
  },
});
export default CardContent;
