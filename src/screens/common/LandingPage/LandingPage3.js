import React, { useState, useEffect, useMemo, useCallback } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioGroup, { Radio } from 'react-native-radio-input';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Modal,
  StatusBar,
  RefreshControl,
  // TouchableHighlight,
  StyleSheet,
  Platform,
  UIManager,
  Easing,
  Animated,
  CheckBox,
  Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import { BlurView } from '@react-native-community/blur';
import {
  // BottomSheet,
  ListItem,
} from 'react-native-elements';
import { BottomSheet } from 'react-native-btr';
import axios from 'axios';

import BasicCard from '../../../components/atoms/BasicCard/BasicCard';
import { ListingWithThumbnailLoader } from '../../../components/atoms/Loader/Loader';
import NewToggleButton from '../../../components/molecules/ToggleButton/NewToggleButton';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import SearchBarLoc from '../../../components/molecules/SearchBarSolid/locSearch';
import AvailDoctorContainerV2 from '../../../components/molecules/AvailDoctorContainer/AvailDoctorContainerV2';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import FluidAnimation from '../../../components/molecules/Animation/FluidAnimation';
import BlurModal from '../../../components/molecules/Modal/BlurModal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DoctorCardCompo from '../../../components/atoms2/doctor-card/doctor-card';
import ButtonCompo from '../../../components/atoms2/button/button';
import LinearGradient from 'react-native-linear-gradient';

const EvilIconsIcon = ({ size, name, color = '#7B7A79' }) => (
  <EvilIcons size={size} name={name} color={color} />
);
import {
  // fetchDoctorLite,
  // fetchMoreDoctorLite,
  searchDoctors,
  // fetchSuperDoc,
  fetchFilteredSuperDoc,
  fetchFilteredDoctors,
  // GetAllDoctors,
} from '../../../reduxV2/action/DoctorToPatientAction';
import { getSpecialty } from '../../../reduxV2/action/DoctorAction';

import {
  NEW_PRIMARY_COLOR,
  // NEW_HEADER_TEXT,
  // SEARCH_PLACEHOLDER_COLOR,
  // PRIMARY_BACKGROUND,
  // INPUT_PLACEHOLDER,
  SECONDARY_BACKGROUND,
  NEW_PRIMARY_BACKGROUND,
  PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import { Colors } from '../../../styles/colorsV2';
import Slider from '@react-native-community/slider';

import {
  Local,
  // setLocale
} from '../../../i18n';

import { Host } from '../../../utils/connection';
// import DOMParser from 'react-native-html-parser';
// import Svg, {G, Path} from 'react-native-svg';
import RadioGroupV2 from '../../../components/molecules/RadioGroup/RadioGroupV2';
import BasicCardN from '../../../components/atoms/BasicCard/BasicCardN';
import ActionSheetPatientCompo from '../../../components/atoms2/action-sheet-patient/actionSheetPatient';
import ConsulnowCardCompo from '../../../components/atoms2/consult-now-card/consult-now-card';
// import { parse } from 'react-native-svg';

//TODO import only necessary component in all screens which are first screen of any navigator
//TODO call APIs only if AppState is focused

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function LandingPage({ navigation }) {
  const tempTestArrayOne = [
    {
      patient: 'Veronica Stevens',
      reason: 'General Checkup',
      time: '10:00 am',
      lefttime: 'in 30 mins',
    },
    {
      patient: 'Veronica Stevens',
      reason: 'General Checkup',
      time: '10:00 am',
      lefttime: 'in 30 mins',
    },
    {
      patient: 'Veronica Stevens',
      reason: 'General Checkup',
      time: '10:00 am',
      lefttime: 'in 30 mins',
    },
    {
      patient: 'Veronica Stevens',
      reason: 'General Checkup',
      time: '10:00 am',
      lefttime: 'in 30 mins',
    },
  ];

  const dispatch = useDispatch();
  const {
    doctors,
    loading,
    moreDoctorLoading,
    searchDoctorsLoading,
    searchedDoctors,
    superDocsLoading,
    superDocs,
  } = useSelector((state) => state.DoctorToPatientReducer);

  return (
    <>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Image
              source={require('../../../assets/icons/hamburger_menu.png')}
              style={{
                width: 26,
                height: 26,
                transform: [{ rotateY: '180deg' }],
              }}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ marginLeft: 8 }}>
              <EvilIconsIcon name="bell" size={38} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 8 }}>
              <Image
                source={require('../../../assets/images/doctorx.png')}
                style={{ width: 50, height: 50, borderRadius: 100 }}
              />
              <Text style={{ fontFamily: 'Montserrat-Regular' }}>
                Hi, Karan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}>
          <View>
            <NextAppointmentCard />
          </View>
          <View>
            <WaitingRoomCard />
          </View>
          <View>
            <AppointmentsList
              icon={require('../../../assets2/logo/time-icon.png')}
              title="Upcoming Appointments"
              tempTestArrayOne={tempTestArrayOne}
            />
          </View>
          <View>
            <AppointmentsList
              icon={require('../../../assets2/logo/react-icon.png')}
              title="Recent Patients"
              tempTestArrayOne={tempTestArrayOne}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default LandingPage;

