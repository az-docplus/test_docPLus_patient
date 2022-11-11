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
import {useNavigation} from '@react-navigation/native';

const Photocomp = (props) => {
  const navigation = useNavigation();
  const imageloc = props.imgs;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('photocaption', imageloc);
      }}>
      <View>
        <Image
          style={{
            height: 110,
            width: 165,
            marginLeft: 15,
            marginTop: 8,
            borderRadius: 10,
            marginBottom: 15,
          }}
          source={imageloc}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Photocomp;
