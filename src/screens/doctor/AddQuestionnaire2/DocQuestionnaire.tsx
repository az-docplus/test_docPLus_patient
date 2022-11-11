import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../../styles/colorsV3';
import Style from './Style';
import { Header, ConProBar, SearchBar } from '.';
import { CategoriesList } from '.';
import {
  AddQuestion,
  GetQuestion,
  GetCategories,
  UpdateQuestion,
  DeleteRootQuestion,
  AddCategories,
} from '../../../reduxV2/action/QuestionnaireAction';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../../components/Loader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { wp } from '../../../components/Scalling';
import AddCategory from './AddCategory';

const DocQuestionnaire = (props) => {
  const { userData } = useSelector((state) => state.AuthReducer);
  const [addCategoryVisible, setAddCategoryVisible] = useState(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [catLoader, setCatLoader] = useState(true);
  const dispatch = useDispatch();
  const { categories ,questions,gettingQuestionnaire} = useSelector((state) => state.QuestionnaireReducer);
  const [forceUpdateCat, setForceUpdateCat] = useState<any>('');

  const [activeButton, setActiveButton] = useState('Conditions');
  const [searchText, setSearchText] = useState('');

  const onConProButtonPress = (activeButton) => setActiveButton(activeButton);
  const onChangeSearchText = (searchText) => setSearchText(searchText);

  const getCat = () => {
    !gettingQuestionnaire && dispatch(GetQuestion(userData.id));
    dispatch(GetCategories(userData.id));

    setCatLoader(false);
    forceUpdate();
  };

  useFocusEffect(
    useCallback(() => {
      getCat();
    }, []),
  );

  const onAddCategoryPress = () => setAddCategoryVisible(true);
  const onCloseAddCategory = () => setAddCategoryVisible(false);

  const updateCategoryArray = (data) => {
    categories.push(data);
    setForceUpdateCat(Math.floor(Math.random() * 100) + 1);
  };
console.log('=========================questions',questions);
console.log();
console.log('===========================categories',categories);
  return (
    <View style={Style.container}>
      <StatusBar backgroundColor={Colors.color3} barStyle="dark-content" />
      <Header back title="Categories" navigation={props.navigation} />
      <View style={Style.contentContainer}>
        <ConProBar activeButton={onConProButtonPress} />
        <SearchBar onChangeText={onChangeSearchText} />
        {catLoader && <Loader />}
        {categories.length !== 0 ? (
          <CategoriesList
            categories={categories}
            activeButton={activeButton}
            searchText={searchText}
            navigation={props.navigation}
            forceUpdateCat={forceUpdateCat}
          />
        ) : null}
        <View style={Style.addCategoryBtnContainer}>
          <Image
            source={require('../../../assets/png/addQuestionBox.png')}
            style={Style.addCategoryImage}
            resizeMode="stretch"
          />
          <TouchableOpacity
            style={Style.addCategoryBtn}
            activeOpacity={0.6}
            onPress={onAddCategoryPress}>
            <AntDesign name="plus" size={wp(8)} color={Colors.color12} />
            <Text style={Style.addCategoryBtnText}>
              Add Customized Category
            </Text>
          </TouchableOpacity>
        </View>
        <AddCategory
          visible={addCategoryVisible}
          onClose={onCloseAddCategory}
          updateCategoryArray={updateCategoryArray}
        />
      </View>
    </View>
  );
};

export default DocQuestionnaire;
