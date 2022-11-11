import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'react-native';
import { Button } from 'react-native-paper';
import AddFamily from '../../components/molecules/Modal/AddFamily';
import { useSelector, useDispatch } from 'react-redux';
import ButtonCompo from '../../components/atoms2/button/button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import SimpleFieldCompo from '../../../components/atoms2/Input/simple-field';
import SimpleFieldCompo from '../../components/atoms2/Input/simple-field';
import EmailInput from '../../components/atoms2/Input/Input';
import DateInputCompo from '../../components/atoms2/Input/date-input';
import {
  ContinueAsOwner,
  GetFamilyMember,
  AddFamilyMember,
  GetFamilyMeberInfo,
  updatePatientFamily,
  deletePatientFamily,
  // getpatientFamily,
} from '../../reduxV2/action/PatientAction';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  SECONDARY_COLOR,
} from '../../styles/colors';
import { ListingWithThumbnailLoader } from '../../components/atoms/Loader/Loader';
import LottieView from 'lottie-react-native';
import { Local, setLocale } from '../../i18n';
import { Colors } from '../../styles/colorsV2';
import Axios from 'axios';
import { Host } from '../../utils/connection';
import { FlatList } from 'react-native-gesture-handler';
import FamilyItem from '../../components/molecules/Family/FamilyItem';
import DraggablePanel from 'react-native-draggable-panel';
import AnimatedErrorText from '../../components/atoms/animatedErrorText/AnimatedErrorText';
// import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-community/picker';
import DmzButton from '../../components/atoms/DmzButton/DmzButton';
import { useWindowDimensions } from 'react-native';
import moment from 'moment';
import InsetShadow from 'react-native-inset-shadow';
import DatePicker from 'react-native-date-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BlurView } from '@react-native-community/blur';
import Feather from 'react-native-vector-icons/Feather'

