/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {changingTheme, setTheme} from '../../../redux/action/themeAction';
import {PRIMARY_COLOR} from '../../../styles/colors';
import {resetStore} from '../../../redux/action/auth';

function Settings({navigation}) {
  const {isThemeChanging} = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();
  const onPressTheme = (theme) => {
    dispatch(changingTheme());
    AsyncStorage.setItem('theme', `${theme}`)
      .then((res) => {
        getTheme();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getTheme = () => {
    AsyncStorage.getItem('theme')
      .then((res) => {
        console.log(res);
        dispatch(setTheme(Number(res)));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const _logout = () => {
    dispatch(resetStore());
    navigation.navigate('authentication');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
      }}>
      {isThemeChanging && <ActivityIndicator />}
      <TouchableOpacity
        onPress={() => onPressTheme(1)}
        style={{
          height: 40,
          width: '80%',
          backgroundColor: 'rgba(21,123,200,0.9)',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>theme 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressTheme(2)}
        style={{
          height: 40,
          width: '80%',
          backgroundColor: 'rgba(21,123,200,0.9)',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>theme 2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _logout()}
        style={{
          height: 40,
          width: '80%',
          backgroundColor: PRIMARY_COLOR,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          marginTop: 100,
        }}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Settings;
