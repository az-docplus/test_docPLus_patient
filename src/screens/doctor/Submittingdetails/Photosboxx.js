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
import {useNavigation} from '@react-navigation/native';
const Photosboxx = (props) => {
  const navigation = useNavigation();

  const imagearr = [
    '../../../assets/jpg/person1.jpg',
    '../../../assets/jpg/person2.jpg',
    '../../../assets/jpg/person3.jpg',
    '../../../assets/jpg/person4.jpg',
    '../../../assets/jpg/person5.jpg',
  ];

  const Headerwithchange = (props) => {
    const take = props.taker;
    const handlechangepress = () => {
      if (take == 'cp') {
        navigation.navigate('selectcover');
      } else if (take == 'cpo') {
        navigation.navigate('changingphotoorder');
      }
    };
    return (
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 18,
            marginLeft: 30,
            marginTop: 28,
            color: 'black',
          }}>
          {props.name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            handlechangepress();
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 14,
              marginLeft: 160,
              marginTop: 32,
              color: '#F4548B',
            }}>
            Change
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={{backgroundColor: 'white'}}>
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
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 14,
              marginLeft: 200,
              marginTop: 22,
              color: 'dodgerblue',
            }}>
            Add Photos
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 30,
              marginLeft: 30,
              marginTop: 18,
              color: 'black',
            }}>
            Photos
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',
              fontSize: 14,
              marginLeft: 30,
              marginTop: 12,
              color: 'grey',
            }}>
            34 added
          </Text>
        </View>
        <Headerwithchange name="Cover Photo" taker="cp" />
        <View>
          <Image
            style={{
              height: 230,
              width: 350,
              marginLeft: 20,
              marginTop: 20,
              borderRadius: 10,
            }}
            source={require('../../../assets/jpg/person2.jpg')}
          />
          <Headerwithchange name="Photo Order" taker="cpo" />
          {/* {imagearr.map((items, index) => { */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              width: '100%',
              flexWrap: 'wrap',
              marginLeft: 10,
            }}>
            <Photocomp
              imgs={require('../../../assets/jpg/person2.jpg')}></Photocomp>

            <Photocomp
              imgs={require('../../../assets/jpg/person2.jpg')}></Photocomp>

            <Photocomp
              imgs={require('../../../assets/jpg/person2.jpg')}></Photocomp>

            <Photocomp
              imgs={require('../../../assets/jpg/person2.jpg')}></Photocomp>

            <Photocomp
              imgs={require('../../../assets/jpg/person2.jpg')}></Photocomp>

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
          {/* })} */}
        </View>
        {/* end of screen */}
      </View>
    </ScrollView>
  );
};
export default Photosboxx;
