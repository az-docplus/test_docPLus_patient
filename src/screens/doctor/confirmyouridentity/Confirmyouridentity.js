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

const Docdetailscard = (props) => {
  const {docname, speciality, place, education} = props;
  return (
    <TouchableOpacity activeOpacity={0.85}>
      <View style={styles.shadows}>
        <View style={styles.detailsbox}>
          <View>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 21,
                color: '#403e3d',
                fontWeight: '100',
                fontFamily: 'Montserrat-Bold',
                marginLeft: 50,
                marginTop: 20,
              }}>
              {docname}
            </Text>
          </View>
          <View>
            <Text
              style={{
                marginTop: 2,
                fontSize: 13.5,
                lineHeight: 19,
                marginLeft: 50,
                color: '#434343',
                fontFamily: 'Montserrat-Medium',
              }}>
              {speciality} | {education}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Image
              source={require('../../../assets/png/location.png')}
              style={{
                marginTop: 0,
                height: 17,
                width: 18,
                marginLeft: 0,
                marginLeft: 50,
                marginRight: 6,
              }}
            />
            <Text
              style={{
                fontSize: 10,
                lineHeight: 12,
                fontFamily: 'Montserrat-Medium',
                color: '#434343',
              }}>
              {' '}
              Location :
            </Text>
            <Text
              style={{
                fontSize: 10,
                lineHeight: 12,
                fontFamily: 'Montserrat-Medium',
                color: '#434343',
              }}>
              {' '}
              {place}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Confirmyouridentity = ({navigation}) => {
  const handlebuttonpress = () => {
    console.log('pressed continue');
  };

  return (
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
            fontFamily: 'Montserrat-Medium',
          }}>
          Great!
        </Text>
        <Text
          style={{
            fontSize: 22,
            marginLeft: 50,
            fontFamily: 'Montserrat-Bold',
            color: '#077EE9',
          }}>
          Dr. Nishank
        </Text>
      </View>
      <View style={styles.curvedbox}>
        <View style={{flexDirection: 'row', marginTop: 0}}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 19,
              marginLeft: 30,
              marginTop: 20,
              color: '#333333',
              fontFamily: 'Montserrat-Medium',
            }}>
            Please
          </Text>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 19,
              marginTop: 20,
              color: '#F35289',
              fontFamily: 'Montserrat-Medium',
            }}>
            {' '}
            Select your profile
          </Text>
        </View>
        <View style={{marginTop: 30}}>
          <Docdetailscard
            docname="Dr. Nishank Phulera"
            speciality="Cardiologist"
            education="MBBS"
            place="Delhi, India"
          />
        </View>
        <View style={{marginTop: 15}}>
          <Docdetailscard
            docname="Dr. Nishank Phulera"
            speciality="Cardiologist"
            education="MBBS"
            place="Delhi, India"
          />
        </View>

        <View style={styles.buttonshadow} />
        <View
          style={{
            height: 40,
            width: 290,
            marginLeft: 50,
            marginTop: 30,
          }}>
          <Button
            title="Yes, This is me!"
            pressHandler={() => {
              handlebuttonpress();
            }}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 19,
              marginTop: 40,
              color: '#3893E7',
              fontFamily: 'Montserrat-Regular',
            }}>
            Couldn’t find your profile?
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
  },
  detailsbox: {
    height: 112,
    width: 332,
    marginLeft: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 2,
    paddingTop: -2,
  },
  shadows: {
    height: 112,
    width: 334,
    elevation: 8,
    marginLeft: 28,
    borderRadius: 10,
    shadowColor: '#DEE6F3',
  },
});

export default Confirmyouridentity;
