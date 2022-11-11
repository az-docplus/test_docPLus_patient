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
} from '../../../styles/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { Colors } from '../../../styles/colorsV2';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MedsItem = ({ data, handleEdit, handleDelete }) => {
  const { theme } = useSelector(state => state.AuthReducer)
  const [medicineActive, setMedicineActive] = useState(false);
  const { _id, ClinicName, Locality, Fees, City } = data;

  return (
    <View
      key={_id}
      style={{
        backgroundColor: Colors.secondary_background[theme],
        // marginBottom: "4%",
        paddingHorizontal: 20,
        borderRadius: 13,
        marginVertical: 10,
        elevation: 2,
        flexDirection: 'row',
        paddingVertical: 15,
        marginHorizontal: '3%'
      }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            color: Colors.primary_text_color[theme],
            fontSize: 16,
            paddingVertical: 4,
          }}>
          {ClinicName}
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            color: Colors.primary_text_color[theme],
            fontSize: 14,
            paddingVertical: 4,
          }}>
          {City}
        </Text>
      </View>
      <View style={{marginLeft: 'auto'}}>
        <Text style={{
          fontFamily: 'Montserrat-Regular',
          color: Colors.primary_text_color[theme],
          fontSize: 14,
          paddingVertical: 4,
        }}> Fees : { Fees } </Text>
      <View style={{ flexDirection: 'row', marginLeft: "auto" }}>

              <TouchableOpacity onPress={() => {
                handleDelete(data._id)
              }}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  style={{ fontSize: 22, color: NEW_PRIMARY_COLOR, marginHorizontal: 4 }}>
                </MaterialCommunityIcons>
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={() => handleEdit(data)}>
                <MaterialIcons
                  name="edit"
                  style={{ fontSize: 22, color: NEW_PRIMARY_COLOR, marginHorizontal: 4 }}>
                </MaterialIcons>
              </TouchableOpacity> */}

              {/* <TouchableOpacity onPress={handleMoreDetails}>
                <Ionicons
                name={more ? "chevron-down-outline" : "chevron-forward"}
                style={{ fontSize: 24, color: NEW_PRIMARY_COLOR, marginHorizontal: 4 }}>
                </Ionicons>
              </TouchableOpacity> */}

            </View>
              </View>
    </View>
  );
};

export default MedsItem;
