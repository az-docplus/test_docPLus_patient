// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import {
//   FlatList,
//   Image,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Animated,
//   Easing,
//   Keyboard,
// } from 'react-native';
// import { Button } from 'react-native-paper';
// // import { TouchableOpacity } from 'react-native-gesture-handler';
// import { Card, TextInput } from 'react-native-paper';
// import AwesomeButton from 'react-native-really-awesome-button';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { useDispatch, useSelector } from 'react-redux';
// import InsetShadow from 'react-native-inset-shadow';

// import { Local, setLocale } from '../../i18n';
// import {
//   AddFevDoc,
//   ApproveAppointment,
//   CreateAppointment,
//   GetAppointments,
//   GetPatientInfo,
//   RemoveAppointment,
//   RemoveFevDoc,
// } from '../../reduxV2/action/PatientAction';
// import PicturelessAvatar from '../../components/atoms/PicturelessAvatar/PicturelessAvatar';
// import CustomTextComponent from '../../components/CustomTextComponent';
// import DoctorHeader from '../../components/DoctorHeader';
// import {
//   fetchCustomDoctor,
//   fetchDoctorLite,
// } from '../../reduxV2/action/DoctorToPatientAction';
// import { Colors } from '../../utils/Colors';
// import { Host } from '../../utils/connection';
// import { windowWidth } from '../../utils/utils';
// import DoctorSearch from './DoctorSearch';
// import Favorites from '../../components/atoms2/doctor/favorites';
// import ButtonCompo from '../../components/atoms2/button/button';
// import { consern } from '../../components/healthData';
// import { BottomSheet, Divider, ListItem } from 'react-native-elements';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
// import RadioGroupV2 from '../../components/molecules/RadioGroup/RadioGroupV2';
// import AvailibilityTabComponent from './profile_component/AvailibilityTabComponent';

// import axios from 'axios';
// import { getSpecialty } from '../../reduxV2/action/DoctorAction';
// import {
//   // fetchDoctorLite,
//   // fetchMoreDoctorLite,
//   searchDoctors,
//   fetchSuperDoc,
//   fetchFilteredSuperDoc,
//   fetchFilteredDoctors,
//   // GetAllDoctors,
// } from '../../reduxV2/action/DoctorToPatientAction';
// import AnimatedLottieView from 'lottie-react-native';
// import { ListingWithThumbnailLoader } from '../../components/atoms/Loader/Loader';
// import BlurModal from '../../components/molecules/Modal/BlurModal';
// const healthConsern = [
//   {
//     name: 'Bad Stomach',
//     image: require('../../assets/icons/badstomach.png'),
//   },
//   {
//     name: 'Skin Rash',
//     image: require('../../assets/icons/skinrash.png'),
//   },
//   {
//     name: 'Covid Care',
//     image: require('../../assets/icons/covidcare.png'),
//   },
//   {
//     name: 'Cough & Cold',
//     image: require('../../assets/icons/coughcold.png'),
//   },
// ];

// export default function DoctorHome({
//   navigation,
//   visible,
//   onCancel,
//   setVisible,
// }) {
//   // const [screen, setScreen] = React.useState(true);
//   const [search, setSearch] = React.useState('');
//   const [localLoading, setLocalLoading] = React.useState(false);
//   const [headerText, setHeaderText] = React.useState('');
//   const [selectedDoctor, setSelectedDoctor] = useState([]);
//   const [aboutPopupVisible, setAboutPopupVisible] = useState(false);
//   const [popupVisible, setPopupVisible] = useState(false);
//   const animateHeightOfPopup = useRef(new Animated.Value(0)).current;
//   const animateHeightOfAboutPopup = useRef(new Animated.Value(0)).current;
//   const [aboutPopupHeight, setAboutPopupHeight] = useState(600);
//   const [isKeyboardVisible, setKeyboardVisible] = useState(false);
//   const [activeFilter, setActiveFilter] = useState(1);
//   const [ActiveSpeciality, setActiveSpeciality] = useState({ item: '', i: '' });
//   const [doctorLocalState, setDoctorLocalState] = useState([]);
//   const [localDoctorLoading, setLocalDoctorLoading] = useState(true);
//   const [toggle, setToggle] = useState(0); // 0 : all docs , 1 : super doc
//   const [Slot, setSlot] = useState(null);
//   const [showOverviewTab, setShowOverviewTab] = useState('overview');
//   const [ShowSearchHeader, setShowSearchHeader] = useState(false);
//   const { appointments, gettingAppointment, errorGettingAppointment } =
//     useSelector((state) => state.DoctorReducer);

//   const dispatch = useDispatch();
//   const { userData, isLoggedin } = useSelector((state) => state.AuthReducer);
//   const {
//     // specialtyLoading,
//     specialty,
//   } = useSelector((state) => state.DoctorReducer);
//   const {
//     doctors,
//     loading,
//     // moreDoctorLoading,
//     // searchDoctorsLoading,
//     searchedDoctors,
//     superDocsLoading,
//     superDocs,
//   } = useSelector((state) => state.DoctorToPatientReducer);
//   // console.log('docrotrs..................', doctors[0].specialty);
//   // console.log('docrotrs..................', doctors);
//   // console.log('Superdocrotrs..................', superDocs);

//   const {
//     patient,
//     // isPatientAccountReducerLoading
//   } = useSelector((state) => state.PatientReducer);
//   // console.log('hello');

//   useEffect(() => {
//     !gettingAppointment && dispatch(GetAppointments(userData._id));
//   }, []);

//   const [user, setUser] = useState([]);
//   const getUser = async () => {
//     const data = await AsyncStorage.getItem('name');

//     let res = JSON.parse(data);
//     // console.log('user', res);
//     if (res != null) {
//       setUser(res);
//     }
//   };
//   // console.log(user.name);
//   useEffect(() => {
//     dispatch(getSpecialty(0, 52));
//   }, [dispatch]);
//   // console.log('==============@@@@@@@@@@@@@@@', doctors);
//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       'keyboardDidShow',
//       () => {
//         setKeyboardVisible(true); // or some other action
//       },
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       'keyboardDidHide',
//       () => {
//         setKeyboardVisible(false); // or some other action
//       },
//     );

//     return () => {
//       keyboardDidHideListener.remove();
//       keyboardDidShowListener.remove();
//     };
//   }, []);

//   useEffect(() => {
//     getUser();
//   }, []);

//   useEffect(() => {
//     dispatch(fetchDoctorLite('', 0, false));
//     dispatch(fetchSuperDoc('', 1, '10'));
//   }, []);

//   useEffect(() => {
//     if (isLoggedin) {
//       // console.log(isLoggedin);
//     } else {
//       navigation.navigate('verify-screen-v2');
//     }
//   }, []);
//   // const [border, setBorder] = useState(false);
//   const [consernText, setConsernText] = useState('');

//   //  const name = consern.map((item)=>{
//   //    console.log(item.name);
//   //  })
//   //  console.log(name);

//   const searchConsernData = () => {
//     consern.map((item) => {
//       if (consernText === item.name) {
//         // console.log('yes');
//       } else {
//         // console.log('no');
//       }
//     });
//   };

//   // {doctors.map((item)=>(
//   //   console.log(item.specialty)
//   // ))}

//   // const storeDoctors = (x) => {
//   //   setTap(true);
//   //   // {
//   //   //   doctors.length > 0
//   //   //     ? doctors
//   //   //         .filter((item) => item.specialty === x)
//   //   //         .map((item) => setSelectedDoctor(item))
//   //   //     : console.log('not selected');
//   //   // }
//   // };
//   const handleSpecialtyFilter = (item, index) => {
//     // console.log('spaclity>>>>>>>>>>>>>>', item);

//     dispatch(searchDoctors(item, 1));
//     setTap(false);
//   };

