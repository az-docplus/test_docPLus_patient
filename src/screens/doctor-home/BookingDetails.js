import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  BackHandler,
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
import TopNavBar from '../../components/molecules/TopNavBar/TopNavBar';
import { Local } from '../../i18n';
import Favorites from '../../components/atoms2/doctor/favorites';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Button } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  GetAppointments,
  RemoveAppointment,
} from '../../reduxV2/action/PatientAction';
import { Colors } from '../../styles/colorsV2';
import { BlurView } from '@react-native-community/blur';
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

const BookingDetails = ({ navigation, route, doctorId }) => {
  const refRBSheet = useRef();
  const { doctor, Slot, concernData, patientInfo, dataId } = route.params;
  const {
    familyMember,
    patient,
    isPatientAccountReducerLoading,
    addingFamilyMember,
  } = useSelector((state) => state.PatientReducer);

  const { userData, theme } = useSelector((state) => state.AuthReducer);
  // route ==> prev : params  & patien list
  const [__pateint, setPatient] = useState([patient, ...familyMember]);
  const [addModal, setModal] = useState(false);
  const [editingData, setEditingData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const cancelAppointment = (item) => {
    const data = {
      id: dataId,
      patientId: patient._id,
      reason: 'nil reason',
      byDoctor: true,
      byPatient: false,
    };
    dispatch(
      RemoveAppointment(data, () => {
        dispatch(GetAppointments(doctorId));
        navigation.navigate('PatientLandingScreen');
      }),
    );
  };
  const backAction = () => {
    if (navigation.isFocused()) {
      navigation.navigate('PatientLandingScreen');
      return true;
    }
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View>
      {/* <TopNavBar
        navigation={navigation}
        headerText={`${Local('doctor.Settings.booking_details')}`}
      /> */}
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: Colors.secondary_background[theme],
          // marginVertical: 15,
          // paddingHorizontal: 20,
          elevation: 5,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PatientLandingScreen')}>
          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 15,
              // padding: 8,
            }}>
            <Entypo name="chevron-thin-left" size={27} />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.primary_text_color[theme],
            fontSize: 23,

            fontFamily: 'Gilroy-SemiBold',
          }}>
          {`${Local('doctor.Settings.booking_details')}`}
        </Text>
        <View
          style={{
            width: '15%',
          }}
        />
      </View>
      <ScrollView
        style={{
          backgroundColor: '#fff',
        }}>
        <DoctorTopCompo
          coverPhoto={doctor?.coverPhoto}
          name={doctor?.basic?.name}
          specialty={doctor?.specialty || doctor?.specialties[0]}
          study={doctor?.educationDetails}
          experience={doctor?.experience}
          // price={doctor?.fee}
          id={doctor}
          profile
          // Slot={Slot}
        />
        <View style={{ marginLeft: 20 }}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              marginTop: 10,
              marginBottom: 20,
            }}>
            {`${Local('doctor.V2.booking_detail.appointment_confirmed')}`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <EvilIconsIcon name="calendar" color="#51B7B7" size={25} />
            <Text
              style={{
                fontFamily: 'Gilroy-Medium',
                fontSize: 13,
                marginLeft: 5,
              }}>
              {moment(Slot?.bookedFor).format("DD MMM 'YY hh:mm A")}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              color: '#077EE9',
              fontSize: 19,
              marginLeft: 10,
            }}>
            {`${Local('doctor.V2.booking_detail.detail.title')}`}
          </Text>
          <View
            style={{
              marginHorizontal: 17,
              marginBottom: 7,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            {/* <View
            style={{
              flexDirection: 'row',
            }}>
            <View>
              <ScrollView horizontal={true}> */}
            {/* {__pateint.map((item, index) => {
                  const img = item.picture ? (
                    <Image
                      source={{
                        uri: `${Host}${item.picture
                          .replace('public', '')
                          .replace('\\\\', '/')}`,
                      }}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 100,
                      }}
                    />
                  ) : (
                    <PicturelessAvatar
                      style={{
                        color: '#000',
                        backgroundColor: '#f9f9f9',
                        width: 80,
                        height: 80,
                        borderRadius: 100,
                        // borderWidth: 1,
                        // borderColor: '#EA1A65',
                      }}
                      textStyle={{ fontSize: 32 }}
                      text={`${item.firstName[0]}${item.lastName[1][0]}`}
                    />
                  );

                  return ( */}
            {/* <TouchableOpacity>
                      <View
                        style={{
                          width: 80,
                          alignItems: 'center',
                          marginHorizontal: 10,
                        }}>
                        <Image source={{ uri:patientInfo.firstName[0]}} style={{height:100, width:100, resizeMode:"contain"}}/>
                        <Text
                          style={{
                            fontFamily: 'Montserrat-SemiBold',
                            fontSize: 15,
                            textAlign: 'center',
                          }}>
                          {patientInfo.firstName}
                        </Text>
                      </View>
                    </TouchableOpacity> */}
            {/* );
                })} */}

            {/* </ScrollView>
            </View> */}
            {/* <TouchableOpacity
              style={{ flexDirection: 'column', alignItems: 'center' }}
              onPress={() => {
                setModal(true);
                setEditMode(false);
              }}>
              <LinearGradient
                colors={['rgba(249,249,249,0.1)', 'rgba(249,249,249,0.8)']}
                angle={0}
                style={{
                  padding: 10,
                  borderRadius: 100,
                  marginHorizontal: 16,
                  marginVertical: 7,
                  alignItems: 'center',
                }}>
                <IoniconsIcon name="add" size={40} color="#fff" />
                <Image
                  source={require('../../../assets/cough-cold.png')}
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 100,
                    resizeMode: 'center',
                  }}
                />
                {concernData.map((item) => (
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: 'black',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {item.questions1.a}
                  </Text>
                ))}
              </LinearGradient>
            </TouchableOpacity> */}
            {/* </View> */}
            <View>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  color: '#333333',
                  fontSize: 15,
                  marginTop: 25,
                  marginLeft: 10,
                }}>
                {`${Local('doctor.V2.booking_detail.detail.patient')}`}
              </Text>
              {patientInfo ? (
                <TouchableOpacity>
                  <View
                    style={{
                      width: 80,
                      alignItems: 'center',
                    }}>
                    {patientInfo?.picture ? (
                      <Image
                        source={{
                          uri: `${Host}${patient.picture.replace(
                            'public',
                            '',
                          )}`,
                        }}
                        style={{
                          height: 100,
                          width: 100,
                          borderRadius: 80,
                          resizeMode: 'cover',
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          height: 100,
                          width: 100,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            backgroundColor: 'lightgrey',
                            padding: 10,
                            borderRadius: 50,
                            textTransform: 'uppercase',
                          }}>
                          {patientInfo.firstName[0]} {patientInfo.lastName[0]}
                        </Text>
                      </View>
                    )}
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 15,
                        textAlign: 'center',
                      }}>
                      {patientInfo.firstName}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  color: '#333333',
                  fontSize: 15,
                  marginTop: 25,
                  marginLeft: 10,
                }}>
                {`${Local('doctor.V2.booking_detail.detail.condition')}`}
              </Text>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    width: 100,
                    alignItems: 'center',
                    marginTop: 30,
                    marginRight: 20,
                  }}>
                  {concernData.map((item) => (
                    <View
                      style={{
                        marginRight: 20,
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../../../assets/bad-stomach.png')}
                        style={{
                          height: 50,
                          width: 50,
                          borderRadius: 100,
                          resizeMode: 'center',
                          tintColor: '#51B7B7',
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: 'Montserrat-SemiBold',
                          fontSize: 15,
                          textAlign: 'center',
                          marginTop: 20,
                        }}>
                        {item.questions1.a}
                      </Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* <View
          style={{
            margin: 17,
            marginTop: 0,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: '#333333',
              fontSize: 15,
              marginTop: 25,
              marginBottom: 18,
            }}>
            Condition
          </Text>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                elevation: 8,
                backgroundColor: '#fff',
                alignSelf: 'baseline',
                paddingHorizontal: 10,
                paddingVertical: 10,
                paddingRight: 20,
                borderRadius: 100,
              }}>
              <Image
                style={{
                  width: 45,
                  height: 45,
                }}
                source={require('../../assets/png/bad-stomach.png')}
              />
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#333333',
                  marginLeft: 6,
                  fontSize: 15,
                  textAlign: 'center',
                }}>
                Bad Stomach
              </Text>
            </View>
          </View>
        </View> */}

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
            {`${Local('doctor.V2.appointment_detail.question.q5')}`}
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
                placeholder={`${Local(
                  'doctor.V2.appointment_detail.question.q5',
                )}`}
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
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => cancelAppointment()}
            style={{
              borderRadius: 20,
              flexDirection: 'row',
              backgroundColor: '#FFEFEE',
              alignItems: 'center',
              padding: 8,
            }}>
            <AntDesignIcon name="close" color="#FF0000" size={20} />
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                color: '#FF0000',
                fontSize: 16,
                marginLeft: 3,
              }}>
              {`${Local('doctor.V2.booking_detail.cancel_button')}`}
            </Text>
          </TouchableOpacity>

          <View>
            {/* <BlurView
              blurRadius={7}
              downsampleFactor={1}
              overlayColor={Colors.blur_overlay_color[theme]}
              blurAmount={1}
              style={StyleSheet.absoluteFill}
              blurType="light"
            /> */}
            {/* <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              customStyles={{
                container: {
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                },
                wrapper: {
                  // borderTopRightRadius: 30,
                },
                draggableIcon: {
                  backgroundColor: '#000',
                },
              }}>
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: 'Gilroy-SemiBold',
                    textAlign: 'center',
                  }}>
                  {`${Local(
                    'doctor.V2.booking_detail.bottom_sheet.title.1st',
                  )}`}
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: 'Gilroy-SemiBold',
                    textAlign: 'center',
                  }}>
                  {`${Local(
                    'doctor.V2.booking_detail.bottom_sheet.title.2nd',
                  )}`}
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: 'Gilroy-SemiBold',
                    textAlign: 'center',
                  }}>
                  {`${Local(
                    'doctor.V2.booking_detail.bottom_sheet.title.3rd',
                  )}`}
                </Text>
                <View
                  style={{
                    marginTop: 40,
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: '#0676D5',
                      paddingVertical: 1,
                      paddingHorizontal: 30,
                      borderRadius: 30,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: 17,

                        fontFamily: 'Gilroy-SemiBold',
                        color: '#0676D5',
                      }}>
                      {`${Local('doctor.V2.booking_detail.button.reshedule')}`}
                    </Text>
                  </TouchableOpacity>
                  <ButtonCompo
                    icon={true}
                    title={`${Local('doctor.V2.booking_detail.button.cancel')}`}
                    pressHandler={() => {
                      cancelAppointment();
                      refRBSheet.current.close();
                      navigation.navigate('PatientLandingScreen');
                    }}
                    isLoading={Loading}
                    textStyle={{
                      fontSize: 20,
                      fontFamily: 'Gilroy-SemiBold',
                      marginHorizontal: 20,
                    }}
                  />
                </View>
              </View>
            </RBSheet> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const DoctorTopCompo = ({
  coverPhoto,
  name,
  specialty,
  study,
  experience,
  price,
  id,
  Slot,
  profile,
}) => {
  name = name?.split(' ');
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
            {!profile && (
              <FontAwesomeIcon name="rupee" color="#000" size={16} />
            )}
            <Text
              style={{
                ...styles.text,
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
                marginLeft: 3,
              }}>
              {price}
            </Text>

            {profile && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    ...styles.text,
                    fontSize: 15,
                    fontFamily: 'Montserrat-SemiBold',
                    marginLeft: 3,
                    color: '#EA1A65',
                  }}>
                  {`${Local('doctor.V2.doctor_home.Sidebar.view_profile')}`}
                </Text>
                <AntDesignIcon name="right" color="#FF0000" size={18} />
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
export default BookingDetails;

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
