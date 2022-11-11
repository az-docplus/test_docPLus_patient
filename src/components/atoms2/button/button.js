import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Button(props) {
  const { title, pressHandler, style, isLoading, icon, textStyle } = props;

  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={isLoading ? null : pressHandler}
      style={[
        {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 15,
        },
        style?.Container,
      ]}>
      <LinearGradient
        // start={{ x: 0, y: 0 }}
        // end={{ x: 1, y: 1 }}
        colors={[
          isLoading ? '#94B9C0' : '#2D7D8E',
          isLoading ? '#94B9C0' : '#246370',
        ]}
        style={{
          borderRadius: 50,
          elevation: 7,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            fontFamily: 'Montserrat-Regular',
            color: '#fff',
            paddingVertical: 14,
            paddingHorizontal: 20,
            ...textStyle,
          }}>
          {title}
        </Text>
        {isLoading && icon && (
          <View style={{ marginLeft: 15 }}>
            <ActivityIndicator color="#fff" />
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