//   const onToggle = useCallback(() => {
//     // setActiveFilter(1);
//     setToggle((prev) => (prev === 0 ? 1 : 0));
//   }, []);

//   // console.log(selectedDoctor);

//   useEffect(() => {
//     searchConsernData();
//   }, [consernText]);

//   const handleSearch = (searchKey) => {
//     const searchParams = {
//       match: JSON.stringify({
//         city: searchKey,
//         specialty: searchKey,
//         state: searchKey,
//         country: searchKey,
//         firstName: searchKey,
//         lastName: searchKey,
//         name: searchKey,
//       }),
//       name: searchKey,
//     };
//     dispatch(fetchCustomDoctor(searchParams, 0, false));
//     dispatch(fetchSuperDoc(searchKey, 1, '10'));
//   };

//   const onRefresh = useCallback(() => {
//     dispatch(fetchDoctorLite('', 0, false));
//     dispatch(fetchSuperDoc('', 1, '10'));
//     setSearch('');
//     setHeaderText('');
//   }, []);

//   const [isVisible, setIsVisible] = useState(false);
//   const [filterData, setFilterData] = useState([]);
//   const [docData, setDocData] = useState([]);
//   const [conditionData, setConditionData] = useState([]);
//   const [searchConsern, setSearchConsern] = useState('');
//   const [tap, setTap] = useState(false);
//   const [filteredAppointments, setfilteredAppointments] = useState([]);
//   const [SelectCondition, setSelectCondition] = useState('');
//   const [focus, setFocus] = useState(false);
//   const [isVisibleFilter, setIsVisibleFilter] = useState(false);

//   const today = new Date();

//   const [active, setactive] = useState({
//     date: today.getDate(),
//     month: new Date().getMonth(),
//   });

//   const filterAppointments = () => {
//     // console.log(appointments, '________________________');
//     // console.log(active, 'active______________----');
//     if (typeof appointments == 'string') return;

//     let startDate = new Date().setDate(active.date);
//     startDate = new Date(startDate).setMonth(active.month);
//     startDate = new Date(startDate).setHours(0);
//     startDate = new Date(startDate).setMinutes(0);
//     const endDate = new Date(startDate).setDate(active.date + 1);
//     const appointment =
//       appointments &&
//       appointments[0] &&
//       appointments.filter((item, index) => {
//         if (
//           new Date(item.bookedFor).getTime() > new Date(startDate).getTime() &&
//           new Date(item.bookedFor).getTime() < new Date(endDate).getTime()
//         )
//           return item;
//       });

//     // console.log(appointment);
//     setfilteredAppointments(appointment);
//   };

//   // console.log(filteredAppointments)

//   // {appointments.map((item) => item.patient.appointments.map((item)=>(
//   //   console.log(item)
//   // )));}
//   useEffect(() => {
//     setDocData([...superDocs, ...doctors]);
//   }, [superDocs, doctors]);

//   useEffect(() => {
//     filterAppointments();
//   }, [appointments]);

//   // const searchFilter = (text) => {
//   //   if (text) {
//   //     const newData = consern.filter((item) => {
//   //       const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
//   //       const textData = text.toUpperCase();
//   //       return itemData.indexOf(textData) > -1;
//   //     });
//   //     setFilterData(newData);
//   //     setSearchConsern(text);
//   //     // console.log(newData);
//   //   } else {
//   //     setFilterData(consern);
//   //     setSearchConsern(text);
//   //     // console.log('no data');
//   //   }
//   // };

//   useEffect(() => {
//     if (search) {
//       const specialties = [];
//       const conditions = [];
//       specialty.map((element) => {
//         if (element.name.toLowerCase().includes(search.toLowerCase()))
//           specialties.push(element);

//         const _conditions = JSON.parse(element.conditions);
//         _conditions.map((condition) => {
//           if (condition.name.toLowerCase().includes(search.toLowerCase()))
//             conditions.push(condition);
//         });
//         setFilterData(specialties);
//         setConditionData(conditions);
//       });
//     } else {
//       setFilterData(specialty);
//       setConditionData(consern);
//       setSearchConsern(search);
//       console.log('no data');
//     }
//   }, [search]);

//   const nextStep = () => {
//     {
//       doctors.length > 0
//         ? doctors
//             .map((item) => item.diseases.map((item) => item === user.name))
//             .map((item) => {
//               // console.log(item);
//             })
//         : console.log('no consern');
//     }
//   };

//   useEffect(() => {
//     // console.log('???????????????????');
//     if (aboutPopupVisible) {
//       onPressDetails();
//     } else if (popupVisible) {
//       // onPressAvatar();
//     }
//   }, []);

//   const onPressDetails = () => {
//     animateHeightOfPopup.setValue(0);
//     setPopupVisible(false);
//     Animated.timing(animateHeightOfAboutPopup, {
//       useNativeDriver: true,
//       toValue: aboutPopupVisible ? 0 : 1,
//       easing: Easing.elastic(),
//       duration: 500,
//     }).start(() => {
//       setAboutPopupVisible(!aboutPopupVisible);
//     });
//   };

//   const onAboutPopupLayoutChange = (event) => {
//     setAboutPopupHeight(event.nativeEvent.layout.height);
//   };

//   // appointments.map((item) => console.log(item.doctor.coverPhoto));
//   // console.log(filteredAppointments);

//   const [showModal, setShowModal] = useState(false);

//   const openModal = () => {
//     setShowModal(true);
//   };

//   return (
//     <>
//       <ScrollView
//         style={{
//           backgroundColor: 'whitesmoke',
//           paddingTop: 10,
//           paddingBottom: 70,
//           flex: 1,
//         }}>
//         {search ? (
//           <View
//             style={{
//               justifyContent: 'space-between',
//               alignContent: 'center',
//               flexDirection: 'row',
//               marginVertical: 15,
//               paddingHorizontal: 20,
//             }}>
//             <TouchableOpacity onPress={() => setSearch('')}>
//               <Image
//                 source={require('../../assets/icons/left-chevron.png')}
//                 style={{ height: 30, width: 30 }}
//               />
//             </TouchableOpacity>
//             <Text
//               style={{
//                 color: '#297281',
//                 fontSize: 23,
//                 fontWeight: 'bold',
//                 flex: 1,
//                 textAlign: 'center',
//                 fontFamily: 'Montserrat-Regular',
//               }}>
//               Search
//             </Text>
//           </View>
//         ) : (
//           <DoctorHeader
//             onPressLeftIcons={() => navigation.openDrawer()}
//             showIcon
//             textStyle={{
//               fontFamily: 'Gilroy-Medium',
//             }}
//             text={`Doctors ${headerText}`}
//           />
//         )}
//         <View style={{ paddingHorizontal: 16 }}>
//           <DoctorSearch
//             focusMode={() => setFocus(true)}
//             onTextChange={(text) => {
//               setSearch(text);
//             }}
//             value={search}
//             onPress={() => {
//               setShowSearchHeader(true);
//               handleSearch(search);
//               if (search.length === 0) setHeaderText(``);
//               else setHeaderText(`for ${search}`);
//               if (search.length > 0) {
//                 dispatch({
//                   type: 'LAST_SEARCHES',
//                   payload: search,
//                 });
//               } else {
//                 alert('enter something');
//               }
//             }}
//           />

