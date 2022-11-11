import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Animated,
  Text,
  TouchableWithoutFeedback,
  Easing,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import BlurLoader from '../../../components/molecules/Modal/BlurLoadingOverlay';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import { NEW_PRIMARY_COLOR } from '../../../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Chatbox from '../../../assets/svg/chatbox.svg';
import SignleField from '../../../components/molecules/Modal/SingleField';
import {
  FONT_SIZE_22,
  FONT_SIZE_20,
  FONT_SIZE_19,
  FONT_SIZE_18,
} from '../../../styles/typography';
import ExpandableList from '../../../components/molecules/ExpandableList/ExpandableList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveUserAccount,
  GetPatientInfo,
} from '../../../reduxV2/action/PatientAction';
import { Colors } from '../../../styles/colorsV2';
import { Local } from '../../../i18n';

function PatientDetails({ navigation, route }) {
  const { theme } = useSelector((state) => state.AuthReducer);
  const { patient: patientRouteInfo, appointment } = route.params;
  const { isPatientAccountReducerLoading } = useState(
    useSelector((state) => state.PatientReducer),
  );
  const { userData } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const HeightExpand = useRef(new Animated.Value(0)).current;
  const [expandedHeight, setExpandedHeight] = useState(0);
  const [addReasonModel, setAddReasonModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addReason, setAddReason] = useState('');
  const [showContent, setShowContent] = useState({
    symptoms: false,
    medicalHistory: false,
    assessmentPlan: false,
  });

  const onExpand = (name) => {
    setShowContent({
      ...showContent,
      [`${name}`]: !showContent[`${name}`],
    });
    Animated.timing(HeightExpand, {
      delay: 200,
      easing: Easing.bounce,
      duration: 1000,
      useNativeDriver: false,
      toValue: showContent[`${name}`] ? 0 : 1,
    }).start();
  };

  useEffect(() => {
    const backAction = () => {
      console.log('dsklfjdsklfjdsffgdfgfgfgfgklfjdf');
      // navigation.navigate("PatientsList");
      navigation.goBack();
      // setState(doctors);
      // setActive("allDoctors")

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // function handleBackButtonClick() {
  //   navigation.goBack();
  //   return true;
  // }

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
  //   };
  // }, []);

  const onLayout = (e) => {
    setExpandedHeight(e.nativeEvent.layout.height);
  };
  const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcon);
  return (
    <>
      <SignleField
        visible={addReasonModel}
        onCancel={() => setAddReasonModel(false)}
        headingText="Add Reason"
        onUpdate={(temp) => {
          setAddReasonModel(false);
        }}
      />
      {/* {isPatientAccountReducerLoading && <BlurLoader visible={isPatientAccountReducerLoading} >
        <ActivityIndicator color={NEW_PRIMARY_COLOR} size="large" />
      </BlurLoader>} */}
      {loading && (
        <BlurLoader visible={isPatientAccountReducerLoading}>
          <ActivityIndicator color={NEW_PRIMARY_COLOR} size="large" />
        </BlurLoader>
      )}
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.secondary_background[theme],
        }}>
        <TopNavBar
          navigation={navigation}
          headerText={'Patients Details'}></TopNavBar>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: '4%',
          }}>
          <View
            style={{
              paddingVertical: '5%',
              paddingHorizontal: '6%',
              elevation: 2,
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'center',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'center',
                  marginBottom: '1%',
                }}>
                <Text
                  style={{
                    fontSize: FONT_SIZE_22,
                    color: Colors.primary_text_color[theme],
                    fontWeight: 'bold',
                    letterSpacing: 0.5,
                  }}>
                  {`${patientRouteInfo.firstName} ${patientRouteInfo.lastName}`}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'center',
                }}>
                {patientRouteInfo.age && (
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        fontSize: FONT_SIZE_20,
                        color: Colors.primary_text_color[theme],
                        marginRight: '8%',
                      }}>
                      {patientRouteInfo.age + ' yrs'}
                    </Text>
                    <View
                      style={{
                        height: 7,
                        width: 7,
                        borderRadius: 15,
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        backgroundColor: '#077EE9',
                      }}></View>
                  </View>
                )}
                {patientRouteInfo.sex && (
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        fontSize: FONT_SIZE_20,
                        color: Colors.primary_text_color[theme],
                        marginRight: '8%',
                      }}>
                      {patientRouteInfo.sex ? patientRouteInfo.sex : '-'}
                    </Text>
                    <View
                      style={{
                        height: 7,
                        width: 7,
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        borderRadius: 15,
                        backgroundColor: '#077EE9',
                      }}></View>
                  </View>
                )}
                {patientRouteInfo.weight.value && (
                  <Text
                    style={{
                      fontSize: FONT_SIZE_20,
                      color: Colors.primary_text_color[theme],
                    }}>
                    {patientRouteInfo.weight.value} kg
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '2%',
              }}>
              {appointment && appointment.reasonForVisit && (
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      letterSpacing: 0.4,
                      color: Colors.primary_text_color[theme],
                    }}>
                    {Local('doctor.patient_details.reason_for_visit')}:
                    <Text style={{ color: '#EA1A65' }}>
                      {' '}
                      {appointment.reasonForVisit}
                    </Text>
                  </Text>
                </View>
              )}
              {/* <Chatbox /> */}
            </View>
          </View>
          {/* <ExpandableList
            style={{
              paddingVertical: '5%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.08)',
              borderRadius: 10,
            }}
            title={'Symptoms'}>

          </ExpandableList> */}

          {/*
          <ExpandableList
            style={{
              paddingVertical: '5%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.08)',
              borderRadius: 10,
            }}
            title={'Medical History'}>
              
             <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: '4%',
                paddingHorizontal: '5%',
                borderBottomWidth: 1.5,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>Vitals</Text>
              <MaterialIcon
                name={'chevron-right'}
                size={28}
                color={'#7B7A79'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: '4%',
                paddingHorizontal: '5%',
                borderBottomWidth: 1.5,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>Medication</Text>
              <MaterialIcon
                name={'chevron-right'}
                size={28}
                color={'#7B7A79'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: '4%',
                paddingHorizontal: '5%',
                borderBottomWidth: 1.5,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>Reports</Text>
              <MaterialIcon
                name={'chevron-right'}
                size={28}
                color={'#7B7A79'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: '4%',
                paddingHorizontal: '5%',
                borderBottomWidth: 1.5,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>Surgeries</Text>
              <MaterialIcon
                name={'chevron-right'}
                size={28}
                color={'#7B7A79'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: '4%',
                paddingHorizontal: '5%',
                borderBottomWidth: 1.5,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>Allergies</Text>
              <MaterialIcon
                name={'chevron-right'}
                size={28}
                color={'#7B7A79'}
              />
            </View>
           
          </ExpandableList>
            */}
          {/* <ExpandableList
            style={{
              paddingVertical: '5%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.08)',
              borderRadius: 10,
            }}
            title={'Assessment & Plan'}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: '4%',
                paddingHorizontal: '5%',
                borderBottomWidth: 1.5,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>Assessment</Text>
              <MaterialIcon name={'plus'} size={24} color={'#7B7A79'} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: '4%',
                paddingHorizontal: '5%',
                borderBottomWidth: 1.5,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>Add Tests</Text>
              <MaterialIcon name={'plus'} size={24} color={'#7B7A79'} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: '4%',
                paddingHorizontal: '5%',
                borderBottomWidth: 1.5,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}>
              <Text>Add Medications</Text>
              <MaterialIcon name={'plus'} size={24} color={'#7B7A79'} />
            </View>
          </ExpandableList>
          <ExpandableList
            style={{
              paddingVertical: '5%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.08)',
              borderRadius: 10,
            }}
            title={'test'}>
            <Text>hello</Text>
          </ExpandableList> */}
          <View
            style={{
              backgroundColor: Colors.secondary_background[theme],
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingHorizontal: '8%',
              paddingVertical: '4%',
              borderBottomWidth: 1.5,
              borderBottomColor: 'rgba(0,0,0,0.1)',
            }}>
            <Text
              style={{
                fontSize: FONT_SIZE_19,
                color: Colors.primary_text_color[theme],
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {Local('doctor.patient_details.appointments')}
            </Text>
            <TouchableOpacity
              style={{ marginLeft: 'auto' }}
              onPress={() => {
                setLoading(true);
                dispatch(
                  GetPatientInfo(patientRouteInfo._id, userData._id, () =>
                    navigation.navigate('PatientAppointments', { back: true }),
                  ),
                );
              }}>
              <MaterialIcons
                size={30}
                color={'#43A2A2'}
                name="chevron-right"></MaterialIcons>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: Colors.secondary_background[theme],
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingHorizontal: '8%',
              paddingVertical: '4%',
              borderBottomWidth: 1.5,
              borderBottomColor: 'rgba(0,0,0,0.1)',
            }}>
            <Text
              style={{
                fontSize: FONT_SIZE_19,
                color: Colors.primary_text_color[theme],
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {Local('doctor.patient_details.medical_history')}
            </Text>
            <TouchableOpacity
              style={{ marginLeft: 'auto' }}
              onPress={() => {
                setLoading(true);
                dispatch(
                  GetPatientInfo(patientRouteInfo._id, true, () =>
                    navigation.navigate('MedicalHistory', { back: true }),
                  ),
                );
              }}>
              <MaterialIcons
                size={30}
                color={'#43A2A2'}
                name="chevron-right"></MaterialIcons>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '5%',
              backgroundColor: '#077EE9',
              width: '85%',
              alignSelf: 'center',
              paddingVertical: '3%',
              borderRadius: 15,
              elevation: 3,
            }}
            onPress={() => {
              setAddReasonModel(true);
            }}>
            <MaterialIcon name={'plus'} size={30} color={NEW_PRIMARY_COLOR} />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: FONT_SIZE_18,
                marginLeft: '2%',
              }}>
              Add Reason
            </Text>
          </TouchableOpacity> */}
        </ScrollView>
      </View>
    </>
  );
}

