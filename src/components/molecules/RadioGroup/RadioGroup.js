import React from 'react';
import {View} from 'react-native';
import RadioBtn from '../../atoms/RadioBtn/RadioBtn';

function RadioGroup({Item = [], horizontal, activeKey, setActiveKey}) {
  return (
    <View
      style={{
        flexDirection: horizontal && 'row',
        flexWrap: horizontal && 'wrap',
      }}>
      {Item.map((item) =>
        item ? (
          <RadioBtn
            key={item.id}
            keyName={item.id}
            value={item.value}
            active={activeKey === item.id}
            setKeyName={setActiveKey}
          />
        ) : null,
      )}
    </View>
  );
}

export default RadioGroup;
