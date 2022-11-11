import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

const VerifySignUp = ({ navigation }) => {
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
          Are you a Doctor?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
            onPress={() =>
              navigation.navigate('sinup-screen-v2', {
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
              Yes
            </Text>
          </Button>
          <View style={{ marginHorizontal: 5 }} />
          <Button
            onPress={() =>
              navigation.navigate('sinup-screen-v2', {
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
              No
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default VerifySignUp;

const styles = StyleSheet.create({});
