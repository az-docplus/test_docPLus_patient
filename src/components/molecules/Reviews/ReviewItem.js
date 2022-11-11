import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import {
  GREY_OUTLINE,
  NEW_PRIMARY_COLOR,
  NEW_HEADER_TEXT,
  INPUT_PLACEHOLDER,
} from '../../../styles/colors';
import { Image } from 'react-native';
import RatingStarts from '../../atoms/ratingStars/RatingStarts';
import moment from 'moment';
import {Local, setLocale} from '../../../i18n';
import {Colors} from '../../../styles/colorsV2';
import { useDispatch, useSelector } from 'react-redux';
import { Host } from '../../../utils/connection';
// import image from "../../../assets/images/"


const ReviewItem = ({ name, rating, review, date, patientid, createdAt, note, bedSideRating, waitTimeRating }) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  let imageSource = require('../../../assets/images/dummy_profile.png');
  console.log(patientid.picture, "llllllllllllllllllllllllllllllllllllll")

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
      borderBottomWidth: 1,
      borderColor: GREY_OUTLINE,
      padding: 10,
      backgroundColor: Colors.secondary_background[theme],
      marginVertical: 5,
    }}>
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          // source={require('../../../assets/jpg/person3.jpg')}
          source={
            patientid?.picture?.length > 0
              ? {
                uri: `${Host}${patientid.picture
                  .replace('public', '')
                  .replace('\\\\', '/')}`,
                }
              :
               imageSource
          }
          style={{
            height: 70,
            width: 70,
            borderRadius: 35,
            margin: 5,
            marginRight: 15,
          }}
        />
        <View>

          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: Colors.primary_text_color[theme],
                fontSize: 16,
              }}>
              {patientid?.firstName.toTitleCase() + ' ' + patientid?.lastName.toTitleCase()}
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                marginTop: 2.1,
                color: Colors.primary_text_color[theme],
                alignSelf: 'flex-start',
              }}>
              {" - "}{moment(createdAt).format("DD MMM 'YY")}
            </Text>
          </View>

          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 12,
              color: Colors.primary_text_color[theme],
              margin: 7,
              lineHeight: 14,
            }}>
            {note}
          </Text>
        </View>

      </View>
    </View>

    <View style={{ flexDirection: 'row', 
    // justifyContent: 'center' 
    }}>
      {/* <View style={{ marginVertical: 6}}>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: 12,
            textAlign: 'center',
          }}>
          {'Waitime rating : '}
        </Text>
        <RatingStarts
          rating={waitTimeRating}
          activeColor={NEW_PRIMARY_COLOR}
          passiveColor={INPUT_PLACEHOLDER}
          size={16}
        />
      </View> */}

      {/* <View style={{ marginVertical: 6}}>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            color: Colors.primary_text_color[theme],
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          {'Bedside rating : '}
        </Text>
        <RatingStarts
          rating={bedSideRating}
          activeColor={NEW_PRIMARY_COLOR}
          passiveColor={INPUT_PLACEHOLDER}
          size={16}
        />
      </View> */}

      <View style={{ marginVertical: 6, justifyContent: "center"}}>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            color: Colors.primary_text_color[theme],
            fontSize: 12,
            textAlign: 'center',

          }}>
          {'Rating : '}
        </Text>
        <RatingStarts
          rating={rating}
          activeColor={NEW_PRIMARY_COLOR}
          passiveColor={INPUT_PLACEHOLDER}
          size={16}
        />
      </View>

    </View>

  </View>
  )
}


export default ReviewItem;
