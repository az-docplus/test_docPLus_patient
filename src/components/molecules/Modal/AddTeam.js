import React, { useState } from 'react';
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
import {Colors} from '../../../styles/colorsV2';
import {useSelector, useDispatch} from 'react-redux';
import {Local, setLocale} from '../../../i18n';

const AddTeam = ({ visible, onCancel, onUpdate, setVisible }) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [details, setDetails] = useState({
    name: ''
  });

  return (
    <BlurModal {...{ visible, onCancel, setVisible }}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          color: Colors.primary_text_color[theme],
          marginBottom: 15,
        }}>
        {Local('doctor.my_teams.add_team_details')}
      </Text>
      <TextInput
        value={details.name}
        onChangeText={(text) => setDetails({ ...details, name: text })}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local('doctor.my_teams.team_name')}`}
        style={[styles.text, {color: Colors.primary_text_color[theme],}]}
      />

      <DmzButton
        disabled={details.name === ''}
        onPress={() => {
          onUpdate(details);
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
        text={`${Local('doctor.my_teams.update')}`}
      />
    </BlurModal>
  );
};

export default AddTeam;

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
