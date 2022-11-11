import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity, StatusBar} from 'react-native';
import {Picker} from '@react-native-community/picker';
import RadioGroupV2 from '../../molecules/RadioGroup/RadioGroupV2';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../../../styles/colorsV2';

function Question({isSumitted = {status: false, parentId: ''}}) {
  const {theme} = useSelector((state) => state.AuthReducer);
  const [question, setQuestion] = useState({
    title: '',
    category: '',
    option: [],
    superQuestion: false,
    root: true,
    id: '', // doctor's id
    parent: '', // id of parent question
    optionId: '', // option ID of parent's question's option
  });

  const [questionType, setQuestionType] = useState('');
  const [haveSubQuestion, setHaveSubQuestion] = useState(false);
  const [options, setOptions] = useState([]);
  /**
   *  handling responses
   */

  const onTitleChange = (title) => {
    setQuestion({
      ...question,
      title,
    });
  };
  const onSubmit = () => {
    console.log(options);
  };

  return (
    <>
      <StatusBar
        animated
        backgroundColor={Colors.secondary_background[theme]}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
      />
      <View
        style={{
          borderWidth: 1,
          borderColor: '#e0e0e0',
          backgroundColor: '#fcfcfc',
          borderRadius: 20,
          paddingHorizontal: '5%',
          paddingVertical: '4%',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 4,
            paddingVertical: '5%',
            paddingHorizontal: '2%',
            borderRadius: 15,
            marginBottom: '5%',
          }}>
          <Picker
            style={{height: 20, width: '100%'}}
            selectedValue={questionType}
            onValueChange={setQuestionType}>
            <Picker.Item color="#777" label="Question Type" value={''} />
            <Picker.Item color="#000" label="Descriptive" value={false} />
            <Picker.Item color="#000" label="Objective" value={true} />
          </Picker>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 4,
            paddingVertical: '4%',
            paddingHorizontal: '5%',
            borderRadius: 15,
          }}>
          <TextInput
            style={{padding: 0}}
            placeholder={'Enter Question...'}
            onChangeText={onTitleChange}
          />
        </View>

        {questionType === true && (
          <Option options={options} setOptions={setOptions} />
        )}
        {isSumitted.status && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingHorizontal: '2%',
              marginTop: '5%',
            }}>
            <Text style={{flex: 1}}>Add Sub-question:</Text>
            <RadioGroupV2
              horizontal
              activeKey={haveSubQuestion}
              setActiveKey={setHaveSubQuestion}
              Item={[
                {value: 'Yes', id: true},
                {value: 'No', id: false},
              ]}></RadioGroupV2>
          </View>
        )}
        <DmzButton
          onPress={onSubmit}
          style={{
            Container: {
              backgroundColor: '#077EE9',
              height: 'auto',
              width: '80%',
              alignSelf: 'center',
              marginTop: '5%',
              paddingVertical: '4%',
              borderRadius: 30,
            },
            Text: {
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 18,
              letterSpacing: 1,
            },
          }}
          text={'Add'}
        />
      </View>
    </>
  );
}

export default Question;

const Option = ({options, setOptions}) => {
  const onAddOption = () => {
    const option = {
      _id: `${Date.now()}`,
      optionType: 'Objective',
      text: '',
    };
    setOptions([...options, option]);
  };
  const handleInput = (text, _id) => {
    let optionTemp = options.filter((i) => i._id !== _id);
    setOptions(
      [
        ...optionTemp,
        {
          _id,
          optionType: 'Objective',
          text,
        },
      ].sort((a, b) => a._id > b._id),
    );
  };

  return (
    <View style={{marginTop: '8%'}}>
      <Text style={{marginLeft: '4%'}}>Add Answer Options:</Text>

      {options?.map((item, index) => (
        <View
          key={item._id}
          style={{
            backgroundColor: '#fff',
            elevation: 4,
            paddingVertical: '4%',
            paddingHorizontal: '5%',
            borderRadius: 15,
            marginVertical: '4%',
          }}>
          <TextInput
            value={item.text}
            onChangeText={(text) => handleInput(text, item._id)}
            style={{padding: 0}}
            placeholder={`Option ${index + 1}`}
          />
        </View>
      ))}

      <TouchableOpacity
        onPress={onAddOption}
        style={{
          alignSelf: 'flex-end',
          borderBottomColor: '#7B7A79',
          borderBottomWidth: 1.5,
          paddingHorizontal: '1%',
        }}>
        <Text style={{color: '#7B7A79'}}>Add Option</Text>
      </TouchableOpacity>
    </View>
  );
};
