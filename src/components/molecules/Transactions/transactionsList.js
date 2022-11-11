import React, { useState } from 'react';
import {
  Text,
  View,
} from 'react-native';
import moment from 'moment' ;
import {Local, setLocale} from '../../../i18n';
import {Colors} from '../../../styles/colorsV2';
import { useDispatch, useSelector } from 'react-redux';

const transactionList = ({ data }) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const { doctor, reason, amount, createdDate } = data

  String.prototype.toTitleCase = function () {
    const splited = this.split(' ')
      .map((item) => {
        if (item[0]) return `${item[0].toUpperCase()}${item.slice(1)}`;
      })
      .join(' ');
    return splited;
  };
  
  return (
    <View
      style={{
        backgroundColor: Colors.secondary_background[theme],
        paddingHorizontal: 20,
        borderRadius: 13,
        marginVertical: 10,
        elevation: 2,
        flexDirection: 'row',
        //  justifyContent:'flex-end',
        paddingVertical: 15,
      }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            color: Colors.primary_text_color[theme],
            fontSize: 16,
            paddingVertical: 4,
          }}>
          {doctor?.firstName?.toTitleCase() + " " + doctor?.lastName?.toTitleCase()}
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            color: Colors.primary_text_color[theme],
            fontSize: 12,
            paddingVertical: 4,
          }}>
          {amount ? `₹${amount}` : "Free"}
        </Text>
      </View>
      <View style={{ marginLeft: 'auto' }}>
        <Text
          style={{
            marginLeft: 'auto',
            justifyContent: "center",
            fontFamily: 'Montserrat-Medium',
            color: Colors.primary_text_color[theme],
            fontSize: 12,
            paddingVertical: 4,
          }}>
          {reason ? reason : "--"}
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            marginLeft: 'auto',
            color: Colors.primary_text_color[theme],
            fontSize: 12,
            paddingVertical: 4,
          }}>
          {moment(createdDate).format("DD MMM 'YY")}
        </Text>
      </View>
    </View>
  );
};

export default transactionList;
