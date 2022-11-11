import React, { useState, useEffect, useReducer, Children } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../../styles/colorsV3';
import { hp, wp } from '../../../components/Scalling';
import { Fonts } from '../../../styles/Fonts';

const CategoriesList = (props) => {
  const [condtionsListData, setCondtionsListData] = useState([]);
  const [proceduresListData, setProceduresListData] = useState([]);
  const [condtionsListDataTemp, setCondtionsListDataTemp] = useState([]);
  const [proceduresListDataTemp, setProceduresListDataTemp] = useState([]);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const {
    activeButton = 'Conditions',
    searchText = '',
    categories = [],
    forceUpdateCat = '',
  } = props;
  console.log(categories, '?????????????');

  const onChangeSearch = (text) => {
    if (activeButton === 'Conditions') {
      if (text.length === 0) {
        setCondtionsListData(condtionsListDataTemp);
        return;
      }
      var tempData = condtionsListDataTemp
        .filter(function (element: any) {
          const textLower = text.toUpperCase();
          const name = element.title.toUpperCase();
          return name.includes(textLower);
        })
        .map(function (item: any) {
          return item;
        });
      setCondtionsListData(tempData);
    } else {
      if (text.length === 0) {
        setProceduresListData(proceduresListDataTemp);
        return;
      }
      var tempData = proceduresListDataTemp
        .filter(function (element: any) {
          const textLower = text.toUpperCase();
          const name = element.title.toUpperCase();
          return name.includes(textLower);
        })
        .map(function (item: any) {
          return item;
        });
      setProceduresListData(tempData);
    }
  };

  useEffect(() => {
    onChangeSearch(searchText);
  }, [searchText]);

  const handleCategoryData = () => {
    var condition: any = [];
    var procedure: any = [];
    categories && categories.length !== 0
      ? categories.forEach((element) => {
          if (element.type === 'condition') {
            condition.push(element);
          } else {
            procedure.push(element);
          }
        })
      : null;

    setCondtionsListData(condition);
    setCondtionsListDataTemp(condition);
    setProceduresListData(procedure);
    setProceduresListDataTemp(procedure);
    forceUpdate();
  };
  useEffect(() => {
    handleCategoryData();
  }, [forceUpdateCat]);

  const onCategoryPress = (item: any) =>
    props.navigation.navigate('CategoryQuestions', {
      catData: { item: item, activeButton: activeButton },
    });
  const renderList = ({ item }) => {
    return (
      <TouchableOpacity
        style={Style.listItemContainer}
        onPress={onCategoryPress.bind(null, item)}>
        <Text style={Style.itemHeading} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={Style.itemQuestion}>
          {item.questions ? item.questions.length : 0}  Questions added
        </Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyList = () => (
    <View
      style={{
        paddingTop: hp(20),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ color: Colors.color19, fontSize: wp(3.8) }}>
        {activeButton} Category not found
      </Text>
    </View>
  );
  return (
    <View style={Style.container}>
      {condtionsListData.length !== 0 && activeButton === 'Conditions' ? (
        <Text style={Style.activeButton}>Choose Conditions</Text>
      ) : proceduresListData.length !== 0 && activeButton === 'Procedures' ? (
        <Text style={Style.activeButton}>Choose Procedures</Text>
      ) : null}

      <FlatList
        data={
          activeButton === 'Conditions' ? condtionsListData : proceduresListData
        }
        renderItem={renderList}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={Style.listContainer}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </View>
  );
};

export default CategoriesList;

const Style = StyleSheet.create({
  container: {
    borderWidth: 0,
    flex: 1,
  },
  activeButton: {
    fontSize: wp(4.5),
    marginVertical: hp(2),
    color: Colors.color8,
    fontFamily: Fonts.regular.en,
  },
  listItemContainer: {
    height: hp(10),
    width: wp(40),
    marginHorizontal: wp(2),
    marginVertical: hp(1),
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 18,

    shadowColor: Colors.color9,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  listContainer: {
    paddingBottom: hp(10),
  },
  itemHeading: {
    fontSize: wp(5),
    textAlign: 'center',
    color: Colors.color8,
    fontFamily: 'Gilroy-SemiBold',
  },
  itemQuestion: {
    // color: Colors.color10,
    color:'#7B7A79',
    fontSize: wp(3.5),
    fontFamily: Fonts.regular.en,
  },
});
