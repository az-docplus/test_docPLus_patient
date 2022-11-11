import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import { SECONDARY_COLOR, NEW_PRIMARY_BACKGROUND } from '../../../styles/colors';
import BlurModal from './BlurModal';

const AppointmentQuestion = ({ text, visible, onCancel, onNext, options, setforWhom }) => {
  const [selectedIndex, setIndex] = useState(-1);
  return (
    <BlurModal {...{ onCancel, visible }}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          textAlign: 'center',
          marginBottom: 10,
        }}>
        {text}
      </Text>

      <View>
        {options.map((option, index) => (
          <TouchableOpacity onPress={() => setIndex(index)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 9,
              }}>
              <View
                style={{
                  height: 18,
                  width: 18,
                  borderRadius: 9,
                  borderWidth: 2,
                  marginHorizontal: 5,
                  borderColor: NEW_PRIMARY_BACKGROUND,
                  padding: 1.5,
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor:
                      selectedIndex === index
                        ? NEW_PRIMARY_BACKGROUND
                        : '#ffffff',
                    borderRadius: 9,
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 17,
                  textAlign: 'center',
                }}>
                {option}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <DmzButton
        onPress={() => {
          onNext();
          setforWhom(selectedIndex)
          onCancel();
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
            width: 200,
            height: 46,
            borderRadius: 25,
            backgroundColor: SECONDARY_COLOR,
            alignSelf: 'center',
            marginTop: 20,
            elevation: 3,
          },
        }}
        text="NEXT"
      />
    </BlurModal>
  );
};
export default AppointmentQuestion;