//           <View>
//             {focus && search ? (
//               userData.lastSearches.length > 0 ? (
//                 <View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                       marginTop: 20,
//                     }}>
//                     <View
//                       style={{ flexDirection: 'row', alignItems: 'center' }}>
//                       <Image
//                         source={require('../../assets/icons/clock.png')}
//                         style={{
//                           height: 15,
//                           width: 15,
//                           resizeMode: 'contain',
//                           tintColor: '#297281',
//                         }}
//                       />
//                       <Text
//                         style={{
//                           color: '#297281',
//                           fontSize: 16,
//                           fontWeight: '700',
//                           marginLeft: 10,
//                         }}>
//                         ched
//                       </Text>
//                     </View>
//                     <TouchableOpacity onPress={openModal}>
//                       <Text
//                         style={{
//                           textDecorationLine: 'underline',
//                           color: '#EA1A65',
//                           fontWeight: 'bold',
//                         }}>
//                         clear
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                   <ScrollView
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     style={{ marginTop: 10, flex: 1 }}>
//                     {userData.lastSearches.map((item) => (
//                       <TouchableOpacity
//                         style={{
//                           backgroundColor: 'white',
//                           paddingHorizontal: 20,
//                           paddingVertical: 15,
//                           minWidth: 150,
//                           marginHorizontal: 5,
//                           borderRadius: 50,
//                           marginVertical: 5,
//                           shadowColor: '#171717',
//                           shadowOffset: { width: 0, height: 1 },
//                           shadowOpacity: 0.8,
//                           shadowRadius: 2,
//                           elevation: 5,
//                         }}>
//                         <Text
//                           style={{
//                             color: 'black',
//                             fontSize: 15,
//                             fontWeight: '600',
//                             textAlign: 'center',
//                             fontFamily: ' Gilroy-SemiBold',
//                           }}>
//                           {item}
//                         </Text>
//                       </TouchableOpacity>
//                     ))}
//                   </ScrollView>
//                 </View>
//               ) : (
//                 <></>
//               )
//             ) : (
//               <></>
//             )}
//           </View>

//           {search ? (
//             <View>
//               {conditionData.length > 0 ? (
//                 <View>
//                   <View
//                     style={{
//                       marginTop: 20,
//                     }}>
//                     <View
//                       style={{ flexDirection: 'row', alignItems: 'center' }}>
//                       <Text
//                         style={{
//                           color: '#297281',
//                           fontSize: 18,
//                           fontWeight: '700',
//                           marginLeft: 10,
//                         }}>
//                         Health Concerns
//                       </Text>
//                     </View>
//                   </View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'flex-start',
//                       flexWrap: 'wrap',
//                       marginTop: 10,
//                     }}>
//                     {conditionData.map((item) => (
//                       <TouchableOpacity
//                         onPress={() => handleSearch(item.name)}
//                         style={{
//                           backgroundColor: 'white',
//                           paddingHorizontal: 20,
//                           paddingVertical: 15,
//                           width: '45%',
//                           marginHorizontal: 5,
//                           borderRadius: 50,
//                           marginVertical: 5,
//                           shadowColor: '#171717',
//                           shadowOffset: { width: 0, height: 1 },
//                           shadowOpacity: 0.8,
//                           shadowRadius: 2,
//                           elevation: 5,
//                           borderColor:
//                             SelectCondition === item.name ? '#EA1A65' : 'white',
//                           borderWidth: 1,
//                         }}>
//                         <Text
//                           style={{
//                             color: 'black',
//                             fontSize: 15,
//                             fontWeight: '600',
//                             textAlign: 'center',
//                             fontFamily: ' Gilroy-SemiBold',
//                           }}>
//                           {item.name.substr(0, 16)}
//                         </Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 </View>
//               ) : (
//                 <></>
//               )}
//             </View>
//           ) : (
//             <View style={{ marginTop: 20 }}>
//               <Text
//                 style={{
//                   color: 'black',
//                   fontSize: 19,

//                   letterSpacing: 0.5,
//                   fontFamily: 'Gilroy-SemiBold',
//                 }}>
//                 Common Health Concerns
//               </Text>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   flexWrap: 'wrap',
//                 }}>
//                 {healthConsern.map((item) => (
//                   <TouchableOpacity key={item.image}>
//                     <Card
//                       style={{
//                         paddingHorizontal: 5,
//                         paddingVertical: 7,
//                         borderRadius: 30,
//                         marginRight: 20,
//                         marginTop: 10,
//                       }}>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           alignItems: 'center',
//                           justifyContent: 'space-between',
//                           backgroundColor: 'white',
//                           width: 150,
//                           borderRadius: 30,
//                         }}>
//                         <Image
//                           source={item.image}
//                           style={{
//                             height: 50,
//                             width: 40,
//                             resizeMode: 'contain',
//                           }}
//                         />
//                         <View style={{ marginLeft: 7, flex: 1 }}>
//                           <Text
//                             style={{
//                               fontSize: 15,

//                               color: 'black',
//                               maxWidth: '85%',
//                               fontFamily: 'Gilroy-SemiBold',
//                             }}>
//                             {item.name}
//                           </Text>
//                         </View>
//                       </View>
//                     </Card>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>
//           )}

//           {showModal ? (
//             <BlurModal {...{ visible, onCancel, setVisible }}>
//               <Text
//                 style={{
//                   fontSize: 18,
//                   color: 'black',
//                   textAlign: 'left',
//                   maxWidth: '75%',
//                 }}>
//                 Are you sure you want to clear recent searches?
//               </Text>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   width: '100%',
//                   alignItems: 'flex-end',
//                   justifyContent: 'flex-end',
//                   marginTop: 20,
//                 }}>
//                 <TouchableOpacity>
//                   <Text style={{ fontSize: 18, color: '#EA1A65' }}>CANCEL</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => {
//                     setShowModal(false);
//                     setSearch('');
//                   }}>
//                   <Text
//                     style={{ fontSize: 18, marginLeft: 30, color: '#7B7A79' }}>
//                     CONFIRM
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </BlurModal>
//           ) : (
//             <></>
//           )}
//           <View>
//             <View>
//               {filteredAppointments > 0 ? (
//                 filteredAppointments.map((item) => (
//                   <Card style={{ borderRadius: 20, marginVertical: 10 }}>
//                     <View
//                       style={{
//                         paddingHorizontal: 10,
//                       }}>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           alignItems: 'center',
//                           justifyContent: 'flex-start',
//                           marginVertical: 10,
//                         }}>
//                         <Image
//                           source={require('../../assets/icons/Date_range_light.png')}
//                           style={{
//                             height: 25,
//                             width: 25,
//                             resizeMode: 'contain',
//                             tintColor: 'black',
//                           }}
//                         />
//                         <Text
//                           style={{
//                             color: 'black',
//                             fontSize: 18,
//                             marginLeft: 10,
//                             fontWeight: 'bold',
//                           }}>
//                           Upcoming Appointment
//                         </Text>
//                       </View>
//                       <View>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             alignItems: 'flex-start',
//                             justifyContent: 'space-between',
//                           }}>
//                           {item.doctor.coverPhoto ? (
//                             <Image
//                               source={{
//                                 uri: `${Host}${item.doctor.coverPhoto
//                                   .replace('public', '')
//                                   .replace('\\\\', '/')}`,
//                               }}
//                               style={{
//                                 height: 85,
//                                 width: 85,
//                                 borderRadius: 85,
//                                 resizeMode: 'cover',
//                               }}
//                             />
//                           ) : (
//                             <View
//                               style={{
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 backgroundColor: 'lightgrey',
//                                 padding: 20,
//                                 borderRadius: 50,
//                               }}>
//                               <Text
//                                 style={{
//                                   fontSize: 30,
//                                   fontWeight: 'bold',
//                                   textAlign: 'center',
//                                 }}>
//                                 {item.doctor.firstName[0]}
//                                 {item.doctor.lastName[0]}
//                               </Text>
//                             </View>
//                           )}
//                           <View style={{ marginLeft: 10 }}>
//                             <Text
//                               style={{
//                                 fontSize: 20,
//                                 color: 'black',
//                                 fontWeight: '600',
//                               }}>
//                               {item.doctor.basic.name}
//                             </Text>
//                             <Text
//                               style={{
//                                 fontSize: 13,
//                                 color: '#666666',
//                               }}>
//                               {item.doctor.specialty} | {}
//                             </Text>

