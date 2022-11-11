import React from 'react';
import { Animated, StyleSheet, Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { PRIMARY, NEW_HEADER_TEXT } from '../../../styles/colors';
import { Colors } from '../../../styles/colorsV2';

import DmzText from '../../atoms/DmzText/DmzText';
import Entypo from 'react-native-vector-icons/Entypo';
import { color } from 'react-native-reanimated';
function TopNavBar({
  onLeftButtonPress = () => navigation.goBack(),
  onRightButtonPress = () => navigation.openDrawer(),
  headerText,
  LeftComp,
  RightComp,
  navigation,
  style,
  hideRightComp,
  hideLeftComp,
}) {
  const { theme } = useSelector((state) => state.AuthReducer);
  return (
    <Animated.View
      style={[
        Styles.Container,
        { backgroundColor: Colors.secondary_background[theme] },

        hideLeftComp && hideRightComp ? { justifyContent: 'center' } : null,
        style ? style.Container : null,
      ]}>
      {!hideLeftComp && (
        <TouchableOpacity
          style={Styles.TouchableOpacity}
          onPress={onLeftButtonPress}>
          {!LeftComp ? (
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 15,
                // padding: 8,
              }}>
              <Entypo name="chevron-thin-left" size={27} />
            </View>
          ) : (
            // <Image
            //   source={require('../../../assets/icons/Back2.png')}
            //   style={[Styles.BackButton, style ? style.BackButton : null]}
            // />

            LeftComp
          )}
        </TouchableOpacity>
      )}
      <DmzText
        text={headerText}
        numberOfLines={1}
        // adjustsFontSizeToFit
        style={[
          {
            fontSize: 25,
            color: '#297281',
            // color: Colors.primary_text_color[theme],
            //alignSelf: 'center',
            // justifyContent:'center',
            textAlign: 'center',
            fontFamily: 'Gilroy-SemiBold',
            //marginLeft: 24,\
            // marginRight: 110,
          },
          style ? style.Header : null,
        ]}
      />
      <View
        style={{
          width: '15%',
        }}
      />
      {/* <Entypo name="chevron-thin-left" size={27} /> */}

      {/* <Entypo name="chevron-thin-left" size={25} color="#fff" /> */}
      {/* {!hideRightComp ? (
        <TouchableOpacity
          style={Styles.TouchableOpacity}
          // onPress={() => onRightButtonPress()}>
          onPress={() => onRightButtonPress()}>
          {!RightComp ? (
            <Image
              source={require('../../../assets/icons/hamburger_menu.png')}
              style={[
                Styles.HamburgerButton,
                style ? style.HamburgerButton : null,
              ]}
            />
          ) : (
            RightComp
          )}
        </TouchableOpacity>
      ) : (
        <View />
      )} */}
    </Animated.View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    zIndex: 900,

    // marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: '2%',
    // paddingTop: 10,
    // paddingVertical: 10,
    elevation: 5,
  },
  TouchableOpacity: {
    // borderRadius: 20,
  },
  BackButton: { height: 19, width: 10 },
  HamburgerButton: { height: 19, width: 24 },
});
export default TopNavBar;
