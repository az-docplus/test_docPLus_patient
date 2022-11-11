import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DmzText from '../../atoms/DmzText/DmzText';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import RatingStars from '../../atoms/ratingStars/RatingStarts';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
function AvailDoctorContent({
  Profile,
  DoctorName,
  rating,
  Specialization,
  onPress,
  schedule,
  navigation,
  data
}) {
  return (
    <>
      <TouchableOpacity style={CardContentStyles.AvailableDoctorsCardContent} onPress={() => navigation.navigate('docPatientStrem', { data: data })}>
        {Profile}
        <View style={CardContentStyles.AvailableDoctorsDetails}>
          <View style={CardContentStyles.AvailableDoctorsNameContainer}>
            <DmzText
              text={DoctorName}
              style={CardContentStyles.AvailableDoctorsName}
            />
            <RatingStars rating={rating} />
          </View>
          <DmzText
            text={Specialization}
            style={CardContentStyles.AvailableDoctorsSpecialization}
          />

          {/* can be made as molecule and touchable if needed */}
          <View style={CardContentStyles.AvailableDoctorsAvailableTimes}>
            {
              schedule.filter(item => item.bookedFor.slice(11,16) > new Date().toISOString().slice(11,16)).slice(0,3).map(item => (
                <DmzText
                  text={item.bookedFor.slice(11,16)}
                  style={CardContentStyles.AvailableDoctorsAvailableTime}
                />

              ))
            }
            {/* <DmzText
              text={'11:00'}
              style={{
                ...CardContentStyles.AvailableDoctorsAvailableTime,
                backgroundColor: 'rgba(255,255,255,0)',
                fontWeight: '600',
              }}
            />
            <DmzText
              text={'16:00'}
              style={{
                ...CardContentStyles.AvailableDoctorsAvailableTime,
                backgroundColor: 'rgba(255,255,255,0)',
                fontWeight: '600',
              }}
            /> */}
          </View>
        </View>
      </TouchableOpacity>
      <View style={CardContentStyles.AvailableDoctorsContinueButton}>
        <TouchableOpacity onPress={onPress} style={{ zIndex: 2000}}>
          <FontAwesomeIcon name="arrow-right" size={18} color="#555" />
        </TouchableOpacity>
      </View>
    </>
  );
}
const CardContentStyles = StyleSheet.create({
  AvailableDoctorsCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
    padding: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
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
    zIndex: 1000
  },
});

export default AvailDoctorContent;
