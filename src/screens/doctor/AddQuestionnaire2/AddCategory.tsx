import {
  View,
  Text,
  Modal,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../styles/colorsV3';
import { hp, wp } from '../../../components/Scalling';
import AddCategoryDropDown from './AddCategoryDropDown';
import { Fonts } from '../../../styles/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import { Host } from '../../../utils/connection';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const AddCategory = (props) => {
  const { userData } = useSelector((state) => state.AuthReducer);
  const { visible = false, dimLights = 0.8, onClose } = props;
  const [categoryInput, setCategoryInput] = useState('');
  const [addLoader, setAddLoader] = useState(false);
  const [categoryType, setCategoryType] = useState('condition');

  const onChangeCategoryInput = (text) => {
    setCategoryInput(text);
  };

  const onCategoryTypePress = (value) => {
    setCategoryType(value);
  };

  useEffect(() => {
    setCategoryInput('');
    setCategoryType('condition');
  }, [visible]);

  const AddCategory = (categoryData) => {
    return new Promise((resolve, reject) => {
      const config: any = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const _data = categoryData;
      axios
        .post(`${Host}/questionnaire/category/add`, _data, config)
        .then((res) => {
          console.log('Response of Adding category =>', res.data);
          resolve(res.data);
        })
        .catch((e) => {
          reject('');
          setAddLoader(false);
          console.log('Error while adding category => ', e);
        });
    });
  };

  const onAddPress = () => {
    if (categoryInput.length === 0) {
      Alert.alert('Please enter title first');
    } else {
      setAddLoader(true);
      const data = {
        title: categoryInput,
        practiceid: userData._id,
        type: categoryType,
        questions: [],
      };
      AddCategory(data)
        .then((res: any) => {
          console.log('response of added category =>', res);
          const cat = res.category;
          cat.type = categoryType;
          props.updateCategoryArray(cat);
          setAddLoader(false);
          Alert.alert('Category Added');
          props.onClose();
        })
        .catch(() => {
          Alert.alert('Something went wrong please try again later');
          setAddLoader(false);
          props.onClose();
        });
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onDismiss={onClose}
      onRequestClose={onClose}>
      <StatusBar translucent backgroundColor={`rgba(0,0,0,${dimLights})`} />
      <View
        style={{
          ...Style.container,
          backgroundColor: `rgba(0,0,0,${dimLights})`,
        }}>
        <View style={Style.contentContainer}>
          <View style={Style.contentContainerInner}>
            <Image
              source={require('../../../assets/png/dragElement.png')}
              resizeMode="contain"
              style={Style.dragElementImage}
            />
            <View style={Style.categoryInputContainer}>
              <TextInput
                value={categoryInput}
                onChangeText={onChangeCategoryInput}
                style={Style.categoryInput}
                placeholder="Enter Category"
                placeholderTextColor={Colors.color15}
                multiline
              />
            </View>
            <View style={Style.dropDownContainer}>
              <Text style={Style.selectType}>Select type</Text>
              <AddCategoryDropDown onPress={onCategoryTypePress} />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{ marginTop: hp(4) }}
          onPress={onAddPress}
          disabled={addLoader}>
          <LinearGradient
            colors={[Colors.color12, Colors.color17]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={Style.addButton}>
            {addLoader ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Text style={Style.addText}>Add</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddCategory;

const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: Colors.color1,
    borderRadius: 18,
    paddingLeft: wp(1.5),
  },
  dragElementImage: {
    alignSelf: 'center',
    width: wp(11),
    height: hp(2.5),
  },
  contentContainerInner: {
    backgroundColor: Colors.white,
    width: wp(85),
    paddingHorizontal: wp(5),
    paddingTop: hp(1.5),
    borderRadius: 18,
  },
  categoryInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.color6,
    width: wp(74),
    backgroundColor: Colors.color14,
    marginVertical: hp(2),
    fontSize: wp(4),
    paddingHorizontal: wp(2),
    textAlignVertical: 'top',
    maxHeight: hp(20),
    color: Colors.black,
  },
  selectType: {
    fontSize: wp(4),
    fontFamily: Fonts.regular.hi,
    color: Colors.black,
    marginVertical: hp(1.2),
  },
  dropDownContainer: {
    paddingBottom: hp(3),
  },
  addButton: {
    paddingVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(65),
    borderRadius: 30,
  },
  addText: {
    color: Colors.white,
    fontFamily: Fonts.semi_bold.en,
    fontSize: wp(4),
  },
});
