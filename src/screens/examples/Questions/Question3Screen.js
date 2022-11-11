/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import SymptomsBtn from './SymptomsBtn';
import SymptomsBtn2 from './SymptomsBtn2';
import StepsTracker from '../../../components/atoms/StepsTracker/StepsTracker';
import NextBtn from '../../../assets/svg/next_btn.svg';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import ButtonChildren from '../../../components/atoms/ButtonChildren/ButtonChildren';
import Doctor from '../../../assets/svg/doctor.svg';

export default function Question3Screen(props) {
  const [selectedSymptom, setSymptom] = useState('Palpitation');
  const [selectedSymptom2, setSymptom2] = useState('Palpitation');

  const pressbtn = (val) => {
    setSymptom(val);
  };

  const pressbtn2 = (val) => {
    setSymptom2(val);
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
            paddingBottom: 50,
          }}
          colors={['#DEF1F9', '#C0E0EC', '#95CCE0']}
          stops={[0.0, 0.2, 0.75]}
          center={[130, 100]}
          radius={200}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '-25%',
              marginBottom: '-45%',
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
            <Doctor style={{marginLeft: 'auto', marginRight: '-10%'}} />
          </View>
          <Text
            style={{
              fontSize: 38,
              fontWeight: 'bold',
              marginHorizontal: '7%',
              color: '#027E97',
            }}>
            Do you have these symptoms?
          </Text>
          <SymptomsBtn selectedVal={selectedSymptom} onPress={pressbtn} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginHorizontal: '10%',
              color: '#027E97',
              marginTop: 60,
            }}>
            GASTROINTESTINAL
          </Text>
          <SymptomsBtn2 selectedVal={selectedSymptom2} onPress={pressbtn2} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '80%',
              marginTop: 30,
              marginLeft: '10%',
            }}>
            <ButtonChildren
              style={{
                Text: {
                  width: '100%',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: 'rgba(255, 255, 255, 0.79)',
                },
                Container: [
                  styles.btnStyle,
                  {
                    marginTop: 30,
                    backgroundColor: '#71B4CD',
                    width: '70%',
                  },
                ],
                innerContainer: {
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              }}
              children={
                <>
                  <Text
                    style={{
                      width: '80%',
                      fontSize: 16,
                      color: '#fff',
                      paddingLeft: 20,
                    }}>
                    Others
                  </Text>
                  <Text
                    style={{
                      width: '20%',
                      fontSize: 30,
                      color: '#fff',
                    }}>
                    +
                  </Text>
                </>
              }
            />
            <ButtonChildren
              style={{
                Text: {
                  width: '100%',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: 'rgba(255, 255, 255, 0.79)',
                },
                Container: [
                  styles.btnStyle,
                  {
                    marginTop: 30,
                    backgroundColor: '#71B4CD',
                    width: '70%',
                  },
                ],
                innerContainer: {
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              }}
              children={
                <>
                  <Text
                    style={{
                      width: '80%',
                      fontSize: 16,
                      color: '#fff',
                      paddingLeft: 20,
                    }}>
                    More
                  </Text>
                  <Text
                    style={{
                      width: '20%',
                      fontSize: 30,
                      color: '#fff',
                    }}>
                    +
                  </Text>
                </>
              }
            />
          </View>

          <ButtonChildren
            onPress={props.onPress}
            style={{Container: [styles.nextBtn]}}>
            <NextBtn />
          </ButtonChildren>

          <StepsTracker
            text="Questions 3/5"
            textStyle={{
              fontSize: 16,
              color: '#FFFFFF',
            }}
            completed={60}
            completedColor={'#027E97'}
            incompletedColor={'#D5E9F4'}
          />
        </RadialGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    alignSelf: 'center',
    borderRadius: 15,
    height: 39,
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
    elevation: 10,
  },
});