//                             <View style={{ marginTop: 10, marginBottom: 8 }}>
//                               <Text style={{ color: '#EA1A65' }}>
//                                 {item.bookedFor.slice(0, 10)}
//                               </Text>
//                               <View
//                                 style={{
//                                   flexDirection: 'row',
//                                   alignItems: 'center',
//                                   marginVertical: 5,
//                                 }}>
//                                 <Text style={{ color: '#7B7A79' }}>
//                                   Health Concern :
//                                 </Text>
//                                 <Text
//                                   style={{
//                                     marginLeft: 10,
//                                     color: 'black',
//                                     fontWeight: 'bold',
//                                   }}></Text>
//                               </View>
//                               <View
//                                 style={{
//                                   flexDirection: 'row',
//                                   alignItems: 'center',
//                                   marginTop: 15,
//                                 }}>
//                                 <Image
//                                   source={require('../../assets/icons/clock.png')}
//                                   style={{
//                                     height: 20,
//                                     width: 20,
//                                     resizeMode: 'contain',
//                                     tintColor: '#EA1A65',
//                                   }}
//                                 />
//                                 <Text
//                                   style={{
//                                     marginLeft: 10,
//                                     color: '#7B7A79',
//                                   }}>
//                                   starting in
//                                 </Text>
//                               </View>
//                             </View>
//                           </View>
//                           <View
//                             style={{
//                               flexDirection: 'row',
//                               alignItems: 'center',
//                             }}>
//                             <Image
//                               source={require('../../assets/icons/rating.png')}
//                               style={{
//                                 height: 20,
//                                 width: 20,
//                                 resizeMode: 'contain',
//                               }}
//                             />
//                             <Text
//                               style={{
//                                 marginLeft: 5,
//                                 fontFamily: 'Montserrat-Regular',
//                               }}>
//                               4.5
//                             </Text>
//                           </View>
//                         </View>
//                         <View style={{ marginVertical: 10 }}>
//                           <ButtonCompo
//                             title="Enter Waiting Room "
//                             textStyle={{
//                               fontSize: 14,
//                               fontFamily: 'Montserrat-SemiBold',
//                             }}
//                           />
//                         </View>
//                       </View>
//                     </View>
//                   </Card>
//                 ))
//               ) : (
//                 <View />
//               )}
//             </View>
//             {userData.payment?.payment ? (
//               <View />
//             ) : (
//               <View
//                 style={{
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   backgroundColor: 'white',
//                   paddingVertical: 15,
//                   marginHorizontal: 20,
//                   borderRadius: 15,
//                   marginTop: 20,
//                   shadowColor: 'rgba(0,0,0,0.3)',
//                   shadowOffset: { width: 0, height: 1 },
//                   shadowOpacity: 0.8,
//                   shadowRadius: 2,
//                   elevation: 5,
//                   position: 'relative',
//                 }}>
//                 <Image
//                   source={require('../../assets/icons/Getplus.png')}
//                   style={{
//                     width: 100,
//                     height: 40,
//                     resizeMode: 'contain',
//                     position: 'absolute',
//                     left: '-7%',
//                     top: '3%',
//                   }}
//                 />
//                 <Image
//                   source={require('../../assets/icons/doc1.png')}
//                   style={{
//                     height: 70,
//                     width: 70,
//                     borderRadius: 70,
//                     resizeMode: 'contain',
//                   }}
//                 />
//                 <View style={{ marginTop: 5 }}>
//                   <Text
//                     style={{
//                       fontSize: 19,

//                       textAlign: 'center',
//                       color: 'black',
//                       fontFamily: 'Gilroy-SemiBold',
//                     }}>
//                     Unlimited
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: 19,

//                       textAlign: 'center',
//                       color: 'black',
//                       fontFamily: 'Gilroy-SemiBold',
//                     }}>
//                     Consultations
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: 15,

//                       color: 'grey',
//                       textAlign: 'center',
//                       maxWidth: '70%',
//                       marginVertical: 5,
//                       fontFamily: 'Gilroy-Regular',
//                     }}>
//                     Consult with Experts for your everyday health concern
//                   </Text>
//                 </View>
//                 <Button
//                   style={{
//                     backgroundColor: '#2195CC',
//                     paddingHorizontal: 10,
//                     paddingVertical: 5,
//                     borderRadius: 30,
//                     marginTop: 10,
//                     fontFamily: 'Gilroy-Bold',
//                   }}
//                   color="white"
//                   onPress={() => navigation.navigate('GetPlusNowScreen')}>
//                   Get Plus now
//                 </Button>
//               </View>
//             )}

//             <View></View>
//             <View style={{ marginTop: 10, flex: 1 }}>
//               {filterData.length > 0 ? (
//                 <View style={{ marginTop: 10, flex: 1 }}>
//                   <Text
//                     style={{
//                       color: 'black',
//                       fontSize: 18,
//                       lineHeight: 20,
//                       letterSpacing: 0.5,
//                       marginVertical: 10,
//                       fontFamily: 'Gilroy-SemiBold',
//                       paddingLeft: 10,
//                     }}>
//                     {search ? 'Specilaty' : 'Top Doctors'}
//                   </Text>

//                   <ScrollView
//                     showsHorizontalScrollIndicator={false}
//                     horizontal
//                     scrollIndicatorInsets={false}>
//                     {filterData.map((item, i) => (
//                       <TouchableOpacity
//                         onPress={() => handleSearch(item.name)}
//                         key={item._id}>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             backgroundColor: 'white',
//                             width: 180,
//                             paddingVertical: 15,
//                             borderRadius: 25,
//                             paddingLeft: 15,
//                             marginRight: 10,
//                             borderWidth:
//                               // docData.map((item) => item.specialty) ===
//                               // item.name
//                               //   ? 1
//                               //   : 0,
//                               docData[0]?.specialty === item.name ? 1 : 0,
//                             borderColor: '#EA1A65',
//                           }}>
//                           <Image
//                             source={require('../../assets/icons/generalphysician.png')}
//                             style={{
//                               height: 50,
//                               width: 40,
//                               resizeMode: 'contain',
//                             }}
//                           />
//                           <View style={{ marginLeft: 7, flex: 1 }}>
//                             <Text
//                               style={{
//                                 fontSize: 16,
//                                 lineHeight: 19,
//                                 color: '#333333',
//                                 maxWidth: '90%',
//                                 marginLeft: 10,
//                                 fontFamily: 'Gilroy-SemiBold',
//                               }}>
//                               {item.name}
//                             </Text>
//                           </View>
//                         </View>
//                       </TouchableOpacity>
//                     ))}
//                   </ScrollView>
//                 </View>
//               ) : (
//                 <></>
//               )}
//               <View>
//                 <Text
//                   style={{
//                     color: 'black',
//                     fontSize: 18,
//                     lineHeight: 20,
//                     letterSpacing: 0.5,
//                     marginVertical: 10,
//                     fontFamily: 'Gilroy-SemiBold',
//                   }}>
//                   {doctors.length} Doctors Available now
//                 </Text>
//                 <FlatList
//                   data={docData}
//                   keyExtractor={(item) => item._id}
//                   refreshControl={
//                     <RefreshControl
//                       refreshing={loading}
//                       onRefresh={onRefresh}
//                     />
//                   }
//                   showsHorizontalScrollIndicator={false}
//                   refreshing={loading || localLoading}
//                   onRefresh={onRefresh}
//                   renderItem={({ item, index }) => {
//                     const name = item.basic.name.split(' ');
//                     let education = '';
//                     if (item.education) {
//                       item.education.map(
//                         (e, i) => (education += `${e.degree}, `),
//                       );
//                       education.slice(0, education.length - 2);
//                     }

