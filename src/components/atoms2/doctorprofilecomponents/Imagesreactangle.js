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

const Imagesrectangle = (props) => {
  return (
    <View style={{marginTop: 10, marginBottom: 20}}>
      <Image
        style={{
          height: 120,
          width: 160,
          marginLeft: 20,
          marginTop: 5,
          borderRadius: 20,
        }}
        source={props.imgs}
      />
    </View>
  );
};
export default Imagesrectangle;
