import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Local } from '../../i18n';

import Entypo from 'react-native-vector-icons/Entypo';
import TopNavBar from '../../components/molecules/TopNavBar/TopNavBar';
import { ScrollView } from 'react-native';
function GetHelpAndSupport({ navigation }) {
  const FAQ = [
    {
      text1: 'General',
      text2:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    },
    {
      text1: 'Doctor Consultations',
      text2:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    },
    {
      text1: 'Payments',
      text2:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    },
    {
      text1: 'Referrals',
      text2:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    },
  ];
  return (
    <View style={styles.container}>
<TopNavBar
        navigation={navigation}
        headerText={`${Local('doctor.V2.HelpAndSupport.heading')}`}
      />
      <ScrollView>
      <View style={{ marginHorizontal: 10, marginTop: 5, padding: 20 }}>
              <Text
                style={{
                  marginVertical: 20,
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 22,
                  color: '#297281'
                }}>
                Choose a Segment
              </Text>
              <View>
                {FAQ.map((item, index) => (
                  <FAQComponent item={item} keyValue={index} />
                ))}
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
export default GetHelpAndSupport;
