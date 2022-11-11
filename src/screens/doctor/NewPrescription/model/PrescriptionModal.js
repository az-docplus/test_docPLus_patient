import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useSelector } from 'react-redux';
import { Colors } from '../../../../styles/colorsV2';
const PrescriptionModal = ({ navigation, children, modal, setModal }) => {
  //   const { modal, setModal } = route.params;

  const { theme } = useSelector((state) => state.AuthReducer);
  return (
    <Modal
      animationType="fade"
      visible={modal}
      transparent={true}
      onRequestClose={() => {
        setModal(false);
      }}>
      <BlurView
        blurRadius={7}
        downsampleFactor={1}
        overlayColor={Colors.blur_overlay_color[theme]}
        blurAmount={1}
        style={StyleSheet.absoluteFill}
        blurType="light"
      />
      {children}
    </Modal>
  );
};

export default PrescriptionModal;

const styles = StyleSheet.create({});
