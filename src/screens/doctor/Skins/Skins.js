import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {NEW_PRIMARY_COLOR} from '../../../styles/colors';
import {Colors} from '../../../styles/colorsV2';
import useTheme from '../../../styles/theme';
import {Local, setLocale} from '../../../i18n';

function Skins({navigation}) {
  const {theme} = useSelector((state) => state.AuthReducer);
  const setTheme = useTheme();

  useEffect(() => {
    console.log(theme);
    console.log(Colors);
  }, [theme]);

  return (
    <View
      style={{flex: 1, backgroundColor: Colors.secondary_background[theme]}}>
      <StatusBar
        animated
        backgroundColor={Colors.secondary_background[theme]}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
      />
      <TopNavBar navigation={navigation} headerText={'Theme'} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <TouchableOpacity
          style={{
            paddingVertical: '3%',
            width: '80%',
            height: 100,
            backgroundColor: '#43A2A2',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            elevation: 10,
          }}
          onPress={() => {
            setTheme('PRIMARY');
          }}>
          <Text style={{color: '#fff'}}>{Local('doctor.Skins.primary')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: '3%',
            width: '80%',
            height: 100,
            backgroundColor: '#000000',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: '3%',
            borderRadius: 10,
            borderColor: '#222222',
            borderWidth: 2,
            elevation: 10,
          }}
          onPress={() => {
            setTheme('DARK');
          }}>
          <Text style={{color: '#aaa'}}>{Local('doctor.Skins.dark')}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            paddingVertical: '3%',
            width: '80%',
            height: 100,
            backgroundColor: '#f58c7a',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            elevation: 10,
          }}
          onPress={() => {
            setTheme('MINI');
          }}>
          <Text style={{color: '#fafafa'}}>{Local("doctor.Skins.mini")}</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

export default Skins;
