import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Platform,
  UIManager,
  Easing,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { FONT_SIZE_19 } from '../../../styles/typography';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const ExpandableList = ({ children, title, style }) => {
  const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcon);
  const HeightExpand = useRef(new Animated.Value(0)).current;
  const [expandedHeight, setExpandedHeight] = useState(0);
  const onLayout = (e) => {
    setExpandedHeight(e.nativeEvent.layout.height);
  };
  const [showContent, setShowContent] = useState(false);
  const onToggleExpand = () => {
    setShowContent(!showContent);
    Animated.timing(HeightExpand, {
      delay: 200,
      easing: Easing.bounce,
      duration: 1000,
      useNativeDriver: false,
      toValue: showContent ? 0 : 1,
    }).start();
  };
  return (
    <View
      style={{
        backgroundColor: '#fff',
        elevation: 0,
        paddingVertical: '5%',
        paddingHorizontal: '8%',
        marginBottom: 5,
        borderBottomWidth: 1.5,
        borderBottomColor: 'rgba(0,0,0,0.1)',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{ fontSize: FONT_SIZE_19, fontFamily: "Montserrat-SemiBold" }}>
          {title}
        </Text>
        <TouchableWithoutFeedback onPress={onToggleExpand}>
          <AnimatedIcon
            style={{
              transform: [
                {
                  rotate: HeightExpand.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', showContent ? '-180deg' : '0deg'],
                  }),
                },
              ],
            }}
            name={'chevron-down'}
            size={30}
            color={'#43A2A2'}
          />
        </TouchableWithoutFeedback>
      </View>

      {showContent && (
        <Animated.View
          style={{
            height: HeightExpand.interpolate({
              inputRange: [0, 1],
              outputRange: [0, expandedHeight],
            }),
            marginTop: HeightExpand.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 30],
            }),
            overflow: 'hidden',
          }}>
          <View onLayout={onLayout} style={style ? style : {}}>
            {children}
          </View>
        </Animated.View>
      )}
    </View>
  );
};
export default ExpandableList;
