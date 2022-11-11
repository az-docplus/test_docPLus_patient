import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { View, ActivityIndicator, Text, StatusBar } from 'react-native';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import AnimInput from '../../../components/molecules/AnimInput/AnimInput';
import DmzButton from '../../../components/atoms/SwitchButton/SwitchButton';
import { Picker } from '@react-native-community/picker';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddQuestion,
  GetQuestion,
  GetCategories,
  UpdateQuestion,
  DeleteRootQuestion,
  AddCategories,
} from '../../../reduxV2/action/QuestionnaireAction';
import NewItem from '../../../components/molecules/MedicalHistory/CustomTextButton';
import NewItem2 from '../../../components/molecules/MedicalHistory/NewItem';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ExpandableListOld from '../../../components/molecules/ExpandableList/ExpandableListOld';
import Overlay from '../../../components/atoms/Overlay/Overlay';
import BasicCard from '../../../components/atoms/BasicCard/BasicCard';
import ViewPager from '@react-native-community/viewpager';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddCategoryModal from '../../../components/molecules/Modal/AddCategory';
import AnimatedErrorText from '../../../components/atoms/animatedErrorText/AnimatedErrorText';
import { INPUT_PLACEHOLDER } from '../../../styles/colors';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';

function AddQuestionnaire({ navigation }) {
  const { theme } = useSelector((state) => state.AuthReducer);
  const pagerRef = useRef();
  const nextpage = (page) => {
    pagerRef.current.setPage(page);
  };
  const [options, setOptions] = useState([]);
  const [Question, setQuestion] = useState({
    title: '',
    superQuestion: 'false',
    option: [],
    specialty: '',
    category: '',
    root: 'true',
    id: '',
    type: 'radio',
  });
  const [errors, seterrors] = useState({
    title: '',
    specialty: '',
    category: '',
    categoryTitle: '',
  });
  const [showAddLinkedPopup, setShowAddLinkedPopup] = useState(false);
  const [parentId, setParentId] = useState('');
  const [optionId, setOptionId] = useState('');
  const [Category, setCategory] = useState('');
  const [CategoryModalVisible, setCategoryModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.AuthReducer);
  const {
    gettingQuestionnaire,
    questions,
    isLoading,
    questionDetails,
    categories,
  } = useSelector((state) => state.QuestionnaireReducer);
  //const [categories, setcategories] = useState()
  useEffect(() => {
    !gettingQuestionnaire && dispatch(GetQuestion(userData.id));
    dispatch(GetCategories(userData.id));
    console.log(userData.id === userData._id, '::::::::::::::::::::::::');
  }, []);

  //could be used when API return data of added question till then dispatch an action when submit
  // useEffect(() => {
  //   !isLoading && setQuestion(questionDetails);
  // }, [questionDetails]);

  const addOption = () => {
    const schema = {
      _id: new Date().getTime().toString(),
      optionType: '',
      text: '',
      linkedQuestion: [],
    };
    setQuestion({ ...Question, option: [...options, schema] });
    setOptions([...options, schema]);
  };
  const removeOption = (_id) => {
    let removed = [];
    removed = options.filter((item) => item._id !== _id);
    setQuestion({ ...Question, option: removed });
    setOptions(removed);
  };
  const handleTitleInput = (text) => {
    if (text === '') {
      seterrors({ ...errors, title: 'Please provide a title' });
    } else {
      seterrors({ ...errors, title: '' });
    }
    setQuestion({ ...Question, title: text });
  };
  const handleSpecialityInput = (text) => {
    if (text === '') {
      seterrors({ ...errors, specialty: 'Please provide a speciality' });
    } else {
      seterrors({ ...errors, specialty: '' });
    }
    setQuestion({ ...Question, specialty: text });
  };
  const handleCategoryInput = (text) => {
    if (text === '') {
      seterrors({ ...errors, category: 'Please provide a category' });
    } else {
      seterrors({ ...errors, category: '' });
    }
    setQuestion({ ...Question, category: text });
    console.log(Question);
  };
  const onClickQuestion = (question) => {
    const { option } = question;
    setOptions(option);
    setQuestion(question);
  };
  const onSubmit = () => {
    if (Question.title === '') {
      seterrors({ ...errors, title: 'Please provide a title' });
      return;
    } else if (
      Question.category === '' ||
      Question.category === 'Select a category'
    ) {
      seterrors({ ...errors, category: 'Please provide a category' });
      return;
    }
    //else if (Question.specialty === '') {
    //   seterrors({ ...errors, specialty: "Please provide a speciality" })
    //   return
    // }
    else {
      let optionTemp = options.map((item) => {
        return {
          optionType: item?.optionType,
          text: item?.text,
        };
      });
      let Fques = {
        ...Question,
        option: JSON.stringify(optionTemp),
        id: userData.id,
      };
      dispatch(AddQuestion(Fques));
      dispatch(GetQuestion(userData.id));
    }

    // console.log(Fques);
  };
  const onUpdateQuestion = () => {
    let optionTemp = options.map((item) => {
      return {
        optionType: item.optionType,
        text: item.text,
        linkedQuestion: item.linkedQuestion,
      };
    });
    const { _id, category, specialty, superQuestion, root, title } = Question;
    console.log(options);
    let Fques = {
      category,
      specialty,
      superQuestion,
      root,
      title,
      option: JSON.stringify(optionTemp),
      id: _id,
    };
    console.log(Fques, '????????????????????????');
    dispatch(UpdateQuestion(Fques));
    dispatch(GetQuestion(userData.id));
  };
  const onDeleteQuestion = () => {
    const { root, _id } = Question;
    if (root) {
      const question = {
        docId: userData.id,
        questionId: _id,
      };
      dispatch(DeleteRootQuestion(question));
      dispatch(GetQuestion(userData.id));
    }
  };
  const onPressReset = () => {
    setQuestion({
      ...Question,
      title: '',
      superQuestion: 'false',
      option: [],
      specialty: '',
      category: '',
      root: 'false',
      id: '',
    });
    setOptions([]);
  };
  const onPressLinkedOption = (optionId) => {
    setParentId(Question._id);
    setCategory(Question.category);
    setOptionId(optionId);
  };
  const openLinkedPopup = () => {
    setShowAddLinkedPopup(true);
  };
  const closeLinkedPopup = () => {
    setShowAddLinkedPopup(false);
  };
  const AddCategoryHandler = (title) => {
    console.log(title, '????????????????????');
    if (title === '') {
      seterrors({ ...errors, categoryTitle: 'Please provide a title' });
      return;
    } else {
      const body = { practiceid: userData._id, title };
      console.log(body, 'DDDDDDDDDDDDDDDDDDDDDD');
      dispatch(AddCategories(body));
      setCategoryModalVisible(false);
    }
  };
  console.log('===========================categories', categories);

  console.log('=========================questions', questions);
  return (
    <>
      <AddCategoryModal
        visible={CategoryModalVisible}
        errors={errors.categoryTitle}
        onCancel={() => setCategoryModalVisible(false)}
        onUpdate={AddCategoryHandler}></AddCategoryModal>
      <StatusBar
        animated
        backgroundColor={Colors.secondary_background[theme]}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.primary_background[theme],
        }}>
        <TopNavBar navigation={navigation} headerText={'Questionnaire'} />
        {/* <ViewPager
        ref={pagerRef}
        style={{flex: 1}}
        initialPage={1}
        scrollEnabled={false}>
        <View key="0"></View>
        <View key="1"></View>
      </ViewPager> */}
        <ScrollView
          contentContainerStyle={{ paddingVertical: 40 }}
          style={{ marginTop: 10, paddingHorizontal: 25 }}>
          <View>
            {gettingQuestionnaire ? (
              <ActivityIndicator />
            ) : questions.length ? (
              questions.map((item) => {
                const linked = item.option.reduce((acc, curr) => {
                  acc.push(...curr.linkedQuestion);
                  return acc;
                }, []);
                if (item.title)
                  return (
                    <ExpandableListOld
                      key={item._id}
                      name={item.title.slice(0, 20).concat('...')}
                      nestedList={linked}
                      onPressList={() => {
                        onClickQuestion(item);
                      }}
                      onClickQuestion={onClickQuestion}
                      option={item.option}
                    />
                  );
              })
            ) : (
              <Text
                style={{
                  marginBottom: 10,
                  color: Colors.primary_text_color[theme],
                }}>
                {Local('doctor.AddQuestionnaire.AddCategory.no_questions')}
              </Text>
            )}
          </View>
          <AddQuestionTemplate
            Question={Question}
            handles={{
              handleTitleInput,
              handleCategoryInput,
              handleSpecialityInput,
              onPressReset,
            }}
            errors={errors}
            categories={categories}
            optionProp={{ options, setOptions, removeOption, addOption }}
            onSubmit={onSubmit}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingHorizontal: '2%',
            }}>
            <NewItem
              text={`${Local('doctor.AddQuestionnaire.AddCategory.update')}`}
              onPress={onUpdateQuestion}
            />
            <NewItem
              text={`${Local('doctor.AddQuestionnaire.AddCategory.delete')}`}
              onPress={onDeleteQuestion}
            />
            {/* <DmzButton
              text="Update"
              onPress={onUpdateQuestion}
              style={{
                Container: {
                  marginTop: 10,
                  // borderRadius: 5,
                  // backgroundColor: '#077EE9',
                  // alignSelf: 'center',
                  borderColor: '#077EE9',
                  borderWidth: 0.7,
                  borderRadius: 5,
                },
                Text: {
                  color: '#077EE9',
                },
              }}
            /> */}
            {/* <DmzButton
              text="Delete"
              onPress={onDeleteQuestion}
              style={{
                Container: {
                  marginTop: 10,
                  // borderRadius: 5,
                  // backgroundColor: '#b50039',
                  // alignSelf: 'center',
                  borderColor: '#b50039',
                  borderWidth: 0.7,
                  borderRadius: 5,
                },
                Text: {
                  color: '#b50039',
                },
              }}
            /> */}
          </View>
          <View
            style={{
              marginTop: '2%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            <NewItem
              text={`${Local(
                'doctor.AddQuestionnaire.AddCategory.add_category',
              )}`}
              onPress={() => {
                setCategoryModalVisible(true);
              }}
            />
          </View>
          {Question.option.length !== 0 && (
            <AddLinkedOption
              options={Question.option}
              onPressLinkedOption={onPressLinkedOption}
              openLinkedPopup={openLinkedPopup}
            />
          )}
        </ScrollView>
        {showAddLinkedPopup && (
          <LinkedController
            Category={Category}
            parentId={parentId}
            categories={categories}
            optionId={optionId}
            errors={errors}
            closeLinkedPopup={closeLinkedPopup}
          />
        )}
      </View>
    </>
  );
}

