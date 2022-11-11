import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import { useSelector, useDispatch } from 'react-redux';

import ToggleSwitch from 'toggle-switch-react-native';
import AD from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { UpdateProfile } from '../../../reduxV2/action/PatientAction';

const NotiifcationSetting = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const [count, setCount] = useState(0);

  const [smsNotification, setSmsNotification] = useState(false);
  const [mobileNotification, setMobileNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [whatsAppNotification, setWhatsAppNotification] = useState(false);

  useEffect(() => {
    if (count === 0) {
      setSmsNotification(userData.smsNotification);
      setMobileNotification(userData.mobileNotification);
      setEmailNotification(userData.emailNotification);
    }
  }, [userData]);

  useEffect(() => {
    if (count > 0) {
      const obj = {
        // id: userData._id,
        smsNotification: smsNotification,
        mobileNotification: mobileNotification,
        emailNotification: emailNotification,
        WhatsApp: whatsAppNotification,
        // oldPassword: oldPassword,
        // password: password,
      };

      dispatch(UpdateProfile(obj, userData._id));
    }
  }, [
    smsNotification,
    mobileNotification,
    emailNotification,
    whatsAppNotification,
  ]);
  return (
    <View
      style={[
        styles.Container,
        { backgroundColor: Colors.secondary_background[theme] },
      ]}>
      <TopNavBar
        navigation={navigation}
        headerText={`${Local('doctor.Settings.notification')} ${Local(
          'doctor.Settings.settings',
        )}`}
      />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 40,
          // backgroundColor: '#fcfcfc',
          backgroundColor: Colors.secondary_background[theme],
        }}>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: '6%',
            borderBottomWidth: 1,
            borderColor: '#e0e0e0',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="message-text-outline"
                size={25}
                style={{
                  marginRight: 15,
                  padding: 5,
                }}
                color="#297281"
                // style={{ color: '#EA1A65' }}
              />
              <Text
                style={{
                  // color: Colors.primary_text_color[theme],
                  color: '#333333',
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 20,
                }}>
                {Local('doctor.Settings.sms_notification')}
              </Text>
            </View>

            <ToggleSwitch
              isOn={smsNotification}
              onColor="#297281"
              offColor="gray"
              labelStyle={{ color: 'black', fontWeight: '900' }}
              size="medium"
              onToggle={(isOn) => {
                setSmsNotification(!smsNotification);
                setCount(count + 1);
              }}
              animationSpeed={200}
            />
          </View>
        </View>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: '6%',
            borderBottomWidth: 1,
            borderColor: '#e0e0e0',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Fontisto
                color="#297281"
                name="mobile-alt"
                size={30}
                style={{
                  marginRight: 15,
                  padding: 7,
                }}
                // style={{ color: '#EA1A65' }}
              />
              <Text
                style={{
                  // color: Colors.primary_text_color[theme],
                  color: '#333333',
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 20,
                }}>
                {Local('doctor.Settings.mobile_notification')}
              </Text>
            </View>

            <ToggleSwitch
              isOn={mobileNotification}
              onColor="#297281"
              offColor="gray"
              labelStyle={{ color: 'black', fontWeight: '900' }}
              size="medium"
              onToggle={(isOn) => {
                setMobileNotification(!mobileNotification);
                setCount(count + 1);
              }}
              animationSpeed={200}
            />
          </View>
        </View>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: '6%',
            borderBottomWidth: 1,
            borderColor: '#e0e0e0',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Fontisto
                color="#297281"
                name="email"
                size={25}
                style={{
                  marginRight: 15,
                  padding: 5,
                }}
                // style={{ color: '#EA1A65' }}
              />
              <Text
                style={{
                  // color: Colors.primary_text_color[theme],
                  color: '#333333',
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 20,
                }}>
                {Local('doctor.Settings.email_notification')}
              </Text>
            </View>

            <ToggleSwitch
              isOn={emailNotification}
              onColor="#297281"
              offColor="gray"
              labelStyle={{ color: 'black', fontWeight: '900' }}
              size="medium"
              onToggle={(isOn) => {
                setEmailNotification(!emailNotification);
                setCount(count + 1);
              }}
              animationSpeed={200}
            />
          </View>
        </View>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: '6%',
            borderBottomWidth: 1,
            borderColor: '#e0e0e0',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Fontisto
                color="#297281"
                name="whatsapp"
                size={25}
                style={{
                  marginRight: 15,
                  padding: 5,
                }}
                // style={{ color: '#EA1A65' }}
              />
              <Text
                style={{
                  // color: Colors.primary_text_color[theme],
                  color: '#333333',
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 20,
                }}>
                {Local('doctor.Settings.Whatsapp')}
              </Text>
            </View>

            <ToggleSwitch
              isOn={whatsAppNotification}
              onColor="#297281"
              offColor="gray"
              labelStyle={{ color: 'black', fontWeight: '900' }}
              size="medium"
              onToggle={(isOn) => {
                setWhatsAppNotification(!whatsAppNotification);
                setCount(count + 1);
              }}
              animationSpeed={200}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default NotiifcationSetting;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    // backgroundColor: '#fff',
    height: '100%',
  },
});
