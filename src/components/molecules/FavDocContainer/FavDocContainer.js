import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import BasicCard from '../../atoms/BasicCard/BasicCard';
import FavDocContent from '../FavDocContent/FavDocContent';
import ProfilePic from '../../atoms/ProfilePic/ProfilePic';

function FavDocContainer({onPress, name, schedule, navigation, id, data}) {
  return (
    <View
      style={Styles.FavDocCardContainer}
      //   onPress={() => navigation.navigate('docPatientStrem', {data: data})}
    >
      <BasicCard
        style={{
          CardContainer: Styles.FavDocBasicCard,
        }}>
        <FavDocContent
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
  FavDocCardContainer: {
    marginTop: 15,
  },
  FavDocBasicCard: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    alignItems: 'flex-start',
    height: 'auto',
    position: 'relative',
    paddingBottom: 25,
  },
});
export default FavDocContainer;
