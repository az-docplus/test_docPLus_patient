import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import {
  GREY_BACKGROUND,
  SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_BACKGROUND,
  NEW_PRIMARY_COLOR,
  NEW_HEADER_TEXT,
  INPUT_PLACEHOLDER,
} from '../../../styles/colors';
import TeamList from '../../../components/molecules/Teams/TeamList';
import RequestList from '../../../components/molecules/Teams/doctorList';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import AddTeamModal from '../../../components/molecules/Modal/AddTeam';
import {useSelector, useDispatch} from 'react-redux';
import {
  GetTeams,
  AddTeam,
  GetPendingRequests,
  GetSentRequests,
} from '../../../reduxV2/action/DoctorAction';
import {ListingWithThumbnailLoader} from '../../../components/atoms/Loader/Loader';
import LottieView from 'lottie-react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import {
  // BottomSheet,
  ListItem,
} from 'react-native-elements';
import {BottomSheet} from 'react-native-btr';
import {Colors} from '../../../styles/colorsV2';
import {Color} from 'react-native-agora';
import {Local, setLocale} from '../../../i18n';
import {BackHandler} from 'react-native';

const Teams = ({navigation}) => {
  //system back button
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Home');
      BackHandler.removeEventListener('hardwareBackPress', () => {});
      return true;
    });
  }, [navigation]);
  //system back button
  const [modalVisible, setVisible] = useState(false);
  //system back button
  const [goback, setGoback] = useState(false);
  //system back button
  const [isRequestTab, setisRequestTab] = useState(false);
  const {
    gettingTeams,
    Teams,
    PendingRequests,
    sentRequests,
    gettingPendingRequests,
  } = useSelector((state) => state.DoctorReducer);

  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTeams(userData?._id));
    dispatch(GetPendingRequests(userData?._id));
    dispatch(GetSentRequests(userData?._id));
  }, []);

  const onUpdate = (details) => {
    const obj = {
      practiceid: userData?._id,
      ...details,
    };
    dispatch(AddTeam(obj));
    setVisible(false);
  };

  const [state, setState] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setState(Teams);
    console.log(Teams, '????????????????');
  }, [Teams]);

  const onEndEditing = (search) => {
    if (search === '') setState(Teams);
    else {
      const c = Teams.filter((p, id) => {
        if (
          p.name.toLowerCase().includes(search.toLowerCase())
          //  || (patient.lastName).toLowerCase().includes(search.toLowerCase())
        )
          return p;
      });
      setState(c);
    }
  };

  const handleSortByName = () => {
    const sortedStaff = Teams.sort((a, b) => {
      console.log(a.name, b.name, '::::::::::::');
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      // const _A = a.name
      // const _B = b.name
      // _A.toLowerCase().localeCompare(_B.toLowerCase())
    });
    console.log(sortedStaff, '??????????????');
    setState(sortedStaff);
    setIsVisible(false);
  };

  useEffect(() => {
    console.log(state, ':::::::::::');
  }, [state]);

  const list = [
    {
      title: 'Sort by name',
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: handleSortByName,
    },
    {
      title: 'Reset',
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: () => {
        setState(Teams);
        setIsVisible(false);
      },
    },
    {
      title: 'Cancel',
      containerStyle: {backgroundColor: SECONDARY_BACKGROUND},
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: () => setIsVisible(false),
    },
  ];
  console.log('pendingRequesr ', PendingRequests);

  return (
    <View style={{flex: 1, backgroundColor: Colors.primary_background[theme]}}>
      <TopNavBar
        navigation={navigation}
        headerText={`${Local('doctor.my_teams.my_teams')}`}></TopNavBar>
      <AddTeamModal
        setVisible={setVisible}
        visible={modalVisible}
        onCancel={() => setVisible(false)}
        onUpdate={onUpdate}
      />

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.secondary_background[theme],
          paddingHorizontal: '8%',
          paddingVertical: '3%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={() => {
              setisRequestTab(false);
            }}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                color: !isRequestTab
                  ? Colors.primary_text_color[theme]
                  : Colors.input_placeholder_color[theme],
                fontSize: 18,
                fontFamily: !isRequestTab
                  ? 'Montserrat-Bold'
                  : 'Montserrat-Regular',
              }}>
              {Local('doctor.my_teams.teams')}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            borderLeftWidth: 2,
            borderColor: NEW_PRIMARY_COLOR,
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={() => {
              setisRequestTab(true);
            }}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                color: isRequestTab
                  ? Colors.primary_text_color[theme]
                  : Colors.input_placeholder_color[theme],
                fontSize: 18,
                fontFamily: isRequestTab
                  ? 'Montserrat-Bold'
                  : 'Montserrat-Regular',
              }}>
              {Local('doctor.my_teams.requests')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isRequestTab ? (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}>
          {/* <BottomSheet
              onBackButtonPress={() => setIsVisible(false)}
              visible={isVisible}
              onBackdropPress={() => setIsVisible(false)}
              // isVisible={isVisible}
              containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
            >
              {list.map((l, i) => (
                <ListItem key={i} onPress={l.onPress} containerStyle={[l.containerStyle, {backgroundColor: Colors.bottom_sheet_bg[theme]}]}>
                  <ListItem.Content>
                    <ListItem.Title style={[l.titleStyle, {color: Colors.primary_text_color[theme]}]}>{l.title}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </BottomSheet>
            <View
              style={{
                paddingVertical: '4%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.secondary_background[theme]
    
              }}>
              <SearchBarSolid
                withIcon={true}
                handleBottomList={() => setIsVisible(true)}
                onEndEditing={onEndEditing}
                placeholderTextColor={Colors.search_placeholder_text[theme]}
                placeholder={'Search by name'}
                searchIcon={
                  <Image
                    source={require('../../../assets/icons/search.png')}
                    style={{ height: 20, width: 18 }}
                    color={Colors.search_placeholder_text[theme]}
                  />
                }
                icon={
                  <Image
                    source={require('../../../assets/icons/configure.png')}
                    style={{ height: 24, width: 24, marginLeft: 8 }}
                  />
                }
                style={{
                  backgroundColor: Colors.primary_background[theme],
                  borderRadius: 10,
                  elevation: 2,
                }}
              />
            </View> */}
          <View>
            {gettingTeams ? (
              <ListingWithThumbnailLoader />
            ) : PendingRequests.length == 0 ? (
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
                  {Local('doctor.my_teams.no_pending_requests')}
                </Text>
              </View>
            ) : (
              PendingRequests &&
              PendingRequests.map(
                (item) =>
                  item?._id && (
                    <RequestList
                      pending={true}
                      navigation={navigation}
                      key={item?._id}
                      data={item}
                    />
                  ),
              )
            )}
          </View>
        </ScrollView>
      ) : (
        <View>
          <BottomSheet
            onBackButtonPress={() => setIsVisible(false)}
            visible={isVisible}
            onBackdropPress={() => setIsVisible(false)}
            // isVisible={isVisible}
            containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
            {list.map((l, i) => (
              <ListItem
                key={i}
                onPress={l.onPress}
                containerStyle={[
                  l.containerStyle,
                  {backgroundColor: Colors.bottom_sheet_bg[theme]},
                ]}>
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
              paddingVertical: '4%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <SearchBarSolid
              withIcon={true}
              handleBottomList={() => setIsVisible(true)}
              onEndEditing={onEndEditing}
              onChangeText={onEndEditing}
              placeholderTextColor={Colors.search_placeholder_text[theme]}
              // placeholder={'Search by name'}
              searchIcon={
                <Image
                  source={require('../../../assets/icons/search.png')}
                  style={{height: 20, width: 18}}
                  color={Colors.search_placeholder_text[theme]}
                />
              }
              // icon={
              //   <Image
              //     source={require('../../../assets/icons/configure.png')}
              //     style={{height: 24, width: 24, marginLeft: 8}}
              //   />
              // }
              style={{
                backgroundColor: Colors.primary_background[theme],
                borderRadius: 10,
                elevation: 2,
              }}
            />
          </View>

          {gettingTeams ? (
            <ListingWithThumbnailLoader />
          ) : state && state.length === 0 ? (
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
                {Local('doctor.my_teams.no_teams_found')}
              </Text>
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 20,
              }}>
              {state &&
                state.map((item) => {
                  if (item.name !== userData?._id) {
                    return (
                      <TeamList
                        navigation={navigation}
                        key={item?._id}
                        data={item}
                      />
                    );
                  }
                })}
            </ScrollView>
          )}
          <NewItem text="Add Team" onPress={() => setVisible(true)} />
        </View>
      )}
    </View>
  );
};

export default Teams;
