import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {
  NEW_HEADER_TEXT,
  GREY_OUTLINE,
  SECONDARY_COLOR,
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BookingConfirmed = ({params, navigation}) => {
  const onPress = () => {};

  return (
    <View style={styles.Container}>
      <TopNavBar
        hideRightComp
        headerText="Booking Confirmation"
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
          source={require('../../../assets/icons/confirmed.png')}
          style={{height: 70, width: '100%', marginBottom: 25}}
          resizeMode="contain"
        />

        <Text style={styles.text2}>Booking{'\n'}Confirmed</Text>

        <Text style={[styles.text1, {marginBottom: 10}]}>
          on Wed, July 15{'\n'}01:00 p.m. - 01:30 p.m.
        </Text>

        <DmzButton
          onPress={onPress}
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
          text="OKAY"
        />
      </View>
    </View>
  );
};

export default BookingConfirmed;

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
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 35,
  },
  text2: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 27,
    textAlign: 'center',
    marginBottom: 30,
  },
});
