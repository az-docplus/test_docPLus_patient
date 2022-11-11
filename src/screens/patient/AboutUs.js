import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import TopNavBar from '../../components/molecules/TopNavBar/TopNavBar';
import { Local } from '../../i18n';
import { ScrollView } from 'react-native';
import { Linking } from 'react-native';
import { Image } from 'react-native';

const AboutUs = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopNavBar
        navigation={navigation}
        headerText={`${Local('doctor.V2.AboutUs.header')}`}
      />
      <ScrollView>
        <View style={{ marginHorizontal: 20, marginTop: 20, padding: 30 }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: '700',
              marginBottom: 20,
              color: '#297281',
            }}>
            {`${Local('doctor.V2.AboutUs.know_more_about_us')}`}
          </Text>
          <Image
            source={require('../../assets/logo/doc_logo.webp')}
            style={{ width: 300, height: 100, marginBottom: 20 }}
          />
          <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 10 }}>
            {`${Local('doctor.V2.AboutUs.who_we_are.heading')}`}
          </Text>
          <Text
            style={{ fontSize: 16, marginBottom: 10, textAlign: 'justify' }}>
            {`${Local('doctor.V2.AboutUs.who_we_are.1st_para')}`}
          </Text>
          <Text
            style={{ fontSize: 16, marginBottom: 10, textAlign: 'justify' }}>
            {`${Local('doctor.V2.AboutUs.who_we_are.2nd_para')}`}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5, textAlign: 'justify' }}>
            {`${Local('doctor.V2.AboutUs.who_we_are.3rd_para')}`}
          </Text>
          <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 10 }}>
            {`${Local('doctor.V2.AboutUs.founders_message.heading')}`}
          </Text>
          <Text
            style={{ fontSize: 16, marginBottom: 10, textAlign: 'justify' }}>
            {`${Local('doctor.V2.AboutUs.founders_message.para')}`}
          </Text>
          <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 10 }}>
            {`${Local('doctor.V2.AboutUs.how_we_work.heading')}`}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5, textAlign: 'justify' }}>
            <Text style={{}}>• </Text>
            {`${Local('doctor.V2.AboutUs.how_we_work.list_one')}`}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5, textAlign: 'justify' }}>
            <Text style={{}}>• </Text>
            {`${Local('doctor.V2.AboutUs.how_we_work.list_two')}`}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5, textAlign: 'justify' }}>
            <Text style={{}}>• </Text>
            {`${Local('doctor.V2.AboutUs.how_we_work.list_three')}`}
          </Text>
          <Text
            style={{ fontSize: 16, marginBottom: 15, textAlign: 'justify' }}>
            <Text style={{}}>• </Text>
            {`${Local('doctor.V2.AboutUs.how_we_work.list_four')}`}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 10,
              textAlign: 'justify',
              color: '#297281',
            }}>
            {`${Local('doctor.V2.AboutUs.how_we_work.para_one')}`}
          </Text>
          <Text
            style={{ fontSize: 16, marginBottom: 10, textAlign: 'justify' }}>
            {`${Local('doctor.V2.AboutUs.how_we_work.para_two')}`}
          </Text>
          <Text
            style={{ fontSize: 16, marginBottom: 10, textAlign: 'justify' }}>
            {`${Local('doctor.V2.AboutUs.how_we_work.para_three')}`}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
