import React, { useState, useReducer, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  QuestionDropDown,
  CheckBoxList,
  MultipleChoiceList,
  ShortLongAnswer,
  LinearScale,
} from '.';
import { hp, wp } from '../../../../../components/Scalling';
import { Colors } from '../../../../../styles/colorsV3';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts } from '../../../../../styles/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Host } from '../../../../../utils/connection';

import {
  GetQuestion,
  GetCategories,
  UpdateQuestion,
  DeleteRootQuestion,
  AddCategories,
  UpdateCategories,
  UpdateCategory,
} from '../../../../../reduxV2/action/QuestionnaireAction';
import { element } from 'prop-types';

const AddQuestionFun = (props) => {
  const { userData } = useSelector((state) => state.AuthReducer);
  const [activeDropDown, setActiveDropDown] = useState<any>('MultipleChoice');
  const [subQuestionList, setSubQuestionList] = useState([]);
  const [checkBoxList, setCheckBoxList] = useState([]);
  const [radioButtonList, setRadioButtonList] = useState([]);
  const [linearScaleList, setLinearScaleList] = useState<any>({});
  const [shortAnswerText, setShortAnswerText] = useState('');
  const [longAnswerText, setLongAnswerText] = useState('');
  const [questionInput, setQuestionInput] = useState('');
  const [addLoader, setAddLoader] = useState(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const dispatch = useDispatch();
  const {
    visible = false,
    dimLights = 0.8,
    category = [],
    editQuestion = {},
    editMode = false,
  } = props;
console.log('==============@@@@@@@@@@@@@@@@@@@@@@@',category);

  useEffect(() => {
    if (Object.keys(editQuestion).length > 0 && editMode) {
      console.log(
        '===========================editQuestion',
        editQuestion,
        activeDropDown,
      );

      setActiveDropDown(editQuestion.type);
      activeDropDown === 'Checkboxes'
        ? setCheckBoxList(editQuestion.option)
        : activeDropDown === 'MultipleChoice'
        ? setRadioButtonList(editQuestion.option)
        : activeDropDown === 'LinearScale'
        ? setLinearScaleList(editQuestion.option)
        : activeDropDown === 'ShortAnswer'
        ? {
            optionType: 'ShortAnswer',
            text: questionInput,
            linkedQuestion: subQuestionList,
          }
        : activeDropDown === 'LongAnswer'
        ? {
            optionType: 'LongAnswer',
            text: questionInput,
            linkedQuestion: subQuestionList,
          }
        : '';
      setQuestionInput(editQuestion.title);
      forceUpdate();
    }
  }, [editQuestion, activeDropDown]);
  console.log('===========radioButtonList', radioButtonList);

  const onDropDownItemPress = (item) => {
    setActiveDropDown(item);
    forceUpdate();
  };
  const onChangeCheckBoxList = (checkList) => setCheckBoxList(checkList);
  const onChangeRadioButtonList = (radioList) => {
    setRadioButtonList(radioList);
  };

  const addQuestion = (question) => {
    return new Promise((resolve, reject) => {
      const config: any = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const _data = question;
      axios
        .post(`${Host}/questionnaire/add`, _data, config)
        .then((res) => {
          console.log('Response of Adding question =>', res.data);
          resolve(res.data);
        })
        .catch((e) => {
          reject('');
          setAddLoader(false);
          alert(e);
          console.log('Error while adding question => ', e.response.data);
        });
    });
  };

  // const updateCategory = (body) => {
  //     return new Promise((resolve, reject) => {
  //         const config: any = {
  //             Accept: '*/*',
  //             'Content-Type': 'application/x-www-form-urlencoded',
  //         };
  //         axios
  //             .post(`${Host}/questionnaire/category/edit`, body, config)
  //             .then((res) => {
  //                 console.log('======================updateCategory',res.data);

  //                 resolve(res.data)
  //             })
  //             .catch((e) => {
  //                 console.log('error while updating the category =>', e)
  //                 alert(e)
  //                 setAddLoader(false)
  //                 reject('')
  //             });
  //     })
  // }

  const getQuestionsId = (questions) => {
    return new Promise((resolve) => {
      const questionIdArray = [];
      questions.forEach((element) => {
        questionIdArray.push(element._id);
      });
      resolve(questionIdArray);
    });
  };

  const onAddPress = () => {
    var data :any = {};
    let editedData = {};
    if (questionInput.length === 0) {
      Alert.alert('Please Enter Question');
    } else if (activeDropDown === 'Checkboxes' && checkBoxList.length === 0) {
      Alert.alert('Please Add atleast one option');
    } else if (
      activeDropDown === 'MultipleChoice' &&
      radioButtonList.length === 0
    ) {
      Alert.alert('Please Add atleast one option');
    } else {
      setAddLoader(true);
      data = {
        title: questionInput,
        superQuestion: false,
        disabled: false,
        type: activeDropDown,
        option: JSON.stringify(
          activeDropDown === 'Checkboxes'
            ? checkBoxList
            : activeDropDown === 'MultipleChoice'
            ? radioButtonList
            : activeDropDown === 'LinearScale'
            ? linearScaleList
            : activeDropDown === 'ShortAnswer'
            ? {
                optionType: 'ShortAnswer',
                text: questionInput,
                linkedQuestion: subQuestionList,
              }
            : activeDropDown === 'LongAnswer'
            ? {
                optionType: 'LongAnswer',
                text: questionInput,
                linkedQuestion: subQuestionList,
              }
            : '',
        ),
        specialty: '',
        category: category.item._id,
        // parent: "",
        optionText: '',
        root: true,
      };
      editedData = {
        ...data,
        option:JSON.parse(data.option),
        _id: editQuestion._id,
        disabled: editQuestion.disabled,
        category: editQuestion.category,
      };
      if (editMode) {
        console.log("===========>>>>>>>>>>newcategoryv",category);
        let newEditedQuestionData = {...category};
        const filterData =  newEditedQuestionData.item.questions.filter((item)=> item._id !== editQuestion._id);
         filterData.push(editedData);
         newEditedQuestionData.item.questions = filterData;
         console.log("===========>>>>>>>>>>newEditedQuestionData",newEditedQuestionData);
         
         props.updateCategoryArray(newEditedQuestionData);
         setAddLoader(false);
         onCloseModal();

      } else {
        console.log('==============================dataxxxxxxxxx',data);
    
        addQuestion(data).then((res: any) => {
          getQuestionsId(category.item.questions).then(
            (questionIdArray: any) => {
              console.log('Add Question Response ->', res.data);
              var newQuestionId = res.data._id;
              var categoryId = res.data.category;

              questionIdArray.push(newQuestionId);
              const catData = {
                id: categoryId,
                title: category.item.title,
                practice: category.item.practice,
                type: category.item.type,
                questions: questionIdArray,
              };
              dispatch(
                UpdateCategory(catData, () => {
                  console.log('done');
                }),
              );
              category.item.questions.push(res.data);
              props.updateCategoryArray(category);
              setAddLoader(false);
              onCloseModal();
            },
          );
        });
      }
    }
  };

  const onCloseModal = () => {
    setActiveDropDown('');
    props.onClose();
  };

  const onChangeShortAnswer = (text) => {
    setShortAnswerText(text);
  };
  const onChangeLongAnswer = (text) => setLongAnswerText(text);
  const onChangeLinearScale = (data) => setLinearScaleList(data);
  const onChangeQuestionInput = (text) => setQuestionInput(text);
  const onShortLongSubQuestionPress = (data) => {
    setSubQuestionList([data._id]);
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onDismiss={onCloseModal}
      onRequestClose={onCloseModal}>
      <StatusBar translucent backgroundColor={`rgba(0,0,0,${dimLights})`} />
      <View
        style={{
          ...Style.container,
          backgroundColor: `rgba(0,0,0,${dimLights})`,
        }}>
        <View style={Style.contentContainer}>
          <View style={Style.contentContainerInner}>
            <Image
              source={require('../../../../../assets/png/dragElement.png')}
              resizeMode="contain"
              style={Style.dragElementImage}
            />
            <View style={Style.questionInputContainer}>
              <Text style={Style.questionNo}>1.</Text>
              <TextInput
                value={questionInput}
                onChangeText={onChangeQuestionInput}
                style={Style.questionInput}
                placeholder="Question"
                placeholderTextColor={Colors.color15}
                multiline
              />
            </View>
            <View style={Style.afterQuestionInputContainer}>
              <QuestionDropDown
                onPress={onDropDownItemPress}
                editMode={editMode}
                oneditDropDown={activeDropDown}
              />
              {activeDropDown === 'Checkboxes' ? (
                <CheckBoxList checkBoxList={onChangeCheckBoxList} />
              ) : activeDropDown === 'ShortAnswer' ? (
                <ShortLongAnswer
                  onChangeText={onChangeShortAnswer}
                  questionsList={category.item.questions}
                  onSubQuestionPress={onShortLongSubQuestionPress}
                />
              ) : activeDropDown === 'LongAnswer' ? (
                <ShortLongAnswer
                  question={'Long'}
                  questionsList={category.item.questions}
                  onChangeText={onChangeLongAnswer}
                  onSubQuestionPress={onShortLongSubQuestionPress}
                />
              ) : activeDropDown === 'LinearScale' ? (
                <LinearScale linearScaleList={onChangeLinearScale} />
              ) : (
                <MultipleChoiceList
                  radioButtonList={onChangeRadioButtonList}
                  editMode={editMode}
                  radioButtonListData={radioButtonList}
                />
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity style={{ marginTop: hp(4) }} onPress={onAddPress}>
          <LinearGradient
            colors={[Colors.color12, Colors.color17]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={Style.updateButton}>
            {addLoader ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Text style={Style.updateText}>
                {editMode ? 'Update' : 'Add'}
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddQuestionFun;

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
  questionInputContainer: {
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionNo: {
    fontSize: wp(5),
    color: Colors.black,
  },
  questionInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.color6,
    width: wp(66),
    backgroundColor: Colors.color14,
    marginLeft: wp(2),
    marginVertical: hp(2),
    fontSize: wp(4),
    paddingHorizontal: wp(2),
    textAlignVertical: 'top',
    maxHeight: hp(20),
    color: Colors.black,
  },
  afterQuestionInputContainer: {
    paddingLeft: wp(6),
    paddingRight: wp(2.2),
    paddingVertical: hp(3),
  },
  updateButton: {
    paddingVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(65),
    borderRadius: 30,
  },
  updateText: {
    color: Colors.white,
    fontFamily: Fonts.semi_bold.en,
    fontSize: wp(4),
  },
});
