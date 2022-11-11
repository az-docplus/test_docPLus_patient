import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Image,
  BackHandler,
} from 'react-native';
import BlurSpinner from '../../../components/molecules/Modal/BlurLoadingOverlay';
import {NEW_PRIMARY_LIGHT_BG} from '../../../styles/colors';
import ConditionItem from '../../../components/molecules/MedicalHistory/ConditionItem';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import AddMed from '../../../components/molecules/Modal/AddMed';
import {useSelector, useDispatch} from 'react-redux';
import {
  GetMedicine,
  AddMedicine,
  EditMedicine,
} from '../../../reduxV2/action/PatientAction';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {ListingWithThumbnailLoader} from '../../../components/atoms/Loader/Loader';
import LottieView from 'lottie-react-native';
import {showMessage} from 'react-native-flash-message';
import {
  NEW_PRIMARY_BACKGROUND,
  // SUCCESS,
  // SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import DatePicker from 'react-native-datepicker';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import {BottomSheet, ListItem} from 'react-native-elements';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';
import AddConditionModal from '../../../components/molecules/Modal/AddCondition';
import Axios from 'axios';
import {Host} from '../../../utils/connection';

const Template = ({navigation}) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [modalVisible, setVisible] = useState(false);
  const [editMode, seteditMode] = useState(false);
  const [editingData, seteditingData] = useState({});
  const [conditions, setConditions] = useState([]);
  const [allConditions, setAllConditions] = useState([]);
  const {
    medicines,
    gettingMedicine,
    addMedicineLoading,
    patient,
    isPatientAccountReducerLoading,
  } = useSelector((state) => state.PatientReducer);

  useEffect(() => {
    !modalVisible && seteditMode(false)
  }, [modalVisible])

  const {isPatientFamilyMember, patientFamilyMemberDetails} = patient;
  const dispatch = useDispatch();
  const AddCondition = (body) =>
    Axios.post(`${Host}/doctors/prescription/template/create`, body);
  const EditCondition = (body) =>
    Axios.put(`${Host}/doctors/prescription/template/edit`, body);
  const GetConditions = (id) =>
    Axios.get(`${Host}/doctors/prescription/template/get/${id}`);
  const DeleteCondition = (id) =>
    Axios.delete(`${Host}/doctors/prescription/template/delete/${id}`);
  useEffect(() => {
    GetConditions(userData._id)
      .then((res) => {
        console.log(res.data.data, "%%%%%%%%%%%%%%%%%%%%%");
        const {data} = res.data;

        setConditions(data);
        setAllConditions(data);
        // this.filterCategories();
      })
      .catch((err) => {
        console.log(err);
      });

    // dispatch(
    //   GetMedicine(
    //     isPatientFamilyMember
    //       ? patientFamilyMemberDetails.meta
    //       : patient?.meta?._id,
    //   ),
    // );
  }, []);

  const successCallback = () => {
    showMessage({
      message: 'My message title',
      description: 'My message description',
      type: 'success',
    });
  };
  const onUpdate = (values, id, createNew = true) => {
    // console.log(values.medicines, '::::::::::::::::::::::::::::');
    if (editMode && !createNew) {
      const obj = {
        condition: values.condition,
        medicines: values.medicines,
        reports: values.reports,
        _id: editingData.id,
        doctor: userData._id,
      };
      console.log(obj, 'OOOOOOOOOOOOOOOOOOOOOOOOOOO');
      EditCondition(obj)
        .then((res) => {
          console.log(res);
          GetConditions(userData._id).then((res) => {
            // console.log({res});
            const {data} = res.data;
            setConditions(data);
            // this.filterCategories();
          });
        })
        .catch((err) => {
          console.log(err.response.data, "sdfjdslkfjdsklfjd");
        });
    } else {
      const obj = {
        condition: values.condition,
        medicines: values.medicines,
        reports: values.reports,
        doctor: userData._id,
      };

      console.log(obj, 'dsklfjdslfjsdlkfjsdklfjdsklfjdskfjdlfjdslkfjdskfjdfjdslfjdslkfjfkfjdslfkjdkfjdf')
      AddCondition(obj)
        .then((res) => {
          // console.log(res.data.data, "%%%%%%%%%%%%%%%%%%%%%%%");
          GetConditions(userData._id).then((res) => {
            console.log({res});
            const {data} = res.data;
            setConditions(data);
            setAllConditions(data);
            // this.filterCategories();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    seteditMode(false);
  };

  const handleEdit = (data, id) => {
    seteditMode(true);
    setVisible(true);
    console.log(data, "?????????????????????????????????????????????????????")
    seteditingData({...data, id});
  };

  const handleDelete = (id) => {
    DeleteCondition(id)
      .then((res) => {
        console.log({res});
        GetConditions(userData._id).then((res) => {
          console.log({res});
          const {data} = res.data;
          setConditions(data);
          setAllConditions(data);
          // this.filterCategories();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [state, setState] = useState(medicines);
  const [isVisible, setIsVisible] = useState(false);

  const handleBackButtonClick = () => {
    setVisible(false);
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  useEffect(() => {
    setState(medicines);
  }, [medicines]);

  const onEndEditing = (search) => {
    if (search === '') setConditions(allConditions);
    else {
      const data = allConditions.filter((item, index) => {
          if (item.condition.toLowerCase().includes(search.toLowerCase())) {
            return item
          }
      })
       
      setConditions(data);
  };
}

  const handleSortByName = () => {
    const data = [];
    medicines.map((item) => {
      item.medicines.map((med) => {
        if (data.indexOf(med.name.toLowerCase()) === -1) {
          data.push(med.name.toLowerCase());
        }
      });
    });
    const sortedMeds = data.sort();
    const finalMeds = [];
    sortedMeds.map((medName) => {
      medicines.map((item) => {
        item.medicines.map((med) => {
          if (med.name.toLowerCase() == medName) {
            finalMeds.push(item);
          }
        });
      });
    });
    setState(finalMeds);
    setIsVisible(false);
  };

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
        setIsVisible(false);
        setState(medicines);
        setcustomDates({
          startDate: '',
          endDate: '',
        });
      },
    },
    {
      title: 'Cancel',
      containerStyle: {backgroundColor: SECONDARY_BACKGROUND},
      titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
      onPress: () => setIsVisible(false),
    },
  ];
  const handleCustomDates = () => {
    if (customDates.startDate !== '' && customDates.endDate !== '') {
      const data = [];
      medicines.map((item) => {
        const temp = {
          ...item,
          medicines: [],
        };
        item.medicines.map((med) => {
          if (
            new Date(med.date).getTime() >
              new Date(customDates.startDate).getTime() &&
            new Date(med.date).getTime() <
              new Date(customDates.endDate).getTime()
          )
            temp.medicines.push(med);
        });
        if (temp.medicines.length > 0) data.push(temp);
      });
      setState(data);
      setcustomDates({
        startDate: '',
        endDate: '',
      });
      setIsVisible(false);
    }
  };

  const [customDates, setcustomDates] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    handleCustomDates();
  }, [customDates]);

  return (
    <View style={{marginTop: '0%', backgroundColor: Colors.primary_background[theme], paddingBottom: "60%"}}>
      <TopNavBar navigation={navigation} headerText={`${Local("doctor.Settings.template")}`} />
      <AddConditionModal
        setVisible={setVisible}
        visible={modalVisible}
        editMode={editMode}
        setEditMode={seteditMode}
        data={editingData}
        onCancel={() => {
          seteditMode(false);
          setVisible(false);
          seteditingData({});
        }}
        onUpdate={onUpdate}
      />
      {isPatientAccountReducerLoading && (
        <BlurSpinner visible={isPatientAccountReducerLoading}>
          <ActivityIndicator color={NEW_PRIMARY_BACKGROUND} size="large" />
        </BlurSpinner>
      )}
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
        <ListItem
          key={10}
          containerStyle={{
            paddingBottom: 0,
            backgroundColor: Colors.bottom_sheet_bg[theme],
          }}
          onPress={handleCustomDates}>
          <ListItem.Content style={{padding: 0}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // borderColor: NEW_PRIMARY_BACKGROUND,
                  borderColor: Colors.ctx_secondary_color[theme],
                  borderBottomWidth: 1.5,
                  marginBottom: 15,
                }}>
                <DatePicker
                  style={[{borderBottomWidth: 0, marginBottom: 0}]}
                  date={customDates.startDate}
                  mode="date"
                  placeholder={`${Local(
                    'patient?.medical_history.select_date',
                  )}`}
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    // dateInput:{borderWidth: 0},
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                      borderWidth: 0,
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(text) => {
                    setcustomDates({...customDates, startDate: text});
                  }}
                />
              </View>
              <Text
                style={{
                  marginHorizontal: 12,
                  fontSize: 20,
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  fontFamily: 'Montserrat-Medium',
                }}>
                {Local('doctor.medical_history.to')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: Colors.ctx_secondary_color[theme],
                  borderBottomWidth: 1.5,
                  marginBottom: 15,
                }}>
                <DatePicker
                  style={[{borderBottomWidth: 0, marginBottom: 0}]}
                  date={customDates.endDate}
                  mode="date"
                  placeholder={`${Local(
                    'patient?.medical_history.select_date',
                  )}`}
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    // dateInput:{borderWidth: 0},
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                      borderWidth: 0,
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(text) => {
                    setcustomDates({...customDates, endDate: text});
                  }}
                />
              </View>
            </View>
          </ListItem.Content>
        </ListItem>

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
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.secondary_background[theme],
          marginTop: '0%',
          paddingVertical: '2%',
        }}>
        <SearchBarSolid
          withIcon={true}
          // handleBottomList={() => setIsVisible(true)}
          onEndEditing={onEndEditing}
          placeholderTextColor={Colors.search_placeholder_text[theme]}
          // placeholder={`${Local("doctor.appointments.search_by_name")}`}
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
          //     style={{ height: 24, width: 24, marginLeft: 8 }}
          //   />
          // }
          style={{
            backgroundColor: Colors.search_background[theme],
            borderRadius: 10,
            elevation: 2,
          }}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 70,
          backgroundColor: Colors.primary_background[theme],
        }}>
        {/* {Object.keys(dummyData).map((disease) => (
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 18,
                marginBottom: 10,
              }}>
              {disease}
            </Text> */}

        {false ? (
          <ListingWithThumbnailLoader />
        ) : conditions.length === 0 ? (
          <View
            style={{
              height: 260,
              width: '70%',
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.primary_background[theme],
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
                fontFamily: 'Montserrat-Medium',
                fontSize: 20,
                color: Colors.primary_text_color[theme],
              }}>
              {/* {Local('doctor.medical_history.no_medicine_added')} */}
              {Local("doctor.template.no_temp_added")}
            </Text>
          </View>
        ) : (
          conditions?.map((item, index) => {
            // console.log(conditions, "55555555555555555555555555555555555555")
            if (!item) return null;
            return (
              <ConditionItem
                medId={item._id}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                key={item._id}
                data={item}
              />
            );
          })
        )}
        {/* </View>
        ))} */}
        <NewItem text={`${Local("doctor.template.add_temp")}`} onPress={() => setVisible(true)} />
      </ScrollView>
    </View>
  );
};

export default Template;
