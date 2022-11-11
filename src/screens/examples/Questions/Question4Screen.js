/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import NextBtn from '../../../assets/svg/next_btn.svg';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {ScrollView} from 'react-native-gesture-handler';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import StepsTracker from '../../../components/atoms/StepsTracker/StepsTracker';
import ButtonChildren from '../../../components/atoms/ButtonChildren/ButtonChildren';
import Umbrella from '../../../assets/svg/umbrella.svg';

export default function Question4Screen(props) {
  const [selectedIndex, setIndex] = useState(2);

  const options = [
    'I have an insurance',
    'I dont have insurance',
    'My plan is not listed',
  ];

  const getSearch = (i) => {
    if (selectedIndex == i) {
      return (
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 2,
            borderColor: 'rgba(255, 255, 255, 0.49)',
            width: '80%',
            alignSelf: 'center',
            marginTop: 20,
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Search for your insurance company"
            placeholderTextColor="white"
            style={{width: '90%', fontSize: 13, color: 'white'}}
          />
          <Fontisto name="search" size={20} color="white" />
        </View>
      );
    }
  };

  const pressbtn = (val) => {
    setIndex(val);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <RadialGradient
          style={{
            width: '100%',
            height: 'auto',
            zIndex: 0,
            flex: 1,
            paddingBottom: 70,
          }}
          colors={['#DEF1F9', '#C0E0EC', '#95CCE0']}
          stops={[0.0, 0.2, 0.75]}
          center={[130, 100]}
          radius={200}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <DmzButton
              style={{
                Text: {
                  width: '100%',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: 'rgba(255, 255, 255, 0.79)',
                },
                Container: {
                  width: 88,
                  height: 42,
                  backgroundColor: 'rgba(2, 126, 151, 0.21)',
                  elevation: 0,
                  borderRadius: 0,
                  borderBottomRightRadius: 15,
                  borderTopRightRadius: 15,
                },
              }}
              text={'SKIP'}
            />
            <Umbrella style={{marginLeft: 'auto', marginRight: 20}} />
          </View>

          <DmzText
            style={{
              fontSize: 38,
              lineHeight: 40,
              fontWeight: 'bold',
              marginLeft: '10%',
              color: '#027E97',
              marginTop: 10,
            }}
            text="Choose the correct options"
          />
          {options.map((u, i) => {
            return (
              <View>
                <DmzButton
                  onPress={() => pressbtn(i)}
                  style={{
                    Text: {
                      width: '100%',
                      fontSize: 16,
                      color: selectedIndex == i ? '#fff' : '#027E97',
                      paddingLeft: 20,
                    },
                    Container: [
                      styles.btnStyle,
                      {
                        marginTop: 30,
                        backgroundColor:
                          selectedIndex == i ? '#FF7A59' : '#fff',
                      },
                    ],
                  }}
                  text={u}
                />

                {i == 0 ? getSearch(0) : null}
              </View>
            );
          })}
          <View style={{marginTop: 15}}>
            <ButtonChildren
              onPress={props.onPress}
              style={{Container: [styles.nextBtn]}}>
              <NextBtn />
            </ButtonChildren>

            <StepsTracker
              text="Questions 4/5"
              textStyle={{
                fontSize: 16,
                color: '#FFFFFF',
              }}
              completed={80}
              completedColor={'#027E97'}
              incompletedColor={'#D5E9F4'}
            />
          </View>
        </RadialGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: 22,
    height: 58,
    marginTop: 20,
    elevation: 10,
  },
  nextBtn: {
    width: 45,
    height: 42,
    backgroundColor: '#027E97',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
    marginLeft: 'auto',
    marginRight: '10%',
  },
});
