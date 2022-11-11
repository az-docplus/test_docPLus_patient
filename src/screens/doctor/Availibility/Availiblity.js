import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { GREY_BACKGROUND, SECONDARY_COLOR } from '../../../styles/colors';
import RadioGroupV2 from '../../../components/molecules/RadioGroup/RadioGroupV2';
import { connect } from 'react-redux';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import Alternate from '../../../components/molecules/Alternate/Alternate';
import { SaveSlots } from '../../../reduxV2/action/DoctorAction';
import SlotComponent from './SlotCard';
import { Colors } from '../../../styles/colorsV2';
import { Color } from 'react-native-agora';
import { Local, setLocale } from '../../../i18n';

// class availablity extends React.Component {

function availablity({ navigation }) {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const { doctor, doctorProfile, isMyDoctorReducerLoading } = useSelector(
    (state) => state.DoctorReducer,
  );

  const { consultationType } = userData;

  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.primary_background[theme] }}>
      {/* {console.log("..................................................",{userData})} */}
      <TopNavBar
        navigation={navigation}
        headerText={`${Local('doctor.availablity.availability')}`}></TopNavBar>
      {/* <Text>{userData.consultationType}</Text> */}
      {userData.consultationType === 'Tele-consult' && (
        <SlotComponent
          text={`${Local('doctor.availablity.tele_consult')}`}
          type={'Tele-consult'}></SlotComponent>
      )}
      {userData.consultationType === 'In-person' && (
        <SlotComponent
          text={`${Local('doctor.availablity.in_person')}`}
          type={'In-person'}></SlotComponent>
      )}
      {userData.consultationType === 'Both' && (
        <>
          <SlotComponent
            text={`${Local('doctor.availablity.tele_consult')}`}
            type={'Tele-consult'}></SlotComponent>
          <View
            style={{
              backgroundColor: Colors.primary_text_color[theme],
              height: 1,
            }}
          />
          <SlotComponent
            text={`${Local('doctor.availablity.in_person')}`}
            type={'In-person'}></SlotComponent>
        </>
      )}
    </View>
  );
}
// }
/* const mapStateToProps = (state) => ({
  userData: state.AuthReducer.userData,
  doctor: state.DoctorReducer,
  theme: state.AuthReducer.theme,
}); */

export default availablity;

/* export default connect(mapStateToProps, {SaveSlots})(availablity); */
