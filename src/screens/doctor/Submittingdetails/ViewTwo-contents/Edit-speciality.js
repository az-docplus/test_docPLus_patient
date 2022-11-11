import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Image,
  Animated,
  Easing,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import TopNavBar from '../../../../components/molecules/TopNavBar/TopNavBar';
import Axios from 'axios';
import InsetShadow from 'react-native-inset-shadow';
import { Host } from '../../../../utils/connection';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const MaterialCommunityIconsIcons = ({ name, size, color }) => (
  <MaterialCommunityIcons size={size} color={color} name={name} />
);
import HeadersCompo from '../__Components/Header';
import { useDispatch } from 'react-redux';
import { UpdateDoctorProfile } from '../../../../reduxV2/action/DoctorAction';

const Specialities = ({ backToPageOne, doctorProfile }) => {
  const dispatch = useDispatch();
  const [specialities, setspecialities] = useState([]);
  const [selectedspecialities, setselectedspecialities] = useState(
    doctorProfile['specialties'],
  );
  const [allspecialities, setallspecialities] = useState([]);

  // const [threespecialities, setThreespecialities] = useState(null);
  // const [temp, setTemp] = useState(null);
  // const imagesname = [{names: '', image: ''}];
  // const [specialitiesimage, setSpecialitiesimage] = useState([]);
  // const [showsearch, setShowsearch] = useState(false);
  // const [pics, setPics] = useState([]);
  // const [apidata, setApidata] = useState(null);
  //  const [search, setSearch] = useState('');
  // const [specialities, setSpecialities] = useState([]);

  // // const [Totalspecialities, setTotalspecialities] = useState(null);
  // const Totalspecialities = [];
  // const [allspecialities, setAllspecialities] = useState([]);
  // const [searcharr, setSearcharr] = useState([]);
  // const imgs = [];

  useEffect(() => {
    Axios.get(Host + '/doctors/get/specialties').then((res) => {
      setspecialities(res.data.data);
      setallspecialities(res.data.data);
    });
  }, []);

  const handlesearch = (val) => {
    if (val === '') {
      setspecialities(allspecialities);
      setselectedspecialities(doctorProfile['specialties']);
    } else {
      const searcha = allspecialities.filter((item) => {
        return item.name.toLowerCase().includes(val.toLowerCase());
      });
      setspecialities(searcha);

      const alreadyAdded = selectedspecialities.filter((item) => {
        if (item.toLowerCase().includes(val.toLowerCase())) return item;
      });

      setselectedspecialities(alreadyAdded);
    }

    // console.log(searcharr);
  };

  // const addSpecialities = (item) => {
  //     if (selectedspecialities.length < 3) {
  //         // const temp = selectedspecialities.push(item);
  //         setselectedspecialities([...selectedspecialities, item]);
  //         const newarr = specialities.filter((element) => {
  //             return item.name !== element.name;
  //         });
  //         setspecialities(newarr);
  //     }
  // };

  const Ovalboxnocross = (props) => {
    const image = props.item.picture;
    const changeduri = `${Host}${image
      ?.replace('public', '')
      ?.replace('\\\\', '/')}`;
    // console.log(changeduri);
    return (
      <View
        style={{
          height: 88,
          width: 176,
          shadowColor: 'blue',
          elevation: 12,
          marginBottom: 5,
          marginLeft: 15,
          marginTop: 5,
          borderRadius: 20,
        }}>
        <View
          style={{
            height: 82,
            width: 176,
            marginLeft: 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            onPress={() => {
              updateSpecialtyArray(props.item.name);
            }}>
            <View
              style={{
                height: 55,
                width: 220,

                flexDirection: 'row',
                marginTop: -4,
                // marginLeft: -4,
              }}>
              <Image
                style={{
                  height: 50,
                  width: 50,
                  marginLeft: 30,
                  marginTop: 0,
                }}
                source={{ uri: changeduri }}
              />
              <View
                style={{
                  width: 105,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 13,
                    marginLeft: 8,
                    // marginTop: 10,
                  }}>
                  {props.item.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const updateSpecialtyArray = (specialty) => {
    const found = selectedspecialities.find((el) => el === specialty);
    if (!found) {
      const dataToUpdate = {
        id: doctorProfile?._id,
        specialties: [...selectedspecialities, specialty],
      };
      dispatch(
        UpdateDoctorProfile(
          dataToUpdate,
          () => {
            setselectedspecialities([...selectedspecialities, specialty]);
            setspecialities(specialities.filter((e) => e != specialty));
          },
          (e) => {
            console.log('error in saving :::::>>> ', e);
          },
        ),
      );
    }
  };
  const RemovefromArray = (specialty) => {
    const dataToUpdate = {
      id: doctorProfile?._id,
      specialties: selectedspecialities.filter((e) => e != specialty),
    };
    dispatch(
      UpdateDoctorProfile(
        dataToUpdate,
        () => {
          setspecialities([
            ...specialities,
            allspecialities.find((e) => e.name == specialty),
          ]);
          setselectedspecialities(
            selectedspecialities.filter((e) => e != specialty),
          );
        },
        (e) => {
          console.log('error in saving :::::>>> ', e);
        },
      ),
    );
  };
  return (
    <ScrollView>
      <View style={{ backgroundColor: 'white' }}>
        <HeadersCompo title="Specialities" backHandler={backToPageOne} />
        <View
          style={{
            width: '88%',
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
              placeholder="Search"
              // value={search}
              onChangeText={(value) => handlesearch(value)}
            />
          </InsetShadow>
        </View>
        {/* selected specialities */}
        {selectedspecialities.length > 0 && (
          <View>
            <Text
              style={{
                color: 'grey',
                marginLeft: 20,
                marginVertical: 12,
              }}>
              SELECTED SPECIALIZATION ({selectedspecialities.length}/ 3)
            </Text>
            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ flexDirection: 'row' }}>
                {selectedspecialities.map((item, index) => {
                  return (
                    <View
                      style={{
                        elevation: 12,
                        marginBottom: 15,
                        marginLeft: 15,
                        marginTop: 20,
                        borderRadius: 12,
                        backgroundColor: '#fff',
                      }}>
                      <TouchableOpacity onPress={() => RemovefromArray(item)}>
                        <Text
                          style={{
                            fontFamily: 'Montserrat-SemiBold',
                            paddingVertical: 25,
                            paddingHorizontal: 35,
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        )}

        {/* Null selected specialities */}

        <View>
          <Text
            style={{
              color: 'grey',
              marginLeft: 22,
              marginVertical: 14,
              fontFamily: 'Montserrat-Regular',
              fontSize: 12,
            }}>
            RECOMMENDED SPECIALIZATION (MAX 3)
          </Text>
          {/* {showsearch ? (
            <View
              style={{flexDirection: 'row', width: '100%', flexWrap: 'wrap'}}>
              {searcharr.map((item) => {
                return <Ovalboxnocross name={item}></Ovalboxnocross>;
              })}
            </View>
          ) : ( */}
          <View
            style={{ flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}>
            {specialities &&
              specialities.map((item, index) => {
                if (item.popular) {
                  return <Ovalboxnocross item={item}></Ovalboxnocross>;
                }
              })}
          </View>
          {/* )} */}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  numberField: {
    borderRadius: 10,
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    height: 50,
    width: '96%',
    borderWidth: 0.1,
  },
});

export default Specialities;
