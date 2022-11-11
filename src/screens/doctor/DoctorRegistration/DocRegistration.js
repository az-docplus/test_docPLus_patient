import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Image,
  Animated,
  Easing,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {Picker} from '@react-native-community/picker';
import {CheckBox} from 'react-native-elements';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import AnimatedErrorText from '../../../components/atoms/animatedErrorText/AnimatedErrorText';
import Button from '../../../components/atoms2/button/button';
import InputCompo from '../../../components/atoms2/Input/Input1';

const DocRegistration = ({navigation}) => {
  const [triangle, setTriangle] = useState(false);
  const [ischecked, setIschecked] = useState(false);
  const [showheadings, setShowHeadings] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [registrationCouncil, setRegistrationCouncil] = useState('');
  const [registrationYear, setRegistrationYear] = useState('');
  const [error, setError] = useState(false);

  const hidetext = () => {
    setTriangle(!triangle);
  };
  const hideheadings = () => {
    setShowHeadings(true);
  };

  const handlecheckbox = () => {
    setIschecked(!ischecked);
  };
  const checkInputs = () => {
    if (
      registrationCouncil == '' ||
      registrationNumber == '' ||
      registrationYear == ''
    ) {
      setError(true);
    }
  };

  return (
    <View>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 40,
              height: 800,
              backgroundColor: '#FCFCFC',
            }}>
            <View style={styles.docimg}>
              <TopNavBar
                hideRightComp={true}
                onLeftButtonPress={() => {
                  navigation.goBack();
                  // nextpage(0);
                }}
                navigation={navigation}
                style={{
                  Container: {
                    marginTop: 5,
                    position: 'absolute',
                    backgroundColor: 'transparent',
                  },
                }}
              />
              <Image
                style={{height: '130%', marginBottom: 50}}
                source={{
                  uri:
                    'https://media.istockphoto.com/photos/portrait-of-middle-aged-asian-female-doctor-standing-in-hospital-picture-id1271328839?b=1&k=20&m=1271328839&s=170667a&w=0&h=SIMzwoe8eu43OoY4M3ElZCMxW9MgDbZbVzMhh4VY2zM=',
                }}
                alt="doc"
              />
              <Text
                style={{
                  marginTop: -230,
                  fontSize: 21,
                  lineHeight: 23.44,
                  marginLeft: 50,
                  color: '#000000',
                  fontFamily: 'Montserrat-Regular',
                  fontWeight: '900',
                }}>
                Hello
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  marginLeft: 50,
                  fontFamily: 'Montserrat-Regular',
                  color: '#077EE9',
                  fontWeight: '900',
                }}>
                Dr. Nishank
              </Text>
            </View>
            <View style={styles.curvedbox}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    marginLeft: 35,
                    marginTop: 20,
                    color: '#333333',
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  Please enter your
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    marginTop: 20,
                    color: '#339999',
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  {' '}
                  Registration details
                </Text>
              </View>
              <View style={{marginTop: 25, marginLeft: 30}}>
                {showheadings && (
                  <View style={{marginLeft: 14, marginBottom: 4}}>
                    <Text style={{color: '#707585'}}>Registration Number</Text>
                  </View>
                )}
                {/* <View style={styles.shadowboxes}>
                  <View style={styles.inputboxes}> */}
                <View style={{marginRight: 30}}>
                  <InputCompo
                    type="registration"
                    isError={false}
                    isLoading={false}
                    value={(e) => setInputValue(e)}
                  />
                </View>
                {/* <TextInput
                      value={registrationNumber}
                      maxLength={15}
                      onChangeText={() => {
                        hideheadings();
                      }}
                      style={{marginLeft: 10}}
                      placeholder="   Please enter your registration number"></TextInput> */}
                {/* </View>
                </View> */}
                <View>
                  {error && (
                    <AnimatedErrorText
                      text={'Please enter a valid registration number'}
                    />
                  )}
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        marginLeft: 6,
                        marginTop: 8,
                        color: '#707585',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      Registration Number is a unique identification
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        hidetext();
                      }}>
                      {triangle ? (
                        <Image
                          source={require('../../../assets/jpg/triangle.png')}
                          style={{
                            height: 12,
                            width: 12,
                            marginTop: 12,
                            marginLeft: 2,
                          }}
                        />
                      ) : (
                        <Image
                          source={require('../../../assets/jpg/invertedtriangle.png')}
                          style={{
                            height: 12,
                            width: 12,
                            marginTop: 12,
                            marginLeft: 2,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                {triangle && (
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        marginLeft: -18,
                        marginTop: -2,
                        color: '#707585',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      number issued to health care providers in India{'\n'} by
                      their respective Medical Council
                    </Text>
                  </View>
                )}
              </View>
              <View style={{marginTop: 20, marginLeft: 30}}>
                {showheadings && (
                  <View style={{marginLeft: 14, marginBottom: 4}}>
                    <Text style={{color: '#707585'}}>Medical council</Text>
                  </View>
                )}
                <View style={{marginRight: 30}}>
                  <InputCompo
                    type="medical"
                    isError={false}
                    isLoading={false}
                    value={(e) => setInputValue(e)}
                  />
                </View>
                {error && (
                  <AnimatedErrorText
                    text={'Please enter a valid medical council'}
                  />
                )}
              </View>
              <View style={{marginTop: 25, marginLeft: 30}}>
                <View style={{marginLeft: 14, marginBottom: 5}}></View>
                <View style={{marginRight: 30}}>
                  <InputCompo
                    type="year"
                    isError={false}
                    isLoading={false}
                    value={(e) => setInputValue(e)}
                  />
                </View>
                {error && (
                  <AnimatedErrorText
                    text={'Please enter a valid registration year'}
                  />
                )}
              </View>
              <View style={{marginLeft: -8, marginTop: 10}}>
                <View style={styles.shadowboxes1}>
                  <View style={styles.permitbox}>
                    <View style={{marginTop: 10, marginLeft: -15}}>
                      <CheckBox
                        checked={ischecked}
                        onPress={() => {
                          handlecheckbox();
                        }}></CheckBox>
                    </View>
                    <View
                      style={{
                        marginTop: 2,
                        marginLeft: -8,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Regular',
                          color: '#000000',
                        }}>
                        I, Dr Nishank, permit Docplus to fetch {'\n'} my
                        publically available information
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* onPress=
              {() => {
                console.log('pressed continue');
                checkInputs();
              }}
              text="Continue" */}
              <View
                style={{
                  width: 300,
                  marginLeft: 50,
                  marginTop: 20,
                  paddingBottom: 20,
                }}>
                <Button
                  title="Continue"
                  pressHandler={() => {
                    console.log('pressed continue');
                    checkInputs();
                  }}
                />
              </View>
              {/* <DmzButton
                onPress={() => {
                }}
                style={{
                  Text: {
                    width: '100%',
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 20,
                    fontFamily: 'Montserrat-SemiBold',
                    lineHeight: 23,
                  },
                  Container: {
                    width: 295,
                    height: 56,
                    borderRadius: 35,
                    backgroundColor: '#088DFF',
                    alignSelf: 'center',
                    marginTop: 50,
                    elevation: 3,
                  },
                }}
                text="Continue"
                //isLoading={loggingIn}
                //disabled={loggingIn}
              /> */}
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  docimg: {
    height: 200,
    width: '100%',
  },
  curvedbox: {
    height: 600,
    width: '100%',
    marginTop: -20,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowRadius: 2,
    shadowColor: '#F8F8F8',
    shadowOffset: {
      height: 4,
      width: 2,
    },
    shadowOpacity: 0.4,
  },
  inputboxes: {
    height: 50,
    width: 329,
    borderColor: 'black',
    backgroundColor: 'white',
    marginTop: 6,
    marginLeft: 4,
    borderRadius: 20,
  },
  shadowboxes: {
    height: 50,
    width: 329,
    shadowColor: 'white',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    borderRadius: 20,
    elevation: 8,
    borderColor: 'white',
  },
  permitbox: {
    height: 50,
    width: 329,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    backgroundColor: '#F8FCFB',
  },
  shadowboxes1: {
    marginTop: 20,
    marginLeft: 44,
    marginRight: 0,
    height: 50,
    width: 329,
    shadowColor: '#E2E6EE',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    borderRadius: 20,
    elevation: 8,
    borderColor: '#E2E6EE',
  },
});
export default DocRegistration;
