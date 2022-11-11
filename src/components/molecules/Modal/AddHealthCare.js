import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import BlurModal from './BlurModal';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_BACKGROUND,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import { useSelector, useDispatch } from 'react-redux';
import { Colors } from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';

const AddHealthCare = ({visible, onCancel, onUpdate = () => {}}) => {
  const { theme } = useSelector((state) => state.AuthReducer);
  const [details, setDetails] = useState({
    doctorName: '',
  });
  const [error, setError] = useState({
    doctorName: true,
  });

  const SetDetails = (detailName, value) => {
    const reg = /^[a-zA-Z]+\s?[a-zA-Z]+$/;
    const match = reg.test(value);
    setError({...error, [`${detailName}`]: match});
    setDetails({...details, [`${detailName}`]: value});
  };

  const onPressUpdate = () => {
    let flag = false;

    for (let e in error) {
      if (!error[`${e}`]) {
        flag = true;
        break;
      }
    }
    if (flag) {
      console.log('invalid input');
    } else {
      onUpdate(details);
    }
  };
  return (
    <BlurModal {...{visible, onCancel}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: 15,
        }}>
        {Local("doctor.my_staff.add_doctor")}
      </Text>
      <TextInput
        value={details.doctorName}
        onChangeText={(text) => SetDetails('doctorName', text)}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder={`${Local("doctor.my_staff.doctor_name")}`}
        style={[styles.text, !error.doctorName && {borderBottomColor: 'red'}]}
      />

      <DmzButton
        onPress={() => {
          onPressUpdate();
        }}
        style={{
          Text: {
            width: '100%',
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Montserrat-SemiBold',
          },
          Container: {
            width: '100%',
            height: 46,
            borderRadius: 25,
            backgroundColor: SECONDARY_COLOR,
            alignSelf: 'center',
            marginTop: 30,
            elevation: 3,
          },
        }}
        text="UPDATE"
      />
      <View style={{marginTop: '15%'}}>
        <Text style={{textAlign: 'center'}}>
        {Local("doctor.my_staff.doctor_not_available")}
        </Text>
        <Text style={{textAlign: 'center', color: '#077EE9'}}>
          {Local("doctor.my_staff.invite_to_join_docplus")}
        </Text>
      </View>
      <DmzButton
        onPress={() => {
          onPressUpdate();
        }}
        style={{
          Text: {
            width: '100%',
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Montserrat-SemiBold',
          },
          Container: {
            width: '100%',
            height: 46,
            borderRadius: 25,
            backgroundColor: SECONDARY_COLOR,
            alignSelf: 'center',
            marginTop: 30,
            elevation: 3,
          },
        }}
        text="UPDATE"
      />
    </BlurModal>
  );
};

export default AddHealthCare;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    alignSelf: 'stretch',
    borderBottomWidth: 1.5,
    borderColor: NEW_PRIMARY_BACKGROUND,
    padding: 5,
    marginBottom: 7,
  },
});
