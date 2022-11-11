import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Colors} from '../../../styles/colorsV2';
import {useSelector, useDispatch} from 'react-redux';


/**
 *
 * @param {text} param0
 * * @param {children} param1
 * * * @param {type of the text} param2
 * * * * @param {weight of the font} param3
 * * * * * @param {custom styles} param4
 */

const DmzText = (props) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const size = [8, 10, 12, 15, 20, 30, 40];
  const weight = [300, 500, 700, 800, 900];

  const {
    text = '',
    type = 2,
    _weight = 1,

    center,

    gap_small,
    gap_medium,
    gap_big,

    lite,
    normal,
    semi_bold,
    bold,
    extera_bold,

    children,
    style,
    viewStyle,
    numberOfLines,
    adjustsFontSizeToFit = false,
  } = props;

  const customStyles = [
    Styles.Container,
    center && Styles.centerText,

    gap_small && {letterSpacing: 0.5},
    gap_medium && {letterSpacing: 0.75},
    gap_big && {letterSpacing: 1},

    lite && {fontWeight: weight[0].toString()},
    normal && {fontWeight: weight[1].toString()},
    semi_bold && {fontWeight: weight[2].toString()},
    bold && {fontWeight: weight[3].toString()},
    extera_bold && {fontWeight: 'bold'},

    {fontSize: size[type]},
    style,
  ];

  return (
    <View style={[{flexDirection: 'row'}, viewStyle ? viewStyle : null]}>
      <Text
        adjustsFontSizeToFit={adjustsFontSizeToFit}
        style={customStyles}
        numberOfLines={numberOfLines}>
        {text}
      </Text>
      {children}
    </View>
  );
};

const Styles = StyleSheet.create({
  Container: {
    // fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 30,
    // color: Colors.primary_text_color[theme],
    fontFamily: 'Montserrat-Regular',
    // textTransform: 'capitalize',
  },
  centerText: {textAlign: 'center'},
});
export default DmzText;
