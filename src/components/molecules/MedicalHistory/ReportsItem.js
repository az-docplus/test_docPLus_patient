import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Share,
  Linking,
} from 'react-native';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_LIGHT_BG,
} from '../../../styles/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Host } from '../../../utils/connection';
import { DeleteRecords } from '../../../reduxV2/action/PatientAction';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Popconfirm from '../Modal/PopConfirm';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';
import LinearGradient from 'react-native-linear-gradient';

const ReportsItem = ({ data, handleEdit }) => {
  const { userData, isDoctor, theme } = useSelector(
    (state) => state.AuthReducer,
  );
  const reportImg = `${Host}${data.report_img
    .replace('public', '')
    .replace('\\\\', '/')}`;

  const { patient, records, gettingRecords, errorGettingRecords } = useSelector(
    (state) => state.PatientReducer,
  );

  const [_rotation, set_rotation] = useState('270');
  const [more, setmore] = useState(false);

  const handleMoreDetails = () => {
    setmore(!more);
    set_rotation(_rotation == '270' ? '90' : '270');
  };

  const dispatch = useDispatch();

  const handleDelete = () => {
    // console.log({ id: patient.meta._id, reportId: data })
    dispatch(DeleteRecords({ id: patient.meta._id, reportId: data._id }));
  };

  const onShare = async () => {
    console.log(data);
    try {
      const result = await Share.share({
        message: `${data.testName} of ${patient.firstName} ${patient.lastName} : ${reportImg} `,
        url: reportImg,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const handleClick = () => {
    Linking.canOpenURL(reportImg).then((supported) => {
      if (supported) {
        Linking.openURL(reportImg);
      } else {
        console.log("Don't know how to open URI: " + reportImg);
      }
    });
  };
  const [askConfirmation, setaskConfirmation] = useState(false);

  return (
    <>
      <Popconfirm
        onUpdate={() => {
          setaskConfirmation(false);
          handleDelete(data._id);
        }}
        onCancel={() => {
          setaskConfirmation(false);
        }}
        visible={askConfirmation}></Popconfirm>
      <View
        style={{
          // backgroundColor: 'white',
          backgroundColor: Colors.secondary_background[theme],
          paddingHorizontal: 20,
          borderRadius: 15,
          marginVertical: 10,
          elevation: 12,
          flexDirection: 'row',
          paddingVertical: 15,
          justifyContent: 'space-between',
        }}>
        <View style={{ paddingHorizontal: '2%' }}>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
              color: Colors.primary_text_color[theme],
              paddingVertical: 3,
            }}>
            {data.testName}
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-Regular',
              fontSize: 12,
              color: '#EA1A65',
              // color: Colors.primary_text_color[theme],
              paddingVertical: 3,
            }}>
            {data.test_type}
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-Regular',
              fontSize: 12,
              color: Colors.input_placeholder_color[theme],
              paddingVertical: 3,
            }}>
            {'Updated on : '}
            {moment(data.date).format("DD MMM 'YY")}
          </Text>
          {more && (
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: 11,
                marginRight: '6%',
                paddingVertical: 4,
                color: Colors.primary_text_color[theme],
                marginBottom: 5,
              }}>
              {Local('doctor.medical_history.added_by')} : {data.addedBy}
            </Text>
          )}
          {more && (
            <View style={{ marginTop: 4 }}>
              <TouchableOpacity onPress={handleClick}>
                <LinearGradient
                  colors={['#225F6B', '#2E8192']}
                  start={{ x: 1, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 30,
                    paddingHorizontal: 40,
                    paddingVertical: 15,
                    elevation: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: 20,
                    }}>
                    {Local('doctor.medical_history.download_report')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{
                  backgroundColor: NEW_PRIMARY_LIGHT_BG,
                  borderWidth: 0,
                  borderRadius: 6,
                  paddingHorizontal: '4%',
                  paddingVertical: '4%',
                }}
                onPress={handleClick}>
                <Text
                  style={{
                    fontFamily: 'Montserrate-Medium',
                    textAlign: 'center',
                    color: NEW_PRIMARY_COLOR,
                  }}>
                  {Local('doctor.medical_history.download_report')}
                </Text>
              </TouchableOpacity> */}
            </View>
          )}
        </View>

        <View
          style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
          {/* <TouchableWithoutFeedback
              onPress={() => setMedicineActive(!medicineActive)}>
              <MaterialIcons
                name={medicineActive ? 'timer' : 'timer-off'}
                color={medicineActive ? NEW_PRIMARY_COLOR : INPUT_PLACEHOLDER}
                size={25}
              />
            </TouchableWithoutFeedback> */}

          <View style={{ flexDirection: 'row' }}>
            {((isDoctor && data?.doctor === userData?._id) || !isDoctor) && (
              <>
                <TouchableOpacity onPress={() => handleEdit(data)}>
                  <MaterialIcons
                    name="edit"
                    style={{
                      fontSize: 20,
                      color: '#297281',
                      marginHorizontal: 6,
                    }}></MaterialIcons>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setaskConfirmation(true);
                  }}>
                  <FontAwesome5
                    name="trash"
                    style={{
                      fontSize: 20,
                      color: '#FF3939',
                      marginHorizontal: 4,
                    }}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>

          <TouchableOpacity onPress={handleMoreDetails}>
            <Entypo
              name={more ? 'chevron-small-up' : 'chevron-small-down'}
              style={{
                fontSize: 30,
                color: '#077EE9',

                // color: NEW_PRIMARY_COLOR,
                // marginHorizontal: 4,
              }}></Entypo>
          </TouchableOpacity>
        </View>

        {/* <View
          style={{
            marginLeft: 'auto',
            flexDirection: 'row',
            marginTop: 'auto',
            flexDirection: 'row',
          }}>
          <View>
            <TouchableOpacity onPress={onShare}>
              <Entypo name="share" color={NEW_PRIMARY_COLOR} size={22} />
            </TouchableOpacity>
          </View>

          {((isDoctor && data?.doctor === userData?._id) || !isDoctor) && (
            <>
              <TouchableOpacity
                onPress={() => {
                  setaskConfirmation(true);
                }}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  style={{
                    fontSize: 22,
                    color: NEW_PRIMARY_COLOR,
                    marginHorizontal: 4,
                  }}></MaterialCommunityIcons>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEdit(data)}>
                <MaterialIcons
                  name="edit"
                  style={{
                    fontSize: 22,
                    color: NEW_PRIMARY_COLOR,
                    marginHorizontal: 4,
                  }}></MaterialIcons>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={handleMoreDetails}>
            <Ionicons
              name={more ? 'chevron-down-outline' : 'chevron-forward'}
              style={{
                fontSize: 24,
                color: NEW_PRIMARY_COLOR,
                marginHorizontal: 4,
              }}></Ionicons>
          </TouchableOpacity>

          
        </View> */}
      </View>
    </>
  );
};

export default ReportsItem;
