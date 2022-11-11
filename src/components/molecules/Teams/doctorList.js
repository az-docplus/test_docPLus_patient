import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux'
import { InviteDoctor, AcceptRequest } from '../../../reduxV2/action/DoctorAction'
import { Colors } from '../../../styles/colorsV2';

const TeamItem = ({ data, navigation, Invite, teamId, pending, praticeIDs }) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch()
  const { _id, basic, practise } = data;

  // console.log(data, 'data...................................')
  return (
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
          {pending ? practise.name : basic.name}
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: 12,
            color: Colors.primary_text_color[theme],
            paddingVertical: 4,
          }}>
          {data.specialty}
        </Text>
      </View>

      {
        pending ?
          <TouchableOpacity style={{ marginLeft: "auto" }} onPress={() => {
            const obj = {
              practiseid: userData._id,
              requestid: practise._id,
            }
            dispatch(AcceptRequest(obj))
          }}>
            <Text style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: 16,
              paddingVertical: 4,
              color: '#43A2A2'
            }}>Accept
            </Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={{ marginLeft: "auto" }}
            disabled={praticeIDs && praticeIDs.includes(_id)}
            onPress={() => {
              const obj = {
                practiseid: userData._id,
                requestid: data._id,
                teamid: teamId,
              }
              dispatch(InviteDoctor(obj))
            }}
          >
            <Text style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: 16,
              paddingVertical: 4,
              color: '#43A2A2'
            }}>
              {praticeIDs && praticeIDs.includes(_id) ? 'Sent' : 'Invite'}
            </Text>
          </TouchableOpacity>
      }
    </View>
  );
};

export default TeamItem;
