import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {Text, View, Image, FlatList, RefreshControl} from 'react-native';
import {
  // GREY_BACKGROUND,
  SEARCH_PLACEHOLDER_COLOR,
  // SECONDARY_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import ClinicList from '../../../components/molecules/Clincs/Clinic';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
//import AddClinic from '../../../components/molecules/Modal/AddClinic';
import {useSelector, useDispatch} from 'react-redux';
import {GetClinics, AddClinics} from '../../../reduxV2/action/DoctorAction';
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
import {Local, setLocale} from '../../../i18n';
import {Host} from "../../../utils/connection"
import Axios from "axios"

const Clinic = ({navigation}) => {

  const Update = `${Host}/patient/member/update`;
  const UpdateClinics = (body) =>
  Axios.post(Update, body);
  
  const Delete = `${Host}/clinic/delete`;
  const DeleteClinics = (id) =>
  Axios.delete(Delete + `/${id}`);


  const {theme} = useSelector((state) => state.AuthReducer);
  const {gettingClincs, Clinics} = useSelector((state) => state.DoctorReducer);
  const [localClinicState, setLocalClinicState] = useState([]);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const {userData} = useSelector((state) => state.AuthReducer);
  const [searchKeyword, setSearchKeyword] = useState('');
  const dispatch = useDispatch();
  const fetchClinics = useCallback(() => {
    dispatch(GetClinics(userData._id));
  }, [dispatch, userData._id]);
  useEffect(() => {
    fetchClinics();
  }, [fetchClinics]);
  useEffect(() => {
    setLocalClinicState(Clinics);
  }, [Clinics]);

  const [editMode, setEditMode] = useState(false)
  const [editingData, setEditingData] = useState({})

  const handleEdit = (data) => {
    console.log(data, "::::::::::::")
    setEditMode(true)
    // setModal(true)
    setEditingData(data)
    navigation.navigate('AddClinic', {editMode, editingData})
  }

  const handleDelete = (id) => {
    console.log(id, ":::::::::::::")
    DeleteClinics(id).then(() => {
      fetchClinics();
    })
    // const body = { id, metaId: userData?.meta };
    // deletePatientFamily(body).then((res) => {
    //   console.log(res.data)
    //   onFetchFamilyMember()
    // })
  }

  const onEndEditing = useCallback(
    (search) => {
      let currentState = [];
      if (search === '') {
        currentState = Clinics;
      } else {
        const c = Clinics.filter((p, id) => {
          if (p.ClinicName.toLowerCase().includes(search.toLowerCase())) {
            return p;
          }
        });
        currentState = c;
      }
      setLocalClinicState(currentState);
    },
    [Clinics],
  );
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      onEndEditing(searchKeyword);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [onEndEditing, searchKeyword]);
  const handleSortByH2L = useCallback(() => {
    setIsBottomSheetVisible(false);
    setLocalClinicState((prevState) => {
      const sortedClinics = prevState.sort((a, b) => b.Fees - a.Fees);
      return sortedClinics;
    });
  }, []);
  const handleSortByL2H = useCallback(() => {
    setIsBottomSheetVisible(false);
    setLocalClinicState((prevState) => {
      const sortedClinics = prevState.sort((a, b) => a.Fees - b.Fees);
      return sortedClinics;
    });
  }, []);
  const list = useMemo(() => {
    return [
      {
        title: 'High to low',
        titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
        onPress: handleSortByH2L,
      },
      {
        title: 'Low to high',
        titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
        onPress: handleSortByL2H,
      },
      {
        title: 'Reset',
        titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
        onPress: () => {
          setIsBottomSheetVisible(false);
          setLocalClinicState(Clinics);
        },
      },
      {
        title: 'Cancel',
        containerStyle: {backgroundColor: SECONDARY_BACKGROUND},
        titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
        onPress: () => setIsBottomSheetVisible(false),
      },
    ];
  }, [Clinics, handleSortByH2L, handleSortByL2H]);
  const hideBottomSheet = useCallback(() => setIsBottomSheetVisible(false), []);
  const showBottomSheet = useCallback(() => setIsBottomSheetVisible(true), []);
  return (
    <View style={{flex: 1, backgroundColor: Colors.primary_background[theme]}}>
      <TopNavBar navigation={navigation} headerText={'Clinics'} />
      <BottomSheet
        onBackButtonPress={hideBottomSheet}
        visible={isBottomSheetVisible}
        onBackdropPress={hideBottomSheet}
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
      <View
        style={{
          backgroundColor: Colors.secondary_background[theme],
          paddingVertical: '4%',
          alignItems: 'center',
          justifyContent: 'center',
          // marginTop: '2%',
          paddingTop: '2%',
        }}>
        <SearchBarSolid
          withIcon={true}
          handleBottomList={showBottomSheet}
          onEndEditing={onEndEditing}
          extTextChange={setSearchKeyword}
          placeholderTextColor={SEARCH_PLACEHOLDER_COLOR}
          placeholder={'clinic'}
          searchIcon={
            <Image
              source={require('../../../assets/icons/search.png')}
              style={{height: 20, width: 18}}
              color={SEARCH_PLACEHOLDER_COLOR}
            />
          }
          icon={
            <Image
              source={require('../../../assets/icons/configure.png')}
              style={{height: 24, width: 24, marginLeft: 8}}
            />
          }
          style={{
            // backgroundColor: SECONDARY_BACKGROUND,
            backgroundColor: Colors.search_background[theme],
            color: Colors.primary_text_color[theme],
            borderRadius: 10,
            elevation: 2,
          }}
        />
      </View>

      <FlatList
        data={localClinicState}
        refreshControl={
          <RefreshControl refreshing={gettingClincs} onRefresh={fetchClinics} />
        }
        ListFooterComponent={
          <NewItem
        
        text="Add Clinic"
        onPress={() => navigation.navigate('AddClinic', {editMode, editingData})}
        //onPress={() => setVisible(true)}
      />
        }
        refreshing={gettingClincs}
        onRefresh={fetchClinics}
        ListEmptyComponent={
          <ListEmptyComponent loading={gettingClincs} theme={theme} />
        }
        keyExtractor={(item) => item._id}
        renderItem={({item}) => {
          return <ClinicList data={item} handleEdit={handleEdit} handleDelete={handleDelete} />;
        }}
      />
      {/* <NewItem
        
        text="Add Clinic"
        onPress={() => navigation.navigate('AddClinic')}
        //onPress={() => setVisible(true)}
      /> */}
    </View>
  );
};

function ListEmptyComponent({loading, theme}) {
  if (loading) {
    return <ListingWithThumbnailLoader />;
  }

  return (
    <View
      style={{
        height: 260,
        width: '70%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingBottom: '12%',
        alignItems: 'center',
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
          fontFamily: 'Montserrat-Medium',
          fontSize: 20,
          color: Colors.primary_text_color[theme],
        }}>
        {Local('doctor.clinics.no_clinics_found')}
      </Text>
    </View>
  );
}

export default Clinic;
