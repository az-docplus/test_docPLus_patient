import React from 'react';
import {View, StyleSheet} from 'react-native';
import Linker from '../../atoms/Linker/Linker';

/**
 * @param {Number} type {0:up,1:down,2:both}
 * @param {String} linkColor color of linker
 * @param {Object} style custom style
 * @param {node} children children
 */

function BlockLinker({type, linkColor, style, children}) {
  const customStyleContainer = [
    Styles.Container,
    style ? style.Container : null,
  ];
  return (
    <View style={customStyleContainer}>
      <Linker type={type} linkColor={linkColor} />
      {children}
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    height: '100%',
    width: 60,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BlockLinker;
