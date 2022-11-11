import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StatusBar} from 'react-native';
import {GREY_BACKGROUND} from '../../../styles/colors';
import TeamList from '../../../components/molecules/Teams/TeamMembers';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import AddTeamModal from '../../../components/molecules/Modal/AddTeam';
import {GetTeams, AddTeam} from '../../../reduxV2/action/DoctorAction';
import {ListingWithThumbnailLoader} from '../../../components/atoms/Loader/Loader';
import LottieView from 'lottie-react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../../../styles/colorsV2';
import {BackHandler} from 'react-native';

const Teams = ({navigation, route}) => {
  const {theme} = useSelector((state) => state.AuthReducer);
  const {practise, _id} = route.params;
  const [modalVisible, setVisible] = useState(false);
  // const {
  //   gettingTeams,
  //   Teams,
  // } = useSelector(
  //   (state) => state.DoctorReducer,
  // );
  // const { userData } = useSelector((state) => state.AuthReducer);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //    dispatch(GetTeams(userData._id));
  // }, []);
  // console.log(Teams)

  // const onUpdate = (details) => {
  //   const obj = {
  //     practiceid: userData._id,
  //     ...details
  //   };
  //   dispatch(AddTeam(obj));
  //   setVisible(false)
  // };

  //system back button
  useEffect(() => {
    function handleBackButton() {
      navigation.navigate('Teams');
      return true;
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    //system back button

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.primary_background[theme]}}>
      <StatusBar
        animated
        backgroundColor={Colors.secondary_background[theme]}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
      />
      <TopNavBar
        navigation={navigation}
        onLeftButtonPress={() => {
          navigation.navigate('Teams');
        }}
        headerText={'Team Members'}></TopNavBar>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}>
        {practise.map((item) => (
          <TeamList teamId={_id} key={item._id} data={item} />
        ))}
        <NewItem
          text="Add Members"
          onPress={() => navigation.navigate('InviteDoctors', {teamId: _id})}
        />
      </ScrollView>
    </View>
  );
};

export default Teams;
