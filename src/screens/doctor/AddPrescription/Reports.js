import React, {useEffect, useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  PermissionsAndroid,
  ActivityIndicator,
  Image,
} from 'react-native';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import ReportsItem from '../../../components/molecules/MedicalHistory/ReportsItem';
import BlurSpinner from '../../../components/molecules/Modal/BlurLoadingOverlay';
import AddReport from '../../../components/molecules/Modal/AddReport';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  UploadRecords,
  GetRecords,
  EditRecords,
} from '../../../reduxV2/action/PatientAction';
import {ListingWithThumbnailLoader} from '../../../components/atoms/Loader/Loader';
import LottieView from 'lottie-react-native';
import DatePicker from 'react-native-datepicker';
import {
  NEW_PRIMARY_BACKGROUND,
  SUCCESS,
  SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import {BottomSheet, ListItem} from 'react-native-elements';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';

const Reports = ({params}) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [modalVisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [file, setFile] = useState('');
  const [testName, setTestName] = useState('');
  const [testType, setTestType] = useState('');
  const [fileName, setFileName] = useState('');
  const [reportId, setreportId] = useState('');
  const {
    patient,
    records,
    gettingRecords,
    errorGettingRecords,
    isPatientAccountReducerLoading,
  } = useSelector((state) => state.PatientReducer);
  const {isPatientFamilyMember, patientFamilyMemberDetails} = patient;

  const [editMode, seteditMode] = useState(false);

  const handleEdit = (data) => {
    seteditMode(true);
    setVisible(true);
    setTestName(data.testName);
    setTestType(data.test_type);
    setreportId(data._id);
  };

  const sucessCallBack = () => {
    setTestName('');
    setTestType('');
    setFileName('');
    seteditMode(false);
    setreportId('');
    setFile('');
  };
  const uploadFile = () => {
    if (editMode) {
      const data = {
        testName: testName,
        test_type: testType,
        addedBy: 'Patient',
        _id: reportId,
        date: new Date().toLocaleString(),
      };
      const _data = {
        // files: file,
        data: data,
        _id: reportId,
        id: isPatientFamilyMember
          ? patientFamilyMemberDetails.meta
          : patient?.meta?._id,
      };
      dispatch(EditRecords(_data, sucessCallBack));
    } else {
      const data = {
        testName: testName,
        test_type: testType,
        addedBy: patient.doctorToPatient ? 'doctor' : 'patient',
        date: new Date().toLocaleString(),
      };
      const _data = {
        files: file,
        data: data,
        id: isPatientFamilyMember
          ? patientFamilyMemberDetails.meta
          : patient?.meta?._id,
      };

      dispatch(UploadRecords(_data, sucessCallBack));
    }
    seteditMode(false);
  };

  const PickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setFile(res);
      setFileName(res.name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('user canceled');
      } else {
        throw err;
      }
    }
  };

  /* useEffect(() => {
    dispatch(GetRecords(isPatientFamilyMember ? patientFamilyMemberDetails.meta : patient?.meta?._id));
  }, []); */

  const [state, setState] = useState(records);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setState(records);
  }, [records]);

  const onEndEditing = (search) => {
    if (search === '') setState(records);
    else {
      const c = records.filter((p, id) => {
        if (
          p.testName.toLowerCase().includes(search.toLowerCase())
          //  || (patient.lastName).toLowerCase().includes(search.toLowerCase())
        )
          return p;
      });
      setState(c);
    }
  };

  const handleSortByName = () => {
    const sortedStaff = records.sort((a, b) =>
      a.testName.toLowerCase().localeCompare(b.testName.toLowerCase()),
    );

    setState(sortedStaff);
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
        setcustomDates({
          startDate: '',
          endDate: '',
        });
        setIsVisible(false);
        setState(records);
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
      const c = records.filter((p, id) => {
        if (
          new Date(p.date).getTime() >
            new Date(customDates.startDate).getTime() &&
          new Date(p.date).getTime() < new Date(customDates.endDate).getTime()
        )
          return p;
      });
      setState(c);
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
    <>
      {isPatientAccountReducerLoading && (
        <BlurSpinner visible={isPatientAccountReducerLoading}>
          <ActivityIndicator color={NEW_PRIMARY_BACKGROUND} size="large" />
        </BlurSpinner>
      )}
      <AddReport
        visible={modalVisible}
        onCancel={() => {
          sucessCallBack();
          setVisible(false);
        }}
        onUpload={uploadFile}
        selectFile={PickFile}
        testName={testName}
        testType={testType}
        editMode={editMode}
        setTestName={setTestName}
        setTestType={setTestType}
        fileName={fileName}
        disable={testName === '' || testType === '' || file === ''}
        editDisable={testName === '' || testType === ''}
      />
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
                  borderColor: NEW_PRIMARY_BACKGROUND,
                  borderBottomWidth: 1.5,
                  marginBottom: 15,
                }}>
                <DatePicker
                  style={[{borderBottomWidth: 0, marginBottom: 0}]}
                  date={customDates.startDate}
                  mode="date"
                  placeholder={`${Local(
                    'patient.medical_history.select_date',
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
                  borderColor: NEW_PRIMARY_BACKGROUND,
                  borderBottomWidth: 1.5,
                  marginBottom: 15,
                }}>
                <DatePicker
                  style={[{borderBottomWidth: 0, marginBottom: 0}]}
                  date={customDates.endDate}
                  mode="date"
                  placeholder={`${Local(
                    'patient.medical_history.select_date',
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
      {/* <View
        style={{
          paddingVertical: '4%',
          alignItems: 'center',
          backgroundColor: Colors.secondary_background[theme],
          justifyContent: 'center',

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
            backgroundColor: Colors.search_background[theme],
            borderRadius: 10,
            elevation: 2,
          }}
        />
      </View> */}

      {gettingRecords ? (
        <ListingWithThumbnailLoader />
      ) : (
        <FlatList
          style={{paddingHorizontal: 20}}
          data={state}
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
                  fontFamily: 'Montserrat-Medium',
                  color: Colors.primary_text_color[theme],
                  fontSize: 20,
                }}>
                {Local('doctor.medical_history.no_record_added')}
              </Text>
            </View>
          }
          keyExtractor={(item) => JSON.stringify(item)}
          ListFooterComponent={
            <NewItem text="Add Reports" onPress={() => setVisible(true)} />
          }
          renderItem={({item}) => (
            <ReportsItem
              editMode={editMode}
              handleEdit={handleEdit}
              //patient={patient}
              data={item}
            />
          )}
        />
      )}
    </>
  );
};

export default Reports;
