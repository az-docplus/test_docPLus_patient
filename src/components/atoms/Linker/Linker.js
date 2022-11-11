import React from 'react';
import {View, StyleSheet} from 'react-native';
import {hextorgba} from '../../../utils/hextorgba';
/**
 * @param {Number} type {0:up,1:down,2:both}
 * @param {String} linkColor color of the link
 * @param {Object} style styles for the linker
 */

function Linker({type = 1, linkColor = '#000', style}) {
  const linkColorLight = hextorgba(linkColor, 0.55);
  const customLinkerContainerStyle = [
    Styles.LinkerContainer,
    style ? style.LinkerContainer : null,
  ];
  const customLinkerUpStyle = [
    Styles.Linker,
    style ? style.Linker : null,
    {
      backgroundColor:
        type === 0 || type === 2 ? linkColorLight : 'transparent',
    },
  ];
  const customLinkerDownStyle = [
    Styles.Linker,
    style ? style.Linker : null,
    {
      backgroundColor:
        type === 1 || type === 2 ? linkColorLight : 'transparent',
    },
  ];
  const customDotStyle = [
    Styles.Dot,
    style ? style.Dot : null,
    {backgroundColor: linkColor},
  ];
  return (
    <View style={customLinkerContainerStyle}>
      <View style={customLinkerUpStyle} />
      <View style={customDotStyle} />
      <View style={customLinkerDownStyle} />
    </View>
  );
}
const Styles = StyleSheet.create({
  LinkerContainer: {
    height: '100%',
    position: 'absolute',
    right: 0,
    alignItems: 'center',
  },
  Dot: {
    height: 8,
    width: 8,
    borderRadius: 8,
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -5}],
  },
  Linker: {
    width: 2,
    height: '50%',
  },
});

export default Linker;
