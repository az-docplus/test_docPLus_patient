import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TopNavBar from '../../components/molecules/TopNavBar/TopNavBar';
import Entypo from 'react-native-vector-icons/Entypo';

const AllConsern = ({navigation}) => {
  const DiseaseCard = [
    {
      title: 'Bad Stomach',
      image: require('../../assets/icons/consern/badstomach.png'),
    },
    {
      title: 'Skin Rash',
      image: require('../../assets/icons/consern/skinrash.png'),
    },
    {
      title: 'Covid Care',
      image: require('../../assets/icons/consern/covid.png'),
    },
    {
      title: 'Cough & Cold',
      image: require('../../assets/icons/consern/cough.png'),
    },
    {
      title: 'Ear, Nose & Throat',
      image: require('../../assets/icons/consern/throat.png'),
    },
    {
      title: 'Dentist',
      image: require('../../assets/icons/consern/dentist.png'),
    },
    {
      title: 'Pheumatology',
      image: require('../../assets/icons/consern/pheumatology.png'),
    },
    {
      title: 'Ayush',
      image: require('../../assets/icons/consern/ayush.png'),
    },
    {
      title: 'Gynaecologist',
      image: require('../../assets/icons/consern/gynaccologist.png'),
    },
    {
      title: 'Neurosurgeon',
      image: require('../../assets/icons/consern/neurosurgeon.png'),
    },
    {
      title: 'Nephrologist',
      image: require('../../assets/icons/consern/nephrologist.png'),
    },
    {
      title: 'Pediatrician',
      image: require('../../assets/icons/consern/pediatrician.png'),
    },
    {
      title: 'Physiotherapist',
      image: require('../../assets/icons/consern/phesiotherapist.png'),
    },
    {
      title: 'Caridology',
      image: require('../../assets/icons/consern/cardiology.png'),
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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 30, marginHorizontal:10 }}>
          {DiseaseCard.map((item) => (
            <TouchableOpacity
              key={item.title}
              style={{
                flexDirection:'row',
                flex: 1,
                borderRadius: 50,
                backgroundColor: '#FFFFFF',
                justifyContent: 'space-between',
                alignItems: 'center',
                minWidth: 140,
                marginRight: 10,
                marginVertical: 5,
                paddingVertical:5,
                paddingHorizontal:10,
                elevation:2,
                marginTop:10
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
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
                    height: 40,
                    paddingHorizontal: 20,
                    resizeMode:'contain'
                  }}
                />
              </View>
              <Text
                style={{
                  marginTop: 15,
                  textAlign: 'left',
                  fontWeight: '600',
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 18,
                  flex:1,
                  maxWidth:'55%',
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default AllConsern

const styles = StyleSheet.create({})