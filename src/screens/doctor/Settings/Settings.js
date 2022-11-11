import React from 'react';
import {View, Text} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import ToggleButton from '../../../components/molecules/ToggleButton/ToggleButton';
import Privacy from '../../../assets/svg/privacy.svg';
import Skin from '../../../assets/svg/skin.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Language from '../../../assets/svg/language.svg';
import SwitchAccount from '../../../assets/svg/switchAccount.svg';
import Signout from '../../../assets/svg/signout.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {resetStore} from '../../../redux/action/auth';
function Settings({navigation}) {
  const list = [
    {
      name: 'Privacy',
      Icon: Privacy,
    },
    {
      name: 'Change skins',
      Icon: Skin,
    },
    {
      name: 'Region and Language',
      Icon: Language,
    },
    {
      name: 'Switch Accounts',
      Icon: SwitchAccount,
    },
  ];
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(resetStore());
    navigation.navigate('pageNavigation');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{backgroundColor: '#F8F7FF', height: '20%'}}>
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
            justifyContent: 'flex-start',
            paddingHorizontal: 40,
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
              Settings
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#9C77BC',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingVertical: 20,
          // paddingHorizontal: 10,
        }}>
        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
          Notification
        </Text>
        <ToggleButton
          toggle={false}
          onToggle={() => {}}
          style={{borderRadius: 10, width: 120}}
          dotStyle={{
            backgroundColor: '#9C77BC',
            width: 50,
            height: 25,
            borderRadius: 8,
          }}
          textStyle={{fontSize: 14, color: '#EA508F'}}
          text0="ON"
          text1="OFF"
        />
      </View>
      <View style={{flex: 1, paddingHorizontal: 30}}>
        {list.map((item) => {
          const {Icon, name} = item;
          return (
            <View
              style={{
                paddingVertical: 30,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 0.8,
                borderBottomColor: '#AAA4C5',
              }}>
              <View style={{flex: 1}}>
                <Icon />
              </View>
              <View style={{flex: 6}}>
                <Text style={{fontSize: 16, color: '#6859A1'}}>{name}</Text>
              </View>
              <View style={{flex: 1}}>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={28}
                  color="#AAA4C5"
                />
              </View>
            </View>
          );
        })}
        <TouchableOpacity
          onPress={onLogout}
          style={{
            paddingVertical: 30,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Signout />
          </View>
          <View style={{flex: 6}}>
            <Text style={{fontSize: 18, color: '#EA508F', fontWeight: 'bold'}}>
              Signout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Settings;
