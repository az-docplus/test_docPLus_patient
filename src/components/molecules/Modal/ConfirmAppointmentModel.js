import React, { useEffect } from 'react';
import { Text, View, Modal, Image } from 'react-native';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import { SECONDARY_COLOR } from '../../../styles/colors';
import { cos } from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import ConfirmAppointment from '../ConfirmAppointment/ConfirmAppointment';
import BlurModal from './BlurModal';
import { Colors } from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';
import { Color } from 'react-native-agora';

const ConfirmAppointmentModel = ({ visible, onYes, onNo, data = {payment: false} }) => {
  const { theme } = useSelector(state => state.AuthReducer)
  return (
    <BlurModal backgroundColor={Colors.secondary_background[theme]} visible={visible} animationType="fade">
      <View
        style={{
          backgroundColor: Colors.secondary_background[theme],
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5%',
          borderRadius: 0,
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: 18,
            textAlign: 'center',
            color: Colors.primary_text_color[theme],
            marginTop: '5%',
            marginBottom: '12%',
          }}>
          
          {data.payment ?`Do you wish to pay and confirm the appointment?` : `Do you wish to confirm the appointment?`}
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <DmzButton
            onPress={onNo}
            style={{
              Text: {
                width: '100%',
                textAlign: 'center',
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              },
              Container: {
                width: '40%',
                height: 46,
                borderRadius: 25,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                elevation: 3,
                marginHorizontal: '5%',
              },
            }}
            text="NO"
          />
          <DmzButton
            onPress={onYes}
            style={{
              Text: {
                width: '100%',
                textAlign: 'center',
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              },
              Container: {
                width: '40%',
                height: 46,
                borderRadius: 25,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                elevation: 3,
                marginHorizontal: '5%',
              },
            }}
            text="YES"
          />
        </View>
      </View>
    </BlurModal>
  );
};
export default ConfirmAppointmentModel;
