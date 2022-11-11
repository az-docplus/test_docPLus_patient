import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {Colors} from '../../../styles/colorsV2';
import {useSelector, useDispatch} from 'react-redux';
import { Local } from '../../../i18n';

function SearchBarSolid({
  withIcon,
  icon,
  searchIcon,
  placeholder,
  placeholderTextColor,
  onChangeText = false,
  onEndEditing,
  style = {},
  handleBottomList,
  loc = true,
  extTextChange = () => {},
}) {
  const {theme} = useSelector((state) => state.AuthReducer);
  const [searchText, setSearchText] = useState('');
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={[
          {
            backgroundColor: '#fafafa',
            borderRadius: 40,
            paddingHorizontal: 20,
            paddingVertical: 2,
            elevation: 6,
            width: '85%',
            flexDirection: 'row',
            alignItems: 'center',
          },
          style,
        ]}>
            {loc && (
          <TouchableOpacity style={{}} onPress={() => onEndEditing(searchText)}>
            {searchIcon ?? null}
          </TouchableOpacity>
        )}
        <TextInput
          style={{
            height: 40,
            lineHeight: 14,
            fontSize: 11,
            color: Colors.primary_text_color[theme],
            flex: 1,
            fontFamily: 'Montserrat-Regular',
          }}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : 'black'
          }
          placeholder={
            placeholder
              ? placeholder
              : `${Local("patient.landing_page.search_by_symptom")}`
          }
          onEndEditing={() => onEndEditing(searchText)}
          onChangeText={(text) => {
            setSearchText(text);
            extTextChange(text);
            if(onChangeText) {
              onEndEditing(searchText)
            } 
          }}
          // enablesReturnKeyAutomatically
        />
        {/* {searchIcon && (
          <TouchableOpacity style={{}} onPress={() => onEndEditing(searchText)}>
            {searchIcon ?? null}
          </TouchableOpacity>
        )} */}
      </View>
      <TouchableOpacity onPress={handleBottomList}>
        {withIcon && icon}
      </TouchableOpacity>
    </View>
  );
}

export default SearchBarSolid;