export default PatientDetails;

// const ExpandableList = ({children, title}) => {
//   const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcon);
//   const HeightExpand = useRef(new Animated.Value(0)).current;
//   const [expandedHeight, setExpandedHeight] = useState(0);
//   const onLayout = (e) => {
//     setExpandedHeight(e.nativeEvent.layout.height);
//   };
//   const [showContent, setShowContent] = useState(false);
//   const onToggleExpand = () => {
//     setShowContent(!showContent);
//     Animated.timing(HeightExpand, {
//       delay: 200,
//       easing: Easing.bounce,
//       duration: 1000,
//       useNativeDriver: false,
//       toValue: showContent ? 0 : 1,
//     }).start();
//   };
//   return (
//     <View
//       style={{
//         backgroundColor: '#fff',
//         elevation: 4,
//         paddingVertical: '5%',
//         paddingHorizontal: '8%',
//         marginBottom: 5,
//       }}>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}>
//         <Text style={{fontSize: FONT_SIZE_19, fontWeight: 'bold'}}>
//           {title}
//         </Text>
//         <TouchableWithoutFeedback onPress={onToggleExpand}>
//           <AnimatedIcon
//             style={{
//               transform: [
//                 {
//                   rotate: HeightExpand.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: ['0deg', showContent ? '-180deg' : '0deg'],
//                   }),
//                 },
//               ],
//             }}
//             name={'chevron-down'}
//             size={30}
//             color={'#43A2A2'}
//           />
//         </TouchableWithoutFeedback>
//       </View>

//       {showContent && (
//         <Animated.View
//           style={{
//             height: HeightExpand.interpolate({
//               inputRange: [0, 1],
//               outputRange: [0, expandedHeight],
//             }),
//             marginTop: HeightExpand.interpolate({
//               inputRange: [0, 1],
//               outputRange: [0, 30],
//             }),
//             overflow: 'hidden',
//           }}>
//           <View
//             onLayout={onLayout}
//             style={{
//               paddingVertical: '5%',
//               borderWidth: 1,
//               borderColor: 'rgba(0,0,0,0.08)',
//             }}>
//             {children}
//           </View>
//         </Animated.View>
//       )}
//     </View>
//   );
// };
