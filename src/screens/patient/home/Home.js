// import React, {useState, useCallback, useRef, useEffect} from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   Animated,
//   Easing,
//   ActivityIndicator,
// } from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import Header from '../../../components/old/header/header.component';
// import RoundedImageHolder from '../../../components/old/RoundedImageHolder/roundedImageHolder.component';
// import BottomNavigation from '../../../components/old/BottomNavigation/BottomNavigation.component';
// import {ScrollView, FlatList} from 'react-native-gesture-handler';
// import SearchBar from '../../../components/old/SearchBar/searchbar.component';
// import BasicCard from '../../../components/old/BasicCard/basicCard.component';
// import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import CardContent from '../../../components/old/Card/card.component';
// import ScheduleAppointment from '../../../components/old/Schedule/scheduleAppointment.component';
// import ToggleButton from '../../../components/old/ToggleButton/toggleButton.component';
// import ContentContainer from '../../../components/old/ContentContainer/contentContainer.component';
// import {
//   fetchDoctors,
//   fetchDoctorLite,
//   searchDoctorLite,
// } from '../../../redux/action/doctoreAction';
// import {text, color} from '../../config/styles/color';

// const getRecent3 = output => {
//   const s = new Date();
//   let pp = output.filter(
//     // items => new Date().toISOString() < items.bookedFor,
//     // items => items.bookedFor < '2020-04-09T23:59:35.604Z',
//     items =>
//       items.bookedFor <
//       `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}T23:59:35.604Z`,
//   );
//   pp = pp.slice(0, 3);
//   let res = [];
//   let mm = [
//     {time: '_:_', available: false},
//     {time: '_:_', available: false},
//     {time: '_:_', available: false},
//   ];
//   pp.map(it => {
//     let c = new Date(it.bookedFor);
//     let a = it.available;
//     let _time = c.getHours() + ':' + c.getMinutes();

//     res.push({time: _time, available: a});
//   });

//   return res.length < 3 ? mm : res;
// };

import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
// import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import DmzText from '../../../components/atoms/DmzText/DmzText';
import ToggleButton from '../../../components/molecules/ToggleButton/ToggleButton';
import DmzSearchbar from '../../../components/molecules/DmzSeachbar/DmzSearchbar';
import Section from '../../../components/molecules/Section/Section';
import AvailDoctorContainer from '../../../components/molecules/AvailDoctorContainer/AvailDoctorContainer';
import FancyHeader from '../../../components/organisms/FancyHeader/FancyHeader';
import Container from '../../../components/organisms/Container/Container';
import ScheduleAppointment from '../../../components/organisms/ScheduleAppointment/ScheduleAppointment';
import BottomNavigationComponent from '../../../components/old/BottomNavigation/BottomNavigation.component';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchDoctorLite,
  fetchMoreDoctorLite,
  searchDoctors,
  fetchSuperDoc,
} from '../../../reduxV2/action/DoctorToPatientAction';
import {FlatList} from 'react-native-gesture-handler';
import {
  RowLoader,
  ListingWithThumbnailLoader,
} from '../../../components/atoms/Loader/Loader';
import {GetPatientInfo} from '../../../reduxV2/action/PatientAction';

import _ from 'lodash';

