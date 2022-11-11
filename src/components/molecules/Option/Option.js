import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import DmzText from '../../atoms/DmzText/DmzText';
import {
  BIG_ICON_SIZE,
  LITE_ICON_SIZE,
  SMALL_ICON_SIZE,
  MEDIUM_ICON_SIZE,
} from '../../../styles/size';
import {MAIN_ICON, SECONDARY_ICON} from '../../../styles/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

/**
 *
 * @param {icon name from 'MaterialCommunityIcons'} param0
 * * @param {name of the option} param1
 * * * @param { click event handle method } param2
 * * * * @param { font size of the option text } param3
 * * * * * @param { active option = true } param4
 */

const Option = props => {
  const {
    icon = 'book',
    name = 'no option',
    goto = () => {
      console.log('no callback!!');
    },
    fontSize = 3,
    active = false,
    navigateTo,
    activeItemKey,
  } = props;

  console.log('.....................');
  console.log(props);
  const focusActive = activeItemKey === navigateTo;
  return (
    <TouchableOpacity
      style={[
        styles.flex,
        styles.container,
        styles.AlignCenter,
        !active ? {opacity: 0.5} : {opacity: 1},
        focusActive ? styles.activeFocus : {},
      ]}
      onPress={() => goto()}
      disabled={!active}>
      <DmzText
        text={name}
        type={fontSize}
        normal
        gap_small
        style={{color: focusActive ? MAIN_ICON : '#555'}}
      />
      <MaterialIcon
        name={icon}
        size={MEDIUM_ICON_SIZE}
        style={styles.icon}
        color={focusActive ? MAIN_ICON : SECONDARY_ICON}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  AlignCenter: {alignItems: 'center'},
  container: {
    padding: 10,
    // marginLeft: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeFocus: {
    backgroundColor: 'rgba(163, 94, 247,0.2)',
  },
  icon: {
    marginRight: 5,
  },
});

export default Option;