const AddQuestionTemplate = ({
  Question,
  handles: {
    handleCategoryInput,
    handleTitleInput,
    handleSpecialityInput,
    onPressReset,
  },
  categories,
  optionProp: { options, setOptions, removeOption, addOption },
  questionHeader,
  onSubmit,
  errors,
}) => {
  const { theme } = useSelector((state) => state.AuthReducer);
  const { title, specialty, category } = Question;

  return (
    <>
      <View style={{ marginTop: '4%' }}>
        <DmzText
          style={{ color: Colors.primary_text_color[theme] }}
          text={questionHeader || 'Question'}
          type={4}
        />
      </View>
      <AnimInput
        value={title}
        placeholder="Title"
        style={[
          { Container: { marginTop: 10 } },
          { color: Colors.primary_text_color[theme] },
        ]}
        inputHandler={handleTitleInput}
      />
      <AnimatedErrorText text={errors.title} />

      {/* <View style={{ marginTop: 10 }}>
        <AnimInput
          placeholder="Speciality"
          style={{ Container: { width: '100%' } }}
          inputHandler={handleSpecialityInput}
          value={specialty}
        />
        <AnimatedErrorText text={errors.specialty} />
      </View> */}

      {/* <AnimInput
          placeholder="Category"
          style={{ Container: { width: '40%' } }}
          inputHandler={handleCategoryInput}
          value={category}
        /> */}
      {categories && (
        <View style={{ marginTop: 10 }}>
          <Picker
            mode="dropdown"
            style={{
              width: '100%',
              borderBottomWidth: 1,
              borderBottomColor: 'grey',
              color: Colors.primary_text_color[theme],
            }}
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) =>
              handleCategoryInput(itemValue)
            }>
            <Picker.Item
              label="Select a category"
              color={INPUT_PLACEHOLDER}
              value="Select a category"
            />
            {categories.length > 0 &&
              categories.map((cat, index) => {
                console.log(cat, '?????????????');
                if (cat?.title && cat?.title != ' ' && cat?.title != '') {
                  return (
                    <Picker.Item
                      style={{ color: '#000' }}
                      key={index}
                      label={cat?.title}
                      value={cat?._id}
                    />
                  );
                }
              })}
          </Picker>
          <AnimatedErrorText text={errors.category} />
        </View>
      )}

      {options.map((item) => (
        <Option
          key={item._id}
          item={item}
          options={options}
          setOptions={setOptions}
          onPressRemove={removeOption}
        />
      ))}

      <View
        style={{
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'flex-start',
          // backgroundColor: Colors.secondary_background[theme],
          marginLeft: '2%',
        }}>
        <TouchableOpacity
          onPress={addOption}
          style={{
            borderBottomColor: '#ddd',
            borderBottomWidth: 1.5,
            paddingHorizontal: '1%',
          }}>
          <Text
            style={{
              // color: '#7B7A79',
              color: Colors.primary_text_color[theme],
              fontFamily: 'Montserrat-Regular',
            }}>
            {Local('doctor.AddQuestionnaire.AddCategory.add_option')}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          // width: '80%',
          // alignSelf: 'center',
          marginTop: 25,
        }}>
        <NewItem
          text={`${Local('doctor.AddQuestionnaire.AddCategory.add_question')}`}
          onPress={onSubmit}
        />
        <NewItem
          text={`${Local('doctor.AddQuestionnaire.AddCategory.reset')}`}
          onPress={onPressReset}
        />

        {/* <DmzButton
          // disabled={errors.category === '' && errors.specialty === '' && errors.title === ''}
          onPress={onSubmit}
          text="Add"
          style={{
            Container: { backgroundColor: '#43A2A2', borderRadius: 5 },
            Text: {
              color: '#fff',
            },
          }}
        /> */}
        {/* <DmzButton
          text="Reset"
          onPress={onPressReset}
          style={{
            Container: {
              borderColor: '#999',
              borderWidth: 0.7,
              borderRadius: 5,
            },
          }}
        /> */}
      </View>
    </>
  );
};

