import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, ActivityIndicator, Image } from 'react-native';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import AllergiesItem from '../../../components/molecules/MedicalHistory/AllergiesItem';
import AddAllergiesModal from '../../../components/molecules/Modal/AddAllergies';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';
import BlurSpinner from '../../../components/molecules/Modal/BlurLoadingOverlay'
import { GetAllergies, AddAllergies, EditAllergies } from '../../../reduxV2/action/PatientAction';
import {
  NEW_PRIMARY_BACKGROUND,
  SUCCESS,
  SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import { BottomSheet, ListItem } from 'react-native-elements'
import DatePicker from 'react-native-datepicker';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';

const Allergies = () => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [modalVisible, setVisible] = useState(false);
  const { allergies, gettingAllery, patient, isPatientAccountReducerLoading } = useSelector(state => state.PatientReducer)
  const dispatch = useDispatch()
  const { isPatientFamilyMember, patientFamilyMemberDetails } = patient

  const [editMode, seteditMode] = useState(false);
  const [editingData, seteditingData] = useState({})

  const handleEdit = (data) => {
    seteditMode(true)
    setVisible(true)
    seteditingData(data)
  }

  useEffect(() => {
    !gettingAllery && dispatch(GetAllergies(isPatientFamilyMember ? patientFamilyMemberDetails.meta : patient.meta._id || patient.meta))
  }, [])

  const [state, setState] = useState(allergies)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setState(allergies)
  }, [allergies])

  const onEndEditing = (search) => {
    if (search === '') setState(allergies)
    else {
      const c = allergies.filter((p, id) => {
        if (
          (p.allergyName).toLowerCase().includes(search.toLowerCase())
          //  || (patient.lastName).toLowerCase().includes(search.toLowerCase())
        )
          return p
      })
      setState(c);
    }
  };

  const handleSortByName = () => {
    const sortedStaff = allergies.sort((a, b) =>
      a.allergyName
        .toLowerCase()
        .localeCompare(b.allergyName.toLowerCase()))

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
        setState(allergies)
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
      const c = allergies.filter((p, id) => {
        if (
          new Date(p.date).getTime() > new Date(customDates.startDate).getTime() &&
          new Date(p.date).getTime() < new Date(customDates.endDate).getTime()
        )
          return p
      })
      setState(c);
      setcustomDates({
        startDate: '',
        endDate: ''
      })
      setIsVisible(false)
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
      <AddAllergiesModal
        visible={modalVisible}
        editMode={editMode}
        editingData={editingData}
        onCancel={() => {
          setVisible(false);
          seteditMode(false);
          seteditingData({});
        }}
        onUpdate={(values) => {
          if (editMode) {
            const body = {
              id: isPatientFamilyMember ? patientFamilyMemberDetails.meta : patient.meta._id,
              data: {
                _id: editingData._id,
                allergyName: values.name,
                reaction: values.reaction,
                severity: values.Severity,
                modifiedBy: values.modifiedBy,
                date: values.date,
              },
            };
            dispatch(EditAllergies(body))
          } else {
            const body = {
              id: isPatientFamilyMember ? patientFamilyMemberDetails.meta : patient.meta._id,
              data: {
                allergyName: values.name,
                reaction: values.reaction,
                severity: values.Severity,
                modifiedBy: patient.doctorToPatient ? 'doctor' : 'patient',
                date: new Date().toLocaleString(),
              },
            };
            dispatch(AddAllergies(body))
          }
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
              }}>{Local("doctor.medical_history.to")}</Text>
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
          justifyContent: 'center',
          backgroundColor: Colors.secondary_background[theme],

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
              
              {Local("doctor.medical_history.no_allergies_found")}
											</Text>
          </View>
        }
        ListFooterComponent={<NewItem text={Local("doctor.medical_history.add_allergies")} onPress={() => setVisible(true)} />}
        renderItem={({ item }) =>
          <AllergiesItem
            editMode={editMode}
            handleEdit={handleEdit}
            data={item} />}
      />
    </>
  );
}

export default Allergies;
