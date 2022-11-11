import React, {useRef, useState} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Text,
  Easing,
  Platform,
  UIManager,
  LayoutAnimation,
  Switch,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import DmzText from '../../atoms/DmzText/DmzText';
import {
  BIG_ICON_SIZE,
  LITE_ICON_SIZE,
  SMALL_ICON_SIZE,
  MEDIUM_ICON_SIZE,
} from '../../../styles/size';
import {
  MAIN_ICON,
  SECONDARY_ICON,
  PRIMARY_COLOR,
  HEADER_TEXT,
} from '../../../styles/colors';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import {Colors} from '../../../styles/index';

/**
 *
 * @param {icon name from 'MaterialCommunityIcons'} param0
 * * @param {name of the option} param1
 * * * @param { click event handle method } param2
 * * * * @param { font size of the option text } param3
 * * * * * @param { active option = true } param4
 */

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const ExpandableOption = (props) => {
  const [showContent, setShowContent] = useState(false);
  const onClick = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowContent(!showContent);
  };

  const [calenderEnabled, setCalendarEnabled] = useState(false);
  const calendarSwitch = () =>
    setCalendarEnabled((previousState) => !previousState);

  const [callEnabled, setCallEnabled] = useState(false);
  const callSwitch = () => setCallEnabled((previousState) => !previousState);

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
    isNested,
    nestedRoutes,
    navigation,
    type1 = true,
    logOut,
  } = props;

  console.log('.....................');
  // console.log(props);
  return (
    <View style={styles.Wrapper}>
      <TouchableOpacity
        style={[
          styles.flex,
          styles.container,
          styles.AlignCenter,
          !active ? {opacity: 0.5} : {opacity: 1},
        ]}
        onPress={isNested ? onClick : goto}
        disabled={!active}>
        <DmzText
          text={name}
          type={fontSize}
          // normal
          gap_small
          style={{
            color: showContent && isNested ? '#007E96' : PRIMARY_COLOR,
            fontSize: 18,
          }}
        />
        {type1 ? (
          <MaterialIcon
            name={icon}
            size={BIG_ICON_SIZE}
            style={styles.icon}
            color={showContent && isNested ? '#007E96' : PRIMARY_COLOR}
          />
        ) : (
          <Icons
            name={icon}
            size={BIG_ICON_SIZE}
            style={styles.icon}
            color={showContent && isNested ? '#007E96' : PRIMARY_COLOR}
          />
        )}
      </TouchableOpacity>
      {showContent ? (
        name == 'Reminders' ? (
          <View style={styles.nestedContainer}>
            {nestedRoutes &&
              nestedRoutes.map((row, index) => {
                const isEnabled =
                  row.name == 'Call Reminders' ? callEnabled : calenderEnabled;
                const toggleSwitch =
                  row.name == 'Call Reminders'
                    ? setCallEnabled
                    : setCalendarEnabled;
                return (
                  <View
                    key={`${row.navigateTo}${index}`}
                    style={styles.nestedOption}>
                    <Text style={{color: PRIMARY_COLOR, fontSize: 16}}>
                      {row.name}
                    </Text>
                    <Switch
                      trackColor={{false: '#767577', true: HEADER_TEXT}}
                      thumbColor={isEnabled ? PRIMARY_COLOR : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                );
              })}
          </View>
        ) : (
          <View style={styles.nestedContainer}>
            {nestedRoutes &&
              nestedRoutes.map((row, index) => {
                return (
                  <TouchableOpacity
                    key={`${row.navigateTo}${index}`}
                    onPress={
                      row.name == 'Logout'
                        ? () => {
                            logOut();
                            setShowContent(false);
                          }
                        : () => navigation.navigate(row.navigateTo)
                    }
                    style={styles.nestedOption}>
                    <Text style={{color: PRIMARY_COLOR, fontSize: 16}}>
                      {row.name}
                    </Text>
                    <MaterialIcon name="chevron-right" size={22} />
                  </TouchableOpacity>
                );
              })}
          </View>
        )
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  AlignCenter: {alignItems: 'center'},
  Wrapper: {backgroundColor: '#E9E5FF', overflow: 'hidden'},
  container: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nestedContainer: {
    width: '80%',
    marginLeft: 50,
  },
  nestedOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.19,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#ccc',
  },
  icon: {
    marginRight: 5,
  },
});

export default ExpandableOption;