const AppointmentsList = ({ tempTestArrayOne, title, icon }) => {
  return (
    <View
      style={{
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 15,
        backgroundColor: '#fff',
        elevation: 7,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 14,
          marginHorizontal: 18,
          marginBottom: 20,
        }}>
        <Image source={icon} />
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            marginLeft: 7,
          }}>
          {title}
        </Text>
      </View>
      <View>
        <FlatList
          data={tempTestArrayOne}
          keyExtractor={(e) => e.toString()}
          renderItem={({ item, index }) => {
            return <AppointmentListItem item={item} />;
          }}
        />
      </View>
      <Text
        style={{
          marginVertical: 20,
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 16,
          textAlign: 'center',
          color: '#077EE9',
        }}>
        View All
      </Text>
    </View>
  );
};

const AppointmentListItem = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#D4D4D4',
        paddingBottom: 12,
      }}>
      <View style={{}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 5,
              height: 5,
              backgroundColor: '#077EE9',
              borderRadius: 100,
              marginRight: 8,
            }}
          />
          <Text>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 14,
              }}>
              {item.patient} -{' '}
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
              }}>
              {item.reason}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
            marginTop: 6,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
            }}>
            {item.time}
          </Text>
          <View
            style={{
              width: 3,
              backgroundColor: '#077EE9',
              height: 13,
              borderRadius: 12,
              marginHorizontal: 10,
            }}
          />
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color: '#7B7A79',
            }}>
            {item.lefttime}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '20%',
          alignItems: 'center',
        }}>
        <EvilIconsIcon name="chevron-right" size={30} color="#EA1A65" />
      </View>
    </View>
  );
};

const NextAppointmentCard = () => {
  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#1174EE', '#023778']}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 20,
          elevation: 7,
          marginTop: 26,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <EvilIconsIcon name="calendar" color="#fff" size={25} />
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 20,
              color: '#fff',
              marginLeft: 3,
            }}>
            Next Appointment
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <Text
            style={{
              width: '25%',
              fontFamily: 'Montserrat-Regular',
              color: '#fff',
            }}>
            Name
          </Text>
          <Text
            style={{
              width: '75%',
              fontFamily: 'Montserrat-SemiBold',
              color: '#fff',
            }}>
            : Sameer Kotak
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <Text
            style={{
              width: '25%',
              fontFamily: 'Montserrat-Regular',
              color: '#fff',
            }}>
            Concern
          </Text>
          <Text
            style={{
              width: '75%',
              fontFamily: 'Montserrat-SemiBold',
              color: '#fff',
            }}>
            : Acne
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: '#fff',
            }}>
            28 Dec 21, 10:30 AM
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: '#023778',
              backgroundColor: '#fff',
              paddingVertical: 15,
              paddingHorizontal: 21,
              borderRadius: 100,
            }}>
            View Details
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};
const WaitingRoomCard = () => {
  const imagesArray = [
    require('../../../assets/images/doc.jpg'),
    require('../../../assets/images/doc.jpg'),
    require('../../../assets/images/doc.jpg'),
    require('../../../assets/images/doc.jpg'),
    require('../../../assets/images/doc.jpg'),
  ];

  return (
    <View>
      <View
        style={{
          marginVertical: 30,
          marginHorizontal: 20,
          elevation: 7,
          paddingVertical: 15,
          paddingHorizontal: 58,
          backgroundColor: '#fff',
          borderRadius: 20,
          position: 'relative',
        }}>
        <View>
          <ScrollView style={{}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 20,
              }}>
              {imagesArray.map((val, index) => {
                return (
                  <Image
                    source={val}
                    style={{
                      width:
                        index == 2
                          ? 70
                          : index < 2
                          ? (index + 1) * 20
                          : 40 - (index - 3) * 20,
                      height:
                        index == 2
                          ? 70
                          : index < 2
                          ? (index + 1) * 20
                          : 40 - (index - 3) * 20,
                      zIndex:
                        index > 2 ? imagesArray.length - index - 1 : index,
                      borderRadius: 100,
                      borderWidth: 1.4,
                      borderColor: '#0D84E2',
                      margin: -3,
                      transform: [{ scale: 1.2 }],
                    }}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 18,
            textAlign: 'center',
          }}>
          Waiting Room
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            textAlign: 'center',
            fontSize: 28,
          }}>
          04
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            textAlign: 'center',
            fontSize: 14,
            color: '#666666',
            paddingVertical: 12,
          }}>
          Patients Waiting to be attended
        </Text>
        <ButtonCompo
          title="See Patients"
          textStyle={{
            fontSize: 17,
          }}
          pressHandler={() => {}}
        />
      </View>
    </View>
  );
};
