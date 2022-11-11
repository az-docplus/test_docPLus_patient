import React, {useEffect} from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';

function Splash({navigation}) {
  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: '60%', resizeMode: 'contain'}}
          // source={require('../../../assets/images/docplusIcon.png')}
          source={require('../../../assets/icons/new_docplus_log.png')}
        />
      </View>
    </>
  );
}

const Style = StyleSheet.create({});
export default Splash;
