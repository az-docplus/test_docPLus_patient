import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import BlurModal from './BlurModal';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import { Colors } from '../../../styles/colorsV2';
import { useDispatch, useSelector } from 'react-redux';
import { BlurView } from '@react-native-community/blur';
import { StyleSheet } from 'react-native';
import { Modal } from 'react-native';

const Popconfirm = ({ text, onCancel, visible, onUpdate }) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);

  return (
    <Modal
      onRequestClose={() => {
        onCancel();
      }}
      transparent={true}
      visible={visible}
      animationType="fade">
      <TouchableWithoutFeedback>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            // backgroundColor: Colors.secondary_background[theme]
          }}>
          <BlurView
            blurRadius={7}
            downsampleFactor={1}
            overlayColor={Colors.blur_overlay_color[theme]}
            blurAmount={1}
            style={StyleSheet.absoluteFill}
            blurType="light"
          />
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={{
                // backgroundColor: 'white',
                backgroundColor: Colors.secondary_background[theme],
                padding: '8%',
                borderRadius: 30,
                marginHorizontal: 20,
                // alignSelf: 'center',
                // margin: !moreMargin ? '4%' : '8%',
                justifyContent: 'center',
                // alignItems: 'center',
                //   borderWidth: 1,
              }}>
              <View style={{ paddingVertical: 10 }}>
                <Text
                  style={{
                    fontFamily: 'Gilroy-Medium',
                    fontSize: 18,
                    marginRight: 30,
                    color: '#353535',
                    // color: Colors.primary_text_color[theme],
                    // textAlign: 'center',
                  }}>
                  {text ? text : 'Are you sure you want to remove the medicine'}
                </Text>
                <View
                  View
                  style={{
                    flexDirection: 'row',
                    marginTop: '8%',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity onPress={onCancel}>
                    <Text
                      style={{
                        color: '#EA1A65',
                        fontSize: 16,
                        fontFamily: 'Gilroy-SemiBold',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onUpdate}>
                    <Text
                      style={{
                        marginLeft: 20,
                        color: '#7B7A79',
                        fontSize: 16,
                        fontFamily: 'Gilroy-SemiBold',
                      }}>
                      Confirm
                    </Text>
                  </TouchableOpacity>

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
                    onPress={onUpdate}
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
                  /> */}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Popconfirm;
