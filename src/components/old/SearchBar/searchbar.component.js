import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-gesture-handler';
import FilterIcon from '../../../assets/svg/filter.svg';
import {Local, setLocale} from '../../../i18n';

const SearchBar = (props) => {
  return (
    <View style={SearchBarStyles.Container}>
      <View style={SearchBarStyles.ContainerLeftWrapper}>
        <Icon name="search" size={24} />
        <TextInput
          style={{marginTop: 5, marginLeft: 5, fontSize: 18}}
          textContentType="name"
          placeholder={`${Local("doctor.medical_history.search_symptoms")}`}
          />
      </View>
      {/* <View style={SearchBarStyles.ContainerRightWrapperFilterContainer}>
        <FilterIcon height={24} width={24} />
      </View> */}
    </View>
  );
}

const SearchBarStyles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 20,
    padding: 2,
    marginBottom: 20,
    marginTop: 10,
  },
  ContainerLeftWrapper: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  ContainerRightWrapperFilterContainer: {
    height: 42,
    width: 42,
    backgroundColor: '#6231CB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
});

export default SearchBar;
