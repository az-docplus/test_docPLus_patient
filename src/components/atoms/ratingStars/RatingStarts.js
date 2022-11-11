import React from 'react';
import {StyleSheet, View} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {Local, setLocale} from '../../../i18n';
import {Colors} from '../../../styles/colorsV2';
import { useDispatch, useSelector } from 'react-redux';


function RatingStarts({rating, activeColor, passiveColor, size, filled}) {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const ratingStars = (() => {
    let arr = [];
    let i, j;
    for (i = 0; i < rating; i++) {
      arr.push(
        <FontAwesomeIcon
          key={i}
          name="star"
          size={size || 11}
          color={activeColor || '#F4C130'}
          style={{marginRight: 4}}
        />,
      );
    }
    for (j = 0; j < 5 - rating; j++) {
      arr.push(
        filled ? (
          <FontAwesomeIcon
            key={i}
            name="star"
            size={size || 11}
            color={passiveColor || '#fafafa'}
            style={{marginRight: 4}}
          />
        ) : (
          <Icon
            key={i + j}
            name="star"
            size={(size && size - 2) || 9}
            color={passiveColor || '#F4C130'}
            style={{marginRight: 4}}
          />
        ),
      );
    }
    return arr;
  })();
  return <View style={[Styles.Rating, { 
    // backgroundColor: Colors.secondary_background[theme]
  }]}>{ratingStars}</View>;
}

const Styles = StyleSheet.create({
  Rating: {
    flexDirection: 'row',
    marginLeft: 5,
  },
});
export default RatingStarts;
