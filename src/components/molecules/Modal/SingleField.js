import React, {useState} from 'react';
import {Text, View, TextInput} from 'react-native';
import BlurModal from './BlurModal';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';

const SignleField = ({
  headingText,
  labelText,
  unit,
  onCancel,
  visible,
  onUpdate,
}) => {
  const [height, setHeight] = useState('');

  return (
    <BlurModal {...{visible, onCancel}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: 20,
        }}>
        {headingText}
      </Text>

      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 13,
          color: INPUT_PLACEHOLDER,
          alignSelf: 'flex-start',
        }}>
        {labelText}
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
            padding: 4,
            flex: 1,
          }}
          value={height}
          onChangeText={(text) => setHeight(text)}
        />
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 18,
            color: INPUT_PLACEHOLDER,
            marginRight: 10,
          }}>
          {unit}
        </Text>
      </View>

      <DmzButton
        onPress={() => {
          onUpdate(height);
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

export default SignleField;
