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
import Button from '../../../components/atoms2/button/button';
import InputCompo from '../../../components/atoms2/Input/Input';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {Picker} from '@react-native-community/picker';
import {CheckBox} from 'react-native-elements';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import AnimatedErrorText from '../../../components/atoms/animatedErrorText/AnimatedErrorText';
import {ReactReduxContext} from 'react-redux';
import Photocomp from '../../../components/atoms2/doctorprofilecomponents/Photocomp';

const Addphotobox = () => {
  return (
    <View>
      <TouchableOpacity>
        <View
          style={{
            height: 110,
            width: 160,
            marginLeft: 15,
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderStyle: 'dotted',
            borderWidth: 1.5,
            borderColor: '#AEAEAE',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 15,
          }}>
          <Text style={{fontSize: 34, color: 'dodgerblue'}}>+</Text>
          <Text style={{marginBottom: 30, color: 'dodgerblue', fontSize: 14}}>
            Add Photo
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Addphotobox;
