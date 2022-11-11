import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CounterButton from '../../atoms/CounterButton/CounterButton';
import DmzText from '../../atoms/DmzText/DmzText';
function Counter() {
  const [value, setValue] = useState(0);
  const onInc = () => {
    setValue(value + 1);
  };
  const onDec = () => {
    if (value > 0) setValue(value - 1);
  };
  return (
    <View style={Styles.Container}>
      <CounterButton type={1} onPress={onDec} />
      <View style={Styles.LabelContainer}>
        <DmzText
          text={value}
          lite
          gap_small
          style={{color: '#666', fontSize: 14}}
        />
      </View>
      <CounterButton type={0} onPress={onInc} />
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  LabelContainer: {
    alignSelf: 'flex-end',
    width: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
});
export default Counter;
