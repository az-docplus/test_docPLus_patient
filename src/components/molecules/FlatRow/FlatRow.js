import React, {useRef, useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import IndicatorDot from '../../atoms/IndicatorDot/IndicatorDot';

function FlatRow({children, flatprop}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!children.length) {
    children = [children];
  }
  return (
    <View style={Styles.Container}>
      <ScrollView
        {...flatprop}
        horizontal={true}
        contentContainerStyle={{
          margin: 5,
          padding: 10,
          justifyContent: 'space-around',
        }}
        snapToInterval={180}
        scrollEventThrottle={1}
        onScroll={e => {
          setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / 180));
        }}>
        {children}
      </ScrollView>
      <View style={Styles.IndicatorContainer}>
        {children.map((item, index) => (
          <IndicatorDot
            key={`${item}${index}`}
            isActive={index === currentIndex}
          />
        ))}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    width: '100%',
    padding: 10,
  },
  IndicatorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginTop: 5,
  },
});
export default FlatRow;
