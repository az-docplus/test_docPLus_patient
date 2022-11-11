/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TextInput, Modal, Alert} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import {HEADER_TEXT, PRIMARY_COLOR} from '../../../styles/colors';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import Card from '../../../components/atoms/Card/Card';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RedeemVoucher({navigation}) {
  const [modalVisible, setVisible] = useState(false);
  const [code, setCode] = useState('');
  const steps = [
    {name: 'Enter voucher code', icon: 'keyboard-outline'},
    {
      name: 'Review benefits and terms & condition carefully',
      icon: 'brightness-percent',
    },
    {
      name: 'Confirm and redeem your voucher',
      icon: 'check-circle-outline',
    },
    {
      name: 'Enjoy the voucher benefits',
      icon: 'thumb-up-outline',
    },
  ];

  const chkValadity = () => {
    Alert.alert('Voucher code invalid');
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <TopNavBar navigation={navigation} style={{Container: {marginTop: 10}}} />
      <View
        style={{
          marginHorizontal: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          alignItems: 'center',
        }}>
        <DmzText
          text="REDEEM VOUCHER"
          style={{
            color: HEADER_TEXT,
            fontSize: 20,
            textTransform: 'uppercase',
            marginLeft: 7.5,
          }}
        />
        <DmzButton
          numberOfLines={1}
          adjustsFontSizeToFit
          onPress={() => {
            setVisible(true);
          }}
          text="Know More"
          style={{
            Text: {color: 'crimson', fontSize: 14},
            Container: {elevation: 0, alignItems: 'center'},
          }}
        />
      </View>
      <Card
        style={{
          elevation: 2,
          width: '90%',
          alignSelf: 'center',
          alignItems: 'center',
          borderRadius: 10,
          height: 'auto',
          padding: 0,
          marginTop: 20,
          backgroundColor: '#FFF',
        }}>
        <TextInput
          placeholder="Enter Voucher Code"
          value={code}
          onChangeText={(txt) => {
            setCode(txt);
          }}
          style={{
            width: '80%',
            borderBottomColor: PRIMARY_COLOR,
            borderBottomWidth: 1,
            paddingBottom: 10,
            marginTop: 20,
          }}
        />
        <DmzButton
          disabled={code == '' ? true : false}
          onPress={() => {
            chkValadity();
          }}
          text="Check Validity"
          style={{
            Container: {
              elevation: 0,
              backgroundColor: PRIMARY_COLOR,
              margin: 30,
              width: 'auto',
              paddingHorizontal: 30,
              borderRadius: 30,
            },
            Text: {
              fontSize: 15,
              color: '#FFF',
              fontWeight: 'normal',
            },
          }}
        />
      </Card>
      <FlatList
        style={{marginTop: 50}}
        contentContainerStyle={{marginHorizontal: 15}}
        data={steps}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Icon name={item.icon} size={45} color={HEADER_TEXT} />
              <Text
                numberOfLines={2}
                style={{marginLeft: 30, marginRight: 30, fontSize: 14.5}}>
                {item.name}
              </Text>
            </View>
          );
        }}
      />
      <Modal animated animationType={'slide'} visible={modalVisible}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 50,
            }}>
            <Text style={{fontSize: 25, fontWeight: '600', marginRight: 30}}>
              ABOUT VOUCHERS
            </Text>
            <Icon
              onPress={() => {
                setVisible(false);
              }}
              name="alpha-x-circle"
              size={28}
              style={{marginRight: 15}}
            />
          </View>
          <Text
            style={{
              marginHorizontal: '5%',
              fontSize: 15,
              letterSpacing: 1,
              alignSelf: 'center',
              textAlign: 'center',
              marginTop: 50,
            }}>
            -Vouchers unlock special benefits.{'\n'}These are available through
            select corporate partners and evemts
          </Text>
        </View>
      </Modal>
    </View>
  );
}
