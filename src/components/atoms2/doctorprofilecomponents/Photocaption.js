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
import SimpleField from '../../../components/atoms2/Input/simple-field';

const Photocaption = (props, {route}) => {
  // const imageloc = route.params;
  const [showinput, setShowinput] = useState(false);
  const [caption, setCaption] = useState('');
  const [captions, setCaptions] = useState('');

  return (
    <View>
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
          }}>
          {props.updatedStatus}
        </Text>
      </View>
      <View style={{backgroundColor: 'white'}}>
        <Image
          style={{
            height: 280,
            width: '100%',

            marginTop: 20,
            borderRadius: 10,
          }}
          source={require('../../../assets/jpg/person2.jpg')}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontFamily: 'Gilroy-Medium',
            fontSize: 24,
            marginLeft: 30,
            marginTop: 20,
          }}>
          Caption
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowinput(!showinput);
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 20,
              marginLeft: 210,
              marginTop: 22,
              color: '#F23A99',
            }}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>

      {showinput ? (
        <View
          style={{
            height: 80,
            marginTop: 20,
            width: '90%',
            marginLeft: 20,
            marginBottom: 10,
          }}>
          <SimpleField
            value={(item) => {
              setCaption(item);
            }}
          />
          <View style={{marginTop: 30}}>
            <TouchableOpacity
              onPress={() => {
                setCaptions(caption);
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 18,
                  marginLeft: 280,
                  marginTop: 22,
                  color: '#F23A99',
                  marginTop: 30,
                }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',
              fontSize: 20,
              marginLeft: 30,
              marginTop: 20,
              color: 'grey',
            }}>
            {captions}
          </Text>
          <View
            style={{
              height: 1,
              width: '85%',
              backgroundColor: 'grey',
              marginLeft: 25,
              marginTop: 15,
            }}></View>
        </View>
      )}

      <TouchableOpacity>
        <Text
          style={{
            fontFamily: 'Gilroy-Medium',
            fontSize: 20,
            marginLeft: 30,
            marginTop: 10,
            color: '#339999',
          }}>
          Delete this Photo
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Photocaption;
