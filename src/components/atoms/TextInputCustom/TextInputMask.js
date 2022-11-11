import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeArea} from 'react-native-safe-area-view';

/**
 *
 * @param {} param0
 */

function TextInputIconMask({
  placeholder,
  textContentType,
  placeholderTextColor,
  keyboardType = 'default',
  style,
  value,
  hasIcon = false,
  iconPos = 'left',
  iconName = 'question',
  iconStyle,
  iconColor,
  textStyle,
  size,
  inputHandler,
  secureTextEntry = false,
  maxLength,
  onPress,
  children,
  maskProps = {},
  // validated = true,
  validationCallback = () => true,
}) {
  const [validated, setValidated] = useState(true);
  let timeout = null;

  useEffect(() => {
    if (value.length > 0) {
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        setValidated(validationCallback());
      }, 500);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [value]);

  return (
    <View
      style={[
        style ? style : TextInputCustomStyles.Container,
        {
          flexDirection: iconPos == 'right' ? 'row-reverse' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        !validated && {borderBottomColor: 'red', borderBottomWidth: 1},
      ]}>
      {hasIcon ? (
        <MaterialCommunityIcons
          onPress={onPress}
          name={iconName}
          color={iconColor ? iconColor : '#000'}
          size={size}
          style={[
            TextInputCustomStyles.iconContainer,
            iconStyle ? iconStyle : null,
          ]}
        />
      ) : null}

      <TextInputMask
        {...maskProps}
        value={value}
        // textContentType={textContentType}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={(text) => inputHandler(text)}
        style={[textStyle ? textStyle : null, {flex: 1}]}
        maxLength={maxLength}
      />
      {children}
    </View>
  );
}

const TextInputCustomStyles = StyleSheet.create({
  Container: {
    flex: 1,
    margin: 5,
    height: 'auto',
  },
  iconContainer: {
    backgroundColor: 'transparent',
    margin: 5,
    paddingLeft: 10,
  },
});

export default TextInputIconMask;
