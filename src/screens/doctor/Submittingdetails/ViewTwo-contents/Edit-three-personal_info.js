import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Modal,
  PermissionsAndroid,
  Image,
  TextInput,
} from 'react-native';
import SimpleFieldCompo from '../../../../components/atoms2/Input/simple-field';
import MMaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialAntDesign from 'react-native-vector-icons/AntDesign';
import DateInputCompo from '../../../../components/atoms2/Input/date-input';
import SuggestionInputCompo from '../../../../components/atoms2/Input/suggestion-input';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import EmailPhoneInputCompo from '../../../../components/atoms2/Input/Input';
const MMaterialIconsIconsIcons = ({ name, size, color }) => (
  <MMaterialIconsIcons size={size} color={color} name={name} />
);
const MaterialAntDesignIcon = ({ size, name, color }) => (
  <MaterialAntDesign size={size} name={name} color={color} />
);
const MaterialCommunityIconsIcons = ({ name, size, color }) => (
  <MaterialCommunityIcons size={size} color={color} name={name} />
);
const AntDesignIconsIcons = ({ name, size, color }) => (
  <AntDesignIcons size={size} color={color} name={name} />
);
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { UpdateDoctorProfile } from '../../../../reduxV2/action/DoctorAction';
import PersonImage from '../../../../assets/jpg/person2.jpg';
import Axios from 'axios';
import { Host } from '../../../../utils/connection';
import CancelSaveButtons from '../__Components/cancel-save-buttons';
import UploadDocsCompo from '../__Components/Upload-documents';
function calculate_age(dob) {
  var test = new Date(dob);
  var diff_ms = Date.now() - test.getTime();
  var age_dt = new Date(diff_ms);
  return Math.abs(age_dt.getUTCFullYear() - 1970);
}
const RegexCheck = (type) => {
  if (type == 'name') {
    return new RegExp(/^[a-zA-Z ]+$/);
  } else if (type == 'year') {
    return new RegExp(/^(19[5-9]\d|20[0-4]\d|2050)$/);
  } else if (type == 'number') {
    return new RegExp('^[0-9]+$');
  } else if (type == 'email') {
    return new RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    );
  } else if (type == 'should10number') {
    return new RegExp(/^[0-9]{10}$/);
  } else if (type == 'phone') {
    return new RegExp(
      /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
    );
  }
};