const Home = ({navigation}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const PopupTranslateY = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const {
    doctors,
    loading,
    moreDoctorLoading,
    searchDoctorsLoading,
    searchedDoctors,
    superDocsLoading,
    superDocs,
  } = useSelector((state) => state.DoctorReducer);
  const {isLogedin, isDoctor, data} = useSelector((state) => state.AuthReducer);
  const [activeId, setActiveId] = useState('');
  const [page, setPage] = useState(0);
  const [toggle, setToggle] = useState(0);
  const [disEnd, setDisEnd] = useState(0);
  const [trigger, setTrigger] = useState(true);
  var __id = '';

  if (isDoctor && isLogedin) navigation.navigate('doctorHomePage');

  useEffect(() => {
    //console.log(
    //   '--------------------------------Home----------------------------',
    //   data,
    // );
    console.log(activeId);
    dispatch(fetchDoctorLite('', 0, false));
    isLogedin && dispatch(GetPatientInfo(data.id));
  }, []);

  const onPress = (id) => {
    setActiveId(id);
    __id = id;
    Animated.sequence([
      Animated.timing(PopupTranslateY, {
        toValue: showPopup ? 0 : 1,
        easing: Easing.bezier(0.52, 0.5, 0.08, 0.78),
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
    setShowPopup(!showPopup);
  };

  const fetchMore = (e) => {
    console.log(`reached end ${e.distanceFromEnd}`);
    setDisEnd(disEnd + e.distanceFromEnd);
    setPage(page + 1);
  };

  const onScroll = () => {
    // console.log(`content y offset ${nativeEvent.contentOffset.y}===${disEnd}`);
    // console.log(disEnd);
    // if (nativeEvent.contentOffset.y >= disEnd && nativeEvent.contentOffset.y < disEnd + 5) {
    let val = page + 1;
    dispatch(fetchMoreDoctorLite(page, false));
    setPage(val);
    // }
  };

  /**
   * ok ---
   */

  const fetch = () => {
    let val = page + 1;
    dispatch(fetchMoreDoctorLite(page, false));
    setPage(val);
  };

  const onEndEditing = ({nativeEvent}) => {
    dispatch(searchDoctors(searchKey, 1));
  };
  const onChangeText = (text) => {
    setSearchKey(text);
  };
  const onToggle = () => {
    setToggle(toggle === 0 ? 1 : 0);
    if (toggle === 0) {
      dispatch(fetchSuperDoc(0));
    }
  };
  return (
    <>
      <View style={FindDoctorScreenStyles.Container}>
        <FancyHeader
          navigation={navigation}
          LeftComp={null}
          style={{
            Container: {height: '40%'},
            ChildContainer: {alignItems: 'center', marginTop: '-10%'},
          }}>
          <DmzText
            text={'Find a doctor'}
            style={FindDoctorScreenStyles.HeaderPrimaryText}
          />
          <ToggleButton
            toggle={toggle}
            onToggle={onToggle}
            text0="NOW"
            text1="SCHEDULE"
          />
        </FancyHeader>

        <Container
          style={{
            height: '65%',
            transform: [{translateY: -50}],
            zIndex: 999,
          }}>
          {/* <ScrollView style={{marginTop: 8}}> */}
          <DmzSearchbar
            placeholder={'seach your patient'}
            onEndEditing={onEndEditing}
            onChangeText={onChangeText}
          />
          <Section
            style={{Container: {marginBottom: 80}}}
            HeaderText="Available Doctors">
            {loading || searchDoctorsLoading || superDocsLoading ? (
              <ListingWithThumbnailLoader />
            ) : searchedDoctors.length && searchKey !== '' ? (
              <FlatList
                // extraData={doctors}
                data={searchedDoctors}
                renderItem={({item}) => (
                  <AvailDoctorContainer
                    toggle={toggle}
                    data={item}
                    navigation={navigation}
                    onPress={() => onPress(item._id)}
                    id={item._id}
                    name={item.basic.name.slice(0, 15).concat('...')}
                    // schedule={item.output.filter(
                    //   it => it.bookedFor.slice(0, 10) === '2020-05-07',
                    // )}
                  />
                )}
              />
            ) : !toggle ? (
              <FlatList
                initialNumToRender={5}
                onMomentumScrollBegin={() => setTrigger(false)}
                onEndReached={({distanceFromEnd}) => {
                  if (!trigger) {
                    fetch();
                    setTrigger(true);
                  }
                }}
                // onScroll={onScroll}
                ListEmptyComponent={
                  <View
                    style={{
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>Empty</Text>
                  </View>
                }
                onEndReachedThreshold={1}
                ListFooterComponent={moreDoctorLoading && <ActivityIndicator />}
                // extraData={doctors}
                data={doctors}
                renderItem={({item}) => (
                  <AvailDoctorContainer
                    toggle={toggle}
                    data={item}
                    navigation={navigation}
                    onPress={() => onPress(item._id)}
                    id={item._id}
                    name={item.basic.name.slice(0, 15).concat('...')}
                    // schedule={item.output.filter(
                    //   o => o.bookedFor.slice(0, 10) === '2020-05-07',
                    // )}
                  />
                )}
              />
            ) : (
              <FlatList
                initialNumToRender={5}
                ListEmptyComponent={
                  <View
                    style={{
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>Empty superDocs</Text>
                  </View>
                }
                // ListFooterComponent={moreDoctorLoading && <ActivityIndicator />}
                // extraData={doctors}
                data={superDocs}
                renderItem={({item}) => (
                  <AvailDoctorContainer
                    toggle={toggle}
                    data={item}
                    navigation={navigation}
                    onPress={() => onPress(item._id)}
                    id={item._id}
                    name={item.basic.name.slice(0, 15).concat('...')}
                    // schedule={item.output.filter(
                    //   o => o.bookedFor.slice(0, 10) === '2020-05-07',
                    // )}
                  />
                )}
              />
            )}
          </Section>
          {/* </ScrollView> */}
        </Container>
        {isLogedin ? (
          <BottomNavigationComponent
            PopupTranslateY={PopupTranslateY}
            activeOption={1}
            navigation={navigation}
          />
        ) : null}
        {/* <BottomNavigation PopupTranslateY={PopupTranslateY} acti/> */}
        {/* <ScheduleAppointment
          doctors={doctors[0]}
          activeId={__id}
          PopupTranslateY={PopupTranslateY}
          onPress={onPress}
          showPopup={showPopup}
          // obj ={ _.dropRightWhile(doctors, ['_id', __id])}
        /> */}
      </View>
    </>
  );
};

const FindDoctorScreenStyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  HeaderPrimaryText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: -15,
  },
  ContentCardContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  CatagoryScroll: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  },
  CatagoryText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  AvailableDoctors: {
    flex: 1,
    marginTop: 10,
  },
  AvailableDoctorsHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 25,
  },
});
export default Home;

// function Home({navigation}) {
//   const [showPopup, setShowPopup] = useState(false);
//   const PopupTranslateY = useRef(new Animated.Value(0)).current;

//   const dispatch = useDispatch();
//   const [search, setSearch] = useState('');
//   const [mode, setMode] = useState(false);
//   const [section, setSection] = useState('Top Doctors');
//   const [page, setPage] = useState(0);
//   const [searchPageIndex, setSearchPageIndex] = useState(0);

//   const doctors = useSelector(state => state.DoctorReducer);
//   const {isLogedin, isDoctor} = useSelector(state => state.AuthReducer);
//   var tougl = false;

//   useEffect(() => {
//     // (isDoctor && isLogedin) && props.navigation.navigate('Doctor')
//     // console.log(` isDoctor: ${isDoctor} and isLogedin: ${isLogedin}`)

//     enableSomeButton();
//   }, []);

//   const handelSearchInput = _text => {
//     console.log(_text);
//     setSearch(_text);
//   };

//   const handelSearchSubmit = () => {
//     enableSomeButton();
//   };

//   const handelMode = () => {
//     enableSomeButton();
//     setMode(!mode);
//     tougl = !tougl;
//   };

//   const _fetch = () => {
//     console.log('ennnnnd');
//   };

//   function enableSomeButton() {
//     let page_index = search.length === 0 ? page : searchPageIndex;
//     dispatch(fetchDoctorLite(search, page_index, mode));
//     search.length === 0
//       ? setPage(page + 1)
//       : setSearchPageIndex(searchPageIndex);
//   }

//   const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
//     const paddingToBottom = 20;
//     return (
//       layoutMeasurement.height + contentOffset.y >=
//       contentSize.height - paddingToBottom
//     );
//   };

//   const onPress = () => {
//     Animated.sequence([
//       Animated.timing(PopupTranslateY, {
//         toValue: showPopup ? 0 : 1,
//         easing: Easing.bezier(0.52, 0.5, 0.08, 0.78),
//         duration: 800,
//         useNativeDriver: true,
//       }),
//     ]).start();
//     setShowPopup(!showPopup);
//   };

//   return (
//     <View style={FindDoctorScreenStyles.Container}>
//       <Header
//         style={{
//           Container: {
//             backgroundColor: '#7774F5',
//             flex: 3,
//           },
//         }}
//         hideOverlay="true"
//         ProfileNavPic={
//           <RoundedImageHolder
//             style={{
//               ImageWrapper: {
//                 height: 42,
//                 width: 42,
//               },
//             }}
//             sourceUrl={require('../../../assets/jpg/person1.jpg')}
//           />
//         }>
//         <Text style={FindDoctorScreenStyles.HeaderPrimaryText}>
//           Find a doctor
//         </Text>
//         <ToggleButton text="NOW" />
//       </Header>
//       <ContentContainer
//         style={{
//           Container: {
//             flex: 5,
//           },
//         }}>
//         <ScrollView style={{marginTop: 8}}>
//           <SearchBar />
//           <ScrollView
//             horizontal={true}
//             style={{
//               marginLeft: 'auto',
//               marginRight: 'auto',
//               width: '90%',
//             }}
//             contentContainerStyle={FindDoctorScreenStyles.ContentCardContainer}>
//             <BasicCard
//               style={{
//                 CardContainer: {
//                   backgroundColor: '#6231CB',
//                 },
//               }}>
//               <Icon name="people" size={42} color="#fff" />
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: 12,
//                   fontWeight: 'bold',
//                   marginTop: 5,
//                 }}>
//                 Family Physicians
//               </Text>
//             </BasicCard>
//             <BasicCard
//               style={{
//                 CardContainer: {},
//               }}>
//               <Icon name="people" size={42} color="#000" />
//               <Text
//                 style={{
//                   color: '#000',
//                   fontSize: 12,
//                   fontWeight: 'bold',
//                   marginTop: 5,
//                 }}>
//                 Pulmonologists
//               </Text>
//             </BasicCard>
//             <BasicCard
//               style={{
//                 CardContainer: {},
//               }}>
//               <Icon name="heart" size={42} color="#000" />
//               <Text
//                 style={{
//                   color: '#000',
//                   fontSize: 12,
//                   fontWeight: 'bold',
//                   marginTop: 5,
//                 }}>
//                 Cardiologist
//               </Text>
//             </BasicCard>
//           </ScrollView>
//           <View style={FindDoctorScreenStyles.AvailableDoctors}>
//             <Text style={FindDoctorScreenStyles.AvailableDoctorsHeaderText}>
//               Available Doctors
//             </Text>
//             <View style={FindDoctorScreenStyles.AvailableDoctorsCardContainer}>
//               {doctors.loading && (
//                 //   <Text
//                 //     style={{
//                 //       textAlign: 'center',
//                 //       fontSize: 11,
//                 //       fontWeight: '300',
//                 //       marginBottom: 20,
//                 //     }}>
//                 //     Fetching doctors..
//                 //   </Text>
//                 <ActivityIndicator size="large" color={'#8D2FFF'} />
//               )}
//               {/* <BasicCard
//                                                 style={{
//                                                       CardContainer: {
//                                                             marginLeft: 20,
//                                                             marginRight: 20,
//                                                             marginBottom: 15,
//                                                             alignItems: 'flex-start',
//                                                             height: 'auto',
//                                                             position: 'relative',
//                                                             paddingBottom: 25,
//                                                       },
//                                                 }}>
//                                                 <CardContent
//                                                       DoctorName="Dr.Haley"
//                                                       rating={4}
//                                                       onPress={() => navigation.navigate('DoctorDetails')}
//                                                       Specialization="General Dentist"
//                                                       Profile={
//                                                             <RoundedImageHolder
//                                                                   sourceUrl={require('../../../assets/jpg/person2.jpg')}
//                                                                   style={{
//                                                                         ImageWrapper: {
//                                                                               height: 70,
//                                                                               width: 70,
//                                                                         },
//                                                                   }}
//                                                             />
//                                                       }
//                                                 />
//                                           </BasicCard> */}
//               {!doctors.loading && doctors.doctors.length <= 0 && (
//                 <Text
//                   style={{
//                     textAlign: 'center',
//                     fontSize: 11,
//                     fontWeight: '300',
//                     marginBottom: 20,
//                   }}>
//                   no doctor available.
//                 </Text>
//               )}

//               <FlatList
//                 initialNumToRender="3"
//                 data={doctors.doctors}
//                 renderItem={(item, index) => {
//                   console.log(item.index);
//                   return (
//                     // <DoctorOption
//                     //       name={item.item.basic.name}
//                     //       tag={item.item.specialty || 'Unknown'}
//                     //       key={item.index}
//                     //       isActive={item.isActive}
//                     //       nav={this.props.nav}
//                     //       id={item.item._id}
//                     //       schedule={getRecent3(item.item.output)}
//                     // />
//                     <BasicCard
//                       style={{
//                         CardContainer: {
//                           marginLeft: 20,
//                           marginRight: 20,
//                           marginBottom: 15,
//                           alignItems: 'flex-start',
//                           height: 'auto',
//                           position: 'relative',
//                           paddingBottom: 25,
//                         },
//                       }}>
//                       <CardContent
//                         data={{
//                           name: item.item.basic.name,
//                           tag: item.item.specialty || 'Unknown',
//                           key: item.index,
//                           isActive: item.isActive,
//                           nav: this.props.nav,
//                           id: item.item._id,
//                           schedule: getRecent3(item.item.output),
//                         }}
//                         nav={navigation}
//                         onPress={() => {
//                           onPress();
//                         }}
//                         DoctorName="Dr.Smith"
//                         rating={5}
//                         Specialization="Orthodontist"
//                         Profile={
//                           <RoundedImageHolder
//                             sourceUrl={require('../../../assets/jpg/person4.jpg')}
//                             style={{
//                               ImageWrapper: {
//                                 height: 70,
//                                 width: 70,
//                               },
//                             }}
//                           />
//                         }
//                       />
//                     </BasicCard>
//                   );
//                 }}
//                 keyExtractor={(item, index) => String(index)}
//               />

//               <BasicCard
//                 style={{
//                   CardContainer: {
//                     marginLeft: 20,
//                     marginRight: 20,
//                     marginBottom: 15,
//                     alignItems: 'flex-start',
//                     height: 'auto',
//                     position: 'relative',
//                     paddingBottom: 25,
//                   },
//                 }}>
//                 <CardContent
//                   nav={navigation}
//                   onPress={() => {
//                     onPress();
//                   }}
//                   DoctorName="Dr.Smith"
//                   rating={5}
//                   Specialization="Orthodontist"
//                   Profile={
//                     <RoundedImageHolder
//                       sourceUrl={require('../../../assets/jpg/person4.jpg')}
//                       style={{
//                         ImageWrapper: {
//                           height: 70,
//                           width: 70,
//                         },
//                       }}
//                     />
//                   }
//                 />
//               </BasicCard>
//               {/* <BasicCard
//                                                 style={{
//                                                       CardContainer: {
//                                                             marginLeft: 20,
//                                                             marginRight: 20,
//                                                             marginBottom: 15,
//                                                             alignItems: 'flex-start',
//                                                             height: 'auto',
//                                                             position: 'relative',
//                                                             paddingBottom: 25,
//                                                       },
//                                                 }}>
//                                                 <CardContent
//                                                       onPress={() => {
//                                                             onPress();
//                                                       }}
//                                                       DoctorName="Dr.Smith"
//                                                       rating={5}
//                                                       Specialization="Orthodontist"
//                                                       Profile={
//                                                             <RoundedImageHolder
//                                                                   sourceUrl={require('../../../assets/jpg/person4.jpg')}
//                                                                   style={{
//                                                                         ImageWrapper: {
//                                                                               height: 70,
//                                                                               width: 70,
//                                                                         },
//                                                                   }}
//                                                             />
//                                                       }
//                                                 />
//                                           </BasicCard> */}
//             </View>
//           </View>
//         </ScrollView>
//       </ContentContainer>
//       <BottomNavigation PopupTranslateY={PopupTranslateY} />
//       <ScheduleAppointment
//         PopupTranslateY={PopupTranslateY}
//         onPress={onPress}
//       />
//     </View>
//   );
// }

// const FindDoctorScreenStyles = StyleSheet.create({
//   Container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   HeaderPrimaryText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginTop: -10,
//   },
//   // Content: {
//   //   // position: 'absolute',
//   //   width: '100%',
//   //   backgroundColor: '#fefefe',
//   //   // bottom: 0,
//   //   borderTopLeftRadius: 38,
//   //   borderTopRightRadius: 38,
//   //   transform: [
//   //     {
//   //       translateY: -60,
//   //     },
//   //   ],
//   // },
//   ContentCardContainer: {
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//   },
//   AvailableDoctors: {
//     flex: 1,
//     marginTop: 10,
//   },
//   AvailableDoctorsHeaderText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 25,
//   },
//   AvailableDoctorsCardContainer: {
//     marginTop: 15,
//   },
// });
// export default Home;
