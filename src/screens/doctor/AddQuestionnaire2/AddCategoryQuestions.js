import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ExpandableList from '../../../components/molecules/ExpandableList/ExpandableList';
import Question from '../../../components/organisms/Question/Question';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';

function AddCategoryQuestions() {
  const { theme } = useSelector((state) => state.AuthReducer);
  return (
    <>
      <StatusBar
        backgroundColor={'rgba(255,255,255,0.2)'}
        barStyle={'dark-content'}
        animated
      />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <TopNavBar
          style={{
            Container: {
              height: '5%',
            },
          }}
          headerText={`${Local("doctor.AddQuestionnaire.AddCategory.categories")}`}
        />
        <ScrollView>
          <View
            style={{
              borderBottomColor: '#047b7b',
              borderBottomWidth: 1.5,
              width: '68%',
              alignSelf: 'center',
              marginTop: '15%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10%',
            }}>
            <TextInput
              style={{padding: 4, fontSize: 16}}
              placeholder={`${Local("doctor.AddQuestionnaire.AddCategory.category_name")}`}></TextInput>
            <MaterialIcon name={'pencil'} color={'#a09e9e'} size={18} />
          </View>
          <ExpandableList
            style={{
              paddingVertical: '5%',
            }}
            title={'Question 1'}>
            {/* <Question /> */}
          </ExpandableList>
          <TouchableOpacity
            style={{
              backgroundColor: '#e6f7f5',
              width: '85%',
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: '4%',
              elevation: 1,
              borderRadius: 20,
              marginTop: '8%',
            }}>
            <MaterialIcon name={'plus'} size={30} color={'#047b7b'} />
            <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: '4%'}}>
              Add Question
            </Text>
          </TouchableOpacity>

          <View style={{paddingHorizontal: '5%', marginTop: '5%'}}>
            <Question />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
export default AddCategoryQuestions;
