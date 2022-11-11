import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import DmzText from '../../atoms/DmzText/DmzText';
const DoctorProfile = () => {
  return (
    <View style={DoctorProfileStyles.ContentContainer}>
      <View style={DoctorProfileStyles.ContentContainerTabs}>
        <DmzText
          style={DoctorProfileStyles.ContentContainerTab}
          text={'About'}
        />
        <DmzText text="Calender" />
        <DmzText text="Feedback" />
        <MaterialCommunityIcons name="dots-horizontal" size={32} />
      </View>
      <ScrollView style={DoctorProfileStyles.DoctorInfoScroll}>
        <View style={{flex: 1}}>
          <DmzText style={DoctorProfileStyles.DoctorsHeader} text="Bio" />
          <DmzText
            style={DoctorProfileStyles.DoctorsDetail}
            text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sedLorem
            ipsum dolor sit amet, consetetur sadipscing elitr, sed Lorem ipsum
            dolor sit amet, consetetur sadipscing elitr, sed Lorem ipsum dolor
            sit amet, consetetur sadipscing elitr, sed"
          />

          <DmzText
            text="Board Certifications"
            style={DoctorProfileStyles.DoctorsHeader}
          />
          <DmzText style={DoctorProfileStyles.DoctorsDetail} text="Mon-Fri" />
          <DmzText
            style={DoctorProfileStyles.DoctorsHeader}
            text="Professional memberships"
          />
          <DmzText text="Mon-Fri" style={DoctorProfileStyles.DoctorsDetail} />
        </View>
      </ScrollView>
    </View>
  );
};
const DoctorProfileStyles = StyleSheet.create({
  ContentContainer: {
    flex: 1,
    zIndex: 10,
  },
  ContentContainerTabs: {
    height: 40,
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  ContentContainerTab: {
    padding: 4,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F4C130',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#2f2f2f',
  },
  DoctorInfoScroll: {
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
  },
  DoctorsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f1f1f',
    marginBottom: 5,
  },
  DoctorsDetail: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#5f5f5f',
    marginBottom: 10,
  },
});

export default DoctorProfile;
