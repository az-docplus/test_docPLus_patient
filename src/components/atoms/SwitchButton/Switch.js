import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native-animatable';
import { WHITE, BLACK, PRIMARY, BACKGROUND} from '../../../styles/colors'

const Switch = props => {
  const [isNow, setNow] = useState(true);

  const hadnelTougle = () => {
    console.log('fine')
    setNow(!isNow)
    props.onClick();
  }
  
  return (
    <View
      style={[
        switchs.container,
        props.style,
        props.mode && {
          backgroundColor:WHITE
        },
        isNow
          ? {flexDirection: 'row', width: props.option1.length * 12.5}
          : {
              flexDirection: 'row-reverse',
              width: props.option2.length * 14.5,
              backgroundColor: BACKGROUND,
              borderWidth: 2,
              borderColor: PRIMARY,
            },
      ]}>
      <TouchableOpacity
        onPress={() => hadnelTougle()}
        style={[
          switchs.pointer,
          !isNow && {backgroundColor: PRIMARY},
          props.mode && { backgroundColor: PRIMARY}
        ]}></TouchableOpacity>
      <Text
        style={[
          {
            color: '#fff',
            marginHorizontal: 2,
            fontSize: 14,
            fontWeight: 'bold',
            letterSpacing: 0.1,
            textTransform: 'capitalize',
          },
          !isNow && {color: PRIMARY},
          props.mode && { color: PRIMARY}
        ]}>
        {isNow ? props.option1 || 'now' : props.option2 ||'schedule'}
      </Text>
    </View>
  );
};

const switchs = StyleSheet.create({
  container: {
    margin: 5,
    // width: 70,
    height: 28,
    borderRadius: 100,
    backgroundColor: PRIMARY,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {},
  pointer: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    borderRadius: 100,
    margin: 3,
    marginLeft: 5
  },
});

export default Switch;























