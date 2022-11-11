import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import { useSelector, useDispatch } from 'react-redux';
import InputCompo from '../../../components/atoms2/Input/Input';
import ToggleSwitch from 'toggle-switch-react-native';
import AD from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UpdateProfile } from '../../../reduxV2/action/PatientAction';
import DmzButton from './../../../components/atoms/SwitchButton/SwitchButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SECONDARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';
const AccountSetting = ({ navigation, route }) => {  
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [lang, setLang] = useState('en');
  console.log('lang.........', lang);
  const SetLang = async (lan) => {
    setLang(lan);
    setLocale(lan);
    await AsyncStorage.setItem('language', lan);
  };
  const { userData, theme } = useSelector((state) => state.AuthReducer);

  const obj = {
    email: email && email.email,
    phone: phone && phone.phone,
  };

  const handleSubmit = () => {
    dispatch(UpdateProfile(obj, userData._id));
  };

  useEffect(() => {
    const language = async () => {
      const value = await AsyncStorage.getItem('language');
      console.log('======>>>>>>>>>>>>>>', value);
      if (value === null) {
        await AsyncStorage.setItem('language', 'en');
      } else {
        SetLang(value);
      }
    };

    language();
  }, [lang]);
  return (
    <View
      style={[
        styles.Container,
        { backgroundColor: Colors.secondary_background[theme] },
      ]}>
      <TopNavBar
        navigation={navigation}
        headerText={`${Local('doctor.Settings.accountSetting')}`}
      />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 20,
          // backgroundColor: '#fcfcfc',
          backgroundColor: Colors.secondary_background[theme],
        }}>
        <View
          style={{
            paddingVertical: 25,
            // paddingHorizontal: '2%',
            borderBottomWidth: 1,
            borderColor: '#e0e0e0',
          }}>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
              }}>
              <Ionicons
                name="md-language"
                size={25}
                color="#297281"
                style={{
                  marginRight: 5,
                }}
              />
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 20,
                  lineHeight: 19,
                  color: '#303030',

                  paddingLeft: 8,
                }}>
                {Local('doctor.Settings.Language')}
              </Text>
            </View>
            
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#EA1A65',
                  fontFamily: 'Gilroy-SemiBold',
                  paddingLeft: 8,
                  marginRight: 5,
                }}>
                {Local('doctor.Settings.English')}
              </Text>
              <AD name="down" size={18} style={{ color: '#EA1A65' }} />
            </View>
          </View> */}
          <TouchableOpacity
            onPress={() => navigation.navigate('selectLanguage')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'white',
              elevation: 3,
              paddingVertical: 30,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                flex: 1,
              }}>
              <View>
                <Ionicons
                  name="md-language"
                  size={25}
                  color="#297281"
                  style={{
                    marginRight: 5,
                  }}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontFamily: 'Gilroy-Medium',
                    fontSize: 20,
                    lineHeight: 19,
                    color: '#303030',

                    paddingLeft: 8,
                  }}>
                  {Local(`doctor.Languages.language`)}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text> {Local(`doctor.Languages.language`)} -</Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#EA1A65',
                      fontFamily: 'Gilroy-SemiBold',
                      paddingLeft: 8,
                      marginRight: 5,
                    }}>
                    {Local('doctor.Settings.English')}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <AD name="right" size={18} style={{ color: '#EA1A65' }} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            // paddingVertical: 30,
            paddingTop: 15,
            paddingBottom: 30,

            // paddingHorizontal: '2%',
            borderBottomWidth: 1,
            borderColor: '#e0e0e0',
            marginBottom: 15,
          }}>
          <InputCompo
            type="phone"
            preValue={phone}
            // isLoading={isLoading}
            value={(e) => setPhone(e)}
          />
        </View>
        <View>
          <InputCompo
            type="email"
            preValue={email}
            // isLoading={isLoading}
            value={(e) => setEmail(e)}
          />

          <View
            style={{
              marginTop: 15,
              zIndex: -1,
            }}>
            <DmzButton
              onPress={handleSubmit}
              style={{
                Text: {
                  width: '100%',
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: 'Gilroy-Bold',
                },
                Container: {
                  width: '100%',
                  height: 50,
                  borderRadius: 25,
                  // backgroundColor: SECONDARY_COLOR,
                  alignSelf: 'center',
                  marginVertical: 20,
                  elevation: 3,
                },
              }}
              text={`${Local('doctor.Settings.submit')}`}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountSetting;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    // backgroundColor: '#fff',
    height: '100%',
  },
});
