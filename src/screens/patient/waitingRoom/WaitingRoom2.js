// import React from 'react';
// import { View, Text } from 'react-native';
// import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
// import { Local } from '../../../i18n';

// export default function WaitingRoom2({ navigation, route }) {
//   const { doctor, Slot, nextSlot } = route.params;
//   return (
//     <View>
//       <TopNavBar
//         navigation={navigation}
//         headerText={`${Local('doctor.waiting.appointment_with')}`}
//       />
//       <DoctorTopCompo
//         appointmentTime={appointmentTime}
//         recentPatient={recentPatient}
//         coverPhoto={doctor?.coverPhoto}
//         name={doctor?.basic?.name}
//         specialty={doctor?.specialty || doctor?.specialties[0]}
//         study={doctor?.educationDetails}
//         experience={doctor?.experience}
//         price={doctor?.fee}
//         id={doctor}
//         date={date}
//         slot={Slot}
//       />
//       <Text></Text>
//     </View>
//   );
// }

// const DoctorTopCompo = ({
//   coverPhoto,
//   name,
//   specialty,
//   study,
//   experience,
//   price,
//   id,
//   date,
//   slot,
//   recentPatient,
//   appointmentTime,
// }) => {
//   console.log('coverPhoto============>>>>>>>>', coverPhoto);
//   name = name?.split(' ');
//   const img = coverPhoto ? (
//     <Image
//       source={{
//         uri: `${Host}${coverPhoto.replace('public', '').replace('\\\\', '/')}`,
//       }}
//       style={{ width: 80, height: 80, borderRadius: 100 }}
//     />
//   ) : (
//     <PicturelessAvatar
//       style={{
//         color: '#000',
//         backgroundColor: '#f9f9f9',
//         width: 90,
//         height: 90,
//         borderRadius: 100,
//       }}
//       textStyle={{ fontSize: 32 }}
//       text={`${name[0][0]}${name[1][0]}`}
//     />
//   );
//   return (
//     <View
//       style={{
//         marginVertical: 20,
//         marginHorizontal: 15,
//         elevation: 6,
//         backgroundColor: '#fff',
//         borderRadius: 13,
//         paddingHorizontal: 15,
//         paddingVertical: 15,
//         marginTop: 23,
//       }}>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}>
//         {img}
//         <View
//           style={{
//             flex: 1,
//             marginLeft: 10,
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }}>
//             <Text
//               style={{
//                 fontSize: 18,
//                 fontFamily: 'Gilroy-SemiBold',
//               }}>
//               Dr. {name}
//             </Text>
//             {/* <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//             }}>
//             <AntDesignIcon name="star" size={17} color="#FCC02A" />
//             <Text
//               style={{
//                 fontFamily: 'Montserrat-SemiBold',
//                 fontSize: 14,
//                 marginLeft: 5,
//               }}>
//               {rate}
//             </Text>
//           </View> */}
//             <Favorites setLoading={() => {}} doctor={id} />
//           </View>
//           <View
//             style={{
//               marginTop: 7,
//             }}>
//             <Text style={{ fontFamily: 'Gilroy-Regular' }}>
//               <Text style={{ fontFamily: 'Gilroy-Regular' }}>
//                 {specialty} |{' '}
//               </Text>
//               <Text style={{ fontFamily: 'Gilroy-Regular' }}>{study} </Text>
//             </Text>
//           </View>
//           <View
//             style={{
//               marginTop: 7,
//             }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 // justifyContent: 'space-evenly',
//               }}>
//               {/* <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   padding: 5,
//                   borderRadius: 5,
//                   backgroundColor: '#EEEEEE',
//                 }}>
//                 <AntDesign size={16} name="star" color="#FFBF46" />

//                 <Text style={{ fontFamily: 'Gilroy-SemiBold' }}> 4.5</Text>
//               </View> */}
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   padding: 5,
//                   borderRadius: 5,
//                   backgroundColor: '#EEEEEE',
//                   marginRight: 10,
//                 }}>
//                 <SimpleLineIcons size={16} name="badge" color="#EA1A65" />

//                 <Text style={{ fontFamily: 'Gilroy-Medium' }}>
//                   {' '}
//                   {experience} years
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   padding: 5,
//                   borderRadius: 5,
//                   backgroundColor: '#EEEEEE',
//                 }}>
//                 <FontAwesome5 size={16} name="user-friends" color="#077EE9" />

//                 <Text style={{ fontFamily: 'Gilroy-Medium' }}>
//                   {' '}
//                   {recentPatient.length} Consults
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//       <View
//         style={{
//           height: 1,
//           backgroundColor: '#EEEEEE',
//           marginTop: 10,
//           marginBottom: 10,
//         }}
//       />
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           marginTop: 6,
//         }}>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//           }}>
//           <FontAwesome name="calendar-check-o" color="#297281" size={20} />
//           <Text
//             style={{
//               fontFamily: 'Gilroy-Medium',
//               fontSize: 14,
//               marginLeft: 10,
//             }}>
//             {moment(slot ? slot.bookedFor : appointmentTime?.bookedFor).format(
//               'dddd, DD MMMM YYYY, hh:mm A',
//             )}
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//           }}>
//           <FontAwesomeIcon name="rupee" color="#000" size={16} />
//           <Text
//             style={{
//               ...styles.text,
//               fontSize: 18,
//               fontFamily: 'Gilroy',
//               fontWeight: '800',
//               marginLeft: 3,
//             }}>
//             {price}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };
