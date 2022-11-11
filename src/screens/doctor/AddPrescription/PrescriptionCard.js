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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment'
import { DeleteMedicine } from '../../../reduxV2/action/PatientAction'
import { useDispatch, useSelector } from 'react-redux';
import Popconfirm from '../Modal/PopConfirm';
import {Colors} from '../../../styles/colorsV2';

const MedsItem = ({ data, handleEdit, medId }) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [medicineActive, setMedicineActive] = useState(false);
  const [_rotation, set_rotation] = useState('270')
  const [more, setmore] = useState(false)

  const { patient } = useSelector(state => state.PatientReducer)
  const dispatch = useDispatch();

  const handleMoreDetails = () => {
    setmore(!more)
    set_rotation(_rotation == '270' ? '90' : '270')
  }

  const handleDelete = (_id) => {
    dispatch(DeleteMedicine({ id: patient._id, medid: medId }, patient.meta))
  }
  const [askConfirmation, setaskConfirmation] = useState(false);
  return data.map((item) => {
    const { _id, name, quantity, description, time, addedBy, date } = item;
    return (
      <>
        <Popconfirm
          onUpdate={() => {
            setaskConfirmation(false)
            handleDelete(_id)
          }}
          onCancel={() => { setaskConfirmation(false) }}
          visible={askConfirmation}>
        </Popconfirm>
        <View
          key={_id}
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
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 16,
                color: Colors.primary_text_color[theme],
                paddingVertical: 4,
              }}>
              {name}
            </Text>

            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 11,
                color: Colors.patient_time[theme],
                paddingVertical: 4,
              }}>
              {time ? time.length : quantity} pills/ day
          </Text>

            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: 11,
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
                    <TouchableOpacity style={{
                      alignItems: 'center',
                      // backgroundColor: NEW_PRIMARY_LIGHT_BG,
                      backgroundColor: Colors.primary_light_bg[theme],
                      borderWidth: 0,
                      borderRadius: 6,
                      paddingHorizontal: '2%',
                      marginRight: '2%'
                    }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Medium',
                          fontSize: 11,
                          color: Colors.primary_text_color[theme],
                          paddingVertical: 4,
                        }}>
                        {t && moment(t) && moment(t).format('hh:mm a') != 'Invalid date' ? moment(t).format('hh:mm a') : t}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {
                  date && (
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Medium',
                        fontSize: 11,
                        marginRight: "4%",
                        color: Colors.primary_text_color[theme],
                        paddingVertical: 4,
                      }}>
                      {'Updated on : '}{moment(date).format("DD MMM 'YY")}
                    </Text>
                  )
                }
                <Text
                  style={{
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 11,
                    marginRight: "4%",
                    paddingVertical: 4,
                    color: Colors.primary_text_color[theme],
                  }}>
                  Added by : {addedBy}
                </Text>
              </View>
            )}
          </View>

          <View style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>

            <TouchableWithoutFeedback
              onPress={() => setMedicineActive(!medicineActive)}>
              <MaterialIcons
                name={medicineActive ? 'timer' : 'timer-off'}
                color={medicineActive ? NEW_PRIMARY_COLOR : INPUT_PLACEHOLDER}
                size={25}
              />
            </TouchableWithoutFeedback>

            <View style={{ flexDirection: 'row' }}>

              <TouchableOpacity onPress={() => {
                setaskConfirmation(true)
              }}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  style={{ fontSize: 22, color: NEW_PRIMARY_COLOR, marginHorizontal: 4 }}>
                </MaterialCommunityIcons>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleEdit(item, medId)}>
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

            </View>

          </View>
        </View>

      </>
    );
  });
};

export default MedsItem;
