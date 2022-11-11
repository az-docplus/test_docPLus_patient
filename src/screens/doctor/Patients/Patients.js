import React, {useEffect, useState} from 'react';
import {View, Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import {
  SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FONT_SIZE_16} from '../../../styles/typography';
import {useSelector, useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native';
import {
  GetRecentPatient,
  ManuallyAddRecentPatient,
} from '../../../reduxV2/action/DoctorAction';
import NetInfo from '@react-native-community/netinfo';
import NetworkStatus from '../../../components/atoms/NetworkStatus/NetworkStatus';
import moment from 'moment';
import {
  // BottomSheet,
  ListItem,
} from 'react-native-elements';
import {BottomSheet} from 'react-native-btr';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import AddRecentPatientModal from '../../../components/molecules/Modal/AddRecentPatient';
import {Colors} from '../../../styles/colorsV2';
import {Local} from '../../../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';


function PatientList({navigation}) {
  const {theme} = useSelector((state) => state.AuthReducer);
  const [modalVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {recentPatient, recentPatientLoading, doctorProfile} = useSelector(
    (state) => state.DoctorReducer,
  );

  const {userData} = useSelector((state) => state.AuthReducer);
  const [Patients, setPatients] = useState(recentPatient);

  useEffect(() => {
    !recentPatientLoading && dispatch(GetRecentPatient(userData._id));
  }, []);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    setPatients(recentPatient);
  }, [recentPatient]);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable) {
        setIsConnected(state.isConnected);
      } else {
        setIsConnected(state.isConnected);
      }
    });
    return unsubscribe;
  });

  const [isVisible, setIsVisible] = useState(false);

  const onEndEditing = (search) => {
    if (search === '') setPatients(recentPatient);
    else {
      const recentPatients = recentPatient.filter((p, id) => {
        const {patient} = p;
        if (
          (patient?.firstName + ' ' + patient?.lastName)
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          patient?.city?.toLowerCase().includes(search.toLowerCase()) ||
          patient?.state?.toLowerCase().includes(search.toLowerCase()) ||
          patient?.country?.toLowerCase().includes(search.toLowerCase())
          //  || (patient.lastName).toLowerCase().includes(search.toLowerCase())
        )
          return p;
      });
      setPatients(recentPatients);
    }
  };
  const handleSortByName = () => {
    const sortedPatinet = recentPatient.sort((a, b) => {
      const _A = a.patient.firstName + ' ' + a.patient.lastName;
      const _B = b.patient.firstName + ' ' + b.patient.lastName;
      _A.toLowerCase().localeCompare(_B.toLowerCase());
    });

    setPatients(sortedPatinet);
    setIsVisible(false);
  };
  const handleSortByAge = () => {
    const sortedPatinet = recentPatient.sort((a, b) => a.age - b.age);
    setPatients(sortedPatinet);
    setIsVisible(false);
  };

  const handleSortByDate = () => {
    setPatients(recentPatient.reverse());
    // const sortedPatinet = recentPatient.sort((a, b) => {
    //   new Date(b.appointment.bookedFor).getTime() - new Date(a.appointment.bookedFor).getTime()
    // })
    // setPatients(sortedPatinet)
    setIsVisible(false);
  };
  const sortByGender = (sex) => {
    const filtered = recentPatient.filter((p, id) => {
      if (p.sex && p.sex.toLowerCase() === sex.toLowerCase()) return p;
    });
    setPatients(filtered);
    setIsVisible(false);
  };
  const list = [
    {
      title: 'Latest First',
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: handleSortByDate,
    },
    {
      title: 'Sort by name',
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: handleSortByName,
    },
    {
      title: 'Sort by Age',
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: handleSortByAge,
    },
    {
      title: 'Female Patients',
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: () => sortByGender('Female'),
    },
    {
      title: 'Male Patients',
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: () => sortByGender('Male'),
    },
    {
      title: 'Reset',
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: () => {
        setIsVisible(false);
        setPatients(recentPatient);
      },
    },
    {
      title: 'Cancel',
      containerStyle: {backgroundColor: SECONDARY_BACKGROUND},
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: () => setIsVisible(false),
    },
  ];
  const successCallback = () => {
    console.log('success callback called');
    setVisible(false);
    setLoading(false);
    dispatch(GetRecentPatient(userData._id));
  };

  const errorCallback = () => {
    setLoading(false);
  };

  String.prototype.toTitleCase = function () {
    const splited = this.split(' ')
      .map((item) => {
        if (item[0]) return `${item[0].toUpperCase()}${item.slice(1)}`;
      })
      .join(' ');
    return splited;
  };

  return (
    <>
      <NetworkStatus isConnected={isConnected} />
      <AddRecentPatientModal
        loading={loading}
        onUpdate={(details) => {
          console.log(details, 'here');
          const credential = {
            ...details,
            doctor: userData._id,
            phone: details.contact,
            password: '#Sample@123',
            email: details.email.toLowerCase(),
          };
          setLoading(true);

          dispatch(
            ManuallyAddRecentPatient(
              credential,
              successCallback,
              errorCallback,
            ),
          );
        }}
        setVisible={setVisible}
        onCancel={() => setVisible(false)}
        visible={modalVisible}
      />
      <View
        style={{flex: 1, backgroundColor: Colors.secondary_background[theme], paddingBottom: '10%'}}>
        <TopNavBar
          navigation={navigation}
          headerText={`${Local(
            'doctor.patients_list.patients_list',
          )}`}></TopNavBar>
        <BottomSheet
          onBackButtonPress={() => setIsVisible(false)}
          visible={isVisible}
          onBackdropPress={() => setIsVisible(false)}
          // isVisible={isVisible}
          containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
          {list.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={[
                l.containerStyle,
                {backgroundColor: Colors.bottom_sheet_bg[theme]},
              ]}
              onPress={l.onPress}>
              <ListItem.Content>
                <ListItem.Title
                  style={[
                    l.titleStyle,
                    {color: Colors.primary_text_color[theme]},
                  ]}>
                  {l.title}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
        <View
          style={{
            // backgroundColor: '#fff',
            // elevation: 4,
            paddingVertical: '4%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '2%',
          }}>
          <SearchBarSolid
            withIcon={true}
            onEndEditing={onEndEditing}
            placeholderTextColor={Colors.search_placeholder_text[theme]}
            handleBottomList={() => setIsVisible(true)}
            placeholder={`${Local(
              'doctor.appointments.search_by_name_disease',
            )}`}
            searchIcon={
              <Image
                source={require('../../../assets/icons/search.png')}
                style={{height: 20, width: 18}}
                color={SEARCH_PLACEHOLDER_COLOR}
              />
            }
            icon={
              <Image
                source={require('../../../assets/icons/configure.png')}
                style={{height: 24, width: 24, marginLeft: 8}}
              />
            }
            style={{
              backgroundColor: Colors.search_background[theme],
              borderRadius: 10,
              elevation: 2,
            }}
          />
        </View>
        <ScrollView
          style={{
            backgroundColor: Colors.primary_background[theme],
            flex: 1,
            paddingBottom: '16%',
            paddingTop: '8%',
            paddingHorizontal: 12,
          }}>
          {Patients.length === 0 ? (
            <View
              style={{
                height: 260,
                width: '70%',
                alignSelf: 'center',
                justifyContent: 'center',
                paddingBottom: '12%',
                alignItems: 'center',
                marginTop: '12%',
              }}>
              <LottieView
                style={{height: '100%', width: '100%'}}
                source={require('../../../assets/anim_svg/empty_bottle.json')}
                autoPlay
                loop
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.primary_text_color[theme],
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 20,
                }}>
                {Local('doctor.patients_list.no_patient_found')}
              </Text>
            </View>
          ) : (
            Patients.map((item) => {
              if (item) {
                const {patient, _id, appointment} = item;
                return patient ? (
                  <View
                    key={_id}
                    style={{
                      backgroundColor: Colors.secondary_background[theme],
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '95%',
                      alignSelf: 'center',
                      // backgroundColor: '#fff',
                      elevation: 2,
                      padding: '3%',
                      marginBottom: '',
                      borderRadius: 10,
                      marginBottom: '4%',
                    }}>
                    <View style={{width: '90%'}}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View
                          style={{
                            height: 8,
                            width: 8,
                            borderRadius: 15,
                          }}></View>
                        <Text
                          style={{
                            fontSize: FONT_SIZE_16,
                            color: Colors.primary_text_color[theme],
                            fontFamily: 'Montserrat-SemiBold',
                            marginLeft: '4%',
                            letterSpacing: 0.5,
                          }}>
                          {`${patient.firstName.toTitleCase()} ${patient.lastName.toTitleCase()}`}
                        </Text>
                        <Text style={{fontFamily: 'Montserrat-Regular', marginLeft: "5%"}}>
                          {appointment[0]?.reasonForVisit
                            ? '' + appointment[0]?.reasonForVisit
                            : ''}
                        </Text>
                      </View>
                      <Text
                        style={{
                          marginLeft: '7%',
                          color: Colors.patient_time[theme],
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        {Local('doctor.patients_list.last_visit')} :{' '}
                        {console.log(appointment[0], "::::::::::::::::::")}
                        {moment(appointment[0]?.bookedFor).format("DD MMM 'YY")}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        AsyncStorage.setItem("dataB", JSON.stringify({patient, appointment}))
                        navigation.navigate('PatientDetails', {
                          patient,
                          appointment,
                        });
                      }}>
                      <MaterialIcon
                        name={'chevron-right'}
                        size={32}
                        color={'#a4a2a2'}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null;
              }
              return null;
            })
          )}
          <NewItem
            text={`${Local('doctor.patients_list.add_patient')}`}
            onPress={() => setVisible(true)}
          />
        </ScrollView>
      </View>
    </>
  );
}

export default PatientList;
