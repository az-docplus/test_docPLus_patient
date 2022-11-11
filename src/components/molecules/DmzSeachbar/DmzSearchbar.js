import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-gesture-handler';
import FilterIcon from '../../../assets/svg/filter_icon.svg';

function DmzSearchbar({placeholder, onEndEditing, onChangeText, style}) {
  return (
    <View style={[Styles.Container, style ? style : null]}>
      <View style={Styles.ContainerLeftWrapper}>
        <Icon name="search" size={20} />
        <TextInput
          style={{marginLeft: 5, fontSize: 16}}
          textContentType="name"
          placeholder={placeholder}
          onEndEditing={onEndEditing}
          onChangeText={onChangeText}
          enablesReturnKeyAutomatically
        />
      </View>
      <View style={Styles.ContainerRightWrapperFilterContainer}>
        <FilterIcon height={20} width={20} />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
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
    marginTop: 20,
    position: 'relative',
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

export default DmzSearchbar;
