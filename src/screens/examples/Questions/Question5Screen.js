/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import Octicons from 'react-native-vector-icons/Octicons';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {ButtonGroup} from 'react-native-elements';
import StepsTracker from '../../../components/atoms/StepsTracker/StepsTracker';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import DocIllustration from '../../../assets/svg/docIllustration.svg';

export default function Question5Screen(props) {
  // const [selectedOpt, setOpt] = useState([1, 0]);
  const [selectedOpt1, setOpt1] = useState(0);
  const [selectedOpt2, setOpt2] = useState(0);

  const ques = [
    [
      'You have a history of asthma',
      'You have a history of chronic obstructive pulmonary disease/copd or emphysema',
      'You have a history of chronic bronchitis',
      'You have a history of interstitial lung disease',
      'You have a history of a chronic lung disease not listed above',
    ],
    [
      'You have a history of asthma',
      'You have a history of chronic bronchitis',
      'You have a history of interstitial lung disease',
      'You have a history of a chronic lung disease not listed above',
    ],
  ];

  const pressbtn = (val, key) => {
    if (key === 0) {
      setOpt1(val);
    } else {
      setOpt2(val);
    }
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
            paddingBottom: 35,
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
            <DocIllustration style={{marginLeft: 'auto', marginRight: 20}} />
          </View>
          <Text
            style={{
              fontSize: 38,
              fontWeight: 'bold',
              marginHorizontal: '11%',
              color: '#027E97',
            }}>
            Do you have a history of chronic lung disease?
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginHorizontal: '11%',
              color: '#027E97',
              marginTop: 10,
            }}>
            Answer to the below questions if any of these are true:
          </Text>
          {ques.map((item, key) => {
            return (
              <LinearGradient
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                colors={['#D0EAF3', 'rgba(255, 255, 255, 0.67284)']}
                style={{
                  width: '80%',
                  borderRadius: 21,
                  alignSelf: 'center',
                  marginTop: 20,
                }}>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingTop: 20,
                  }}>
                  {item.map((u, i) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 15,
                          marginHorizontal: 15,
                        }}>
                        <Octicons
                          name="primitive-dot"
                          size={20}
                          color="white"
                        />
                        <Text
                          style={{
                            fontSize: 16,
                            marginLeft: 20,
                            color: '#027E97',
                          }}>
                          {u}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <ButtonGroup
                  onPress={async (val) => {
                    pressbtn(val, key);
                  }}
                  selectedIndex={key === 0 ? selectedOpt1 : selectedOpt2}
                  buttons={['NO', 'YES']}
                  containerStyle={{
                    height: 41,
                    width: '50%',
                    borderBottomRightRadius: 21,
                    borderTopLeftRadius: 21,
                    alignSelf: 'flex-end',
                  }}
                  selectedButtonStyle={{backgroundColor: '#FF7A59'}}
                />
              </LinearGradient>
            );
          })}

          <DmzButton
            style={{
              Text: {
                width: '100%',
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
              },
              Container: {
                width: 131,
                height: 46,
                borderRadius: 17,
                backgroundColor: '#FF7A59',
                alignSelf: 'center',
                marginTop: 50,
                elevation: 10,
              },
            }}
            text="COMPLETE"
          />

          <StepsTracker
            text="Questions 5/5"
            textStyle={{
              fontSize: 16,
              color: '#FFFFFF',
            }}
            completed={100}
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
    width: '80%',
    alignSelf: 'center',
    borderRadius: 22,
    height: 58,
    marginTop: 20,
    elevation: 10,
  },
  nextBtn: {
    width: 42,
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