const AllPatient = ({ navigation, showNewSubmitButton }) => {
  const profiles = [
    {
      image: require('../../assets/jpg/person1.jpg'),
      name: 'Asha Singh',
    },
    {
      image: require('../../assets/jpg/person2.jpg'),
      name: 'Karan Singh',
    },
    {
      image: require('../../assets/jpg/person3.jpg'),
      name: 'Paramjeet Singh',
    },
    {
      AddIcon: '+',
      name: 'Add Memeber',
    },
  ];
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [pressIn, setPressIn] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [menuData, setMenuData] = useState({});
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const [addModal, setModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingData, setEditingData] = useState({});
  const [dragablePanel, setDragablePanel] = useState(false);
  const [canAddmember, setCanAddMember] = useState(false);
  const [details, setDetails] = useState({
    id: '',
    _id: '',
    firstName: '',

    lastName: '',
    relation: '',
    email: '',
    birthDay: new Date(),
    gender: '',
    contact: '',
    medicalHistory: [],
  });
  useEffect(() => {
    if (
      details.firstName !== '' &&
      details.lastName !== '' &&
      details.relation !== '' &&
      details.email !== '' &&
      details.contact !== ''
    ) {
      setCanAddMember(true);
      console.log('hello');
    } else {
      setCanAddMember(false);
    }
  }, [details]);
  
  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const {
    patient,
    familyMember,
    gettingFamilyMember,
    patientFamilyMemberDetails,
    // errorGettingFamilyMember,
    addingFamilyMember,
    // errorAddingFamilyMember,
  } = useSelector((state) => state.PatientReducer);
  const dispatch = useDispatch();
  console.log('==============>>>>>>>>>>>>>>>>', patientFamilyMemberDetails);
  const onFetchFamilyMember = useCallback(() => {
    if (userData.meta && typeof userData.meta === 'string') {
      dispatch(
        GetFamilyMember(userData.meta, (members) => {
          console.log('memberssssssssss', members);
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
        _id,
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
        phone.length === 10
      ) {
        if (userData.meta) {
          if (editMode) {
            console.log('update member############');
            dispatch(
              updatePatientFamily(
                {
                  _id,
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
                  showToast("Member details updated successfully")
                  onFetchFamilyMember();
                  setDragablePanel(false);
                  setDetails({
                    firstName: '',
                    id: '',
                    _id: '',
                    lastName: '',
                    relation: '',
                    email: '',
                    birthDay: new Date(),
                    gender: '',
                    contact: '',
                  });
                },
              ),
            );
          } else {
            console.log('add member############');
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
                  showToast("Family member addes successfully")
                  setDragablePanel(false);
                  setDetails({
                    firstName: '',
                    id: '',
                    _id: '',
                    lastName: '',
                    relation: '',
                    email: '',
                    birthDay: new Date(),
                    gender: '',
                    contact: '',
                  });
                },
              ),
            );
          }
        }
      } else {
        firstName === '' &&
        lastName === '' &&
        email === '' &&
        phone === '' &&
        gender === '' &&
        birthdate === '' &&
        relationship === ''
          ? Alert.alert('One or more fields empty')
          : phone.length !== 10
          ? Alert.alert('Incorrect Phone No.')
          : !emailRegEx.test(email)
          ? Alert.alert('Email is not valid')
          : null;
      }
    },
    [dispatch, userData.meta, editMode],
  );
  const handleEdit = (data) => {
    console.log(data, '::::::::::::');

    setIsModal(false);
    // setEditingData(data);
    setDragablePanel(true);
    // moreAboutPost();

    // setModal(true);
  };

  const onCancel = useCallback(() => setModal(false), []);
  const extStyle = useMemo(() => {
    return {
      container: {
        ...styles.container,
        backgroundColor: Colors.primary_background[theme],
      },
      TopNavBar: { Container: { paddingTop: '2%', marginBottom: '3%' } },
      flatlistContainer: {
        flex: 1,
        backgroundColor: Colors.grey_background[theme],
      },
    };
  }, [theme]);

  console.log(familyMember);
  const refRBSheet = React.useRef();
  const MoreAboutPostPanelRef = React.createRef();
  const moreAboutPost = () => {
    MoreAboutPostPanelRef.current.show();
  };

  const [expandDetail, setExpandDetail] = useState(false);

  const [error, setError] = useState({
    firstName: true,
    lastName: true,
    email: true,
    contact: true,
  });

  const { width: screenWidth } = useWindowDimensions();

  const SetCredential = (credentialName, value) => {
    const nameReg = /^[a-zA-Z]+\s?[a-zA-Z]+$/;
    const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneReg = /^[1-9]{1}\d{9}$/;

    let match = true;

    switch (credentialName) {
      case 'firstName':
        match = nameReg.test(value);
        break;
      case 'lastName':
        match = nameReg.test(value);
        break;
      case 'email':
        match = emailReg.test(value);
        break;
      case 'contact':
        match = phoneReg.test(value);
        break;
    }
    setError({ ...error, [`${credentialName}`]: match });
    setDetails({ ...details, [`${credentialName}`]: value });
  };

  useEffect(() => {
    console.log(details, 'dlfjdsflj');
    // setTimeout(() => {
    //   editMode &&
    //     setDetails({ ...editingData, relation: editingData?.relationship });
    // }, 200);

    // editMode &&
    //   setDetails({ ...editingData, relation: editingData?.relationship });
  }, [details]);

  const ContinueWith = (id) => {
    setIsModal(false);
    if (id === patient._id) {
      dispatch(ContinueAsOwner(patient._id));
    } else {
      const member = familyMember.find((item) => item.id === id);

      dispatch(GetFamilyMeberInfo(member, patient));
    }
    navigation.canGoBack()
      ? navigation.goBack()
      : navigation.navigate('PatientDrawerWrapper');
  };

  const {height, width} = Dimensions.get('screen')

  const handleDelete = (_id) => {
    console.log(_id, userData?.meta, ':::::::::::::');
    const body = { _id: _id, metaId: userData?.meta };
    dispatch(
      deletePatientFamily(body, () => {
        onFetchFamilyMember();
      }),
      // .then((res) => {
      //   console.log(res.data);
      //   onFetchFamilyMember();
      // }),
    );
  };
  const LongPressMenu = () => {
    return (
      <Modal animationType="slide" visible={isModal} transparent={true}>
        <TouchableWithoutFeedback
          onPress={() => {
            setIsModal(false);
            setDetails({
              firstName: '',
              id: '',
              _id: '',
              lastName: '',
              relation: '',
              email: '',
              birthDay: new Date(),
              gender: '',
              contact: '',
            });
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
              // backgroundColor: 'rgba(0,0,0,0.4)',
            }}>
            <BlurView
              blurRadius={7}
              downsampleFactor={1}
              overlayColor={Colors.blur_overlay_color[theme]}
              blurAmount={1}
              style={StyleSheet.absoluteFill}
              blurType="light"
            />
            <View
              style={{
                width: '100%',

                marginVertical: 20,
              }}>
              <View style={styles.moreOptions}>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
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
                        }}>
                        {details?.firstName[0]} {details?.lastName[0]}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-SemiBold',
                          color: '#000000',
                          fontSize: 20,
                        }}>
                        {details?.firstName}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Regular',
                          color: '#7B7A79',
                          fontSize: 16,
                        }}>
                        {moment().diff(details.birthDay, 'years')}{' '}
                        {details.gender}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              {/* edit card */}
              <View
                style={[
                  styles.moreOptions,
                  {
                    padding: 20,
                    paddingHorizontal: 40,
                  },
                ]}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgray',
                  }}>
                  <TouchableOpacity
                    onPress={() => ContinueWith(details.id)}
                    // onPressIn={() => setPressIn(true)}
                    // onPressOut={() => setPressIn(false)}
                    style={{
                      marginVertical: 15,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Feather
                      name="user"
                      size={25}
                      style={{ color: '#111' }}
                    />
                    <Text
                      style={{
                        backgroundColor: pressIn ? '#F8E4EB' : '#FFFFFF',
                        marginLeft: 55,
                        fontSize: 20,
                        fontFamily: 'Gilroy-Medium',
                        color: '#000000',
                      }}>
                      View Profile
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgray',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      handleEdit(details);
                    }}
                    style={{
                      marginVertical: 15,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Feather
                      name="edit-2"
                      size={25}
                      style={{ color: '#111' }}
                    />
                    <Text
                      style={{
                        marginLeft: 50,
                        fontSize: 20,
                        fontFamily: 'Gilroy-Medium',
                        color: '#000000',
                      }}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setModal(true);
                    setIsModal(false);
                  }}
                  style={{
                    marginVertical: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    // backgroundColor:'red'
                  }}>
                  <MaterialIcons
                    name="close"
                    size={25}
                    style={{ color: '#EA1A1A' }}
                  />
                  <Text
                    style={{
                      marginLeft: 50,
                      fontSize: 20,
                      fontFamily: 'Gilroy-Medium',
                      color: '#EA1A1A',
                    }}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
              {/* cancle button */}
              <View
                style={[
                  styles.moreOptions,
                  {
                    padding: 20,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    setIsModal(false);
                    setDetails({
                      firstName: '',
                      id: '',
                      _id: '',
                      lastName: '',
                      relation: '',
                      email: '',
                      birthDay: new Date(),
                      gender: '',
                      contact: '',
                    });
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: 20,
                      color: '#297281',
                    }}>
                    Cancle
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {isModal ? <LongPressMenu /> : null}
      <Modal animationType="fade" visible={addModal} transparent={true}>
        {/* <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'rgba(0,0,0,0.4)',
          }}> */}
        <TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'rgba(0,0,0,0.4)',
            }}>
            <BlurView
              blurRadius={7}
              downsampleFactor={1}
              overlayColor={Colors.blur_overlay_color[theme]}
              blurAmount={1}
              style={StyleSheet.absoluteFill}
              blurType="light"
            />
            <View
              style={{
                borderRadius: 20,
                backgroundColor: '#FFFFFF',
                padding: 20,
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  color: '#353535',
                  fontSize: 18,
                  paddingHorizontal: 20,
                }}>
                Are you sure you want to remove the member?
              </Text>
              <View
                style={{
                  marginVertical: 5,
                  paddingHorizontal: 10,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => setModal(false)}
                  style={{ marginRight: 20 }}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      color: '#EA1A65',
                      fontSize: 16,
                    }}>
                    CANCEL
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleDelete(details._id);
                    setModal(false);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      color: '#7B7A79',
                      fontSize: 16,
                    }}>
                    CONFIRM
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {/* </TouchableOpacity> */}
      </Modal>
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        {/* <AddFamily
          visible={addModal}
          setVisible={setModal}
          onCancel={onCancel}
          onUpdate={onSubmit}
          buttonLoading={addingFamilyMember}
          editingData={editingData}
          editMode={editMode}
        /> */}
        <View
          style={{
            // height: 360,
            marginTop: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#51B7B7',
              padding: 6,
              borderRadius: 20,
              marginBottom: 20,
            }}>
            <Image
              source={require('../../assets/logo/favicon.png')}
              style={{ height: 80, width: 80 }}
            />
          </View>
          <Text
            style={{
              fontSize: 26,
              color: '#297281',
              fontFamily: 'Gilroy-SemiBold',
              marginVertical: 20,
            }}>
            {`${Local('doctor.V2.your_family.who_using')}`}
          </Text>
          <Text
            style={{
              maxWidth: '80%',
              textAlign: 'center',
              fontSize: 18,
              lineHeight: 18,
              color: 'grey',
              fontFamily: 'Gilroy-Regular',
            }}>
            {`${Local('doctor.V2.your_family.withDoc')}`}
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            maxWidth: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {familyMember === null ? (
            <Text>{`${Local('doctor.V2.your_family.noMember')}`}</Text>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '70%',
              }}>
              <TouchableOpacity
                onPress={() => ContinueWith(patient._id)}
                // onPress={() => {
                //   // credential && credential?.id != patient._id
                //   //   ? dispatch(GetFamilyMeberInfo(credential, patient))
                //   //   : dispatch(ContinueAsOwner())
                //   dispatch(GetFamilyMeberInfo(credential, patient));
                //   //dispatch(ContinueAs({isPatientFamilyMember : false, ...credential}))
                //   // navigation.navigate('PatientDrawerWrapper');
                // }}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  marginHorizontal: 10,
                  marginVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 155,
                  width: 110,
                  // borderWidth:
                  //   Object.keys(patientFamilyMemberDetails).length === 0
                  //     ? 1
                  //     : 0,
                  borderColor: '#37A2A2',
                }}>
                {patient.picture ? (
                  <View
                    style={{
                      height: 100,
                      width: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={{
                        uri: `${Host}${patient.picture.replace('public', '')}`,
                      }}
                      style={{
                        height: 80,
                        width: 80,
                        borderRadius: 80,
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
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
                      }}>
                      {patient.firstName[0]} {patient.lastName[0]}
                    </Text>
                  </View>
                )}
                <Text
                  style={{
                    fontFamily: 'Gilroy-Medium',
                    fontSize: 15,
                    maxWidth: '80%',
                    textAlign: 'center',
                    color: patient.AddIcon && '#3188DB',
                    // marginVertical:5
                  }}>
                  {patient.firstName} {patient.lastName}
                </Text>
              </TouchableOpacity>
              {familyMember.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  onLongPress={() => {
                    setDetails({
                      ...details,
                      firstName: item.firstName,
                      lastName: item.lastName,
                      relation: item.relationship,
                      email: item.email,
                      birthDay: item.birthdate,
                      gender: item.gender,
                      contact: item.contact,
                      _id: item._id,
                      id: item.id,
                    });
                    setIsModal(true);
                    setEditMode(true);
                  }}
                  onPress={() => ContinueWith(item.id)}
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    marginHorizontal: 10,
                    marginVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 155,
                    width: 110,
                    borderWidth:
                      patientFamilyMemberDetails?.id === item.id ? 1 : 0,
                    borderColor: '#37A2A2',
                  }}>
                  {item.image ? (
                    <Image
                      source={item.image}
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
                        }}>
                        {item.firstName[0]} {item.lastName[0]}
                      </Text>
                    </View>
                  )}
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Medium',
                      fontSize: 15,
                      maxWidth: '80%',
                      textAlign: 'center',
                      color: item.AddIcon && '#3188DB',
                      // marginVertical:5
                    }}>
                    {item.firstName} {item.lastName}
                  </Text>
                </TouchableOpacity>
              ))}
              {familyMember?.length + 1 < 4 ? (
                <TouchableOpacity
                  onPress={() => {
                    // setModal(true);
                    setEditMode(false);
                    // refRBSheet.current.open();
                    setDragablePanel(true);
                    // moreAboutPost();
                  }}
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,

                    backgroundColor: 'white',
                    borderRadius: 10,
                    marginHorizontal: 15,
                    marginVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 155,
                    width: 110,
                  }}>
                  {/* <View
                    style={{
                      backgroundColor: '#37A2A2',
                      borderRadius: 50,
                      width: 60,
                      height: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AD
                      name="pluscircle"
                      size={16}
                      style={{ marginLeft: 20 }}
                    />
                    <Text
                      onPress={() => {
                        // setModal(true);
                        setEditMode(false);
                        moreAboutPost();
                      }}
                      style={{
                        fontSize: 50,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      +
                    </Text>
                  </View> */}
                  <FontAwesome
                    name="plus-circle"
                    size={70}
                    style={{ color: '#37A2A2' }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      color: '#297281',
                      marginTop: 20,
                    }}>
                    {`${Local('doctor.V2.your_family.add')}`}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      color: '#297281',
                    }}>
                    {`${Local('doctor.V2.your_family.member')}`}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View />
              )}
            </View>
          )}

          {/* <Button
            icon="pencil"
            style={{
              fontFamily: 'Gilroy-SemiBold',
              borderRadius: 15,
              paddingHorizontal: 10,
              marginTop: 20,
              backgroundColor: 'lightgrey',
              borderColor: '#077EE9',
            }}
            color="#077EE9"
            mode="outlined">
            Manage Profile
          </Button> */}
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Medium',
                fontSize: 16,
                marginTop: 40,
                color: '#7B7A79',
              }}>
              {`${Local('doctor.V2.your_family.note')}`}
            </Text>
          </View>
        </View>
      </ScrollView>
      <DraggablePanel
      initialHeight={height}
        onDismiss={() => {
          setDragablePanel(false);
          setDetails({
            firstName: '',
            id: '',
            _id: '',
            lastName: '',
            relation: '',
            email: '',
            birthDay: new Date(),
            gender: '',
            contact: '',
          });
        }}
        visible={dragablePanel}
        // ref={MoreAboutPostPanelRef}
        borderRadius={20}
        expandable={true}>
        {/* <RBSheet
        ref={refRBSheet}
        // height={open ? 700 : 500}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: open ? 700 : 600,
          },
          // wrapper: {
          //   borderTopRightRadius: 30,
          // },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}> */}

        <ScrollView style={{ paddingHorizontal: 25, marginTop: 10 }}>
          {/* <KeyboardAvoidingView> */}
            <Text
              style={{
                color: '#297281',
                fontSize: 20,
                fontFamily: 'Gilroy-SemiBold',
                marginTop: 10,
                marginHorizontal: 5,
                // marginVertical: 20,
              }}>
              Add Family
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <SimpleFieldCompo
                // isLoading={loading}
                preValue={details.firstName}
                title={`${Local('doctor.V2.your_family.modal.first_name')}`}
                inputType="name" // required
                value={(text) => SetCredential('firstName', text)}
              />
              <SimpleFieldCompo
                // isLoading={loading}
                preValue={details.lastName}
                title={`${Local('doctor.V2.your_family.modal.last_name')}`}
                inputType="name" // required
                value={(text) => SetCredential('lastName', text)}
              />
            </View>
            {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 6,
            }}>
            <InsetShadow
              shadowOpacity={1}
              shadowOffset={15}
              containerStyle={styles.numberField}
              shadowOffset={10}
              elevation={12}>
              <TextInput
                value={details.firstName}
                onChangeText={(text) => SetCredential('firstName', text)}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
                placeholder={`${Local('patient.my_family.first_name')}`}
                style={[
                  styles.text,
                  { color: Colors.primary_text_color[theme] },
                ]}
              />
              {!error.firstName && (
                <AnimatedErrorText
                  style={{ width: '70%', alignSelf: 'center' }}
                  text={'First name should only contain letters'}
                />
              )}
            </InsetShadow>
            <TextInput
              value={details.lastName}
              onChangeText={(text) => SetCredential('lastName', text)}
              placeholderTextColor={Colors.input_placeholder_color[theme]}
              placeholder={`${Local('patient.my_family.last_name')}`}
              style={[styles.text, { color: Colors.primary_text_color[theme] }]}
            />
            {!error.lastName && (
              <AnimatedErrorText
                style={{ width: '70%', alignSelf: 'center' }}
                text={'Last name should only contain letters'}
              />
            )}
          </View> */}

            {/* <TouchableOpacity
            onPress={() =>
              expandDetail ? setExpandDetail(false) : setExpandDetail(true)
            }>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontFamily: 'Gilroy-SemiBold' }}>Add Detail</Text>
              <AD
                name={expandDetail ? 'down' : 'up'}
                size={16}
                style={{ marginLeft: 20 }}
              />
            </View>
          </TouchableOpacity> */}
            <SimpleFieldCompo
              // isLoading={loading}
              preValue={details.relation}
              title={`${Local('doctor.V2.your_family.modal.relation')}`}
              inputType="name" // required
              value={(text) => setDetails({ ...details, relation: text })}
            />
            <SimpleFieldCompo
              // isLoading={loading}
              preValue={details.email}
              title={`${Local('doctor.V2.your_family.modal.email')}`}
              inputType="email" // required
              value={(text) => SetCredential('email', text)}
            />

            {/* <View> */}

            {/* <TextInput
                  value={details.relation}
                  onChangeText={(text) =>
                    setDetails({ ...details, relation: text })
                  }
                  placeholderTextColor={Colors.input_placeholder_color[theme]}
                  placeholder={`${Local('patient.my_family.relationship')}`}
                  style={[
                    styles.text,
                    { color: Colors.primary_text_color[theme] },
                  ]}
                /> */}

            {/* <TextInput
                  value={details.email}
                  autoCapitalize="none"
                  onChangeText={(text) => SetCredential('email', text)}
                  placeholderTextColor={Colors.input_placeholder_color[theme]}
                  placeholder={`${Local('patient.my_family.email')}`}
                  style={[
                    styles.text,
                    { color: Colors.primary_text_color[theme] },
                  ]}
                />
                {!error.email && (
                  <AnimatedErrorText
                    style={{ width: '70%', alignSelf: 'center' }}
                    text={'Email ID should be valid'}
                  />
                )} */}

            {/* <EmailInput
                type="email"
                // isLoading={loading}
                // isError={
                //   RegexCheck('email').test(form.email) ? false : 'Enter valid'
                // }
                value={(text) => SetCredential('email', text)}
              /> */}
            <View style={[styles.text, { marginVertical: 10 }]}>
              {/* <TouchableOpacity onPress={() => setOpen(true)}> */}
              {/* <DateInputCompo
                    disabled={true}
                    onDateSelect={
                      (txt) =>
                        console.log(
                          '===>>>>>>>>>>>>date',
                          moment(txt).format('YYYY-MM-DD'),
                        )
                      // setDetails({ ...details, birthDay: txt })
                    }
                    DOB={details.birthDay}
                  /> */}
              <InsetShadow
                shadowOpacity={1}
                shadowOffset={15}
                containerStyle={styles.numberField}
                elevation={12}>
                <TextInput
                  style={styles.input}
                  // editable={open ? false : true}
                  onFocus={() => {
                    // Keyboard.dismiss();
                    setOpen(true);
                  }}
                  // onPress={() => setOpen(true)}
                  // onChangeText={onChangeNumber}
                  value={moment(details.birthDay).format('YYYY-MM-DD')}
                  placeholder="Date"
                  keyboardType="numeric"
                />
                <MaterialCommunityIcons
                  onPress={() => {
                    // Keyboard.dismiss();
                    setOpen(true);
                  }}
                  name="calendar-blank"
                  size={35}
                  style={{ color: '#333333' }}
                />
              </InsetShadow>
              {/* </TouchableOpacity> */}

              {/* <ButtonCompo
                    title="Open"
                    pressHandler={() => setOpen(true)}
                  /> */}
              {open ? (
                <View
                  style={{
                    flex: 1,
                    padding: 5,
                    elevation: 3,
                    backgroundColor: '#fff',
                    paddingVertical: 20,
                    borderRadius: 15,
                    marginTop: 10,
                    marginHorizontal: 5,
                  }}>
                  <DatePicker
                    maximumDate={new Date("2022-01-01")}
                    mode="date"
                    open={open}
                    date={date}
                    onDateChange={(txt) => {
                      // setOpen(false);
                      console.log('=====>>>>>>>>>date', txt);
                      setDetails({
                        ...details,
                        birthDay: moment(txt).format('YYYY-MM-DD'),
                      });
                      // console.log('=====>>>>>>>>>datebb', details.birthDay);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                  <View style={{ marginHorizontal: 60, marginVertical: 10 }}>
                    <ButtonCompo
                      title="Confirm"
                      pressHandler={() => setOpen(false)}
                    />
                  </View>
                </View>
              ) : (
                <View />
              )}
              {/* <DatePicker
                    date={details.birthDay}
                    mode="date"
                    placeholder={`${Local('patient.my_family.date_of_birth')}`}
                    format="MM/DD/YYYY"
                    minDate="01/01/1900"
                    maxDate={moment(new Date(), 'MM/DD/YYYY')}
                    showIcon={false}
                    allowFontScaling={true}
                    customStyles={{
                      dateInput: {
                        borderWidth: 0,
                        fontSize: 15,
                        height: 40,
                      },
                      placeholderText: {
                        color: '#77777795',
                        width: '100%',
                      },
                      dateText: {
                        color: '#000',
                        width: '100%',
                      },
                    }}
                    style={{
                      width: '100%',
                      paddingVertical: '-8%',
                    }}
                    onDateChange={(txt) =>
                      setDetails({ ...details, birthDay: txt })
                    }
                  /> */}
            </View>
            <View style={{ display: open ? 'none' : 'flex' }}>
              <Text style={{marginLeft:20, color:'gray'}}>Gender</Text>
              <View
                style={[
                  styles.text,
                  {
                    paddingVertical: '-12%',
                    color: Colors.primary_text_color[theme],
                  },
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 14,
                  }}>
                  <TouchableOpacity
                    onPress={() => setDetails({ ...details, gender: 'male' })}
                    style={{ flexDirection: 'row' }}>
                    <View
                      style={
                        {
                          width: 18,
                        backgroundColor:details.gender === 'male' ? '#fff' : 'gray',
                          
                          height: 18,
                          elevation: 0.1,
                          borderWidth: details.gender === 'male' ? 5 : 0,
                          borderRadius: 9,
                          borderColor:
                            details.gender === 'male' ? '#3893E4' : 'gray',
                        }
                        // details.gender === 'male'

                        // : styles.radiobutton,
                      }></View>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        marginLeft: 7,
                      }}>
                      {`${Local('doctor.V2.your_family.modal.gender.male')}`}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setDetails({ ...details, gender: 'female' })}
                    style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        width: 18,
                        backgroundColor:details.gender === 'female' ? '#fff' : 'gray',
                        height: 18,
                        elevation: 0.1,
                        borderWidth: details.gender === 'female' ? 5 : 0,
                        borderRadius: 9,
                        borderColor:
                          details.gender === 'female' ? '#3893E4' : 'gray',
                      }}></View>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        marginLeft: 7,
                      }}>
                      {`${Local('doctor.V2.your_family.modal.gender.female')}`}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => setDetails({ ...details, gender: 'other' })}
                    style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        width: 18,
                        backgroundColor:details.gender === 'other' ? '#fff' : 'gray',
                        height: 18,
                        elevation: 0.1,
                        borderWidth: details.gender === 'other' ? 5 : 0,
                        borderRadius: 9,
                        borderColor:
                          details.gender === 'other' ? '#3893E4' : 'gray',
                      }}></View>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        marginLeft: 7,
                      }}>
                      {`${Local('doctor.V2.your_family.modal.gender.other')}`}
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <Picker
                    placeholder={`${Local('patient.my_family.gender')}`}
                    selectedValue={details.gender}
                    style={{
                      color: Colors.primary_text_color[theme],
                    }}
                    onValueChange={(text) =>
                      setDetails({ ...details, gender: text })
                    }>
                    <Picker.Item
                      label={`${Local('patient.my_family.select_gender')}`}
                      value={''}
                      color="#ccc"
                    />
                    <Picker.Item
                      label={`${Local('patient.my_family.male')}`}
                      value="Male"
                    />
                    <Picker.Item
                      label={`${Local('patient.my_family.female')}`}
                      value="Female"
                    />
                  </Picker> */}
              </View>
              <SimpleFieldCompo
                // isLoading={loading}

                preValue={details.contact}
                title={`${Local('doctor.V2.your_family.modal.contact')}`}
                inputType="should10number" // required
                value={(text) => SetCredential('contact', text)}
              />
              {/* <TextInput
                  value={details.contact}
                  keyboardType={'number-pad'}
                  onChangeText={(text) => SetCredential('contact', text)}
                  placeholderTextColor={Colors.input_placeholder_color[theme]}
                  placeholder={`${Local('patient.my_family.contact')}`}
                  style={[
                    styles.text,
                    { color: Colors.primary_text_color[theme] },
                  ]}
                />
                {!error.contact && (
                  <AnimatedErrorText
                    style={{ width: '70%', alignSelf: 'center' }}
                    text={'Contact Number should be valid'}
                  />
                )} */}
              {details.medicalHistory &&
                details.medicalHistory.map((item, i) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: NEW_PRIMARY_BACKGROUND,
                      borderBottomWidth: 1.5,
                      marginBottom: 10,
                    }}>
                    <TextInput
                      value={item}
                      onChangeText={(text) => {
                        let temp = details.medicalHistory;
                        temp[i] = text;
                        setDetails({ ...details, medicalHistory: temp });
                      }}
                      placeholderTextColor={
                        Colors.input_placeholder_color[theme]
                      }
                      placeholder={`${Local(
                        'patient.my_family.medical_history',
                      )}`}
                      style={[
                        styles.text,
                        {
                          borderBottomWidth: 0,
                          flex: 1,
                          marginBottom: 0,
                          color: Colors.primary_text_color[theme],
                        },
                      ]}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        let temp = details.medicalHistory;
                        if (i + 1 === details.medicalHistory.length)
                          temp.push('');
                        else temp.splice(i, 1);
                        setDetails({ ...details, medicalHistory: temp });
                      }}>
                      <FontAwesome5
                        name={
                          i + 1 === details.medicalHistory.length
                            ? 'plus'
                            : 'minus'
                        }
                        size={10}
                        color={Colors.input_placeholder_color[theme]}
                        style={{ marginHorizontal: '2%' }}
                      />
                    </TouchableOpacity>
                  </View>
                ))}

              {showNewSubmitButton ? (
                <ButtonCompo
                  title={
                    editMode
                      ? `${Local('doctor.V2.your_family.modal.button2')}`
                      : `${Local('doctor.V2.your_family.modal.button')}`
                  }
                  pressHandler={() => {
                    onSubmit(details);
                  }}
                  style={{
                    Container: {
                      width: screenWidth * 0.8,
                      marginTop: 30,
                      height: 46,
                      borderRadius: 25,
                      backgroundColor: SECONDARY_COLOR,
                      alignSelf: 'center',
                      elevation: 3,
                      display: open ? 'none' : 'flex',
                    },
                  }}
                  textStyle={{
                    fontSize: 14,
                    fontFamily: 'Gilroy-SemiBold',
                  }}
                />
              ) : (
                <DmzButton
                  disabled={canAddmember ? false : true}
                  isLoading={addingFamilyMember}
                  onPress={() => onSubmit(details)}
                  style={{
                    Text: {
                      width: '100%',
                      textAlign: 'center',
                      color: '#fff',
                      fontSize: 18,
                      fontFamily: 'Gilroy-SemiBold',
                      display: open ? 'none' : 'flex',
                    },
                    Container: {
                      width: screenWidth * 0.8,
                      marginVertical: 30,
                      height: 46,
                      borderRadius: 25,
                      backgroundColor: canAddmember ? '#2D7D8E' : '#95B9C0',
                      alignSelf: 'center',
                      elevation: 3,
                      display: open ? 'none' : 'flex',
                    },
                  }}
                  text={
                    editMode
                      ? `${Local('patient.my_family.update')}`
                      : `${Local('patient.my_family.add_member')}`
                  }
                />
              )}
            </View>
          {/* </KeyboardAvoidingView> */}
        </ScrollView>
        {/* </RBSheet> */}
      </DraggablePanel>
    </View>
  );
};
function ListEmptyComponent({ loading, theme }) {
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
        source={require('../../assets/anim_svg/empty_bottle.json')}
        autoPlay
        loop
      />
      <Text style={textStyle}>
        {Local('patient.my_family.no_family_member_added')}
      </Text>
    </View>
  );
}

export default AllPatient;

const styles = StyleSheet.create({
  container: { flex: 1 },
  flatlist: { flex: 1, padding: 20 },
  ActionButtonContainer: {
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
    bottom: 25,
  },
  text: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    alignSelf: 'stretch',
    // borderBottomWidth: 1.5,
    // borderColor: NEW_PRIMARY_BACKGROUND,
    // padding: 5,
    borderRadius: 20,
    marginBottom: 7,
  },
  numberField: {
    alignSelf: 'stretch',
    borderRadius: 10,
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    height: 50,
    marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radiobutton: {
    width: 18,
    height: 18,
    elevation: 0.1,
    borderRadius: 9,
  },
  selectedRadio: {
    width: 18,
    height: 18,
    borderWidth: 5,
    borderRadius: 9,
    borderColor: '#3893E4',
  },
  input: {
    // height: 40,
    // margin: 12,
    // borderWidth: 1,
    // padding: 10,
    flex: 1,
    // width: '100%',
  },
  moreOptions: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,

    marginVertical: 10,
    marginHorizontal: 20,
  },
});
