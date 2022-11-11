/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import Family from '../../../assets/svg/family.svg';
import NextBtn from '../../../assets/svg/next_btn.svg';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import ButtonChildren from '../../../components/atoms/ButtonChildren/ButtonChildren';
import StepsTracker from '../../../components/atoms/StepsTracker/StepsTracker';

export default function Question1Screen(props) {
  const [selectedIndex, setIndex] = useState(0);

  const btns = ['MYSELF', 'MOTHER', 'FATHER', 'OTHERS'];

  const pressbtn = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <View style={{flex: 1}}>
      <RadialGradient
        style={{width: '100%', height: '100%', zIndex: 0, flex: 1}}
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
          <Family style={{marginLeft: 50}} />
        </View>
        <Text
          style={{
            fontSize: 38,
            fontWeight: 'bold',
            marginLeft: '10%',
            color: '#027E97',
          }}>
          Who is the {'\n'}patient?
        </Text>
        {btns.map((u, i) => {
          return (
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
                    backgroundColor: selectedIndex == i ? '#FF7A59' : '#fff',
                  },
                ],
              }}
              text={u}
            />
          );
        })}
        <ButtonChildren
          onPress={props.onPress}
          style={{Container: [styles.nextBtn]}}>
          <NextBtn />
        </ButtonChildren>

        <StepsTracker
          text="Questions 1/5"
          textStyle={{
            fontSize: 16,
            color: '#FFFFFF',
          }}
          completed={20}
          completedColor={'#027E97'}
          incompletedColor={'#D5E9F4'}
        />
      </RadialGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: 15,
    height: 58,
    marginTop: 20,
    elevation: 0,
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
