import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import BasicCard from '../../atoms/BasicCard/BasicCard';
import AvailDoctorContent from '../AvailDoctorContent/AvailDoctorContent';
import ProfilePic from '../../atoms/ProfilePic/ProfilePic';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NavigationActions from 'react-navigation/src/NavigationActions';

function AvailDoctorContainer({onPress, name, schedule, navigation, id, data}) {
  useEffect(() => {
    // console.log('2222222222222222222222222222222222222222222222222')
    // console.log(schedule)
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  }, []);
  return (
    <View
      style={Styles.AvailableDoctorsCardContainer}
      onPress={() => navigation.navigate('docPatientStrem', {data: data})}>
      <BasicCard
        style={{
          CardContainer: Styles.AvailableDoctorsBasicCard,
        }}>
        <AvailDoctorContent
          DoctorName={`Dr.${name}`}
          rating={4}
          onPress={onPress}
          Specialization="General Dentist"
          schedule={schedule}
          navigation={navigation}
          data={data}
          Profile={
            <ProfilePic
              sourceurl={require('../../../assets/jpg/person1.jpg')}
              style={{
                Container: {
                  height: 70,
                  width: 70,
                  borderRadius: 70,
                },
                Image: {
                  borderRadius: 70,
                },
              }}
            />
          }
        />
      </BasicCard>
    </View>
  );
}

const Styles = StyleSheet.create({
  AvailableDoctorsCardContainer: {
    marginTop: 15,
  },
  AvailableDoctorsBasicCard: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    alignItems: 'flex-start',
    height: 'auto',
    position: 'relative',
    paddingBottom: 25,
  },
});
export default AvailDoctorContainer;
