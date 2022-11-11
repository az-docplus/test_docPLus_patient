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
import { useDispatch, useSelector } from 'react-redux';
import { languageChanged } from './../../../reduxV2/action/AuthAction';

const SelectLanguge = ({ navigation }) => {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.AuthReducer);
  const [select, setSelect] = useState('');
  const [lang, setLang] = useState(language);

  const [languages, setLanguages] = useState([]);

  const SetLang = async (lan) => {
    setLang(lan);
    setLocale(lan);
    dispatch(languageChanged(lan));
    await AsyncStorage.setItem('language', lan);
    // navigation.navigate('PatientLanding');
  };

  const languageChange = async () => {
    const value = await AsyncStorage.getItem('language');
    if (value === null) {
      await AsyncStorage.setItem('language', 'en');
    } else {
      SetLang(value);
    }
  };
  useEffect(() => {
    Axios.get('https://server.docplus.online/content/get').then((res) => {
      setLanguages(res.data.data.languageAndRegions);
    });
    languageChange();
  }, []);
  // console.log('lang', lang);
  return (
    <View style={{ flex: 1 }}>
      <View>
        <TopNavBar
          navigation={navigation}
          headerText={`${Local('doctor.Settings.Language')}`}
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
          {languages.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                SetLang(item.code);

                console.log('code', item.code);
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
                borderWidth: 1,
                borderColor: lang === item.code ? '#EA1A65' : 'white',
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
