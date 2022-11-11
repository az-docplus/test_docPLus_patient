import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DocDummyImage from '../../assets/png/doc-center-image.png';
import LinearGradient from 'react-native-linear-gradient';
import InsetShadow from 'react-native-inset-shadow';
import ButtonCompo from '../../components/atoms2/button/button';
import UploadDocsCompo from '../doctor/Submittingdetails/__Components/Upload-documents';
import PicturelessAvatar from '../../components/atoms/PicturelessAvatar/PicturelessAvatar';
import { Host } from '../../utils/connection';
import Favorites from '../../components/atoms2/doctor/favorites';
import AddFamily from '../../components/molecules/Modal/AddFamily';
import {
  bookAppointment,
  AddTransactions,
} from '../../reduxV2/action/PatientAction';
import Axios from 'axios';
import moment from 'moment';
import { StackActions } from '@react-navigation/stack';

const AntDesignIcon = ({ name, size, color = '#000' }) => (
  <AntDesign name={name} size={size} color={color} />
);
const FontAwesomeIcon = ({ name, size, color = '#000' }) => (
  <FontAwesome name={name} size={size} color={color} />
);
const EvilIconsIcon = ({ name, size, color = '#000' }) => (
  <EvilIcons name={name} size={size} color={color} />
);
const MaterialCommunityIconsIcon = ({ name, size, color = '#000' }) => (
  <MaterialCommunityIcons name={name} size={size} color={color} />
);
const IoniconsIcon = ({ name, size, color = '#000' }) => (
  <Ionicons name={name} size={size} color={color} />
);

