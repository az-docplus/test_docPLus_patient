import {
  Easing,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import { Animated } from 'react-native';
import InsetShadow from 'react-native-inset-shadow';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../../styles/colorsV2';
import { useSelector } from 'react-redux';

const AnimatedTextInput = ({
  placeholder,
  onFocus,
  value,
  onChangeText,
  error = false,
  icon = false,
  Righicon,
}) => {
  const { theme } = useSelector((state) => state.AuthReducer);
  const inputTextRefMove = useRef(new Animated.Value(0)).current;
  const inputTextRefSize = useRef(new Animated.Value(1)).current;
  const moveUp = () => {
    Animated.parallel([
      Animated.timing(inputTextRefMove, {
        toValue: -33,
        duration: 500,
        easing: Easing.elastic(),
        useNativeDriver: true,
      }),
      Animated.timing(inputTextRefSize, {
        toValue: 0.7,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  };
  return (
    <View style={{ marginBottom: 15 }}>
      <Animated.View
        style={[
          styles.animatedText,
          {
            left: icon ? 10 : 0,
            transform: [
              {
                translateY: -35,
                scale: inputTextRefSize,
                translateX: inputTextRefSize < 0.7 ? 22 : -30,
              },
            ],
          },
        ]}>
        <Text
          style={{
            marginLeft: 5,
            fontSize: 16,
            padding: 0,
            margin: 0,
            textAlignVertical: 'center',
            height: '100%',
            color: '#707585',
            fontFamily: 'Gilroy-Medium',
          }}>
          {placeholder}{' '}
          <Text style={{ color: '#F41212', position: 'absolute', top: 5 }}>
            *
          </Text>
        </Text>
      </Animated.View>
      {error && (
        <Text
          style={{
            textAlign: 'right',
            fontSize: 10,

            textAlignVertical: 'center',

            color: '#EA1A65',
            fontFamily: 'Gilroy-Medium',
          }}>
          Please enter appropriate detail
        </Text>
      )}

      <InsetShadow
        shadowOpacity={1}
        shadowOffset={15}
        containerStyle={styles.numberField}
        hadowOffset={10}
        elevation={12}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {icon && (
            <Feather
              // onPress={() => {
              //   // Keyboard.dismiss();
              //   setOpen(true);
              // }}
              name="search"
              size={25}
              style={{ color: '#767676' }}
            />
          )}
          <TextInput
            onTouchStart={(e) => {
              moveUp();
            }}
            style={styles.input}
            onFocus={onFocus}
            // onBlur={onBlur}
            onChangeText={(txt) => onChangeText(txt)}
            value={value}
            // placeholder={`${Local('doctor.medical_history.search_medicine')}`}
            placeholderTextColor={Colors.input_placeholder_color[theme]}
          />
          {Righicon && Righicon}
        </View>
      </InsetShadow>
    </View>
  );
};

export default AnimatedTextInput;

const styles = StyleSheet.create({
  numberField: {
    // flex: 1,
    width: '100%',
    // alignSelf: 'stretch',
    borderRadius: 15,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
    height: 50,
    // marginHorizontal: 5,
    marginVertical: 5,
    // borderWidth: 0.1,
    marginRight: 20,
  },
  input: {
    flex: 1,
  },
  animatedText: {
    flexDirection: 'row',

    color: '#707585',
    position: 'absolute',
    zIndex: -1,
    height: '100%',
    paddingLeft: 22,
    alignItems: 'center',
  },
});
