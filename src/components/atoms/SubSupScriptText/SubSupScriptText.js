import React from 'react';
import {Text, StyleSheet} from 'react-native';

function SubSupScriptText({type = 'sup', text, style}) {
  const filteredStyle =
    type === 'sup'
      ? {...style, lineHeight: 18}
      : {
          ...style,
          lineHeight: 37,
        };

  return <Text style={[Styles.supScript, {...filteredStyle}]}>{text}</Text>;
}

const Styles = StyleSheet.create({
  supScript: {
    fontWeight: 'bold',
    fontSize: 8,
  },
});

export default SubSupScriptText;
