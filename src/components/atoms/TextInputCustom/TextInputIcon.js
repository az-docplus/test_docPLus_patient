import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeArea } from 'react-native-safe-area-view';
import PhoneInput from "react-native-phone-number-input";

/**
 *
 * @param {} param0
 */

function TextInputIcon({
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
  autoCapitalize,
  // validated = true,
  validationCallback = () => true,
  onFocus = () => { },
  onBlur = () => { },
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
        !validated && { borderBottomColor: 'red', borderBottomWidth: 1 },
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
      {(hasIcon && iconName === "phone") ? (
        <PhoneInput
          defaultValue={value}
          defaultCode="IN"
          onChangeCountry={country => {
            // console.log('country : ', country)
            countryCodeHandler(country.callingCode[0])
          }}
          textInputStyle={{ ...textStyle }}
          containerStyle={{ height: 40, width: 60 }}
        />
      ) : null}
      <TextInput
        value={value}
        textContentType={textContentType}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={(text) => inputHandler(text)}
        placeholderTextColor={placeholderTextColor}
        style={[textStyle ? textStyle : null, { flex: 1 }]}
        maxLength={maxLength}
        onFocus={onFocus}
        onBlur={onBlur}
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

export default TextInputIcon;
