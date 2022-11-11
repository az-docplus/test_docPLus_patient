import React, {useEffect} from 'react';
import {Text, View, Modal, TouchableWithoutFeedback} from 'react-native';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import {SECONDARY_COLOR} from '../../../styles/colors';
import {cos} from 'react-native-reanimated';

const AlertModal = ({text, visible, onCancel}) => {
  useEffect(() => {
    let timeOut = null;
    if (visible) {
      timeOut = setTimeout(onCancel, 2000);
    }

    return () => {
      timeOut && clearTimeout(timeOut);
    };
  }, [visible]);

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 30,
                borderRadius: 11,
                margin: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                {typeof text === 'string' ? text : ''}
              </Text>
              {/* <DmzButton
            onPress={onCancel}
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
            text="CANCEL"
          /> */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default AlertModal;
