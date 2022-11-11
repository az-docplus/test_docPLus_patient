import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Image,
  StatusBar,
  FlatList,
  BackHandler,
} from 'react-native';
import {SECONDARY_COLOR, NEW_PRIMARY_BACKGROUND} from '../../../styles/colors';
import {Picker} from '@react-native-community/picker';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import RadioGroupV2 from '../../../components/molecules/RadioGroup/RadioGroupV2';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {
  getSpecialty,
  UpdateDoctorProfile,
  SetForNow,
} from '../../../reduxV2/action/DoctorAction';
import {Host} from '../../../utils/connection';
import AnimatedErrorText from '../../../components/atoms/animatedErrorText/AnimatedErrorText';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';
import axios from 'axios';
import BlurModal from '../../../../src/components/molecules/Modal/BlurModal';
import suggestionCard from '../../../components/molecules/Appointments/suggestionCard';
import AppointmentHistoryItem from '../../../components/molecules/Appointments/suggestionCard';
// import { Local } from '../../../i18n';

function Onboarding({navigation}) {
  const {theme} = useSelector((state) => state.AuthReducer);
  const [activeGender, setActiveGender] = useState('');
  const [city, setCity] = useState('');
  const [specialitySelected, setSpecialitySelected] = useState('');
  const [year, setYearSelected] = useState('');
  const [registrationCouncil, setRegistrationCouncil] = useState('');
  const [registrationYear, setRegistrationYear] = useState('');
  const [degree, setDegree] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [college, setCollege] = useState('');
  const [yearOfExperience, setYearOfExperience] = useState(0);
  const [clinicAndHospital, setClinicAndHospital] = useState('');
  const [cancelationPolicy, setcancelationPolicy] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [followUps, setFollowUps] = useState('No');
  const [followUpsCount, setFollowUpsCount] = useState(1);
  const [ConsultationFee, setConsultationFee] = useState(0);
  const [bio, setBio] = useState('');
  const dispatch = useDispatch();
  const {userData, isLoggedin, isDoctor} = useSelector(
    (state) => state.AuthReducer,
  );
  // console.log(userData);
  const {specialtyLoading, specialty, doctorProfile} = useSelector(
    (state) => state.DoctorReducer,
  );
  // console.log('doctor profile', doctorProfile);
  const [imageSource, setImageSource] = useState(
    require('../../../assets/images/dummy_profile.png'),
  );

  /* useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []); */

  const [similarDoctors, setSimilarDoctors] = useState([]);
  const [visible, setVisible] = useState(false);
  const [docData, setDocData] = useState({});

  const onCancel = () => {
    setVisible(false);
  };

  const handleSetDocData = (data) => {
    setDocData(data);
    setVisible(false);
    console.log(data, '??????????????????????????');
  };

  const handleReset = () => {
    setCity('');
    // setEmail(data?.email);
    // setPhone(data?.phone);
    // setState(data?.state);
    setCity('');
    // setCountry(data?.country);
    // setRLanguage(data?.language);
    // setUrl(data?.url);
    setActiveGender('');
    setSpecialitySelected('');
    // setYearSelected(data?.ed[0]?.year);
    setRegistrationCouncil('');
    setRegistrationYear('');
    setRegistrationNumber('');
    // setDegree(data?.ed[0]?.degree);
    // setCollege(data?.ed[0]?.university);
    setYearOfExperience(0);
    setConsultationFee(0);
    setBio('');
    // setBilling(data?.billing ?? [{fee: '', country: ''}]);
    setcancelationPolicy('');
    setConsultationType('');
  };

  useEffect(() => {

    const education =
      docData?.education && docData?.education[0]
        ? docData?.education[0]
        : null;

    console.log(
      '::::::::::::::::::',
      docData?.payment,
      docData?.cancelationPolicy,
      education,
      '????????????????????????????????????',
    );

    setCity(docData?.city);
    // setEmail(data?.email);
    // setPhone(data?.phone);
    // setState(data?.state);
    setCity(docData?.city);
    // setCountry(data?.country);
    // setRLanguage(data?.language);
    // setUrl(data?.url);
    setActiveGender(
      docData?.sex?.toLowerCase() || docData?.gender?.toLowerCase(),
    );
    setSpecialitySelected(docData?.specialty);
    setYearSelected(education?.year?.toString());
    setRegistrationCouncil(docData?.registration?.regCouncil);
    setRegistrationYear(docData?.registration?.regYear?.toString());
    setRegistrationNumber(docData?.registration?.regNo);
    setDegree(education?.degree);
    setCollege(education?.university);
    setYearOfExperience(docData?.experience ?? 0);
    setConsultationFee(docData?.fee ?? 0);
    setBio(docData?.bio);
    // setBilling(data?.billing ?? [{fee: '', country: ''}]);
    setFollowUpsCount(docData?.followUps),
      setcancelationPolicy(docData?.cancelationPolicy ?? '');
    setConsultationType(docData?.consultationType ?? '');
  }, [docData]);


  useEffect(() => {
    const params = {
      match: JSON.stringify({
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        name: userData?.basic?.name,
      }),
      exact: true,
      name: userData?.basic?.name,
      pageNo: '0',
      size: '10',
    };
    console.log({params});
    axios
      .post(`${Host}/doctors/searchlite`, params)
      .then((res) => {
        // console.log(res.data.data.length, "????????????????????")
        const data = res.data.data.filter((doc, index) => {
          if (doc.email !== userData?.email) return doc;
        });
        setSimilarDoctors(data);
      })
      .catch((err) => {});
  }, []);

  const [error, seterror] = useState({
    year: true,
    registrationYear: true,
    yearOfExperience: true,
  });

  const handleIncementExp = () => {
    if (yearOfExperience == '') setYearOfExperience('1');
    else setYearOfExperience((parseInt(yearOfExperience) + 1).toString());
  };

  const handleDecrementExp = () => {
    if (yearOfExperience > 0)
      setYearOfExperience((parseInt(yearOfExperience) - 1).toString());
  };

  useEffect(() => {
    if (doctorProfile?.picture?.length) {
      setImageSource({
        uri: `${Host}${doctorProfile?.coverPhoto?.replace('public', '')
          .replace('\\\\', '/')}`,
      });
    } else {
      setImageSource(require('../../../assets/images/dummy_profile.png'));
    }
  }, [doctorProfile]);
  // if (forNow || doctorProfile.onboarding) {
  //   navigation.navigate('DoctorMain');
  // }

  useEffect(() => {
    dispatch(getSpecialty());
  }, []);

  useEffect(() => {
    // console.log("UserDataUUUUUUUUUUUUSSSSSSSSSSSEEEEEEEERRRRRR",userData, "DDDDDDDDDOOOOOOOOOOOOODCCCCCCCCCCCCTTTTTTTTTTTO")
    setRegistrationNumber(userData?.npi ? userData?.npi : doctorProfile?.npi);
    setYearOfExperience(0);
  }, []);

  const [isSubmit, setIsSubmit] = useState(false)

  const handleSubmit = () => {
    setIsSubmit(true)
    if(activeGender === '' ||
    specialitySelected === '' ||
    bio === '' ||
    degree === '' ||
    college === '' ||
    year === '' ||
    registrationNumber === '' ||
    registrationCouncil === '' ||
    registrationYear === '' ||
    yearOfExperience === '' ||
    ConsultationFee == 0) {
      return
    }
    const obj = {
      id: userData._id,
      gender: activeGender,
      education: [
        {
          degree: degree,
          university: college,
          year: year,
        },
      ],
      registration: {
        regNo: registrationNumber,
        regCouncil: registrationCouncil,
        regYear: registrationYear,
      },
      specialty: specialitySelected,
      experience: yearOfExperience,
      //city: city,
      bio: bio,
      fee: ConsultationFee,
      onBoarding: true,
      cancelationPolicy: cancelationPolicy,
      consultationType: consultationType,
      followUps: followUps === 'Yes' ? followUpsCount : 0,
    };

    console.log(obj, '%%%%%%%%%%%%%%%')
    setIsSubmit(false)
    dispatch(
      UpdateDoctorProfile(obj, () => {
        //update for now
        dispatch(
          SetForNow(true, () => {
            console.log('calling callback');
            console.log(navigation);
            // navigation.navigate('MainController');
          }),
        );
      }),
    );
  };

  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      {
        similarDoctors.length > 0 && <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}>
        <View
          style={{
            backgroundColor: '#fff',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#077EE9',
              fontWeight: 'bold',
            }}>
            {similarDoctors.length} match(s) found!
          </Text>
        </View>
      </TouchableOpacity>
      }

      <BlurModal {...{visible, onCancel, setVisible}}>
        {/* <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          color: Colors.primary_text_color[theme],
          marginBottom: 15,
        }}>
        {similarDoctors.length} match(s) found!

      </Text> */}

        <FlatList
          style={{
            flex: 1,
            // padding: '3%'
          }}
          data={similarDoctors}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => {
            if (item?._id)
              return (
                <AppointmentHistoryItem
                  navigation={navigation}
                  handleSetDocData={handleSetDocData}
                  item={item}
                  style={{
                    margin: '0%',
                  }}
                />
              );
          }}
        />
      </BlurModal>
      <View style={OnboardingStyle.Container}>
        <ScrollView style={OnboardingStyle.ScrollView}>
          <View
            style={{
              width: '90%',
              paddingVertical: 30,
              paddingTop: 40,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '500',
              }}>
              Welcome to
              <Text style={{color: '#077EE9', fontWeight: 'bold'}}>
                {' '}
                DocPlus
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 18,
                letterSpacing: 0.8,
              }}>
              Finish your profile to get started
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              paddingVertical: 10,
              paddingBottom: 5,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
              }}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 100,
                  borderColor: '#dddddd',
                  borderWidth: 2,
                }}
                source={imageSource}></Image>
            </View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '500',
                letterSpacing: 1.2,
                marginTop: '4%',
              }}>
              Dr.{userData.basic.name}
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: '#fcfcfc',
              marginTop: 20,
            }}>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: '8%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <RadioGroupV2
                horizontal
                activeKey={activeGender}
                setActiveKey={setActiveGender}
                Item={[
                  {value: 'Male', id: 'male'},
                  {value: 'Female', id: 'female'},
                ]}></RadioGroupV2>
            </View>
            {!activeGender && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center', paddingLeft: "7%"}}
          text={'Please select a valid gender!'}
        />
      )}
            {/* <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                selectedValue={city}
                style={{width: '100%'}}
                onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
                <Picker.Item color={'#8e9393'} label="Select City" value="" />
                <Picker.Item label="Bangalore" value="bangalore" />
                <Picker.Item label="Pune" value="pune" />
              </Picker>
            </View> */}
            <View
              style={{
                paddingHorizontal: '6%',
              }}>
              <Picker
                selectedValue={specialitySelected}
                style={{width: '100%'}}
                onValueChange={(itemValue, itemIndex) =>
                  setSpecialitySelected(itemValue)
                }>
                <Picker.Item color={'#8e9393'} label="Speciality" value="" />
                {specialty.map((item) => {
                  return <Picker.Item label={item} value={item} />;
                })}
              </Picker>
            </View>
          </View>
            {!specialitySelected && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center', paddingLeft: "7%"}}
          text={'Please select a valid Speciality!'}
        />
      )}

          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Bio</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: '#fcfcfc',
              paddingHorizontal: '5%',
            }}>
            <TextInput
              onChangeText={(bio) => {
                setBio(bio);
              }}
              multiline
              maxLength={256}
              value={bio}
              style={{fontSize: 16}}
              placeholder={'About you'}
              textAlignVertical={'top'}
              maxLength={256}
              numberOfLines={3}
            />
          </View>
            {!bio && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center', paddingLeft: "7%"}}
          text={'Bio Should not be empty!'}
        />
      )}
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Education Qualifications
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: '#fcfcfc',
            }}>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                selectedValue={degree}
                mode={'dropdown'}
                style={{width: '100%'}}
                onValueChange={(itemValue, itemIndex) => setDegree(itemValue)}>
                <Picker.Item color={'#8e9393'} label="Degree" value="" />
                <Picker.Item label="MBBS" value="MBBS" />
                <Picker.Item label="BHMS" value="BHMS" />
                <Picker.Item label="DHMS" value="DHMS" />
                <Picker.Item label="B.V.Sc & AH" value="B.V.Sc & AH" />
                <Picker.Item label="D.Pharma" value="D.Pharma" />
                <Picker.Item label="BMLT" value="BMLT" />
                <Picker.Item label="BDS" value="BDS" />
                <Picker.Item label="BAMS" value="BAMS" />
                <Picker.Item label="MS" value="MS" />
              </Picker>
            </View>
            <View
              style={{
                paddingHorizontal: '7%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                onChangeText={(text) => {
                  setCollege(text);
                }}
                value={college}
                maxLength={256}
                style={{fontSize: 16}}
                placeholder="College/University"></TextInput>
            </View>
            <View
              style={{
                paddingHorizontal: '6%',
              }}>
              <TextInput
                onChangeText={(itemValue, itemIndex) => {
                  const yearRegEX = /(?:(?:19|20)[0-9]{2})/;
                  const date = new RegExp(yearRegEX);
                  const valid = date.test(itemValue);
                  console.log(valid);

                  seterror({...error, year: valid});
                  setYearSelected(itemValue);
                }}
                value={year}
                style={{fontSize: 16}}
                maxLength={4}
                keyboardType={'number-pad'}
                placeholder="Year"></TextInput>

              {/* <Picker
                selectedValue={year}
                mode={'dropdown'}
                style={{ width: '100%' }}
                onValueChange={(itemValue, itemIndex) =>
                  setYearSelected(itemValue)
                }>
                <Picker.Item color={'#8e9393'} label="Year" value="" />
                <Picker.Item label="2020" value="2020" />
                <Picker.Item label="2019" value="2019" />
                <Picker.Item label="2018" value="2018" />
                <Picker.Item label="2017" value="2017" />
                <Picker.Item label="2016" value="2016" />
                <Picker.Item label="2015" value="2015" />
                <Picker.Item label="2014" value="2014" />
              </Picker> */}
            </View>
          </View>
          {(!year || !degree || !college) && isSubmit && (
            <AnimatedErrorText
              style={{width: '84%', alignSelf: 'center'}}
              text={'Please enter valid Education detais!'}
            />
          )}
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Registration Details
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: '#fcfcfc',
            }}>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                onChangeText={(text) => {
                  setRegistrationNumber(text);
                }}
                maxLength={15}
                value={registrationNumber}
                style={{fontSize: 16, marginLeft: '0%'}}
                placeholder="Registration Number"></TextInput>
            </View>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                onChangeText={(itemValue, itemIndex) =>
                  setRegistrationCouncil(itemValue)
                }
                value={registrationCouncil}
                style={{fontSize: 16}}
                maxLength={256}
                // keyboardType={'number-pad'}
                placeholder="Registration Council"></TextInput>
            </View>

            <View
              style={{
                paddingHorizontal: '6%',
              }}>
              <TextInput
                onChangeText={(itemValue, itemIndex) => {
                  const yearRegEX = /(?:(?:19|20)[0-9]{2})/;
                  const date = new RegExp(yearRegEX);
                  const valid = date.test(itemValue);
                  console.log(valid);
                  seterror({...error, registrationYear: valid});
                  setRegistrationYear(itemValue);
                }}
                value={registrationYear}
                style={{fontSize: 16}}
                keyboardType={'number-pad'}
                maxLength={4}
                placeholder="Registration Year"></TextInput>
            </View>
          </View>
          {(!registrationCouncil || !registrationNumber || !registrationYear) && isSubmit && (
            <AnimatedErrorText
              style={{width: '84%', alignSelf: 'center'}}
              text={'Registration Details should be valid'}
            />
          )}
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Fee</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: '#fcfcfc',
            }}>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                onChangeText={(text) => {
                  setConsultationFee(text);
                }}
                value={ConsultationFee.toString()}
                style={{fontSize: 16, marginLeft: '2%'}}
                maxLength={5}
                placeholder="Consultation fee"></TextInput>
            </View>
            {!ConsultationFee && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center', marginLeft: "10%"}}
          text={'Please enter a valid Fee'}
        />
      )}
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                selectedValue={cancelationPolicy}
                mode={'dropdown'}
                style={{width: '100%'}}
                onValueChange={(itemValue, itemIndex) => {
                  setcancelationPolicy(itemValue);
                }}>
                <Picker.Item color={'#8e9393'} label="Policy" value="" />
                <Picker.Item label="Strict" value="Strict" />
                <Picker.Item label="Moderate" value="Modarate" />
                <Picker.Item label="Flexible" value="Flexible" />
              </Picker>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('CancelationPolicy')}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  color: 'blue',
                  textAlign: 'right',
                  fontSize: 14,
                  margin: 10,
                }}>
                View Policy
              </Text>
            </TouchableOpacity>

            {/* <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TextInput placeholder="Add Payment"></TextInput>
              <TouchableOpacity>
                <Text style={{ fontSize: 18, color: '#8e9393' }}>+</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingHorizontal: '6%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TextInput placeholder="Add Schedule"></TextInput>
              <TouchableOpacity>
                <Text style={{ fontSize: 18, color: '#8e9393' }}>+</Text>
              </TouchableOpacity>
            </View>
          */}
          </View>

          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              Consultation Type
              {/* {Local('doctor.profile.payment')} */}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                // dropdownIconColor="red"
                /* itemStyle={{
                  backgroundColor: "#009387"
                }} */
                selectedValue={consultationType}
                mode={'dropdown'}
                style={{
                  width: '100%',
                  // color: Colors.primary_text_color[theme]
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setConsultationType(itemValue);
                }}>
                <Picker.Item
                  color={'#8e9393'}
                  label="Consultation Type"
                  value=""
                />
                <Picker.Item label={'Tele-consult'} value="Tele-consult" />
                <Picker.Item label={'In-person'} value="In-person" />
                <Picker.Item label={'Both'} value="Both" />
              </Picker>
            </View>
          </View>

          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Years of Experience</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: '#fcfcfc',
            }}>
            <View
              style={{
                paddingLeft: '5%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
                flexDirection: 'row',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                onChangeText={(text) => {
                  if (parseInt(text) < 0 || parseInt(text) > 99) {
                    seterror({...error, yearOfExperience: false});
                  } else {
                    seterror({...error, yearOfExperience: true});
                  }
                  setYearOfExperience(text);
                }}
                value={yearOfExperience}
                maxLength={2}
                style={{fontSize: 16, marginLeft: '2%'}}
                placeholder="Year of experience"></TextInput>

              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 'auto',
                  marginBottom: 'auto',
                  marginTop: 'auto',
                  marginRight: 20,
                }}>
                <TouchableOpacity onPress={handleDecrementExp}>
                  <FontAwesomeIcon
                    color={NEW_PRIMARY_BACKGROUND}
                    name="minus"
                    size={24}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleIncementExp}
                  style={{marginLeft: 18}}>
                  <FontAwesomeIcon
                    color={NEW_PRIMARY_BACKGROUND}
                    name="plus"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* <View
              style={{
                paddingHorizontal: '7%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TextInput
                onChangeText={(text) => {
                  setClinicAndHospital(text);
                }}
                value={clinicAndHospital}
                style={{ fontSize: 16 }}
                placeholder="Add Clinic/Hospital"></TextInput>
              <TouchableOpacity>
                <Text style={{ fontSize: 18, color: '#8e9393' }}>+</Text>
              </TouchableOpacity>
            </View> */}
          </View>
          {!yearOfExperience && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center', marginLeft: "14%"}}
          text={'Years of experience should not be empty'}
        />
      )}
          {/* {!error.yearOfExperience && (
            <AnimatedErrorText
              style={{width: '84%', alignSelf: 'center'}}
              text={'Experience should be valid'}
            />
          )} */}
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Do you want to allow free follow ups?</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: '#fcfcfc',
            }}>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: '8%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <RadioGroupV2
                horizontal
                activeKey={followUps}
                setActiveKey={setFollowUps}
                Item={[
                  {value: 'Yes', id: 'Yes'},
                  {value: 'No', id: 'No'},
                ]}></RadioGroupV2>
            </View>

            {followUps === 'Yes' && (
              <View
                style={{
                  paddingHorizontal: '6%',
                  borderBottomWidth: 1,
                  borderColor: '#e0e0e0',
                }}>
                <TextInput
                  onChangeText={(itemValue, itemIndex) => {
                    setFollowUpsCount(itemValue);
                  }}
                  value={followUpsCount}
                  style={{fontSize: 14}}
                  keyboardType={'number-pad'}
                  maxLength={2}
                  placeholder="How many free follow ups would you like to allow?"></TextInput>
              </View>
            )}
          </View>
          <DmzButton
            onPress={handleSubmit}
            // disabled={
            //   activeGender === '' ||
            //   specialitySelected === '' ||
            //   bio === '' ||
            //   degree === '' ||
            //   college === '' ||
            //   year === '' ||
            //   registrationNumber === '' ||
            //   registrationCouncil === '' ||
            //   registrationYear === '' ||
            //   yearOfExperience === '' ||
            //   ConsultationFee == 0
            // }
            style={{
              Text: {
                width: '100%',
                textAlign: 'center',
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              },
              Container: {
                width: 250,
                height: 46,
                borderRadius: 25,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 10,
                elevation: 3,
              },
            }}
            text="SUBMIT"
          />
          {/* <DmzButton
            onPress={handleReset}
            // disabled={
            //   activeGender === '' ||
            //   specialitySelected === '' ||
            //   bio === '' ||
            //   degree === '' ||
            //   college === '' ||
            //   year === '' ||
            //   registrationNumber === '' ||
            //   registrationCouncil === '' ||
            //   registrationYear === '' ||
            //   yearOfExperience === '' ||
            //   ConsultationFee == 0
            // }
            style={{
              Text: {
                width: '100%',
                textAlign: 'center',
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              },
              Container: {
                width: 250,
                height: 46,
                borderRadius: 25,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                marginBottom: 20,
                // marginTop: 10,
                elevation: 3,
              },
            }}
            text="RESET"
          /> */}
        </ScrollView>
      </View>
    </>
  );
}

const OnboardingStyle = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
  ScrollView: {
    flex: 1,
  },
});

export default Onboarding;

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: 'white',
    width: '100%',
    padding: 0,
    borderRadius: 14,
    // flexDirection: 'row',
    // borderWidth: 1,
  },
  docName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
  },
  docSpeciality: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  appointmentName: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    // color: NEW_PRIMARY_BACKGROUND,
  },
  iconContainer: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    borderRadius: 15,
  },
});
