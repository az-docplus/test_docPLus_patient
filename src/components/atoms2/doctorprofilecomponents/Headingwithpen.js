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

const Headingwithpen = (props) => {
  const space = props.gap;
  const from = props.to;

  const handlepen = () => {
    props.navigation.navigate(from);
  };
  return (
    <View style={{flexDirection: 'row', marginTop: 10}}>
      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 20,
          marginLeft: 30,
        }}>
        {props.name}
      </Text>
      <TouchableOpacity
        onPress={() => {
          handlepen();
        }}>
        <Image
          style={{height: 30, width: 30, marginLeft: space}}
          source={require('../../../assets/png/pencil.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Headingwithpen;
