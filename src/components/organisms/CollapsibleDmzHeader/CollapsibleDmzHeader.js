import React, {useRef} from 'react';
import {StyleSheet, useWindowDimensions, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../styles/index';
import TopNavBar from '../../molecules/TopNavBar/TopNavBar';

function CollapsibleDmzHeader({
  navigation,
  leftButtonClick = () => navigation.goBack(null),
  LeftComp,
  RightComp,
  headerText,
  children,
  style,
  translateHeader,
  HeaderMax,
  HeaderMin,
  //   navigation,
}) {
  const AnimatedLinearGradient = Animated.createAnimatedComponent(
    LinearGradient,
  );
  const HEADER_MAX = HeaderMax || 200;
  const HEADER_MIN = HeaderMin || 50;
  const headerScrollYOffset = HEADER_MAX - HEADER_MIN;
  const dimen = useWindowDimensions();
  return (
    <AnimatedLinearGradient
      colors={[Colors.header_grad_one, Colors.header_grad_two]}
      useAngle={true}
      angle={-180}
      style={[
        HeaderStyles.Container,
        {
          height: translateHeader.interpolate({
            inputRange: [0, headerScrollYOffset],
            outputRange: [HEADER_MAX, HEADER_MIN],
            extrapolate: 'clamp',
          }),
          overflow: 'hidden',
        },
        style ? style.Container : null,
      ]}>
      {children ? children : null}
    </AnimatedLinearGradient>
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
});

export default CollapsibleDmzHeader;