//                     const img = item.coverPhoto ? (
//                       <Image
//                         source={{
//                           uri: `${Host}${item.coverPhoto
//                             .replace('public', '')
//                             .replace('\\\\', '/')}`,
//                         }}
//                         style={{ width: 75, height: 75, borderRadius: 100 }}
//                       />
//                     ) : (
//                       <PicturelessAvatar
//                         style={{
//                           color: '#000',
//                           backgroundColor: '#f9f9f9',
//                           height: 70,
//                           width: 70,
//                           borderRadius: 35,
//                         }}
//                         textStyle={{ fontSize: 32 }}
//                         text={`${name[0][0]}${name[1][0]}`}
//                       />
//                     );

//                     return (
//                       <View style={{ marginHorizontal: 10 }} key={index}>
//                         {/* <Text>{`Dr. ${item.basic.name}`}</Text> */}
//                         <BuildCustomCardComponent
//                           {...item}
//                           doctor={item}
//                           loading={localLoading}
//                           setLoading={setLocalLoading}
//                           navigation={navigation}
//                           drName={`Dr. ${item.basic.name}`}
//                           education={education}
//                           rating="4.5"
//                           isLoggedin={isLoggedin}
//                           image={img}
//                           desc={item.languages ? item.languages.toString() : ''}
//                           // state={[item]}
//                           dispatch={dispatch}
//                           button={onPressDetails}
//                         />
//                       </View>
//                     );
//                   }}
//                 />
//               </View>
//             </View>
//           </View>
//         </View>

