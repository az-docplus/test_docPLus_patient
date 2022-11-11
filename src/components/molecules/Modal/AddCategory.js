import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import BlurModal from './BlurModal';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import AnimatedErrorText from '../../../components/atoms/animatedErrorText/AnimatedErrorText';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';


const AddCategory = ({ onCancel, visible, onUpdate, errors }) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [title, setTitle] = useState('');
  const [err, seterr] = useState(errors)

  const handleChange = (text) => {
    if (text === "")
      seterr("Please provide a title")
    else
      setTitle(text)
  }
  return (
    <BlurModal {...{ visible, onCancel }}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          color: Colors.primary_text_color[theme],
          fontSize: 20,
          marginBottom: 20,
        }}>
        {Local('doctor.AddQuestionnaire.AddCategory.add_category')}
      </Text>

      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 13,
          color: Colors.input_placeholder_color[theme],
          alignSelf: 'flex-start',
        }}>
        {Local('doctor.AddQuestionnaire.AddCategory.title')}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: NEW_PRIMARY_BACKGROUND,
          borderBottomWidth: 1.5,
          marginBottom: 30,
        }}>

        <TextInput
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 20,
            color: Colors.primary_text_color[theme],
            padding: 4,
            flex: 1,
          }}
          value={title}
          onChangeText={(text) => handleChange(text)}
        />
        <AnimatedErrorText text={err} />
      </View>

      <DmzButton
        disabled={title === ''}
        onPress={() => {
          onUpdate(title);
          setTitle('')
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
            elevation: 3,
          },
        }}
        text="UPDATE"
      />
    </BlurModal>
  );
};

export default AddCategory;