export default function DoctorProfileConfirmBooking({ navigation, route }) {
  const updatePatient = `${Host}/patient/member/update`;
  //   const deletePatient = `${Host}/patient/member/delete`;
  const updatePatientFamily = (body) => Axios.post(updatePatient, body);
  //   const deletePatientFamily = (body) => Axios.post(deletePatient, body);
  const { doctor, Slot, concernData } = route.params;
  // console.log('====>>>>>>>>>>>>>Slot', route.params);
  console.log('====>>>>>>>>>>>>>Slot', Slot);
  // console.log('====xxxxxxxxxxDocotr', doctor);
  const dispatch = useDispatch();
  const {
    familyMember,
    patient,
    isPatientAccountReducerLoading,
    addingFamilyMember,
  } = useSelector((state) => state.PatientReducer);
  const { userData } = useSelector((state) => state.AuthReducer);
  // route ==> prev : params  & patien list
  const [__pateint, setPatient] = useState([patient, ...familyMember]);
  const [addModal, setModal] = useState(false);
  const [editingData, setEditingData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(patient);
  console.log('=====__pateint', selectedPatient);
  const confirmBookingHandler = () => {
    setLoading(true);

    const appointmentBookingData = {
      timeSlot: Slot._id,
      patient: patient._id,
      forWhom: 'Myself',
      patientInfo: {
        name: `${selectedPatient.firstName} ${selectedPatient.lastName}`,
        firstName: selectedPatient.firstName,
        lastName: selectedPatient.lastName,
        contact: selectedPatient.phone,
        age: selectedPatient.age,
        gender: selectedPatient.gender || selectedPatient.sex,
      },
      reasonForVisit: input,
      //   fee: doctor?.fee,
      fee: 0,
      doctor: doctor?._id,
    };
    // handle success
    dispatch(
      bookAppointment(
        {
          ...appointmentBookingData,
          amount: '0',
          fee: '0',
          patientInfo: JSON.stringify({
            ...appointmentBookingData.patientInfo,
            // QandA,
          }),
        },
        () => {
          setLoading(false);
          dispatch(
            AddTransactions({
              id: userData._id,
              amount: appointmentBookingData.fee,
              reason: appointmentBookingData.reasonForVisit,
              date: new Date(),
              doctor: appointmentBookingData.doctor,
            }),
          );
          // navigation.navigate('Appointments', { reset: true });
          navigation.navigate('ConfirmAppointment', { doctor, Slot });

          Axios.post(`${Host}/notification/send`, {
            deviceToken: deviceToken,
            // deviceToken: ["ef9nteQUTY-j2mO3vSwXOF:APA91bFXKksWyLyVO6GRdr-4-eNHVzLhk3uXLb5pCUf0sJSh3JLmvkrM5sOotmnG1uRBlw-01BFlDJxXFX9pxWMCBSwyvlUOLEjcYNG0wUgRfKuN61jpY_P2uaR5Uguv0bJJ-3NEl_wZ"],
            data: {
              title: 'Appointment booked.',
              description: `A appointment has been booked for ${moment(
                appointmentBookingData?.bookedFor,
              ).format('LLLL')}. Check application for more details`,
            },
          })
            .then((res) => {
              console.log(
                res.data.data,
                '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
              );
            })
            .catch((e) => {
              console.log(
                e.response.data,
                '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
              );
            });
        },
      ),
    );
  };

  const onSubmit = useCallback(
    (data) => {
      const reg = new RegExp(
        // /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
        /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/,
      );
      const emailRegEx = new RegExp(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      );
      const {
        firstName,
        lastName,
        email,
        contact: phone,
        gender,
        birthDay: birthdate,
        relation: relationship,
      } = data;
      if (
        firstName !== '' &&
        lastName !== '' &&
        email !== '' &&
        emailRegEx.test(email) &&
        phone !== '' &&
        gender !== '' &&
        birthdate !== '' &&
        relationship !== '' &&
        phone.length == 10
      ) {
        if (userData.meta) {
          if (editMode) {
            updatePatientFamily({
              id: editingData?._id,
              firstName,
              lastName,
              email: email.toLowerCase(),
              contact: phone,
              phone,
              gender,
              birthdate,
              relationship,
              metaId: userData.meta,
            })
              .then((res) => {
                console.log(res.data);
                setModal(false);
                onFetchFamilyMember();
              })
              .catch((e) => {
                console.log(e.response.data, '%%%%%%%%%%%%%%%%%%%%');
                setModal(false);
              });
          } else {
            dispatch(
              AddFamilyMember(
                {
                  firstName,
                  lastName,
                  email: email.toLowerCase(),
                  contact: phone,
                  phone,
                  gender,
                  birthdate,
                  relationship,
                  metaId: userData.meta,
                },
                () => {
                  setModal(false);
                },
              ),
            );
          }
        }
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
          : !emailRegEx.test(email)
          ? Alert.alert('Email is not valid')
          : null;
      }
    },
    [dispatch, userData.meta],
  );

  const onCancel = useCallback(() => setModal(false), []);

  const [patientHighlight, setPatientHighlight] = useState(true);

  console.log(selectedPatient.firstName);

  console.log(concernData)

  return (
    <View
      style={{
        flex: 1,
      }}>
      <AddFamily
        visible={addModal}
        setVisible={setModal}
        onCancel={onCancel}
        onUpdate={onSubmit}
        buttonLoading={addingFamilyMember}
        editingData={editingData}
        editMode={editMode}
        showNewSubmitButton={true}
      />
      <ScrollView
        style={{
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 17,
            paddingVertical: 17,
            elevation: 3,
            backgroundColor: '#fff',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <AntDesignIcon name="left" size={25} color="#333333" />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 20,
            }}>
            Doctor's Profile
          </Text>
          <TouchableOpacity>
            <AntDesignIcon name="user" size={25} color="#333333" />
          </TouchableOpacity>
        </View>
        <DoctorTopCompo
          coverPhoto={doctor?.coverPhoto}
          name={doctor?.basic?.name}
          specialty={doctor?.specialty || doctor?.specialties[0]}
          study={doctor?.educationDetails}
          experience={doctor?.experience}
          price={doctor?.fee}
          id={doctor?._id}
          Slot={Slot}
        />
        <View
          style={{
            marginVertical: 17,
            marginHorizontal: 17,
            marginBottom: 7,
          }}>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              color: '#077EE9',
              fontSize: 19,
            }}>
            Patient Details
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',
              color: '#333333',
              fontSize: 15,
              marginTop: 25,
              marginBottom: 18,
            }}>
            Patient
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View>
              <ScrollView horizontal={true}>
                {__pateint.map((item, index) => {
                  const img = item.picture ? (
                    <Image
                      source={{
                        uri: `${Host}${item.picture
                          .replace('public', '')
                          .replace('\\\\', '/')}`,
                      }}
                      style={{ width: 80, height: 80, borderRadius: 100 }}
                    />
                  ) : (
                    <PicturelessAvatar
                      style={{
                        color: '#000',
                        backgroundColor: '#f9f9f9',
                        width: 80,
                        height: 80,
                        borderRadius: 100,
                      }}
                      textStyle={{ fontSize: 32 }}
                      text={`${item.firstName[0]}${item.lastName[1][0]}`}
                    />
                  );

                  return (
                    <TouchableOpacity
                      style={
                        item.firstName === selectedPatient.firstName && {
                          backgroundColor: 'white',
                          shadowColor: '#111',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.8,
                          shadowRadius: 2,
                          elevation: 5,
                          borderRadius: 20,
                          paddingVertical: 5,
                        }
                      }
                      onPress={() => {
                        setSelectedPatient(item);
                      }}>
                      <View
                        style={{
                          width: 80,
                          alignItems: 'center',
                          marginHorizontal: 10,
                        }}
                        key={index}>
                        {img}
                        <Text
                          style={{
                            fontFamily: 'Montserrat-SemiBold',
                            fontSize: 15,
                            textAlign: 'center',
                          }}>
                          {item.firstName + ' ' + item.lastName}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setModal(true);
                setEditMode(false);
              }}>
              <LinearGradient
                colors={['#5BCDCD', '#449A9A']}
                angle={0}
                style={{
                  padding: 10,
                  borderRadius: 100,
                  marginHorizontal: 16,
                  marginVertical: 7,
                }}>
                <IoniconsIcon name="add" size={40} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        

        <View
          style={{
            margin: 17,
            marginTop: 0,
            marginBottom: 50,
          }}>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              color: '#333333',
              fontSize: 15,
              marginTop: 25,
              marginBottom: 18,
            }}>
            Describe your problem
          </Text>
          <View>
            <InsetShadow
              shadowOpacity={1}
              shadowOffset={15}
              containerStyle={styles.numberField}
              // shadowOffset={10}
              elevation={12}>
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Describe your problem"
                placeholderTextColor="#7B7A79"
                style={{
                  height: '100%',
                  textAlignVertical: 'top',
                  fontFamily: 'Gilroy-MediumItalic',
                }}
              />
            </InsetShadow>
          </View>
        </View>

        {/* <View>
          <UploadDocsCompo
            Component={({ openModal }) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginHorizontal: 17,
                  marginBottom: 50,
                }}>
                <TouchableOpacity
                  onPress={openModal}
                  style={{
                    alignItems: 'center',
                    elevation: 6,
                    backgroundColor: '#fff',
                    paddingVertical: 6,
                    paddingHorizontal: 8,
                    borderRadius: 8,
                  }}>
                  <MaterialCommunityIconsIcon
                    name="camera-plus"
                    size={27}
                    color="#51B7B7"
                  />
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 12,
                      marginTop: 8,
                      color: '#51B7B7',
                    }}>
                    Upload
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 15,
                    color: '#51B7B7',
                    flex: 1,
                    marginLeft: 18,
                  }}>
                  Upload photo or video. The uploaded is only visible to doctor.
                </Text>
              </View>
            )}
            onSubmitGetUrl={(e) => {
              // link ::: (e.data)
            }}
          />
        </View> */}

        <View
          style={{
            marginHorizontal: 50,
            marginBottom: 100,
          }}>
          <ButtonCompo
            icon={true}
            title="Confirm booking"
            pressHandler={confirmBookingHandler}
            isLoading={Loading}
            textStyle={{
              fontSize: 14,
              fontFamily: 'Montserrat-SemiBold',
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const DoctorTopCompo = ({
  coverPhoto,
  name,
  specialty,
  study,
  experience,
  price,
  id,
  Slot,
}) => {
  name = name.split(' ');
  const img = coverPhoto ? (
    <Image
      source={{
        uri: `${Host}${coverPhoto.replace('public', '').replace('\\\\', '/')}`,
      }}
      style={{ width: 90, height: 90, borderRadius: 100 }}
    />
  ) : (
    <PicturelessAvatar
      style={{
        color: '#000',
        backgroundColor: '#f9f9f9',
        width: 90,
        height: 90,
        borderRadius: 100,
      }}
      textStyle={{ fontSize: 32 }}
      text={`${name[0][0]}${name[1][0]}`}
    />
  );
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
        marginHorizontal: 15,
        elevation: 6,
        backgroundColor: '#fff',
        borderRadius: 13,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 23,
      }}>
      {img}
      <View
        style={{
          flex: 1,
          marginLeft: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Gilroy-SemiBold',
            }}>
            Dr. {name}
          </Text>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <AntDesignIcon name="star" size={17} color="#FCC02A" />
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 14,
                marginLeft: 5,
              }}>
              {rate}
            </Text>
          </View> */}
          <Favorites setLoading={() => {}} doctor={id} />
        </View>
        <View
          style={{
            marginTop: 7,
          }}>
          <Text style={styles.text}>
            <Text>{specialty} | </Text>
            <Text>{study} | </Text>
            <Text>{experience} YRS Exp</Text>
          </Text>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#EEEEEE',
            marginTop: 4,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 6,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <EvilIconsIcon name="calendar" color="#51B7B7" size={23} />
            <Text style={{ fontFamily: 'Gilroy-Medium', fontSize: 11 }}>
              {moment(Slot?.bookedFor).format("DD MMM 'YY hh:mm A")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon name="rupee" color="#000" size={16} />
            <Text
              style={{
                ...styles.text,
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
                marginLeft: 3,
              }}>
              {price}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 13,
  },
  numberField: {
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 130,
    borderWidth: 0.1,
  },
});
