import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  GREY_BACKGROUND,
  NEW_PRIMARY_COLOR,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
  PRIMARY_COLOR,
  NEW_PRIMARY_LIGHT_BG,
} from '../../../styles/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import { DeleteMedicine } from '../../../reduxV2/action/PatientAction';
import { useDispatch, useSelector } from 'react-redux';
import Popconfirm from '../Modal/PopConfirm';
import { Colors } from '../../../styles/colorsV2';

const MedsItem = ({ data, handleEdit, medId }) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const isDoctor = false;
  const [medicineActive, setMedicineActive] = useState(false);
  const [_rotation, set_rotation] = useState('270');
  const [more, setmore] = useState(false);

  const { patient } = useSelector((state) => state.PatientReducer);
  const dispatch = useDispatch();

  const handleMoreDetails = () => {
    setmore(!more);
    set_rotation(_rotation === '270' ? '90' : '270');
  };

  const handleDelete = (_id) => {
    dispatch(DeleteMedicine({ id: patient._id, medid: medId }, patient.meta));
  };
  const [askConfirmation, setaskConfirmation] = useState(false);
  return data.map((item) => {
    const { _id, name, quantity, description, time, addedBy, date } = item;
    console.log(_id, name, quantity, description, 'time', time, addedBy, date);
    return (
      <>
        <Popconfirm
          onUpdate={() => {
            setaskConfirmation(false);
            handleDelete(_id);
          }}
          onCancel={() => {
            setaskConfirmation(false);
          }}
          visible={askConfirmation}></Popconfirm>

        <View
          key={_id}
          style={{
            // backgroundColor: 'white',
            backgroundColor: Colors.secondary_background[theme],
            paddingHorizontal: 20,
            borderRadius: 18,
            marginVertical: 10,
            elevation: 12,
            flexDirection: 'row',
            paddingVertical: 15,
          }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 16,
                color: Colors.primary_text_color[theme],
                paddingVertical: 4,
              }}>
              {name}
            </Text>

            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                fontSize: 12,
                color: '#EA1A65',
                paddingVertical: 4,
              }}>
              {time ? time.length : quantity} pills/ day
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Medium',
                fontSize: 12,
                color: Colors.primary_text_color[theme],
                paddingVertical: 4,
              }}>
              {/* {`${data.completedDays} / ${data.totalDays} days (${
                data.totalDays / 7
              } weeks)`} */}
              {description}
            </Text>
            {more && (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  {time.map((t, i) => (
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        backgroundColor: '#F9DDE7',
                        // backgroundColor: Colors.primary_light_bg[theme],
                        borderWidth: 0,
                        borderRadius: 6,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        marginRight: '2%',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Medium',
                          fontSize: 14,
                          color: '#EA1A65',
                          // color: Colors.primary_text_color[theme],
                          paddingVertical: 4,
                        }}>
                        {t &&
                        moment(t) &&
                        moment(t).format('hh:mm a') != 'Invalid date'
                          ? moment(t).format('hh:mm a')
                          : t}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {date && (
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: 'Gilroy-Regular',
                      fontSize: 12,
                      marginRight: '4%',
                      color: '#7B7A79',
                      // color: Colors.primary_text_color[theme],
                      paddingVertical: 4,
                    }}>
                    {'Updated on : '}
                    {moment(date).format("DD MMM 'YY")}
                  </Text>
                )}
                <Text
                  style={{
                    fontFamily: 'Gilroy-Medium',
                    fontSize: 12,
                    marginRight: '4%',
                    paddingVertical: 4,
                    color: Colors.primary_text_color[theme],
                  }}>
                  Added by : {addedBy.length !== 0 ? addedBy : '--'}
                </Text>
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
              {!isDoctor && (
                <>
                  <TouchableOpacity onPress={() => handleEdit(item, medId)}>
                    <MaterialIcons
                      name="edit"
                      style={{
                        fontSize: 22,
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
                        fontSize: 22,
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
        </View>
      </>
    );
  });
};

export default MedsItem;
