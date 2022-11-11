import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Easing,
} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import PropfilePic from '../../../components/atoms/ProfilePic/ProfilePic';
import HamBurg from '../../../assets/svg/hamburger.svg';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import Antdesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../../styles/index';
import DmzHeaderAtom from '../../../components/atoms/DmzHeader/DmzHeaderAtom';
import AnimInput from '../../../components/molecules/AnimInput/AnimInput';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
function Payments() {
  const height = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;
  const rotateY = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const addCardAnim = useRef(new Animated.Value(0)).current;
  const [addCardForm, setAddCardForm] = useState(false);
  const dimen = useWindowDimensions();
  const onPress = () => {
    Animated.sequence([
      Animated.timing(height, {
        toValue: 1,
        duration: 500,
        delay: 200,
        easing: Easing.elastic(),
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 1500,
          delay: 200,
          easing: Easing.elastic(),
          useNativeDriver: true,
        }),
        Animated.timing(rotateY, {
          toValue: 1,
          duration: 1500,
          delay: 200,
          easing: Easing.elastic(),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(translateY, {
        toValue: 1,
        delay: 100,
        duration: 500,
        easing: Easing.elastic(),
        useNativeDriver: false,
      }),
    ]).start(() => {
      setAddCardForm(true);
      Animated.timing(addCardAnim, {
        toValue: 1,
        delay: 200,
        duration: 1000,
        easing: Easing.elastic(),
        useNativeDriver: false,
      }).start();
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <DmzHeaderAtom style={{height: 'auto'}}>
        <TopNavBar
          headerText=""
          LeftComp={
            <PropfilePic
              style={{
                Container: {
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                },
              }}
              sourceurl={require('../../../assets/jpg/person1.jpg')}
            />
          }
        />
        <Animated.View
          style={[
            Styles.AnimContainer,
            {
              height: height.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '30%'],
              }),
              backgroundColor: 'transparent',
            },
          ]}>
          <Animated.View
            style={[
              Styles.AnimCard,
              {
                opacity: scale,
                transform: [
                  {
                    scale: scale,
                  },
                  {
                    rotateY: rotateY.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: ['-10deg', '190deg', '0deg'],
                    }),
                  },
                ],
                alignSelf: 'center',
              },
            ]}
          />
        </Animated.View>
      </DmzHeaderAtom>
      <Animated.View
        style={{
          height: '50%',
          zIndex: 9999,
          backgroundColor: '#fff',
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -40],
              }),
            },
          ],
          borderTopLeftRadius: translateY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 38],
          }),
          borderTopRightRadius: translateY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 38],
          }),
        }}>
        <ScrollView
          style={{height: '100%'}}
          contentContainerStyle={[
            Styles.AnimContainer,
            {padding: 15, paddingTop: 25},
          ]}>
          {!addCardForm && (
            <Animated.View
              style={{
                opacity: addCardAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              }}>
              <TouchableOpacity style={Styles.AddCard} onPress={onPress}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Antdesign name="plus" size={18} />
                </View>
                <View style={{flex: 5}}>
                  <DmzText text="Add a credit card" normal gap_small type={3} />
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}

          {addCardForm && (
            <Animated.View
              style={{
                opacity: addCardAnim,
              }}>
              <View style={{flex: 1, marginBottom: 10}}>
                <DmzText text="Card Number" type={3} semi_bold gap_small />
                <AnimInput
                  withAnim={false}
                  placeholder={'card number'}
                  style={{
                    Container: {
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 10,
                    },
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <View style={{width: '45%'}}>
                  <DmzText text="Expiry Date" type={3} semi_bold gap_small />
                  <AnimInput
                    withAnim={false}
                    placeholder={'Expiry Date'}
                    style={{
                      Container: {
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 10,
                      },
                    }}
                  />
                </View>
                <View style={{width: '45%'}}>
                  <DmzText text="Secure Code" type={3} semi_bold gap_small />
                  <AnimInput
                    withAnim={false}
                    placeholder={'Secure Code'}
                    style={{
                      Container: {
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 10,
                      },
                    }}
                  />
                </View>
              </View>
              <View style={{flex: 1}}>
                <DmzText text="Name on the Card" type={3} semi_bold gap_small />
                <AnimInput
                  withAnim={false}
                  placeholder={'Name on the Card'}
                  style={{
                    Container: {
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 10,
                    },
                  }}
                />
              </View>

              <DmzButton
                text="Pay"
                style={{
                  Container: {
                    alignSelf: 'center',
                    width: '90%',
                    marginTop: 40,
                    backgroundColor: 'rgba(100,100,221, 0.8)',
                    elevation: 0,
                  },
                }}
              />
            </Animated.View>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const Styles = StyleSheet.create({
  AnimContainer: {
    width: '100%',
    borderRadius: 38,
  },
  AnimCard: {
    width: '90%',
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 20,
    backfaceVisibility: 'visible',
    transform: [
      {
        perspective: 100,
      },
    ],
  },
  AddCard: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
export default Payments;
