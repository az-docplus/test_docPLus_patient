import React from 'react';
import {View} from 'react-native';
import RadioBtnV2 from '../../atoms/RadioBtn/RadioBtnV2';

function RadioGroupV2({
  Item = [],
  horizontal,
  activeKey,
  setActiveKey,
  style = {},
}) {
  return (
    <View
      style={{
        flexDirection: horizontal && 'row',
        flexWrap: horizontal && 'wrap',
        justifyContent: 'space-between',
        ...style,
      }}>
      {Item.map((item) =>
        item ? (
          <RadioBtnV2
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

export default RadioGroupV2;
