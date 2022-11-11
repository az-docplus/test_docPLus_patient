import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DmzText from '../../atoms/DmzText/DmzText';
import {Colors} from '../../../styles/index';
function GradientButton({text, style, onPress}) {
  const customTouchableStyle = [
    Styles.ButtonTouchable,
    style ? style.Touchable : {},
  ];
  const customButtonGradient = [
    Styles.ButtonGradient,
    style ? styles.GradientButton : {},
  ];
  const customButtonText = [Styles.ButtonText, style ? styles.ButtonText : {}];
  return (
    <TouchableOpacity style={customTouchableStyle} onPress={onPress}>
      <LinearGradient
        useAngle={true}
        angle={-120}
        style={customButtonGradient}
        colors={[Colors.header_grad_one, Colors.header_grad_two]}>
        <DmzText text={text} type={3} style={customButtonText} />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  ButtonTouchable: {
    width: '75%',
    alignSelf: 'center',
    marginVertical: 80,
    borderRadius: 20,
    elevation: 10,
  },
  ButtonGradient: {
    padding: 10,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {color: '#f1f1f1'},
});
export default GradientButton;
