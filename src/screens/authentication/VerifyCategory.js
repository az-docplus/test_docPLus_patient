import { Image, StyleSheet, Text, View, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Button } from 'react-native-paper';
import { Local } from '../../i18n';

const VerifyCategory = ({ navigation }) => {
  const backAction = () => {
    if (navigation.isFocused()) {
      navigation.navigate('LandingPage');
      return true;
    }
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Image
          source={require('../../assets/icons/curvelogo.png')}
          style={{ height: 60, width: 60, resizeMode: 'contain' }}
        />
        <Text
          style={{
            fontSize: 18,
            marginVertical: 20,
            fontFamily: 'Gilroy-SemiBold',
          }}>
          {`${Local('doctor.V2.verifyCategory.title')}`}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
            onPress={() =>
              navigation.navigate('login-screen-v2', {
                verifyStatus: 'yes',
              })
            }
            mode="outlined"
            style={{
              borderRadius: 20,
              paddingHorizontal: 20,
              borderColor: '#18A0FB',
              borderWidth: 1,
            }}
            color="#18A0FB">
            <Text style={{ fontFamily: 'Gilroy-SemiBold', fontSize: 20 }}>
              {`${Local('doctor.V2.verifyCategory.yes')}`}
            </Text>
          </Button>
          <View style={{ marginHorizontal: 5 }} />
          <Button
            onPress={() =>
              navigation.navigate('login-screen-v2', {
                verifyStatus: 'NO',
              })
            }
            mode="outlined"
            style={{
              borderRadius: 20,
              paddingHorizontal: 20,
              borderColor: '#18A0FB',
              borderWidth: 1,
            }}
            color="#18A0FB">
            <Text style={{ fontFamily: 'Gilroy-SemiBold', fontSize: 20 }}>
              {`${Local('doctor.V2.verifyCategory.no')}`}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default VerifyCategory;

const styles = StyleSheet.create({});
