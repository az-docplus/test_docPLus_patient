import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import BasicCard from '../../atoms/BasicCard/BasicCard';
import CurrentDoctorContent from '../AvailDoctorContent/CurrentDoctorContent';
import ProfilePic from '../../atoms/ProfilePic/ProfilePic';
import {TouchableOpacity} from 'react-native-gesture-handler';

function CurrentDoctorContainer({
  onPress,
  name,
  schedule,
  navigation,
  id,
  data,
  toggle,
}) {
  console.log('Navigaton: ', id);
  useEffect(() => {
    console.log('2222222222222222222222222222222222222222222222222');
    Animated.timing(cardPos, {
      toValue: 1,
      duration: 800,
      delay: id * 300,
    }).start();

    // console.log(schedule);
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  }, []);
  const width = Dimensions.get('screen').width;
  const cardPos = useRef(new Animated.Value(0)).current;
  const cardView = cardPos.interpolate({
    inputRange: [0, 1],
    outputRange: [-1 * width, 0],
  });
  return (
    <Animated.View
      style={[
        Styles.AvailableDoctorsCardContainer,
        {transform: [{translateX: cardView}]},
      ]}
      onPress={() => navigation.navigate('docPatientStrem', {data: data})}>
      <BasicCard
        style={{
          CardContainer: Styles.AvailableDoctorsBasicCard,
        }}>
        <CurrentDoctorContent
          toggle={toggle}
          DoctorName={`Dr. ${name}`}
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
                  height: 60,
                  width: 60,
                  borderRadius: 60,
                },
                Image: {
                  borderRadius: 60,
                },
              }}
            />
          }
        />
      </BasicCard>
    </Animated.View>
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
export default CurrentDoctorContainer;
