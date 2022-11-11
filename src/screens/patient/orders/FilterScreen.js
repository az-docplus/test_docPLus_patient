/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import {HEADER_TEXT, PRIMARY_COLOR} from '../../../styles/colors';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function FilterScreen({
  modalVisible,
  filterVal,
  onPressSave,
  resetFilters,
}) {
  const types = ['Categories', 'Date Range'];
  const categories = [
    'All',
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
  ];
  const date_range = [
    'All',
    'Yesterday',
    'Past 7 Days',
    'Past Month',
    'Past 6 Months',
  ];
  const [selectedType, setType] = useState('Categories');
  const [selCategory, setCategoryType] = useState(filterVal.Category);
  const [selDateRange, setDateType] = useState(filterVal.Date_Range);

  const getOptions = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          selectedType == 'Categories'
            ? setCategoryType(item)
            : setDateType(item);
        }}
        style={[
          styles.optionList,
          {
            flexDirection: 'row',
            marginLeft: 20,
          },
        ]}>
        <Icon
          size={20}
          name={
            selectedType == 'Categories' && selCategory == item
              ? 'check-circle'
              : selectedType == 'Date Range' && selDateRange == item
              ? 'check-circle'
              : 'check-circle-outline'
          }
          color={
            selCategory == item || selDateRange == item ? PRIMARY_COLOR : '#000'
          }
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            width: '100%',
            textAlign: 'left',
            marginLeft: 20,
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const saveFilters = () => {
    onPressSave({
      Category: selCategory,
      Date_Range: selDateRange,
    });
  };

  return (
    <View>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#00000090',
        }}>
        <TouchableOpacity
          style={{
            height: '25%',
            width: '100%',
          }}
          activeOpacity={1}
          onPress={() => {
            console.log('pressed');
            modalVisible(false);
          }}
        />
        <View style={styles.innerContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <DmzText
              text="Filters"
              style={{fontSize: 22, color: HEADER_TEXT, fontWeight: '700'}}
            />
            <TouchableOpacity
              onPress={() => {
                resetFilters({
                  Category: 'All',
                  Date_Range: 'All',
                });
                setCategoryType('All');
                setDateType('All');
              }}>
              <Text style={{color: 'crimson', fontWeight: '700'}}>
                Clear All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', height: '100%'}}>
            <FlatList
              keyExtractor={({u, i}) => {
                return i;
              }}
              data={types}
              style={{
                backgroundColor: '#f5f5f5',
                height: '100%',
                width: '100%',
              }}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setType(item);
                    }}
                    style={[
                      styles.optionList,
                      {
                        backgroundColor:
                          selectedType == item ? '#e0e0e0' : 'transparent',
                      },
                    ]}>
                    <Text style={{fontSize: 16, fontWeight: '600'}}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
            <FlatList
              keyExtractor={({u, i}) => {
                return i;
              }}
              data={selectedType == 'Categories' ? categories : date_range}
              style={{
                height: '100%',
                width: '100%',
                marginLeft: 10,
              }}
              ListHeaderComponent={() => {
                return <DmzText style={{fontSize: 16}} text={selectedType} />;
              }}
              renderItem={getOptions}
              ListFooterComponent={() => {
                return (
                  <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={saveFilters}>
                    <Text
                      style={{color: '#fff', fontWeight: '700', fontSize: 18}}>
                      Save
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    height: '75%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
    width: '100%',
    paddingTop: 20,
  },
  optionList: {
    elevation: 0,
    width: 'auto',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtn: {
    width: '80%',
    backgroundColor: PRIMARY_COLOR,
    height: 40,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 50,
  },
});
