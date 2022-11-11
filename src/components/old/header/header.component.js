import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Text, useWindowDimensions} from 'react-native';
import NavigationTopCustom from '../NavigationTopCustom/navigationTopCustom.component';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TopIdelnavbar from '../../organisms/TopNavbar/TopIdelnavbar';

function Header({ProfileNavPic, children, style, hideOverlay, navigation}) {
  const dimen = useWindowDimensions();
  useEffect(() => {
    // navigation.openDrawer();
  });
  return (
    <View
      style={[
        HeaderStyles.Container,
        {height: dimen.height * 0.4},
        style ? style.Container : null,
      ]}>
      {hideOverlay ? null : (
        <>
          <Image
            source={require('../../../assets/png/overlay-left.png')}
            style={HeaderStyles.LeftOverlay}
          />
          <Image
            source={require('../../../assets/png/overlay-right.png')}
            style={HeaderStyles.RightOverlay}
          />
        </>
      )}
      <Image
        source={require('../../../assets/png/semicirclepink.png')}
        style={HeaderStyles.SemiPink}
      />
      <Image
        source={require('../../../assets/png/semicircleblue.png')}
        style={HeaderStyles.SemiBlue}
      />
      <Image
        source={require('../../../assets/png/squareping.png')}
        style={HeaderStyles.SquarePink}
      />
      <Image
        source={require('../../../assets/png/squareblue.png')}
        style={HeaderStyles.SquareBlue}
      />

      {/* <View onPress={() => navigation.openDrawer()}>
        <NavigationTopCustom
          onBackPress={() => console.log('back..')}
          //   ProfileNavPic={ProfileNavPic}
          navigation={navigation.navigation}
        />
      </View> */}

      <TopIdelnavbar navigation={navigation} />
      <View
        style={[
          HeaderStyles.ContentContainer,
          style ? style.ChildContainer : null,
        ]}>
        {!children ? (
          <>
            <Text style={HeaderStyles.SecondaryText}>Total balance</Text>
            <Text style={HeaderStyles.PrimaryText}>$12,698</Text>
          </>
        ) : (
          children
        )}
      </View>
    </View>
  );
}

const HeaderStyles = StyleSheet.create({
  Container: {
    width: '100%',
    backgroundColor: '#6E21D1',
    borderBottomRightRadius: 38,
    borderBottomLeftRadius: 38,
    position: 'relative',
  },
  LeftOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -10,
  },
  RightOverlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: -10,
  },
  SemiBlue: {
    position: 'absolute',
    top: '50%',
    right: '6%',
  },
  SemiPink: {
    position: 'absolute',
    top: '40%',
    left: '6%',
  },
  SquareBlue: {
    position: 'absolute',
    top: '20%',
    left: '30%',
  },
  SquarePink: {
    position: 'absolute',
    top: '15%',
    right: '30%',
  },
  ContentContainer: {
    alignSelf: 'center',
    top: '30%',
  },
  SecondaryText: {
    color: '#d1d1d1',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 5,
  },
  PrimaryText: {
    color: '#fefefe',
    textAlign: 'center',
    fontSize: 38,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
export default Header;
