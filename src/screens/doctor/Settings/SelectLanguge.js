import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import { Local, setLocale } from '../../../i18n';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectLanguge = ({ navigation }) => {
  const [select, setSelect] = useState('');
  const [lang, setLang] = useState('en');
  const [language, setLanguage] = useState([]);

  Axios.get('https://server.docplus.online/content/get').then((res) => {
    setLanguage(res.data.data.languageAndRegions);
  });

  const SetLang = async (lan) => {
    setLang(lan.code);
    setLocale(lan.code);
    await AsyncStorage.setItem('language', lan)
    // navigation.navigate('PatientLanding');
  };

  useEffect(() => {
    const language = async () => {
      const value = await AsyncStorage.getItem('language');
      if (value === null) {
        await AsyncStorage.setItem('language', 'en');
      } else {
        setLang(value);
      }
    };

    language();
  }, [lang]);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <TopNavBar
          navigation={navigation}
          headerText={Local(`doctor.Languages.language`)}
        />
      </View>

      <ScrollView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: 10,
            marginVertical: 10,
            paddingHorizontal: 5,
          }}>
          {language.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                SetLang(item)
                console.log('===========iitem')
              }}
              style={{
                // minWidth: 200,
                backgroundColor: 'white',
                paddingHorizontal: 20,
                paddingVertical: 15,
                width: '45%',
                marginHorizontal: 5,
                borderRadius: 50,
                marginVertical: 5,
                shadowColor: '#171717',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
                borderColor: select === item.name ? '#EA1A65' : 'white',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: 'Gilroy-SemiBold',
                }}>
                {item.name}
              </Text>
              <Text
                style={{ textAlign: 'center', color: '#AEAEAE', fontSize: 16 }}>
                {item.region}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SelectLanguge;

const styles = StyleSheet.create({});
