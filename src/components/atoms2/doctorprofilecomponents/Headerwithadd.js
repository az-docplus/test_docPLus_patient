import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Image,
  Animated,
  Easing,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';

const Headerwithadd = (props) => {
  const space = props.gap;
  return (
    <View style={{marginTop: 10, flexDirection: 'row', marginBottom: 5}}>
      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 16,
          marginLeft: 30,
        }}>
        {props.name}
      </Text>
      <Image
        style={{height: 20, width: 20, marginLeft: 10}}
        source={require('../../../assets/png/information.png')}
      />

      <TouchableOpacity>
        <View
          style={{
            backgroundColor: '#E0F4F4',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: space,
            height: 30,
            width: 60,
            borderRadius: 25,
            marginTop: -5,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 24,

              color: '#297281',
            }}>
            +{' '}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 12,

              color: '#297281',
            }}>
            Add
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Headerwithadd;
