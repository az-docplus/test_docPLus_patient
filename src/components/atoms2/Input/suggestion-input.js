import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Easing,
  FlatList,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import InsetShadow from 'react-native-inset-shadow';
import Geolocation from 'react-native-geolocation-service';
import autoDetectLogo from '../../../assets2/logo/autoDetect.png';
import AntiDesingIcon from 'react-native-vector-icons/Feather';
const CheckIcon = ({ size, name }) => (
  <AntiDesingIcon size={size} name={name} color="#000" />
);

export default function SuggestionInput({
  value = () => { },
  onChangeText = () => { },
  title,
  isLoading,
  prevalue,
  onFetchLocation = () => { },
}) {
  const inputTextRefMove = useRef(new Animated.Value(0)).current;
  const inputTextRefSize = useRef(new Animated.Value(1)).current;
  const moveUp = () => {
    Animated.parallel([
      Animated.timing(inputTextRefMove, {
        toValue: -33,
        duration: 1000,
        easing: Easing.elastic(),
        useNativeDriver: true,
      }),
      Animated.timing(inputTextRefSize, {
        toValue: 0.7,
        duration: 5000,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const [inputText, setInputText] = useState(() => {
    if (prevalue) {
      moveUp();
      return prevalue;
    }
    return '';
  });
  const [suggesitonList, setSuggestionList] = useState(null);

  const setListByKeyword = (words) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${words}&key=AIzaSyDTUo1T6UULeAHAKSh-Z5CRp-JX418mUFc`,
    )
      .then((e) => e.json())
      .then((e) => {
        //   console.log("result : ", e)
        setSuggestionList(e.predictions);
      })
      .catch((e) => {
        console.log("e : ", e)
        setSuggestionList(null);
      });
  };

  const GetCurrentLocation2 = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'DocPlus',
          message: 'This App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('done');
        Geolocation.getCurrentPosition(
          (position) => {
            fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}8&key=AIzaSyDTUo1T6UULeAHAKSh-Z5CRp-JX418mUFc`,
            )
              .then((e) => e.json())
              .then((e) => {
                console.log('addresss : ', e);
                if (e.status == 'OK') {
                  setInputText(e.results[0].formatted_address);
                  value(e.results[0].formatted_address);
                  onFetchLocation(e.results[2].address_components);
                  moveUp();
                  setSuggestionList(null);
                }
              });
          },
          (error) => {
            console.log(error, 'error_________-');
          },
          {
            enableHighAccuracy: false,
            timeout: 8000,
            maximumAge: 1000,
            forceRequestLocation: true,
            showLocationDialog: true,
          },
        );
      } else {
        console.log('location permission denied');
        console.log(
          PermissionsAndroid.RESULTS.GRANTED,
          'lsdfjsdlkfjsdlkfjdslfk',
        );
        requestLocationPermission();
      }
    } catch (err) {
      console.warn(err, 'warning________--');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '96%',
          alignItems: 'center',
        }}>
        <Text></Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            color: '#FF0000',
            fontSize: 10,
            padding: 5,
            paddingRight: 10,
          }}>
          {inputText.length > 2 ? (
            <CheckIcon size={10} name="check-circle" />
          ) : (
            <CheckIcon size={10} name="x-circle" />
          )}
        </Text>
      </View>

      <View
        style={{
          position: 'relative',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Animated.View
          style={[
            styles.animatedText,
            {
              transform: [
                {
                  translateY: inputTextRefMove,
                  scale: inputTextRefSize,
                  translateX: inputTextRefSize < 0.7 ? 22 : -20,
                },
              ],
            },
          ]}>
          <Text
            style={{
              padding: 0,
              margin: 0,
              textAlignVertical: 'center',
              height: '100%',
              color: '#8F8F8F',
              fontFamily: 'Montserrat-Regular',
            }}>
            {title}
          </Text>
        </Animated.View>
        <InsetShadow
          shadowOpacity={1}
          shadowOffset={15}
          containerStyle={styles.numberField}
          shadowOffset={10}
          elevation={12}>
          <TextInput
            editable={!isLoading}
            keyboardType="default" // name,year,numbers
            onTouchStart={(e) => {
              moveUp();
            }}
            onChangeText={(e) => {
              if (e.length > 1) {
                setInputText(e);
                setListByKeyword(e);
                value(e);
              }
              setInputText(e);
              value(e);
              setSuggestionList(null);
            }}
            value={inputText}
          />
        </InsetShadow>
        <TouchableOpacity onPress={GetCurrentLocation2}>
          <Image
            source={autoDetectLogo}
            style={{ width: 26, height: 26, marginRight: 8 }}
          />
        </TouchableOpacity>
        {suggesitonList && (
          <View style={styles.suggestionView}>
            <FlatList
              data={suggesitonList}
              // key={}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      value(item.description);
                      setInputText(item.description);
                      setSuggestionList(null);
                    }}>
                    <Text style={styles.listItem}>{item.description}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  numberField: {
    borderRadius: 10,
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    height: 50,
    flex: 0.95,
    borderWidth: 0.1,
  },
  animatedText: {
    color: '#707585',
    position: 'absolute',
    zIndex: -1,
    height: '100%',
    paddingLeft: 22,
  },
  suggestionView: {
    position: 'absolute',
    overflow: 'scroll',
    height: 180,
    width: '80%',
    top: 50,
    left: 5,
    borderRadius: 12,
    backgroundColor: '#fff',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 25,
    padding: 7,
  },
  listItem: {
    fontSize: 13,
    paddingVertical: 8,
    paddingLeft: 7,
    fontFamily: 'Montserrat-Regular',
    backgroundColor: '#E5E5E5',
    margin: 3,
    borderRadius: 3,
  },
});
