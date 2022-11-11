import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';

import { Local, setLocale } from '../../../i18n';

function Languages({ navigation }) {
  const [lang, setLang] = useState('en');

  const SetLang = async (lan) => {
    setLang(lan);
    setLocale(lan);
    await AsyncStorage.setItem('language', lan);
  };

  useEffect(() => {
    const language = async () => {
      const value = await AsyncStorage.getItem('language');
      if (value === null) {
        await AsyncStorage.setItem('language', 'en');
      } else {
        SetLang(value);
      }
    };

    language();
  }, [lang]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ backgroundColor: '#F8F7FF', height: '20%' }}>
        <TopNavBar
          navigation={navigation}
          style={{
            Container: {
              marginTop: 10,
            },
          }}
        />

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
                lineHeight: 30,
                textAlign: 'center',
                color: '#9C77BC',
                fontWeight: 'bold',
                marginTop: 5,
              }}>
              {Local('doctor.Languages.region_and_lang')}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, paddingHorizontal: '10%' }}>
        <View
          style={{
            paddingVertical: 25,
            flexDirection: 'row',
            borderBottomWidth: 0.8,
            borderBottomColor: '#AAA4C5',
          }}>
          <View
            style={{
              flex: 6,
              paddingLeft: '7%',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 16, color: '#AAA4C5' }}>Region</Text>
            <Text
              style={{
                fontSize: 18,
                letterSpacing: 1,
                color: '#6859A1',
                fontWeight: 'bold',
                marginTop: '5%',
              }}>
              India
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
            }}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={28}
              color="#AAA4C5"
            />
          </View>
        </View>
        <View
          style={{
            paddingVertical: 25,
            flexDirection: 'row',
            borderBottomWidth: 0.8,
            borderBottomColor: '#AAA4C5',
          }}>
          <View
            style={{
              flex: 6,
              paddingLeft: '7%',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 16, color: '#AAA4C5' }}>Language</Text>
            <Picker
              mode={'dropdown'}
              selectedValue={lang}
              style={{ width: '100%', color: '#6859A1', fontWeight: 'bold' }}
              onValueChange={(itemValue, itemIndex) => SetLang(itemValue)}>
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Hindi" value="hi" />
            </Picker>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
            }}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={28}
              color="#AAA4C5"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default Languages;
