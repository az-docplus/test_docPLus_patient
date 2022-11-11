import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import SurgeriesItem from '../../../components/molecules/MedicalHistory/SurgeriesItem';
import AddSurgery from '../../../components/molecules/Modal/AddSurgery';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { GetSurguries, AddSurguries, EditSurguries } from '../../../reduxV2/action/PatientAction';
import BlurSpinner from '../../../components/molecules/Modal/BlurLoadingOverlay'
import { NEW_PRIMARY_COLOR, NEW_PRIMARY_BACKGROUND } from '../../../styles/colors';
import {
  SUCCESS,
  SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import { BottomSheet, ListItem } from 'react-native-elements'
import DatePicker from 'react-native-datepicker';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';

const Surgeries = ({ params }) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [modalVisible, setVisible] = useState(false);
  const {
    gettingSurguries,
    surguries,
    patient,
    isPatientAccountReducerLoading } = useSelector(state => state.PatientReducer)

  const dispatch = useDispatch()
  const { isPatientFamilyMember, patientFamilyMemberDetails } = patient

  useEffect(() => {
    !gettingSurguries && dispatch(GetSurguries(isPatientFamilyMember ? patientFamilyMemberDetails.meta : patient.meta._id || patient.meta))
  }, [])

  const [editMode, seteditMode] = useState(false);
  const [editingData, seteditingData] = useState({})

  const handleEdit = (data) => {
    seteditMode(true)
    setVisible(true)
    seteditingData(data)
  }
  const [state, setState] = useState(surguries)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setState(surguries)
  }, [surguries])

  const onEndEditing = (search) => {
    if (search === '') setState(surguries)
    else {
      const c = surguries.filter((p, id) => {
        if (
          (p.surgeryName).toLowerCase().includes(search.toLowerCase())
          //  || (patient.lastName).toLowerCase().includes(search.toLowerCase())
        )
          return p
      })
      setState(c);
    }
  };

  const handleSortByName = () => {
    const sortedStaff = surguries.sort((a, b) =>
      a.surgeryName
        .toLowerCase()
        .localeCompare(b.surgeryName.toLowerCase()))

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
      onPress: () => {
        setIsVisible(false);
        setcustomDates({
          startDate: '',
          endDate: ''
        })
        setState(surguries)
      },
    },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: SECONDARY_BACKGROUND },
      titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
      onPress: () => setIsVisible(false),
    },
  ];

  const handleCustomDates = () => {
    if (customDates.startDate !== '' && customDates.endDate !== '') {
      const c = surguries.filter((p, id) => {
        if (
          new Date(p.date).getTime() > new Date(customDates.startDate).getTime() &&
          new Date(p.date).getTime() < new Date(customDates.endDate).getTime()
        )
          return p
      })
      setcustomDates({
        startDate: '',
        endDate: ''
      })
      setState(c);
      setIsVisible(false);
    }
  }

  const [customDates, setcustomDates] = useState({
    startDate: '',
    endDate: ''
  })

  useEffect(() => {
    handleCustomDates()
  }, [customDates])
  return (
    <>
      {isPatientAccountReducerLoading && (<BlurSpinner visible={isPatientAccountReducerLoading}>
        <ActivityIndicator color={NEW_PRIMARY_BACKGROUND} size="large" />
      </BlurSpinner>)}
      <AddSurgery
        editMode={editMode}
        editingData={editingData}
        visible={modalVisible}
        onCancel={() => {
          setVisible(false);
          seteditMode(false);
          seteditingData({});
        }}
        onUpdate={(temp) => {
          if (editMode) {
            const body = {
              id:  isPatientFamilyMember ? patientFamilyMemberDetails.meta : patient.meta._id,
              data: {
                surgeryName: temp.type,
                surgeonName: temp.docName,
                otOR: temp.otor,
                date: temp.date,
                _id: temp._id,
                modifiedBy: temp.modifiedBy
              }
            }
            dispatch(EditSurguries(body))
          } else {

            const body = {
              id:  isPatientFamilyMember ? patientFamilyMemberDetails.meta : patient.meta._id,
              data: {
                surgeryName: temp.type,
                surgeonName: temp.docName,
                otOR: temp.otor,
                date: temp.date,
                modifiedBy: patient.doctorToPatient ? 'doctor' : 'patient',
              }
            }
            dispatch(AddSurguries(body))
          }
          seteditMode(false)
          setVisible(false)
        }}
      />
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
      >
        <ListItem key={10} containerStyle={{ paddingBottom: 0, backgroundColor: Colors.bottom_sheet_bg[theme] }} onPress={handleCustomDates}>
          <ListItem.Content style={{ padding: 0 }}>

            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: NEW_PRIMARY_BACKGROUND,
                  borderBottomWidth: 1.5,
                  marginBottom: 15,
                }}>
                <DatePicker
                  style={[
                    { borderBottomWidth: 0, marginBottom: 0 },
                  ]}
                  date={customDates.startDate}
                  mode="date"
                  placeholder={`${Local("patient.medical_history.select_date")}`}
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    // dateInput:{borderWidth: 0},
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36,
                      borderWidth: 0
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(text) => { setcustomDates({ ...customDates, startDate: text }) }}
                />
              </View>
              <Text style={{
                marginHorizontal: 12,
                fontSize: 20,
                marginTop: 'auto',
                marginBottom: 'auto', fontFamily: 'Montserrat-Medium'
              }}>{Local('doctor.medical_history.to')}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: NEW_PRIMARY_BACKGROUND,
                  borderBottomWidth: 1.5,
                  marginBottom: 15,
                }}>
                <DatePicker
                  style={[
                    { borderBottomWidth: 0, marginBottom: 0 },
                  ]}
                  date={customDates.endDate}
                  mode="date"
                  placeholder={`${Local("patient.medical_history.select_date")}`}
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    // dateInput:{borderWidth: 0},
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36,
                      borderWidth: 0
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(text) => { setcustomDates({ ...customDates, endDate: text }) }}
                />
              </View>

            </View>
          </ListItem.Content>
        </ListItem>

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
          paddingVertical: '4%',
          alignItems: 'center',
          backgroundColor: Colors.secondary_background[theme],
          justifyContent: 'center',

        }}>
        <SearchBarSolid
          withIcon={true}
          // handleBottomList={() => setIsVisible(true)}
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
            backgroundColor: Colors.search_background[theme],
            borderRadius: 10,
            elevation: 2,
          }}
        />
      </View>
      <FlatList
        style={{ paddingHorizontal: 20 }}
        data={state}
        ListEmptyComponent={
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
            <Text style={{ textAlign: "center", fontFamily: "Montserrat-Medium", color: Colors.primary_text_color[theme], fontSize: 20 }}>
              
              {Local('doctor.medical_history.no_surgeries_found')}
											</Text>
          </View>
        }
        ListFooterComponent={<NewItem text={`${Local('doctor.medical_history.add_surgeries')}`} onPress={() => setVisible(true)} />}
        renderItem={({ item }) => <SurgeriesItem
          editMode={editMode}
          handleEdit={handleEdit} data={item} />}
      />
    </>
  );
};

export default Surgeries;
