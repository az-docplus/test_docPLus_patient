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

const Greyboxwithupload = (props) => {
  const space = props.gap;
  return (
    <View
      style={{
        marginTop: 15,
        flexDirection: 'row',
        marginBottom: 5,
        height: 66,
        width: '88%',
        backgroundColor: '#EEEEEE',
        borderRadius: 15,
        alignItems: 'center',
        marginLeft: 20,
      }}>
      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 16,
          marginLeft: 10,
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
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: space,
            height: 30,
            width: 80,
            borderRadius: 15,
            marginTop: -5,
            flexDirection: 'row',
            marginTop: 3,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 12,

              color: '#EE296E',
            }}>
            Upload
          </Text>
          <Image
            style={{
              height: 14,
              width: 14,
              marginLeft: 10,
              color: '#EE296E',
            }}
            source={require('../../../assets/png/upload.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Greyboxwithupload;
