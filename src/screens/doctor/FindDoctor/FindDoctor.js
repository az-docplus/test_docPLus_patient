import React, {useState, useRef} from 'react';
import {View, Animated, Easing, StyleSheet, ScrollView} from 'react-native';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import ToggleButton from '../../../components/molecules/ToggleButton/ToggleButton';
import FancyHeader from '../../../components/organisms/FancyHeader/FancyHeader';
import Container from '../../../components/organisms/Container/Container';
import DmzSearchbar from '../../../components/molecules/DmzSeachbar/DmzSearchbar';
import AvailDoctorContainer from '../../../components/molecules/AvailDoctorContainer/AvailDoctorContainer';
import Section from '../../../components/molecules/Section/Section';
import BottomNavigation from '../../../components/old/BottomNavigation/BottomNavigation.component';
import ScheduleAppointment from '../../../components/organisms/ScheduleAppointment/ScheduleAppointment';
import {Local, setLocale} from '../../../i18n';

function FindDoctor() {
  const [showPopup, setShowPopup] = useState(false);
  const PopupTranslateY = useRef(new Animated.Value(0)).current;
  const onPress = () => {
    Animated.sequence([
      Animated.timing(PopupTranslateY, {
        toValue: showPopup ? 0 : 1,
        easing: Easing.bezier(0.52, 0.5, 0.08, 0.78),
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
    setShowPopup(!showPopup);
  };

  return (
    <>
      <View style={FindDoctorScreenStyles.Container}>
        <FancyHeader
          style={{
            Container: {height: '35%'},
            ChildContainer: {alignItems: 'center'},
          }}>
          <DmzText
            text={'Find a doctor'}
            style={FindDoctorScreenStyles.HeaderPrimaryText}
          />
          <ToggleButton text="NOW" />
        </FancyHeader>
        <Container
          style={{
            height: '75%',
            transform: [{translateY: -50}],
            zIndex: 999,
          }}>
          <ScrollView style={{marginTop: 8}}>
            <DmzSearchbar placeholder={'seach your patient'} />
            <Section HeaderText="Available Doctors">
              <AvailDoctorContainer schedule={[]} onPress={onPress} />
            </Section>
          </ScrollView>
        </Container>
        {/* <BottomNavigation PopupTranslateY={PopupTranslateY} /> */}
        <ScheduleAppointment
          PopupTranslateY={PopupTranslateY}
          onPress={onPress}
          showPopup={showPopup}
          doctors={[]}
        />
      </View>
    </>
  );
}

const FindDoctorScreenStyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  HeaderPrimaryText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: -15,
  },
  ContentCardContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  CatagoryScroll: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  },
  CatagoryText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  AvailableDoctors: {
    flex: 1,
    marginTop: 10,
  },
  AvailableDoctorsHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 25,
  },
});
export default FindDoctor;
