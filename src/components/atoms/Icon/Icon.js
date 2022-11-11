import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

function Icon({type, Icon, style}) {
  return (
    <View style={[IconStyles.Container, {...style}]}>
      {type === 'svg' ? Icon : <Image source={Icon.source} />}
    </View>
  );
}

const IconStyles = StyleSheet.create({
  Container: {
    minHeight: 30,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Icon;
