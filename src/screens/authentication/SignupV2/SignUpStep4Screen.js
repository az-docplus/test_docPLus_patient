/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  // Picker
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import DatePicker from 'react-native-datepicker';
import Geolocation from 'react-native-geolocation-service';
//import Geolocation from '@react-native-community/geolocation';
import StepsTracker from '../../../components/atoms/StepsTracker/StepsTracker';
import TextInputIcon from '../../../components/atoms/TextInputCustom/TextInputIcon';
import {
  NEW_PRIMARY_COLOR,
  NEW_HEADER_TEXT,
  SECONDARY_COLOR,
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import yourhandle from 'countrycitystatejson';
import Axios from 'axios';
import PhoneInput from 'react-native-phone-number-input';
import { TouchableOpacity } from 'react-native-gesture-handler';
const height = Dimensions.get('screen').height;

export default function SignUpStep4Screen(props) {
  const {credential, setCredential, isLoading, error, signupAs} = props;
  const [coordinate, setCoordinate] = useState({
    latitude: 28.5052544,
    latitudeDelta: 0.09219308750221344,
    longitude: 77.3811552,
    longitudeDelta: 0.08546624332666397,
  });

  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef < PhoneInput > null;

  const [JSONdata, setJSONdata] = useState({
    countryArray: yourhandle.getCountries(),
    stateArray: yourhandle.getStatesByShort('IN'),
    cityArray: yourhandle.getCities('IN', 'Madhya Pradesh'),
  });

  const handlePhone = (phone) => {
    setCredential('phone', phone);
    console.log(phone);
  };
  const handleCity = (city) => {
    setCredential('city', city);
  };
  const handleCountry = (country) => {
    setCredential('country', country);
    let shortName = '';
    JSONdata.countryArray.map((c) => {
      if (c.name == country) {
        shortName = c.shortName;
      }
    });
    setJSONdata({
      ...JSONdata,
      stateArray: yourhandle.getStatesByShort(shortName),
    });
  };
  const handleState = (state) => {
    setCredential('state', state);
    if (credential.country !== '') {
      let shortName = '';
      JSONdata.countryArray.map((country) => {
        if (country.name == credential.country) {
          shortName = country.shortName;
        }
      });
      setJSONdata({
        ...JSONdata,
        cityArray: yourhandle.getCities(shortName, state),
      });
    }
  };
  const getAddress = (latitude, longitude) => {
    // console.log(e);
    // setCoordinate({
    //   ...coordinate,
    //   latitude: e.latitude,
    //   longitude: e.longitude,
    // });

    Axios.get(
      `http://apis.mapmyindia.com/advancedmaps/v1/r4k75zadqu77ygxa9xp9typiievnwnfo/rev_geocode?lat=${latitude}&lng=${longitude}`,
    ).then((res) => {
      const {formatted_address} = res.data.results[0];
      setCredential('address', formatted_address);

      const AddressArray = formatted_address.split(',');

      const state_raw = AddressArray[2];
      const state = state_raw.substr(0, state_raw.indexOf('.')).trim();

      const country_raw = formatted_address.split('(')[1];
      const country = country_raw.substr(0, country_raw.length - 1).trim();

      let shortName = '';
      JSONdata.countryArray.map((c) => {
        if (c.name == country) {
          shortName = c.shortName;
        }
      });
      setJSONdata({
        ...JSONdata,
        stateArray: yourhandle.getStatesByShort(shortName),
        cityArray: yourhandle.getCities(shortName, state),
      });

      // const city = AddressArray[1].trim();

      // setCredential('city', city);
      // setCredential('state', state);
      // setCredential('country', country);
    });
  };
  const requestLocationPermission = async () => {
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
          (info) => {
            console.log(info, '1111');
            setCoordinate({
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
              longitudeDelta: coordinate.longitudeDelta,
              latitudeDelta: coordinate.latitudeDelta,
            });
            getAddress(info.coords.latitude, info.coords.longitude);
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
        console.log(PermissionsAndroid.RESULTS.GRANTED, 'lsdfjsdlkfjsdlkfjdslfk');
        requestLocationPermission();
      }
    } catch (err) {
      console.warn(err, 'warning________--');
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  // useEffect(() => {
  //   let shortName = '';
  //   JSONdata.countryArray.map(country => {
  //     if (country.name == credential.country) {
  //       shortName = country.shortName
  //     }
  //   })
  //   console.log(credential, ".cccrend")
  //   const states = credential.country !== '' ? yourhandle.getStatesByShort(shortName) : []
  //   const cities = credential.country !== '' && credential.state !== ''
  //     ? yourhandle.getCities(shortName, credential.state)
  //     : []
  //   console.log({
  //     stateArray: states,
  //     cityArray: cities
  //   }, "...aradsys")
  //   if (states.length > 0) setJSONdata({ ...JSONdata, stateArray: states })
  //   // setJSONdata({
  //   //   stateArray: states,
  //   //   cityArray: cities
  //   // })

  // }, [credential])
  const reg = new RegExp(/^([0-9]{10})$/);
  console.log(
    credential.city,
    credential.state,
    credential.country,
    '>>>>>>>>>>>',
  );
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}
        contentContainerStyle={{flex: 1, backgroundColor: 'white'}}>
        <StepsTracker
          text={signupAs === 'doctor' ? 'Step 3' : 'Step 2'}
          textStyle={{
            fontSize: 16,
            color: NEW_HEADER_TEXT,
          }}
          completed={signupAs === 'doctor' ? 75 : 66}
          mode={signupAs === 'doctor' ? [25, 50, 75, 100] : [33, 66, 100]}
          completedColor={NEW_PRIMARY_COLOR}
          incompletedColor={'#F8F7FF'}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'white',
            overflow: 'hidden',
          }}>
          <Text
            style={{
              fontSize: 30,
              color: NEW_HEADER_TEXT,
              marginBottom: '6%',
              alignSelf: 'center',
              fontFamily: 'Montserrat-Bold',
            }}>
            Contact Details
          </Text>

          <View
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: '#fff',
              borderBottomColor: NEW_PRIMARY_COLOR,
              borderBottomWidth: 1,
              height: 'auto',
              alignSelf: 'center',
            }}>
            <PhoneInput
              // ref={phoneInput}
              containerStyle={{backgroundColor: '#fff', width: '65%'}}
              textInputStyle={{backgroundColor: '#fff'}}
              textContainerStyle={{backgroundColor: '#fff'}}
              // inputStyle={{backgroundColor: '#fff'}}
              codeTextStyle={{
                backgroundColor: '#fff',
                // color: "blue"
              }}
              defaultValue={credential.phone}
              defaultCode="IN"
              /* onChangeText={(text) => {
              handlePhone(text);
            }} */
              onChangeFormattedText={(text) => {
                handlePhone(text);
              }}
              // withDarkTheme
              // withShadow
              autoFocus
            />
          </View>

          {/* <TextInputIcon
            placeholder="Phone Number"
            inputHandler={handlePhone}
            keyboardType="number-pad"
            placeholderTextColor={INPUT_PLACEHOLDER}
            style={[
              styles.inputStyle,
              !error.phone && { borderBottomColor: 'red' },
            ]}
            textStyle={styles.textStyle}
            maxLength={10}
            validationCallback={() => reg.test(credential.phone)}
            value={credential.phone}
          /> */}
          <View
            style={[
              styles.inputStyle,
              !error.city && {borderBottomColor: 'red'},
            ]}>
            <Picker
              placeholder="Country"
              mode={'dropdown'}
              onValueChange={handleCountry}
              selectedValue={credential.country}>
              <Picker.Item label="Country" value="" color={INPUT_PLACEHOLDER} />
              {JSONdata.countryArray.length > 0 &&
                JSONdata.countryArray.map((country, index) => (
                  <Picker.Item
                    color="#000"
                    key={index}
                    label={country.name}
                    value={country.name}>
                    {country.name}
                  </Picker.Item>
                ))}
            </Picker>
          </View>
          <View
            style={[
              styles.inputStyle,
              !error.city && {borderBottomColor: 'red'},
            ]}>
            <Picker
              placeholder="State"
              mode={'dropdown'}
              placeholderTextColor={INPUT_PLACEHOLDER}
              onValueChange={handleState}
              selectedValue={credential.state}
              itemStyle={{fontFamily: 'Montserrat-Medium'}}>
              <Picker.Item label="State" value="" color={INPUT_PLACEHOLDER} />
              {JSONdata.stateArray &&
                JSONdata.stateArray.length &&
                JSONdata.stateArray.length > 0 &&
                JSONdata.stateArray.map((city, index) => (
                  <Picker.Item color="#000" label={city} value={city} />
                ))}
            </Picker>
          </View>
          <View
            style={[
              styles.inputStyle,
              !error.city && {borderBottomColor: 'red'},
            ]}>
            <Picker
              placeholder="City of Residence"
              mode={'dropdown'}
              placeholderTextColor={INPUT_PLACEHOLDER}
              onValueChange={handleCity}
              selectedValue={credential.city}>
              <Picker.Item
                label="City of Residence"
                value=""
                color={INPUT_PLACEHOLDER}
              />
              {JSONdata.cityArray.length > 0 &&
                JSONdata.cityArray.map((city, index) => (
                  <Picker.Item color="#000" label={city} value={city} />
                ))}
            </Picker>
          </View>

          {/* <TextInputIcon
            placeholder="City of Residence"
            inputHandler={handleCity}
            placeholderTextColor={INPUT_PLACEHOLDER}
            style={[
              styles.inputStyle,
              !error.city && { borderBottomColor: 'red' },
            ]}
            textStyle={styles.textStyle}
            validationCallback={() => credential.city.length > 0}
            value={credential.city}
          /> */}
          {/* <TextInputIcon
            placeholder="Country"
            inputHandler={handleCountry}
            placeholderTextColor={INPUT_PLACEHOLDER}
            style={[
              styles.inputStyle,
              !error.country && { borderBottomColor: 'red' },
            ]}
            textStyle={styles.textStyle}
            validationCallback={() => credential.country.length > 0}
            value={credential.country}
          /> */}
          <DmzButton
            onPress={props.onPress}
            style={{
              Text: {
                width: '100%',
                textAlign: 'center',
                color: 'white',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              },
              Container: {
                width: '70%',
                height: 46,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 26,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                marginTop: '15%',
                elevation: 2,
                marginBottom: 10,
              },
            }}
            text="Next"
            // isLoading={isLoading}
            disabled={
              // isLoading ||
              // !error.phone ||
              //  !error.city ||
              //!error.country ||
              credential.phone === '' ||
              //  credential.city === '' ||
              credential.country === ''
            }
          />
        </View>
        <TouchableOpacity onPress={() => props.onPressChangeEmail() }>
          <Text
          style={{
            width: '100%',
            textAlign: 'center',
            color: NEW_PRIMARY_BACKGROUND,
            fontSize: 14,
            fontFamily: 'Montserrat-Medium',
            
          }}>
          Change email address?
        </Text>
        </TouchableOpacity>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            color: INPUT_PLACEHOLDER,
            fontSize: 14,
            fontFamily: 'Montserrat-Regular',
            marginBottom: '7%',
          }}>
          Just one more step to complete{'\n'}your registration process!
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            paddingTop: 5,
            paddingBottom: 15,
          }}>
          <Image
            // source={require('../../../assets/images/docplusIcon.png')}
            source={require('../../../assets/icons/new_docplus_log.png')}
            style={{height: 30, width: 100}}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    width: '65%',
    borderBottomColor: NEW_PRIMARY_COLOR,
    borderBottomWidth: 1,
    height: 'auto',
    alignSelf: 'center',
  },
  textStyle: {
    color: NEW_HEADER_TEXT,
    fontSize: 13,
    marginTop: 20,
    // fontFamily: 'Montserrat-Medium',
  },
});
