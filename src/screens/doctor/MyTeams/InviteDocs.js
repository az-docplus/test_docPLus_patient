import React, {useState, useRef, useEffect} from 'react';
import NewToggleButton from '../../../components/molecules/ToggleButton/NewToggleButton';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import BasicCard from '../../../components/atoms/BasicCard/BasicCard';
import Section from '../../../components/molecules/Section/Section';
import AvailDoctorContainerV2 from '../../../components/molecules/AvailDoctorContainer/AvailDoctorContainerV2';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {useDispatch, useSelector} from 'react-redux';
import TeamList from '../../../components/molecules/Teams/doctorList';
import EmailModal from '../../../components/molecules/Modal/AddEmail';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';

import {
  View,
  ScrollView,
  Text,
  FlatList,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  BackHandler,
} from 'react-native';

import {
  fetchDoctorLite,
  fetchMoreDoctorLite,
  searchDoctors,
  fetchSuperDoc,
} from '../../../reduxV2/action/DoctorToPatientAction';

import {ListingWithThumbnailLoader} from '../../../components/atoms/Loader/Loader';
import {
  NEW_PRIMARY_COLOR,
  NEW_HEADER_TEXT,
  SEARCH_PLACEHOLDER_COLOR,
  PRIMARY_BACKGROUND,
  SECONDARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_BACKGROUND,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import Toast from 'react-native-root-toast';
import {
  getSpecialty,
  SendInvitation,
} from '../../../reduxV2/action/DoctorAction';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import {
  // BottomSheet,
  ListItem,
} from 'react-native-elements';
import {BottomSheet} from 'react-native-btr';
import Axios from 'axios';
import {Host} from '../../../utils/connection';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';

function LandingPage({navigation, route}) {
  const {teamId} = route.params;
  const screenHeight = Dimensions.get('window').height;
  const PopupTranslateY = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setisModalVisible] = useState(false);
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
  const {specialtyLoading, specialty, sentRequests} = useSelector(
    (state) => state.DoctorReducer,
  );
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [state, setState] = useState(doctors);
  const [searchKey, setSearchKey] = useState('');
  const [activeId, setActiveId] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [backCount, setBackCount] = useState(true);
  const [page, setPage] = useState(1);
  const [toggle, setToggle] = useState(0);
  const [disEnd, setDisEnd] = useState(0);
  const [trigger, setTrigger] = useState(true);
  const [praticeIDs, setPraticeIDs] = useState([]);

  useEffect(() => {
    setState(doctors);
  }, [doctors]);

  useEffect(() => {
    const backAction = () => {
      // navigation.goBack()
      navigation.navigate('TeamMembers');
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

  useEffect(() => {
    const _praticeIDs = [];
    sentRequests.map((doc, index) => {
      const {practise} = doc;
      if (practise) {
        const {_id} = practise;
        _praticeIDs.push(_id || '');
      }
    });
    setPraticeIDs(_praticeIDs);
    dispatch(fetchDoctorLite('', 0, false));
    !specialtyLoading && dispatch(getSpecialty());
  }, [sentRequests]);

  const tempSpecialityIcons = [
    require('../../../assets/icons/lungs.png'),
    require('../../../assets/icons/heart.png'),
    require('../../../assets/icons/neuro.png'),
    require('../../../assets/icons/heart.png'),
    require('../../../assets/icons/neuro.png'),
    require('../../../assets/icons/heart.png'),
  ];

  const headerPos = useRef(new Animated.Value(0)).current;
  const onPress = (id) => {
    setActiveId(id);
    __id = id;
    Animated.sequence([
      Animated.timing(PopupTranslateY, {
        toValue: showPopup ? 0 : 1,
        // easing: Easing.bezier(0.52, 0.5, 0.08, 0.78),
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
    setShowPopup(!showPopup);
  };

  const _fetchMoreDoctorLite = () => {
    let val = page + 1;
    dispatch(fetchMoreDoctorLite('', page, false));
    setPage(val);
  };

  const onEndEditing = (search) => {
    dispatch(searchDoctors(search, 1));
    setSearchKey(search);
  };

  const onToggle = () => {
    setToggle(toggle === 0 ? 1 : 0);
    if (toggle === 0) {
      dispatch(fetchSuperDoc(0));
    }
  };

  let yOffset = 0;
  headerPos.addListener((value) => {
    yOffset = value;
  });

  const scrollAnimation = async (e) => {
    var vel = e.nativeEvent.velocity.y;
    console.log(e);
    if (vel < 0) {
      console.log('in');
      Animated.timing(headerPos, {
        toValue: 300,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(headerPos, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  const onSearchDoctorRefresh = () => {
    dispatch(searchDoctors(searchKey, 1));
  };
  const onDoctorsRefresh = () => {
    dispatch(fetchDoctorLite('', 0, false));
  };
  const onSuperDocRefresh = () => {
    dispatch(fetchSuperDoc(0));
  };

  const headerViewStyle = headerPos.interpolate({
    inputRange: [0, 250],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerInterpolated = headerPos.interpolate({
    inputRange: [300, 350],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const transaleInterpolate = headerPos.interpolate({
    inputRange: [200, 350],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });
  const handleSortByName = () => {
    const sortedDoctors = state.sort((a, b) =>
      a.basic.name.localeCompare(b.basic.name),
    );
    console.log(sortedDoctors);
    setState(sortedDoctors);
    setIsVisible(false);
  };
  const sortByGender = (sex) => {
    const filteredDocs = doctors.filter((doc, id) => {
      if (doc.gender && doc.gender.toLowerCase() === sex.toLowerCase())
        return doc;
    });
    setState(filteredDocs);
    setIsVisible(false);
  };

  const ResetDoctors = () => {
    setState(doctors);
    setIsVisible(false);
  };
  const [isVisible, setIsVisible] = useState(false);

  const list = [
    {
      title: 'All Doctors',
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: ResetDoctors,
    },
    {
      title: 'Female Doctors',
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: () => sortByGender('Female'),
    },
    {
      title: 'Male Doctors',
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: () => sortByGender('Male'),
    },
    {
      title: 'Sort by name',
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: handleSortByName,
    },
    {
      title: 'Cancel',
      containerStyle: {backgroundColor: SECONDARY_BACKGROUND},
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: () => setIsVisible(false),
    },
  ];

  const handleInviteEmail = (email, phone, permissions) => {
    const body = {
      practise: userData._id,
      email,
      teamid: teamId,
      phone,
      //  access_type: permissions.toString()
    };
    dispatch(SendInvitation(body));
    setisModalVisible(false);
  };

  return (
    <>
      <StatusBar
        animated
        backgroundColor={Colors.secondary_background[theme]}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
      />
      <EmailModal
        visible={isModalVisible}
        onCancel={() => setisModalVisible(false)}
        onUpdate={handleInviteEmail}
      />
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
      {/* <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} /> */}
      <View
        style={{flex: 1, backgroundColor: Colors.primary_background[theme]}}>
        <Toast
          visible={toastVisible}
          position={screenHeight * 0.9}
          shadow={true}
          animation={true}
          hideOnPress={true}>
          {Local('patient.landing_page.exit_toast')}
        </Toast>
        <TopNavBar
          onLeftButtonPress={() => {
            navigation.navigate('TeamMembers');
          }}
          // onRightButtonPress={() => {}}
          navigation={navigation}
          style={{
            Container: {
              height: '5%',
              // marginTop: '4%',
              paddingVertical: '4%',
              paddingTop: '3%',
            },
          }}
          headerText={`${Local('doctor.my_staff.invite_doctor')}`}
        />
        <ScrollView>
          <View
            style={{
              paddingVertical: '4%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <SearchBarSolid
              withIcon
              handleBottomList={() => setIsVisible(true)}
              placeholderTextColor={Colors.search_placeholder_text[theme]}
              icon={
                <Image
                  source={require('../../../assets/icons/configure.png')}
                  style={{height: 24, width: 24}}
                />
              }
              searchIcon={
                <Image
                  source={require('../../../assets/icons/search.png')}
                  style={{height: 20, width: 18}}
                  color={Colors.search_placeholder_text}
                />
              }
              onEndEditing={onEndEditing}
              style={{
                backgroundColor: Colors.search_background[theme],
                borderRadius: 10,
                elevation: 2,
              }}
            />
          </View>
          <View style={{paddingHorizontal: '4%', marginTop: '4%'}}>
            {loading || searchDoctorsLoading || superDocsLoading ? (
              <ListingWithThumbnailLoader style={{marginTop: 20}} />
            ) : searchedDoctors.length !== 0 && searchKey !== '' ? (
              <FlatList
                keyExtractor={(item) => item._id}
                data={searchedDoctors}
                refreshControl={
                  <RefreshControl
                    refreshing={searchDoctorsLoading}
                    onRefresh={onSearchDoctorRefresh}
                  />
                }
                nestedScrollEnabled
                ListEmptyComponent={
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
                      No doctor found
                    </Text>
                  </View>
                }
                renderItem={({item, index}) => (
                  <TeamList
                    praticeIDs={praticeIDs}
                    key={item._id}
                    teamId={teamId}
                    data={item}
                  />
                )}
              />
            ) : (
              <View>
                {state.map((item) => (
                  <TeamList
                    praticeIDs={praticeIDs}
                    key={item._id}
                    teamId={teamId}
                    data={item}
                  />
                ))}
              </View>
            )}
          </View>
          <DmzButton
            onPress={() => {
              setisModalVisible(true);
            }}
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
                marginVertical: 20,
                elevation: 3,
              },
            }}
            text="Invite via email"
          />
        </ScrollView>
      </View>
    </>
  );
}

export default LandingPage;
