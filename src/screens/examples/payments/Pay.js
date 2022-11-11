/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  // ScrollView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {
  // NEW_HEADER_TEXT,
  // GREY_OUTLINE,
  SECONDARY_COLOR,
  INPUT_PLACEHOLDER,
  // NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Local, setLocale} from '../../../i18n';

const Pay = ({params, navigation}) => {
  const mode = 'gpay',
    id = '+91 4829017894',
    ammount = 600,
    onPress = () => {};

  let imageSrc = null;
  const [upi, setUpi] = useState('');

  switch (mode) {
    case 'paytm':
      imageSrc = require('../../../assets/icons/paytm.png');
      break;
    case 'gpay':
      imageSrc = require('../../../assets/icons/gpay.png');
      break;
    case 'amazonpay':
      imageSrc = require('../../../assets/icons/amazonpay.png');
      break;
    case 'paypal':
      imageSrc = require('../../../assets/icons/paypal.png');
      break;
    case 'upi':
      imageSrc = require('../../../assets/icons/upi.png');
      break;
  }

  return (
    <View style={styles.Container}>
      <TopNavBar
        hideRightComp
        headerText={`${Local("patient.transactions.pay")}`}
        navigation={navigation}
        style={{
          Container: {
            height: 'auto',
            marginTop: 5,
          },
        }}
      />
      <View style={styles.body}>
        <Image
          source={imageSrc}
          style={{height: 100, width: '100%', marginBottom: 40}}
          resizeMode="contain"
        />
        <Text style={[styles.text1, {marginBottom: 5}]}>To pay</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 30,
          }}>
          <FontAwesome
            name="rupee"
            size={24}
            style={{marginRight: 3, marginTop: 3}}
          />
          <Text style={styles.text2}>{ammount}</Text>
        </View>

        {mode != 'upi' ? (
          <Text style={[styles.text1, {marginBottom: 10}]}>{id}</Text>
        ) : (
          <TextInput
            value={upi}
            onChangeText={(text) => setUpi(text)}
            placeholder="Please enter your UPI ID"
            placeholderTextColor={INPUT_PLACEHOLDER}
            style={[
              styles.text1,
              {
                width: 200,
                borderBottomWidth: 1,
                borderColor: NEW_PRIMARY_BACKGROUND,
                fontSize: 15,
              },
            ]}
          />
        )}

        <DmzButton
          onPress={() => {
            mode === 'upi' ? onPress(upi) : onPress();
          }}
          style={{
            Text: {
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            },
            Container: {
              width: 250,
              height: 46,
              borderRadius: 25,
              backgroundColor: SECONDARY_COLOR,
              alignSelf: 'center',
              marginVertical: 20,
              elevation: 3,
            },
          }}
          text="PAY"
        />
      </View>
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
  },
  text2: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 27,
  },
});
