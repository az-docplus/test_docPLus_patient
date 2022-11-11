import React, { useState, useEffect } from 'react';
import { Text, View, Alert, StyleSheet } from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {
  NEW_HEADER_TEXT,
  GREY_OUTLINE,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import AddFamily from '../../../components/molecules/Modal/AddFamily';
import { useSelector, useDispatch } from 'react-redux';
import {
  GetFamilyMember,
  AddFamilyMember,
} from '../../../reduxV2/action/PatientAction';
import { Picker } from '@react-native-community/picker';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import {
  ContinueAs,
  GetFamilyMeberInfo,
  ContinueAsOwner,
} from '../../../reduxV2/action/PatientAction';

import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';
// {Local("patient.my_profile.medical_history")}

const ContinueAsFun = ({ navigation }) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const [addModal, setModal] = useState(false);
  const { familyMember, isPatientAccountReducerLoading, patient } = useSelector(
    (state) => state.PatientReducer,
  );
  const dispatch = useDispatch();
  console.log('xxxxxxxxxxxxxxx', patient);
  console.log('yyyyyyyyyyyyyyy', userData);
  console.log('zzzzzzzzzzzzzzz', familyMember);
  const [lang, setLang] = useState('en');

  const SetLang = async (lan) => {
    setLang(lan);
    setLocale(lan);
  };

  useEffect(() => {}, [lang]);

  useEffect(() => {
    console.log(familyMember, '.........................');
    dispatch(GetFamilyMember(patient.meta._id));
  }, []);

  const [credential, setCredential] = useState({
    id: patient._id,
    meta: patient.meta._id,
  });
  console.log('credeinsccccccccccccc', credential);
  const onSubmit = (data) => {
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
      contact: phone,
      gender,
      birthDay: birthdate,
      relation: relationship,
    } = data;
    if (
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      phone !== '' &&
      gender !== '' &&
      birthdate !== '' &&
      relationship !== '' &&
      phone.length == 10
    ) {
      const {
        firstName,
        lastName,
        email,
        contact: phone,
        gender,
        birthDay: birthdate,
        relation: relationship,
      } = data;
      console.log(data);
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
            metaId: patient.meta._id,
          },
          () => {
            dispatch(GetFamilyMember(patient.meta._id));
          },
        ),
      );
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
        : null;
    }
    setModal(false);
  };
  const credentialSet = (id) => {
    console.log('pppppppppppppppppp', id);
    if (id == patient._id) {
      setCredential({
        id: patient._id,
        meta: patient.meta._id ? patient.meta._id : patient.meta,
      });
    } else {
      const member = familyMember.find((item) => item.id === id);
      console.log('fffffffffffff', member);
      setCredential(member);
    }
  };
  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.primary_background[theme] }}>
      <TopNavBar
        hideRightComp={true}
        // hideLeftComp={true}
        headerText={`${Local('patient.settings.docplus')}`}
        onLeftButtonPress={() => navigation.navigate('PatientLandingScreen')}
        style={{ Header: { marginLeft: -24 } }}
      />
      <AddFamily
        visible={addModal}
        onCancel={() => setModal(false)}
        onUpdate={onSubmit}
      />
      <View style={{ flex: 1, paddingHorizontal: '4%', marginTop: '2%' }}>
        {/* language setting */}
        <View
          style={{
            marginTop: '5%',
            //  marginBottom: 0
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 28,
              fontFamily: 'Montserrat-SemiBold',
              marginBottom: '3%',
              color: Colors.primary_text_color[theme],
            }}>
            {Local('patient.settings.language')} :
          </Text>
          <View
            style={[
              ConfirmAppointmentStyles.text,
              ConfirmAppointmentStyles.upperText,
            ]}>
            <Picker
              mode={'dropdown'}
              selectedValue={lang}
              style={{
                height: 20,
                width: '100%',
                color: Colors.primary_text_color[theme],
              }}
              onValueChange={(itemValue, itemIndex) => SetLang(itemValue)}>
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Hindi" value="hi" />
            </Picker>
          </View>
          <View
            style={{
              marginTop: '5%',
              // marginBottom: 'auto'
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 28,
                fontFamily: 'Montserrat-SemiBold',
                marginBottom: '3%',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('patient.settings.continue_as')} :
            </Text>
            <View
              style={[
                ConfirmAppointmentStyles.text,
                ConfirmAppointmentStyles.upperText,
              ]}>
              <Picker
                style={{
                  height: 20,
                  width: '100%',
                  color: Colors.primary_text_color[theme],
                }}
                selectedValue={credential?.id}
                onValueChange={credentialSet}>
                <Picker.Item
                  color="#777"
                  label={`${Local('patient.settings.select_name')}`}
                  value={null}
                />
                <Picker.Item
                  label={`${patient.firstName} ${patient.lastName}`}
                  value={patient._id}
                />
                {familyMember.map((item) => (
                  <Picker.Item
                    label={`${item.firstName} ${item.lastName}`}
                    value={item.id}
                  />
                ))}
              </Picker>
            </View>
            <DmzButton
              isLoading={isPatientAccountReducerLoading}
              onPress={() => {
                // credential && credential?.id != patient._id
                //   ? dispatch(GetFamilyMeberInfo(credential, patient))
                //   : dispatch(ContinueAsOwner())
                dispatch(GetFamilyMeberInfo(credential, patient));
                //dispatch(ContinueAs({isPatientFamilyMember : false, ...credential}))
                // navigation.navigate('PatientDrawerWrapper');
              }}
              style={{
                Text: {
                  width: '100%',
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: 'Montserrat-SemiBold',
                },
                Container: {
                  width: 250,
                  height: 46,
                  borderRadius: 25,
                  backgroundColor: SECONDARY_COLOR,
                  alignSelf: 'center',
                  marginVertical: 20,
                  elevation: 3,
                },
              }}
              text={`${Local('patient.settings.continue')}`}
            />
          </View>

          {/* <DmzButton
            onPress={() => {
              SetLang(lang)

            }}
            style={{
              Text: {
                width: '100%',
                textAlign: 'center',
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              },
              Container: {
                width: 250,
                height: 46,
                borderRadius: 25,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                marginVertical: 20,
                elevation: 3,
              },
            }}
            text={`${Local("patient.settings.continue")}`}
          /> */}
        </View>
      </View>
    </View>
  );
};
const ConfirmAppointmentStyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
  ScrollView: {
    flex: 1,
  },
  ScheduleAvailability: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  ScheduleTiming: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: 200,
  },
  DateAndTime: {
    marginLeft: 5,
  },
  Date: {
    color: '#222',
  },
  Time: {
    fontWeight: '600',
    fontSize: 15,
  },
  Available: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  AvailableText: {
    color: '#22C663',
    marginLeft: 10,
  },
  InputLabel: {
    fontSize: 18,
    color: '#545454',
    marginTop: 10,
    marginLeft: 10,
  },
  ConsultFeeContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rootGroup: {
    margin: 15,
    marginVertical: 20,
  },
  rootHeading: {
    fontSize: 19,
    fontFamily: 'Montserrat-SemiBold',
    color: NEW_HEADER_TEXT,
    marginBottom: 10,
  },
  inputGroup: {
    borderRadius: 15,
    // padding: 10,
    borderWidth: 1,
    borderColor: GREY_OUTLINE,
    overflow: 'hidden',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: GREY_OUTLINE,
    // paddingVertical: 20,
  },
  upperText: {
    borderRadius: 15,
  },
  bottomText: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});
export default ContinueAsFun;
