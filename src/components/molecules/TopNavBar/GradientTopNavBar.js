import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import NavBackButton from '../../../assets/svg/nav_back.svg';
import NavHamButton from '../../../assets/svg/hamburger.svg';

import {PRIMARY} from '../../../styles/colors';

import DmzText from '../../atoms/DmzText/DmzText';
import Avater from '../../atoms/Avater/Avater';
import LinearGradient from 'react-native-linear-gradient';

function GradientTopNavBar({
  onLeftButtonPress = () => navigation.goBack(null),
  onRightButtonPress = () => navigation.openDrawer(),
  headerText,
  LeftComp,
  RightComp,
  navigation,
  style,
}) {
  return (
    <LinearGradient
      colors={['#fff', '#fff']}
      useAngle
      angle={0}
      style={[Styles.Container, style ? style : null]}>
      <TouchableOpacity
        style={Styles.TouchableOpacity}
        onPress={onLeftButtonPress}>
        {!LeftComp ? <NavBackButton style={Styles.BackButton} /> : LeftComp}
      </TouchableOpacity>
      <DmzText text={headerText} style={{fontSize: 20, color: '#333'}} />
      <TouchableOpacity
        style={Styles.TouchableOpacity}
        // onPress={() => onRightButtonPress()}>
        onPress={() => onRightButtonPress()}>
        {!RightComp ? <NavHamButton height={22} width={22} /> : RightComp}
      </TouchableOpacity>
    </LinearGradient>
  );
}

const Styles = StyleSheet.create({
  Container: {
    zIndex: 900,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  TouchableOpacity: {
    padding: 10,
    borderRadius: 20,
  },
  BackButton: {height: 20},
});
export default GradientTopNavBar;
