import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import StaffList from '../../../components/molecules/Staff/StaffList';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import AddEmail from '../../../components/molecules/Modal/AddEmail';
import { useSelector, useDispatch } from 'react-redux';
import { SendInvitation, GetStaffMembers, UpdateStaffMemberPermissions } from '../../../reduxV2/action/DoctorAction';
import { ListingWithThumbnailLoader } from '../../../components/atoms/Loader/Loader';
import LottieView from 'lottie-react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import { BottomSheet, ListItem } from 'react-native-elements'
import {
  GREY_BACKGROUND,
  SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_COLOR,
  SECONDARY_BACKGROUND
} from '../../../styles/colors';
import {Colors} from '../../../styles/colorsV2';

const MyStaff = ({ navigation }) => {
  const {theme} = useSelector((state) => state.AuthReducer);
  const [modalVisible, setVisible] = useState(false);
  const [Data, setData] = useState({})
  const [editMode, seteditMode] = useState(false)

  const {
    gettingStaff,
    staff,
  } = useSelector(
    (state) => state.DoctorReducer,
  );
  const { userData } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetStaffMembers(userData._id));
  }, []);

  const onUpdate = (ClinicDetails) => {
    const obj = {
      doctor: userData._id,
      ...ClinicDetails,
      ClinicType: "owned",
    };
    dispatch(Addstaff(obj));
  };

  const handleInviteEmail = (credential, permissions) => {
    const body = {
      practise: userData._id,
      email: credential.email,
      phone: credential.phone,
      name: credential.name,
      access_type: permissions.toString()
    }
    dispatch(SendInvitation(body))
    setVisible(false)
    setData({})
    seteditMode(false)
  }

  const handleEdit = (data) => {
    seteditMode(true)
    setVisible(true)
    setData(data)
  }

  const UpdatePermissions = (credential, permissions) => {
    const obj = {
      id: credential._id,
      doctor: userData._id,
      access_type: permissions
    }
    dispatch(UpdateStaffMemberPermissions(obj))
    setVisible(false)
    setData({})
    seteditMode(false)
  }
  const [state, setState] = useState(staff)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setState(staff)
  }, [staff])

  const onEndEditing = (search) => {
    if (search === '') setState(staff)
    else {
      const s = staff.filter((p, id) => {
        if (
          (s.name).toLowerCase().includes(search.toLowerCase())
          //  || (patient.lastName).toLowerCase().includes(search.toLowerCase())
        )
          return p
      })
      setState(s);
    }
  };

  const handleSortByName = () => {
    const sortedStaff = staff.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    setState(sortedStaff)
    setIsVisible(false)
  }
  const list = [
    {
      title: 'Sort by name',
      titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
      onPress: handleSortByName,
    },
    {
      title: 'Reset',
      titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
      onPress: () => { setIsVisible(false); setState(staff) },
    },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: SECONDARY_BACKGROUND },
      titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary_background[theme], }}>
      <TopNavBar
        navigation={navigation}
        headerText={'My staff'}>
      </TopNavBar>
      <AddEmail
        visible={modalVisible}
        setVisible={setVisible}
        staff={true}
        editMode={editMode}
        data={Data}
        onCancel={() => {
          // seteditMode(true)
          seteditMode(false)
          setData({})
          setVisible(false)
        }}
        onUpdate={
          !editMode
            ? handleInviteEmail
            : UpdatePermissions
        }
      />
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
      >
        {list.map((l, i) => (
          <ListItem key={i} containerStyle={[l.containerStyle, {backgroundColor: Colors.bottom_sheet_bg[theme]}]} onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title style={[l.titleStyle, {color: Colors.primary_text_color[theme]}]}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      <View
        style={{
          backgroundColor: Colors.secondary_background[theme],
          paddingVertical: '4%',
          alignItems: 'center',
          justifyContent: 'center',
          // marginTop: '2%',
          paddingTop: "2%"
        }}>
        <SearchBarSolid
          withIcon={true}
          handleBottomList={() => setIsVisible(true)}
          onEndEditing={onEndEditing}
          // placeholderTextColor={SEARCH_PLACEHOLDER_COLOR}
          placeholderTextColor={Colors.search_placeholder_text[theme]}
          placeholder={'Search by name'}
          searchIcon={
            <Image
              source={require('../../../assets/icons/search.png')}
              style={{ height: 20, width: 18 }}
              color={SEARCH_PLACEHOLDER_COLOR}
            />
          }
          icon={
            <Image
              source={require('../../../assets/icons/configure.png')}
              style={{ height: 24, width: 24, marginLeft: 8 }}
            />
          }
          style={{
            backgroundColor: Colors.search_background[theme],
            // color: Colors.primary_text_color[theme],
            borderRadius: 10,
            elevation: 2,
          }}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          // backgroundColor: Colors.primary_background[theme],
        }}>
        {gettingStaff ? (
          <ListingWithThumbnailLoader />
        ) : state && state.length === 0 ? (
          <View
            style={{
              height: 260,
              width: '70%',
              alignSelf: 'center',
              justifyContent: 'center',
              paddingBottom: "12%",
              alignItems: 'center',
              marginTop: '12%'
            }}>

            <LottieView
              style={{ height: '100%', width: '100%' }}
              source={require('../../../assets/anim_svg/empty_bottle.json')}
              autoPlay
              loop
            />
            <Text style={{ textAlign: "center", fontFamily: "Montserrat-Medium", fontSize: 20, color: Colors.primary_text_color[theme], }}>
              No Staff Member
		      	</Text>
          </View>
        ) : (
              state && state.map((item) => <StaffList handleEdit={handleEdit} key={item._id} data={item} />)
            )}
        {/* </View>
        ))} */}
        <NewItem
          text="Invite"
          onPress={() => {
            seteditMode(false)
            setVisible(true)
          }}
        />
      </ScrollView>
    </View >
  );
};

export default MyStaff;
