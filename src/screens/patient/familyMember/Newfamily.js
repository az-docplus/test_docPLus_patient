import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  Text,
  View,
  FlatList,
  RefreshControl,
  Alert,
  StyleSheet,
} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import FamilyItem from '../../../components/molecules/Family/FamilyItem';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import AddFamily from '../../../components/molecules/Modal/AddFamily';
import {useSelector, useDispatch} from 'react-redux';
import {
  GetFamilyMember,
  AddFamilyMember,
  // getpatientFamily,
} from '../../../reduxV2/action/PatientAction';
import {ListingWithThumbnailLoader} from '../../../components/atoms/Loader/Loader';
import LottieView from 'lottie-react-native';
import {Local, setLocale} from '../../../i18n';
import {Colors} from '../../../styles/colorsV2';
import Axios from 'axios';
import {Host} from '../../../utils/connection';

const NewFamily = ({navigation}) => {
  const updatePatient = `${Host}/patient/member/update`;
  const deletePatient = `${Host}/patient/member/delete`;
  const updatePatientFamily = (body) => Axios.post(updatePatient, body);
  const deletePatientFamily = (body) => Axios.post(deletePatient, body);

  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [addModal, setModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingData, setEditingData] = useState({});
  const {
    familyMember,
    gettingFamilyMember,
    // errorGettingFamilyMember,
    addingFamilyMember,
    // errorAddingFamilyMember,
  } = useSelector((state) => state.PatientReducer);
  const dispatch = useDispatch();
  const onFetchFamilyMember = useCallback(() => {
    if (userData.meta && typeof userData.meta == 'string') {
      dispatch(
        GetFamilyMember(userData.meta, (members) => {
          // console.log('members', members);
        }),
      );
    }
  }, [dispatch, userData.meta]);
  useEffect(() => {
    onFetchFamilyMember();
  }, [dispatch, onFetchFamilyMember, userData.meta]);

  useEffect(() => {
    console.log(editMode);
  }, [editMode]);

  const onSubmit = () => {
    const reg = new RegExp(
      // /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
      /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/,
    );
    const reg2 = new RegExp(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    );
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      birthdate,
      relationship,
    } = state;
    if (
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      phone !== '' &&
      gender !== '' &&
      birthdate !== '' &&
      relationship !== '' &&
      reg.test(birthdate) &&
      reg2.test(email) &&
      phone.length == 10
    ) {
      dispatch(AddFamilyMember(state, () => onClosePopup()));
    } else {
      firstName == '' &&
      lastName == '' &&
      email == '' &&
      phone == '' &&
      gender == '' &&
      birthdate == '' &&
      relationship == ''
        ? Alert.alert('One or more fields empty')
        : phone.length != 10
        ? Alert.alert('Incorrect Phone No.')  
        : !reg.test(birthdate)
        ? Alert.alert('Incorrect Date')
        : !reg2.test(email)
        ? Alert.alert('Invalid Email')
        : null;
    }
  };

  const extStyle = useMemo(() => {
    return {
      container: {
        ...styles.container,
        backgroundColor: Colors.primary_background[theme],
      },
      TopNavBar: {Container: {paddingTop: '2%', marginBottom: '3%'}},
      flatlistContainer: {
        flex: 1,
        backgroundColor: Colors.grey_background[theme],
      },
    };
  }, [theme]);

  const handleEdit = (data) => {
    console.log(data, '::::::::::::');
    setEditMode(true);
    setModal(true);
    setEditingData(data);
  };

  const handleDelete = (id) => {
    console.log(id, userData?.meta, ':::::::::::::');
    const body = {id, metaId: userData?.meta};
    deletePatientFamily(body).then((res) => {
      console.log(res.data);
      onFetchFamilyMember();
    });
  };
  const onCancel = useCallback(() => setModal(false), []);
  const onPressToOpenModal = useCallback(() => setModal(true), []);
  const onLeftButtonPress = useCallback(
    () => navigation.navigate('PatientLandingScreen'),
    [navigation],
  );
  return (
    <View style={extStyle.container}>
      <TopNavBar
        headerText={`${Local('patient.my_family.my_family')}`}
        onLeftButtonPress={onLeftButtonPress}
        navigation={navigation}
        style={extStyle.TopNavBar}
      />
      <AddFamily
        visible={addModal}
        setVisible={setModal}
        onCancel={onCancel}
        onUpdate={onSubmit}
        buttonLoading={addingFamilyMember}
        editingData={editingData}
        editMode={editMode}
      />
      <View style={extStyle.flatlistContainer}>
        <FlatList
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={gettingFamilyMember}
              size={24}
              onRefresh={onFetchFamilyMember}
            />
          }
          refreshing={gettingFamilyMember}
          onRefresh={onFetchFamilyMember}
          data={familyMember}
          ListEmptyComponent={
            <ListEmptyComponent loading={gettingFamilyMember} theme={theme} />
          }
          style={styles.flatlist}
          renderItem={({item}) => {
            if (gettingFamilyMember) {
              return <ListingWithThumbnailLoader />;
            }
            return (
              <FamilyItem
                data={item}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            );
          }}
        />
      </View>
      <View style={styles.ActionButtonContainer}>
        <NewItem
          text={`${Local('patient.my_family.add_member')}`}
          onPress={() => {
            setModal(true);
            setEditMode(false);
          }}
        />
      </View>
    </View>
  );
};

function ListEmptyComponent({loading, theme}) {
  const textStyle = useMemo(() => {
    return {
      color: Colors.primary_text_color[theme],
      marginBottom: '10%',
    };
  }, [theme]);
  if (loading) {
    return <ListingWithThumbnailLoader />;
  }
  return (
    <View style={styles.listEmptyComponentContainer}>
      <LottieView
        style={styles.LottieView}
        source={require('../../../assets/anim_svg/empty_bottle.json')}
        autoPlay
        loop
      />
      <Text style={textStyle}>
        {Local('patient.my_family.no_family_member_added')}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1},
  flatlist: {flex: 1, padding: 20},
  ActionButtonContainer: {
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
    bottom: 25,
  },
  listEmptyComponentContainer: {
    height: 200,
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LottieView: {height: '100%', width: '100%'},
});

export default NewFamily;