const Option = ({ item, onPressRemove, options, setOptions }) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const handleInput = (text) => {
    let optionTemp = options.filter((i) => i._id !== item._id);
    optionTemp = [
      ...optionTemp,
      {
        _id: item._id,
        optionType: item.optionType,
        text: text,
        linkedQuestion: [],
      },
    ];
    setOptions(optionTemp);
  };
  const onPressRemoveButton = () => {
    onPressRemove(item._id);
  };
  const setInputTypeGlobal = (value = 'radio') => {
    let optionTemp = options.filter((i) => i._id !== item._id);
    optionTemp = [
      ...optionTemp,
      {
        _id: item._id,
        optionType: value,
        text: item.text,
        linkedQuestion: [],
      },
    ];
    setOptions(optionTemp);
  };

  // useEffect(() => {
  //   setInputTypeGlobal('radio');
  // }, []);

  return (
    <View
      style={{
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        overflow: 'hidden',
      }}>
      <Picker
        mode="dropdown"
        style={{
          width: '40%',
          height: 25,
          color: Colors.primary_text_color[theme],
        }}
        selectedValue={item.optionType}
        onValueChange={(itemValue, itemIndex) => setInputTypeGlobal(itemValue)}>
        <Picker.Item label="Radio" value="radio" />
        <Picker.Item label="Text" value="text" />
      </Picker>
      <AnimInput
        inputHandler={handleInput}
        withAnim={false}
        value={item.text}
        placeholder="option"
        style={{
          Container: { borderBottomWidth: 0, width: '40%' },
        }}
      />

      <TouchableOpacity
        onPress={onPressRemoveButton}
        style={{
          // backgroundColor: '#dbdbdb',
          backgroundColor: Colors.trash_background[theme],
          paddingHorizontal: '4%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <MaterialIcon
          name={'delete'}
          size={24}
          color={Colors.trash_color[theme]}
        />
      </TouchableOpacity>
    </View>
  );
};

const LinkedController = ({
  parentId,
  optionId,
  closeLinkedPopup,
  categories,
  errors,
  Category,
}) => {
  const { theme } = useSelector((state) => state.AuthReducer);
  const [options, setOptions] = useState([]);
  const [Question, setQuestion] = useState({
    title: '',
    superQuestion: 'false',
    option: [],
    specialty: '',
    category: Category,
    root: 'false',
    id: '',
    parent: parentId,
    optionId: optionId,
  });
  const { userData } = useSelector((state) => state.AuthReducer);
  const addOption = () => {
    const schema = {
      _id: new Date().getTime().toString(),
      optionType: '',
      text: '',
      linkedQuestion: [],
    };
    setOptions([...options, schema]);
  };
  const dispatch = useDispatch();
  const removeOption = (_id) => {
    let removed = [];
    removed = options.filter((item) => item._id !== _id);
    setOptions(removed);
  };
  const handleTitleInput = (text) => {
    setQuestion({ ...Question, title: text });
  };
  const handleSpecialityInput = (text) => {
    setQuestion({ ...Question, specialty: text });
  };
  const handleCategoryInput = (text) => {
    setQuestion({ ...Question, category: text });
  };
  const onPressReset = () => {
    setQuestion({
      title: '',
      superQuestion: 'false',
      option: [],
      specialty: '',
      category: '',
      optionText: '',
      root: 'false',
      id: '',
    });
    setOptions([]);
  };
  const onSubmit = () => {
    let optionTemp = options.map((item) => {
      return {
        optionType: item.optionType,
        text: item.text,
      };
    });
    let Fques = {
      ...Question,
      option: JSON.stringify(optionTemp),
      id: userData.id,
      parent: parentId,
      optionId: optionId,
    };
    dispatch(AddQuestion(Fques));
    dispatch(GetQuestion(userData.id));
    closeLinkedPopup();
  };
  return (
    <Overlay
      onPress={closeLinkedPopup}
      style={{ justifyContent: 'center', alignItems: 'center' }}>
      <BasicCard
        style={{
          CardContainer: {
            height: '80%',
            width: '90%',
            marginRight: null,
            backgroundColor: Colors.secondary_background[theme],
          },
        }}>
        {/* <AddQuestionTemplate
          questionHeader="Link a Question"
          Question={Question}
          handles={{
            handleTitleInput,
            handleCategoryInput,
            handleSpecialityInput,
            onPressReset,
          }}
          errors={errors}
          optionProp={{ options, setOptions, removeOption, addOption }}
          onSubmit={onSubmit}
        /> */}
        <DmzButton
          style={{
            Container: {
              marginTop: 5,
              borderColor: '#b50039',
              borderWidth: 0.7,
              borderRadius: 5,
            },
            Text: { color: '#b50039' },
          }}
          text="close"
          onPress={closeLinkedPopup}
        />
      </BasicCard>
    </Overlay>
  );
};

const AddLinkedOption = ({
  options,
  onPressLinkedOption = () => {},
  openLinkedPopup,
}) => {
  const { theme } = useSelector((state) => state.AuthReducer);
  const [selectedOption, setSelectedOption] = useState('');
  const onPressLinkedOptionLocal = (itemValue, itemIndex) => {
    if (itemValue == '') {
      setSelectedOption(itemValue);
    } else {
      const option = options.find((item) => item.text === itemValue);
      onPressLinkedOption(option._id);
      setSelectedOption(itemValue);
    }
  };
  return (
    <View
      style={{
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 50,
        overflow: 'hidden',
      }}>
      <Picker
        mode="dropdown"
        style={{ flex: 1, height: 25, color: Colors.primary_text_color[theme] }}
        selectedValue={selectedOption}
        onValueChange={onPressLinkedOptionLocal}>
        <Picker.Item color={'#ddd'} label={'Option'} value={''} />
        {options.length !== 0 &&
          options.map((item) => {
            return (
              <Picker.Item key={item._id} label={item.text} value={item.text} />
            );
          })}
      </Picker>
      <DmzButton
        disabled={selectedOption == '' ? true : false}
        onPress={openLinkedPopup}
        text="Add Sub Question"
        style={{
          Container: {
            borderRadius: 10,
            backgroundColor:
              selectedOption == ''
                ? Colors.sub_ques_disabled[theme]
                : Colors.sub_ques_enabled[theme],
            flex: 1,
            height: '100%',
            marginLeft: 5,
          },
          Text: { color: '#fff' },
        }}
      />
    </View>
  );
};

//fontFamily: 'Montserrat-SemiBold',
export default AddQuestionnaire;
