import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import BlurModal from './BlurModal';
import {useSelector} from 'react-redux';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {array} from 'prop-types';
import moment from 'moment';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-community/picker';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';

const AddFamily = ({
  visible,
  onCancel,
  onUpdate,
  setVisible,
  loading = false,
}) => {
  const {theme} = useSelector((state) => state.AuthReducer);
  const screenWidth = useWindowDimensions().width;
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    contact: '',
    medicalHistory: [],
  });

  const [error, setError] = useState({
    firstName: true,
    lastName: true,
    email: true,
    contact: true,
  });

  const SetCredential = (credentialName, value) => {
    const nameReg = /^[a-zA-Z]+\s?[a-zA-Z]+$/;
    const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneReg = /^[1-9]{1}\d{9}$/;

    let match = true;

    switch (credentialName) {
      case 'firstName':
        match = nameReg.test(value);
        break;
      case 'lastName':
        match = nameReg.test(value);
        break;
      case 'email':
        match = emailReg.test(value);
        break;
      case 'contact':
        match = phoneReg.test(value);
        break;
    }
    setError({...error, [`${credentialName}`]: match});
    setDetails({...details, [`${credentialName}`]: value});
  };

  return (
    <BlurModal {...{visible, onCancel, setVisible}}>
      <Text
        style={{
          color: Colors.primary_text_color[theme],
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: '4%',
        }}>
        Add Member
      </Text>
      {/* <View
        style={{
          flexDirection: 'row',
          alignSelf: 'stretch',
          justifyContent: 'space-between',
          marginBottom: '3%',
        }}>
        
      </View> */}
      <TextInput
        value={details.firstName}
        onChangeText={(text) => SetCredential('firstName', text)}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder={`${Local('patient.familyMember.first_name')}`}
        style={[styles.text, {color: Colors.primary_text_color[theme]}]}
      />
      {!error.firstName && (
        <AnimatedErrorText
          style={{width: '70%', alignSelf: 'center'}}
          text={'First name should only contain letters'}
        />
      )}
      <TextInput
        value={details.lastName}
        onChangeText={(text) => SetCredential('lastName', text)}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder={`${Local('patient.familyMember.last_name')}`}
        style={[styles.text, {color: Colors.primary_text_color[theme]}]}
      />
      {!error.lastName && (
        <AnimatedErrorText
          style={{width: '70%', alignSelf: 'center'}}
          text={'Last name should only contain letters'}
        />
      )}
      <TextInput
        value={details.email}
        autoCapitalize="none"
        onChangeText={(text) => SetCredential('email', text)}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder={`${Local('patient.familyMember.email')}`}
        style={[styles.text, {color: Colors.primary_text_color[theme]}]}
      />
      {!error.email && (
        <AnimatedErrorText
          style={{width: '70%', alignSelf: 'center'}}
          text={'Email ID should be valid'}
        />
      )}

      {/* <TextInput
        value={details.otor}
        onChangeText={(text) => setDetails({...details, otor: text})}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="OT/OR"
        style={styles.text}
      /> */}
      <View style={[styles.text, {paddingVertical: '-12%'}]}>
        <Picker
          placeholder={`${Local('patient.familyMember.gender')}`}
          placeholderTextColor={INPUT_PLACEHOLDER}
          selectedValue={details.gender}
          style={[styles.text, {color: Colors.primary_text_color[theme]}]}
          onValueChange={(text) => setDetails({...details, gender: text})}>
          <Picker.Item label="Select Gender" value={''} color="#ccc" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <TextInput
        value={details.contact}
        keyboardType={'number-pad'}
        onChangeText={(text) => SetCredential('contact', text)}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder={`${Local('patient.familyMember.contact_number')}`}
        style={[styles.text, {color: Colors.primary_text_color[theme]}]}
      />
      {!error.contact && (
        <AnimatedErrorText
          style={{width: '70%', alignSelf: 'center'}}
          text={'Contact Number should be valid'}
        />
      )}

      {details.medicalHistory &&
        details.medicalHistory.map((item, i) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: NEW_PRIMARY_BACKGROUND,
              borderBottomWidth: 1.5,
              marginBottom: 10,
            }}>
            <TextInput
              value={item}
              onChangeText={(text) => {
                let temp = details.medicalHistory;
                temp[i] = text;
                setDetails({...details, medicalHistory: temp});
              }}
              placeholderTextColor={INPUT_PLACEHOLDER}
              placeholder={`${Local('doctor.medical_history.medical_history')}`}
              style={[
                styles.text,
                {
                  borderBottomWidth: 0,
                  flex: 1,
                  marginBottom: 0,
                  color: Colors.primary_text_color[theme],
                },
              ]}
            />
            <TouchableOpacity
              onPress={() => {
                let temp = details.medicalHistory;
                if (i + 1 === details.medicalHistory.length) temp.push('');
                else temp.splice(i, 1);
                setDetails({...details, medicalHistory: temp});
              }}>
              <FontAwesome5
                name={
                  i + 1 === details.medicalHistory.length ? 'plus' : 'minus'
                }
                size={10}
                color={INPUT_PLACEHOLDER}
                style={{marginHorizontal: '2%'}}
              />
            </TouchableOpacity>
          </View>
        ))}

      <DmzButton
        disabled={
          details.firstName === '' ||
          details.lastName === '' ||
          details.email === '' ||
          details.contact === ''
        }
        isLoading={loading}
        onPress={() => {
          onUpdate(details);
          setDetails({
            firstName: '',
            lastName: '',
            email: '',
            birthDay: '',
            gender: '',
            contact: '',
          })
        }}
        style={{
          Text: {
            // width: '100%',
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Montserrat-SemiBold',
          },
          Container: {
            width: screenWidth * 0.8,
            marginTop: 10,
            height: 46,
            borderRadius: 25,
            backgroundColor: SECONDARY_COLOR,
            alignSelf: 'center',
            elevation: 3,
          },
        }}
        text="UPDATE"
      />
    </BlurModal>
  );
};

export default AddFamily;

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
