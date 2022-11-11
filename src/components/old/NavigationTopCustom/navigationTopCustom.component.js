import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import RoundedImageHolder from '../RoundedImageHolder/roundedImageHolder.component';

function NavigationTopCustom({onBackPress, onHamPress, theme, ProfileNavPic}) {
  return (
    <View style={NavigationTopCustomStyles.Container}>
      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 20,
        }}
        onPress={onBackPress}>
        {!ProfileNavPic ? (
          <Image
            source={
              theme === 'dark'
                ? require('../../../assets/png/backButton-dark.png')
                : require('../../../assets/png/backButton.png')
            }
            style={NavigationTopCustomStyles.BackButton}
          />
        ) : (
          ProfileNavPic
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 20,
        }}
        onPress={onHamPress}>
        <Image
          source={
            theme === 'dark'
              ? require('../../../assets/png/hamburger-dark.png')
              : require('../../../assets/png/hamburger.png')
          }
          style={NavigationTopCustomStyles.HamburgerButton}
        />
      </TouchableOpacity>
    </View>
  );
}

const NavigationTopCustomStyles = StyleSheet.create({
  Container: {
    top: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },
  BackButton: {height: 20},
  HamburgerButton: {height: 20, width: 20},
});
export default NavigationTopCustom;
