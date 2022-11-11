import React from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import ReferralsSvg from '../../../assets/svg/referrals.svg';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-root-toast';
function Referrals({navigation}) {
  const copyToClipboard = () => {
    console.log('called');
    Clipboard.setString('http://clio.com/adfklsa');
    ToastAndroid.show('copied to clipboard', ToastAndroid.LONG);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{backgroundColor: '#F8F7FF', height: '25%'}}>
        <TopNavBar
          navigation={navigation}
          style={{
            Container: {
              marginTop: 10,
            },
          }}></TopNavBar>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingHorizontal: 30,
          }}>
          <View
            style={{
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 2,
              borderBottomColor: '#9C77BC',
            }}>
            <Text
              style={{
                fontSize: 22,
                textAlign: 'center',
                color: '#9C77BC',
                fontWeight: 'bold',
                marginTop: 5,
              }}>
              Refer a Friend
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 22,
                textAlign: 'center',
                color: '#AAA4C5',
                fontWeight: 'bold',
                marginTop: 5,
              }}>
              Rewards
            </Text>
          </View>
        </View>
      </View>
      <View style={{paddingVertical: 40}}>
        <Text
          style={{
            color: '#6859A1',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Refer friends.
        </Text>
        <Text
          style={{
            color: '#6859A1',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Unlock rewards
        </Text>
      </View>
      <ReferralsSvg style={{alignSelf: 'center'}} />
      <DmzButton
        text={'REFER FRIENDS'}
        onPress={copyToClipboard}
        style={{
          Container: {
            backgroundColor: '#9C77BC',
            elevation: 1,
            width: '70%',
            height: 'auto',
            paddingVertical: 10,
            alignSelf: 'center',
            marginTop: 30,
          },
          Text: {color: '#fff'},
        }}></DmzButton>
    </View>
  );
}

export default Referrals;
