import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  BACKGROUND,
  PRIMARY,
  SECONDARY,
  PRIMARY_BORDER_COLOR,
} from '../../../styles/colors';

const SMbutton = ({name, active, id = 0, onClick, style}) => {
  return (
    <TouchableOpacity
      style={[Sstyle.button, active === id ? Sstyle.active : null, style]}
      onPress={() => onClick(id)}>
      <Text
        style={[
          {
            textAlign: 'center',
            color: PRIMARY_BORDER_COLOR,
            textTransform: 'lowercase',
          },
          active === id && {color: '#fff'},
        ]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const Sstyle = StyleSheet.create({
  button: {
    height: 30,
    width: 100,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: PRIMARY_BORDER_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    fontWeight: '300',
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: PRIMARY,
    borderWidth: 0,
  },
});

export default SMbutton;
