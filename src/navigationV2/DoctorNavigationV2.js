/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import React, { useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
// import Chats from '../screens/common/Chats/Chats';
import messaging from '@react-native-firebase/messaging';
import CustomDoctorDrawer from '../components/organisms/drawer/custom/CustomDoctorDrawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';
import CategoryQuestion from '../screens/doctor/AddQuestionnaire2/CategoryQuestions/CategoryQuestions';
import DocQuestionnaire from '../screens/doctor/AddQuestionnaire2/DocQuestionnaire';
import AddQuestionnaire from '../screens/doctor/AddQuestionnaire2/AddQuestionnaire';
import Clincs from '../screens/doctor/Clinics/Clincs';
import Availiblity from '../screens/doctor/Availibility/Availiblity';
import PatientDetails from '../screens/doctor/PatientDetails/PatientDetails';
import Skins from '../screens/doctor/Skins/Skins';
import Settings2 from '../screens/doctor/Settings/Settings2';
import Appointments from '../screens/doctor/Appointments/Appointments';
import AddPrescription from '../screens/doctor/AddPrescription/AddPrescription';
////////////
import Dashboard from '../screens/doctor/Dashboard/Dashboard3';
// import Dashboard from '../screens/doctor/Dashboard/Dashboard3';

////////////////////////////////////////////
//import Onboarding from '../screens/doctor/Onboarding/Onboarding';
//import ProfileSetup from '../screens/doctor/Onboarding/profile';
import ProfileSetup from '../screens/doctor/Submittingdetails/SubmittingDocDetails2';
import LandingPageScreen from '../screens/common/LandingPage/LandingPage3';
/////////////////////////////////////////////

import Patients from '../screens/doctor/Patients/Patients';
import MyStaff from '../screens/doctor/MyStaff/MyStaff';
import CancelationPolicy from '../screens/common/Policy/CancellationPolicy';
import { useSelector } from 'react-redux';
import PatientAppointments from '../screens/patient/appointments/Appointments';
// import Conversations from '../screens/common/Chats/Conversations';
// import Chats from '../screens/common/Chats/Chats';
import WaitingRoom from '../screens/doctor/WaitingRoom/WaitingRoom';
const { width: screenWidth } = Dimensions.get('screen');

const BottomTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
// doctor
import { Host } from '../utils/connection';
// import Testing from '../screens/common/Chats/Testing';

//import VideoCallScreen from '../screens/common/Chats/VideoCallScreen';
import VideoCallScreen from '../screens/common/Chats/VideoCallScreen2';
import AddClinic from '../screens/doctor/Clinics/AddClinic';
import PaymentSetup from '../screens/doctor/PaymentSetup/PaymentSetup';
import Teams from '../screens/doctor/MyTeams/Teams';
import TeamMembers from '../screens/doctor/MyTeams/SingleTeam';
import InviteDoctors from '../screens/doctor/MyTeams/InviteDocs';
import MedicalHistory from '../screens/examples/MedicalHistory/MedicalHistory';
import Chatting from './ChatNavigation';
import { socket } from '../utils/socket';
import MedicalLogs from '../screens/examples/MedicalHistory/Logs';
import ConfirmAppointment from '../components/molecules/ConfirmAppointment/ConfirmAppointment';
import { Colors } from '../styles/colorsV2';
// import {Local} from '../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Template from '../screens/doctor/Template/Template';
import Invoice from '../screens/common/Invoice';
import PushNotification from 'react-native-push-notification';
import NewPrescription from './../screens/doctor/NewPrescription/NewPrescription';
import AccountSetting from '../screens/doctor/Settings/AccountSetting';
import SelectLanguge from '../screens/doctor/Settings/SelectLanguge';
import { Local } from '../i18n';

function DoctorLanding() {
  const { theme } = useSelector((state) => state.AuthReducer);
  return (
    <BottomTabs.Navigator
      initialRouteName={'Dashboard'}
      tabBarOptions={{
        showLabel: false,

        style: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 60,
          borderTopWidth: 0,
          marginTop: -40,

          shadowColor: '#171717',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 4,

          backgroundColor: 'white',
          ...styles.shadow,
        },
      }}>
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/icons/Home.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: focused ? '#088DFF' : '#BBBBBB',
                }}
              />
              <Text style={{ fontSize: 10, marginTop: 5 }}>{`${Local(
                'doctor.V2.bottom_compo.title.home',
              )}`}</Text>
            </View>
          ),
        }}
        name={'Dashboard'}
        component={Dashboard}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/icons/consult.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: focused ? '#088DFF' : '#BBBBBB',
                }}
              />

              <Text style={{ fontSize: 10, marginTop: 5 }}>{`${Local(
                'doctor.V2.your_family.modal.Appointment',
              )}`}</Text>
            </View>
          ),
        }}
        name={'Appointments'}
        component={Appointments}
      />
      {/* <BottomTabs.Screen name={'Chat'} component={} /> */}
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/icons/appointment.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: focused ? '#088DFF' : '#BBBBBB',
                }}
              />
              <Text style={{ fontSize: 10, marginTop: 5 }}>{`${Local(
                'doctor.V2.bottom_compo.title.Contact',
              )}`}</Text>
            </View>
          ),
        }}
        name={'PatientsList'}
        component={Patients}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/icons/chat.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: focused ? '#088DFF' : '#BBBBBB',
                }}
              />
              <Text style={{ fontSize: 10, marginTop: 5 }}>{`${Local(
                'doctor.V2.bottom_compo.title.chats',
              )}`}</Text>
            </View>
          ),
        }}
        name={'Chats'}
        component={Chatting}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="clock"
                  color={focused ? '#088DFF' : '#BBBBBB'}
                  size={25}
                />
                <Text style={{ fontSize: 10, marginTop: 5 }}>{`${Local(
                  'doctor.V2.Doctor_screen.Home.waiting_room_card.Waiting_room',
                )}`}</Text>
              </View>
            );
          },
          unmountOnBlur: true,
        }}
        name={'WaitingRoom'}
        component={WaitingRoom}
      />
    </BottomTabs.Navigator>

    // <BottomTabs.Navigator
    //   initialRouteName={'Dashboard'}
    //   tabBarOptions={{
    //     showLabel: false,
    //     activeTintColor: '#000',
    //     inactiveTintColor: 'rgba(255,255,255,0.4)',
    //     style: {
    //       backgroundColor: Colors.bottom_bg[theme],
    //       borderTopLeftRadius: 10,
    //       borderTopRightRadius: 10,
    //       position: 'absolute',
    //     },
    //   }}>
    //   <BottomTabs.Screen
    //     options={{
    //       tabBarIcon: ({ focused }) => {
    //         return (
    //           <FontAwesome
    //             name="home"
    //              color={focused ? '#088DFF' : '#BBBBBB'}
    //             size={24}
    //           />
    //         );
    //       },
    //     }}
    //     name={'Dashboard'}
    //     component={Dashboard}
    //   />
    //   <BottomTabs.Screen
    //     options={{
    //       tabBarIcon: ({ focused }) => {
    //         return (
    //           <MaterialCommunityIcons
    //             name="calendar-account"
    //              color={focused ? '#088DFF' : '#BBBBBB'}
    //             size={24}
    //           />
    //         );
    //       },
    //     }}
    //     name={'Appointments'}
    //     component={Appointments}
    //   />
    //   <BottomTabs.Screen
    //     options={{
    //       tabBarIcon: ({ focused }) => {
    //         return (
    //           <MaterialIcons
    //             name="person"
    //              color={focused ? '#088DFF' : '#BBBBBB'}
    //             size={24}
    //           />
    //         );
    //       },
    //     }}
    //     name={'PatientsList'}
    //     component={Patients}
    //   />
    //   <BottomTabs.Screen
    //     options={{
    //       tabBarIcon: ({ focused }) => {
    //         return (
    //           <MaterialCommunityIcons
    //             name="chat"
    //              color={focused ? '#088DFF' : '#BBBBBB'}
    //             size={24}
    //           />
    //         );
    //       },
    //       unmountOnBlur: true,
    //       tabBarVisible: false,
    //     }}
    //     name={'Chats'}
    //     component={Chatting}
    //   />
    //   {/* <BottomTabs.Screen
    //     options={{
    //       tabBarIcon: ({focused}) => {
    //         return (
    //           <MaterialCommunityIcons
    //             name="chat"
    //             color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
    //             size={24}
    //           />
    //         );
    //       },
    //       tabBarVisible: false,
    //     }}
    //     name={'testing'}
    //     component={Testing}
    //   /> */}
    // {/* <BottomTabs.Screen
    //   options={{
    //     tabBarIcon: ({ focused }) => {
    //       return (
    //         <MaterialCommunityIcons
    //           name="clock"
    //            color={focused ? '#088DFF' : '#BBBBBB'}
    //           size={24}
    //         />
    //       );
    //     },
    //     unmountOnBlur: true,
    //   }}
    //   name={'WaitingRoom'}
    //   component={WaitingRoom}
    // /> */}
    // </BottomTabs.Navigator>
  );
}

