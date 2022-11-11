/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  useWindowDimensions,
  PermissionsAndroid,
  StyleSheet,
  Button,
  Platform,
  BackHandler,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AnimInput from '../../../components/molecules/AnimInput/AnimInput';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  UploadProfilePic,
  UpdateProfile,
} from '../../../redux/action/patientAccountAction';
import { PRIMARY_COLOR, HEADER_TEXT } from '../../../styles/colors';
import { Picker } from '@react-native-community/picker';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import { Local, setLocale } from '../../../i18n';

function Profile({ navigation }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.AuthReducer);
  const { patient } = useSelector((state) => state.PatientAccountReducer);

  const [patientData, setPatientData] = useState(patient);
  const dimen = useWindowDimensions();
  const screenWidth = dimen.width;
  const [inputFields, setInputFields] = useState({
    // firstName: patient.firstName ? patient.firstName : '',
    // lastName: patient.lastName ? patient.lastName : '',
    // phone: patient.phone ? patient.phone : '',
    // email: patient.email ? patient.email : '',
    // sex: patient.sex ? patient.sex : '',
    // dob: patient.dob ? patient.dob : '',
    // bloodGroup: patient.bloodGroup ? patient.bloodGroup : '',
    // height: patient.height.value != undefined ? patient.height.value : '',
    // weight: patient.weight.value == undefined ? '' : patient.weight.value,
    // weight: data.weight.val != null ? data.weight.val : '',
  });

  const initialData = inputFields;

  // BackHandler.addEventListener('hardwareBackPress', () => {
  //   navigation.navigate('Home');
  //   // BackHandler.removeEventListener('hardwareBackPress', () => {});
  //   return true;
  // });

  useEffect(() => {
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
    // const {name, phone, email, sex, dob, bloodGroup, height, weight} = patient;
    // console.log('###########', patient);
    // console.log(typeof patient.height.value);
    // patient.height.value == undefined
    //   ? console.log('undefined')
    //   : console.log('defined');
    setPatientData(patient);
    setInputFields({
      firstName: patient.firstName ? patient.firstName : '',
      lastName: patient.lastName ? patient.lastName : '',
      phone: patient.phone ? patient.phone : '',
      email: patient.email ? patient.email : '',
      sex: patient.sex ? patient.sex : '',
      dob: patient.dob ? patient.dob : '',
      bloodGroup: patient.bloodGroup ? patient.bloodGroup : '',
      height: patient.height.value != undefined ? patient.height.value : '',
      weight: patient.weight.value == undefined ? '' : patient.weight.value,
      // weight: data.weight.val != null ? data.weight.val : '',
    });
  }, [patient]);

  const onChoosePicture = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    console.log(granted);
    if (granted) {
      PickImage();
    } else {
      askPermission();
    }
  };
  const askPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'DocPlus needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        PickImage();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const PickImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // const source = {uri: response.uri};
        // console.log(source);
        // const path = response.fileName;
        // setData({...inputFields, imagePath: path});
        dispatch(UploadProfilePic(data.id, response));
        // console.log(
        //   '###################---------------------------------#############################################--------------------------------------###',
        // );
        // console.log(data.id);
        // console.log(
        //   '###################---------------------------------#############################################--------------------------------------###',
        // );
        // console.log(response);
      }
    });
  };

  const saveProfile = async () => {
    const response = {
      ...inputFields,
      height: {
        value: inputFields.height,
        date: Date(),
      },
      weight: {
        value: inputFields.weight,
        date: Date(),
      },
    };
    console.log(response);
    await dispatch(UpdateProfile(response, data.id));
  };

  return (
    <View style={{ flex: 1, backgroundColor: HEADER_TEXT }}>
      <ScrollView style={{ marginBottom: 70, flex: 1 }}>
        <TopNavBar
          navigation={navigation}
          headerText="Profile"
          style={{
            Header: {
              color: '#fff',
              fontSize: 23,
              alignSelf: 'center',
              width: '50%',
            },
          }}
        />
        <View
          style={{
            flex: 4,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 8,
            paddingBottom: 8,
          }}>
          <TouchableOpacity onPress={onChoosePicture}>
            <View
              style={{
                height: 150,
                width: 150,
                borderRadius: 150,
                backgroundColor: '#fff',
                overflow: 'hidden',
              }}>
              <Image
                style={{ height: '100%', width: '100%' }}
                source={require('../../../assets/jpg/person1.jpg')}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  height: 30,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(80,80,80,0.7)',
                }}>
                <Text style={{ color: '#f2f2f2', fontSize: 12 }}>Upload</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 10,
            paddingHorizontal: 25,
            paddingVertical: 10,
            backgroundColor: '#fff',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <AnimInput
              placeholder="First Name"
              inputHandler={(txt) =>
                setInputFields({ ...inputFields, firstName: txt })
              }
              value={inputFields.firstName}
              style={{
                Container: [styles.Container, { width: '40%' }],
                Input: styles.Input,
                Placeholder: styles.Placeholder,
              }}
            />
            <AnimInput
              placeholder="Last Name"
              inputHandler={(txt) =>
                setInputFields({ ...inputFields, lastName: txt })
              }
              value={inputFields.lastName}
              style={{
                Container: [styles.Container, { width: '40%' }],
                Input: styles.Input,
                Placeholder: styles.Placeholder,
              }}
            />
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}>
            <DmzText
              lite
              text="Contact Number"
              style={[styles.Placeholder, { marginTop: 20 }]}
            />
            <TouchableOpacity
              onPress={() => {
                console.log('pressed');
                navigation.navigate(
                  'EditPhoneNumber',
                  { phone: inputFields.phone },
                  // navigation.navigate('EditPhoneNumber'),
                );
              }}
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  styles.Input,
                  { marginBottom: 0, marginTop: 5, width: 'auto' },
                ]}>
                {inputFields.phone == ''
                  ? 'Add Phone Number'
                  : inputFields.phone}
              </Text>
              <Text
                style={[
                  styles.Input,
                  {
                    marginBottom: 0,
                    marginTop: 5,
                    color: 'crimson',
                    width: 'auto',
                  },
                ]}>
                {inputFields.phone == '' ? '' : 'Update'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              width: '100%',
              alignItems: 'flex-start',
            }}>
            <DmzText
              lite
              text="Email Id"
              style={[styles.Placeholder, { marginTop: 20 }]}
            />
            <TouchableOpacity
              onPress={() => {
                console.log('pressed');
                navigation.navigate(
                  'EditEmailId',
                  {
                    email: inputFields.email == '' ? '' : inputFields.email,
                  },
                  // navigation.navigate('EditPhoneNumber'),
                );
              }}
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  styles.Input,
                  { marginBottom: 0, marginTop: 5, width: 'auto' },
                ]}>
                {inputFields.email == '' ? 'Add Email Id' : inputFields.email}
              </Text>
              <Text
                style={[
                  styles.Input,
                  {
                    marginBottom: 0,
                    marginTop: 5,
                    color: 'crimson',
                    width: 'auto',
                  },
                ]}>
                {inputFields.email == '' ? '' : 'Update'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}>
            <DmzText
              lite
              text="Gender"
              style={[styles.Placeholder, { marginTop: 20 }]}
            />
            <DmzText
              text={inputFields.sex == '' ? 'Select Gender' : inputFields.sex}
              style={[
                styles.Input,
                {
                  width: '90%',
                  marginTop: 0,
                  fontWeight: inputFields.sex == '' ? 'normal' : 'bold',
                  fontSize: inputFields.sex == '' ? 16 : 18,
                },
              ]}>
              <Picker
                selectedValue={inputFields.sex}
                style={{ width: 50, height: 50, marginTop: -10 }}
                onValueChange={(txt) =>
                  setInputFields({ ...inputFields, sex: txt })
                }>
                <Picker.Item label="Select Gender" value={''} color="#ccc" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </DmzText>
          </View>
          <View>
            <DmzText
              lite
              text="Date of Birth"
              style={[styles.Placeholder, { marginTop: 20 }]}
            />
            <DatePicker
              date={inputFields.dob}
              mode="date"
              androidMode="spinner"
              showIcon={false}
              placeholder="Select date of birth"
              format="DD-MM-YYYY"
              minDate="01-01-1930"
              maxDate={Moment(new Date(), 'DD-MM-YYYY')}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              allowFontScaling={true}
              customStyles={{
                dateTouchBody: { marginTop: -30 },
                dateInput: {
                  borderWidth: 0,
                  fontSize: 15,
                  height: 40,
                  marginBottom: 10,
                },
                dateText: [styles.Input, { width: '100%' }],
                placeholderText: [
                  styles.Input,
                  {
                    width: '100%',
                    color: '#ccc',
                    fontWeight: 'normal',
                    marginTop: 0,
                  },
                ],
              }}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                width: '100%',
                marginTop: 20,
                alignItems: 'center',
              }}
              onDateChange={(date) => {
                console.log(date);
                setInputFields({ ...inputFields, dob: date });
              }}
            />
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              height: 90,
            }}>
            <DmzText
              lite
              text="Blood Group"
              style={[styles.Placeholder, { marginTop: 20 }]}
            />
            <DmzText
              lite
              text={
                inputFields.bloodGroup == ''
                  ? 'Select Blood Group'
                  : inputFields.bloodGroup
              }
              style={[
                styles.Input,
                {
                  width: '90%',
                  marginTop: 0,
                  fontWeight: inputFields.bloodGroup == '' ? 'normal' : 'bold',
                  fontSize: inputFields.bloodGroup == '' ? 16 : 18,
                },
              ]}>
              <Picker
                selectedValue={inputFields.bloodGroup}
                mode={'dialog'}
                style={{ width: 50, height: 50, marginTop: -10 }}
                onValueChange={(txt) =>
                  setInputFields({ ...inputFields, bloodGroup: txt })
                }>
                <Picker.Item label="Select Blood Group" value={''} />
                <Picker.Item label="A+" value="A+" />
                <Picker.Item label="A-" value="A-" />
                <Picker.Item label="B+" value="B+" />
                <Picker.Item label="B-" value="B-" />
                <Picker.Item label="O+" value="O+" />
                <Picker.Item label="O-" value="O-" />
                <Picker.Item label="AB+" value="AB+" />
                <Picker.Item label="AB-" value="A-B" />
              </Picker>
            </DmzText>
          </View>
          {/* <AnimInput
            placeholder="Height (in cm)"
            keyboardType="number-pad"
            inputHandler={(txt) =>
              setInputFields({...inputFields, height: txt})
            }
            value={inputFields.height}
            style={{
              Container: styles.Container,
              Input: styles.Input,
              Placeholder: styles.Placeholder,
            }}
          />
          <AnimInput
            placeholder="Weight (in Kgs)"
            keyboardType="number-pad"
            inputHandler={(txt) =>
              setInputFields({...inputFields, weight: txt})
            }
            value={inputFields.weight}
            style={{
              Container: styles.Container,
              Input: styles.Input,
              Placeholder: styles.Placeholder,
            }}
          /> */}
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          paddingVertical: 10,
          bottom: 0,
          width: '100%',
          backgroundColor: '#FFF',
        }}>
        <TouchableOpacity
          onPress={saveProfile}
          style={{
            width: screenWidth * 0.6,
            height: 52,
            backgroundColor: '#ff1f75',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 15,
            elevation: 3,
          }}>
          <Text style={{ color: '#f1f1f1' }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  Container: { height: 60, marginTop: 20, left: 0 },
  Input: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    left: 0,
    width: '100%',
    marginTop: 15,
    marginBottom: -10,
    marginLeft: 0,
  },
  Placeholder: {
    fontSize: 16,
    color: '#00000080',
  },
});
