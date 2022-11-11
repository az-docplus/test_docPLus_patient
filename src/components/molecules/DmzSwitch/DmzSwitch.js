import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  InteractionManager,
  Easing,
  Platform,
  UIManager,
} from 'react-native';
import DmzButton from '../../atoms/SwitchButton/SwitchButton';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function DmzSwitch({tabOne, tabTwo, style}) {
  const [tabIndex, settabIndex] = useState(0);
  const tabIndexPos = useRef(new Animated.Value(0)).current;
  const onTabPress = function(tab, callback) {
    if (tabIndex === 0 && tab === 2) {
      InteractionManager.runAfterInteractions(() => {
        Animated.timing(tabIndexPos, {
          toValue: 1,
          easing: Easing.elastic(),
          duration: 500,
          useNativeDriver: false,
        }).start(() => {
          settabIndex(1);
          callback();
        });
      });
    }
    if (tabIndex === 1 && tab === 1) {
      InteractionManager.runAfterInteractions(() => {
        Animated.timing(tabIndexPos, {
          toValue: 0,
          easing: Easing.elastic(),
          duration: 500,
          useNativeDriver: false,
        }).start(() => {
          settabIndex(0);
          callback();
        });
      });
    }
  };
  const onTabPressOne = () => {
    onTabPress(1, tabOne.onPress);
  };
  const onTabPressTwo = () => {
    onTabPress(2, tabTwo.onPress);
  };
  return (
    <View style={[Styles.Container, style ? style.Container : null]}>
      <DmzButton
        onPress={onTabPressOne}
        text={tabOne.title}
        icon={tabOne.icon}
        style={{
          Container: [Styles.ButtonContainer, style ? style.Button : null],
          Text: tabIndex === 0 ? (style ? style.activeStyle : null) : null,
        }}
      />
      <DmzButton
        text={tabTwo.title}
        style={{
          Container: [Styles.ButtonContainer, style ? style.Button : null],
          Text: tabIndex === 1 ? (style ? style.activeStyle : null) : null,
        }}
        icon={tabTwo.icon}
        onPress={onTabPressTwo}
      />
      <Animated.View
        style={[
          Styles.Slider,
          {
            left: tabIndexPos.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '50%'],
            }),
          },
          style ? style.Slider : null,
        ]}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    // borderWidth: 2,
    // borderColor: '#C4C4C4',
    borderRadius: 50,
    flexDirection: 'row',
    position: 'relative',
  },
  ButtonContainer: {
    height: 50,
    width: '50%',
    padding: 10,
    borderRadius: 40,
  },
  Slider: {
    position: 'absolute',
    height: '100%',
    width: '50%',
    borderWidth: 2,
    borderRadius: 40,
    left: '0%',
    borderColor: '#4099A6',
  },
});

export default DmzSwitch;
