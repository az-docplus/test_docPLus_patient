/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {
  SECONDARY_COLOR,
  // NEW_HEADER_TEXT,
  NEW_PRIMARY_COLOR,
  SECONDARY_BACKGROUND,
  // NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import ReviewItem from '../../../components/molecules/Reviews/ReviewItem';
import { Host } from '../../../utils/connection';
import { GetRecentPatient } from '../../../reduxV2/action/DoctorAction';
import FluidAnimation from '../../../components/molecules/Animation/FluidAnimation';
import {
  GetReviews,
  AddReviews,
  AddLastRouteMemory,
  // saveNewUser,
} from '../../../reduxV2/action/AuthAction';
import Geolocation from 'react-native-geolocation-service';
import FeebackModal from '../../../components/molecules/Modal/FeebackModal';
import Axios from 'axios';
import { Colors } from '../../../styles/colorsV2';
import {
  Local,
  //  setLocale
} from '../../../i18n';
import PicturelessAvatar from '../../../components/atoms/PicturelessAvatar/PicturelessAvatar';

function DoctorProfile(props) {
  const { theme } = useSelector((state) => state.AuthReducer);
  const { navigation, route } = props;
  const [tab, setTab] = useState('about');
  //const [feedback, setFeedback] = useState(0);
  const dispatch = useDispatch();
  const { data } = route.params;

  const { isLoggedin, isDoctor } = useSelector((state) => state.AuthReducer);
  const { recentPatient } = useSelector((state) => state.DoctorReducer);
  const { patient } = useSelector((state) => state.PatientReducer);
  const [country, setCountry] = useState('');
  const [Fees, setFees] = useState(data.fee);
  const _checkLogedinAndDoTheStuff = () => {
    if (!isLoggedin) {
      navigation.navigate('Auth', { type: 'patient' });
      /* dispatch(
        AddLastRouteMemory({
          routeName: 'DoctorProfile',
          params: data,
        }),
        ); */
      // navigation.openDrawer()
    } else {
      navigation.navigate('TimeSlotScreen', {
        data: { ...data, country, Fees },
      });
    }
  };
  let imageSource = require('../../../assets/images/dummy_profile.png');

  const [Feebacks, setFeebacks] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    dispatch(
      GetReviews(data._id, (result) => {
        setFeebacks(result);
        // console.log(result, 'LLLLLLFFFFFFFFFFFFFFFFFFFF');
      }),
    );
    // }, [data._id]);
  }, [data._id, dispatch]);

  // useEffect(() => {
  //   const temp = Object.keys(data);
  //   console.log(data);
  //   console.log(temp.length);
  //   console.log(temp);
  //   // console.log(data.output)
  // }, []);

  useEffect(() => {
    let ratings;
    Feebacks.map((review) => {
      const { rating } = review;
      // console.log(rating, "llllllllllllllll")
      ratings += parseInt(rating);
    });
    setTotalRatings(ratings);
    // console.log(ratings, "RATINGGGGGGGGGGGGGGGGGGGGG")
  }, [Feebacks]);

  const getAddress = useCallback(
    (latitude, longitude) => {
      // console.log(e);
      // setCoordinate({
      //   ...coordinate,
      //   latitude: e.latitude,
      //   longitude: e.longitude,
      // });
      console.log('Got corddinates');
      Axios.get(
        `http://apis.mapmyindia.com/advancedmaps/v1/r4k75zadqu77ygxa9xp9typiievnwnfo/rev_geocode?lat=${latitude}&lng=${longitude}`,
      )
        .then((res) => {
          const { formatted_address } = res.data.results[0];
          //setCredential('address', formatted_address);

          const AddressArray = formatted_address.split(',');

          const state_raw = AddressArray[2];
          const state = state_raw.substr(0, state_raw.indexOf('.')).trim();

          const country_raw = formatted_address.split('(')[1];
          const country = country_raw.substr(0, country_raw.length - 1).trim();
          setCountry(country);
          const { billing } = data;
          const index = billing
            ?.map((x) => x.country.toLowerCase())
            .indexOf(country.toLowerCase());
          const _fees =
            index != undefined && index > -1 ? billing[index].fee : data.fee;
          // console.log({country, index, _fees, billing});
          setFees(_fees);
          //dispatch(saveNewUser({ ...data, charges: _fees }, 'doctor'));
        })
        .catch((err) => console.log({ err }));
    },
    [data],
  );
  // console.log(data);
  const requestLocationPermission = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: `${Local('patient.doc_profile.doc_plus')}`,
          message: `${Local('patient.doc_profile.permission_msg')}`,
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('done');
        Geolocation.getCurrentPosition(
          (info) => {
            // console.log(info, '1111');
            // setCoordinate({
            //   latitude: info.coords.latitude,
            //   longitude: info.coords.longitude,
            //   longitudeDelta: coordinate.longitudeDelta,
            //   latitudeDelta: coordinate.latitudeDelta,
            // });
            getAddress(info.coords.latitude, info.coords.longitude);
          },
          (error) => {
            console.log(error, 'error_________-');
          },
          {
            enableHighAccuracy: false,
            timeout: 8000,
            maximumAge: 1000,
            forceRequestLocation: true,
            showLocationDialog: true,
          },
        );
      } else {
        console.log('location permission denied');
        console.log(PermissionsAndroid.RESULTS.GRANTED);
        requestLocationPermission();
      }
    } catch (err) {
      console.warn(err, 'warning________--');
    }
  }, [getAddress]);

  //console.log(country)

  useEffect(() => {
    // dispatch(
    //   GetReviews(data._id, (result) => {
    //     setFeebacks(result);
    //     // console.log(result, "LLLLLLFFFFFFFFFFFFFFFFFFFF")
    //   }),
    // );
    dispatch(GetRecentPatient(data._id));
    // dispatch(
    //   AddLastRouteMemory({
    //     routeName: '',
    //     params: '',
    //   }),
    // );
  }, [data._id, dispatch]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setloading] = useState(false);

  const HandleSubmit = (args) => {
    const paylaod = {
      doctorid: data._id,
      patientid: patient?._id,
      ...args,
    };
    // console.log(paylaod);
    dispatch(
      AddReviews(paylaod, (result) => {
        setFeebacks(result);
        setIsModalVisible(false);
        setloading(false);
      }),
      () => {
        setloading(false);
      },
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.primary_background[theme] }}>
      <FluidAnimation duration={100} scale={1} opacity={0} delay={0}>
        <TopNavBar
          style={{
            Container: {
              paddingTop: '1%',
            },
          }}
          // hideRightComp
          navigation={navigation}
          headerText={`${Local('patient.doc_profile.doctor_profile')}`}
          // onRightButtonPress={() => {}}
        />
      </FluidAnimation>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        style={{
          flex: 1,
          backgroundColor: Colors.secondary_background[theme],
          position: 'relative',
        }}>
        <FeebackModal
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onUpdate={HandleSubmit}
        />
        <FluidAnimation
          // tx={0}
          // ty={0}
          scale={1}
          opacity={0}
          duration={100}
          delay={0}
          basicLayoutStyle={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '2%',
            marginHorizontal: '7%',
            paddingVertical: '5%',
          }}>
          <FluidAnimation
            ty={0}
            tx={100}
            opacity={0}
            scale={0.1}
            delay={100}
            duration={300}
            basicLayoutStyle={{
              borderRadius: 145,
              height: 145,
              width: 145,
              // height: 140,
              // width: '45%',
              // backgroundColor: 'blue',
              justifyContent: 'center',
              alignItems: 'center',
              // borderRadius: 70,
              backgroundColor: SECONDARY_BACKGROUND,
              // borderWidth: 1,
            }}>
            {data?.picture?.length ? (
              <Image
                style={{
                  borderRadius: 130,
                  height: 130,
                  width: 130,
                }}
                source={
                  data?.picture?.length > 0
                    ? {
                        uri: `${Host}${data?.coverPhoto
                          ?.replace('public', '')
                          .replace('\\\\', '/')}`,
                      }
                    : imageSource
                }
              />
            ) : (
              <PicturelessAvatar
                style={{
                  color: '#000',
                  backgroundColor: '#f9f9f9',
                  height: 140,
                  width: 140,
                  borderRadius: 130,
                }}
                textStyle={{ fontSize: 32 }}
                text={`${data?.basic?.name?.split(' ')[0][0]}${
                  data?.basic?.name?.split(' ')[1][0]
                }`}
              />
            )}
          </FluidAnimation>
          <FluidAnimation
            ty={0}
            tx={-100}
            opacity={0}
            scale={0.1}
            delay={100}
            duration={300}
            basicLayoutStyle={{
              flex: 1,
              marginLeft: '5%',
              // backgroundColor: 'red',
            }}>
            <Text
              style={{
                fontSize: 22,
                lineHeight: 22,
                // color: NEW_HEADER_TEXT,
                color: Colors.primary_text_color[theme],
                textTransform: 'capitalize',
                fontFamily: 'Montserrat-SemiBold',
                marginBottom: 5,
              }}>
              Dr. {data.basic.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 18,
                // color: NEW_HEADER_TEXT,
                color: Colors.primary_text_color[theme],
                textTransform: 'capitalize',
                fontFamily: 'Montserrat-Medium',
              }}>
              {data.specialty}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '3%',
                alignItems: 'center',
              }}>
              {/* <Image
              source={require('../../../assets/icons/star.png')}
              style={{height: 15, width: 15, marginRight: '3%'}}
            />
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 13,
                color: Colors.primary_text_color[theme],
              }}>
              {4}{' '}
            </Text> */}
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 13,
                  color: Colors.primary_text_color[theme],
                }}>
                ({Feebacks?.length}{' '}
                {Feebacks?.length > 1
                  ? Local('patient.doc_profile.reviews')
                  : Local('patient.doc_profile.review')}
                )
              </Text>
              {/* 
            <MaterialCommunityIcons
              name="heart"
              size={22}
              color="#EA1A65"
              style={{ marginHorizontal: '5%' }}
            /> */}
            </View>
          </FluidAnimation>
        </FluidAnimation>
        <FluidAnimation tx={0} ty={-150} scale={0.8} delay={150} duration={400}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: '2%',
              marginBottom: '3%',
            }}>
            <View style={Styles.DoctorProfilePatientDetails}>
              <Text
                style={{
                  // color: NEW_HEADER_TEXT,
                  color: Colors.primary_text_color[theme],
                  fontSize: 24,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                {recentPatient?.length}
              </Text>
              <Text
                style={{
                  // color: NEW_HEADER_TEXT,
                  color: Colors.primary_text_color[theme],
                  fontSize: 13,
                  fontFamily: 'Montserrat-Regular',
                }}>
                {recentPatient?.length > 1
                  ? Local('patient.doc_profile.patients')
                  : Local('patient.doc_profile.patient')}
              </Text>
            </View>
            {data.experience && (
              <View style={Styles.DoctorProfileExperienceDetails}>
                <Text
                  style={{
                    // color: NEW_HEADER_TEXT,
                    color: Colors.primary_text_color[theme],
                    fontSize: 24,
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  {data.experience ? data.experience : '--'} yrs
                </Text>
                <Text
                  style={{
                    // color: NEW_HEADER_TEXT,
                    color: Colors.primary_text_color[theme],
                    fontSize: 13,
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  {Local('patient.doc_profile.experience')}
                </Text>
              </View>
            )}
          </View>
          <View style={Styles.ContentContainer}>
            <View style={Styles.ContentContainerTabs}>
              <TouchableOpacity onPress={() => setTab('about')}>
                <View style={Styles.TabLabelContainer}>
                  <Text
                    style={
                      tab === 'about'
                        ? Styles.activeTabText
                        : Styles.inactiveTabText
                    }>
                    {Local('patient.doc_profile.about')}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setTab('fee')}>
                <View style={Styles.TabLabelContainer}>
                  <Text
                    style={
                      tab === 'fee'
                        ? Styles.activeTabText
                        : Styles.inactiveTabText
                    }>
                    {Local('patient.doc_profile.fee')}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setTab('feedback')}>
                <View style={Styles.TabLabelContainer}>
                  <Text
                    style={
                      tab === 'feedback'
                        ? Styles.activeTabText
                        : Styles.inactiveTabText
                    }>
                    {Local('patient.doc_profile.Reviews')}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={() => setTab('more')}>
            <View style={Styles.TabLabelContainer}>
              <Text
                style={
                  tab === 'more' ? Styles.activeTabText : Styles.inactiveTabText
                }>
                More
              </Text>
            </View>
              </TouchableOpacity> */}
            </View>
            {tab === 'about' ? (
              <View style={{ height: '100%', paddingHorizontal: 40 }}>
                <Text
                  style={{
                    letterSpacing: 0.3,
                    marginTop: '8%',
                    lineHeight: 23,
                    // color: NEW_HEADER_TEXT,
                    color: Colors.primary_text_color[theme],
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 13,
                  }}>
                  {data.bio ? data.bio : ''}
                </Text>
              </View>
            ) : tab === 'fee' ? (
              <View style={{ alignItems: 'center', height: '100%' }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: '12%',
                    // color: NEW_HEADER_TEXT,
                    color: Colors.primary_text_color[theme],
                    textTransform: 'capitalize',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {Local('patient.doc_profile.consultation_fees')}:
                </Text>
                <Text
                  style={{
                    fontSize: 28,
                    marginTop: '4%',
                    // color: NEW_HEADER_TEXT,
                    color: Colors.primary_text_color[theme],
                    textTransform: 'capitalize',
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  {data?.payment ? `₹ ${Fees}` : `Free`}
                  {/* ₹ {Fees || 100} */}
                </Text>
              </View>
            ) : tab === 'feedback' ? (
              <>
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                  {/* {!isDoctor && (
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    // color: NEW_HEADER_TEXT,
                    color: Colors.primary_text_color[theme],
                    fontSize: 16,
                  }}>
                  {Local('patient.doc_profile.exp_question')}
                </Text>
              )} */}

                  {/* <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 12,
                    }}>
                    <TouchableOpacity
                      onPress={() => setFeedback(1)}
                      style={{ marginRight: 10 }}>
                      <FontAwesome
                        name={feedback === 1 ? 'thumbs-up' : 'thumbs-o-up'}
                        color={
                          feedback === 1 ? NEW_PRIMARY_COLOR : INPUT_PLACEHOLDER
                        }
                        size={40}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setFeedback(-1)}
                      style={{ marginLeft: 10 }}>
                      <FontAwesome
                        name={feedback === -1 ? 'thumbs-up' : 'thumbs-o-up'}
                        color={
                          feedback === -1 ? NEW_PRIMARY_COLOR : INPUT_PLACEHOLDER
                        }
                        size={40}
                        style={{ transform: [{ rotateZ: '180deg' }] }}
                      />
                    </TouchableOpacity>
                  </View> */}

                  {/* {!isDoctor && (
                <TouchableOpacity
                  onPress={() => {
                    if (!isLoggedin) {
                      navigation.navigate('Auth');
                    } else {
                      setIsModalVisible(true);
                    }
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      color: NEW_PRIMARY_BACKGROUND,
                      fontSize: 16,
                    }}>
                    {Local('patient.doc_profile.add_feedback')}
                  </Text>
                </TouchableOpacity>
              )} */}
                </View>
                <View style={{ paddingHorizontal: 20, paddingBottom: 60 }}>
                  {/* <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  // color: NEW_HEADER_TEXT,
                  color: Colors.primary_text_color[theme],
                  fontSize: 19,
                  marginBottom: 10,
                }}>
                {Local('patient.doc_profile.feedbacks')}
              </Text> */}
                  {Feebacks?.map((review) => (
                    <ReviewItem {...review} />
                  ))}
                  {Feebacks.length == 0 && (
                    <View style={{ alignItems: 'center', height: '100%' }}>
                      {/* <Text
                  style={{
                    fontSize: 20,
                    marginTop: '12%',
                    // color: NEW_HEADER_TEXT,
                    color: Colors.primary_text_color[theme],
                    textTransform: 'capitalize',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {Local('patient.doc_profile.consultation_fees')}:
                </Text> */}
                      <Text
                        style={{
                          fontSize: 22,
                          marginTop: '4%',
                          // color: NEW_HEADER_TEXT,
                          color: Colors.primary_text_color[theme],
                          textTransform: 'capitalize',
                          fontFamily: 'Montserrat-SemiBold',
                        }}>
                        {'No Reviews'}
                        {/* ₹ {Fees || 100} */}
                      </Text>
                    </View>
                  )}
                </View>
              </>
            ) : tab === 'more' ? null : null}
          </View>
        </FluidAnimation>
      </ScrollView>
      <FluidAnimation
        basicLayoutStyle={{
          height: 40,
          width: '70%',
          borderRadius: 40,
          backgroundColor: SECONDARY_COLOR,
          alignItems: 'center',
          // marginBottom: 60,
          justifyContent: 'center',
          alignSelf: 'center',
          position: 'absolute',
          bottom: 65,
          elevation: 20,
        }}
        tx={0}
        ty={80}
        opacity={0}
        scale={0.2}
        duration={400}
        delay={500}>
        <TouchableOpacity
          onPress={_checkLogedinAndDoTheStuff}
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            // marginBottom: 60,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              // fontWeight: 'bold',
              fontSize: 16,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            {Local('patient.doc_profile.book_appointment')}
          </Text>
        </TouchableOpacity>
      </FluidAnimation>
    </View>
  );
}

const Styles = StyleSheet.create({
  DoctorProfilePatientDetails: {
    alignItems: 'center',
    flex: 1,
    borderRightWidth: 1.5,
    borderColor: NEW_PRIMARY_COLOR,
  },
  DoctorProfileExperienceDetails: {
    alignItems: 'center',
    flex: 1,
    borderLeftWidth: 1.5,
    borderColor: NEW_PRIMARY_COLOR,
  },
  ContentContainer: {
    flex: 4,
    zIndex: 10,
  },
  ContentContainerTabs: {
    backgroundColor: SECONDARY_BACKGROUND,
    marginTop: '7%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '1.5%',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  DoctorInfoScroll: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  TabLabelContainer: {
    // flex: 1,
    alignItems: 'center',
    marginHorizontal: '4%',
  },
  activeTabText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
    backgroundColor: SECONDARY_COLOR,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  inactiveTabText: {
    color: SECONDARY_COLOR,
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: 15,
  },
});
export default DoctorProfile;
