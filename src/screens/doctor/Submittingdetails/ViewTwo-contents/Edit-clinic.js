import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import InsetShadow from 'react-native-inset-shadow';
import Input from '../../../../components/atoms2/Input/suggestion-input';
import CancelSaveButtons from '../__Components/cancel-save-buttons';
import HeadersCompo from '../__Components/Header';
import {
  AddHospital,
  GetClinics,
  AddClinics,
} from '../../../../reduxV2/action/DoctorAction';
import axios from 'axios';
import { Host } from '../../../../utils/connection';

const ClinicAffiliations = ({ backToPageOne, doctorProfile }) => {
  const [location, setLocation] = useState('');
  //   const [Locality, setLocality] = useState('');
  const [selectedClinics, setSelectedClinics] = useState([]);
  const [AffiliatedClinics, setAffiliatedClinics] = useState([]);
  const [AllClinics, setAllClinics] = useState([]);
  const [updated, setUpdated] = useState(false);
  const { userData } = useSelector((state) => state.AuthReducer);
  const { gettingClincs, Clinics } = useSelector(
    (state) => state.DoctorReducer,
  );
  const dispatch = useDispatch();

  const GetAllClinics = () => {
    axios
      .get(`${Host}/clinic/getallclinic`)
      .then((e) => {
        setAllClinics(e.data.data);
        setSelectedClinics(e.data.data);
        setUpdated(!updated);
      })
      .catch((e) => {
        console.log('catch : ', e);
      });
  };

  //   console.log({ selectedClinics });

  const GetDoctorClinics = () => {
    dispatch(GetClinics(userData._id));
  };
  
  useEffect(() => {
    // console.log({ Clinics });
    setAffiliatedClinics(Clinics);
  }, [Clinics]);

  useEffect(() => {
    GetAllClinics();
    GetDoctorClinics();
  }, []);

  //   const checkLocationMatch = (item) => {
  //     if (location == '') return true;
  //     let match = false;
  //     Locality.map((el) => {
  //       if (item.Locality.includes(el.long_name)) match = true;
  //     });
  //     return match;
  //   };

  const handleSearch = (value) => {
    if (value === '' && location === '') setSelectedClinics(AllClinics);
    if (value == '') {
      const temp = AllClinics.filter((item) => {
        // if (checkLocationMatch(item)) return item;
        if (item.Locality.includes(location)) return item;
      });
      setSelectedClinics(temp);
    } else {
      const temp = AllClinics.filter((item) => {
        if (
          item.ClinicName.toLowerCase().includes(value.toLowerCase()) ||
          item.Locality.includes(location)
          //   checkLocationMatch(item)
          //&& SOme location logic
        )
          return item;
      });
      setSelectedClinics(temp);
    }
  };

  const Locationbar = (props) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.onPress && props.onPress(props.item);
        }}>
        <View style={{ marginLeft: 35, marginTop: 10 }}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontFamily: 'Montserrat-Regular',
              marginBottom: 4,
            }}>
            {props.item.ClinicName}
          </Text>
          <Text
            style={{
              color: '#555555',
              fontSize: 14,
              fontFamily: 'Gilroy-Medium',
              marginBottom: 10,
            }}>
            {props.item.Locality}
          </Text>
          <View
            style={{
              height: 1,
              width: '70%',
              backgroundColor: '#EFEFEF',
              marginLeft: 30,
            }}></View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleSelect = (el) => {
    // const found = AffiliatedClinics.find((el) => el._id === clinic._id);
    // if (!found) setAffiliatedClinics([...AffiliatedClinics, clinic]);
    delete el._id;
    delete el.__v;
    delete el.Timing;
    // console.log({ el });
    dispatch(
      AddClinics(
        {
          ...el,
          doctor: userData._id,
          ClinicType: 'owned',
        },
        () => {
          GetDoctorClinics();
        },
      ),
    );
  };

  const handleUnSelect = (clinic) => {
    const index = AffiliatedClinics.findIndex((el) => el._id === clinic._id);
    console.log({ index });
    // const newAffiliatedClinics = AffiliatedClinics.splice(index, 1);
    const newAffiliatedClinics = AffiliatedClinics.filter(
      (item, i) => i !== index,
    );
    setAffiliatedClinics(newAffiliatedClinics);
  };

  const handleSubmit = async () => {
    const promise = await Promise.all([
      AffiliatedClinics.map((el) => {
        delete el._id;
        delete el.__v;
        dispatch(
          AddClinics(el, () => {
            GetDoctorClinics();
          }),
        );
      }),
    ]);
    backToPageOne();
  };
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View>
        <HeadersCompo title="Clinic Affiliations" backHandler={backToPageOne} />
      </View>
      {/* suggestions box */}
      <View style={{ width: '90%', marginLeft: 30, marginTop: 10 }}>
        <Text style={{ fontSize: 10, marginBottom: -15, marginLeft: 10 }}>
          Location
        </Text>
        <Input
          //   onChangeText={handleSearch(location)}
          onFetchLocation={(address) => setLocation(address)}
          value={(e) => {
            setLocation(e);
            handleSearch(e);
          }}
        />
      </View>
      <View
        style={{
          width: '90%',
          marginLeft: 28,
          marginTop: 20,
        }}>
        <InsetShadow
          shadowOpacity={1}
          shadowOffset={15}
          containerStyle={styles.numberField}
          shadowOffset={10}
          elevation={8}>
          <TextInput
            // editable={!isLoading}
            // keyboardType={name} // name,year,numbers
            // onTouchStart={(e) => {}}
            // onChangeText={(e) => {}}
            // value={inputText}
            placeholder="Clinic Name"
            // value={search}
            onChangeText={(value) => handleSearch(value)}
          />
        </InsetShadow>
      </View>
      {AffiliatedClinics.length > 0 && (
        <View>
          <Text
            style={{
              color: '#555555',
              marginLeft: 25,
              marginTop: 10,
              fontSize: 14,
            }}>
            AFFILIATED CLINICS
          </Text>

          {AffiliatedClinics.map((item) => {
            return (
              <View>
                <Locationbar
                  // onPress={handleUnSelect}
                  item={item}></Locationbar>
              </View>
            );
          })}
        </View>
      )}

      <View>
        <Text
          style={{
            color: '#555555',
            marginLeft: 25,
            marginTop: 10,
            fontSize: 14,
          }}>
          LIST OF CLINICS
        </Text>
        {selectedClinics.map((item) => {
          return <Locationbar onPress={handleSelect} item={item} />;
        })}
      </View>
      {/* <View style={{ marginTop: 15, marginHorizontal: 15 }}>
        <CancelSaveButtons
          onCancelPress={() => {}}
          onSavePress={() => {}}
        //   onSavePress={handleSubmit}
        />
      </View> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  numberField: {
    borderRadius: 20,
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    height: 55,
    width: '96%',
    borderWidth: 0.1,
  },
});
export default ClinicAffiliations;
