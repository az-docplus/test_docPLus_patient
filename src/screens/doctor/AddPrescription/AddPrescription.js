import React, { createRef, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {
  NEW_HEADER_TEXT,
  NEW_PRIMARY_COLOR,
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_BACKGROUND,
  NEW_UNSELECTED_TEXT,
} from '../../../styles/colors';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import VerticalText from '../../../components/atoms/VerticalText/VerticalText';
import moment from 'moment';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { GetAppointments } from '../../../reduxV2/action/DoctorAction';
import {
  saveUserAccount,
  GetPatientInfo,
} from '../../../reduxV2/action/PatientAction';
import {
  GetAllergies,
  AddAllergies,
  EditAllergies,
} from '../../../reduxV2/action/PatientAction';
import {
  RemoveAppointment,
  ApproveAppointment,
  AddPrescription,
  GetMedicine,
  GetRecords,
} from '../../../reduxV2/action/PatientAction';
import { ListingWithThumbnailLoader } from '../../../components/atoms/Loader/Loader';
import calculateMonths from '../../../utils/calculateMonths';
import LottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';
import NetworkStatus from '../../../components/atoms/NetworkStatus/NetworkStatus';
import { Colors } from '../../../styles/colorsV2';
import { colors } from 'react-native-elements';
import {
  SUCCESS,
  SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import { BottomSheet, ListItem } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { Local } from '../../../i18n';
import Meds from './Meds';
import Reports from './Reports';
import AddDiagnosis from '../../../components/molecules/Modal/AddDiagnosis';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
const week = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function Appointments({ navigation, route }) {
  const { User } = route.params;

  const [state, setState] = useState({
    medication: [],
    reports: [],
    diagnosis: '',
    notes: '',
    labNotes: '',
    ClinicNotes: '',
    personalNotes: '',
    assistantNotes: '',
    followUps: '',
  });

  const {
    medicines,
    gettingMedicine,
    addMedicineLoading,
    records,
    gettingRecords,
    errorGettingRecords,
    patient,
    isPatientAccountReducerLoading,
  } = useSelector((state) => state.PatientReducer);
  const { isPatientFamilyMember, patientFamilyMemberDetails } = patient;
  const dispatch = useDispatch();

  const [Tab, setTab] = useState(1);

  const { theme, userData } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    dispatch(
      GetPatientInfo(User._id, true, () =>
        console.log('PATIENT INFO FETCHED<<<<<<<<<<<<<<<<'),
      ),
    );

    dispatch(
      GetMedicine(
        isPatientFamilyMember
          ? patientFamilyMemberDetails.meta
          : patient?.meta?._id,
      ),
    );

    dispatch(
      GetRecords(
        isPatientFamilyMember
          ? patientFamilyMemberDetails.meta
          : patient?.meta?._id,
      ),
    );
  }, []);

  useEffect(() => {
    setState({
      ...state,
      medication: medicines,
      reports: records,
    });
  }, [medicines, records]);

  const handleSubmit = () => {
    // setLoading({ ...Loading, component: true });
    console.log('clicked!');
    const { meta } = patient;
    // const { doctor, appointmentId } = User;
    // const { doctor, appointmentId } = patient;
    console.log(patient?.appointments.reverse()[0]?._id, 'dfjdslfjdsfdsfj');
    const appointmentId = patient?.appointments.reverse()[0]?._id;
    // return
    const payload = {
      id: meta._id ? meta._id : meta,
      data: {
        ...state,
        patient: patient._id,
        doctor: userData?._id,
        appointmentId,
      },
    };
    dispatch(
      AddPrescription(payload, (err, data) => {
        console.log(payload, 'payload');
        if (err) {
          console.log(
            err.response,
            'Prescription Not Saved:::::::::::::::::::::::::::',
          );
        } else {
          console.log(' Saved:::::::::::::::::::::::::::');
        }
      }),
    );
  };

  return (
    <>
      {/* <NetworkStatus isConnected={isConnected} /> */}
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.secondary_background[theme],
        }}>
        <TopNavBar
          navigation={navigation}
          headerText={`Prescription`}
          RightComp={<View />}></TopNavBar>

        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            width: '90%',
            marginTop: 0,
            marginBottom: 10,
            paddingLeft: '4%',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: Colors.input_placeholder_color[theme],
            }}>
            {/* {Local('doctor.profile.registration_details')} */}
            Prescription for :{' '}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: Colors.primary_text_color[theme],
            }}>
            {/* {Local('doctor.profile.registration_details')} */}
            {User.firstName + ' ' + User.lastName}
          </Text>
        </View>
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            width: '90%',
            marginTop: 0,
            marginBottom: 10,
            paddingLeft: '4%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.input_placeholder_color[theme],
              }}>
              {/* {Local('doctor.profile.registration_details')} */}
              Gender :{' '}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {/* {Local('doctor.profile.registration_details')} */}
              Male
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.input_placeholder_color[theme],
              }}>
              {/* {Local('doctor.profile.registration_details')} */}
              Patient ID :{' '}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {/* {Local('doctor.profile.registration_details')} */}
              D608c
            </Text>
          </View>
        </View>
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            width: '90%',
            marginTop: 0,
            marginBottom: 10,
            paddingLeft: '4%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.input_placeholder_color[theme],
              }}>
              {/* {Local('doctor.profile.registration_details')} */}
              Age :{' '}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {/* {Local('doctor.profile.registration_details')} */}
              29
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.input_placeholder_color[theme],
              }}>
              {/* {Local('doctor.profile.registration_details')} */}
              Visit Type :{' '}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {/* {Local('doctor.profile.registration_details')} */}
              Tele-consult
            </Text>
          </View>
        </View>

        <View
          style={{
            alignSelf: 'center',
            width: '90%',
            marginTop: 0,
            marginBottom: 5,
            paddingLeft: '4%',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: Colors.primary_text_color[theme],
            }}>
            Diagnosis
          </Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#e0e0e0',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            // backgroundColor: '#fcfcfc',
            backgroundColor: Colors.secondary_background[theme],
          }}>
          <View
            style={{
              paddingHorizontal: '6%',
              borderBottomWidth: 1,
              borderColor: '#e0e0e0',
            }}>
            <TextInput
              // keyboardType={'text'}
              onChangeText={(text) => {
                setState({ ...state, diagnosis: text });
              }}
              value={state['diagnosis']}
              style={{
                fontSize: 16,
                marginLeft: '2%',
                color: Colors.primary_text_color[theme],
              }}
              placeholder="Diagnosis"
              placeholderTextColor={Colors.input_placeholder_color[theme]}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: '8%',
            paddingVertical: '3%',
            alignItems: 'center',

            width: '100%',
            marginTop: 10,
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                setTab(1);
              }}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  color:
                    Tab === 1
                      ? Colors.secondary_text_color[theme]
                      : Colors.input_placeholder_color[theme],
                  fontSize: 18,
                  fontFamily:
                    Tab === 1 ? 'Montserrat-Bold' : 'Montserrat-Regular',
                }}>
                Medication
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
                setTab(2);
              }}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  color:
                    Tab === 2
                      ? Colors.secondary_text_color[theme]
                      : Colors.input_placeholder_color[theme],
                  fontSize: 18,
                  fontFamily:
                    Tab === 2 ? 'Montserrat-Bold' : 'Montserrat-Regular',
                }}>
                Lab Tests
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View
            style={{
              alignItems: 'center',
              borderLeftWidth: 2,
              borderColor: NEW_PRIMARY_COLOR,
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                // setTab("Diagnosis")
              }}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  color: false ? Colors.secondary_text_color[theme] : Colors.input_placeholder_color[theme],
                  fontSize: 18,
                  fontFamily: false
                    ? 'Montserrat-Bold'
                    : 'Montserrat-Regular',
                }}>
                Diagnosis
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
        {Tab === 1 && (
          <View
            style={{
              height: '35%',
              // borderTopColor: "f4f4f4",
              // borderWidth: 1
            }}>
            <Meds />
          </View>
        )}
        {Tab === 2 && (
          <View
            style={{
              height: '35%',
              // borderTopColor: "f4f4f4",
              // borderWidth: 1
            }}>
            <Reports />
          </View>
        )}

        <ScrollView
          contentContainerStyle={{
            padding: 20,
            paddingTop: 20,
            // elevation: 10,
          }}>
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 0,
              // marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              Lab Notes:
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // marginTop: 5,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                // keyboardType={'text'}
                onChangeText={(text) => {
                  setState({ ...state, labNotes: text });
                }}
                value={state['labNotes']}
                style={{
                  fontSize: 16,
                  marginLeft: '2%',
                  color: Colors.primary_text_color[theme],
                }}
                placeholder="Lab Notes"
                multiline
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 0,
              // marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              Clinical Notes
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // marginTop: 5,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                // keyboardType={'text'}
                onChangeText={(text) => {
                  setState({ ...state, ClinicNotes: text });
                }}
                value={state['ClinicNotes']}
                style={{
                  fontSize: 16,
                  marginLeft: '2%',
                  color: Colors.primary_text_color[theme],
                }}
                placeholder="Clinical Notes"
                multiline
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 0,
              // marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              Personal Notes
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // marginTop: 5,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                // keyboardType={'text'}
                onChangeText={(text) => {
                  setState({ ...state, personalNotes: text });
                }}
                value={state['personalNotes']}
                style={{
                  fontSize: 16,
                  marginLeft: '2%',
                  color: Colors.primary_text_color[theme],
                }}
                placeholder="Personal Notes"
                multiline
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 0,
              // marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              Assistant Notes
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // marginTop: 5,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                // keyboardType={'text'}
                onChangeText={(text) => {
                  setState({ ...state, assistantNotes: text });
                }}
                value={state['assistantNotes']}
                style={{
                  fontSize: 16,
                  marginLeft: '2%',
                  color: Colors.primary_text_color[theme],
                }}
                placeholder="Assistant Notes"
                multiline
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            </View>
          </View>

          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 0,
              // marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {/* {Local('doctor.profile.registration_details')} */}
              Follow ups required ?
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                // keyboardType={'text'}
                onChangeText={(text) => {
                  setState({ ...state, followUps: text });
                }}
                value={state['followUps']}
                style={{
                  fontSize: 16,
                  marginLeft: '2%',
                  color: Colors.primary_text_color[theme],
                }}
                placeholder="Yes/No/3"
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            </View>
          </View>

          <NewItem
            text={`Save`}
            style={{
              marginBottom: 0,
            }}
            onPress={() => {
              handleSubmit();
            }}
          />
        </ScrollView>
      </View>
    </>
  );
}
