import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {timing} from 'react-native-reanimated';

function CardContent({
  Profile,
  PatientName,
  Timing,
  Age,
  Disease,
  onPress,
  active,
}) {
  return (
    <>
      <View style={CardContentStyles.PatientCardContent}>
        {active ? Profile : null}
        <View style={CardContentStyles.PatientDetails}>
          <View style={CardContentStyles.AvailableDoctorsNameContainer}>
            <Text style={CardContentStyles.PatientName}>{PatientName}</Text>
            <View
              style={[
                CardContentStyles.PatientTime,
                {marginLeft: active ? 10 : 90},
              ]}>
              <Text>{Timing}</Text>
            </View>
          </View>
          <Text style={CardContentStyles.PatientAge}>{Age}</Text>
          <View style={CardContentStyles.PatinetDisease}>
            <Text style={CardContentStyles.PatientDiseaseText}>{Disease}</Text>
          </View>
        </View>
      </View>
      {active === true ? (
        <View style={CardContentStyles.PatientContinueButton}>
          <TouchableOpacity onPress={onPress}>
            <FontAwesomeIcon name="arrow-right" size={18} color="#555" />
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
}

const CardContentStyles = StyleSheet.create({
  PatientCardContent: {
    flexDirection: 'row',
  },
  PatientDetails: {
    marginLeft: 10,
  },
  AvailableDoctorsNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  PatientName: {
    fontSize: 16,
    color: '#444',
  },
  PatientTime: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  PatientAge: {
    color: '#666',
  },
  PatinetDisease: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 5,
  },
  PatientDiseaseText: {
    padding: 2,
    borderRadius: 10,
    color: '#555',
    fontSize: 14,
  },
  PatientContinueButton: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 8,
    paddingRight: 18,
    paddingLeft: 18,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 20,
  },
});
export default CardContent;
