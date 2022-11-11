import React from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useSelector } from 'react-redux';
import { Colors } from '../../../styles/colorsV2';

const BlurModal = ({
  onCancel,
  children,
  visible,
  setVisible = () => {},
  activity = false,
  moreMargin = false,
  center = false,
}) => {
  const { theme } = useSelector((state) => state.AuthReducer);
  return (
    <Modal
      onRequestClose={() => {
        setVisible(false);
      }}
      transparent={true}
      visible={visible}
      animationType="fade">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View
          style={{
            flex: 1,
            justifyContent: center ? 'center' : 'flex-end',
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
              style={
                !activity
                  ? {
                      // backgroundColor: 'white',
                      backgroundColor: Colors.secondary_background[theme],
                      padding: '8%',
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                      borderBottomLeftRadius: center ? 30 : 0,
                      borderBottomRightRadius: center ? 30 : 0,
                      marginHorizontal: center ? 20 : 0,
                      // alignSelf: 'center',
                      // margin: !moreMargin ? '4%' : '8%',
                      justifyContent: 'center',
                      // alignItems: 'center',
                      //   borderWidth: 1,
                    }
                  : {
                      // backgroundColor: 'white',
                      // backgroundColor: Colors.secondary_background[theme],
                      padding: '5%',
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                      alignSelf: 'center',
                      margin: '4%',
                      justifyContent: 'center',

                      //   borderWidth: 1,
                    }
              }>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default BlurModal;
