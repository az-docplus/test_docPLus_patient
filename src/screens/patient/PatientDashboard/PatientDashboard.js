/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Modal, Text, Image} from 'react-native';
import LinearGradientBackground from '../../../components/molecules/GradientBackground/LinearGradientBackground';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import Reports from '../../../assets/svg/reports.svg';
import {ScrollView} from 'react-native-gesture-handler';
import DmzButton from '../../../components/atoms/SwitchButton/SwitchButton';
import Icon from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommuntiyIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  PRIMARY_TEXT,
  HEADER_TEXT,
  PRIMARY_COLOR,
  TERTIARY_TEXT,
  SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_BACKGROUND,
  SECONDARY_COLOR,
  GREY_CARD,
  PRIMARY_BACKGROUND,
  NEW_PRIMARY_COLOR,
} from '../../../styles/colors';
import {useSelector} from 'react-redux';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';

const HeadingRow = ({title, accentColor, icon}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingTop: 5,
    }}>
    <View
      style={{
        backgroundColor: accentColor,
        borderRadius: 20,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {icon}
    </View>
    <Text
      style={{
        fontSize: 14,
        flex: 1,
        paddingHorizontal: 10,
        fontFamily: 'Montserrat-Medium',
      }}>
      {title}
    </Text>
  </View>
);

export default function PatientDashboard({navigation}) {
  const patientCategories = [
    'Vitals',
    'Surgeries',
    'Meds',
    'Lifestyle',
    'Family History',
  ];
  const {patient} = useSelector((state) => state.PatientAccountReducer);
  const [searchKey, setSearchKey] = useState('');

  const onChangeText = (text) => setSearchKey(text);

  useEffect(() => {
    console.log(patient, 'qwerty1');
    // alert('opened');
    // patientVitals ! console.log(patientVitals.bloodPressure, 'qwerty1.1');
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{flex: 1}} contentContainerStyle={{height: 900}}>
        <TopNavBar
          navigation={navigation}
          style={{
            Container: {
              height: 50,
              marginTop: 10,
            },
          }}
          headerText="My Dashboard"
          LeftComp={
            <Image
              source={require('../../../assets/jpg/person4.jpg')}
              style={{height: 50, width: 50, borderRadius: 25, margin: 3}}
            />
          }
          onLeftButtonPress={() => {}}
        />
        <View style={{alignItems: 'center', flex: 1}}>
          <SearchBarSolid
            placeholderTextColor={SEARCH_PLACEHOLDER_COLOR}
            searchIcon={
              <Icon name="search" size={20} color={SEARCH_PLACEHOLDER_COLOR} />
            }
            onEndEditing={() => {}}
            onChangeText={onChangeText}
            style={{
              backgroundColor: SECONDARY_BACKGROUND,
              borderRadius: 15,
              margin: 5,
              marginVertical: 40,
              elevation: 1,
            }}
            placeholder="Seach Doctors, Medicines….."
          />
          <View
            style={{
              flex: 7,
              alignSelf: 'stretch',
              flexDirection: 'row',
              padding: 10,
              paddingBottom: 0,
            }}>
            <View style={{flex: 5}}>
              <View
                style={{
                  flex: 1,
                  //   borderWidth: 1,
                  margin: 10,
                  borderRadius: 15,
                  backgroundColor: GREY_CARD,
                  padding: 8,
                }}>
                <HeadingRow
                  title="Quick Consult"
                  icon={
                    <FontAwesome name="stethoscope" color="white" size={22} />
                  }
                  accentColor={SECONDARY_COLOR}
                />
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <QuickConsultContent />
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  //   borderWidth: 1,
                  margin: 10,
                  borderRadius: 15,
                  backgroundColor: SECONDARY_BACKGROUND,
                  padding: 8,
                }}>
                <HeadingRow
                  title="Ongoing Medications"
                  icon={
                    <FontAwesome name="stethoscope" color="white" size={22} />
                  }
                  accentColor={SECONDARY_COLOR}
                />
              </View>
            </View>
            <View style={{flex: 4}}>
              <View
                style={{
                  flex: 3,
                  //   borderWidth: 1,
                  margin: 10,
                  borderRadius: 15,
                  backgroundColor: PRIMARY_BACKGROUND,
                  padding: 8,
                  justifyContent: 'space-between',
                }}>
                <HeadingRow
                  title="Reports"
                  icon={
                    <MaterialCommuntiyIcons
                      name="file-document"
                      color="white"
                      size={22}
                    />
                  }
                  accentColor={NEW_PRIMARY_COLOR}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 5,
                    alignSelf: 'center',
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      backgroundColor: NEW_PRIMARY_COLOR,
                      borderRadius: 20,
                      width: 20,
                      height: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaterialIcons name="add" size={15} color="white" />
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      paddingHorizontal: 7,
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    Add new
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  //   borderWidth: 1,
                  margin: 10,
                  borderRadius: 15,
                  backgroundColor: GREY_CARD,
                  padding: 8,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 3,
              margin: 20,
              //   borderWidth: 1,
              alignSelf: 'stretch',
              borderRadius: 15,
              backgroundColor: PRIMARY_BACKGROUND,
              padding: 8,
              marginTop: 10,
            }}>
            <HeadingRow
              title="Upcoming Appointments"
              icon={<FontAwesome name="stethoscope" color="white" size={22} />}
              accentColor={NEW_PRIMARY_COLOR}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const QuickConsultContent = (props) => (
  <View style={{alignItems: 'center'}}>
    <View style={{flexDirection: 'row', alignItems: 'flex-end', margin: 5}}>
      <Image
        source={require('../../../assets/jpg/person1.jpg')}
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: SECONDARY_COLOR,
        }}
      />
      <Image
        source={require('../../../assets/jpg/person2.jpg')}
        style={{
          height: 50,
          width: 50,
          borderRadius: 25,
          borderWidth: 2,
          borderColor: SECONDARY_COLOR,
          marginHorizontal: -10,
          zIndex: 2,
        }}
      />
      <Image
        source={require('../../../assets/jpg/person3.jpg')}
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: SECONDARY_COLOR,
        }}
      />
    </View>
    <Text
      style={{
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 10,
        fontFamily: 'Montserrat-Regular',
        color: '#383532',
      }}>
      Dr Ray and 2 others are online
    </Text>
  </View>
);
