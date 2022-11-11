import React, {useRef} from 'react';
import {View, StyleSheet, useWindowDimensions, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../styles/index';
import Overlay_circle from '../../../assets/svg/header_overlay_circle.svg';
import Header_curve from '../../../assets/svg/header_curve.svg';
import Overlay_gradient from '../../../assets/svg/header_overlay_gradient.svg';
import Overlay_plus from '../../../assets/svg/header_overlay_plus.svg';
import Overlay_tablet from '../../../assets/svg/header_overlay_tablet.svg';
import Overlay_tri from '../../../assets/svg/header_overlay_tri.svg';
import Overlay_tri_hollow from '../../../assets/svg/header_overlay_tri_hollow.svg';
import TopNavBar from '../../molecules/TopNavBar/TopNavBar';

function CollapsibleFancyHeader({
  navigation,
  leftButtonClick = () => navigation.goBack(null),
  LeftComp,
  RightComp,
  headerText,
  children,
  style,
  HeaderMax,
  HeaderMin,
  animatedHeight,
  animatedTop,
  //   navigation,
}) {
  return (
    <Animated.View
      style={{
        height: animatedHeight,
        overflow: 'hidden',
      }}>
      <LinearGradient
        colors={[Colors.header_grad_one, Colors.header_grad_two]}
        useAngle={true}
        angle={-180}
        style={[HeaderStyles.Container, style ? style.Container : null]}>
        <TopNavBar
          navigation={navigation}
          LeftComp={LeftComp}
          RightComp={RightComp}
          headerText={headerText || ''}
          style={{
            marginTop: animatedTop,
          }}
          // onRightButtonPress={() => navigation.openDrawer()}
        />

        <Overlay_circle
          style={[
            HeaderOverlayStyles.common,
            HeaderOverlayStyles.Overlay_circle,
          ]}
        />
        <Header_curve
          style={[HeaderOverlayStyles.common, HeaderOverlayStyles.Header_curve]}
        />
        <Overlay_gradient
          style={[
            HeaderOverlayStyles.common,
            HeaderOverlayStyles.Overlay_gradient,
          ]}
        />
        <Overlay_plus
          style={[HeaderOverlayStyles.common, HeaderOverlayStyles.Overlay_plus]}
        />
        <Overlay_tablet
          style={[
            HeaderOverlayStyles.common,
            HeaderOverlayStyles.Overlay_tablet,
          ]}
        />
        <Overlay_tri
          style={[HeaderOverlayStyles.common, HeaderOverlayStyles.Overlay_tri]}
        />
        <Overlay_tri_hollow
          style={[
            HeaderOverlayStyles.common,
            HeaderOverlayStyles.Overlay_tri_hollow,
          ]}
        />

        <View
          style={[
            HeaderStyles.ContentContainer,
            style ? style.ChildContainer : null,
          ]}>
          {children ? children : null}
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const HeaderStyles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#6E21D1', //fallback to gradient
    position: 'relative',
    overflow: 'hidden',
  },
  ContentContainer: {
    alignSelf: 'center',
    top: '20%',
  },
});

const HeaderOverlayStyles = StyleSheet.create({
  common: {
    position: 'absolute',
    opacity: 0.75,
  },
  Overlay_circle: {
    bottom: '30%',
    left: '20%',
  },
  Header_curve: {
    top: 0,
    right: 0,
  },
  Overlay_gradient: {
    top: 0,
    left: 0,
    opacity: 0.98,
  },
  Overlay_plus: {
    left: '40%',
    top: '20%',
  },
  Overlay_tablet: {
    right: '5%',
    bottom: '30%',
  },
  Overlay_tri: {
    top: '5%',
    right: '25%',
  },
  Overlay_tri_hollow: {
    top: '25%',
    left: '5%',
  },
});
export default CollapsibleFancyHeader;
