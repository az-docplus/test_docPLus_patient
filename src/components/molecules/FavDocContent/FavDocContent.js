import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DmzText from '../../atoms/DmzText/DmzText';
import RatingStars from '../../atoms/ratingStars/RatingStarts';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
function FavDocContent({
  Profile,
  DoctorName,
  rating,
  Specialization,
  onPress,
  schedule,
  navigation,
  data,
}) {
  return (
    <>
      <TouchableOpacity
        style={CardContentStyles.FavDocCardContent}
        // onPress={() => navigation.navigate('docPatientStrem', {data: data})}
      >
        {Profile}
        <View style={CardContentStyles.FavDocDetails}>
          <View style={CardContentStyles.FavDocNameContainer}>
            <DmzText text={DoctorName} style={CardContentStyles.FavDocName} />
            <RatingStars rating={rating} />
          </View>
          <DmzText
            text={Specialization}
            style={CardContentStyles.FavDocSpecialization}
          />

          {/* can be made as molecule and touchable if needed */}
          <View style={CardContentStyles.FavDocAvailableTimes}>
            {schedule
              .filter(
                item =>
                  item.bookedFor.slice(11, 16) >
                  new Date().toISOString().slice(11, 16),
              )
              .slice(0, 3)
              .map(item => (
                <DmzText
                  text={item.bookedFor.slice(11, 16)}
                  style={CardContentStyles.FavDocAvailableTime}
                />
              ))}
            {/* <DmzText
              text={'11:00'}
              style={{
                ...CardContentStyles.FavDocAvailableTime,
                backgroundColor: 'rgba(255,255,255,0)',
                fontWeight: '600',
              }}
            />
            <DmzText
              text={'16:00'}
              style={{
                ...CardContentStyles.FavDocAvailableTime,
                backgroundColor: 'rgba(255,255,255,0)',
                fontWeight: '600',
              }}
            /> */}
          </View>
        </View>
      </TouchableOpacity>
      <View style={CardContentStyles.FavDocRemoveButton}>
        <TouchableOpacity onPress={onPress} style={{zIndex: 2000}}>
          <FontAwesomeIcon name="remove" size={18} color="#555" />
        </TouchableOpacity>
      </View>
    </>
  );
}
const CardContentStyles = StyleSheet.create({
  FavDocCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  FavDocDetails: {
    marginLeft: 10,
  },
  FavDocNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  FavDocName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  FavDocSpecialization: {
    color: '#666',
  },
  FavDocAvailableTimes: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 5,
  },
  FavDocAvailableTime: {
    backgroundColor: '#F4C130',
    padding: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    fontWeight: 'bold',
    color: '#555',
    marginRight: 10,
  },
  FavDocRemoveButton: {
    backgroundColor: '#F4C130',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 6,
    paddingRight: 12,
    paddingLeft: 12,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    zIndex: 1000,
  },
});

export default FavDocContent;
