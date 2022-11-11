import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { hp, wp } from '../../../../../components/Scalling';
import { Colors } from '../../../../../styles/colorsV3';
import { Fonts } from '../../../../../styles/Fonts';

const unCheck = require('../../../../../assets/png/unCheck.png');
const CheckBoxList = (props) => {
  const { checkBoxListData = [] } = props;

  const renderCheckBox = ({ item }) => {
    return (
      <View style={Style.listItemContainer}>
        <Image source={unCheck} resizeMode="contain" style={Style.checkImage} />
        <Text style={Style.itemLabel}>{item.text}</Text>
      </View>
    );
  };
  return (
    <View style={Style.container}>
      <FlatList
        data={checkBoxListData}
        renderItem={renderCheckBox}
        keyExtractor={(item: any) => item._id.toString()}
        style={Style.listContainer}
      />
    </View>
  );
};
export default CheckBoxList;

const Style = StyleSheet.create({
  container: {
    paddingBottom: hp(2.4),
  },
  listContainer: {
    marginVertical: hp(2),
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1.5),
    paddingHorizontal: wp(6),
  },
  checkImage: {
    width: wp(7),
    height: hp(4.4),
  },
  itemLabel: {
    maxWidth: wp(60),
    marginLeft: wp(3),
    fontSize: wp(4),
    color: Colors.black,
    fontFamily: Fonts.regular.en,
  },
});
