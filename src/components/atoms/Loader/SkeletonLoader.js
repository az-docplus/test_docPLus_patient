import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../../../styles/colorsV2';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const ITEM_HEIGHT = SCREEN_HEIGHT * 1;

export default function SkeletonLoader() {
  const {theme} = useSelector((state) => state.AuthReducer);
  return (
    <View style={[styles.container, {backgroundColor: Colors.primary_background[theme]}]}>
      <ContentLoader
        speed={1}
        width={'100%'}
        height={ITEM_HEIGHT}
        backgroundColor={Colors.skeleton_bg[theme]}
        foregroundColor="#ecebeb">
        <Rect x="12" y="15" rx="8" ry="8" width="94%" height="200" />
        <Rect x="12" y="220" rx="8" ry="8" width="94%" height="80" />
        <Rect x="12" y="305" rx="8" ry="8" width="94%" height="60" />
        {/* <Rect x="12" y="280" rx="8" ry="8" width="80%" height="30" /> */}
        <Circle cx="60" cy="423" r="40" />
        <Rect x="112" y="390" rx="10" ry="8" width="68%" height="30" />
        <Rect x="112" y="430" rx="10" ry="8" width="68%" height="30" />
        <Rect x="12" y="470" rx="8" ry="8" width="40%" height="30" />
        <Rect x="47%" y="470" rx="8" ry="8" width="50%" height="30" />
        <Circle cx="60" cy="553" r="40" />
        <Rect x="112" y="520" rx="10" ry="8" width="68%" height="30" />
        <Rect x="112" y="560" rx="10" ry="8" width="68%" height="30" />
        <Rect x="12" y="570" rx="8" ry="8" width="40%" height="30" />
        <Rect x="47%" y="570" rx="8" ry="8" width="50%" height="30" />
        
{/*         <Rect x="12" y="15" rx="8" ry="8" width="94%" height="40" />
        <Rect x="12" y="70" rx="8" ry="8" width="40%" height="30" />
        <Rect x="47%" y="70" rx="8" ry="8" width="50%" height="30" />
        <Rect x="12" y="115" rx="8" ry="8" width="80%" height="30" />
        <Circle cx="52" cy="200" r="40" />
        <Rect x="112" y="160" rx="8" ry="8" width="65%" height="30" />
        <Rect x="112" y="205" rx="8" ry="8" width="65%" height="30" />
        <Rect x="12" y="250" rx="8" ry="8" width="94%" height="30" />
        <Rect x="12" y="295" rx="8" ry="8" width="94%" height="30" /> */}
      </ContentLoader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: ITEM_HEIGHT,
    // backgroundColor: 'blue',
  },
});
