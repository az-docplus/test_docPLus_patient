/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  Alert,
  Modal,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {PRIMARY_COLOR, TERTIARY_TEXT} from '../../../styles/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
//import Geolocation from '@react-native-community/geolocation';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import {TextInput} from 'react-native-gesture-handler';
import Axios from 'axios';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';

export default function AddAdressScreen({navigation}) {
  const [coordinate, setCoordinate] = useState({
    latitude: 28.5052544,
    latitudeDelta: 0.09219308750221344,
    longitude: 77.3811552,
    longitudeDelta: 0.08546624332666397,
  });
  const [address, setAddress] = useState('');
  const [addressType, setAddressType] = useState('Other');
  const [addressDetails, setAddressDetails] = useState('');
  const types = ['Home', 'Office', 'Other'];
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Farmer's Friend",
          message: 'This App access to your location ',
        },
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('done');
        Geolocation.getCurrentPosition(
          (info) => {
            console.log(info, '1111');
            setCoordinate({
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
              longitudeDelta: coordinate.longitudeDelta,
              latitudeDelta: coordinate.latitudeDelta,
            });
          },
          (error) => {
            console.log(error, "sdlkfdslkfjsdlfjsdlfkjsdf");
          },
          {enableHighAccuracy: false, timeout: 8000, maximumAge: 1000},
        );
      } else {
        console.log('location permission denied');
        console.log(PermissionsAndroid.RESULTS.GRANTED);
        requestLocationPermission();
      }
    } catch (err) {
      console.warn(err, 'dlskfjsdklfjdsklfj');
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const getAddress = (e) => {
    // console.log(e);
    setCoordinate({
      ...coordinate,
      latitude: e.latitude,
      longitude: e.longitude,
    });
    Axios.get(
      `http://apis.mapmyindia.com/advancedmaps/v1/r4k75zadqu77ygxa9xp9typiievnwnfo/rev_geocode?lat=${e.latitude}&lng=${e.longitude}`,
    ).then((res) => {
      console.log(res.data.results[0].formatted_address);
      setAddress(res.data.results[0].formatted_address);
    });
  };

  const saveAddress = () => {
    if (address == '') {
      alert('Primary Address not selected');
    } else if (addressDetails == '') {
      alert('Enter House No. / Building/ Company');
    } else {
      const val = {
        address: address,
        details: addressDetails,
        type: addressType,
      };
      console.log(val);
      alert('Address Added');
      navigation.goBack();
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TopNavBar
        navigation={navigation}
        hideRightComp
        style={{Container: {marginTop: 10}}}
      />
      <MapView
        style={{
          height: '50%',
          width: '95%',
          alignSelf: 'center',
        }}
        onRegionChangeComplete={getAddress}
        region={coordinate}
        showsMyLocationButton={true}
        initialRegion={coordinate}>
        {/* <Marker key={0} coordinate={coordinate} pinColor={PRIMARY_COLOR}>
          <MaterialIcons color={PRIMARY_COLOR} size={40} name="location-on" />
        </Marker>  */}
      </MapView>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          height: '58%',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <MaterialIcons color={'red'} size={40} name="location-on" />
      </View>
      <DmzButton
        text={address}
        numberOfLines={1}
        style={{
          Container: {
            borderBottomWidth: 2,
            elevation: 0,
            width: '90%',
            alignSelf: 'center',
            height: 50,
            marginTop: 10,
            paddingLeft: 10,
          },
          Text: {
            fontSize: 16,
            fontWeight: 'normal',
          },
        }}
      />

      <TextInput
        placeholder="House No. / Building / Company"
        value={addressDetails}
        onChangeText={(val) => {
          setAddressDetails(val);
        }}
        style={{
          borderBottomWidth: 2,
          width: '85%',
          alignSelf: 'center',
          marginTop: 20,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'space-evenly',
        }}>
        {types.map((u, i) => {
          return (
            <DmzButton
              text={u}
              onPress={() => setAddressType(u)}
              style={{
                Container: {
                  elevation: 0,
                  width: 90,
                  height: 40,
                  alignSelf: 'center',
                  borderRadius: 30,
                  backgroundColor: addressType == u ? 'pink' : '#ccc',
                },
                Text: {
                  fontSize: 15,
                  fontWeight: 'normal',
                },
              }}
            />
          );
        })}
      </View>
      <DmzButton
        onPress={saveAddress}
        text="Save Address"
        style={{
          Container: {
            elevation: 0,
            width: '90%',
            height: 40,
            alignSelf: 'center',
            borderRadius: 30,
            backgroundColor: PRIMARY_COLOR,
            marginTop: 20,
          },
          Text: {
            fontSize: 16,
            fontWeight: 'normal',
          },
        }}
      />
      {/* <Modal>
        <View style={{flex: 1, backgroundColor: 'pink'}}>
          <GooglePlacesAutocomplete
            placeholder="Enter Location"
            minLength={2}
            autoFocus={false}
            returnKeyType={'search'}
            fetchDetails={true}
            query={{
              key: 'AIzaSyDkzlFfxI3ZexksuIs5EpVK5mT1DMQd3Hc',
              language: 'en',
            }}
          />
        </View>
      </Modal> */}
      {/* <GooglePlacesAutocomplete
        onChangeText={(txt) => {
          console.log(txt);
        }}
        currentLocation={true}
        placeholder="Enter Location"
        minLength={2}
        autoFocus={false}
        returnKeyType={'search'}
        fetchDetails={true}
        query={{
          key: 'AIzaSyDkzlFfxI3ZexksuIs5EpVK5mT1DMQd3Hc',
          language: 'en',
        }}
      /> */}
    </View>
  );
}