const QuestionnaireStackFun = () => {
  return (
    <Stack.Navigator
      initialRouteName="Questionnaire"
      mode="card"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen name={'Questionnaire'} component={DocQuestionnaire} />
      <Stack.Screen name={'CategoryQuestions'} component={CategoryQuestion} />
    </Stack.Navigator>
  );
};

function DoctorDrawer({ navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName={'Home'}
      drawerPosition={'left'}
      drawerType={'slide'}
      backBehavior={'history'}
      drawerContent={(props) => <CustomDoctorDrawer {...props} />}
      drawerStyle={{
        width: '80%',
        drawerBackgroundColor: 'rgba(255,255,255,.9)',
      }}>
      <Drawer.Screen name={'Home'} component={DoctorLanding} />
      <Drawer.Screen name={'Questionnaire'} component={QuestionnaireStackFun} />
      <Drawer.Screen name={'LandingPageScreen'} component={LandingPageScreen} />
      <Drawer.Screen name={'Template'} component={Template} />
      <Drawer.Screen name={'CancelationPolicy'} component={CancelationPolicy} />
      <Drawer.Screen name={'MedicalHistory'} component={MedicalHistory} />
      <Drawer.Screen name={'Clincs'} component={Clincs} />
      <Drawer.Screen name={'Availiblity'} component={Availiblity} />
      <Drawer.Screen name={'MyStaff'} component={MyStaff} />
      <Drawer.Screen name={'Payment'} component={PaymentSetup} />
      <Drawer.Screen name={'Teams'} component={Teams} />
      <Drawer.Screen name={'TeamMembers'} component={TeamMembers} />
      <Drawer.Screen name={'MedicalLogs'} component={MedicalLogs} />

      <Drawer.Screen name={'invoice'} component={Invoice} />
      {/* <Stack.Screen name={'loginScreen'} component={LoginV2} /> */}
      <Drawer.Screen
        name={'PatientAppointments'}
        component={PatientAppointments}
      />
      <Drawer.Screen name={'AddPrescription'} component={NewPrescription} />
      <Drawer.Screen name={'InviteDoctors'} component={InviteDoctors} />
      <Drawer.Screen name={'PatientsList'} component={Patients} />
      <Drawer.Screen name={'PatientDetails'} component={PatientDetails} />
      <Drawer.Screen
        name={'ConfirmAppointment'}
        component={ConfirmAppointment}
      />
      <Drawer.Screen name={'videoCall'} component={VideoCallScreen} />
      <Drawer.Screen name={'Skins'} component={Skins} />
      <Drawer.Screen name={'Settings'} component={Settings2} />
      <Drawer.Screen name={'AddClinic'} component={AddClinic} />
      <Drawer.Screen name={'Boarding'} component={ProfileSetup} />
      <Drawer.Screen name={'onboarding'} component={ProfileSetup} />
    </Drawer.Navigator>
  );
}