export default function EditThreePersonalInfo({
  doctorProfile,
  backToPageOne,
  editLanguages,
}) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstName: doctorProfile['firstName'],
    lastName: doctorProfile.lastName,
    dateOfBirth: doctorProfile?.dob ? doctorProfile?.dob : null,
    gender: doctorProfile.gender,
    location: doctorProfile?.location,
    phone: doctorProfile.phone,
    email: doctorProfile.email,
    languages: doctorProfile.languages || [],
  });

  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSeletedLanguage] = useState(null);
  const [error, setError] = useState({ text: '', visible: false });
  const UpdateDoctorProfileHandler = () => {
    setLoading(true);
    if (!(form['firstName'].length && form['lastName'].length)) {
      setLoading(false);
      return setError({ text: 'Please enter valid name !', visible: true });
    }
    if (!form['dateOfBirth']) {
      setLoading(false);
      return setError({ text: 'Please enter date of birth !', visible: true });
    }
    if (!(form['phone']?.length > 12 && form['phone']?.length < 14)) {
      setLoading(false);
      return setError({ text: 'Please enter valid phone number !', visible: true });
    }
    if (!(RegexCheck('email').test(form['email']))) {
      setLoading(false);
      return setError({ text: 'Please enter valid email !', visible: true });
    }
    setError({ text: '', visible: false });
    const userData = {
      id: doctorProfile?._id,
      firstName: form['firstName'],
      lastName: form['lastName'],
      location: form['location'],
      gender: form['gender'],
      // age: calculate_age(form['dateOfBirth']),
      dob: form['dateOfBirth'],
      email: form['email'],
      phone: form['phone'],
      onBoarding: doctorProfile['onBoarding']
      //  document: // url
    };
    dispatch(
      UpdateDoctorProfile(
        userData,
        () => {
          setError({ text: 'Saved !', visible: true });
          setLoading(false);
          backToPageOne();
        },
        (e) => {
          setError({ text: JSON.stringify(e.response.data), visible: true });
        },
      ),
    );
  };
  const updateDoctorDocumentFunc = (url) => {
    const userData = {
      id: doctorProfile?._id,
      idProof: url,
    };
    dispatch(
      UpdateDoctorProfile(
        userData,
        () => {
          setError({ text: 'Document Saved !', visible: true });
        },
        (e) => {
          console.log('error in saving :::::>>> ', Object.keys(e));
          setError({ text: JSON.stringify(e.response.data), visible: true });
        },
      ),
    );
  };

  const SaveLanguageListFunc = (language) => {
    setLoading(true);
    const userData = {
      id: doctorProfile?._id,
      languages: form['languages']?.filter((e) => e != language),
    };
    dispatch(
      UpdateDoctorProfile(
        userData,
        () => {
          setLoading(false);
          setForm({
            ...form,
            languages: form['languages']?.filter((e) => e != language),
          });
        },
        (e) => {
          setLoading(false);
          setError({ text: JSON.stringify(e), visible: true });
          console.log('error in saving :::::>>> ', e);
        },
      ),
    );
  };

  useEffect(() => {
    Object.keys(doctorProfile).forEach((e, i) => {
      console.log(e, ' :: ', doctorProfile[e]);
    });

    //console.log("doctorProfile : ", doctorProfile?.dob)
    return () => {
      setError({ text: ' ', visible: false });
      setLoading(false);
    };
  }, [doctorProfile]);
  return (
    <ScrollView style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          marginVertical: 20,
          marginHorizontal: 5,
        }}
        onPress={() => {
          backToPageOne();
          if (editLanguages) {
            backToPageOne;
          }
        }}>
        <MaterialAntDesignIcon name="leftcircleo" size={20} color="#000" />
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 22,
            marginLeft: 10,
          }}>
          Personal Info
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
        }}>
        <SimpleFieldCompo
          isLoading={loading}
          title="First Name"
          inputType="name" // required
          preValue={form['firstName']}
          value={(e) => {
            setForm({ ...form, firstName: e });
          }}
        />
        <SimpleFieldCompo
          isLoading={loading}
          title="Last Name"
          preValue={form['lastName']}
          inputType="name" // required
          value={(e) => {
            setForm({ ...form, lastName: e });
          }}
        />
      </View>
      <View style={{ marginTop: 15 }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 10,
            marginLeft: 14,
            color: '#707585',
            marginBottom: -15,
          }}>
          Date of Birth
        </Text>
        <DateInputCompo
          onDateSelect={(e) => {
            setForm({ ...form, dateOfBirth: e });
          }}
          DOB={form.dateOfBirth}
        />
      </View>
      <View style={{ marginTop: 15 }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 10,
            marginLeft: 14,
            color: '#707585',
          }}>
          Gender
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 14,
          }}>
          <TouchableOpacity
            onPress={() => setForm({ ...form, gender: 'male' })}
            style={{ flexDirection: 'row' }}>
            <View
              style={[
                form.gender == 'male'
                  ? styles.selectedRadio
                  : styles.radiobutton,
              ]}></View>
            <Text style={{ fontFamily: 'Montserrat-Regular', marginLeft: 7 }}>
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setForm({ ...form, gender: 'female' })}
            style={{ flexDirection: 'row' }}>
            <View
              style={[
                form.gender == 'female'
                  ? styles.selectedRadio
                  : styles.radiobutton,
              ]}></View>
            <Text style={{ fontFamily: 'Montserrat-Regular', marginLeft: 7 }}>
              Female
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setForm({ ...form, gender: 'other' })}
            style={{ flexDirection: 'row' }}>
            <View
              style={[
                form.gender == 'other'
                  ? styles.selectedRadio
                  : styles.radiobutton,
              ]}></View>
            <Text style={{ fontFamily: 'Montserrat-Regular', marginLeft: 7 }}>
              Other
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 18 }}>
        <SuggestionInputCompo
          isLoading={loading}
          prevalue={form.location}
          title="Location"
          value={(e) => {
            setForm({ ...form, location: e });
          }}
        />
      </View>

      <View
        style={{ height: 1, backgroundColor: '#EEEEEE', marginTop: 24 }}></View>

      <View style={{ width: '98%', marginTop: 12 }}>
        <SimpleFieldCompo
          isLoading={loading}
          title="Phone"
          preValue={form['phone'] ? form['phone'].slice(1) : ''}
          regexType="number"
          inputLength={{
            min: 10,
            max: 12,
          }}
          inputType="number-pad" // required
          value={(e) => {
            setForm({ ...form, phone: `+${e}` });
          }}
        />

        {/* <EmailPhoneInputCompo
                    type="phone"
                    isLoading={loading}
                    preValue={form.phone}
                    isError={RegexCheck('phone').test(form.phone) ? false : "Enter valid"}
                    value={e => {
                        if (e) {
                            return setForm({ ...form, phone: e.phone })
                        }
                        setForm({ ...form, phone: null })
                    }}
                /> */}
      </View>

      <View
        style={{ height: 1, backgroundColor: '#EEEEEE', marginTop: 24 }}></View>

      <View style={{ width: '98%', marginTop: 6 }}>
        <EmailPhoneInputCompo
          type="email"
          isLoading={loading}
          preValue={form.email}
          isError={RegexCheck('email').test(form.email) ? false : 'Enter valid'}
          value={(e) => {
            if (e) {
              return setForm({ ...form, email: e.email });
            }
            setForm({ ...form, email: null });
          }}
        />
      </View>

      <View
        style={{ height: 1, backgroundColor: '#EEEEEE', marginTop: 24 }}></View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
            marginHorizontal: 5,
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 18,
                marginRight: 5,
              }}>
              Languages
            </Text>
            
          </View>
          <View>
            <TouchableOpacity
              onPress={editLanguages}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#E0F4F4',
                paddingHorizontal: 15,
                paddingVertical: 3,
                borderRadius: 100,
              }}>
              <Text style={{ color: '#297281' }}>+</Text>
              <Text style={{ color: '#297281', marginLeft: 7 }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginVertical: 10, marginBottom: 20 }}>
          <FlatList
            data={form.languages}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            key={(e) => e.toString()}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#FDE8F0',
                    alignItems: 'center',
                    marginLeft: 8,
                    borderRadius: 12,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => setSeletedLanguage(item)}
                    style={{}}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 16,
                        marginRight: 6,
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                  {selectedLanguage == item && (
                    <TouchableOpacity
                      onPress={() => {
                        console.log('item : ', item);
                        SaveLanguageListFunc(item);
                      }}
                      style={{}}>
                      <AntDesignIconsIcons
                        name="close"
                        color="#EA1A65"
                        size={30}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
          />
        </View>
      </View>

      <View style={{ height: 1, backgroundColor: '#EEEEEE' }}></View>

      <UploadDocsCompo
        title="Upload"
        desc="National Identity Proof"
        preImage={doctorProfile['document']
          ?.replace('public', '')
          ?.replace('\\\\', '/')}
        onSubmitGetUrl={(e) => {
          updateDoctorDocumentFunc(
            e.replace('public', '')?.replace('\\\\', '/'),
          );
        }}
      />

      {error.visible ? (
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Montserrat-Bold',
            marginVertical: 14,
            fontSize: 14,
            color: '#EA1A65',
          }}>
          {error.text}
        </Text>
      ) : (
        <Text> </Text>
      )}

      <CancelSaveButtons
        onCancelPress={backToPageOne}
        onSavePress={UpdateDoctorProfileHandler}
        isLoading={loading}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
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
    borderColor: 'blue',
  },
});
