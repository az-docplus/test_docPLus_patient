/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {floor} from 'lodash';
import {NEW_PRIMARY_COLOR, INACTIVE_STEP} from '../../../styles/colors';

export default function StepsTracker({
  text,
  completed,
  // mode = [25, 50, 75, 100],
  mode = [50, 100],
  style,
}) {
  return (
    <View
      style={[
        {width: '80%', alignSelf: 'center', marginTop: 5},
        style ? style : null,
      ]}>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{fontSize: 24, fontFamily: 'Montserrat-Regular'}}>
        {text}
      </Text>
      <View style={{marginTop: 15, flexDirection: 'row'}}>
        {mode.map((no) => (
          <View
            style={[
              styles.indicator,
              {
                backgroundColor:
                  no <= completed ? NEW_PRIMARY_COLOR : INACTIVE_STEP,
                marginRight: no == 100 ? 0 : 10,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    height: 5,
    borderRadius: 5,
  },
});
