import React, {useRef} from 'react';
import {View, ScrollView, Animated} from 'react-native';
import CollapsibleFancyHeader from '../../../components/organisms/CollapsibleFancyHeader/CollapsibleFancyHeader';
import DmzText from '../../../components/atoms/DmzText/DmzText';

function Collapsible() {
  const translateHeader = useRef(new Animated.Value(0)).current;
  const HEADER_MAX =200;
  const HEADER_MIN = 50;
  const headerScrollYOffset = HEADER_MAX - HEADER_MIN;
  const animatedHeight = translateHeader.interpolate({
    inputRange: [0, headerScrollYOffset],
    outputRange: [HEADER_MAX, HEADER_MIN],
    extrapolate: 'clamp',
  });
  const animatedTop = translateHeader.interpolate({
    inputRange: [0, headerScrollYOffset],
    outputRange: [30, 0],
    extrapolate: 'clamp',
  });
  return (
    <View style={{flex: 1}}>
      <CollapsibleFancyHeader
        animatedHeight={animatedHeight}
        animatedTop={animatedTop}
      />
      <ScrollView
        onScroll={Animated.event([
          {
            nativeEvent: {contentOffset: {y: translateHeader}},
          },
        ])}
        scrollEventThrottle={16}>
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="something else" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
        <DmzText text="just testing" type={4} normal />
      </ScrollView>
    </View>
  );
}

export default Collapsible;
