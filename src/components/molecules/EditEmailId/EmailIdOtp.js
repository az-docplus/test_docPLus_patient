/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState, useRef, useEffect, createRef} from 'react';
import {View, Text, BackHandler} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import DmzText from '../../atoms/DmzText/DmzText';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import {PRIMARY_COLOR} from '../../../styles/colors';
import {StackActions} from 'react-navigation';

export default function EmailIdOtp({navigation}) {
  const [email, setEmail] = useState(navigation.getParam('email', ''));
  console.log(navigation.getParam('email'));
  BackHandler.addEventListener('hardwareBackPress', () => {
    // navigation.navigate('EditemailNumber');
    navigation.goBack();
    BackHandler.removeEventListener('hardwareBackPress', () => {});
    return true;
  });

  const input1ref = useRef(null);
  const input2ref = useRef(null);
  const input3ref = useRef(null);
  const input4ref = useRef(null);
  const input5ref = useRef(null);
  const input6ref = useRef(null);

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input6, setInput6] = useState('');

  useEffect(() => {
    input1ref.current.focus();
  }, []);
  return (
    <View style={{flex: 1, width: '100%'}}>
      <View
        style={{
          //   flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 15,
          paddingBottom: 5,
          marginHorizontal: 20,
          marginBottom: 50,
        }}>
        <TouchableOpacity
          style={{
            width: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'stretch',
          }}
          onPress={() => {
            navigation.navigate('EditemailNumber');
          }}>
          <FontAwesome size={30} color={PRIMARY_COLOR} name="angle-left" />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 16,
          marginLeft: 25,
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        Enter the opt sent to email {'\n'} {email}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginRight: 10,
          marginTop: 50,
        }}>
        <TextInput
          ref={input1ref}
          value={input1}
          onChangeText={(text) => {
            setInput1(text);
            console.log(text);
            text != '' ? input2ref.current.focus() : null;
          }}
          maxLength={1}
          keyboardType="numeric"
          style={{
            marginTop: 0,
            fontWeight: '300',
            fontSize: 30,
            borderBottomWidth: 1,
            marginLeft: 20,
            letterSpacing: 1,
          }}
        />
        <TextInput
          ref={input2ref}
          value={input2}
          onChangeText={(text) => {
            setInput2(text);
            text != '' ? input3ref.current.focus() : null;
          }}
          maxLength={1}
          keyboardType="numeric"
          style={{
            marginTop: 0,
            fontWeight: '300',
            fontSize: 30,
            borderBottomWidth: 1,
            marginLeft: 20,
            letterSpacing: 1,
          }}
        />

        <TextInput
          ref={input3ref}
          editable={input1 != '' ? true : false}
          value={input3}
          onChangeText={(text) => {
            setInput3(text);
            text != '' ? input4ref.current.focus() : null;
          }}
          maxLength={1}
          keyboardType="numeric"
          style={{
            marginTop: 0,
            fontWeight: '300',
            fontSize: 30,
            borderBottomWidth: 1,
            marginLeft: 20,
            letterSpacing: 1,
          }}
        />
        <TextInput
          ref={input4ref}
          editable={input2 != '' ? true : false}
          value={input4}
          onChangeText={(text) => {
            setInput4(text);
            text != '' ? input5ref.current.focus() : null;
          }}
          maxLength={1}
          keyboardType="numeric"
          style={{
            marginTop: 0,
            fontWeight: '300',
            fontSize: 30,
            borderBottomWidth: 1,
            marginLeft: 20,
            letterSpacing: 1,
          }}
        />
        <TextInput
          ref={input5ref}
          editable={input3 != '' ? true : false}
          value={input5}
          onChangeText={(text) => {
            setInput5(text);
            text != '' ? input6ref.current.focus() : null;
          }}
          maxLength={1}
          keyboardType="numeric"
          style={{
            marginTop: 0,
            fontWeight: '300',
            fontSize: 30,
            borderBottomWidth: 1,
            marginLeft: 20,
            letterSpacing: 1,
          }}
        />
        <TextInput
          ref={input6ref}
          editable={input4 != '' ? true : false}
          value={input6}
          onChangeText={(text) => {
            setInput6(text);
          }}
          maxLength={1}
          keyboardType="numeric"
          style={{
            marginTop: 0,
            fontWeight: '300',
            fontSize: 30,
            borderBottomWidth: 1,
            marginLeft: 20,
            letterSpacing: 1,
          }}
        />
      </View>
      <DmzButton
        disabled={
          input1 == '' &&
          input2 == '' &&
          input3 == '' &&
          input4 == '' &&
          input5 == '' &&
          input6 == ''
            ? true
            : false
        }
        onPress={() => {
          alert('Email ID Updated');
          //   navigation.goBack(
          //     'Profile',
          //     {},
          //     navigation.navigate('EditemailNumber    '),
          //   );
          //   const popAction = StackActions.pop({
          //     n: 3,
          //   });

          //   navigation.dispatch(popAction);
          navigation.popToTop();
          //   navigation.dispatch(StackActions.popToTop);
        }}
        text="CONFIRM"
        style={{
          Container: {
            marginTop: 50,
            alignSelf: 'center',
            width: '70%',
            borderRadius: 18,
            elevation: 0,
            backgroundColor: PRIMARY_COLOR,
          },
          Text: {
            fontSize: 20,
            color: '#fff',
            fontWeight: 'normal',
          },
        }}
      />
    </View>
  );
}
