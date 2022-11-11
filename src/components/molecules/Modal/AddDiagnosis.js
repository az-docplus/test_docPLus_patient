import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
import { useDispatch, useSelector } from 'react-redux';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';

const AddDiagnosis = ({ visible, onCancel, onUpdate, editMode , editingData }) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [details, setDetails] = useState({
    name: '',
    reaction: '',
    Severity: '',
  });

  useEffect(() => {
    console.log(editingData,editMode)
    if (editMode) {
      setDetails({
        ...editingData,
        name: editingData.allergyName,
        reaction: editingData.reaction,
        Severity: editingData.severity,
      })
    } else {
      setDetails({
        name: '',
        reaction: '',
        Severity: '',
      })
    }
  }, [editMode || editingData])

  return (
    <BlurModal {...{ visible, onCancel }}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: 15,
          color: Colors.primary_text_color[theme],
        }}>
        {Local("doctor.medical_history.add_allergies")}
      </Text>
      <TextInput
        value={details.name}
        onChangeText={(text) => setDetails({ ...details, name: text })}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local("doctor.medical_history.allergy_name_type")}`}
        style={[styles.text, { color: Colors.primary_text_color[theme]}]}
      />

      <TextInput
        value={details.reaction}
        onChangeText={(text) => setDetails({ ...details, reaction: text })}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local("doctor.medical_history.reaction")}`}
        style={[styles.text, { color: Colors.primary_text_color[theme]}]}
      />

      <TextInput
        value={details.Severity}
        onChangeText={(text) => setDetails({ ...details, Severity: text })}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local("doctor.medical_history.severity")}`}
        style={[styles.text, { color: Colors.primary_text_color[theme]}]}
      />

      <DmzButton
        disabled={details.name === '' || details.Severity === '' || details.reaction === ""}
        onPress={() => {
          onUpdate(details);
          setDetails({
            name: '',
            reaction: '',
            Severity: '',
          })
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
            marginTop: 20,
            elevation: 3,
          },
        }}
        text="UPDATE"
      />
    </BlurModal>
  );
};

export default AddDiagnosis;

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
  inputContainer: {},
});
