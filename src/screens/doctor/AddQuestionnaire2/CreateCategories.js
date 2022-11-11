import React from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';

function CreateCategories() {
  const { theme } = useSelector((state) => state.AuthReducer);
  const Categories = [];
  return (
    <View style={{flex: 1, backgroundColor: '#f1f1f1'}}>
      <TopNavBar
        style={{
          Container: {
            height: '5%',
          },
        }}
        headerText={`${Local("doctor.AddQuestionnaire.AddCategory.categories")}`}
      />

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingVertical: '5%'}}>
        <View
          style={{
            flex: 1,
            width: '85%',
            alignSelf: 'center',
          }}>
          <Card />
          <Card />
          <Card />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#e6f7f5',
            width: '85%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: '4%',
            elevation: 12,
            borderRadius: 20,
          }}>
          <MaterialIcon name={'plus'} size={30} color={'#047b7b'} />
          <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: '4%'}}>
            Create Category
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default CreateCategories;

const Card = () => (
  <View
    style={{
      width: '100%',
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: '4%',
      paddingHorizontal: '7%',
      borderRadius: 18,
      elevation: 8,
      marginBottom: 18,
    }}>
    <View style={{flex: 3}}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>Diabetes</Text>
      <Text style={{color: '#a09e9e', fontSize: 12}}>
        Updated on: 02 May 2020
      </Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <MaterialIcon name={'delete'} color={'#a09e9e'} size={25} />
      <MaterialIcon name={'pencil'} color={'#a09e9e'} size={25} />
    </View>
  </View>
);
