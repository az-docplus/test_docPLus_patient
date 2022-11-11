import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import TopNavBar from '../../components/molecules/TopNavBar/TopNavBar';
import Entypo from 'react-native-vector-icons/Entypo';

const SelfCheck = ({ navigation }) => {
  const DiseaseCard = [
    {
      title: 'Diabetes',
      metaDesc: 'Here you can do a self Diabeties check',
      navigate: 'ChatBot',
      data: 'diabetes',
      image: require('../../assets/png/image-18.png'),
    },
    {
      title: 'UTI',
      metaDesc: 'Here you can do a self UTI check',
      navigate: 'ChatBot',
      data: 'UTI',
      image: require('../../assets/png/UTI.png'),
    },
    {
      title: 'Covid Care',
      metaDesc: 'Here you can do a self Covid check',
      navigate: 'ChatBot',
      data: 'covid19',
      image: require('../../assets/png/CovidCare2.png')
    },
    {
      title: 'Breast Cancer',
      metaDesc: 'Here you can do a self Breast Cancer check',
      navigate: 'ChatBot',
      data: 'breastCancer',
      image: require('../../assets/png/cancer-ribbon-icon-25.jpg'),
    },
    {
      title: 'Heart disease',
      metaDesc: 'Here you can do a self Heart disease check',
      navigate: 'ChatBot',
      data: 'Heart disease',
      image: require('../../assets/png/heart.png'),
    },
    {
      title: 'Typhoid',
      metaDesc: 'Here you can do a self Breast Cancer check',
      navigate: 'ChatBot',
      data: 'Typhoid',
      image: require('../../assets/png/cancer-ribbon-icon-25.jpg'),
    },
    {
      title: 'PCOD',
      metaDesc: 'Here you can do a self PCOD check',
      navigate: 'ChatBot',
      data: 'PCOD',
      image: require('../../assets/png/illustration.png'),
    },
    {
      title: 'Thyroid',
      metaDesc: 'Here you can do a self Thyroid check',
      navigate: 'ChatBot',
      data: 'Thyroid',
      image: require('../../assets/png/thyroid.png'),
    },
  ];
  return (
    <View style={{ flex: 1, paddingLeft: 15 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginVertical: 20 }}>
        <Entypo name="chevron-thin-left" size={27} />
      </TouchableOpacity>
      <ScrollView>
        <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>
          Hi,
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontWeight: '500',
            marginTop: 5,
          }}>
          let’s get you started on your check
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 30 }}>
          {DiseaseCard.map((item) => (
            <TouchableOpacity
              key={item.data}
              onPress={() =>
                navigation.navigate('ChatBot', {
                  disease: item.data,
                })
              }
              style={{
                flex: 1,
                borderRadius: 20,
                backgroundColor: '#FFFFFF',
                elevation: 10,
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: 150,
                marginRight: 10,
                marginVertical: 5,
                height: 210,
                maxWidth: 200,
              }}>
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: '#51B4BE',
                  borderRadius: 60,
                }}>
                <Image
                  resizeMode="contain"
                  source={item.image}
                  style={{
                    width: 40,
                    height: 50,
                    paddingHorizontal: 20,
                  }}
                />
              </View>
              <Text
                style={{
                  marginTop: 15,
                  textAlign: 'center',
                  fontWeight: '800',
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 16,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 16,
                  maxWidth: '85%',
                  marginTop: 2,
                }}>
                {item.metaDesc}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SelfCheck;

const styles = StyleSheet.create({});
