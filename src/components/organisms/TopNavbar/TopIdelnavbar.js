import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Avater from '../../atoms/Avater/Avater';

function TopIdelnavbar({navigation, theme, ProfileNavPic}) {
  return (
    <View style={NavigationTopCustomStyles.Container}>
      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 20,
        }}
        onPress={() => navigation.openDrawer()}>
        <Image
          source={
            theme === 'dark'
              ? require('../../../assets/png/hamburger-dark.png')
              : require('../../../assets/png/hamburger.png')
          }
          style={NavigationTopCustomStyles.HamburgerButton}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 20,
        }}
        onPress={() => console.log('walla.')}>
        <Avater type={1} src={require('../../../assets/jpg/person2.jpg')} />
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
export default TopIdelnavbar;
