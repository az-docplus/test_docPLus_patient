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
import Button from '../../../components/atoms2/button/button';
import InputCompo from '../../../components/atoms2/Input/Input';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {Picker} from '@react-native-community/picker';
import {CheckBox} from 'react-native-elements';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import AnimatedErrorText from '../../../components/atoms/animatedErrorText/AnimatedErrorText';
import {ReactReduxContext} from 'react-redux';
import Photocomp from '../../../components/atoms2/doctorprofilecomponents/Photocomp';
import Addphotobox from '../../../components/atoms2/doctorprofilecomponents/Addphotobox';

const Selectcover = (props) => {
  const imagearr = [];
  return (
    <ScrollView>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <View style={{backgroundColor: 'white', flexDirection: 'row'}}>
          <TopNavBar
            headerText=""
            hideRightComp={true}
            onLeftButtonPress={() => {
              props.navigation.goBack();
              // nextpage(0);
            }}
            navigation={props.navigation}
            style={{
              Container: {
                height: 'auto',
                marginTop: 5,
                marginRight: 24,
              },
            }}
          />
          {/* <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 14,
            marginLeft: 200,
            marginTop: 18,
            color: 'dodgerblue',
          }}>
          Add Photos
        </Text> */}
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 30,
              marginLeft: 30,
              marginTop: 10,
              color: 'black',
            }}>
            Select cover{'\n'}photo
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',
              fontSize: 16,
              marginLeft: 30,
              marginTop: 12,
              color: 'grey',
              marginRight: 10,
            }}>
            Chose one that best highlights your facility
          </Text>
        </View>
        {/* {imagearr.map((items, index) => { */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            width: '100%',
            flexWrap: 'wrap',
            marginLeft: 10,
          }}>
          <TouchableOpacity>
            <Photocomp
              imgs={require('../../../assets/jpg/person2.jpg')}></Photocomp>
          </TouchableOpacity>
          <TouchableOpacity>
            <Photocomp
              imgs={require('../../../assets/jpg/person2.jpg')}></Photocomp>
          </TouchableOpacity>
          <TouchableOpacity>
            <Photocomp
              imgs={require('../../../assets/jpg/person2.jpg')}></Photocomp>
          </TouchableOpacity>
          <TouchableOpacity>
            <Photocomp
              imgs={require('../../../assets/jpg/person2.jpg')}></Photocomp>
          </TouchableOpacity>
          <TouchableOpacity>
            <Photocomp
              imgs={require('../../../assets/jpg/person2.jpg')}></Photocomp>
          </TouchableOpacity>
          <TouchableOpacity>
            <Photocomp
              imgs={require('../../../assets/jpg/person2.jpg')}></Photocomp>
          </TouchableOpacity>
          <TouchableOpacity>
            <Photocomp
              imgs={require('../../../assets/jpg/person2.jpg')}></Photocomp>
          </TouchableOpacity>
          <Addphotobox />
          {/* <TouchableOpacity>
                <Photocomp
                  imgs={require('../../../assets/jpg/person2.jpg')}></Photocomp>
              </TouchableOpacity>
              <TouchableOpacity>
                <Photocomp
                  imgs={require('../../../assets/jpg/person2.jpg')}></Photocomp>
              </TouchableOpacity> */}
        </View>
        <View
          style={{
            marginTop: 20,
            width: 150,
            marginLeft: 120,
            marginBottom: 70,
          }}>
          <Button
            title="Save"
            pressHandler={() => {
              console.log('pressed save');
            }}
          />
        </View>
        {/* })} */}
      </View>
    </ScrollView>
  );
};

export default Selectcover;
