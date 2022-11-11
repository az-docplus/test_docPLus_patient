import React, { useState, useReducer, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { hp, wp } from '../../../../../components/Scalling';
import { Colors } from '../../../../../styles/colorsV3';
import { Fonts } from '../../../../../styles/Fonts';
import {
  CheckBoxList,
  MultipleChoiceList,
  LinearScaleList,
  ShortLongAnswer,
} from '.';
import axios from 'axios';
import { Host } from '../../../../../utils/connection';
import _ from 'lodash';
import commonService from '../../../../../services/commonServices';
import Loader from '../../../../../components/Loader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const dragElement = require('../../../../../assets/png/dragElement.png');
const toggleOn = require('../../../../../assets/png/toggleOn.png');
const toggleOff = require('../../../../../assets/png/toggleOff.png');

const QuestionsList = (props) => {
  const [questionLoader, setQuestionLoader] = useState(true);
  const { questions = [] } = props;
  const [questionsList, setQuestionsList] = useState(questions);

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const onTogglePress = (item, index) => {
    questionsList[index].disabled = !item.disabled;
    setQuestionsList(questionsList);
    props.onQuestionToggleChange(questionsList);
    forceUpdate();
  };
console.log("=====xxxxxxxxxxxxxxwwwwwww",questionsList);

  useEffect(() => {
    commonService.asyncLoop(
      questions.length,
      (loop) => {
        var index = loop.iteration();
        var element = questions[index];
        if (element.option.length !== 0) {
          element.option.forEach((optionElement) => {
            if (optionElement.linkedQuestion.length !== 0) {
              const linkedQuestionId = optionElement.linkedQuestion[0];
              const questionData = _.filter(questions, function (qus) {
                return qus._id === linkedQuestionId;
              });
              if (questionData && questionData.length !== 0) {
                optionElement.linkedQuestion = [questionData[0]];
              }
            }
          });
        }
        loop.next();
      },
      () => {
        setQuestionsList(questions);
        setQuestionLoader(false);
      },
    );
  }, []);

  
//   const DeleteQuestion = (id:string) => {
//       console.log('====================================',id);
      
//     setQuestionsList(questionsList.filter((item:any)=> item._id !== id));
//   };
  const renderList = ({ item, index }) => {
    return (
      <View style={{ ...Style.listContainer, ...Style.shadow }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity  onPress={() => props.onEditQuestion(item)}
             style={{ marginHorizontal:15}}>
              <MaterialCommunityIcons name="pencil" color="#077EE9" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginRight: 5 }}
              onPress={() => props.onDeleteQuestion(item._id)}>
              <FontAwesome5 name="trash" color="#EA1A65" size={20} />
            </TouchableOpacity>
          </View>

          <View>
            {item.disabled ? (
              <TouchableOpacity
                onPress={onTogglePress.bind(null, item, index)}
                activeOpacity={0.7}>
                <Image
                  source={toggleOff}
                  style={Style.toggleOff}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={onTogglePress.bind(null, item, index)}
                activeOpacity={0.7}>
                <Image
                  source={toggleOn}
                  style={Style.toggleOn}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* <Image
          source={dragElement}
          resizeMode="contain"
          style={Style.dragElementImage}
        /> */}

        <View style={Style.questionContainer}>
          <Text style={Style.itemQuestionText}>{index + 1}.</Text>
          <Text style={Style.itemQuestionText}>{item.title}</Text>
        </View>

        {item.option[0]?.linkedQuestion.length !== 0 && (
          <View style={Style.subQuestionContainer}>
            <Text style={Style.subItemQuestionText}>sub qustion:</Text>
            <Text style={Style.subItemQuestionText}>
              {item.option[0]?.linkedQuestion[0]?.title}
            </Text>
          </View>
        )}

        {item.type === 'Checkboxes' ? (
          <CheckBoxList checkBoxListData={item.option} />
        ) : item.type === 'MultipleChoice' ? (
          <MultipleChoiceList multipleChoiceListData={item.option} />
        ) : item.type === 'LinearScale' ? (
          <LinearScaleList linearScaleListData={item.option} />
        ) : item.type === 'ShortAnswer' ? (
          <ShortLongAnswer shortLongAnswer={item.option} />
        ) : item.type === 'LongAnswer' ? (
          <ShortLongAnswer shortLongAnswer={item.option} />
        ) : null}
      </View>
    );
  };
  return (
    <View style={Style.container}>
      {questionLoader ? (
        <Loader />
      ) : (
        <FlatList
          data={questionsList}
          renderItem={renderList}
          keyExtractor={(item) => item._id.toString()}
        />
      )}
    </View>
  );
};

export default QuestionsList;

const Style = StyleSheet.create({
  container: {
    borderWidth: 0,
    paddingHorizontal: wp(3),
  },
  listContainer: {
    backgroundColor: Colors.white,
    width: wp(85),
    paddingHorizontal: wp(2),
    paddingTop: hp(0.7),
    marginVertical: hp(2),
    borderRadius: 18,
    alignSelf: 'center',
  },
  dragElementImage: {
    alignSelf: 'center',
    width: wp(11),
    height: hp(2.5),
    position: 'absolute',
    marginTop: hp(1),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toggleOn: {
    height: hp(7),
    width: wp(28),
    marginLeft: wp(-5),
    marginRight: wp(-9),
    marginBottom: hp(-1),
    alignSelf: 'flex-end',
  },
  toggleOff: {
    height: hp(5.6),
    width: wp(25),
    marginRight: wp(-3.5),
    marginLeft: wp(-9),
    marginTop: hp(1),
    marginBottom: hp(-0.5),
    alignSelf: 'flex-end',
  },
  questionContainer: {
    paddingVertical: hp(1),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  itemQuestionText: {
    fontSize: wp(4.5),
    color: Colors.black,
    fontFamily: Fonts.regular.hi,
    marginLeft: wp(2),
  },
  subQuestionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: wp(6),
  },
  subItemQuestionText: {
    fontSize: wp(4.5),
    color: Colors.black,
    fontFamily: Fonts.regular.hi,
    marginLeft: wp(2),
  },
});