//         <View style={{ height: 64 }} />
//       </ScrollView>
//       {search ? (
//         <View
//           style={{
//             paddingVertical: 20,
//             backgroundColor: 'white',
//             marginBottom: 30,
//           }}>
//           <TouchableOpacity
//             onPress={() => {
//               handleSearch(search);
//               setIsVisibleFilter(true);
//               setSearch('');
//             }}>
//             <Text
//               style={{
//                 textAlign: 'right',
//                 fontSize: 18,
//                 color: '#EA1A65',
//                 marginRight: 22,
//                 fontWeight: 'bold',
//               }}>
//               Done
//             </Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <></>
//       )}
//       {isVisibleFilter && !search && (
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             paddingVertical: 15,
//             marginBottom: 40,
//             backgroundColor: 'white',
//           }}>
//           <TouchableOpacity
//             style={{
//               flex: 1,
//               alignItems: 'center',
//               justifyContent: 'center',
//               flexDirection: 'row',
//             }}>
//             <Image
//               source={require('../../../src/assets/icons/Filter_list.png')}
//               style={{ height: 20, width: 20, resizeMode: 'contain' }}
//             />
//             <Text style={{ fontSize: 20, color: '#297281', marginLeft: 10 }}>
//               SORT
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{
//               flex: 1,
//               alignItems: 'center',
//               justifyContent: 'center',
//               flexDirection: 'row',
//             }}>
//             <Image
//               source={require('../../../src/assets/icons/sort.png')}
//               style={{ height: 20, width: 20, resizeMode: 'contain' }}
//             />
//             <Text style={{ fontSize: 20, color: '#297281', marginLeft: 10 }}>
//               FILTER
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </>
//   );
// }

// const BuildCardButtonComponent = ({ image, text }) => {
//   return (
//     <TouchableOpacity style={styles.button_shadow}>
//       <Image
//         source={image}
//         style={{ width: 16, height: 16, tintColor: '#FF0000' }}
//       />
//       <Text
//         style={{
//           fontSize: 11,
//           color: 'black',
//           marginLeft: 4,
//           fontFamily: 'Montserrat-Regular',
//         }}>
//         {text}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// const Card1 = ({ item, doctorId, navigation, history }) => {
//   const { patient } = item ? item : {};
//   const dispatch = useDispatch();
//   const { theme } = useSelector((state) => state.AuthReducer);

//   String.prototype.toTitleCase = function () {
//     const splited = this.split(' ')
//       .map((item) => {
//         if (item[0]) return `${item[0].toUpperCase()}${item.slice(1)}`;
//       })
//       .join(' ');
//     return splited;
//   };

//   const cancelAppointment = () => {
//     const data = {
//       id: item._id,
//       patientId: patient._id,
//       reason: 'nil reason',
//       byDoctor: true,
//       byPatient: false,
//     };
//     dispatch(
//       RemoveAppointment(data, () => dispatch(GetAppointments(doctorId))),
//     );
//   };

//   const approveAppointment = () => {
//     const data = {
//       _id: item._id,
//       patient: patient._id,
//       time: item.bookedFor,
//       date: item.bookedFor,
//       address: '',
//       doctor: doctorId,
//     };
//     dispatch(
//       ApproveAppointment(data, () => dispatch(GetAppointments(doctorId))),
//     );
//   };
//   if (patient) {
//     return (
//       <View
//         style={{
//           backgroundColor: 'cyan',
//           width: '100%',
//           elevation: 2,
//           borderRadius: 10,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           paddingHorizontal: '2%',
//           marginBottom: '5%',
//         }}>
//         <View
//           style={{
//             paddingVertical: '4%',
//             paddingHorizontal: '4%',
//             flex: 1,
//           }}>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <View
//               style={{
//                 height: 8,
//                 width: 8,
//                 borderRadius: 8,
//                 backgroundColor: '#077EE9',
//               }}></View>
//             <Text
//               style={{
//                 color: 'black',
//                 fontSize: 16,
//                 fontWeight: 'bold',
//                 marginLeft: '2%',
//               }}>
//               {`${patient.firstName?.toTitleCase()} ${patient.lastName?.toTitleCase()}`}
//             </Text>
//             <Text
//               style={{
//                 color: 'black',
//                 fontSize: 16,
//               }}>
//               {' '}
//               {item.reasonForVisit && '-'} {item.reasonForVisit}
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               paddingLeft: '5%',
//               marginTop: '2%',
//             }}>
//             <Text
//               style={{
//                 color: 'black',
//                 fontWeight: 'bold',
//                 marginRight: '4%',
//               }}>
//               {moment(item.bookedFor).format("DD MMM 'YY")}
//             </Text>
//             <Text
//               style={{
//                 color: 'black',
//                 fontWeight: 'bold',
//                 color: '#077EE9',
//               }}>
//               |
//             </Text>
//             <Text
//               style={{
//                 color: '#7B7A79',
//                 color: 'black',
//                 marginLeft: '4%',
//               }}>
//               {moment(item.bookedFor).format('hh:mm a')}
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'flex-end',
//               marginTop: '2%',
//             }}>
//             {!item.approved && !history && (
//               <TouchableOpacity onPress={approveAppointment}>
//                 <Text style={{ marginRight: '6%', color: '#077EE9' }}>
//                   {Local('doctor.appointments.confirm')}
//                 </Text>
//               </TouchableOpacity>
//             )}
//             {!history && (
//               <TouchableOpacity onPress={cancelAppointment}>
//                 <Text style={{ color: '#EA1A65' }}>
//                   {Local('doctor.appointments.cancel')}
//                 </Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate('PatientDetails', { patient });
//           }}>
//           <MaterialIcon name={'chevron-right'} size={38} color={'#43A2A2'} />
//         </TouchableOpacity>
//       </View>
//     );
//   } else {
//     return null;
//   }
// };

// const BuildCustomCardComponent = (props) => {
//   const {
//     dispatch,
//     doctor,
//     navigation,
//     drName,
//     desc,
//     rating,
//     image,
//     experience,
//     location,
//     city,
//     state,
//     country,
//     fee,
//     education,
//     specialty,
//     specialties,
//     _id,
//     isLoggedin,
//     setLoading,
//     button,
//   } = props;
//   const [heartActive, setHeartActive] = React.useState(false);
//   let drInfo = '';
//   if (specialty || (specialties && specialties[0]))
//     drInfo += specialty || specialties[0];
//   if (education.length > 0 || (specialties && specialties[0])) drInfo += ' | ';
//   if (education.length > 0) drInfo += education;

//   return (
//     <View>
//       <Card
//         onPress={() => {
//           let data = {
//             ...doctor,
//             appointments: [],
//             desc,
//             education: doctor.education ? doctor.education : [],
//           };
//           if (isLoggedin) navigation.navigate('DoctorProfileScreen', data);
//           else navigation.openDrawer();
//         }}
//         style={{
//           marginVertical: 10,
//           paddingBottom: 10,
//           borderRadius: 10,
//           // width: 300,
//           width: '100%',
//         }}>
//         <View
//           style={{
//             height: 180,
//             width: '100%',
//             alignItems: 'center',
//             justifyContent: 'center',
//             borderTopLeftRadius: 10,
//             borderTopRightRadius: 10,
//             backgroundColor: 'grey',
//           }}>
//           {image}
//           <Image
//             style={{
//               position: 'absolute',
//               height: 40,
//               width: 100,
//               left: '-7%',
//               top: 10,
//               resizeMode: 'contain',
//             }}
//             source={require('../../assets/icons/Getplus.png')}
//           />
//           <TouchableOpacity
//             style={{
//               position: 'absolute',
//               right: 20,
//               top: 10,
//               padding: 3,
//               backgroundColor: 'whitesmoke',
//               borderRadius: 20,
//             }}>
//             <MCI name="heart-outline" size={24} color="grey" />
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             padding: 10,
//             backgroundColor: 'white',
//             borderRadius: 10,
//             // marginTop: '-2%',
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: doctor.is_superDoc
//                 ? 'space-between'
//                 : 'flex-start',
//               paddingTop: 5,
//             }}>
//             <View>
//               <Text
//                 style={{
//                   fontSize: 18,
//                   // fontWeight: 'bold',
//                   fontFamily: 'Gilroy-SemiBold',
//                 }}>
//                 {drName}
//               </Text>
//               <Text
//                 style={{
//                   color: 'rgba(0,0,0,0.4)',
//                   fontFamily: 'Gilroy-Medium',
//                 }}>
//                 {specialty} {specialty && education ? '|' : ''} {education}
//               </Text>
//             </View>

//             {doctor.is_superDoc ? (
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   paddingHorizontal: 8,
//                   paddingVertical: 3,
//                   backgroundColor: 'whitesmoke',
//                   borderRadius: 5,
//                 }}>
//                 <Image
//                   source={require('../../assets/icons/path.png')}
//                   style={{ height: 15, width: 15, resizeMode: 'contain' }}
//                 />
//                 <Text style={{ fontFamily: 'Gilroy-Medium' }}>
//                   {experience} Years
//                 </Text>
//               </View>
//             ) : null}
//             {/* <View
//               style={{
//                 flexDirection: 'column',
//                 alignItems: 'flex-end',
//                 marginBottom: 10,
//               }}></View> */}
//           </View>

//           {doctor.is_superDoc ? (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 marginTop: 15,
//                 justifyContent: 'space-between',
//               }}>
//               <TouchableOpacity
//                 onPress={() => {
//                   let data = {
//                     ...doctor,
//                     appointments: [],
//                     desc,
//                     education: doctor.education ? doctor.education : [],
//                   };
//                   if (isLoggedin)
//                     navigation.navigate('DoctorProfileScreen', data);
//                   else navigation.openDrawer();
//                 }}
//                 style={{
//                   borderWidth: 1,
//                   borderColor: '#0676D5',
//                   paddingVertical: 5,
//                   paddingHorizontal: 30,
//                   borderRadius: 30,
//                   alignItems: 'center',
//                 }}>
//                 <Text
//                   style={{
//                     fontSize: 17,

//                     fontFamily: 'Gilroy-SemiBold',
//                     color: '#0676D5',
//                   }}>
//                   Book
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: 17,

//                     fontFamily: 'Gilroy-SemiBold',
//                     color: '#0676D5',
//                   }}>
//                   Appointment
//                 </Text>
//               </TouchableOpacity>
//               <ButtonCompo
//                 pressHandler={
//                   () =>
//                     isLoggedin
//                       ? navigation.navigate('AppointmentDetails', {
//                           doctor,
//                         })
//                       : navigation.openDrawer()

//                   // dispatch(
//                   //   CreateAppointment(
//                   //     { doctor: doctor._id },
//                   //     (err, response) => {
//                   //       if (isLoggedin)
//                   //         navigation.navigate('ConfirmAppointment', {
//                   //           data: { ...response },
//                   //           doctorData: doctor,
//                   //         });
//                   //       else navigation.openDrawer();
//                   //     },
//                   //   ),
//                   // )
//                 }
//                 title="Consult Now"
//                 textStyle={{
//                   fontSize: 15,
//                   fontFamily: 'Gilroy-SemiBold',
//                   lineHeight: 19,
//                   marginVertical: 5,
//                 }}
//               />
//             </View>
//           ) : (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//               }}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   paddingHorizontal: 8,
//                   paddingVertical: 3,
//                   backgroundColor: 'whitesmoke',
//                   borderRadius: 5,
//                 }}>
//                 <Image
//                   source={require('../../assets/icons/path.png')}
//                   style={{ height: 15, width: 15, resizeMode: 'contain' }}
//                 />
//                 <Text style={{ fontFamily: 'Gilroy-Medium' }}>
//                   {experience} Years
//                 </Text>
//               </View>

//               <ButtonCompo
//                 pressHandler={() => {
//                   let data = {
//                     ...doctor,
//                     appointments: [],
//                     desc,
//                     education: doctor.education ? doctor.education : [],
//                   };
//                   if (isLoggedin)
//                     navigation.navigate('DoctorProfileScreen', data);
//                   else navigation.openDrawer();
//                 }}
//                 title="Book Appointment"
//                 textStyle={{
//                   fontSize: 15,
//                   fontFamily: 'Gilroy-SemiBold',
//                   lineHeight: 19,
//                 }}
//               />
//             </View>
//           )}
//         </View>
//       </Card>
//     </View>
//   );

//   // return (
//   //   <View>
//   //     {/* <TouchableOpacity
//   //           onPress={() => {
//   //             let data = {
//   //               ...doctor,
//   //               appointments: [],
//   //               desc,
//   //               education: doctor.education ? doctor.education : [],
//   //             };
//   //             if (isLoggedin) navigation.navigate('DoctorProfileScreen', data);
//   //             else navigation.openDrawer();
//   //           }}
//   //           style={{ marginVertical: 10 }}>
//   //           <View
//   //             style={{
//   //               height: 180,
//   //               width: '100%',
//   //               alignItems: 'center',
//   //               justifyContent: 'center',
//   //               position: 'relative',
//   //               backgroundColor: 'grey',
//   //             }}>
//   //             <View>{image}</View>
//   //             <Image
//   //               style={{
//   //                 position: 'absolute',
//   //                 height: 40,
//   //                 width: 100,
//   //                 left: '-6%',
//   //                 top: 10,
//   //                 resizeMode: 'contain',
//   //               }}
//   //               source={require('../../assets/icons/Getplus.png')}
//   //             />
//   //             <TouchableOpacity
//   //               style={{
//   //                 position: 'absolute',
//   //                 right: 20,
//   //                 top: 10,
//   //                 padding: 3,
//   //                 backgroundColor: 'whitesmoke',
//   //                 borderRadius: 20,
//   //               }}>
//   //               <MCI name="heart-outline" size={24} color="grey" />
//   //             </TouchableOpacity>
//   //             <View
//   //               style={{
//   //                 backgroundColor: '#EA1A65',
//   //                 position: 'absolute',
//   //                 bottom: 20,
//   //                 left: '0%',
//   //                 flexDirection: 'row',
//   //                 alignItems: 'center',
//   //                 borderTopRightRadius: 10,
//   //                 borderBottomRightRadius: 10,
//   //                 paddingHorizontal: 10,
//   //                 paddingVertical: 3,
//   //               }}>
//   //               <Image
//   //                 source={require('../../assets/icons/time.png')}
//   //                 style={{ height: 20, width: 20, resizeMode: 'contain' }}
//   //               />
//   //               <View style={{ marginLeft: 10 }}>
//   //                 <Text
//   //                   style={{
//   //                     color: 'white',
//   //                     fontSize: 12,
//   //                     fontFamily: 'Montserrat-Regular',
//   //                   }}>
//   //                   Available
//   //                 </Text>
//   //                 <Text
//   //                   style={{
//   //                     fontWeight: 'bold',
//   //                     color: 'white',
//   //                     fontSize: 12,
//   //                     fontFamily: 'Montserrat-Regular',
//   //                   }}>
//   //                   Now
//   //                 </Text>
//   //               </View>
//   //             </View>
//   //           </View>
//   //           <View
//   //             style={{
//   //               paddingHorizontal: 20,
//   //               backgroundColor: 'white',
//   //               borderTopLeftRadius: 10,
//   //               borderTopRightRadius: 10,
//   //               borderBottomLeftRadius: 10,
//   //               borderBottomRightRadius: 10,
//   //               marginTop: '-2%',
//   //             }}>
//   //             <View
//   //               style={{
//   //                 flexDirection: 'row',
//   //                 alignItems: 'flex-start',
//   //                 justifyContent: 'space-between',
//   //                 paddingTop: 5,
//   //               }}>
//   //               <View>
//   //                 <Text
//   //                   style={{
//   //                     fontSize: 18,
//   //                     fontWeight: 'bold',
//   //                     fontFamily: 'Montserrat-Regular',
//   //                   }}>
//   //                   {item.basic.name}
//   //                 </Text>
//   //                 <Text
//   //                   style={{
//   //                     color: 'rgba(0,0,0,0.4)',
//   //                     fontFamily: 'Montserrat-Regular',
//   //                   }}>
//   //                   {item.specialty} | {item.education}
//   //                 </Text>
//   //               </View>
//   //               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//   //                 <Image
//   //                   source={require('../../assets/icons/rating.png')}
//   //                   style={{ height: 20, width: 20, resizeMode: 'contain' }}
//   //                 />
//   //                 <Text
//   //                   style={{ marginLeft: 5, fontFamily: 'Montserrat-Regular' }}>
//   //                   {rating}
//   //                 </Text>
//   //               </View>
//   //             </View>
//   //             <View
//   //               style={{
//   //                 flexDirection: 'row',
//   //                 alignItems: 'center',
//   //                 justifyContent: 'space-between',
//   //               }}>
//   //               <View
//   //                 style={{
//   //                   flexDirection: 'row',
//   //                   alignItems: 'center',
//   //                   paddingHorizontal: 8,
//   //                   paddingVertical: 3,
//   //                   backgroundColor: 'whitesmoke',
//   //                   borderRadius: 5,
//   //                 }}>
//   //                 <Image
//   //                   source={require('../../assets/icons/path.png')}
//   //                   style={{ height: 15, width: 15, resizeMode: 'contain' }}
//   //                 />
//   //                 <Text style={{ fontFamily: 'Montserrat-Regular' }}>
//   //                   {item.experience} Years
//   //                 </Text>
//   //               </View>
//   //               <Button
//   //                 onPress={props.button}
//   //                 style={{
//   //                   backgroundColor: '#0787F4',
//   //                   paddingVertical: 7,
//   //                   borderRadius: 30,
//   //                 }}
//   //                 color="white">
//   //                 Consult Now
//   //               </Button>
//   //             </View>
//   //             <View
//   //               style={{
//   //                 flexDirection: 'row',
//   //                 marginTop: 10,
//   //                 paddingBottom: 10,
//   //               }}>
//   //               <Image
//   //                 source={require('../../assets/icons/Patientslove.png')}
//   //                 style={{ height: 20, width: 20, resizeMode: 'contain' }}
//   //               />
//   //               <Text
//   //                 style={{
//   //                   color: 'black',
//   //                   marginLeft: 5,
//   //                   fontFamily: 'Montserrat-Regular',
//   //                 }}>
//   //                 Treated 800+ patients recently
//   //               </Text>
//   //             </View>
//   //           </View>
//   //         </TouchableOpacity>
//   //       ))
//   //     ) : ( */}
//   //     <Card
//   //       onPress={() => {
//   //         let data = {
//   //           ...doctor,
//   //           appointments: [],
//   //           desc,
//   //           education: doctor.education ? doctor.education : [],
//   //         };
//   //         if (isLoggedin) navigation.navigate('DoctorProfileScreen', data);
//   //         else navigation.openDrawer();
//   //       }}
//   //       style={{ marginVertical: 10, paddingBottom: 10, borderRadius: 10 }}>
//   //       <View
//   //         style={{
//   //           height: 180,
//   //           width: '100%',
//   //           alignItems: 'center',
//   //           justifyContent: 'center',

//   //           backgroundColor: 'grey',
//   //         }}>
//   //         {image}
//   //         {/* <Image
//   //           style={{
//   //             position: 'absolute',
//   //             height: 40,
//   //             width: 100,
//   //             left: '-6%',
//   //             top: 10,
//   //             resizeMode: 'contain',
//   //           }}
//   //           source={require('../../assets/icons/Getplus.png')}
//   //         /> */}
//   //         <TouchableOpacity
//   //           style={{
//   //             position: 'absolute',
//   //             right: 20,
//   //             top: 10,
//   //             padding: 3,
//   //             backgroundColor: 'whitesmoke',
//   //             borderRadius: 20,
//   //           }}>
//   //           <MCI name="heart-outline" size={24} color="grey" />
//   //         </TouchableOpacity>
//   //         {/* <View
//   //           style={{
//   //             flexDirection: 'row',
//   //             alignItems: 'center',
//   //             position: 'absolute',
//   //             bottom: 20,
//   //             right: '4%',
//   //             backgroundColor: 'whitesmoke',
//   //             padding: 3,
//   //             borderRadius: 5,
//   //           }}>
//   //           <Image
//   //             source={require('../../assets/icons/rating.png')}
//   //             style={{ height: 20, width: 20, resizeMode: 'contain' }}
//   //           />
//   //           <Text
//   //             style={{
//   //               marginLeft: 5,
//   //               fontFamily: 'Gilroy-SemiBold',
//   //             }}>
//   //             {rating}
//   //           </Text>
//   //         </View> */}
//   //         {/* <View
//   //           style={{
//   //             backgroundColor: '#EA1A65',
//   //             position: 'absolute',
//   //             bottom: 20,
//   //             left: '0%',
//   //             flexDirection: 'row',
//   //             alignItems: 'center',
//   //             borderTopRightRadius: 10,
//   //             borderBottomRightRadius: 10,
//   //             paddingHorizontal: 10,
//   //             paddingVertical: 3,
//   //           }}>
//   //           <Image
//   //             source={require('../../assets/icons/time.png')}
//   //             style={{ height: 20, width: 20, resizeMode: 'contain' }}
//   //           />
//   //           <View style={{ marginLeft: 10 }}>
//   //             <Text
//   //               style={{
//   //                 color: 'white',
//   //                 fontSize: 12,
//   //                 fontFamily: 'Montserrat-Regular',
//   //               }}>
//   //               Available
//   //             </Text>
//   //             <Text
//   //               style={{
//   //                 fontWeight: 'bold',
//   //                 color: 'white',
//   //                 fontSize: 12,
//   //                 fontFamily: 'Montserrat-Regular',
//   //               }}>
//   //               Now
//   //             </Text>
//   //           </View>
//   //         </View> */}
//   //       </View>
//   //       <View
//   //         style={{
//   //           paddingHorizontal: 20,
//   //           backgroundColor: 'white',
//   //           borderTopLeftRadius: 10,
//   //           borderTopRightRadius: 10,
//   //           borderBottomLeftRadius: 10,
//   //           borderBottomRightRadius: 10,
//   //           marginTop: '-2%',
//   //         }}>
//   //         <View
//   //           style={{
//   //             flexDirection: 'row',
//   //             alignItems: 'flex-start',
//   //             justifyContent: 'space-between',
//   //             paddingTop: 5,
//   //           }}>
//   //           <View>
//   //             <Text
//   //               style={{
//   //                 fontSize: 18,
//   //                 // fontWeight: 'bold',
//   //                 fontFamily: 'Gilroy-SemiBold',
//   //               }}>
//   //               {drName}
//   //             </Text>
//   //             <Text
//   //               style={{
//   //                 color: 'rgba(0,0,0,0.4)',
//   //                 fontFamily: 'Gilroy-Medium',
//   //               }}>
//   //               {specialty} {specialty && education ? '|' : ''} {education}
//   //             </Text>
//   //           </View>

//   //           <View
//   //             style={{
//   //               flexDirection: 'column',
//   //               alignItems: 'flex-end',
//   //               marginBottom: 10,
//   //             }}>
//   //             {/* <View
//   //               style={{
//   //                 flexDirection: 'row',
//   //                 alignItems: 'center',
//   //                 paddingHorizontal: 8,
//   //                 paddingVertical: 3,
//   //                 backgroundColor: 'whitesmoke',
//   //                 borderRadius: 5,
//   //               }}>
//   //               <Image
//   //                 source={require('../../assets/icons/path.png')}
//   //                 style={{ height: 15, width: 15, resizeMode: 'contain' }}
//   //               />
//   //               <Text style={{ fontFamily: 'Gilroy-Medium' }}>
//   //                 {experience} Years
//   //               </Text>
//   //             </View> */}
//   //             {/* <View
//   //               style={{
//   //                 flexDirection: 'row',
//   //                 alignItems: 'center',
//   //                 paddingHorizontal: 8,
//   //                 paddingVertical: 3,
//   //                 backgroundColor: 'whitesmoke',
//   //                 borderRadius: 5,
//   //                 marginTop: 5,
//   //               }}>
//   //               <Image
//   //                 source={require('../../assets/icons/Patientslove.png')}
//   //                 style={{ height: 20, width: 20, resizeMode: 'contain' }}
//   //               />
//   //               <Text
//   //                 style={{
//   //                   color: 'black',
//   //                   marginLeft: 5,
//   //                   fontFamily: 'Gilroy-Medium',
//   //                 }}>
//   //                 800+ Consults
//   //               </Text>
//   //             </View> */}
//   //             {/* <View
//   //               style={{
//   //                 flexDirection: 'row',
//   //                 alignItems: 'center',
//   //                 // position: 'absolute',
//   //                 // bottom: 20,
//   //                 right: '4%',
//   //                 backgroundColor: 'whitesmoke',
//   //                 padding: 3,
//   //                 borderRadius: 5,
//   //               }}>
//   //               <Image
//   //                 source={require('../../assets/icons/rating.png')}
//   //                 style={{ height: 20, width: 20, resizeMode: 'contain' }}
//   //               />
//   //               <Text
//   //                 style={{
//   //                   marginLeft: 5,
//   //                   fontFamily: 'Gilroy-SemiBold',
//   //                 }}>
//   //                 {rating}
//   //               </Text>
//   //             </View> */}
//   //           </View>
//   //         </View>
//   //         <View
//   //           style={{
//   //             flexDirection: 'row',
//   //             alignItems: 'center',
//   //             justifyContent: 'space-between',
//   //           }}>
//   //           <View
//   //             style={{
//   //               flexDirection: 'row',
//   //               alignItems: 'center',
//   //               paddingHorizontal: 8,
//   //               paddingVertical: 3,
//   //               backgroundColor: 'whitesmoke',
//   //               borderRadius: 5,
//   //             }}>
//   //             <Image
//   //               source={require('../../assets/icons/path.png')}
//   //               style={{ height: 15, width: 15, resizeMode: 'contain' }}
//   //             />
//   //             <Text style={{ fontFamily: 'Gilroy-Medium' }}>
//   //               {experience} Years
//   //             </Text>
//   //           </View>
//   //           {/* <TouchableOpacity
//   //             style={{
//   //               borderWidth: 1,
//   //               borderColor: '#0676D5',
//   //               paddingVertical: 1,
//   //               paddingHorizontal: 30,
//   //               borderRadius: 30,
//   //             }}>
//   //             <View style={{ flexDirection: 'column', alignItems: 'center' }}>
//   //               <Text
//   //                 style={{
//   //                   fontSize: 17,

//   //                   fontFamily: 'Gilroy-SemiBold',
//   //                   color: '#0676D5',
//   //                 }}>
//   //                 Book
//   //               </Text>
//   //               <Text
//   //                 style={{
//   //                   fontSize: 17,
//   //                   fontFamily: 'Gilroy-SemiBold',
//   //                   color: '#0676D5',
//   //                 }}>
//   //                 Appointments
//   //               </Text>
//   //             </View>
//   //           </TouchableOpacity> */}
//   //           <ButtonCompo
//   //             pressHandler={() => {
//   //               let data = {
//   //                 ...doctor,
//   //                 appointments: [],
//   //                 desc,
//   //                 education: doctor.education ? doctor.education : [],
//   //               };
//   //               if (isLoggedin)
//   //                 navigation.navigate('DoctorProfileScreen', data);
//   //               else navigation.openDrawer();
//   //             }}
//   //             title="Book Appointment"
//   //             textStyle={{
//   //               fontSize: 15,
//   //               fontFamily: 'Gilroy-SemiBold',
//   //               lineHeight: 19,
//   //             }}
//   //           />
//   //           {/* <ButtonCompo
//   //             pressHandler={props.button}
//   //             title="Book Now"
//   //             textStyle={{
//   //               fontSize: 14,
//   //               fontFamily: 'Gilroy-SemiBold',
//   //             }}
//   //           /> */}
//   //         </View>
//   //       </View>
//   //     </Card>
//   //   </View>
//   // );
// };

// const BuildDoctorAvailibility = ({ text }) => {
//   return (
//     <View
//       style={{
//         paddingHorizontal: 6,
//         paddingVertical: 6,
//         backgroundColor: '#EEEEEE',
//         borderRadius: 4,
//       }}>
//       <Text
//         style={{
//           fontSize: 11,
//           fontFamily: 'Montserrat-Regular',
//           fontWeight: '800',
//         }}>
//         {text}
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   shadow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 20,
//     width: windowWidth - 32,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//   },
//   button_shadow: {
//     flexDirection: 'row',
//     // shadowColor: "#999999",
//     // shadowOpacity: 0.1,
//     // shadowRadius: 2,
//     // shadowOffset: {
//     //     height: 2,
//     //     width: 0
//     // },
//     // elevation: 4,
//     borderRadius: 4,
//     backgroundColor: '#EEEEEE',
//     paddingHorizontal: 6,
//     paddingVertical: 5,
//     alignItems: 'center',
//   },
//   button_bookAppointment: {
//     flexDirection: 'row',
//     shadowColor: '#000000',
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     shadowOffset: {
//       height: 2,
//       width: 0,
//     },
//     elevation: 12,
//     borderRadius: 30,
//     backgroundColor: '#3893e4',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
// });
