import React, { useEffect, useState } from 'react';
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
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';
import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-community/picker';
import { Local, setLocale } from '../../../i18n';
import { Colors } from '../../../styles/colorsV2';
import { useSelector } from 'react-redux';
import ButtonCompo from '../../atoms2/button/button';

const AddFamily = ({
  visible,
  onCancel,
  onUpdate,
  setVisible,
  buttonLoading,
  editingData,
  showNewSubmitButton,
  editMode,
}) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const { width: screenWidth } = useWindowDimensions();
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    relation: '',
    email: '',
    birthDay: '',
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
    setError({ ...error, [`${credentialName}`]: match });
    setDetails({ ...details, [`${credentialName}`]: value });
  };

  useEffect(() => {
    console.log(editingData, editMode, 'dlfjdsflj');
    setTimeout(() => {
      editMode &&
        setDetails({ ...editingData, relation: editingData?.relationship });
    }, 200);

    editMode &&
      setDetails({ ...editingData, relation: editingData?.relationship });
  }, [editMode]);

  return (
    <BlurModal {...{ visible, onCancel, setVisible }}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          color: Colors.primary_text_color[theme],
          fontSize: 20,
          marginBottom: '4%',
        }}>
        {Local('patient.my_family.add_member')}
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
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local('patient.my_family.first_name')}`}
        style={[styles.text, { color: Colors.primary_text_color[theme] }]}
      />
      {!error.firstName && (
        <AnimatedErrorText
          style={{ width: '70%', alignSelf: 'center' }}
          text={'First name should only contain letters'}
        />
      )}
      <TextInput
        value={details.lastName}
        onChangeText={(text) => SetCredential('lastName', text)}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local('patient.my_family.last_name')}`}
        style={[styles.text, { color: Colors.primary_text_color[theme] }]}
      />
      {!error.lastName && (
        <AnimatedErrorText
          style={{ width: '70%', alignSelf: 'center' }}
          text={'Last name should only contain letters'}
        />
      )}
      <TextInput
        value={details.relation}
        onChangeText={(text) => setDetails({ ...details, relation: text })}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local('patient.my_family.relationship')}`}
        style={[styles.text, { color: Colors.primary_text_color[theme] }]}
      />
      <TextInput
        value={details.email}
        autoCapitalize="none"
        onChangeText={(text) => SetCredential('email', text)}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local('patient.my_family.email')}`}
        style={[styles.text, { color: Colors.primary_text_color[theme] }]}
      />
      {!error.email && (
        <AnimatedErrorText
          style={{ width: '70%', alignSelf: 'center' }}
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

      <View style={[styles.text]}>
        <DatePicker
          date={details.birthDay}
          mode="date"
          placeholder={`${Local('patient.my_family.date_of_birth')}`}
          format="MM/DD/YYYY"
          minDate="01/01/1900"
          maxDate={moment(new Date(), 'MM/DD/YYYY')}
          showIcon={false}
          allowFontScaling={true}
          customStyles={{
            dateInput: {
              borderWidth: 0,
              fontSize: 15,
              height: 40,
            },
            placeholderText: {
              color: '#77777795',
              width: '100%',
            },
            dateText: {
              color: '#000',
              width: '100%',
            },
          }}
          style={{
            width: '100%',
            paddingVertical: '-8%',
          }}
          onDateChange={(txt) => setDetails({ ...details, birthDay: txt })}
        />
      </View>
      <View
        style={[
          styles.text,
          { paddingVertical: '-12%', color: Colors.primary_text_color[theme] },
        ]}>
        <Picker
          placeholder={`${Local('patient.my_family.gender')}`}
          selectedValue={details.gender}
          style={{
            color: Colors.primary_text_color[theme],
          }}
          onValueChange={(text) => setDetails({ ...details, gender: text })}>
          <Picker.Item
            label={`${Local('patient.my_family.select_gender')}`}
            value={''}
            color="#ccc"
          />
          <Picker.Item
            label={`${Local('patient.my_family.male')}`}
            value="Male"
          />
          <Picker.Item
            label={`${Local('patient.my_family.female')}`}
            value="Female"
          />
        </Picker>
      </View>

          <TextInput
            value={details.contact}
            keyboardType={'number-pad'}
            onChangeText={(text) => SetCredential('contact', text)}
            placeholderTextColor={Colors.input_placeholder_color[theme]}
            placeholder={`${Local('patient.my_family.contact')}`}
            style={[styles.text, { color: Colors.primary_text_color[theme] }]}
          />
          {!error.contact && (
            <AnimatedErrorText
              style={{ width: '70%', alignSelf: 'center' }}
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
                setDetails({ ...details, medicalHistory: temp });
              }}
              placeholderTextColor={Colors.input_placeholder_color[theme]}
              placeholder={`${Local('patient.my_family.medical_history')}`}
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
                setDetails({ ...details, medicalHistory: temp });
              }}>
              <FontAwesome5
                name={
                  i + 1 === details.medicalHistory.length ? 'plus' : 'minus'
                }
                size={10}
                color={Colors.input_placeholder_color[theme]}
                style={{ marginHorizontal: '2%' }}
              />
            </TouchableOpacity>
          </View>
        ))}

      {showNewSubmitButton ? (
        <ButtonCompo
          title={editMode ? 'UPDATE' : 'ADD MEMBER'}
          pressHandler={() => {
            onUpdate(details);
            setDetails({
              firstName: '',
              lastName: '',
              relation: '',
              email: '',
              birthDay: '',
              gender: '',
              contact: '',
            });
          }}
          style={{
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
          textStyle={{
            fontSize: 14,
            fontFamily: 'Montserrat-SemiBold',
          }}
        />
      ) : (
        <DmzButton
          disabled={
            details.firstName === '' ||
            details.lastName === '' ||
            details.relation === '' ||
            details.email === '' ||
            details.contact === ''
          }
          isLoading={buttonLoading}
          onPress={() => {
            onUpdate(details);
            setDetails({
              firstName: '',
              lastName: '',
              relation: '',
              email: '',
              birthDay: '',
              gender: '',
              contact: '',
            });
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
              width: screenWidth * 0.8,
              marginTop: 10,
              height: 46,
              borderRadius: 25,
              backgroundColor: SECONDARY_COLOR,
              alignSelf: 'center',
              elevation: 3,
            },
          }}
          text={`${Local('patient.my_family.update')}`}
        />
      )}
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
