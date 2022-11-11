/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import StepsTracker from '../../../components/atoms/StepsTracker/StepsTracker';
import NextBtn from '../../../assets/svg/next_btn.svg';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import ButtonChildren from '../../../components/atoms/ButtonChildren/ButtonChildren';
import Magnify from '../../../assets/svg/magnify.svg';

export default function Question2Screen(props) {
  const [selectedSymptom, setSymptom] = useState('');
  const reasons1 = ['Cough', 'Cold', 'COVID'];
  const reasons2 = ['Sore Throat', 'Influenza (Flu)'];
  const reasons3 = ['Prescription Refill', 'Urinary Tract Infection (UTI)'];

  const pressbtn = (val) => {
    setSymptom(val);
  };

  return (
    <View style={{flex: 1}}>
      <RadialGradient
        style={{width: '100%', height: 'auto', zIndex: 0, flex: 1}}
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
          <Magnify style={{marginLeft: 'auto', marginRight: 20}} />
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
          text="Reason for the visit?"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 20,
          }}>
          {reasons1.map((u, i) => {
            return (
              <DmzButton
                style={{
                  Text: {
                    width: 'auto',
                    fontSize: 16,
                    color: selectedSymptom == u ? '#fff' : '#027E97',
                    textAlign: 'center',
                    fontWeight: 'normal',
                  },
                  Container: [
                    styles.btnStyle,
                    {
                      marginTop: 30,
                      backgroundColor:
                        selectedSymptom == u ? '#FF7A59' : '#fff',
                      width: 'auto',
                      paddingHorizontal: 25,
                    },
                  ],
                }}
                text={u}
              />
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 20,
          }}>
          {reasons2.map((u, i) => {
            return (
              <DmzButton
                style={{
                  Text: {
                    width: 'auto',
                    fontSize: 16,
                    color: selectedSymptom == u ? '#fff' : '#027E97',
                    textAlign: 'center',
                    fontWeight: 'normal',
                  },
                  Container: [
                    styles.btnStyle,
                    {
                      marginTop: 30,
                      backgroundColor:
                        selectedSymptom == u ? '#FF7A59' : '#fff',
                      width: 'auto',
                      paddingHorizontal: 25,
                    },
                  ],
                }}
                text={u}
              />
            );
          })}
        </View>
        <View>
          {reasons3.map((u, i) => {
            return (
              <DmzButton
                style={{
                  Text: {
                    width: '80%',
                    fontSize: 16,
                    color: selectedSymptom == u ? '#fff' : '#027E97',
                    textAlign: 'center',
                    fontWeight: 'normal',
                  },
                  Container: [
                    styles.btnStyle,
                    {
                      marginTop: 30,
                      backgroundColor:
                        selectedSymptom == u ? '#FF7A59' : '#fff',
                      width: 'auto',
                      paddingHorizontal: 25,
                    },
                  ],
                }}
                text={u}
              />
            );
          })}
        </View>
        <TouchableHighlight
          onPress={() => {
            this.pressbtn('others');
          }}
          style={[
            styles.btnStyle,
            {
              marginTop: 30,
              backgroundColor: selectedSymptom == 'other' ? '#FF7A59' : '#fff',
              width: '90%',
            },
          ]}>
          <View
            style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                width: '90%',
                fontSize: 16,
                color: selectedSymptom == 'others' ? '#fff' : '#027E97',
                paddingLeft: 20,
              }}>
              Others
            </Text>
            <Text
              style={{
                width: '10%',
                fontSize: 30,
                color: '#027E97',
              }}>
              +
            </Text>
          </View>
        </TouchableHighlight>

        <ButtonChildren
          onPress={props.onPress}
          style={{Container: [styles.nextBtn]}}>
          <NextBtn />
        </ButtonChildren>

        <StepsTracker
          text="Questions 2/5"
          textStyle={{
            fontSize: 16,
            color: '#FFFFFF',
          }}
          completed={40}
          completedColor={'#027E97'}
          incompletedColor={'#D5E9F4'}
        />
      </RadialGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    alignSelf: 'center',
    borderRadius: 15,
    height: 39,
    marginTop: 20,
    elevation: 10,
    justifyContent: 'center',
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
