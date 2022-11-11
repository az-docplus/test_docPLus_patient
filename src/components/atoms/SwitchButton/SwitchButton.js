import React from 'react';
import { StyleSheet, Text, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

function DmzButton({
  text,
  icon = false,
  iconPosition,
  theme,
  onPress,
  style,
  disabled = false,
}) {
  return (
    <Animated.View style={[Styles.Container, style ? style.Container : null]}>
      <LinearGradient colors={['#2D7D8E', '#246370']} style={Styles.gradient}>
        <TouchableOpacity
          disabled={disabled}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '100%',
            width: '100%',
          }}
          onPress={onPress}>
          {icon && iconPosition === 'left' ? icon : null}
          <Text
            style={[
              Styles.Text,
              { color: theme === 'dark' ? '#fff' : '#000' },
              style ? style.Text : null,
            ]}>
            {text}
          </Text>
          {icon && iconPosition === 'right' ? icon : null}
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    height: 50,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  Text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});

export default DmzButton;
