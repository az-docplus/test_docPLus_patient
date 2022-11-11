import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Text, Animated, Easing} from 'react-native';
import DmzText from '../../atoms/DmzText/DmzText';
import PropType from 'prop-types';
import {TextInput} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../../../styles/colorsV2';
/**
 *
 * @param {String} textContentType content type of the input
 * @param {String} placeholder placeholder for the input
 * @param {String} keyboardType keyboard type of the input {default:'default'}
 * @param {Boolean} withAnim whether animatable or not {default:true}
 * @param {Object} style custom styles
 * @param {function} inputHandler
 *
 */

function AnimInput(props) {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const placeholderTranslate = useRef(new Animated.Value(0)).current;
  const [inputText, setInputText] = useState('');
  const {
    textContentType,
    placeholder,
    keyboardType = 'default',
    withAnim = true,
    style,
    inputHandler = () => {},
    value,
    maxLength,
    secureTextEntry,
    autoCapitalize
  } = props;

  useEffect(() => {
    value && setInputText(value);
    value && onFocus();
  });
  const onFocus = () => {
    Animated.timing(placeholderTranslate, {
      toValue: 1,
      easing: Easing.elastic(),
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const onBlur = () => {
    if (inputText === '') {
      Animated.timing(placeholderTranslate, {
        toValue: 0,
        easing: Easing.elastic(),
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };
  const handleText = (text) => {
    setInputText(text);
    inputHandler(text);
  };
  const customContainerStyle = [
    Styles.Container,
    style ? style.Container : null,
  ];
  const customAnimatedPlaceholderStyle = [
    Styles.PlaceholderText,
    {
      transform: [
        {
          translateY: placeholderTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -20],
          }),
        },
        {
          translateX: placeholderTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -5],
          }),
        },
      ],
      color: placeholderTranslate.interpolate({
        inputRange: [0, 1],
        outputRange: ['#777', '#000'],
      }),
    },
    style ? {...style.Placeholder, placeholderTextColor: Colors.input_placeholder_color[theme], } : null,
  ];
  const customInputStyle = [Styles.Input, { color: Colors.primary_text_color[theme], }, style ? style.Input : null];

  return (
    <View style={customContainerStyle}>
      {withAnim ? (
        <Animated.Text style={customAnimatedPlaceholderStyle}>
          {placeholder}
        </Animated.Text>
      ) : null}
      <TextInput
        autoCapitalize={autoCapitalize}
        textContentType={textContentType}
        placeholder={withAnim ? '' : placeholder}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        keyboardType={keyboardType}
        style={customInputStyle}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        value={inputText}
        onChangeText={handleText}
        maxLength={maxLength}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    height: 'auto',
    width: '100%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // marginTop: 5,
  },
  PlaceholderText: {
    fontFamily: 'Montserrat-Medium',
    position: 'absolute',
    color: "#fff",
    left: 10,
  },
  Input: {
    // left: 10,
    fontFamily: 'Montserrat-Medium',
    paddingHorizontal: 20,
    paddingLeft: 10,
    // marginTop: 5,
  },
});

// AnimInput.prototype = {
//   textContentType: PropType.string,
//   placeholder: PropType.string,
//   keyboardType: PropType.string,
//   withAnim: PropType.bool,
// };
export default AnimInput;