function DoctorNavigationV2({ navigation }) {
  const Socket = useRef(socket).current;
  const {
    doctorProfile,
    //  forNow
  } = useSelector((state) => state.DoctorReducer);

  const { userData, isDoctor } = useSelector((state) => state.AuthReducer);
  // console.log("------------------------>>>>>> : ", doctorProfile)
  // push notificationspi
  useEffect(function firebaseMessageHandling() {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log({ remoteMessage }, 'dfjsdlkfjsdklfjsdklfj');

      PushNotification.localNotification({
        channelId: '123456789',
        title: remoteMessage?.data?.title,
        message: remoteMessage?.data?.description,
      });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log('useeffect for socket ', Socket.connected);
    if (Socket.connected) {
      Socket.emit('set_online', {
        id: userData._id,
        type: isDoctor ? 'doctor' : 'patient',
      });
    }
    Socket.on('connect', async function (prop) {
      console.log('connected with ', prop);
      console.log('socket it on connected ', Socket.id);
      Socket.emit('set_online', {
        id: userData._id,
        type: isDoctor ? 'doctor' : 'patient',
      });
      try {
        const value = await AsyncStorage.getItem('@sockets');
        console.log('async storage value ', value);

        // if (value !== null) {
        //   await AsyncStorage.removeItem('@sockets');
        // }
        if (value !== null) {
          const newValue = [Socket.id].concat(JSON.parse(value));
          await AsyncStorage.setItem('@sockets', JSON.stringify(newValue));
        } else {
          const newValue = [Socket.id];
          await AsyncStorage.setItem('@sockets', JSON.stringify(newValue));
        }
      } catch (e) {
        // error reading value
        console.log('error reading value');
      }
    });
    Socket.on('reconnect', async function (number) {
      console.log('reconnected ', number, ' th time');
      console.log('socket id ,', Socket.id);
      try {
        const value = await AsyncStorage.getItem('@sockets');
        console.log('async storage value ', value);
        if (value !== null) {
          const val = JSON.parse(value);
          const newValue = val.filter((soc) => soc != Socket.id);
          console.log('async storage new value ', newValue);
          if (newValue.length > 0) {
            Socket.emit('remove_these_sockets', {
              socs: newValue,
              id: userData._id,
              type: isDoctor ? 'doctor' : 'patient',
            });
          }
        }
      } catch (e) {
        // error reading value
        console.log('error reading value');
      }
    });
    Socket.on('disconnect', function (reason) {
      try {
        console.log('disconnected ', reason);
      } catch (e) {
        console.log('error ', e);
      }
    });
    Socket.on('delete_those_local_sockets', async function () {
      try {
        console.log('delete_those_local_sockets occured');
        const value = await AsyncStorage.getItem('@sockets');
        console.log('async storage value ', value);
        if (value !== null) {
          await AsyncStorage.removeItem('@sockets');
        }
        const newV = await AsyncStorage.getItem('@sockets');
        console.log('after deletion ', newV);
      } catch (e) {
        console.log('error deleting ', e);
      }
    });
    return () => {
      Socket.off('connect');
      Socket.off('reconnect');
      Socket.off('disconnect');
      Socket.off('delete_those_local_sockets');
    };
  }, [Socket, isDoctor, userData._id]);

  useEffect(() => {
    console.log('====================================hellooo');

    function onCallMade({ User, type, room, callType }) {
      console.log('call-made in socket');
      navigation.navigate('videoCall', {
        room,
        mode: 'thatSide',
        User,
        type,
        callType,
      });
    }
    Socket.on('call-made', onCallMade);

    return () => {
      Socket.off('call-made', onCallMade);
    };
  }, [Socket, navigation]);

  useEffect(() => {
    const saveTokenToDatabase = async (token) => {
      fetch(`${Host}/doctors/setDeviceToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          id: userData.id,
        }),
      })
        .then((res) => {
          console.log('res', res);
        })
        .catch((e) => {
          console.log('errpr', e);
        });
    };
    try {
      messaging()
        .getToken()
        .then((token) => {
          console.log(token, 'TOKENLDJFLKDFJLDKSFJ');
          return saveTokenToDatabase(token);
        })
        .catch((e) => {
          console.log(e, 'eeeeeeeeeeeeee');
          // console.error(e);
        });
    } catch (E) {
      console.log(E, 'EEEEEEEEEEEEEEEEEEE');
      // console.error(E);
    }

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      saveTokenToDatabase(token);
    });
  }, [userData.id]);

  // console.log({doctorProfile})

  return (
    <Stack.Navigator headerMode={'none'}>
      {
        // !forNow &&
        doctorProfile?.onBoarding == false && (
          <>
            <Stack.Screen name={'onboarding'}>
              {(props) => <ProfileSetup {...props} />}
            </Stack.Screen>
            <Stack.Screen name={'videoCall'} component={VideoCallScreen} />
            <Stack.Screen
              name={'CancelationPolicy'}
              component={CancelationPolicy}
            />
          </>
        )
      }
      {
        //forNow ||
        (doctorProfile?.onBoarding == undefined ||
          doctorProfile?.onBoarding) && (
          <>
            <Stack.Screen name={'DoctorMain'} component={DoctorDrawer} />
            <Stack.Screen name={'videoCall'} component={VideoCallScreen} />
            <Stack.Screen name={'AccountSetting'} component={AccountSetting} />
            <Stack.Screen name={'selectLanguage'} component={SelectLanguge} />
            <Stack.Screen
              name={'AddPrescription'}
              component={NewPrescription}
            />
          </>
        )
      }
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
});
export default DoctorNavigationV2;
