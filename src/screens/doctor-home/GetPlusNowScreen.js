import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from 'react-native-text-gradient';
import { Button, Avatar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import { Host } from './../../utils/connection';
import { UpdateProfile } from './../../reduxV2/action/PatientAction';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
const { width, height } = Dimensions.get('window');
import InsetShadow from 'react-native-inset-shadow';
function GetPlusNowScreen({ navigation }) {
  const FAQ = [
    {
      text1: 'What is PLUS?',
      text2:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    },
    {
      text1: 'How do unlimited online consultations work?',
      text2:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    },
    {
      text1: 'What doctors will be available for consultation?',
      text2:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    },
    {
      text1: 'What is Healthcare Team?',
      text2:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    },
  ];

  const handleMoreDetails = () => {
    setExpand(!expand);
  };
  console.log(navigation);
  const dispatch = useDispatch();
  const { isLoggedin, userData } = useSelector((state) => state.AuthReducer);
  console.log(userData);
  const paymentData = {
    payment: { payment: true, date: new Date().toISOString(), amount: 449 },
  };

  const GetPlusNow = () => {
    var options = {
      description: 'Get Plus',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_hRsc7oAQ82vplt', // Your api key
      amount: '44900',
      name: 'DocPlus',
      prefill: {
        email: userData.email,
        contact: userData.phone,
        name: `${userData.firstName} ${userData.lastName}`,
      },
      theme: { color: '#F37254' },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success

        dispatch(UpdateProfile(paymentData, userData._id));
        navigation.navigate('PatientLandingScreen');

        // alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  const Card = () => {
    return (
      <View style={{ marginHorizontal: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Image
            style={{ width: 80, height: 80, marginRight: 20 }}
            resizeMode="center"
            source={require('../../assets/icons/Vector.png')}
          />
          <View>
            <Text style={styles.maintxt}>24x7 Care Available</Text>
            <Text style={styles.secondarytxt}>
              Have care by your side all the time Have care by your side all the
              time
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Image
            style={{ width: 80, height: 80, marginRight: 20 }}
            resizeMode="center"
            source={require('../../assets/icons/family_.png')}
          />
          <View>
            <Text style={styles.maintxt}>Unlimited Consultation</Text>
            <Text style={styles.secondarytxt}>
              Connect and get unlimited care
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            alignItems: 'center',
          }}>
          <Image
            style={{ width: 80, height: 80, marginRight: 20 }}
            resizeMode="center"
            source={require('../../assets/icons/lock2.png')}
          />
          <View>
            <Text style={styles.maintxt}>Private and Secure</Text>
            <Text style={styles.secondarytxt}>
              Consult without sharing your identity
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            alignItems: 'center',
          }}>
          <Image
            style={{ width: 80, height: 80, marginRight: 20 }}
            resizeMode="center"
            source={require('../../assets/icons/bade.png')}
          />
          <View>
            <Text style={styles.maintxt}>30-days Money back</Text>
            <Text style={styles.secondarytxt}>
              Prepay with Paytm, UPI, and more
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          // backgroundColor: 'green',
          marginHorizontal: 5,
          marginVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={35} />
      </TouchableOpacity>
      <ScrollView>
        <View style={{ marginVertical: 20 }}>
          <LinearGradient
            colors={['#036D6D', '#042525']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.linearGradient}>
            <View>
              <Text style={styles.Gradienttxt}>Get PRO free for 14 days</Text>
              <Text style={styles.Gradienttxt2}>
                Experience the future of healthcare at your convenience
              </Text>
              <Text style={styles.Gradienttxt3}>
                Offer ends in 7d: 14h: 8m: 36s
              </Text>
              <TouchableOpacity
                style={{ marginHorizontal: 40, marginVertical: 10 }}
                onPress={() =>
                  isLoggedin
                    ? GetPlusNow()
                    : navigation.navigate('WelcomeScreenCompo')
                }>
                <InsetShadow
                  shadowOpacity={1}
                  shadowOffset={15}
                  containerStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 30,
                    textAlignVertical: 'center',
                    paddingHorizontal: 5,
                    height: 50,
                    elevation: 3,
                    // marginHorizontal: 5,

                    borderWidth: 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  // shadowOffset={10}
                  elevation={12}>
                  <Text
                    style={{
                      color: '#297281',
                      fontSize: 24,
                      fontFamily: 'Gilroy-SemiBold',
                    }}>
                    Get Started
                  </Text>
                </InsetShadow>
              </TouchableOpacity>
              {/* <Button
            labelStyle={{ fontFamily: 'Gilroy-Bold' }}
            color="#077EE9"
            style={styles.btn}></Button> */}
              <Text style={styles.Gradienttxt4}>
                Offer valid till 31 March 2022
              </Text>
              <Text
                style={[
                  styles.Gradienttxt4,
                  {
                    textDecorationLine: 'underline',
                    marginBottom: 10,
                  },
                ]}>
                Terms and Conditions apply.{' '}
              </Text>
            </View>
          </LinearGradient>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 28,
                fontFamily: 'Gilroy-Bold',
                textAlign: 'center',
              }}>
              The Power of{' '}
            </Text>
            <LinearTextGradient
              style={{
                fontWeight: 'Gilroy-Bold',
                fontSize: 28,
                textAlign: 'center',
              }}
              locations={[0, 1]}
              colors={['#3EAEAE', '#077EE9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}>
              <Text style={{ textAlign: 'center' }}>PLUS</Text>
            </LinearTextGradient>
          </View>
          <Card />
          <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <Text
              style={{
                color: '#297281',
                fontFamily: 'Gilroy-Bold',
                fontSize: 28,
                textAlign: 'center',
              }}>
              Get PRO Now!
            </Text>
            <View style={{ padding: 20 }}>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'Gilroy-Regular',
                  fontSize: 16,
                  textAlign: 'justify',
                }}>
                Get unlimited advice for you and your family from a team of
                Healthcare Professionals
              </Text>
            </View>
          </View>
          <View style={{ marginVertical: 20, elevation: 4 }}>
            <LinearGradient
              colors={['#3EAEAE', '#077EE9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.linearGradient}>
              <View style={{ padding: 20 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-Bold',
                        fontSize: 20,
                        lineHeight: 23,
                        letterSpacing: 0.02,
                        color: '#FFFFFF',
                      }}>
                      PLUS
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-Medium',
                        fontSize: 9,
                        lineHeight: 11,
                        letterSpacing: 0.02,
                        color: '#FFFFFF',
                      }}>
                      For 4 Family members
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-Bold',
                        fontSize: 20,
                        lineHeight: 23,
                        letterSpacing: 0.02,
                        color: '#FFFFFF',
                      }}>
                      FREE
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-Medium',
                        fontSize: 9,
                        lineHeight: 11,
                        letterSpacing: 0.02,
                        color: '#FFFFFF',
                      }}>
                      FOR 14 DAYS
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: '#FFFFFF',
                    borderBottomWidth: 1,
                    marginVertical: 20,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 14,
                        lineHeight: 16,
                        letterSpacing: 0.02,
                        color: '#FFFFFF',
                        marginBottom: 10,
                      }}>
                      Start free trial
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 14,
                        lineHeight: 16,
                        letterSpacing: 0.02,
                        color: '#FFFFFF',
                      }}>
                      Start billing date
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 14,
                        lineHeight: 16,
                        letterSpacing: 0.02,
                        color: '#FFFFFF',
                        marginBottom: 10,
                      }}>
                      Today
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 14,
                        lineHeight: 16,
                        letterSpacing: 0.02,
                        color: '#FFFFFF',
                      }}>
                      1 April 2022
                    </Text>
                  </View>
                </View>
                <View style={{ marginVertical: 20 }}>
                  {[
                    'One-time payment of 449 INR for 1 month',
                    'You won’t be charged until 1 April 2022',
                    'Cancel anytime. Offer terms apply.',
                    'We’ll remind you 7 days before you get charged',
                    'Offer ends on 31 March 2022',
                  ].map((text, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <Text>⚪</Text>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Bold',
                          marginLeft: 20,
                          fontSize: 12,
                          lineHeight: 14,
                          letterSpacing: 0.02,
                          color: '#FFFFFF',
                        }}>
                        {text}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </LinearGradient>
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: 15 }}>
            <View style={{ padding: 20 }}>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'Gilroy-Regular',
                  fontSize: 16,
                  textAlign: 'justify',
                }}>
                By purchasing, you authorize Docplus to charge you the price
                above for the duration you selected. You agree that your right
                of withdrawal, including refund, is available within 14 days of
                purchase but is lost if you use Docplus during that time.
                Non-subscribing members will return to free account. No partial
                refunds. Terms apply.
              </Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={{ width: '60%', marginRight: 20 }}
                resizeMode="center"
                source={require('../../assets/icons/getway.png')}
              />
              <TouchableOpacity>
                <LinearGradient
                  colors={['#2D7D8E', '#246370']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[
                    styles.linearGradient,
                    { paddingVertical: 15, paddingHorizontal: 15 },
                  ]}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Bold',
                      color: '#FFFFFF',
                      fontSize: 16,
                    }}>
                    Continue Purchase
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View>
              <Text
                style={{
                  marginVertical: 20,
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 24,
                  textAlign: 'center',
                }}>
                FAQ’s
              </Text>
              <View>
                {FAQ.map((item, index) => (
                  <FAQComponent item={item} keyValue={index} />
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const FAQComponent = ({ item, keyValue }) => {
  const [expand, setExpand] = useState(false);
  return (
    <View
      key={keyValue}
      style={{
        backgroundColor: '#FFFFFF',
        padding: 15,
        elevation: 12,
        marginVertical: 10,
        borderRadius: 15,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Gilroy-SemiBold',
            fontSize: 18,
            color: '#666666',
            width: '90%',
          }}>
          {item.text1}
        </Text>
        <TouchableOpacity onPress={() => setExpand(!expand)}>
          <Entypo
            name={expand ? 'chevron-small-up' : 'chevron-small-down'}
            style={{
              fontSize: 30,
              color: '#EA1A65',

              // color: NEW_PRIMARY_COLOR,
              // marginHorizontal: 4,
            }}></Entypo>
        </TouchableOpacity>
      </View>
      {expand && (
        <Text
          style={{
            marginTop: 10,
            fontFamily: 'Gilroy-SemiBold',
            fontSize: 18,
            color: '#666666',
          }}>
          {item.text2}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  linearGradient: {
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 25,
    paddingVertical: 10,
    elevation: 4,
  },
  Gradienttxt: {
    fontFamily: 'Gilroy-Bold',
    color: '#fff',
    fontSize: 24,
    alignSelf: 'center',
    marginVertical: 20,
    // marginRight: 10,
  },
  Gradienttxt2: {
    fontFamily: 'Gilroy-Medium',
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
    letterSpacing: 0.02,
    lineHeight: 21,
  },
  Gradienttxt3: {
    fontFamily: 'Gilroy-SemiBold',
    color: '#fff',
    fontSize: 16,
    alignSelf: 'center',
    marginVertical: 10,

    letterSpacing: 0.02,
    lineHeight: 21,
  },
  btn: {
    backgroundColor: '#fff',
    marginHorizontal: 40,
    borderRadius: 30,
    paddingVertical: 12,
    elevation: 12,
    marginVertical: 15,
    alignItems: 'center',
  },
  Gradienttxt4: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Gilroy-Medium',

    textAlign: 'center',
  },
  maintxt: { fontFamily: 'Gilroy-SemiBold', fontSize: 24, color: '#047B7B' },
  secondarytxt: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 16,
    color: '#000000',
    width: 230,
    marginTop: 10,
  },
});
export default GetPlusNowScreen;
