import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, TextInput } from 'react-native-paper';
import AwesomeButton from 'react-native-really-awesome-button';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import InsetShadow from 'react-native-inset-shadow';
import {
  AddFevDoc,
  GetPatientInfo,
  RemoveFevDoc,
} from '../../reduxV2/action/PatientAction';
import PicturelessAvatar from '../../components/atoms/PicturelessAvatar/PicturelessAvatar';
import CustomTextComponent from '../../components/CustomTextComponent';
import DoctorHeader from '../../components/DoctorHeader';
import {
  fetchCustomDoctor,
  fetchDoctorLite,
} from '../../reduxV2/action/DoctorToPatientAction';
import { Colors } from '../../utils/Colors';
import { Host } from '../../utils/connection';
import { windowWidth } from '../../utils/utils';
import DoctorSearch from './DoctorSearch';
import Favorites from '../../components/atoms2/doctor/favorites';
import ButtonCompo from '../../components/atoms2/button/button';
import { BottomSheet, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllDoctore = ({ route, navigation }) => {
  const consern = route.params.consern;
  const [screen, setScreen] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [localLoading, setLocalLoading] = React.useState(false);
  const [headerText, setHeaderText] = React.useState('');
  const dispatch = useDispatch();
  const { userData, theme, isLoggedin } = useSelector(
    (state) => state.AuthReducer,
  );
  const {
    doctors,
    loading,
    moreDoctorLoading,
    searchDoctorsLoading,
    searchedDoctors,
    superDocsLoading,
    superDocs,
  } = useSelector((state) => state.DoctorToPatientReducer);
  const {
    patient,
    // isPatientAccountReducerLoading
  } = useSelector((state) => state.PatientReducer);

  const [user, setuser] = useState([]);
  const getUser = async () => {
    const data = await AsyncStorage.getItem('name');
    let res = JSON.parse(data);
    if (res != null) {
      setuser(res);
    }
  };
  // console.log(user.name);
  useEffect(() => {
    getUser();
  }, [user]);

  useEffect(() => {
    dispatch(fetchDoctorLite('', 0, false));
  }, []);
  const [border, setBorder] = useState(false);
  const [consernText, setConsernText] = useState('');

  //  const name = consern.map((item)=>{
  //    console.log(item.name);
  //  })
  //  console.log(name);

  // consern.filter((item)=>item === consernText)

  const handleSearch = (searchKey) => {
    const searchParams = {
      match: JSON.stringify({
        city: searchKey,
        specialty: searchKey,
        state: searchKey,
        country: searchKey,
        firstName: searchKey,
        lastName: searchKey,
        name: searchKey,
      }),
      name: searchKey,
    };
    dispatch(fetchCustomDoctor(searchParams, 0, false));
  };

  const onRefresh = useCallback(() => {
    dispatch(fetchDoctorLite('', 0, false));
    setSearch('');
    setHeaderText('');
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [searchConsern, setSearchConsern] = useState('');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'whitesmoke' }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginTop: 10 }}>
        <Image
          source={require('../../assets/icons/left-chevron.png')}
          style={{ height: 30, width: 30, resizeMode: 'contain' }}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ color: '#077EE9', fontSize: 17 }}>Health Consern:</Text>
        <Text
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 25,
            paddingVertical: 15,
            borderRadius: 25,
            fontSize: 17,
            marginLeft: 15,
            fontWeight: 'bold',
          }}>
          {consern}
        </Text>
      </View>
      <View style={{}}>
        <FlatList
          data={doctors}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          refreshing={loading || localLoading}
          onRefresh={onRefresh}
          renderItem={({ item, index }) => {
            const name = item.basic.name.split(' ');
            let education = '';
            if (item.education) {
              item.education.map((e, i) => (education += `${e.degree}, `));
              education.slice(0, education.length - 2);
            }

            const img = item.coverPhoto ? (
              <Image
                source={{
                  uri: `${Host}${item.coverPhoto
                    .replace('public', '')
                    .replace('\\\\', '/')}`,
                }}
                style={{ width: 75, height: 75, borderRadius: 100 }}
              />
            ) : (
              <PicturelessAvatar
                style={{
                  color: '#000',
                  backgroundColor: '#f9f9f9',
                  height: 70,
                  width: 70,
                  borderRadius: 35,
                }}
                textStyle={{ fontSize: 32 }}
                text={`${name[0][0]}${name[1][0]}`}
              />
            );

            return (
              <View key={index}>
                <BuildCustomCardComponent
                  {...item}
                  doctor={item}
                  loading={localLoading}
                  setLoading={setLocalLoading}
                  navigation={navigation}
                  drName={`Dr. ${item.basic.name}`}
                  education={education}
                  rating="4.5"
                  isLoggedin={isLoggedin}
                  image={img}
                  desc={item.languages ? item.languages.toString() : ''}
                />
              </View>
            );
          }}
        />
        {/* <Text
          style={{
            fontSize: 17,
            marginBottom: 20,
            marginLeft: 10,
            color: 'black',
          }}>
          2 Doctors Available now
        </Text>
        <View style={{flex:1}}>
          <View
            style={{
              marginHorizontal: 10,
              shadowColor: '#171717',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
              backgroundColor:'white',
              borderBottomRightRadius:10,
              borderBottomLeftRadius:10
            }}>
            <View style={{ backgroundColor: 'white', position: 'relative' }}>
              <Image
                style={{ width: '100%', height: 200, resizeMode: 'contain' }}
                source={{
                  uri: 'https://image.cnbcfm.com/api/v1/image/106069136-1565284193572gettyimages-1142580869.jpeg?v=1576531407&w=720&h=405',
                }}
              />
              <Image
                style={{
                  position: 'absolute',
                  height: 40,
                  width: 100,
                  left: '-6%',
                  top: 10,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/icons/Getplus.png')}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 20,
                  top: 10,
                  padding: 3,
                  backgroundColor: 'white',
                  borderRadius: 20,
                }}>
                <MCI name="heart-outline" size={24} color="grey" />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: '#EA1A65',
                  position: 'absolute',
                  bottom: 20,
                  left: '0%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                }}>
                <Image
                  source={require('../../assets/icons/time.png')}
                  style={{ height: 20, width: 20, resizeMode: 'contain' }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: 'white', fontSize: 12 }}>
                    Available
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'white',
                      fontSize: 12,
                    }}>
                    Now
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                backgroundColor: 'white',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                marginTop: '-2%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  paddingTop: 5,
                }}>
                <View>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    Dr. Anuj Verma
                  </Text>
                  <Text style={{ color: 'rgba(0,0,0,0.4)' }}>
                    General Physician | MBBS, NBD
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../assets/icons/star.png')}
                    style={{ height: 20, width: 20, resizeMode: 'contain' }}
                  />
                  <Text style={{ marginLeft: 5 }}>4.5</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    backgroundColor: 'whitesmoke',
                    borderRadius: 5,
                  }}>
                  <Image
                    source={require('../../assets/icons/path.png')}
                    style={{ height: 15, width: 15, resizeMode: 'contain' }}
                  />
                  <Text>8 Years</Text>
                </View>
                <Button
                  style={{
                    backgroundColor: '#0787F4',
                    paddingVertical: 7,
                    borderRadius: 30,
                  }}
                  color="white">
                  Consult Now
                </Button>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  paddingBottom: 10,
                }}>
                <Image
                  source={require('../../assets/icons/Patientslove.png')}
                  style={{ height: 20, width: 20, resizeMode: 'contain' }}
                />
                <Text style={{ color: 'black', marginLeft: 5 }}>
                  Treated 800+ patients recently
                </Text>
              </View>
            </View>
          </View>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default AllDoctore;

const BuildCardButtonComponent = ({ image, text }) => {
  return (
    <TouchableOpacity style={styles.button_shadow}>
      <Image
        source={image}
        style={{ width: 16, height: 16, tintColor: '#FF0000' }}
      />
      <Text
        style={{
          fontSize: 11,
          color: 'black',
          marginLeft: 4,
          fontFamily: 'Montserrat-Regular',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const BuildCustomCardComponent = (props) => {
  const {
    doctor,
    navigation,
    drName,
    desc,
    rating,
    image,
    experience,
    location,
    city,
    state,
    country,
    fee,
    education,
    specialty,
    specialties,
    _id,
    isLoggedin,
    setLoading,
  } = props;
  const [heartActive, setHeartActive] = React.useState(false);
  //   console.log(city)
  let drInfo = '';
  if (specialty || (specialties && specialties[0]))
    drInfo += specialty || specialties[0];
  if (education.length > 0 || (specialties && specialties[0])) drInfo += ' | ';
  if (education.length > 0) drInfo += education;

  return (
    // <Card
    //   style={{
    //     elevation: 4,
    //     marginVertical: 8,
    //     shadowColor: '#999',
    //     paddingBottom: 10,
    //   }}>
    //   <View style={styles.shadow}>
    //     <View>
    //       {image}
    //       <Card
    //         style={{
    //           width: 14,
    //           height: 14,
    //           backgroundColor: '#51B7B7',
    //           borderRadius: 100,
    //           position: 'absolute',
    //           right: 0,
    //           top: 54,
    //           borderWidth: 2,
    //           borderColor: 'white',
    //           elevation: 4,
    //           shadowColor: '#999',
    //         }}
    //       />
    //     </View>
    //     <View style={{ flexDirection: 'column', width: windowWidth - 148 }}>
    //       <View
    //         style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    //         <CustomTextComponent
    //           fontFamily={'Montserrat-Bold'}
    //           text={drName}
    //           fs={16}
    //           fw={'bold'}
    //           textColor={Colors.BLACK}
    //         />
    //         <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
    //           <View style={{ width: 12 }} />
    //           <Favorites setLoading={setLoading} doctor={_id} />
    //         </View>
    //       </View>
    //       {drInfo.length > 0 && (
    //         <CustomTextComponent
    //           text={drInfo}
    //           fs={13}
    //           fw={'300'}
    //           textColor={Colors.gray}
    //         />
    //       )}
    //       <View style={{ height: 8 }} />

    //       <View style={{ flexDirection: 'row', marginVertical: 4 }}>
    //         {experience && (
    //           <BuildCardButtonComponent
    //             image={require('../../../assets/user.png')}
    //             text={`${experience} Years`}
    //           />
    //         )}
    //         <View style={{ width: 8 }} />
    //         <BuildCardButtonComponent
    //           image={require('../../../assets/location.png')}
    //           text={`${location || `${city}, ${state}`}`}
    //         />
    //       </View>
    //       <View style={{ height: 8 }} />
    //     </View>
    //   </View>
    //   <View style={{ alignItems: 'center' }}>
    //     <View
    //       style={{
    //         width: windowWidth - 70,
    //         backgroundColor: '#eee',
    //         height: 1.3,
    //         marginTop: -8,
    //       }}
    //     />
    //   </View>
    //   <View
    //     style={{
    //       flexDirection: 'row',
    //       justifyContent: 'space-between',
    //       alignItems: 'center',
    //       marginTop: 8,
    //       paddingHorizontal: 20,
    //     }}>
    //     <CustomTextComponent
    //       fontFamily={'Montserrat-Medium'}
    //       text={fee ? `₹ ${fee}` : 'Free'}
    //       fs={22}
    //       fw="600"
    //       textColor={'black'}
    //     />
    //     <ButtonCompo
    //       title="Book Appointment"
    //       pressHandler={() => {
    //         let data = {
    //           ...doctor,
    //           appointments: [],
    //           desc,
    //           education: doctor.education ? doctor.education : [],
    //         };
    //         if (isLoggedin) navigation.navigate('DoctorProfileScreen', data);
    //         else navigation.openDrawer();
    //       }}
    //       textStyle={{
    //         fontSize: 14,
    //         fontFamily: 'Montserrat-SemiBold',
    //         marginHorizontal: 12,
    //       }}
    //     />
    //     {/* <AwesomeButton
    //       width={180}
    //       height={48}
    //       borderRadius={100}
    //       backgroundColor={Colors.BLUE2}
    //       backgroundShadow={'#368edd'}
    //       activeOpacity={0.5}
    //       backgroundDarker={'#3d7fba'}
    //       onPress={() => {
    //         navigation.navigate('DoctorProfileScreen', props);
    //       }}>
    //       <Text
    //         style={{
    //           fontSize: 15,
    //           color: 'white',
    //           marginLeft: 4,
    //           fontFamily: 'Montserrat-Regular',
    //         }}>
    //         Book Appointment
    //       </Text>
    //     </AwesomeButton> */}
    //   </View>
    // </Card>
    <Card style={{ marginHorizontal: 10, marginVertical: 10 }}>
      <View
        style={{
          height: 180,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: 'grey',
        }}>
        {image}
        <Image
          style={{
            position: 'absolute',
            height: 40,
            width: 100,
            left: '-6%',
            top: 10,
            resizeMode: 'contain',
          }}
          source={require('../../assets/icons/Getplus.png')}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            top: 10,
            padding: 3,
            backgroundColor: 'whitesmoke',
            borderRadius: 20,
          }}>
          <TouchableOpacity onPress={()=>console.log(drName)}>
            <MCI name="heart-outline" size={24} color="grey" />
          </TouchableOpacity>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: '#EA1A65',
            position: 'absolute',
            bottom: 20,
            left: '0%',
            flexDirection: 'row',
            alignItems: 'center',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 3,
          }}>
          <Image
            source={require('../../assets/icons/time.png')}
            style={{ height: 20, width: 20, resizeMode: 'contain' }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: 'white', fontSize: 12 }}>Available</Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 12,
              }}>
              Now
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: 'white',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          marginTop: '-2%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            paddingTop: 5,
          }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{drName}</Text>
            <Text style={{ color: 'rgba(0,0,0,0.4)' }}>
              {specialty} | {education}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../assets/icons/star.png')}
              style={{ height: 20, width: 20, resizeMode: 'contain' }}
            />
            <Text style={{ marginLeft: 5 }}>{rating}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 8,
              paddingVertical: 3,
              backgroundColor: 'whitesmoke',
              borderRadius: 5,
            }}>
            <Image
              source={require('../../assets/icons/path.png')}
              style={{ height: 15, width: 15, resizeMode: 'contain' }}
            />
            <Text>{experience} Years</Text>
          </View>
          <Button
            // onPress={() => {
            //   let data = {
            //     ...doctor,
            //     appointments: [],
            //     desc,
            //     education: doctor.education ? doctor.education : [],
            //   };
            //   if (isLoggedin) navigation.navigate('DoctorProfileScreen', data);
            //   else navigation.openDrawer();
            // }}
            onPress={()=>console.log('yes')}
            style={{
              backgroundColor: '#0787F4',
              paddingVertical: 7,
              borderRadius: 30,
            }}
            color="white">
            Consult Now
          </Button>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            paddingBottom: 10,
          }}>
          <Image
            source={require('../../assets/icons/Patientslove.png')}
            style={{ height: 20, width: 20, resizeMode: 'contain' }}
          />
          <Text style={{ color: 'black', marginLeft: 5 }}>
            Treated 800+ patients recently
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  shadow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: windowWidth - 32,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  button_shadow: {
    flexDirection: 'row',
    // shadowColor: "#999999",
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // shadowOffset: {
    //     height: 2,
    //     width: 0
    // },
    // elevation: 4,
    borderRadius: 4,
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 6,
    paddingVertical: 5,
    alignItems: 'center',
  },
  button_bookAppointment: {
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    elevation: 12,
    borderRadius: 30,
    backgroundColor: '#3893e4',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
