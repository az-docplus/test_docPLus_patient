/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  // Image,
  TouchableOpacity,
  // Alert,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  // HEADER_TEXT,
  TERTIARY_TEXT_TWO,
  // TERTIARY_TEXT,
  PRIMARY_COLOR,
  // SECONDARY_BACKGROUND,
  NEW_HEADER_TEXT,
  NEW_PRIMARY_COLOR,
} from '../../../styles/colors';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {
  // GetReviews,
  // AddReviews,
  AddLastRouteMemory,
  // saveNewUser,
} from '../../../reduxV2/action/AuthAction';
import {
  CreateAppointment,
  GetPatientInfo,
  RemoveFevDoc,
} from '../../../reduxV2/action/PatientAction';
import { AddFevDoc } from '../../../reduxV2/action/PatientAction';
import { Colors } from '../../../styles/colorsV2';
import { Local } from '../../../i18n';
import Toast from 'react-native-root-toast';
// import {Local} from '../../../i18n';

function AvailDoctorContentV2({
  Profile,
  DoctorName,
  rating,
  Specialization,
  schedule,
  navigation,
  data,
  toggle,
  setConsultLoading = () => {},
}) {
  const { userData, theme, isLoggedin } = useSelector(
    (state) => state.AuthReducer,
  );

  const [heartActive, setHeartActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const { patient } = useSelector((state) => state.PatientReducer);
  const dispatch = useDispatch();

  const showTost = (msg = '...', callback) => {
    Toast.show(msg, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      },
    });
    callback && callback();
  };

  const _checkLogedinAndDoTheStuff = useCallback(() => {
    if (!isLoggedin) {
      // dispatch(
      //   AddLastRouteMemory({
      //     routeName: 'DoctorProfile',
      //     params: data,
      //   }),
      // );
      // setConsultLoading(true)
      navigation.navigate('Auth');
      // setConsultLoading(false)
    } else {
      // setConsultLoading(false)
      // navigation.push('TimeSlotScreen', {data: {...data}});
      const allowed = ['npi', 'output', 'diseases', 'country', 'state', 'city'];

      const filtered = Object.keys(data)
        .filter((key) => !allowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = data[key];
          return obj;
        }, {});
      navigation.navigate('TimeSlotScreen', { data: filtered });
      // navigation.navigate('TimeSlotScreen', {data: {...data}});
    }
  }, [
    data,
    dispatch,
    isLoggedin,
    //  navigation
  ]);
  console.log('====================>>>>>>xxxxxxx', data);
  const handleConsultNow = useCallback(() => {
    setConsultLoading(true);
    if (isLoggedin) {
      setConsultLoading(true);
      const date = moment().add(15, 'minute').toString();
      setLoading(true);
      dispatch(
        CreateAppointment({ doctor: data._id }, (err, response) => {
          if (!err) {
            // console.log(".............................",{response})
            // setPopupVisible(true);
            // localStorage.setItem("manualbookedfor", date);
            // localStorage.setItem("timeslotid", response._id);
          }
          setLoading(false);
          setConsultLoading(false);
          navigation.navigate('ConfirmAppointment', {
            data: { ...response },
            doctorData: data,
          });
        }),
      );
      // navigation.navigate('ConfirmAppointment', { data: { ...slot, forWhom }, doctorData })
    } else {
      setConsultLoading(false);
      //Router.push("/login");
      navigation.navigate('Auth');
    }
  }, [
    data,
    dispatch,
    isLoggedin,
    // navigation,
    setConsultLoading,
  ]);
  const heartHandle = useCallback(() => {
    let res;
    if (userData.favourites) {
      res = userData.favourites?.some((item) => {
        return item._id === data._id;
      });
    }
    if (!isLoggedin) {
      navigation.navigate('Auth');
    } else if (!res) {
      setLoading(true);
      setHeartActive(!heartActive);
      dispatch(
        AddFevDoc(
          data._id,
          patient._id,
          () => {
            setLoading(false);
            setHeartActive(!heartActive);

            dispatch(
              GetPatientInfo(patient._id, null, () => {
                // showTost("Added to Favorites!", () => { });
                // Alert.alert("Doctor Added!","Added to Favourites Successfuly!")
              }),
            );
          },
          () => {
            setLoading(false);
            setHeartActive(heartActive);
          },
        ),
      );
    } else if (res) {
      setLoading(true);
      setHeartActive(!heartActive);
      dispatch(
        RemoveFevDoc(
          data._id,
          patient._id,
          () => {
            // Alert.alert("Doctor Removed!","Removed From Favourites Successfuly!")
            // showTost("Removed from Favorites!", () => { });
            setLoading(false);
            setHeartActive(!heartActive);

            // dispatch(
            //   GetPatientInfo(
            //     patient._id,
            //     null,
            //     () => {}
            //   ));
            // console.log("removed")
          },
          () => {
            setLoading(false);
            setHeartActive(heartActive);
            // console.log("removed error")
          },
        ),
      );
      // if(heartActive) {
      //   showTost("Added to Favorites!", () => { });
      // } else {
      //   showTost("Removed from Favorites!", () => { });
      // }
    }
  }, [
    data._id,
    dispatch,
    heartActive,
    isLoggedin,
    // navigation,
    patient._id,
    userData.favourites,
  ]);

  // useEffect(() => {
  //   if (heartActive) {
  //     showTost('Added to Favorites!', () => {});
  //   } else {
  //     showTost('Removed from Favorites!', () => {});
  //   }
  // }, [heartActive])
  useEffect(() => {
    // console.log("..................................", {data})
    const res =
      patient?.favourites?.length > 0
        ? patient?.favourites?.some((item) => {
            return item._id === data._id;
          })
        : userData?.favourites?.some((item) => {
            return item._id === data._id;
          });
    setHeartActive(res);
  }, [data._id, patient, userData.favourites]);

  useEffect(() => {
    // delete data.output
  }, []);
  return (
    <>
      <TouchableOpacity
        // onPress={() => navigation.push('DoctorProfile', {data: data})}
        onPress={() => {
          const allowed = [
            'npi',
            'output',
            'diseases',
            'country',
            'state',
            'city',
          ];

          const filtered = Object.keys(data)
            .filter((key) => !allowed.includes(key))
            .reduce((obj, key) => {
              obj[key] = data[key];
              return obj;
            }, {});

          // console.log(filtered)
          // const obj = {...data}
          // console.log(obj.output.length);
          // delete obj.ouput

          // const temp = Object.keys(obj);
          // console.log(temp);
          // console.log(temp.length);
          // console.log(obj.output.length);
          // console.log(temp, temp.length, 'sdfjslkdfjkdlsf');
          navigation.navigate('DoctorProfile', { data: filtered });
        }}
        style={CardContentStyles.TouchableContainer}>
        {Profile}
        <View style={CardContentStyles.ViewContainer}>
          <View style={CardContentStyles.ViewContainerLeftSection}>
            <Text
              adjustsFontSizeToFit
              style={[
                CardContentStyles.AvailableDoctorsName,
                { color: Colors.primary_text_color[theme] },
              ]}>
              {DoctorName}
            </Text>
            <Text
              style={{
                textTransform: 'capitalize',
                fontFamily: 'Montserrat-Medium',
                color: Colors.primary_text_color[theme],
              }}>
              {/* {console.log(data?.specialties, data?.specialty, "slkfjdslfjldkfj")} */}
              {Specialization}
            </Text>
          </View>
          {!toggle && (
            <View style={CardContentStyles.ScheduleContainer}>
              {schedule?.slice(0, 2).map((item, index) => {
                return (
                  <>
                    <Text
                      key={`${item.bookedFor}-${index}`}
                      style={[
                        CardContentStyles.ScheduleText,
                        {
                          color: Colors.primary_text_color[theme],
                          marginRight: index === schedule.length - 1 ? 0 : '4%',
                          marginLeft: index === 0 ? 0 : '4%',
                        },
                      ]}>
                      {moment(item.bookedFor).format('hh:mm A')}
                    </Text>
                    {index == 1 ? null : (
                      <Text style={{ fontWeight: 'bold', color: '#077EE9' }}>
                        |
                      </Text>
                    )}
                  </>
                );
              })}
            </View>
          )}

          <View style={{ flexDirection: 'row', marginTop: 3 }}>
            <TouchableOpacity
              onPress={_checkLogedinAndDoTheStuff}
              style={[
                CardContentStyles.ScheduleTouchable,
                {
                  backgroundColor: Colors.doc_list_btn_bg[theme],
                },
              ]}>
              <Text
                style={[
                  CardContentStyles.ScheduleTouchableText,
                  {
                    color: Colors.primary_text_color[theme],
                  },
                ]}>
                {`${Local('patient.landing_page.schedule')}`}
              </Text>
            </TouchableOpacity>
            {data.is_superDoc && (
              <TouchableOpacity
                onPress={handleConsultNow}
                style={[
                  CardContentStyles.ConsultNowTouchable,
                  {
                    backgroundColor: Colors.doc_list_btn_bg[theme],
                  },
                ]}>
                <Text
                  style={[
                    CardContentStyles.ConsultNowText,
                    {
                      color: Colors.primary_text_color[theme],
                    },
                  ]}>
                  {`${Local('patient.landing_page.now')}`}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <View style={CardContentStyles.AvailableDoctorsContinueButton}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 'auto',
          }}>
          <TouchableOpacity onPress={heartHandle}>
            <FontAwesomeIcon
              name="heart"
              size={22}
              color={heartActive ? '#EA1A65' : '#7B7A79'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => navigation.push('DoctorProfile', {data: data})}

            onPress={() => {
              const allowed = [
                'npi',
                'output',
                'diseases',
                'country',
                'state',
                'city',
              ];

              const filtered = Object.keys(data)
                .filter((key) => !allowed.includes(key))
                .reduce((obj, key) => {
                  obj[key] = data[key];
                  return obj;
                }, {});

              navigation.navigate('DoctorProfile', { data: filtered });
            }}
            style={{ zIndex: 2000, marginLeft: 12 }}>
            <FontAwesomeIcon
              name="angle-right"
              size={30}
              color={NEW_PRIMARY_COLOR}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
const CardContentStyles = StyleSheet.create({
  TouchableContainer: {
    flex: 4.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ViewContainer: {
    paddingLeft: '3%',
    flex: 1,
  },
  ViewContainerLeftSection: { justifyContent: 'space-between' },
  ScheduleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '1.5%',
  },
  ScheduleText: {
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
  },
  ScheduleTouchable: {
    alignItems: 'center',
    // backgroundColor: NEW_PRIMARY_LIGHT_BG,
    borderWidth: 0,
    borderRadius: 6,
    paddingHorizontal: '2%',
    marginRight: '2%',
  },
  ScheduleTouchableText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
    paddingVertical: 4,
  },
  ConsultNowTouchable: {
    alignItems: 'center',
    // backgroundColor: NEW_PRIMARY_LIGHT_BG,
    borderWidth: 0,
    borderRadius: 6,
    paddingHorizontal: '2%',
    marginRight: '2%',
  },
  ConsultNowText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
    paddingVertical: 4,
  },
  AvailableDoctorsCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  AvailableDoctorsDetails: {
    marginLeft: 15,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  AvailableDoctorsName: {
    fontSize: 19,
    color: NEW_HEADER_TEXT,
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-SemiBold',
  },

  AvailableDoctorsSpecialization: {
    color: NEW_HEADER_TEXT,
    fontSize: 12,
    lineHeight: 14,
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-Regular',
  },
  AvailableDoctorsAvailableTimes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  AvailableDoctorsAvailableTime: {
    paddingHorizontal: 4,
    borderRadius: 8,
    color: TERTIARY_TEXT_TWO,
    marginRight: 10,
  },
  AvailableDoctorsAvailableTimeActive: {
    backgroundColor: PRIMARY_COLOR,
    color: '#fafafa',
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  AvailableDoctorsContinueButton: {
    flex: 1,
    marginLeft: '4%',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
});

export default AvailDoctorContentV2;
