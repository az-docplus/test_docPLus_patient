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
  GetHospitals,
  GetHospitalsOfDoctor,
  AddHospital,
} from '../../../../reduxV2/action/DoctorAction';

const HospitalAffiliations = ({
  backToPageOne,
  doctorProfile,
  setUpdateComponent,
  updateComponent,
}) => {
  const [location, setLocation] = useState('');
  //   const [Address, setAddress] = useState('');
  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [AffiliatedHospitals, setAffiliatedHospitals] = useState([]);
  const [Hospitals, setHospitals] = useState([]);
  const { userData } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const GetAllHospitals = () => {
    dispatch(
      GetHospitals((err, response) => {
        if (!err) {
          setSelectedHospitals(response);
          setHospitals(response);
        }
      }),
    );
  };

  const GetDoctorHospitals = (
    payload = {
      doctor: userData._id,
    },
  ) => {
    dispatch(
      GetHospitalsOfDoctor(payload, (err, response) => {
        if (!err) setAffiliatedHospitals(response);
        else console.log(response);
      }),
    );
  };

  useEffect(() => {
    GetAllHospitals();
    GetDoctorHospitals();
  }, []);

  //   const checkLocationMatch = (item) => {
  //     if (location == '') return true;
  //     let match = false;
  //     Address.map((el) => {
  //       if (item.Address.includes(el.long_name)) match = true;
  //     });
  //     return match;
  //   };

  const handleSearch = (value) => {
    if (value === '' && location === '') setSelectedHospitals(Hospitals);
    if (value == '') {
      const temp = Hospitals.filter((item) => {
        // if (checkLocationMatch(item)) return item;
        if (item.Address.includes(location)) return item;
      });
      setSelectedHospitals(temp);
    } else {
      const temp = Hospitals.filter((item) => {
        if (
          item.Name.toLowerCase().includes(value.toLowerCase()) ||
          item.Address.includes(location)
          //   checkLocationMatch(item)
          //&& SOme location logic
        )
          return item;
      });
      setSelectedHospitals(temp);
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
            {props.item.Name}
          </Text>
          <Text
            style={{
              color: '#555555',
              fontSize: 14,
              fontFamily: 'Gilroy-Medium',
              marginBottom: 10,
            }}>
            {props.item.Address}
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

  const handleSelect = (hospital) => {
    delete hospital._id;
    delete hospital.__v;
    dispatch(
      AddHospital(
        {
          ...hospital,
          doctor: userData._id,
        },
        (err) => {
          console.log(err, 'err____________________')
          if (!err) {
            setUpdateComponent(!updateComponent);
            GetDoctorHospitals();
          }
        },
      ),
    );
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View>
        <HeadersCompo
          title="Hospital Affiliations"
          backHandler={backToPageOne}
        />
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
            placeholder="Hospital Name"
            // value={search}
            onChangeText={(value) => handleSearch(value)}
          />
        </InsetShadow>
      </View>
      {AffiliatedHospitals.length > 0 && (
        <View>
          <Text
            style={{
              color: '#555555',
              marginLeft: 25,
              marginTop: 10,
              fontSize: 14,
            }}>
            AFFILIATED HOSPITALS
          </Text>

          {AffiliatedHospitals.map((item) => {
            return (
              <View>
                <Locationbar item={item}></Locationbar>
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
          LIST OF HOSPITALS
        </Text>
        {selectedHospitals.map((item) => {
          return <Locationbar onPress={handleSelect} item={item} />;
        })}
      </View>
      <View style={{ marginTop: 15, marginHorizontal: 15 }}>
        {/* <CancelSaveButtons onCancelPress={() => {}} onSavePress={() => {}} /> */}
      </View>
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
export default HospitalAffiliations;
