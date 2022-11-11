import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import TopNavBar from '../../components/molecules/TopNavBar/TopNavBar';
import { Local } from '../../i18n';
import { ScrollView } from 'react-native';
import { Linking } from 'react-native';

const PrivacyPolicy = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopNavBar
        navigation={navigation}
        headerText={`${Local('doctor.V2.privacy_policy.header')}`}
      />

      <ScrollView>
        <View style={{ marginHorizontal: 20, marginTop: 20, padding: 30 }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.welcome')}`}
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Gilroy-SemiBold',
                color: '#297281',
              }}>
              {`${Local('doctor.V2.privacy_policy.docplus')}`}
            </Text>
          </Text>
          <Text
            style={{
              marginVertical: 20,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.1st')}`}
          </Text>
          <Text
            style={{
              marginVertical: 20,
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.intro')}`}
          </Text>
          <Text
            style={{
              marginVertical: 20,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.2nd')}`}
          </Text>
          <Text
            style={{
              marginVertical: 20,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.3rd')}`}
          </Text>
          <Text
            style={{
              marginVertical: 20,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.4th')}`}
          </Text>
          <Text
            style={{
              marginVertical: 20,
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.age')}`}
          </Text>
          <Text
            style={{
              marginVertical: 20,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.5th')}`}
          </Text>
          <Text
            style={{
              marginVertical: 20,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.6th')}`}
          </Text>
          <Text
            style={{
              marginVertical: 20,
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.category_info')}`}
          </Text>
          <Text
            style={{
              marginVertical: 20,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.category.meta')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.category.metaDesc')}`}
          </Text>
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.category.Point.1st')}`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.category.Point.2nd')}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.category.Point.3rd')}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.category.Point.4th')}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.category.Point.5th')}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.category.Point.6th')}`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.category.Point.7th')}`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.category.Point.8th')}`}
            </Text>
          </View>

          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.category2.meta2')}`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.category2.Point2.1st')}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.category2.Point2.2nd')}`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.category2.Point2.3rd')}`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.category2.Point2.4th')}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.category2.Point2.5th')}`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.category2.Point2.6th')}`}
            </Text>
          </View>

          <Text
            style={{
              marginVertical: 20,
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.collected.meta')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.collected.metaDesc')}`}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.collected.Point.1st')}`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.collected.Point.2nd')}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.collected.Point.3rd')}`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.collected.Point.4th')}`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.collected.Point.5th')}`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.collected.Point.6th')}`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.collected.Point.7th')}`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.collected.Point.8th')}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.collected.Point.9th')}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.collected.Point.10th')}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.collected.Point.11th')}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.collected.Point.12th')}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.collected.Point.13th')}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              •
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#000000',
                fontSize: 16,
                textAlign: 'justify',
                marginLeft: 10,
              }}>
              {`${Local('doctor.V2.privacy_policy.collected.Point.14th')}`}
            </Text>
          </View>

          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.7th')}`}
          </Text>

          <Text
            style={{
              marginVertical: 20,
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.web.meta')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.web.metaDesc')}`}
          </Text>

          <Text
            style={{
              marginTop: 20,
              //   textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.web.Point.1st.heading')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.web.Point.1st.desc')}`}
          </Text>

          <Text
            style={{
              marginTop: 20,
              //   textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.web.Point.2nd.heading')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.web.Point.2nd.desc')}`}
          </Text>

          <Text
            style={{
              marginTop: 20,
              //   textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.web.Point.3rd.heading')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.web.Point.3rd.desc')}`}
          </Text>

          <Text
            style={{
              marginTop: 20,
              //   textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.web.Point.4th.heading')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.web.Point.5th.desc')}`}
          </Text>

          <Text
            style={{
              marginTop: 20,
              //   textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.web.Point.5th.heading')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.web.Point.5th.desc')}`}
          </Text>

          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.security.heading')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.security.desc')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.security.metaDesc')}`}
          </Text>

          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.communication.heading')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.communication.desc')}`}
          </Text>

          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.thirdParty.heading')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.thirdParty.desc')}`}
          </Text>

          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.OPT.heading')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.OPT.desc')}`}
          </Text>

          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.OPT.1st')}`}
          </Text>

          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.OPT.2nd')}`}
          </Text>

          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.opting_out.heading')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.opting_out.desc')}`}
          </Text>

          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.california.heading')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.california.desc')}`}
          </Text>

          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.privacy_update.heading')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.privacy_update.desc')}`}
          </Text>

          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.manage.heading')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.manage.1st')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.manage.2nd')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.manage.3rd')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.manage.4th')}`}
          </Text>

          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.manage.5th')}`}
          </Text>

          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.policy_update.heading')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.policy_update.desc')}`}
          </Text>

          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.international_users.heading')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.international_users.desc')}`}
          </Text>

          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
            }}>
            {`${Local('doctor.V2.privacy_policy.contact_us.heading')}`}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Gilroy-Regular',
              color: '#000000',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            {`${Local('doctor.V2.privacy_policy.contact_us.desc')}`}{' '}
            <Text
              onPress={() => Linking.openURL('mailto:care@docplus.com')}
              style={{
                fontFamily: 'Gilroy-Regular',
                color: '#2688ff',
                fontSize: 16,
                textAlign: 'justify',
              }}>
              care@docplus.com
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
