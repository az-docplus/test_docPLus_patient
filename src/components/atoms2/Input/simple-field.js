import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import InsetShadow from 'react-native-inset-shadow';
import AntiDesingIcon from 'react-native-vector-icons/Feather';
const CheckIcon = ({ size, name }) => (
  <AntiDesingIcon size={size} name={name} color="#000" />
);
const RegexCheck = (type) => {
  if (type == 'name') {
    return new RegExp(/^[a-zA-Z ]+$/);
  } else if (type == 'year') {
    return new RegExp(/^(19[5-9]\d|20[0-4]\d|2050)$/);
  } else if (type == 'number') {
    return new RegExp('^[0-9]+$');
  } else if (type == 'should10number') {
    return new RegExp(/^[0-9]{10}$/);
  } else if (type == 'email') {
    return new RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    );
  }
};
export default function SimpleField(props) {
  const {
    value,
    title,
    inputType,
    regexType,
    isLoading,
    preValue,
    inputLength,
  } = props;
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
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const [inputText, setInputText] = useState(() => {
    if (preValue) {
      moveUp();
      return preValue;
    }
    return '';
  });

  useEffect(() => {
    setInputText(preValue);
  }, [preValue]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '98%',
          marginBottom: -4,
          transform: [{ scale: 0.8 }],
        }}>
        <Text></Text>
        {inputText?.length > 0 ? (
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color: '#FF0000',
              fontSize: 10,
              padding: 5,
              paddingRight: 10,
            }}>
            {RegexCheck(regexType ? regexType : inputType).test(inputText) &&
            (inputLength
              ? parseInt(inputLength.max + 1) > inputText?.length &&
                parseInt(inputLength.min) < inputText?.length
              : true) ? (
              <Text style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <Text style={{ color: '#000' }}>Correct</Text> */}
                <CheckIcon size={10} name="check-circle" />
              </Text>
            ) : (
              <Text style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    paddingRight: 10,
                  }}>
                  incorrect details
                </Text>
              </Text>
            )}
          </Text>
        ) : (
          <Text style={{ padding: 5, fontSize: 10 }}></Text>
        )}
      </View>

      <View style={{ position: 'relative' }}>
        <Animated.View
          style={[
            styles.animatedText,
            {
              transform: [
                {
                  translateY: inputTextRefMove,
                  scale: inputTextRefSize,
                  translateX: inputTextRefSize < 0.7 ? 22 : -20,
                },
              ],
            },
          ]}>
          <Text
            style={{
              padding: 0,
              margin: 0,
              textAlignVertical: 'center',
              height: '100%',
              color: '#707585',
              fontFamily: 'Montserrat-Regular',
            }}>
            {title}
          </Text>
        </Animated.View>
        <InsetShadow
          shadowOpacity={1}
          shadowOffset={15}
          containerStyle={styles.numberField}
          // shadowOffset={10}
          elevation={12}>
          <TextInput
            editable={!isLoading}
            maxLength={_maxLength(
              inputType,
              inputLength,
              regexType ? regexType : null,
            )}
            keyboardType={
              inputType == 'number' ||
              inputType == 'should10number' ||
              inputType == 'year'
                ? 'number-pad'
                : inputType
            } // name,year,numbers
            onTouchStart={(e) => {
              moveUp();
            }}
            onChangeText={(e) => {
              setInputText(e);
              value(e);
            }}
            value={inputText}
            style={{
              width: '100%',
              color: isLoading ? 'rgb(130, 130, 130)' : '#000',
              fontFamily: 'Montserrat-Regular',
            }}
          />
        </InsetShadow>
      </View>
    </View>
  );
}

const _maxLength = (inputType, inputLength, regexType = null) => {
  if (regexType === 'number' && inputLength?.max) {
    return parseInt(inputLength.max);
  } else if (regexType === 'should10number') {
    return 10;
  } else if (inputType === 'year') {
    return 4;
  } else {
    return null;
  }
};
const styles = StyleSheet.create({
  numberField: {
    borderRadius: 10,
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    height: 50,
    // width: '96%',
    marginHorizontal: 5,
    borderWidth: 0.1,
  },
  animatedText: {
    color: '#707585',
    position: 'absolute',
    zIndex: -1,
    height: '100%',
    paddingLeft: 22,
  },
});
