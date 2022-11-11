import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Share, Linking } from 'react-native';
import { INPUT_PLACEHOLDER, NEW_PRIMARY_COLOR, NEW_PRIMARY_LIGHT_BG } from '../../../styles/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Host } from '../../../utils/connection';
import { DeleteRecords } from '../../../reduxV2/action/PatientAction'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import Popconfirm from '../Modal/PopConfirm';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';

const ReportsItem = ({ data, handleEdit }) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const reportImg = `${Host}${data.report_img
    .replace('public', '')
    .replace('\\\\', '/')}`

  const { patient, records, gettingRecords, errorGettingRecords } = useSelector(
    (state) => state.PatientReducer,
  );

  const [_rotation, set_rotation] = useState('270')
  const [more, setmore] = useState(false)

  const handleMoreDetails = () => {
    setmore(!more)
    set_rotation(_rotation == '270' ? '90' : '270')
  }

  const dispatch = useDispatch()

  const handleDelete = () => {
    // console.log({ id: patient.meta._id, reportId: data })
    dispatch(DeleteRecords({ id: patient.meta._id, reportId: data._id }))
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `${data.testName} of ${patient.firstName} ${patient.lastName} : ${reportImg} `,
        url: reportImg
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
    Linking.canOpenURL(reportImg).then(supported => {
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
          setaskConfirmation(false)
          handleDelete(data._id)
        }}
        onCancel={() => { setaskConfirmation(false) }}
        visible={askConfirmation}>
      </Popconfirm>
      <View
        style={{
          // backgroundColor: 'white',
          backgroundColor: Colors.secondary_background[theme],
          paddingHorizontal: 20,
          borderRadius: 13,
          marginVertical: 10,
          elevation: 2,
          flexDirection: 'row',
          paddingVertical: 15,
        }}>
        <View style={{ paddingHorizontal: '2%' }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 16,
              color: Colors.primary_text_color[theme],
              paddingVertical: 2,
            }}>
            {data.testName}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: 13,
              color: Colors.primary_text_color[theme],
              paddingVertical: 2,
            }}>
            {data.test_type}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
              color: Colors.input_placeholder_color[theme],
              paddingVertical: 2,
            }}>
            {'Updated on : '}{moment(data.date).format("DD MMM 'YY")}

          </Text>
          {
            more && (
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 11,
                  marginRight: "6%",
                  paddingVertical: 4,
                  color: Colors.primary_text_color[theme],
                  marginTop: 4
                }}>
                {Local("doctor.medical_history.added_by")} : {data.addedBy}
              </Text>
            )
          }
          {
            more && (
              <View style={{ marginTop: 4 }}>
                <TouchableOpacity style={{
                  backgroundColor: NEW_PRIMARY_LIGHT_BG,
                  borderWidth: 0,
                  borderRadius: 6,
                  paddingHorizontal: '4%',
                  paddingVertical: '4%',
                }} onPress={handleClick}>
                  <Text style={{ fontFamily: 'Montserrate-Medium', textAlign: 'center', color: NEW_PRIMARY_COLOR }}>
                    {Local("doctor.medical_history.download_report")}
                  </Text>
                </TouchableOpacity>

              </View>
            )
          }
        </View>

        <View style={{ marginLeft: 'auto', flexDirection: 'row', marginTop: 'auto', flexDirection: 'row' }}>
          <View>
            <TouchableOpacity onPress={onShare}>
              <Entypo name="share" color={NEW_PRIMARY_COLOR} size={22} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => {
            setaskConfirmation(true)
          }}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              style={{ fontSize: 22, color: NEW_PRIMARY_COLOR, marginHorizontal: 4 }}>
            </MaterialCommunityIcons>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleEdit(data)}>
            <MaterialIcons
              name="edit"
              style={{ fontSize: 22, color: NEW_PRIMARY_COLOR, marginHorizontal: 4 }}>
            </MaterialIcons>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleMoreDetails}>
            <Ionicons
              name={more ? "chevron-down-outline" : "chevron-forward"}
              style={{ fontSize: 24, color: NEW_PRIMARY_COLOR, marginHorizontal: 4 }}>
            </Ionicons>
          </TouchableOpacity>


          {/* <View style={{ marginRight: 10, marginLeft: 20 }}>

         <TouchableOpacity onPress={handleMoreDetails}>
          <Image
            source={require('../../../assets/icons/back.png')}
            style={{
              height: 17,
              width: 17,
              transform: [{ rotateZ: `${_rotation}deg` }],
            }}
            resizeMode="contain"
          />
        </TouchableOpacity> 
      </View> */}
        </View>
      </View>

    </>
  )
};

export default ReportsItem;
