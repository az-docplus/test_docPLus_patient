import React from 'react';
import {View, StyleSheet} from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
/**
 *
 * @param {Number} type 1=>minus 2=>plus
 */

function CounterButton({type, style, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[Styles.Container, style ? style : null]}>
        <Antdesign
          name={type === 1 ? 'minus' : 'plus'}
          color="#fff"
          size={12}
        />
      </View>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  Container: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: '#F4C130',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CounterButton;
