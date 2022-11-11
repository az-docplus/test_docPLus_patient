import React, {useEffect} from 'react';
import {Text, View, Modal, Image} from 'react-native';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import {SECONDARY_COLOR} from '../../../styles/colors';
import {cos} from 'react-native-reanimated';

const CancelConfirm = ({visible, onYes, onNo}) => {
  return (
    <Modal backgroundColor="#ffffff" visible={visible} animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
        <Image
          source={require('../../../assets/icons/error1.png')}
          style={{height: 70, width: 70, marginBottom: 20}}
        />

        <Text style={{fontSize: 28, fontFamily: 'Montserrat-Bold'}}>
          Cancel?
        </Text>

        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 18,
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 30,
          }}>
          Are you sure you wish to cancel{'\n'}the appointment?
        </Text>

        <View style={{flexDirection: 'row'}}>
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
                width: 120,
                height: 46,
                borderRadius: 25,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                elevation: 3,
                marginHorizontal: 8,
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
                width: 120,
                height: 46,
                borderRadius: 25,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                elevation: 3,
                marginHorizontal: 8,
              },
            }}
            text="YES"
          />
        </View>
      </View>
    </Modal>
  );
};
export default CancelConfirm;
