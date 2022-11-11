import React from 'react';
import {View, StyleSheet} from 'react-native';
import BlockLinker from '../BlockLinker/BlockLinker';
import File from '../../../assets/svg/file.svg';

/**
 *
 * @param {Number} type {0:up,1:down,2:both}
 * @param {String} linkColor color of linker
 * @param {Node} blockIcon
 * @param {Node} children
 * @param {Object} style custom styles
 */

function LinkedComponent({type, linkColor, blockIcon, children, style}) {
  const customContainerStyle = [
    Styles.LinkedComponentContainer,
    style && (style.Container || {}),
  ];
  return (
    <View style={customContainerStyle}>
      <BlockLinker
        type={type}
        linkColor={linkColor}
        style={style && (style.BlockLinker || {})}>
        {blockIcon || <File height={24} width={24} />}
      </BlockLinker>
      <View style={Styles.ChildContainer}>{children}</View>
    </View>
  );
}

const Styles = StyleSheet.create({
  LinkedComponentContainer: {
    flexDirection: 'row',
    height: 80,
  },
  ChildContainer: {
    marginLeft: 15,
    width: '80%',
  },
});

export default LinkedComponent;
