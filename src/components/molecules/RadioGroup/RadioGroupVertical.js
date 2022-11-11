import React from 'react';
import {View} from 'react-native';
import RadioBtnVertical from '../../atoms/RadioBtn/RadioBtnVertical';

function RadioGroupVertical({Item = [], activeKey, setActiveKey, style = {}}) {
  return Item.map((item) =>
    item ? (
      <RadioBtnVertical
        key={item.id}
        keyName={item.id}
        value={item.value}
        active={activeKey === item.id}
        setKeyName={setActiveKey}
      />
    ) : null,
  );
}

export default RadioGroupVertical;
