import React from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ACTIVE, DEACTIVE} from '../../../styles/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ICON_SIZE = 25;

/**
 *
 * @param {active option} param0
 *  1-home / 2-message / 3-settings / 4-wishlist
 * @param { navigation referance} param1
 *  navigation referance
 */

function BottomNavigation({PopupTranslateY, activeOption, navigation}) {
  console.log('navigationRef: ', navigation);
  return (
    <Animated.View
      style={[
        BottomNavigationStyles.Container,
        {
          transform: [
            {
              translateY: PopupTranslateY
                ? PopupTranslateY.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                  })
                : 0,
            },
            {
              rotateX: PopupTranslateY
                ? PopupTranslateY.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  })
                : 0,
            },
          ],
        },
      ]}>
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => navigation.navigate('Home')}>
        <Icon
          name="home"
          size={ICON_SIZE}
          color={activeOption === 1 ? ACTIVE : DEACTIVE}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{padding: 10}}
        onPress={() => navigation.navigate('Consultations')}>
        <Icon
          onPress={() => console.log('click!!')}
          name="envelope"
          size={ICON_SIZE}
          color={activeOption === 2 ? ACTIVE : DEACTIVE}
        />
      </TouchableOpacity> */}
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => navigation.navigate('Setting')}>
        <Icon
          name="gear"
          size={ICON_SIZE}
          color={activeOption === 3 ? ACTIVE : DEACTIVE}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => navigation.navigate('Wishlist')}>
        <Icon
          name="heart"
          size={ICON_SIZE}
          color={activeOption === 4 ? ACTIVE : DEACTIVE}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const BottomNavigationStyles = StyleSheet.create({
  Container: {
    height: 50,
    width: '95%',
    borderRadius: 70,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 1000,
    margin: 10,
  },
});
export default React.memo(BottomNavigation);
